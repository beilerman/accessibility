"""apply_depth.py <spec.json> [date]: append notes to existing places.

spec = {slug: [[domain, text, url, source_type?, quote?], ...]}
source_type defaults to venue_official. Pass the verified verbatim quote as
the fifth item (a string or a list for compound notes). It is required and
freshly matched before saving, then stored in pipeline/evidence/quotes.json so the source
monitor can tell whether a later page change still supports the note.

Adding depth is a partial review. The listing's checked_at advances only if
every active note has been source-checked on this date; older, held and flagged
notes keep the listing's earlier full-review date.
"""
import json
import sys

from _catalog import load_places, load_quotes, new_fact, record_quote, save_places, save_quotes, today

date = sys.argv[2] if len(sys.argv) > 2 else today()
places = load_places()
by_slug = {p["slug"]: p for p in places}
quotes = load_quotes()
with open(sys.argv[1]) as source:
    spec = json.load(source)
for slug, notes in spec.items():
    place = by_slug[slug]
    have = {f["text"].strip().lower() for f in place["facts"]}
    for note in notes:
        domain, text, url = note[:3]
        source_type = note[3] if len(note) > 3 and note[3] else "venue_official"
        assert text.strip().lower() not in have, f"duplicate note for {slug}: {text[:60]}"
        n = 1 + max([int(f["id"].rsplit(".", 1)[1]) for f in place["facts"] if f["domain"] == domain] or [0])
        fact = new_fact(slug, n, domain, text, url, source_type, date)
        place["facts"].append(fact)
        have.add(text.strip().lower())
        record_quote(quotes, fact["id"], url, note[4] if len(note) > 4 else None, date, text)
    active = [f for f in place["facts"] if f["review_status"] != "retired"]
    if active and all(f["retrieved_at"] == date and f["review_status"] == "source_checked" for f in active):
        place["checked_at"] = date
    print(slug, "+", len(notes))
save_places(places)
save_quotes(quotes)
