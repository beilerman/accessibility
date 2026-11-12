"""recheck.py <spec.json> [date]: record that notes were re-read against their sources.

spec = {fact_id: quote} for notes the live page still supports. The quote is
the verbatim passage you matched (run verify.py first); it is stored in
pipeline/evidence/quotes.json. Use null to record a recheck without a quote.

Each note gets retrieved_at = date, review_status source_checked and a
"rechecked" history entry. A place's checked_at moves forward only when all
of its active notes were re-read on that date and have source_checked status.
Notes that need new wording or withdrawal are edited by hand (keep the ID,
append "revised" or "retired").
"""
import json
import sys

from _catalog import load_places, load_quotes, record_quote, save_places, save_quotes, today

date = sys.argv[2] if len(sys.argv) > 2 else today()
with open(sys.argv[1]) as source:
    spec = json.load(source)
places = load_places()
quotes = load_quotes()
seen = set()
for place in places:
    for fact in place["facts"]:
        if fact["id"] not in spec:
            continue
        assert fact["review_status"] != "retired", fact["id"]
        seen.add(fact["id"])
        was_flagged = fact["review_status"] != "source_checked"
        fact["retrieved_at"] = date
        fact["review_status"] = "source_checked"
        fact["history"].append(dict(date=date, action="rechecked", note=(
            "Re-read after the source monitor flagged the page; the source still supports this note."
            if was_flagged else "Routine recheck; the source still supports this note.")))
        record_quote(quotes, fact["id"], fact["source_url"], spec[fact["id"]], date)
    active = [f for f in place["facts"] if f["review_status"] != "retired"]
    if active and all(f["retrieved_at"] == date and f["review_status"] == "source_checked" for f in active):
        place["checked_at"] = date
unknown = set(spec) - seen
assert not unknown, f"unknown note IDs: {sorted(unknown)}"
save_places(places)
save_quotes(quotes)
print(f"{len(seen)} notes rechecked on {date}")
