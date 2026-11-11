"""Detect changes in the public sources behind catalog facts.

Fetches every distinct fact `source_url`, reduces the page to normalized
visible text and stores a SHA-256 snapshot. Comparing with the previous
snapshot reports sources that changed or stopped loading.

A changed hash is a signal for an editor, not a finding: pages change for
reasons unrelated to accessibility. Nothing here edits fact text.

  python3 pipeline/check_sources.py              # report only, save snapshot
  python3 pipeline/check_sources.py --flag       # also mark affected facts needs_recheck
  python3 pipeline/check_sources.py --new-only   # baseline sources added since the last snapshot
  python3 pipeline/check_sources.py --only urls.txt  # re-baseline sources an editor just re-read

Where a note's supporting passage is on file (pipeline/evidence/quotes.json),
a changed page is judged by whether that passage is still there, not by the
page hash alone: SUPPORTED needs no action, QUOTE_MISSING names the notes to
re-read.

Run from the repository root. Standard library only.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import html as html_lib
import json
import re
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

PLACES = Path("src/data/places.json")
SNAPSHOT_DIR = Path("pipeline/source-checks")
# {fact_id: {"url", "quote", "verified_at"}}: the verbatim passage an editor
# matched against the live page when the note was written or rechecked.
# Evidence for editors and this monitor only; never shown on the site.
QUOTES = Path("pipeline/evidence/quotes.json")
USER_AGENT = "ThresholdSourceCheck/1.0 (accessibility directory source monitor)"
# Bump when fingerprint() changes; hashes from other versions are not compared.
FINGERPRINT_VERSION = 5
# Measured 2026-11-08: script-rendered pages show <300 visible characters,
# content pages >1,300.
SCRIPT_FALLBACK_BELOW_CHARS = 1000


class _TextExtractor(HTMLParser):
    # Site chrome (menus, footers) varies by server and is not access content.
    SKIP = {"script", "style", "noscript", "svg", "template", "head", "nav", "header", "footer"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.inline_scripts: list[str] = []
        self._skip = 0
        self._in_inline_script = False

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self._skip += 1
        if tag == "script" and not dict(attrs).get("src"):
            self._in_inline_script = True

    def handle_endtag(self, tag):
        if tag in self.SKIP and self._skip:
            self._skip -= 1
        if tag == "script":
            self._in_inline_script = False

    def handle_data(self, data):
        if self._in_inline_script:
            self.inline_scripts.append(data)
        elif not self._skip:
            self.parts.append(data)


# A quoted string of at least five space-separated words: prose, not a token.
_PROSE_LITERAL = re.compile(r'"((?:[^"\\]|\\.){20,})"')


# Minified code between two quotes can look like a long string; prose does
# not contain braces, assignments or statement separators.
_CODE_LIKE = re.compile(r"[{}=;]|\bwindow\.|\bfunction\b|=>")


def script_prose(html: str) -> str:
    """Prose embedded in inline scripts.

    Some sources (e.g. parks.ky.gov) ship page content as JSON inside an
    inline script, so visible text alone would miss real content changes.
    Only multi-word strings count, which leaves out IDs, hashes and nonces.
    """
    parser = _TextExtractor()
    parser.feed(html)
    out = []
    for script in parser.inline_scripts:
        for m in _PROSE_LITERAL.finditer(script):
            try:
                value = json.loads(f'"{m.group(1)}"')
            except ValueError:
                continue
            text = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", value)).strip()
            if len(text.split(" ")) >= 5 and not _CODE_LIKE.search(text):
                out.append(text)
    return " ".join(out)


# Per-request text that is not content (load-balancer node names etc.).
_VOLATILE = [re.compile(r"BiblioWeb: app\d+")]


def visible_text(html: str) -> str:
    parser = _TextExtractor()
    parser.feed(html)
    text = re.sub(r"\s+", " ", " ".join(parser.parts)).strip()
    for pattern in _VOLATILE:
        text = pattern.sub("", text)
    return text


def text_blocks(html: str) -> list[str]:
    """Distinct visible text blocks plus script prose, sorted.

    Sorting makes the fingerprint ignore pure reordering (some sites shuffle
    menu items per request) while any edit to a block still changes it.
    """
    parser = _TextExtractor()
    parser.feed(html)
    blocks = set()
    for part in parser.parts:
        block = re.sub(r"\s+", " ", part).strip()
        for pattern in _VOLATILE:
            block = pattern.sub("", block).strip()
        if block:
            blocks.add(block)
    # Script text is a fallback for pages whose content is rendered from
    # inline JSON (parks.ky.gov shows ~20 visible characters). On normal
    # pages it is mostly site-wide menus and promotions that churn daily.
    if sum(len(b) for b in blocks) < SCRIPT_FALLBACK_BELOW_CHARS:
        prose = script_prose(html)
        if prose:
            blocks.add(prose)
    return sorted(blocks)


def fingerprint(html: str) -> str:
    return hashlib.sha256("\n".join(text_blocks(html)).encode()).hexdigest()


def quote_text(raw: str) -> str:
    """Normalize a page (or a quote) for exact-substring quote matching.

    Tags are dropped but script contents are kept, because some sites ship
    their copy as JSON. Typographic quotes and dashes are flattened so a
    curly apostrophe never reads as a content change.
    """
    for _ in range(3):
        raw = re.sub(r"<[^>]+>", " ", html_lib.unescape(raw))
    for a, b in (("\u00a0", " "), ("\u2019", "'"), ("\u2018", "'"), ("\u201c", '"'), ("\u201d", '"'), ("\u2013", "-"), ("\u2014", "-")):
        raw = raw.replace(a, b)
    return re.sub(r"\s+", " ", raw)


def load_quotes() -> dict[str, dict]:
    return json.loads(QUOTES.read_text()) if QUOTES.exists() else {}


def judge_by_quotes(places, quotes, current, findings) -> dict[str, list[str]]:
    """Refine each 'changed' source using the supporting passages on file.

    If every active note citing the page has a passage and all of them are
    still on the page, the finding becomes 'supported'. If any passage is
    gone, it becomes 'quote_missing' and those note IDs are returned. Pages
    with a note that has no passage on file stay 'changed' (whole-page review).
    """
    by_url: dict[str, list[dict]] = {}
    for place in places:
        for fact in place["facts"]:
            if fact["review_status"] != "retired":
                by_url.setdefault(fact["source_url"], []).append(fact)
    missing: dict[str, list[str]] = {}
    for url, kind in list(findings.items()):
        if kind != "changed":
            continue
        facts = by_url.get(url, [])
        page = current[url].get("_text")
        known = [f for f in facts if f["id"] in quotes and quotes[f["id"]].get("url") == url]
        if page is None or not known:
            continue
        gone = [f["id"] for f in known if quote_text(quotes[f["id"]]["quote"]) not in page]
        if gone:
            findings[url] = "quote_missing"
            missing[url] = gone
        elif len(known) == len(facts):
            findings[url] = "supported"
    return missing


def uncovered(places: list[dict], snapshot: dict[str, dict]) -> list[str]:
    """Active source URLs with no baseline in a snapshot (so never monitored)."""
    urls = {f["source_url"] for p in places for f in p["facts"] if f["review_status"] != "retired"}
    return sorted(urls - set(snapshot))


def fetch(url: str, timeout: float = 30) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode(resp.headers.get_content_charset() or "utf-8", "replace")
            return {
                "status": resp.status,
                "final_url": resp.geturl(),
                "last_modified": resp.headers.get("Last-Modified"),
                "sha256": fingerprint(body),
                "fingerprint_version": FINGERPRINT_VERSION,
                "chars": len(visible_text(body)),
                # In memory only (dropped before the snapshot is written).
                "_text": quote_text(body),
            }
    except urllib.error.HTTPError as e:
        return {"status": e.code, "error": str(e.reason)}
    except Exception as e:  # network, TLS, timeout
        return {"status": None, "error": f"{type(e).__name__}: {e}"}


# Bot protection answers automated clients with these; the page may be fine.
BLOCKED_STATUSES = {401, 403, 429}


def ok(result: dict) -> bool:
    return result.get("status") is not None and 200 <= result["status"] < 400


def compare(previous: dict[str, dict], current: dict[str, dict]) -> dict[str, str]:
    """Return {url: 'changed' | 'unavailable' | 'blocked'} for sources needing a look.

    Pure comparison; main() then passes 'changed' through confirm_changes().

    'blocked' means bot protection refused the automated fetch; it needs a
    manual browser check and never flags facts. A first-ever snapshot never
    reports 'changed'.
    """
    findings: dict[str, str] = {}
    for url, now in current.items():
        before = previous.get(url)
        if now.get("status") in BLOCKED_STATUSES:
            findings[url] = "blocked"
        elif not ok(now):
            findings[url] = "unavailable"
        elif (
            before
            and ok(before)
            and before.get("fingerprint_version") == now.get("fingerprint_version")
            and before.get("sha256") != now.get("sha256")
        ):
            findings[url] = "changed"
    return findings


def confirm_changes(previous, current, findings, fetcher=None) -> dict[str, str]:
    """Re-fetch each 'changed' source twice before believing it.

    Both re-fetches must agree with each other and differ from the previous
    snapshot. A re-fetch matching the previous snapshot means the difference
    was transient; re-fetches that disagree mean the page varies per request
    ('unstable', reported but never flagged).
    """
    fetcher = fetcher or fetch
    confirmed = dict(findings)
    for url, kind in findings.items():
        if kind != "changed":
            continue
        a, b = fetcher(url), fetcher(url)
        old = previous[url].get("sha256")
        if old in (a.get("sha256"), b.get("sha256")):
            del confirmed[url]
            current[url] = a if a.get("sha256") == old else b
        elif a.get("sha256") == b.get("sha256"):
            current[url] = a
        else:
            confirmed[url] = "unstable"
    return confirmed


def flag_facts(places: list[dict], findings: dict[str, str], today: str, missing: dict[str, list[str]] | None = None) -> int:
    flagged = 0
    missing = missing or {}
    for place in places:
        for fact in place["facts"]:
            kind = findings.get(fact["source_url"])
            if kind == "quote_missing":
                # Only the notes whose passage disappeared need a re-read.
                if fact["id"] not in missing.get(fact["source_url"], []):
                    continue
                kind = "changed"
            if kind not in ("changed", "unavailable") or fact["review_status"] == "retired":
                continue
            status = "source_unavailable" if kind == "unavailable" else "needs_recheck"
            if fact["review_status"] == status:
                continue
            fact["review_status"] = status
            fact["history"].append(
                {
                    "date": today,
                    "action": "flagged",
                    "note": "Source page no longer loads; awaiting editorial recheck."
                    if kind == "unavailable"
                    else "Source page text changed; awaiting editorial recheck.",
                }
            )
            flagged += 1
    return flagged


def latest_snapshot() -> dict[str, dict]:
    files = sorted(SNAPSHOT_DIR.glob("*.json"))
    return json.loads(files[-1].read_text()) if files else {}


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--flag", action="store_true", help="mark affected facts in places.json")
    ap.add_argument("--new-only", action="store_true", help="fetch only sources missing from the latest snapshot and add them to it")
    ap.add_argument("--only", metavar="FILE", help="fetch only the URLs listed in FILE (one per line) and update them in the snapshot; use after re-reading those sources")
    args = ap.parse_args(argv)

    places = json.loads(PLACES.read_text())
    urls = sorted({f["source_url"] for p in places for f in p["facts"] if f["review_status"] != "retired"})
    previous_record = latest_snapshot()
    previous = previous_record.get("sources", {})
    if args.new_only:
        urls = uncovered(places, previous)
    elif args.only:
        wanted = set(Path(args.only).read_text().split())
        urls = [u for u in urls if u in wanted]
    current = {}
    for url in urls:
        current[url] = fetch(url)
        print(f"{current[url].get('status')!s:>5}  {url}", file=sys.stderr)

    findings = confirm_changes(previous, current, compare(previous, current))
    missing = judge_by_quotes(places, load_quotes(), current, findings)
    today = dt.date.today().isoformat()
    snapshot_findings = findings
    snapshot_missing = missing
    for result in current.values():
        result.pop("_text", None)
    if args.new_only or args.only:
        # Earlier baselines are carried forward untouched: they still record
        # the state an editor last reviewed.
        snapshot_findings = {u: kind for u, kind in previous_record.get("findings", {}).items() if u not in current}
        snapshot_findings.update(findings)
        snapshot_missing = {u: ids for u, ids in previous_record.get("missing_quotes", {}).items() if u not in current}
        snapshot_missing.update(missing)
        current = {**previous, **current}
    SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
    out = SNAPSHOT_DIR / f"{today}.json"
    out.write_text(json.dumps({"checked_at": today, "sources": current, "findings": snapshot_findings, "missing_quotes": snapshot_missing}, indent=2) + "\n")

    for url, kind in sorted(findings.items()):
        print(f"{kind.upper():13} {url}" + (f"  notes: {', '.join(missing[url])}" if url in missing else ""))
    attention = sum(kind != "supported" for kind in findings.values())
    print(f"{len(urls)} sources checked, {attention} need attention; snapshot {out}")
    if args.flag and findings:
        n = flag_facts(places, findings, today, missing)
        PLACES.write_text(json.dumps(places, indent=2, ensure_ascii=False) + "\n")
        print(f"Flagged {n} facts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
