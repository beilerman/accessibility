# Sharonville, Blue Ash, Burlington dining, Fairfield groceries and Rowe Woods

Prepared November 12, 2026, in the dedicated automation workspace. The agent
reviewed all recovered edits against publication base
`a0f29e5cdcd4fc69629ce45885d116619ea8ad7a`, found no conflict markers and preserved
unrelated public work. The runner owns validation, commits and atomic branch
pushes. No deployment, scheduler/hosting change, private correspondence, message,
account submission or database action was performed.

## New public information

**38 new notes across five venues.** Three new listings:

- **Blue Ash Recreation Center — 11 notes.** Completed 2026 zero-depth pool entry
  and handrails, wading-pool entry, shade, changing/shower descriptions, membership
  eligibility and purchase, disability-discount documentation, second-floor
  equipment, orientation scheduling and seasonal/repair limits. The second-floor
  equipment list does not establish an elevator connection. The continuing
  September 28 floor-repair banner forecasts six weeks; it is not completion
  evidence. The residency-document lists differ on the same membership page.
- **Sharonville Community Center & Family Aquatic Center — 12 notes.** In-deck
  lifts for the plunge and competitive pools, zero-depth family pool, caregiver
  assistance, staff demonstration without lifting people, family restroom and
  baby changing, in-person membership, guest ID, banked indoor track and dated
  summer operation. The April 2026 guide says guest ID applies at 18 and older;
  the pool-rules webpage says over 18. Both remain visible. No current lift
  operation, weight limit, independent transfer or adult changing is inferred.

- **Tousey House Tavern, Burlington — three notes.** A late search located the
  official reservation page: upstairs/downstairs dining, no elevator, a first-floor
  table request through booking notes or telephone, and telephone arrangements
  for groups over ten. The current step-free doorway, thresholds, toilets and
  patio route remain unknown. Two licensed July 2020 photographs show front steps
  and side paving; the front view is also the venue image.

Depth in existing listings:

- **Jungle Jim’s Fairfield — four notes.** Advance tour arrangements and tailoring
  conditions, microphone/food-sample context, holiday/December limits, and the
  printable map. Its URL says June 2021, but the freshly fetched one-page PDF has
  the title `Fairfield_Map_Aug2026_Inside` and a printed 2026 copyright. This is a
  diagram rather than a photo guide or route inspection. The equipment page does
  not specify Giraffe versus Rhino collection or return arrangements.
- **Rowe Woods — eight notes.** Visitor-center rest locations, picnic tables,
  advance accommodation discussion, closing/weather limits, the cabin’s location
  beside the Discovery Trail, and **2026 Light in the Forest** route conditions.
  The event FAQ specifies an incline, uneven/unpaved surface and help required;
  it is not the daytime trail’s all-accessible designation. Parking attendants
  guide entry to a circular two-way route; indoor warming stops do not establish
  quiet rooms. The page’s June heading and November section coexist, and generic
  easy-trail distance criteria differ from the listed Upland distance/rating.

Every new note has a permanent ID, fresh supporting passage and monitored source
baseline. Notes summarize the source; quotations remain editorial evidence.

## Freshness, separately counted

Two complete existing-listing reviews: all six Jungle Jim’s notes and all eight
Rowe Woods notes. **13 confirmed without revision; one revised.** Rowe Woods
`cognitive.1` now specifies the non-member card/photo-ID procedure; its mobile-guide
claim was separately checked on the same source page. All eight previously
unquoted Rowe Woods notes now have supporting passages. Both full-review dates
are November 12. No new partial review or retirement.

The prior weekly log already recorded 29/8. Jungle Jim’s had been fully reviewed
November 11, so this repeat must not inflate the unique weekly venue count. Rowe
Woods adds one venue to that prior log; this pass did not retrospectively audit
the historical weekly tally. Earlier AMC, Central Park and Molly holds and
full-review dates are preserved. TANK’s pending partial remains source-only depth
without old-note freshness credit.

## Photographs and official visual material

Four licensed full-frame photographs were inspected and converted/resized only:

- **Jungle Jim’s Ireland aisle**, Commons 66242627, credited to Jungle Jim’s
  International Market, CC BY 2.0. Capture metadata: January 7, 2003. Shelving,
  a display rack, an aisle and double doors are visible; the doorway role,
  present layout, dimensions and current conditions are unknown.
- **Abner Hollow Pioneer Cabin interior**, Commons 203156267, Sadlon161,
  CC BY-SA 4.0, October 30, 2026. Worn plank floor, irregular gaps, table, beams
  and open doors are visible. This is not a complete approach, threshold survey,
  field audit or winter-event photograph. The trail label is not transferred to
  the cabin interior. A lake image was inspected and held as weak route evidence.

