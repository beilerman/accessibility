"""Detect changes in the public sources behind catalog facts.

Fetches every distinct fact `source_url`, reduces the page to normalized
visible text and stores a SHA-256 snapshot. Comparing with the previous
snapshot reports sources that changed or stopped loading.

A changed hash is a signal for an editor, not a finding: pages change for
reasons unrelated to accessibility. Nothing here edits fact text.

  python3 pipeline/check_sources.py              # report only, save snapshot
  python3 pipeline/check_sources.py --flag       # also mark affected facts needs_recheck

Run from the repository root. Standard library only.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import re
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

PLACES = Path("src/data/places.json")
SNAPSHOT_DIR = Path("pipeline/source-checks")
USER_AGENT = "ThresholdSourceCheck/1.0 (accessibility directory source monitor)"


class _TextExtractor(HTMLParser):
    SKIP = {"script", "style", "noscript", "svg", "template", "head"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self._skip += 1

    def handle_endtag(self, tag):
        if tag in self.SKIP and self._skip:
            self._skip -= 1

    def handle_data(self, data):
        if not self._skip:
            self.parts.append(data)


def visible_text(html: str) -> str:
    parser = _TextExtractor()
    parser.feed(html)
    return re.sub(r"\s+", " ", " ".join(parser.parts)).strip()


def fingerprint(html: str) -> str:
    return hashlib.sha256(visible_text(html).encode()).hexdigest()


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
                "chars": len(visible_text(body)),
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
        elif before and ok(before) and before.get("sha256") != now.get("sha256"):
            findings[url] = "changed"
    return findings


def flag_facts(places: list[dict], findings: dict[str, str], today: str) -> int:
    flagged = 0
    for place in places:
        for fact in place["facts"]:
            kind = findings.get(fact["source_url"])
            if kind not in ("changed", "unavailable"):
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
    return json.loads(files[-1].read_text())["sources"] if files else {}


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--flag", action="store_true", help="mark affected facts in places.json")
    args = ap.parse_args(argv)

    places = json.loads(PLACES.read_text())
    urls = sorted({f["source_url"] for p in places for f in p["facts"]})
    previous = latest_snapshot()
    current = {}
    for url in urls:
        current[url] = fetch(url)
        print(f"{current[url].get('status')!s:>5}  {url}", file=sys.stderr)

    findings = compare(previous, current)
    today = dt.date.today().isoformat()
    SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
    out = SNAPSHOT_DIR / f"{today}.json"
    out.write_text(json.dumps({"checked_at": today, "sources": current, "findings": findings}, indent=2) + "\n")

    for url, kind in sorted(findings.items()):
        print(f"{kind.upper():12} {url}")
    print(f"{len(urls)} sources checked, {len(findings)} need attention; snapshot {out}")
    if args.flag and findings:
        n = flag_facts(places, findings, today)
        PLACES.write_text(json.dumps(places, indent=2, ensure_ascii=False) + "\n")
        print(f"Flagged {n} facts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
