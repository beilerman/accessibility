# Food access follow-up — November 12, 2026

Additional work after the Florence/Newport/Hebron batch, in the same dedicated
workspace and against the same publication base. No Git writes, deployment, preview,
private correspondence, messages, database or scheduler actions were performed.

## Accepted: Rhinegeist Brewery

**Four new notes, one revised note, three existing notes confirmed; one full venue
review.** This adds to the earlier batch's two full venue reviews, bringing the
weekly count to **19/8**. There is no new partial review.

Fresh official sources:

- [Brewery tours](https://rhinegeist.com/brewery-tours/): the two-week advance-notice
  condition for public-tour access arrangements and stroller warning remain
  published, alongside 60-minute duration, walk-up signups and pet restrictions.
  Permanent ID `rhinegeist-brewery.mobility.1` was revised to state those practical
  conditions instead of repeating a broad compliance phrase. The other three old
  notes were retained after their complete wording was reviewed and supported.
- [Private celebrations](https://rhinegeist.com/celebrations/): one new note covers
  the publisher's elevator-access statement for **private event spaces** only.
  Another covers the small first-come public lot across the street, nearby paid
  parking, offered parking map and optional valet. Neither establishes a particular
  elevator location, public taproom entrance or street-crossing route.
- [Taproom](https://rhinegeist.com/taproom/): free table reservations for groups of
  ten or more, giving party size and time. This is not evidence of table clearances,
  wheelchair seating or a specific seat guarantee.
- [Rooftop](https://rhinegeist.com/rooftop/): food instructions require collecting
  Pizza Time orders in the taproom and bringing them up. A new note retains that
  practical collection step while leaving the inter-floor route unknown. The old
  outside-food/weather/first-come note is still supported by the current FAQ.

The source's general public-tour walk-up wording does not cancel its separate
access-arrangement notice period. The limitations explain that distinction.
Elevator evidence for private events does not establish an uninterrupted public
route or a rooftop connection. Toilets, entrance controls, parking spaces and quiet
areas remain unverified. No service-animal prohibition was inferred from a pet rule.

The rooftop page's live header showed CLOSED when read in the early morning. This
was **not** turned into an all-day/season closure or reopening claim: the page gives
seasonal, weather-dependent operation and the header may reflect the time of day.
The old indexed `/visit-us/book-a-tour/` content differs from today's fetched page;
a fresh request redirects to `/brewery-tours/`. Current direct evidence governs
this review, rather than the stale indexed scheduling wording.

## Held: MadTree Oakley Taproom

The official [Oakley location page](https://madtree.com/locations/oakley-taproom/)
and [FAQ](https://madtree.com/faqs/) initially fetched HTTP 200 and all four proposed
note passages and the address machine-matched against a fresh browser-user-agent
fetch. They give 3301 Madison Road, on-site parking, a Madison Road bridge/crosswalk
connection to more parking, generally first-come seating with larger-party
reservations, menu labels and a patio pet restriction.

The source monitor subsequently received **HTTP 403 for both pages**. A limited
follow-up confirmed that its exact user agent is blocked, while the browser user
agent can read the location page. Browser control itself is unavailable. Under the
blocked-source/manual-review rule, the proposed listing was removed from the
unpublished import and its route/category test additions were withdrawn. **No
MadTree listing, note or source baseline is included in the public catalog.**

The complete candidate is preserved in `madtree-oakley-held-2026-11-12.json`;
verified held passages/address remain clearly labeled in
`food-access-2026-11-12-evidence.json`. Do not import until manual review establishes
the evidence and monitoring disposition. Do not transfer facilities between Oakley,
Alcove-OTR and Summit Park. The shared Alcove page combines two addresses; its
parking-language scope is not securely branch-specific. The Alcove event page
places the Loft on the third floor but does not establish elevator access.
No listing or physical-access claim was added from those pages.

## Access-imagery search and inspection

Commons metadata verified reuse permission before downloading two Rhinegeist
thumbnails. Both were visually inspected and **held**, with neither published:

- [Reception hall, June 28, 2014](https://commons.wikimedia.org/wiki/File:Picture_of_the_Rhinegeist_Reception_Hall.jpg),
  5chw4r7z, CC BY-SA 2.0. Original 2000 × 1500. The full frame shows long benches,
  tables, circulation space and strong roof lighting, but many prominent identifiable
  incidental visitors. It is an old crowded event scene, not a current seating plan.
  A deskewed derivative also exists; it was not used as an altered access image.
- [Brewery equipment, March 15, 2015](https://commons.wikimedia.org/wiki/File:Rhinegeist_foto_by_andy_hemmer_cincinnati.jpg),
  AndyHemmerCincinnati, CC BY-SA 4.0. Original 3264 × 2448. The view shows brewing
  tanks, chains, warning signs, a raised work area and ladder, without people. It
  does not identify the public tour route, arrival, seating, lift or toilet. It was
  not selected as a useful visitor-access photograph.

No reusable location-matched MadTree access photo or official photo walkthrough
was established. No guide was added during the food follow-up. The first batch's
licensed Newport library photo remains the only new published photograph this run.

## Combined run results and validation

The accepted combined batch has **two new venues, 32 new notes, three full existing
venue reviews, five confirmed old notes and three revised old notes**. Two revisions
canonicalize Newport's citations without changing wording; one replaces Rhinegeist's
broad compliance phrase with procedures. There are no new partial reviews. Catalog:
**111 venues, 882 active notes, 389 stored quotes, 15 access photos and nine guide
entries** (eight distinct documents). Category distribution is 32 arts, 28 parks,
20 museums/attractions, 14 libraries, seven shopping, five transport and five food.

Final fresh verification covers **45 accepted-evidence checks**: all 40 public notes
at five touched venues, two new addresses, the separate IKEA stock-conflict passage,
Newport signup-assistance passage and Rhinegeist duration passage. The held MadTree
candidate had five additional earlier matches, which are not accepted venue progress.
All fifteen cited official source URLs for accepted notes have successful baselines.
Unselected snapshots/findings, prior media, unrelated records/quotes and history
prefixes are preserved.

Final types, lint, **56 unit tests**, **42 pipeline tests** and production build pass.
The existing nonfatal Atkinson font fallback warning remains. The browser suite
lists 93 tests; its targeted new-route test is blocked before navigation by macOS
Chromium Mach-port denial (1100). The browser connector host is unavailable. No
browser pass, screenshot or full accessibility audit is claimed. Runner browser
validation is still required before publication.

Ten final-build HTTP checks cover all 40 notes and limitations on five touched venue
pages, Kentucky Shopping discovery, the visual index, source credits, updates and
the exact served Newport photo bytes. The final preservation and whitespace checks
pass. See the current handoff and coverage queue for the next concrete batch.

## Additional held photo lead resolved by inspection

The older research queue's rate-limited [Scheben Branch photo](https://commons.wikimedia.org/wiki/File:Boone_County_Public_Library_-_Scheben_Branch.jpg)
was retried successfully. Commons metadata confirms Mhuy222, CC BY-SA 4.0,
December 31, 2019, original 2051 × 2563. After license verification, the full-frame
1280 × 1600 thumbnail downloaded and was visually inspected. It shows the rear
facade and marquee, a roadside sidewalk, grass verge and kerb; it does not show the
visitor entrance, parking-to-door connection, equipment or facilities. No people
are visible. It remains held as weak access imagery, rather than being counted as
a new photograph. The marquee's old holiday closure is not a current notice. No
Scheben note or listing-level check date was refreshed from this photo-only search.
