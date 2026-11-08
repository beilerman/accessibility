import unittest

from check_sources import compare, fingerprint, flag_facts, visible_text


def fact(url, status="source_checked"):
    return {"source_url": url, "review_status": status, "history": []}


class VisibleTextTests(unittest.TestCase):
    def test_ignores_scripts_styles_and_whitespace(self):
        a = "<html><head><title>x</title></head><body><p>Ramp  at\nnorth door</p><script>var t=1</script></body></html>"
        b = "<body><style>p{}</style><p>Ramp at north door</p><script>var t=2</script></body>"
        self.assertEqual(visible_text(a), "Ramp at north door")
        self.assertEqual(fingerprint(a), fingerprint(b))

    def test_text_change_changes_fingerprint(self):
        self.assertNotEqual(fingerprint("<p>Elevator available</p>"), fingerprint("<p>Elevator closed</p>"))


class CompareTests(unittest.TestCase):
    def test_first_snapshot_reports_only_failures(self):
        current = {"a": {"status": 200, "sha256": "1"}, "b": {"status": 404}}
        self.assertEqual(compare({}, current), {"b": "unavailable"})

    def test_changed_and_unavailable(self):
        prev = {"a": {"status": 200, "sha256": "1"}, "b": {"status": 200, "sha256": "2"}, "c": {"status": 200, "sha256": "3"}}
        cur = {"a": {"status": 200, "sha256": "1"}, "b": {"status": 200, "sha256": "9"}, "c": {"status": None, "error": "timeout"}}
        self.assertEqual(compare(prev, cur), {"b": "changed", "c": "unavailable"})

    def test_redirect_status_counts_as_loaded(self):
        prev = {"a": {"status": 200, "sha256": "1"}}
        self.assertEqual(compare(prev, {"a": {"status": 301, "sha256": "1"}}), {})


class BlockedTests(unittest.TestCase):
    def test_bot_protection_is_blocked_not_unavailable(self):
        prev = {"a": {"status": 200, "sha256": "1"}}
        self.assertEqual(compare(prev, {"a": {"status": 403}}), {"a": "blocked"})

    def test_blocked_never_flags_facts(self):
        places = [{"facts": [fact("a")]}]
        self.assertEqual(flag_facts(places, {"a": "blocked"}, "2026-11-08"), 0)
        self.assertEqual(places[0]["facts"][0]["review_status"], "source_checked")


class FlagTests(unittest.TestCase):
    def test_flags_once_and_records_history(self):
        places = [{"facts": [fact("a"), fact("b"), fact("c")]}]
        n = flag_facts(places, {"a": "changed", "b": "unavailable"}, "2026-11-08")
        self.assertEqual(n, 2)
        a, b, c = places[0]["facts"]
        self.assertEqual(a["review_status"], "needs_recheck")
        self.assertEqual(b["review_status"], "source_unavailable")
        self.assertEqual(c["review_status"], "source_checked")
        self.assertEqual(a["history"][0]["action"], "flagged")
        self.assertEqual(flag_facts(places, {"a": "changed"}, "2026-11-09"), 0)
        self.assertEqual(len(a["history"]), 1)


if __name__ == "__main__":
    unittest.main()
