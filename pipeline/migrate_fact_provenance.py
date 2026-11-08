"""One-time migration: give every catalog fact its own provenance record.

Before this migration, source type and dates applied to a whole listing.
After it, each fact carries a stable ID, its publisher type, separate
retrieved/published/observed dates, a review status, and an append-only
history. Listing-level `checked_at` remains as the date of the last full
listing review.

IDs are assigned once, as `<slug>.<domain>.<n>`, and are data from then on:
never renumber them, never reuse a retired ID. Editing a fact's text keeps
its ID and appends a `revised` history entry.

Idempotent: facts that already have an `id` are left untouched.
Run from the repository root: python3 pipeline/migrate_fact_provenance.py
"""

from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlparse

PLACES = Path("src/data/places.json")

# Publisher of a fact's source, relative to the listed place.
#   venue_official     - the place's own website
#   operator_official  - the organization that runs the place, on another domain
#   public_agency      - a government body describing the place (not its operator)
SOURCE_TYPE_BY_HOST = {
    "bcplundiscovered.org": "operator_official",  # Boone County Public Library
    "nps.gov": "public_agency",  # National Park Service listing of a state site
}


def registrable(host: str) -> str:
    return ".".join(host.split(".")[-2:])


def source_type(place: dict, url: str) -> str:
    host = registrable(urlparse(url).hostname or "")
    if host == registrable(urlparse(place["website"]).hostname or ""):
        return "venue_official"
    if host in SOURCE_TYPE_BY_HOST:
        return SOURCE_TYPE_BY_HOST[host]
    raise SystemExit(f"Unclassified source host {host} for {place['slug']}: {url}")


def migrate(places: list[dict]) -> int:
    changed = 0
    for place in places:
        counters: dict[str, int] = {}
        for fact in place["facts"]:
            if "id" in fact:
                counters[fact["domain"]] = counters.get(fact["domain"], 0) + 1
                continue
            n = counters.get(fact["domain"], 0) + 1
            counters[fact["domain"]] = n
            retrieved = place["checked_at"]
            fact.update(
                {
                    "id": f"{place['slug']}.{fact['domain']}.{n}",
                    "source_type": source_type(place, fact["source_url"]),
                    "retrieved_at": retrieved,
                    "published_at": None,
                    "observed_at": None,
                    "review_status": "source_checked",
                    "history": [
                        {
                            "date": retrieved,
                            "action": "added",
                            "note": "Summarized from the public source during initial catalog research.",
                        }
                    ],
                }
            )
            changed += 1
    return changed


if __name__ == "__main__":
    data = json.loads(PLACES.read_text())
    n = migrate(data)
    PLACES.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"Migrated {n} facts")