Two further photographs show Tousey House’s front brick steps and side paving,
Commons 93853271/93853273, w_lemay, CC0, July 19, 2020. The numbered doorway and
Tousey House signs identify the property. These do not select today’s step-free
entrance; seven other inspected views were held as duplicative.

One linked official guide: **Sharonville’s Summer 2026 Hometown Guide**, 28 pages,
4.6 MB, freshly fetched from the city’s current publication index. Page 17 has a
small photograph of the banked indoor track and railings. Individual capture dates
are not supplied. It is a general activity guide, not a complete arrival/lift
walkthrough. The photographs were not copied into local assets.

All **18 pending access-photo frames** were reviewed and matched to fresh Commons
licence/date/aspect metadata. All **four newly linked distinct guide documents**
were freshly fetched and their relevant pages visually inspected, retaining
historical and election-specific limits. See the media receipt.

## Research support change

`pipeline/check_sources.py` and `scripts/research/verify.py` now support text PDFs.
This allows the important April 2026 Sharonville lifting restriction to retain a
machine-matched passage, rather than publishing a claim from a search snippet.
The pipeline requirements add pinned `pypdf` and `fonttools`; font support is
needed for the city guide’s embedded fonts. No Next.js or UI component changed.

- HTML fingerprint behavior stays at version 6.
- PDF fingerprints use original bytes (`pdf-bytes-1`) on every machine. With the
  parser installed, changed documents are checked against stored text passages.
- Without the parser, a PDF byte change still triggers a whole-document review;
  it cannot confirm quotes. The existing standard-library-only weekly workflow
  remains unchanged. Use the provided Python environment for passage matching.
- No OCR, image-to-fact inference or decryption. Empty/image-only, encrypted,
  malformed or over-limit documents provide no matching passage. Limits are
  10 MiB per document/page content stream and 150 pages. Larger linked visual
  guides remain usable through their independent visual-review workflow.
- Seven regressions cover PDF recognition, changed passages, metadata-only
  changes, missing parser, unusable documents, limits and unchanged HTML behavior.
  Earlier verified-TLS fallback and partial-review freshness safeguards were
  reviewed and retained.

Agent-side Python checks use:

```sh
UV_CACHE_DIR=/tmp/threshold-uv-cache uv run --python 3.11 --with-requirements pipeline/requirements.txt python -m unittest discover -s pipeline -p 'test_*.py'
```

## Validation and combined pending scope

- **373 fresh supporting checks across 109 official sources; zero misses.**
- **78 unit tests and 61 Python tests pass.** TypeScript, lint, production build
  and diff checks pass. New venue routes/category tests were added.
- **71 final-build local HTTP checks** cover all changed/new pages, every active
  note and limitation on those pages, filters, guide/photo links, visual/source
  registers and exact local asset bytes. These are HTML checks, not browser tests.
- **116 browser tests listed, not passed.** Targeted Playwright cannot launch
  Chromium: macOS Mach-port registration denial 1100 before navigation. Fresh
  CUA inventory also reports browser host unavailable. No browser interaction,
  site screenshot or production verification is claimed. The runner must pass
  browser validation before publication writes.
- Preservation audit passes: every old ID and history prefix, unrelated listing,
  original media/category object, permitted quote change, held partial date and
  unselected source-monitor finding remains intact.

Combined pending changes: **19 new venues, 209 new notes, five old-note revisions,
11 full/two partial existing-venue reviews, 18 access-photo entries (17 new
captures and one reused capture), seven guide entries/four newly linked distinct
documents**. There are 64 distinct old notes reviewed: 59 confirmed without
revision and five revised. One revised note also has a recheck history entry.

Catalog totals: **133 venues, 1,131 active notes, 680 stored quotes, 34 access
photos, 17 guide entries/thirteen distinct documents**. See the validation JSON
for per-venue changes, supporting checks, preservation and HTTP receipts.

## Held findings and next batch

The detailed holds receipt preserves all leads and failed retrievals. Tousey’s
initial hold was resolved by a fresh official reservation-page fetch; its remaining
entrance/toilet gaps stay explicit. Do not substitute the Vance–Tousey property
in Indiana. The indexed Sharonville 2023 report returns 404; current project renderings do
not establish completed facilities. The hospital-hosted 2013 third-party Rowe
Woods book excerpt was inspected but not selected as a current official venue
guide. Uninspected or failed image downloads were not imported.

Next prioritize **Northern Kentucky everyday destinations and actual arrival
photos**: Tousey’s intended visitor door/route, public-service entrances and grocery
collection/loan procedures. Continue Sharonville lift/door/toilet details, Blue
Ash’s elevator and repair completion, Jungle Jim’s exact equipment-collection
entrance and current aisle/toilet images, and Rowe Woods’s cabin threshold and
winter-route assistance. Keep all earlier queue holds and unresolved source
conflicts. Deployment and scheduler administration remain with the runner.
