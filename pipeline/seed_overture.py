#!/usr/bin/env python3
"""Export Overture place identity data to review staging, never accessibility facts."""
from __future__ import annotations

import argparse
from collections import defaultdict
from datetime import datetime, timezone
import hashlib
import json
import math
from pathlib import Path
import re
import shutil
import struct
import threading
import unicodedata

PINNED_RELEASE = "2026-08-19.0"
BOUNDS = (-84.95, 38.85, -84.15, 39.40)  # west, south, east, north
LICENSE_DOCS = "https://docs.overturemaps.org/attribution/#places"
CDLA_PROVIDERS = {"meta", "microsoft", "pinmeto", "krick", "renderseo", "dac", "brightquery"}


def sql_literal(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def build_query(source: str, bounds=BOUNDS, min_confidence=.5, limit=100) -> str:
    west, south, east, north = bounds
    if not all(math.isfinite(x) for x in bounds):
        raise ValueError("Bounds must be finite")
    if not (-180 <= west < east <= 180 and -90 <= south < north <= 90):
        raise ValueError("Bounds must be west,south,east,north")
    if not .5 <= min_confidence <= 1:
        raise ValueError("Minimum confidence must be between 0.5 and 1")
    if not 1 <= limit <= 100000:
        raise ValueError("Limit must be between 1 and 100000")
    # Use bbox for Parquet row-group pruning; decode standard Point WKB locally.
    # Do not use the categories column, deprecated for removal in September 2026.
    return f"""SELECT id, version, names.primary AS name, CAST(confidence AS DOUBLE) AS confidence,
       basic_category, CAST(taxonomy AS JSON) AS taxonomy_json,
       operating_status, CAST(addresses AS JSON) AS addresses_json,
       CAST(websites AS JSON) AS websites_json,
       CAST(sources AS JSON) AS sources_json,
       geometry AS geometry_wkb,
       CAST(bbox AS JSON) AS bbox_json, filename AS source_file
FROM read_parquet({sql_literal(source)}, filename=true, hive_partitioning=true)
WHERE bbox.xmax >= {west} AND bbox.xmin <= {east}
  AND bbox.ymax >= {south} AND bbox.ymin <= {north}
  AND confidence >= {min_confidence}
ORDER BY id
LIMIT {limit}"""


def license_candidates(sources: list) -> list:
    """Keep raw license values separately; this mapping is a dated review aid."""
    out = []
    for source in sources:
        provider = source.get("dataset", "")
        normalized = re.sub(r"[^a-z0-9]", "", provider.casefold())
        if normalized in CDLA_PROVIDERS:
            candidate = "CDLA-Permissive-2.0"
        elif normalized == "foursquare":
            candidate = "Apache-2.0"
        elif normalized == "alltheplaces":
            candidate = "CC0-1.0"
        else:
            candidate = None
        out.append({"dataset": provider, "raw_license": source.get("license"),
                    "documented_license_candidate": candidate,
                    "documentation_checked_at": "2026-09-10",
                    "source_url": LICENSE_DOCS})
    return out


def staged_record(row: dict, release: str, checked_at: str, input_kind: str) -> dict:
    record = dict(row)
    if "geometry_wkb" in record:
        blob = bytes(record.pop("geometry_wkb"))
        if len(blob) != 21 or blob[0] not in (0, 1):
            raise ValueError("Expected standard 2D Point WKB; review source schema before continuing")
        endian = "<" if blob[0] == 1 else ">"
        kind, longitude, latitude = struct.unpack(endian + "Idd", blob[1:])
        if kind != 1 or not (math.isfinite(longitude) and math.isfinite(latitude)):
            raise ValueError("Expected finite 2D Point coordinates")
        record["longitude"], record["latitude"] = longitude, latitude
    for key in list(record):
        if key.endswith("_json"):
            value = record.pop(key)
            record[key[:-5]] = json.loads(value) if isinstance(value, str) else value
    if not record.get("id"):
        raise ValueError("Refusing place without source ID")
    record["source_system"] = "Overture Maps" if input_kind == "remote" else "LOCAL TEST FIXTURE"
    record["overture_release"] = release
    record["retrieved_at"] = checked_at
    record["evidence_type"] = "directory_seed"
    record["review_status"] = "unreviewed"
    record["accessibility_facts"] = []
    record["license_candidates"] = license_candidates(record.get("sources") or [])
    record["license_review_required"] = True
    return record


def normalized_name(value: str | None) -> str:
    return " ".join(re.findall(r"\w+", unicodedata.normalize("NFKC", value or "").casefold()))


def distance_m(a: dict, b: dict) -> float:
    lat1, lat2 = math.radians(a["latitude"]), math.radians(b["latitude"])
    dlat = lat2 - lat1
    dlon = math.radians(b["longitude"] - a["longitude"])
    angle = math.sin(dlat / 2)**2 + math.cos(lat1)*math.cos(lat2)*math.sin(dlon / 2)**2
    return 6371008.8 * 2 * math.asin(min(1, math.sqrt(angle)))


def dedupe_candidates(records: list[dict]) -> list[dict]:
    """Review groups only. Never combine records or transfer accessibility evidence."""
    source_index = defaultdict(set)
    name_index = defaultdict(list)
    groups = []
    for i, record in enumerate(records):
        for source in record.get("sources") or []:
            if source.get("dataset") and source.get("record_id"):
                source_index[(source["dataset"], source["record_id"])].add(i)
        name = normalized_name(record.get("name"))
        if name:
            name_index[name].append(i)
    for key, indices in sorted(source_index.items()):
        if len(indices) > 1:
            groups.append({"reason": "shared_upstream_record", "source_dataset": key[0],
                           "source_record_id": key[1],
                           "candidate_ids": sorted(records[i]["id"] for i in indices),
                           "action": "human_review_only"})
    for indices in name_index.values():
        for at, i in enumerate(indices):
            for j in indices[at + 1:]:
                a, b = records[i], records[j]
                if a["id"] == b["id"]:
                    continue
                distance = distance_m(a, b)
                if distance <= 30:
                    groups.append({"reason": "same_normalized_name_within_30m",
                                   "candidate_ids": sorted([a["id"], b["id"]]),
                                   "distance_m": round(distance, 2),
                                   "action": "human_review_only"})
    return groups


def export_staging(records: list[dict], output: Path, manifest: dict) -> None:
    # Refuse overwrite; keep each extraction and its provenance independently reviewable.
    output.mkdir(parents=True, exist_ok=False)
    manifest = dict(manifest, status="writing")
    manifest_path = output / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
    for name, values in (("places.ndjson", records),
                         ("dedupe-candidates.ndjson", dedupe_candidates(records))):
        path = output / name
        with path.open("w", encoding="utf-8") as stream:
            for value in values:
                stream.write(json.dumps(value, ensure_ascii=False, allow_nan=False) + "\n")
        manifest[name] = {"count": len(values), "sha256": hashlib.sha256(path.read_bytes()).hexdigest()}
    shutil.copytree(Path(__file__).parent / "licenses", output / "licenses")
    manifest["status"] = "complete_staging_only"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--fetch", action="store_true", help="Execute remote query; default is dry-run")
    mode.add_argument("--dry-run", action="store_true", help="Print query; no network or DuckDB required")
    parser.add_argument("--release", default=PINNED_RELEASE)
    parser.add_argument("--bbox", default=",".join(map(str, BOUNDS)), help="west,south,east,north")
    parser.add_argument("--min-confidence", type=float, default=.5)
    parser.add_argument("--limit", type=int, default=100, help="Output cap, not a network-byte cap")
    parser.add_argument("--output", type=Path)
    parser.add_argument("--input-parquet", type=Path, help="Execute against local test data, no remote place pull")
    parser.add_argument("--timeout-seconds", type=int, default=180)
    args = parser.parse_args()
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}\.\d+", args.release):
        parser.error("Use a pinned release identifier such as 2026-08-19.0")
    if args.timeout_seconds < 1:
        parser.error("Timeout must be positive")
    if args.fetch and args.input_parquet:
        parser.error("Choose remote --fetch or local --input-parquet")
    try:
        bounds = tuple(float(x) for x in args.bbox.split(","))
        if len(bounds) != 4:
            raise ValueError("Expected four bounds")
        source = str(args.input_parquet.resolve()) if args.input_parquet else (
            f"s3://overturemaps-us-west-2/release/{args.release}/theme=places/type=place/*")
        query = build_query(source, bounds, args.min_confidence, args.limit)
    except ValueError as exc:
        parser.error(str(exc))
    if args.dry_run or not (args.fetch or args.input_parquet):
        print(query + ";")
        return
    if not args.output:
        parser.error("An explicit new --output directory is required")
    if args.output.exists():
        parser.error("Output directory already exists; choose a new run directory")
    if args.input_parquet and not args.input_parquet.is_file():
        parser.error("Local Parquet file does not exist")
    try:
        import duckdb
    except ImportError:
        parser.error("Install pipeline/requirements.txt in an isolated environment")
    connection = duckdb.connect()
    for extension in (["httpfs"] if args.fetch else []):
        connection.execute(f"INSTALL {extension}")
        connection.execute(f"LOAD {extension}")
    connection.execute("SET s3_region='us-west-2'") if args.fetch else None
    connection.execute("SET threads=4")
    connection.execute("SET memory_limit='1GB'")
    timer = threading.Timer(args.timeout_seconds, connection.interrupt)
    timer.start()
    checked_at = datetime.now(timezone.utc).isoformat()
    try:
        cursor = connection.execute(query)
        columns = [description[0] for description in cursor.description]
        records = [staged_record(dict(zip(columns, row)), args.release, checked_at,
                                 "remote" if args.fetch else "fixture") for row in cursor.fetchall()]
        raw_count = len(records)
        west, south, east, north = bounds
        records = [r for r in records if west <= r["longitude"] <= east
                   and south <= r["latitude"] <= north]
    finally:
        timer.cancel()
        connection.close()
    export_staging(records, args.output, {
        "schema": "threshold-overture-staging-v1", "release": args.release,
        "source": source, "input_kind": "remote" if args.fetch else "local_fixture",
        "retrieved_at": checked_at, "duckdb_version": duckdb.__version__,
        "bounds_wsen": bounds, "min_confidence": args.min_confidence,
        "limit": args.limit, "limit_reached": raw_count == args.limit,
        "raw_bbox_count": raw_count, "exact_point_count": len(records),
        "query": query, "license_documentation": LICENSE_DOCS,
        "publication_allowed": False,
        "notes": "Directory identity staging only. No accessibility facts. Human review and license review required.",
    })
    print(f"Staged {len(records)} records in {args.output}; no records published or merged.")


if __name__ == "__main__":
    main()
