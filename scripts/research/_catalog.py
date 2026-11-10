"""Shared helpers for the research scripts: catalog and evidence files."""
import datetime
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
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


def record_quote(quotes: dict, fact_id: str, url: str, quote, date: str) -> None:
    """Keep the verbatim passage that supports a note, for the source monitor."""
    if quote:
        quotes[fact_id] = {"url": url, "quote": quote, "verified_at": date}


def new_fact(slug, n, domain, text, url, source_type, date, published_at=None) -> dict:
    assert domain in DOMAINS, domain
    assert source_type in SOURCE_TYPES, source_type
    assert url.startswith("https://"), url
    return dict(domain=domain, text=text, source_url=url, id=f"{slug}.{domain}.{n}", source_type=source_type,
                retrieved_at=date, published_at=published_at, observed_at=None, review_status="source_checked",
                history=[dict(date=date, action="added", note=ADDED_NOTE)])
