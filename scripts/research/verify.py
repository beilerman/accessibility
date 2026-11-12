"""verify.py <agent.json>: re-fetch cited sources and match every passage.

Accepts new-place records (facts + address_quote) or depth records ({slug, facts}).
A fact's quote may be a string or a list of separate passages. Presence is not
proof that the summary follows from the source; editorial review remains required.
"""
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'pipeline'))
from check_sources import fetch, ok, quote_text, supporting_passages


def main(path):
    with path.open() as source:
        data = json.load(source)
    cache = {}
    bad = total = 0
    for record in data:
        name = record.get('name') or record.get('slug') or 'unnamed'
        items = list(record.get('facts', []))
        if 'address_quote' in record:
            items.append(dict(quote=record['address_quote'], url=record['address_url'], claim='ADDRESS'))
        for fact in items:
            total += 1
            value = fact.get('quote')
            parts = value if isinstance(value, list) else [value]
            evidence = {'quote': parts[0] if parts else None, 'additional_quotes': parts[1:]}
            passages = supporting_passages(evidence)
            url = fact['url']
            if url not in cache:
                cache[url] = fetch(url)
            response = cache[url]
            text = response.get('_text')
            available = (ok(response) and bool(text)
                         and response.get('final_url', url).startswith('https://'))
            verified = bool(passages) and available and all(quote_text(q) in text for q in passages)
            fact['verified'] = bool(verified)
            fact['source_status'] = response.get('status')
            fact['source_sha256'] = response.get('sha256')
            if not verified:
                bad += 1
            print(('OK  ' if verified else 'ERR ' if not available else 'MISS'),
                  name[:34].ljust(34), '|', str(value)[:70])
    # A zero-item input has verified nothing and must not satisfy the gate.
    if not total:
        bad += 1
    output = path.with_name(path.stem + '.verified.json')
    with output.open('w') as target:
        json.dump(data, target, indent=1, ensure_ascii=False)
    print(f'{total} checked, {bad} failed')
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main(Path(sys.argv[1])))
