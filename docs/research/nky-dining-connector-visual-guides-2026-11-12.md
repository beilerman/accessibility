# Northern Kentucky dining, streetcar and visual-guide review — November 12, 2026

Prepared in the dedicated automation workspace from publication base
`ef1fe664e621fe8e37faf71a42a59c887920fcb6`. The preceding 23-venue batch was
already pushed by the runner; none of its additions is counted again here.
This batch is local content for runner validation and atomic publication, not
a deployment. No Git writes, hosting changes or private correspondence.

## New public information and coverage

**Three new Kentucky food/drink listings, 23 notes:**

- **New Riff Distilling & The Aquifer, Newport (ten):** published front-door
  no-stairs statement, large elevator for wheelchair user and companion, front
  parking lot, walk-in shop/bar versus booked experiences, age distinctions,
  tour duration, card payment, closure and cancellation conditions. The separate
  West Campus is identified as another address with appointment/tour restrictions.
  A free lot does not establish designated bays or a continuous usable route;
  no elevator dimensions, door controls or toilet features are inferred.
- **Braxton Brewing Company — Covington (four):** the elevator statement applies
  to the second-floor Loft private-event space. Paid nearby parking and distinct
  first-floor, Loft and rooftop booking arrangements are recorded. The rooftop
  route remains unknown; the Loft elevator does not establish rooftop access.
- **Riverside Food Tours — Mainstrasse Village (nine):** published meeting point,
  possible restaurant steps, walking distance/duration and benches, parking
  location without an assumed connection, restaurant toilet availability without
  physical specifications, dietary notice, weather arrangements, email confirmation,
  advance booking and advertised clock-tower stop. No current chime schedule or
  step-free alternative is invented.

**Sixteen new notes at four existing places:** Central Park / Boone County
Arboretum (six), the Connector (five), Taft Museum (two), Contemporary Arts Center
(three). Arboretum trail lengths (2.2 versus 2.35 miles), opening descriptions
(7:30 versus dawn) and city/ZIP labels remain explicit source differences. The
streetcar additions cover stop buttons, in-car maps, emergency intercom and
published cart/food rules, without inferred reach dimensions or policy exceptions.
Taft adds current card-only payment and diaper-changing locations; these do not
establish adult changing. CAC adds current admission, medical/diaper bags and
exhibition-change closures. Its existing group-tour note restores two weeks'
notice. Taft's coatroom/locker note now includes the first-floor location.

## Freshness, separately counted

Three existing venues fully reviewed: **Central Park / Boone County Arboretum,
the Connector and Taft Museum**. Their venue check dates advance to November 12.
CAC is a **partial** review of one old note plus three new notes; its whole-venue
date remains November 9. Across these reviews, 23 old notes were read: 21
confirmed and two revised. Two Arboretum notes already checked earlier November
12 were reconfirmed without duplicate history. Thus 21 distinct old notes have
new history in this diff: nineteen confirmations and two revisions. The weekly
eight-venue target had already been met; this report does not recalculate unique
weekly totals or count repeat reads as new coverage.

## Photographs and official visual guides

**Two licensed full-frame photographs**, originals and converted outputs visually
inspected, resized/converted only:

- Warren LeMay, November 24, 2019, **CC0**: Goebel Park clock-tower arch,
  surrounding paving and nearby benches, linked to the Mainstrasse tour's
  advertised stop. Historical neighborhood context, not its entire walking route.
- David Wilson, April 22, 2017, **CC BY 2.0**: arriving Connector car at Fountain
  Square, platform paving/textured edge, canopy and route board. Small background
  passengers remain; no close portraits. No boarding gap, door-control operation,
  continuous arrival route or current conditions inferred.

Attribution, source, licence links, capture/check dates, alt text and narrow limits
are stored in `src/data/access-photos.json`; files are in `public/images/access/`.
Twenty-six candidate frames were visually inspected. New Riff West Campus photos
were held because they depict the other destination. Braxton sign/street frames
and Arboretum planting photographs add little access evidence. Streetcar interior
frames with prominent identifiable passengers and a historical different car were
held. No scene alterations, generated access imagery or screenshots were imported.

**Two newly linked official documents**, not republished images:

