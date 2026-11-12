"""Depth additions must not turn a partial review into a full venue recheck."""
import json
from pathlib import Path
import runpy
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parent.parent
RESEARCH = ROOT / "scripts/research"


class DepthFreshnessTests(unittest.TestCase):
    def apply(self, old_notes):
        place = {"slug": "test-venue", "checked_at": "2026-11-08", "facts": old_notes}
        with tempfile.TemporaryDirectory() as temporary:
            spec = Path(temporary) / "depth.json"
            spec.write_text(json.dumps({"test-venue": [[
                "mobility", "A ramp is described at the north entrance.",
                "https://example.org/access", "venue_official", "Ramp at north entrance."
            ]]}))
            with patch.object(sys, "path", [str(RESEARCH), *sys.path]):
                import _catalog
                with patch.object(sys, "argv", ["apply_depth.py", str(spec), "2026-11-12"]), \
                     patch.object(_catalog, "load_places", return_value=[place]), \
                     patch.object(_catalog, "load_quotes", return_value={}), \
                     patch.object(_catalog, "source_result", return_value={"status": 200, "_text": "Ramp at north entrance."}), \
                     patch.object(_catalog, "save_places"), patch.object(_catalog, "save_quotes"):
                    runpy.run_path(str(RESEARCH / "apply_depth.py"), run_name="__main__")
        self.assertEqual(place["facts"][-1]["id"], "test-venue.mobility.1")
        return place["checked_at"]

    def prior_note(self, date="2026-11-08", status="source_checked", number=1):
        return {"id": f"test-venue.chronic.{number}", "domain": "chronic", "text": "Rest area.",
                "retrieved_at": date, "review_status": status}

    def test_older_active_note_keeps_full_review_date(self):
        self.assertEqual(self.apply([self.prior_note()]), "2026-11-08")

    def test_all_active_notes_checked_today_can_advance_date(self):
        self.assertEqual(self.apply([self.prior_note("2026-11-12"), self.prior_note(status="retired", number=2)]), "2026-11-12")

    def test_flagged_note_read_today_still_prevents_full_review(self):
        self.assertEqual(self.apply([self.prior_note("2026-11-12", "needs_recheck")]), "2026-11-08")


if __name__ == "__main__":
    unittest.main()
