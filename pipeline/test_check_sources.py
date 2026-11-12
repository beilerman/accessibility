import unittest

import json
import tempfile
from unittest.mock import patch
from pathlib import Path
import check_sources

from check_sources import (
    compare,
    confirm_changes,
    fingerprint,
    flag_facts,
    judge_by_quotes,
    quote_text,
    script_prose,
    uncovered,
    visible_text,
)

ROOT = Path(__file__).resolve().parent.parent


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

    def test_mura_text_blocks_are_monitored(self):
        page = '<main><div data-object="text" data-source="&lt;p&gt;Paved path &amp;amp; benches&lt;/p&gt;"></div></main>'
        self.assertEqual(visible_text(page), "Paved path & benches")
        self.assertNotEqual(fingerprint(page), fingerprint(page.replace("Paved path", "Path closed")))

    def test_mura_chrome_and_nontext_configuration_are_ignored(self):
        page = '<nav><div data-object="text" data-source="Menu changes"></div></nav><div data-object="map" data-source="Map configuration"></div><p>Entrance</p>'
        self.assertEqual(visible_text(page), "Entrance")


class ScriptProseTests(unittest.TestCase):
    PAGE = '<body><p>Nav</p><script type="module">render({"body":"Mostly flat, paved walking trail<br/> for 0.5 mile loop","id":"a8f3c2e9b1d4f6a7c3e8b2d9f1a4c7e2","nonce":"x"})</script></body>'

    def test_extracts_prose_strings_not_tokens(self):
        self.assertEqual(script_prose(self.PAGE), "Mostly flat, paved walking trail for 0.5 mile loop")

    def test_quote_matching_decodes_json_paragraph_breaks(self):
        page = '<script>render({"body":"Paved trail to the pasture.\\n\\nSurface changes to gravel after 0.2 mile."})</script>'
        passage = "Paved trail to the pasture. Surface changes to gravel after 0.2 mile."
        self.assertIn(quote_text(passage), quote_text(page))
        self.assertNotIn(quote_text(passage), quote_text(page.replace("gravel", "dirt")))

    def test_content_change_inside_script_changes_fingerprint(self):
        changed = self.PAGE.replace("Mostly flat", "Steep and narrow")
        self.assertEqual(visible_text(self.PAGE), visible_text(changed))
        self.assertNotEqual(fingerprint(self.PAGE), fingerprint(changed))

    def test_minified_code_between_quotes_is_not_prose(self):
        page = '<script>a="x";window.__CF$cv$params={r:"a576c463f868bebb",t:"MTc5"};var l = document.createElement("script") ; "y"</script>'
        self.assertEqual(script_prose(page), "")

    def test_script_text_ignored_when_page_has_real_content(self):
        body = "<p>" + "Accessible seating is in the last rows. " * 40 + "</p>"
        a = body + '<script>x({"promo":"Buy tickets for the big weekend game now"})</script>'
        b = body + '<script>x({"promo":"Stream every game this season on the app"})</script>'
        self.assertEqual(fingerprint(a), fingerprint(b))

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


def noted(fid, url, status="source_checked"):
    return {"id": fid, "source_url": url, "review_status": status, "history": []}