- CAC **2023–24 group social narrative**, 20 pages, 2,385,460 bytes (2.4 MB);
  PDF metadata August 25, 2023. All pages rendered and contact-sheet reviewed;
  pages 3, 5, 11–13, 18–20 inspected individually. Photos show entrance/front
  desk, restroom signs/interior, elevator-side lobby, stairs and coat bins.
  Individual capture dates are unknown. The guide's blanket free-admission text
  is dated: the current official admission page lists $12 general admission and
  specified free categories. Public guide description and notes explain this.
- Taft **2025 visitor guide**, four pages, 5,258,159 bytes (5.3 MB), PDF metadata
  December 2024. All four pages individually inspected. Page 1 has a front-steps
  photograph; pages 3–4 are floor-plan diagrams marking elevators, staff-assisted
  lift, restrooms, diaper stations, quiet room and garage connection. Diagrams are
  identified as diagrams, not photographs proving usable routes or equipment
  operation. Individual photo dates unknown.

Both original PDF links freshly fetched; page counts, byte sizes and known dates
are retained in `src/data/access-guides.json`. Arboretum's 2024 plant/map brochure
and a 2015 streetcar safety guide (proposed 2016 fares and example imagery) were
inspected but not added as current access-photo guides.

## Evidence and validation

The companion `-evidence.json` preserves **72 verified supporting checks across
20 freshly fetched official sources**, including added notes, reviewed old notes,
compound-note secondary passages and new addresses. New-source monitor baselines
are recorded; ten existing source pages associated with full reviews were
rechecked with the helper. CAC's old source was not globally refreshed after a
partial review. Blocked Aquarium, unstable Krohn and unselected findings remain.

Types, lint, **86 unit tests**, **61 Python tests**, production build and
preservation/whitespace checks pass. Routes and category expectations include all
three new venues. **123 browser tests are listed, not passed locally**: Chromium
fails before navigation with macOS Mach-port permission denial 1100; the separate
browser host is unavailable. The runner must perform host browser validation
before publication. Local final-build HTTP/media checks and fresh media receipts
are recorded in the companion validation JSON. They do not establish rendered
browser behavior. No framework component changed.

Catalog totals: **140 venues, 1,217 active notes, 792 stored quotes, 38 photographs,
19 guide entries linking 15 distinct documents**. This run adds 39 notes, two
old-note revisions, two photos and two guide documents.

## Held findings and next concrete batch

- **Braxton rooftop igloos:** five draft notes held. An initial page/monitor fetch
  worked, but confirmation fetches returned 429. Do not transfer the Loft elevator
  to the rooftop. Re-fetch the seasonal source before importing; quoted drafts
  are in the companion holds file.
- **Grocery breadth:** Trader Joe's Crestview Hills branch page gives its 2780
  Dixie Highway address but no specific access equipment/arrival evidence.
  Kroger's canonical Newport I-471 store is **014/00423**; direct fresh branch and
  regional pickup fetches timed out. Search results are not accepted evidence.
  Generic pickup FAQ included a Harris Teeter-specific SNAP passage; no transfer
  to this store. Meijer Florence store 151 returned 403; chain-level equipment or
  another state's adult-changing facility does not establish Florence provision.
  Crestview Hills Town Center's visit page added no concrete feature evidence.
- **CAC conflict:** older access wording mentions service dogs and ponies, while
  the current hours page defines service animals through dogs. No policy/legal
  resolution inferred. Obtain clarification/current consistent official wording.
- **Taft:** undated December 9 early-close notice lacks a printed year; held.
  Seek actual lift/quiet-room photographs and adult-changing evidence.
- **Next:** NKY grocery pickup/loan equipment and actual parking-to-door images;
  New Riff east-site entrance/door/toilets; Braxton Loft elevator location and
  rooftop route; Riverside restaurant thresholds/alternatives. Continue Tousey
  first-floor door, Government Center construction connection, Pendery crossing
  and AJ Jolly winter toilets. At the Arboretum resolve opening/postal differences,
  slopes and restroom season; seek current Connector door/intercom/platform images.
  R.C. Durr YMCA's page freshly returned 200 and supported held seasonal pool,
  busy-time, photo-ID and deck-closing leads. It still lacks reviewed entrance,
  parking route, pool-entry equipment/transfer and changing-facility evidence.
  Its individual image licences/dates are unestablished; no image download or
  visual-inspection claim. The companion holds receipt preserves this lead.
