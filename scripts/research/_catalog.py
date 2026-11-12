"""Shared helpers for the research scripts: catalog and evidence files."""
import datetime
import json
import pathlib
import sys
from functools import lru_cache

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "pipeline"))
import check_sources as sources
PLACES = ROOT / "src/data/places.json"
QUOTES = ROOT / "pipeline/evidence/quotes.json"
ADDED_NOTE = "Added from the linked official public source; no field observation or private visitor report is implied."
DOMAINS = {"mobility", "sensory", "cognitive", "chronic"}
SOURCE_TYPES = {"venue_official", "operator_official", "partner_official", "public_agency"}


def today() -> str:
    return datetime.date.today().isoformat()


def load_places() -> list:
    return json.loads(PLACES.read_text())


def save_places(places: list) -> None:
    PLACES.write_text(json.dumps(places, indent=2, ensure_ascii=False) + "\n")


def load_quotes() -> dict:
    return json.loads(QUOTES.read_text()) if QUOTES.exists() else {}


def save_quotes(quotes: dict) -> None:
    QUOTES.parent.mkdir(parents=True, exist_ok=True)
    QUOTES.write_text(json.dumps(dict(sorted(quotes.items())), indent=1, ensure_ascii=False) + "\n")


@lru_cache(maxsize=256)
def source_result(url: str) -> dict:
    """A fresh response per URL within this import process, shared across notes."""
    return sources.fetch(url)


def record_quote(quotes: dict, fact_id: str, url: str, quote, date: str, claim: str) -> None:
    """Re-fetch evidence before a helper can save source_checked information.

    A list preserves separate passages for compound notes. This checks presence,
    not semantic entailment; an editor must compare every clause and condition.
    """
    passages = quote if isinstance(quote, list) else [quote]
    record = {"url": url, "quote": passages[0] if passages else None,
              "verified_at": date}
    if len(passages) > 1:
        record["additional_quotes"] = passages[1:]
    if not sources.supporting_passages(record):
        raise ValueError(f"{fact_id}: nonempty supporting passages are required")
    if not isinstance(claim, str) or not claim.strip():
        raise ValueError(f"{fact_id}: note text is required")
    response = source_result(url)
    if (not sources.ok(response) or not response.get("_text")
            or not response.get("final_url", url).startswith("https://")):
        raise ValueError(f"{fact_id}: source could not be checked: {response.get('status')}")
    if any(sources.quote_text(q) not in response["_text"] for q in passages):
        raise ValueError(f"{fact_id}: supporting passage missing from fresh source")
    record["claim_sha256"] = sources.claim_digest(claim)
    record["source_sha256"] = response.get("sha256")
    record["final_url"] = response.get("final_url", url)
    quotes[fact_id] = record


def new_fact(slug, n, domain, text, url, source_type, date, published_at=None) -> dict:
    assert domain in DOMAINS, domain
    assert source_type in SOURCE_TYPES, source_type
    assert url.startswith("https://"), url
    return dict(domain=domain, text=text, source_url=url, id=f"{slug}.{domain}.{n}", source_type=source_type,
                retrieved_at=date, published_at=published_at, observed_at=None, review_status="source_checked",
                history=[dict(date=date, action="added", note=ADDED_NOTE)])
