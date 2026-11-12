"""A partial recheck must leave the last full review date intact."""
import copy
import json
from pathlib import Path
import runpy
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parent.parent
RESEARCH = ROOT / "scripts/research"


class RecheckFreshnessTests(unittest.TestCase):
    def run_recheck(self, remaining_note):
        reviewed = {
            "id": "test-venue.mobility.1", "domain": "mobility",
            "source_url": "https://example.org/access",
            "retrieved_at": "2026-11-08", "review_status": "needs_recheck",
            "history": [{"date": "2026-11-08", "action": "added", "note": "Original note."}],
        }
        place = {"slug": "test-venue", "checked_at": "2026-11-08",
                 "facts": [reviewed, remaining_note]}
        untouched = copy.deepcopy(remaining_note)
        quotes = {}
        with tempfile.TemporaryDirectory() as temporary:
            spec = Path(temporary) / "recheck.json"
            spec.write_text(json.dumps({reviewed["id"]: "Ramp at north entrance."}))
            with patch.object(sys, "path", [str(RESEARCH), *sys.path]):
                import _catalog
                with patch.object(sys, "argv", ["recheck.py", str(spec), "2026-11-12"]), \
                     patch.object(_catalog, "load_places", return_value=[place]), \
                     patch.object(_catalog, "load_quotes", return_value=quotes), \
                     patch.object(_catalog, "save_places"), patch.object(_catalog, "save_quotes"):
                    runpy.run_path(str(RESEARCH / "recheck.py"), run_name="__main__")
        self.assertEqual(remaining_note, untouched)
        self.assertEqual(reviewed["retrieved_at"], "2026-11-12")
        self.assertEqual(reviewed["review_status"], "source_checked")
        self.assertEqual(reviewed["history"][-1]["action"], "rechecked")
        self.assertEqual(quotes[reviewed["id"]]["quote"], "Ramp at north entrance.")
        return place["checked_at"]

    def remaining(self, date="2026-11-12", status="source_checked"):
        return {"id": "test-venue.chronic.1", "retrieved_at": date,
                "review_status": status}

    def test_unresolved_same_day_note_prevents_full_review(self):
        for status in ("needs_recheck", "source_unavailable"):
            with self.subTest(status=status):
                self.assertEqual(self.run_recheck(self.remaining(status=status)), "2026-11-08")

    def test_older_unreviewed_note_prevents_full_review(self):
        self.assertEqual(self.run_recheck(self.remaining(date="2026-11-08")), "2026-11-08")

    def test_all_current_active_notes_advance_date_and_retired_notes_do_not_block(self):
        self.assertEqual(self.run_recheck(self.remaining()), "2026-11-12")
        self.assertEqual(self.run_recheck(self.remaining(date="2026-11-08", status="retired")), "2026-11-12")


if __name__ == "__main__":
    unittest.main()
