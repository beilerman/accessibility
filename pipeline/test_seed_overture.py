import json
from pathlib import Path
import tempfile
import unittest
import struct
import subprocess
import sys

import seed_overture as seed


class SeedTests(unittest.TestCase):
    def test_query_guards_and_new_taxonomy(self):
        query = seed.build_query("/tmp/it's.parquet")
        self.assertIn("it''s.parquet", query)
        self.assertIn("confidence >= 0.5", query)
        self.assertIn("basic_category", query)
        self.assertNotIn("categories.primary", query)
        for confidence in (.49, float("nan"), 1.1):
            with self.assertRaises(ValueError):
                seed.build_query("x", min_confidence=confidence)
        with self.assertRaises(ValueError):
            seed.build_query("x", bounds=(-84, 40, -85, 39))

    def test_source_provenance_is_preserved_without_accessibility(self):
        sources = [{"dataset": "meta", "record_id": "123", "property": "/names/primary",
                    "license": None, "update_time": "2026-01-01"}]
        record = seed.staged_record({"id": "abc", "sources_json": json.dumps(sources)},
                                    "2026-08-19.0", "2026-09-10", "remote")
        self.assertEqual(record["sources"], sources)
        self.assertEqual(record["accessibility_facts"], [])
        self.assertEqual(record["evidence_type"], "directory_seed")
        self.assertEqual(record["license_candidates"][0]["raw_license"], None)
        self.assertTrue(record["license_review_required"])

    def test_unknown_provider_license_not_guessed(self):
        candidate = seed.license_candidates([{"dataset": "new-vendor", "license": "custom"}])[0]
        self.assertIsNone(candidate["documented_license_candidate"])
        self.assertEqual(candidate["raw_license"], "custom")

    def test_non_point_geometry_rejected(self):
        with self.assertRaises(ValueError):
            seed.staged_record({"id": "bad", "geometry_wkb": b"bad"},
                               seed.PINNED_RELEASE, "2026-09-10", "fixture")

    def test_colocation_never_merges_distinct_places(self):
        places = [{"id": "a", "name": "Museum", "latitude": 39, "longitude": -84.5},
                  {"id": "b", "name": "Cafe", "latitude": 39, "longitude": -84.5}]
        original = json.dumps(places)
        self.assertEqual(seed.dedupe_candidates(places), [])
        self.assertEqual(json.dumps(places), original)

    def test_matching_name_distance_and_source_candidates(self):
        places = [{"id": "a", "name": "Example Library", "latitude": 39, "longitude": -84.5,
                   "sources": [{"dataset": "meta", "record_id": "shared"}]},
                  {"id": "b", "name": "Example  LIBRARY", "latitude": 39, "longitude": -84.5,
                   "sources": [{"dataset": "meta", "record_id": "shared"}]},
                  {"id": "c", "name": "Example Library", "latitude": 39.1, "longitude": -84.5}]
        candidates = seed.dedupe_candidates(places)
        self.assertEqual(len(candidates), 2)
        self.assertTrue(all(r["candidate_ids"] == ["a", "b"] for r in candidates))
        self.assertTrue(all(r["action"] == "human_review_only" for r in candidates))
        self.assertEqual(len(places), 3)

    def test_export_refuses_overwrite_and_records_hashes(self):
        with tempfile.TemporaryDirectory() as directory:
            out = Path(directory) / "run"
            seed.export_staging([], out, {"input_kind": "local_fixture"})
            manifest = json.loads((out / "manifest.json").read_text())
            self.assertEqual(manifest["status"], "complete_staging_only")
            self.assertEqual(manifest["places.ndjson"]["count"], 0)
            self.assertEqual(len(manifest["places.ndjson"]["sha256"]), 64)
            with self.assertRaises(FileExistsError):
                seed.export_staging([], out, {})

    def test_duckdb_local_parquet_bounds_confidence_and_raw_sources(self):
        # Local Parquet with WKB geometry exercises the exporter SQL. No place-data pull.
        import duckdb
        conn = duckdb.connect()
        try:
            with tempfile.TemporaryDirectory() as directory:
                fixture = Path(directory) / "fixture.parquet"
                conn.execute("""CREATE TABLE fixture AS SELECT
                    id, 1 AS version, {'primary': 'Test Venue'} AS names,
                    confidence, 'library' AS basic_category,
                    {'primary': 'library', 'hierarchy': ['education', 'library']} AS taxonomy,
                    'open' AS operating_status,
                    [{'freeform': '1 Test St', 'locality': 'Test', 'country': 'US'}] AS addresses,
                    ['https://example.org'] AS websites,
                    [{'dataset': 'meta', 'record_id': id, 'license': NULL}] AS sources,
                    NULL::BLOB AS geometry,
                    {'xmin': lon, 'xmax': lon, 'ymin': lat, 'ymax': lat} AS bbox
                    FROM (VALUES ('inside', -84.5, 39.0, .5),
                                 ('outside', -85.0, 39.0, .9),
                                 ('low', -84.5, 39.0, .49),
                                 ('missing', -84.5, 39.0, NULL),
                                 ('boundary', -84.95, 38.85, .8)) t(id, lon, lat, confidence)""")
                for identifier, lon, lat in conn.execute("SELECT id, bbox.xmin, bbox.ymin FROM fixture").fetchall():
                    conn.execute("UPDATE fixture SET geometry=? WHERE id=?",
                                 [struct.pack("<BIdd", 1, 1, float(lon), float(lat)), identifier])
                conn.execute(f"COPY fixture TO {seed.sql_literal(str(fixture))} (FORMAT PARQUET)")
                cursor = conn.execute(seed.build_query(str(fixture)))
                columns = [d[0] for d in cursor.description]
                records = [seed.staged_record(dict(zip(columns, r)), seed.PINNED_RELEASE,
                                              "2026-09-10", "fixture") for r in cursor.fetchall()]
                self.assertEqual([r["id"] for r in records], ["boundary", "inside"])
                self.assertEqual(records[1]["sources"][0]["record_id"], "inside")
                self.assertEqual(records[1]["source_system"], "LOCAL TEST FIXTURE")
                self.assertEqual(records[1]["longitude"], -84.5)
                self.assertEqual(conn.execute(seed.build_query(str(fixture), limit=1)).fetchone()[0], "boundary")
                output = Path(directory) / "cli-run"
                run = subprocess.run([sys.executable, str(Path(seed.__file__)),
                                      "--input-parquet", str(fixture), "--output", str(output)],
                                     text=True, capture_output=True, timeout=20)
                self.assertEqual(run.returncode, 0, run.stderr)
                manifest = json.loads((output / "manifest.json").read_text())
                self.assertEqual(manifest["places.ndjson"]["count"], 2)
                self.assertEqual(manifest["input_kind"], "local_fixture")
                self.assertFalse(manifest["publication_allowed"])
        finally:
            conn.close()


if __name__ == "__main__":
    unittest.main()
