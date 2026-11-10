"""add_places.py <spec.json> [date]: append new places (hand-written notes).

Each record has slug, name, city, state, category, address, website,
source_url, limitations and facts. Each fact is
[domain, text, url, source_type, published_at, quote?]; the verified verbatim
quote is stored in pipeline/evidence/quotes.json for the source monitor.
"""
import json
import sys

from _catalog import load_places, load_quotes, new_fact, record_quote, save_places, save_quotes, today

date = sys.argv[2] if len(sys.argv) > 2 else today()
places = load_places()
have = {p["slug"] for p in places}
quotes = load_quotes()
for record in json.load(open(sys.argv[1])):
    slug = record.pop("slug")
    assert slug not in have, slug
    facts, count = [], {}
    for item in record.pop("facts"):
        domain, text, url, source_type, published_at = item[:5]
        count[domain] = count.get(domain, 0) + 1
        fact = new_fact(slug, count[domain], domain, text, url, source_type, date, published_at)
        facts.append(fact)
        record_quote(quotes, fact["id"], url, item[5] if len(item) > 5 else None, date)
    places.append(dict(**record, checked_at=date, slug=slug, evidence_type="public_website", observed_at=None, facts=facts))
    have.add(slug)
    print("added", slug, len(facts))
save_places(places)
save_quotes(quotes)
