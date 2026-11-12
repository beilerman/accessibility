# Covington, Kenwood, Middleton-Mills and Newport food — November 12, 2026

Prepared in the dedicated automation workspace from publication base
`2503d375405dcc76c5faf0d4d0282f01aca36f04`. The workspace started clean, with no
unfinished edits or conflict markers. The previous `latest.json` summary/phase and
coverage queue were reviewed. No open Source monitor issue was returned. No Git
writes, deployment/previews, scheduler/hosting/database actions, messages or private
correspondence. The runner owns final validation and atomic publication pushes.

## Public progress and freshness

Three new venues, **40 new notes** overall, one full existing-venue review, no new
partial existing-note rechecks and no revisions or retirements. Two successive
batches investigated five venues with accepted progress.

- **Galaxie Covington: new, ten notes.** Official Covington FAQ confirms
  815 Madison Avenue, Covington, KY 41011; describes an entrance, seating, parking
  and restroom for wheelchair users; identifies a customer lot, shaded patio,
  electronic-music programming, walk-in/table-ticket conditions, age rules,
  dietary discussion and online food ordering. No dimensions, uninterrupted route,
  quiet-room or toilet-layout claims were inferred. Louisville facilities were not
  transferred. The FAQ lists Sunday–Tuesday closed but also mentions Tuesday in
  its lunch and happy-hour answers; the branch page says Sunday–Tuesday closed.
  The source difference stays in limitations, with a confirmation instruction.
  Sources: [Covington FAQ](https://www.galaxiebar.com/faq-1-1) and
  [branch page](https://www.galaxiebar.com/covington).
- **BRKTHROUGH Cincinnati/Kenwood: new, ten notes.** Branch FAQ confirms
  7875 Montgomery Road, Space 1169, Cincinnati, OH 45236. Its **over 50%** statement
  about game rooms is attributed, without promising universal room access.
  Practical details cover two-to-four-person teams, wristband/green-light check-in,
  three-to-five-minute games, two/three-hour sessions, physical demands, waivers,
  adult-supervision age bands, booking, late arrival, cancellation and lockers.
  Entrance, parking, toilets, changing, seating, sensory effects and hearing support
  remain unknown. The house policy's unexplained “registered service animals”
  phrase is recorded as venue wording, not adopted as a legal requirement.
  Sources: [Cincinnati FAQ](https://www.brkthrough.com/cincinnati/faqs),
  [house policy](https://www.brkthrough.com/cincinnati/house-policy).
- **Middleton-Mills Park: five new notes; both prior notes confirmed.** Full review
  moves `checked_at` from November 8 to November 12. Kentucky Fish & Wildlife's
  **Shelterhouse Pond pier** entry supplies paved parking, disability parking,
  restroom/pier categories with year-round **limited hours**, and the driving
  approach. Limited hours are not a confirmed winter schedule or physical audit.
  The county's two shelters and online booking link are added. Stable IDs and old
  wording/history prefixes are preserved. Weekly full reviews now **20/8**.
  Sources: [county facility](https://www.kentoncounty.org/Facilities/Facility/Details/MiddletonMills-Park-4),
  [state pier entry](https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1165).
  The linked county map was freshly fetched and visually inspected: **August 2026**,
  one image-based page, with ZIP **41051** versus **41015** on the current county
  facility page for the same street address. The map is not a photo guide. Its
  address was read visually; no successful text-substring extraction is claimed.
- **TANK: ten new notes, depth only.** No prior note/history is rechecked or changed
  by this pass. The listing's existing same-day full-review date is preserved.
  Current route pages add scheduled shopping/transfer stop names, without implying
  pavement, curb ramps or entrance connections. The July 10 alert permanently
  removes outbound **Holman at MLK**, directing riders to Russell and/or 13th;
  Route 5's current timetable still includes **Holman at Martin Luther King Jr.**
  Both sources and the conflict remain visible. Brent Spence construction's
  potential delays and extra-time instruction are added. Follow-up adds current
  fixed-route Tap & Save caps, app setup/QR presentation, the $5 smart card sold at
  headquarters, loading/registration and cash/paper alternatives. The published
  daily/monthly wording does not promise a calendar reset, Plus coverage or
  cash-based fare capping. Existing reduced-fare, Plus-zone and Route 16 source
  differences remain intact.
  Sources: [alerts](https://www.tankbus.org/service-alerts/),
  [Route 1](https://www.tankbus.org/bus_routes/dixie-highway-florence/),
  [Route 5](https://www.tankbus.org/bus_routes/holman-avenue-fort-wright/),
  [Tap & Save](https://www.tankbus.org/tap-and-save/).
- **Hofbräuhaus Newport: new, five notes.** Home page confirms 200 E Third Street,
  Newport, KY 41071. Reservations are Sunday–Thursday/up to twelve, with no
  Friday/Saturday table reservations; larger groups contact the venue. Kitchen
  closing precedes venue closing. November 2026 performance slots are dated, not
  generalized into measured sound or guaranteed quiet times. The street/restaurant
  Biergarten-access description is explicitly a **May 19, 2021 article**, not a
  current step-free-route claim. The reservation body says ZIP **41017**, while its
  header/footer and home page say **41071**; the difference is visible. No Columbus
  or Pittsburgh facilities, table clearances or toilet features were transferred.
  Sources: [home](https://www.hofbrauhausnewport.com/),
  [reservations](https://www.hofbrauhausnewport.com/reservations/),
  [2021 Biergarten article](https://www.hofbrauhausnewport.com/comfort-community-biergarten/),
  [band calendar](https://www.hofbrauhausnewport.com/experience/).

Totals: **114 venues, 922 active notes, 431 stored quotes**. Category counts:
32 arts, 28 parks, 21 museums/attractions, 14 libraries, seven shopping, seven food
and five transport. New route and KY food/OH recreation discovery checks were added
in the existing test files. AMC and all earlier held notes/dates remain untouched.

## Access imagery

**One new reusable full-frame photograph**, in `src/data/access-photos.json` and
`public/images/access/hofbrauhaus-newport-outdoor-edge-2013.webp`:

- [Third Street Motor Car Company Building / Hofbräuhaus Newport](https://commons.wikimedia.org/wiki/File:Third_Street_Motor_Car_Company_Building.jpg),
  **Nyttend, March 16, 2013, public-domain self-release**. Commons describes the
  historical building at **216 East Third Street**; the actual brewery signs in
  the frame identify Hofbräuhaus Newport, whose current address is 200. This is
  explicitly a building/outdoor-edge view, not identification of the visitor door.
  The stone wall, metal railings, diagonal rail/opening and street sidewalk are
  visible. Do not infer a route, gradients, clearances or current operation. A
  distant pedestrian is seen from behind with no visible face. Commons metadata,
  location description and reuse permission were checked **before download**.
  Original full-frame thumbnail and final **1280 × 960 WebP** were visually
  inspected. Only format conversion was applied; no cropping, scene alteration,
  synthetic features or ground-level reconstruction.

**One new linked historical photo document**, through `access-guides.json`:

- [TANK article in What’s Happening! in Kenton County, Fall/Winter 2017](https://static1.squarespace.com/static/5d24a9fd375b550001e43454/t/5d5db5cae9d0250001fda18c/1566422478871/WHKC_Fall_Winter2017_web.pdf).
  **20 pages, 1,446,954 bytes / 1.4 MB**; PDF metadata August 10, 2017. Pages 1,
  **13** and 20 rendered/inspected. Page 13 is the TANK-submitted renovation article
  and shows the information booth, route board and bus beside the raised boarding
  edge/Bay A sign. The footer says participating organizations provide/approve the
  articles; the original publisher was Rivertown Communications. The current
  [publisher archive](https://www.whatshappeningnews.com/pub-archive) links this
  edition; the county homepage links the same publisher's current-publications
  page. It is an official agency contribution, **not a continuous access walkthrough
  or current route guide**. Photo dates unknown; current bays, booth staffing,
  paving, lighting and boarding remain unverified. Linked only, with no reuse of
  unlicensed images. Fresh repeat fetch was HTTP 200 with identical SHA-256:
  `62c8d1a42707dbcadbffed4c37f1c0d381de1e5fea1eeaecbf60ddd19f346c69`.

Collection totals: **16 reusable access photographs, ten guide entries / nine
distinct documents**. Complete candidate metadata and guide/map/asset receipts are
in `covington-kenwood-middleton-2026-11-12-media.json`.

## Held findings and next leads

- Seven additional licensed TANK full frames were inspected. The 2012 Gillig 706
  view has an open doorway and grab rail but a more visible incidental passenger;
  it remains held. The 2011 Bakewell view is a side view without boarding detail.
  The 2014 2145/2179/601/2194 views show bus exteriors or backs rather than a useful
  boarding route. The 2012 Express BRT photo at CVG shows the vehicle's opposite
  side and an old transit sign, not a door/ramp procedure. No photo establishes
  current post-November-7 bays, deployed ramps or securement. Metadata/rights remain
  in the media receipt; no unsuitable image was imported.
- Commons search established no useful location-matched Galaxie, BRKTHROUGH or
  Middleton-Mills photo. Unrelated Middleton/industrial-history results were not
  treated as this park. Current park photo-gallery images have no established reuse
  licence and were not downloaded as photographs. The county map is not a photo.
- The [Hofbräuhaus group page](https://www.hofbrauhausnewport.com/group-sales/)
  advertises Bier Hall/Stube/Biergarten virtual tours. They remain **uninspected**;
  no inspected-guide entry or interior route claim was created. Tourist-review
  table-clearance anecdotes were not imported as Threshold firsthand reviews.
- The current county reservation provider returns a shell plus general rules,
  without establishing a Middleton shelter's availability, seasonal toilet delivery
  or the scope of mobility-device arrangements. A portable-toilet bid search result
  is not a delivery/operation receipt and was not imported.
- TANK's linked five-page June 2025 fare-capping FAQ was fetched and text reviewed
  as a further lead. Its detailed battery/readability, account-recovery, rolling
  24-hour/30-day and Plus exclusions were **not** imported as new notes: this
  batch's public additions use the freshly matched HTML page. No photo-guide entry
  was made for the text-only FAQ.
- **Next public-service lead:** [Government Center construction notice](https://www.kentoncountyky.gov/CivicAlerts.aspx?AID=604),
  freshly HTTP 200, May 4 notice with August 17 update. It says the Simon Kenton
  Way **lot entrance** closes from August 18 until expected spring 2027, with Pike
  Street access; alternative county services are listed in Independence. This is
  held as a next-listing lead pending branch/address/service and physical-access
  review. Do not interpret a driveway notice as a pedestrian door closure, assume
  an expected late-October road reopening happened, or repeat May voting guidance
  as a current election instruction. No Government Center listing imported.
- Earlier Meijer/Kroger/MadTree, TANK fare/zone/Route 16, county office, Chapin,
  Boone Woods completion, AMC and other holds remain in the queue.

## Collection helper and evidence review

`apply_depth.py` previously advanced a venue's full-review date after any partial
addition. It now advances only if **all active notes are source_checked and read
on the supplied date**, excluding retired notes. Older or flagged notes retain the
previous full-review date. Three regression cases cover older notes, all-current
notes plus a retired record, and a same-day flagged record. No framework code,
hosting or scheduler behavior changed.

`covington-kenwood-middleton-2026-11-12-evidence.json` records **59 fresh matching
checks, zero failures**: forty new notes, two prior notes, three addresses and
fourteen additional supporting passages. The image-based county-map ZIP check is
separately labeled visual in the media receipt. All twelve active cited HTML
sources were freshly baselined; unselected findings/snapshots were retained.
Final validation and publication boundaries are recorded in handoff section 26.

Validation receipt: `covington-kenwood-middleton-2026-11-12-validation.json`.
