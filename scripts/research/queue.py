"""queue.py: what to work on next, and the brief lines for a research agent.

  python3 scripts/research/queue.py recheck [n]   # the n places whose notes were read longest ago (default 8)
  python3 scripts/research/queue.py thin [max]    # places with at most max notes (default 4)
  python3 scripts/research/queue.py brief <slug>...  # brief lines for the given places
  python3 scripts/research/queue.py status        # coverage numbers for the handoff

Rechecking 8 places a week covers the whole catalog in about 13 weeks, well
inside the 180-day recheck window, so notes never all fall due on one day.
"""
import collections
import sys

from _catalog import load_places, load_quotes


def active(place):
    return [f for f in place["facts"] if f["review_status"] != "retired"]


def brief(place):
    notes = " / ".join(f"[{f['id']}] {f['text']}" for f in active(place))
    return f"- slug {place['slug']} ({place['name']}, site {place['website']}). Already have: {notes}"


def main(argv):
    places = load_places()
    command = argv[0] if argv else "status"
    if command == "recheck":
        n = int(argv[1]) if len(argv) > 1 else 8
        # Flagged notes first, then the oldest reads.
        def key(p):
            flagged = any(f["review_status"] != "source_checked" for f in active(p))
            return (not flagged, min(f["retrieved_at"] for f in active(p)), p["slug"])
        for place in sorted(places, key=key)[:n]:
            print(brief(place))
    elif command == "thin":
        limit = int(argv[1]) if len(argv) > 1 else 4
        for place in sorted(places, key=lambda p: (len(active(p)), p["slug"])):
            if len(active(place)) <= limit:
                print(f"{len(active(place))} notes  {place['slug']}")
    elif command == "brief":
        by_slug = {p["slug"]: p for p in places}
        for slug in argv[1:]:
            print(brief(by_slug[slug]))
    else:
        facts = [f for p in places for f in active(p)]
        quotes = load_quotes()
        oldest = collections.Counter(f["retrieved_at"] for f in facts)
        print(f"{len(places)} places, {len(facts)} active notes")
        print(f"notes with a stored supporting quote: {sum(f['id'] in quotes for f in facts)} of {len(facts)}")
        print(f"notes flagged for recheck: {sum(f['review_status'] != 'source_checked' for f in facts)}")
        print("notes by last read date:", ", ".join(f"{d}: {n}" for d, n in sorted(oldest.items())))


if __name__ == "__main__":
    main(sys.argv[1:])
