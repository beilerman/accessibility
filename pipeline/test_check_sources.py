import unittest

from check_sources import compare, confirm_changes, fingerprint, flag_facts, script_prose, visible_text


def fact(url, status="source_checked"):
    return {"source_url": url, "review_status": status, "history": []}


class VisibleTextTests(unittest.TestCase):
    def test_ignores_scripts_styles_and_whitespace(self):
        a = "<html><head><title>x</title></head><body><p>Ramp  at\nnorth door</p><script>var t=1</script></body></html>"
        b = "<body><style>p{}</style><p>Ramp at north door</p><script>var t=2</script></body>"
        self.assertEqual(visible_text(a), "Ramp at north door")
        self.assertEqual(fingerprint(a), fingerprint(b))

    def test_site_chrome_is_ignored(self):
        a = "<nav>Menu A</nav><header>Hi</header><main>Ramp at north door</main><footer>Updated 20:19</footer>"
        b = "<nav>Menu B</nav><header>Hello</header><main>Ramp at north door</main><footer>Updated 20:26</footer>"
        self.assertEqual(fingerprint(a), fingerprint(b))

    def test_reordering_blocks_does_not_change_fingerprint(self):
        a = "<div><a>Public Programs</a><a>Family Programs</a></div><p>Ramp at north door</p>"
        b = "<div><a>Family Programs</a><a>Public Programs</a></div><p>Ramp at north door</p>"
        self.assertEqual(fingerprint(a), fingerprint(b))

    def test_text_change_changes_fingerprint(self):
        self.assertNotEqual(fingerprint("<p>Elevator available</p>"), fingerprint("<p>Elevator closed</p>"))


class ScriptProseTests(unittest.TestCase):
    PAGE = '<body><p>Nav</p><script type="module">render({"body":"Mostly flat, paved walking trail<br/> for 0.5 mile loop","id":"a8f3c2e9b1d4f6a7c3e8b2d9f1a4c7e2","nonce":"x"})</script></body>'

    def test_extracts_prose_strings_not_tokens(self):
        self.assertEqual(script_prose(self.PAGE), "Mostly flat, paved walking trail for 0.5 mile loop")

    def test_content_change_inside_script_changes_fingerprint(self):
        changed = self.PAGE.replace("Mostly flat", "Steep and narrow")
        self.assertEqual(visible_text(self.PAGE), visible_text(changed))
        self.assertNotEqual(fingerprint(self.PAGE), fingerprint(changed))

    def test_minified_code_between_quotes_is_not_prose(self):
        page = '<script>a="x";window.__CF$cv$params={r:"a576c463f868bebb",t:"MTc5"};var l = document.createElement("script") ; "y"</script>'
        self.assertEqual(script_prose(page), "")

    def test_external_scripts_are_ignored(self):
        self.assertEqual(script_prose('<script src="a.js">"one two three four five six"</script>'), "")


class CompareTests(unittest.TestCase):
    def test_first_snapshot_reports_only_failures(self):
        current = {"a": {"status": 200, "sha256": "1"}, "b": {"status": 404}}
        self.assertEqual(compare({}, current), {"b": "unavailable"})

    def test_changed_and_unavailable(self):
        prev = {"a": {"status": 200, "sha256": "1"}, "b": {"status": 200, "sha256": "2"}, "c": {"status": 200, "sha256": "3"}}
        cur = {"a": {"status": 200, "sha256": "1"}, "b": {"status": 200, "sha256": "9"}, "c": {"status": None, "error": "timeout"}}
        # Same (absent) fingerprint version on both sides compares normally.
        self.assertEqual(compare(prev, cur), {"b": "changed", "c": "unavailable"})

    def test_fingerprint_method_change_is_not_a_content_change(self):
        prev = {"a": {"status": 200, "sha256": "1", "fingerprint_version": 1}}
        cur = {"a": {"status": 200, "sha256": "2", "fingerprint_version": 2}}
        self.assertEqual(compare(prev, cur), {})

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


class ConfirmTests(unittest.TestCase):
    PREV = {"a": {"status": 200, "sha256": "old"}}

    def run_with(self, *shas):
        replies = iter({"status": 200, "sha256": s} for s in shas)
        current = {"a": {"status": 200, "sha256": "new"}}
        return confirm_changes(self.PREV, current, {"a": "changed"}, lambda url: next(replies)), current

    def test_two_agreeing_refetches_confirm_a_change(self):
        found, current = self.run_with("new", "new")
        self.assertEqual(found, {"a": "changed"})
        self.assertEqual(current["a"]["sha256"], "new")

    def test_refetch_matching_the_baseline_was_transient(self):
        found, current = self.run_with("old", "new")
        self.assertEqual(found, {})
        self.assertEqual(current["a"]["sha256"], "old")

    def test_disagreeing_refetches_are_unstable_and_never_flag(self):
        found, _ = self.run_with("x", "y")
        self.assertEqual(found, {"a": "unstable"})
        places = [{"facts": [fact("a")]}]
        self.assertEqual(flag_facts(places, found, "2026-11-08"), 0)

    def test_library_server_node_is_ignored(self):
        self.assertEqual(visible_text("<p>BiblioWeb: app07 Version 4</p>"), visible_text("<p>BiblioWeb: app08 Version 4</p>"))


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