class QuoteTests(unittest.TestCase):
    URL = "https://a.example/access"
    PLACES = [{"facts": [noted("a.mobility.1", URL), noted("a.sensory.1", URL), noted("a.chronic.1", URL, "retired")]}]
    QUOTES = {
        "a.mobility.1": {"url": URL, "quote": "The venue\u2019s ramp is at the north door"},
        "a.sensory.1": {"url": URL, "quote": "Sensory bags are available"},
    }

    def page(self, body):
        return {self.URL: {"status": 200, "_text": quote_text(body)}}

    def test_curly_quotes_and_markup_do_not_break_a_match(self):
        self.assertIn(quote_text("The venue\u2019s ramp &amp; lift"), quote_text("<p>The venue's&nbsp;ramp\n &amp;amp; lift</p>"))

    def test_changed_page_with_every_quote_intact_is_supported(self):
        findings = {self.URL: "changed"}
        page = self.page("<p>New hours!</p><p>The venue's ramp is at the north door.</p><p>Sensory bags are available.</p>")
        self.assertEqual(judge_by_quotes(self.PLACES, self.QUOTES, page, findings), {})
        self.assertEqual(findings, {self.URL: "supported"})
        self.assertEqual(flag_facts(self.PLACES, findings, "2026-11-10"), 0)

    def test_missing_quote_flags_only_that_note(self):
        import copy
        places = copy.deepcopy(self.PLACES)
        findings = {self.URL: "changed"}
        page = self.page("<p>The venue's ramp is at the north door.</p><p>Sensory bags are no longer offered.</p>")
        missing = judge_by_quotes(places, self.QUOTES, page, findings)
        self.assertEqual(findings, {self.URL: "quote_missing"})
        self.assertEqual(missing, {self.URL: ["a.sensory.1"]})
        self.assertEqual(flag_facts(places, findings, "2026-11-10", missing), 1)
        statuses = {f["id"]: f["review_status"] for f in places[0]["facts"]}
        self.assertEqual(statuses, {"a.mobility.1": "source_checked", "a.sensory.1": "needs_recheck", "a.chronic.1": "retired"})

    def test_a_note_without_a_quote_keeps_whole_page_review(self):
        findings = {self.URL: "changed"}
        page = self.page("<p>The venue's ramp is at the north door.</p>")
        quotes = {"a.mobility.1": self.QUOTES["a.mobility.1"]}
        self.assertEqual(judge_by_quotes(self.PLACES, quotes, page, findings), {})
        self.assertEqual(findings, {self.URL: "changed"})

    def test_other_findings_are_left_alone(self):
        findings = {self.URL: "unavailable"}
        judge_by_quotes(self.PLACES, self.QUOTES, {self.URL: {"status": 404}}, findings)
        self.assertEqual(findings, {self.URL: "unavailable"})


class CoverageTests(unittest.TestCase):
    def test_partial_source_check_preserves_unreviewed_findings(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            sources = root / "snapshots"
            sources.mkdir()
            selected = "https://reviewed.example/"
            held = "https://held.example/"
            baseline = {"status": 200, "sha256": "same", "fingerprint_version": 5}
            prior = {
                "sources": {selected: baseline, held: baseline},
                "findings": {selected: "changed", held: "quote_missing"},
                "missing_quotes": {held: ["held.mobility.1"]},
            }
            (sources / "2000-01-01.json").write_text(json.dumps(prior))
            catalog = root / "places.json"
            catalog.write_text(json.dumps([{"facts": [fact(selected), fact(held)]}]))
            wanted = root / "urls.txt"
            wanted.write_text(selected)
            with patch.object(check_sources, "SNAPSHOT_DIR", sources), patch.object(check_sources, "PLACES", catalog), patch.object(check_sources, "fetch", return_value=baseline.copy()), patch.object(check_sources, "load_quotes", return_value={}):
                check_sources.main(["--only", str(wanted)])
            saved = json.loads(sorted(sources.glob("*.json"))[-1].read_text())
            self.assertEqual(saved["findings"], {held: "quote_missing"})
            self.assertEqual(saved["missing_quotes"], {held: ["held.mobility.1"]})
            self.assertEqual(saved["sources"][held], baseline)

    def test_uncovered_lists_active_sources_without_a_baseline(self):
        places = [{"facts": [noted("a.mobility.1", "https://a.example/1"), noted("a.mobility.2", "https://a.example/2"), noted("a.mobility.3", "https://a.example/3", "retired")]}]
        self.assertEqual(uncovered(places, {"https://a.example/1": {}}), ["https://a.example/2"])

    def test_every_catalog_source_has_a_baseline(self):
        """After adding notes, run `python3 pipeline/check_sources.py --new-only`
        and commit the snapshot; a source with no baseline is never monitored."""
        places = json.loads((ROOT / "src/data/places.json").read_text())
        latest = sorted((ROOT / "pipeline/source-checks").glob("*.json"))[-1]
        self.assertEqual(uncovered(places, json.loads(latest.read_text())["sources"]), [])

    def test_stored_quotes_belong_to_live_notes(self):
        path = ROOT / "pipeline/evidence/quotes.json"
        if not path.exists():
            return
        places = json.loads((ROOT / "src/data/places.json").read_text())
        urls = {f["id"]: f["source_url"] for p in places for f in p["facts"]}
        for fid, q in json.loads(path.read_text()).items():
            self.assertEqual(q["url"], urls.get(fid), fid)
            self.assertTrue(q["quote"].strip(), fid)


if __name__ == "__main__":
    unittest.main()
