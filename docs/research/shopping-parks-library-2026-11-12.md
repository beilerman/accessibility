# Shopping, park procedures and Chapin library — November 12, 2026

Prepared in the dedicated automation workspace from publication base
`2987d1a60ada7c828f6044c639e51df025663e61`. The workspace started clean;
there were no pending edits or conflict markers to recover. The previous runner
summary was read from `latest.json`; its published commit matches this base.
No Git writes, deployment, previews, hosting/scheduler/database changes, private
correspondence or messages were performed. The public Source monitor issue search
returned no open issues.

## New public information and coverage

Two successive content batches and a further park-source review cover four venues,
with a fifth candidate (Meijer Florence) held after direct retrieval failed.

- **New: Florence Mall**, `florence-mall`, five notes. Confirmed address:
  2028 Florence Mall, Florence, KY 41042. The official contact page identifies
  parking near entrances, rideshare pickup at the main entrance and Guest Services.
  It does not name that entrance or establish curb crossings or thresholds.
  Santa Cares is specifically December 6, 2026, 8:30–9:30 a.m., one reservation
  per family; no everyday quiet-hours or particular lighting/sound adjustment is
  inferred. The working official map page is also linked in a preparation note.
- **New: IKEA West Chester**, `ikea-west-chester`, eleven notes. Confirmed address:
  9500 IKEA Way, West Chester, OH 45069. Local evidence identifies wheelchair
  collection in the entrance lobby, no store-provided motorized scooters, parking,
  pickup locations, backing in to request curbside loading help, entering through
  the exit and turning left for inside collection, and joining the returns queue
  before arrival. The local page gives a 24-hour collection hold and membership
  fee distinction. U.S. manual-wheelchair/own-device policies and order-ready-email
  instructions retain their separate sources. Baby-care rooms are located; their
  label does not establish a toilet or adult-changing equipment.
- **Depth: Chapin Memorial Library**, nine notes. The linked Express Access
  agreement gives registration requirements, age/companion rules, self-service
  resources, remote phone assistance and possible public-address announcements.
  System collection/translation-device statements remain attributed to BCPL.
  Saturday staffing differs across pages: locations and the agreement list the
  first Saturday 9 a.m.–1 p.m.; the branch page omits that session and gives
  Saturday general hours 10 a.m.–5 p.m. Both remain visible. A fresh November 12
  closure notice is explicitly dated and is not assumed to exempt Express Access.
- **Depth: Boone Woods**, seven notes. County shelter policy gives April–November
  restroom season, April–October shelter reservations, annual booking start and
  capacities. Further policy review supplies field-update times, tennis signup
  procedures and the different office contact address. None establishes current
  toilet operation, wheelchair table spaces or a continuous playground route.

**32 new notes in total:** sixteen at the two new shopping venues and sixteen
across the two older listings. There are also two revised prior notes, below.
The prepared catalog contains **109 places, 850 active notes and 349 stored quotes**.
Shopping has five listings; the other category counts are unchanged.

## Freshness and source correction

All seven prior notes at Boone Woods (four) and Chapin (three) were reviewed against
fresh sources: five retained, two revised. Both listings' `checked_at` dates move
to November 12. There are **two full reviews and no new partial reviews**. Weekly
full reviews reach **16/8**. AMC's six held notes and old listing date are untouched.

The permanent `boone-woods-park.mobility.1` now attributes the concrete rubber
surfacing and ramps to the county instead of repeating an unqualified
ADA-accessible-equipment phrase. Its existing ID and history are retained.

The permanent `boone-woods-park.chronic.2` was qualified after discovering a real
address conflict. Shelter instructions still name **5958 Garrard Street** and their
footer says **3920 Maplewood Drive**. The policies contact and 2026 parks newsletter
instead give **3290 Maplewood Drive**. The revised note retains the shelter source,
phone/online booking and permanent ID; a new policy-source note and the limitation
show the conflicting addresses and ask visitors to call before an office trip.
The park's own **6000 Veterans Way** address is unchanged. Earlier history is kept,
including the source-confirmation recheck preceding the revision in this pass.

## Licensed access photographs

Six Florence Mall Commons candidates were downloaded only after checking reuse
licences and all six were visually inspected. Two February 21, 2023 photographs by
**Larry Hachucka**, **CC BY-SA 4.0**, were selected:

- [Center court](https://commons.wikimedia.org/wiki/File:Florence_Mall_Center_Court;_Florence_KY.jpg):
  glass elevator, surrounding levels, low seating and a wood bench, under skylights.
- [Sears Court](https://commons.wikimedia.org/wiki/File:Sears_Court;_Florence_Mall;_Florence_KY.jpg):
  escalators between floors, low benches and patches of skylight. The limitation
  explains that escalators do not provide wheelchair access and that the frame
  does not locate an alternative elevator or establish its absence.

Full 1280×960 frames were converted to WebP with Sharp, with no scene edits or crop.
The source thumbnails and final WebPs were inspected. Dates, authors, licences,
original-page links, narrow alt text and current-operation limits are in
`src/data/access-photos.json`; files are under `public/images/access/`. The images
are historical; no entrance-to-elevator route, measurements or equipment operation
was inferred. Neither is linked to a parking note as if it illustrated that route.
There are now **fourteen licensed access photographs**.

## Linked visual resource

A new **Florence Mall guide association** links the city's 2025 visitor guide,
already linked for the Aquatic Center. Page 15 was rendered and visually inspected:
the lower photograph shows the mall's glass frontage, curved canopy, planters,
a bench and forecourt. The caption calls it a tourism brochure rather than an
access walkthrough, with photo date unknown and no door-control or continuous-route
claim. The guide has 56 pages, 17.7 MB (17,729,433 bytes); PDF metadata is July 30,
2025. The current city visitors page links it. Two fresh downloads returned HTTP
200 with identical bytes, SHA-256
`f24cf930d818adad0bdebe0c8373cef04f1bdf5daea912463d6281636e91fd31`.
No unlicensed photographs were republished. There are **nine venue-guide entries
pointing to eight distinct documents**.

## Evidence sources

The final per-note verification covers all 39 visible notes at the four touched
venues, plus the two new addresses: **41 checks**. Supporting passages are stored
by stable ID in `pipeline/evidence/quotes.json`. Thirteen cited HTML/form sources
were freshly fetched and baselined; unselected source snapshots/findings were kept.
The original guide link was checked separately. Sources:

- https://www.florencemall.com/contact
- https://www.florencemall.com/event/florence-santa-cares
- https://www.florencemall.com/map.php
- https://www.ikea.com/us/en/stores/west-chester/
- https://www.ikea.com/us/en/customer-service/knowledge/articles/3b8360c2-227d-4beg-bg1d-86819gf2297g.html
- https://www.ikea.com/us/en/customer-service/services/product-reservation/
- https://www.bcpl.org/locations/
- https://www.bcpl.org/locations/chapin
- https://bcplundiscovered.org/accessibilityoptions/
- https://docs.google.com/forms/d/e/1FAIpQLScr39oE5H41CR3Ruv7dyxbXNQ6fGPG-9xuxjNmcPqcw-TauuA/viewform
- https://www.boonecountyky.org/business_detail_T35_R58.php
- https://www.boonecountyky.org/services/parks/park_shelters/index.php
- https://www.boonecountyky.org/services/parks/park_policies/index.php

## Investigated and held

- **Meijer Florence:** [canonical branch](https://www.meijer.com/shopping/store-locator/151), query-string branch, tenant listing and
  digital-accessibility page returned 403 on direct fetch. Search retrieval gives
  the 4990 Houston Road address and pickup/drive-through leads, but these were not
  imported. The [September 30, 2026 newsroom page](https://newsroom.meijer.com/2026-09-30-New-Meijer-Grocery-Store-Opens-in-Fishers-Today) fetched 200 and mentions all-store
  Aira support; its height-adjustable changing tables belong to Fishers, Indiana,
  and are not Florence evidence. The browser host was unavailable. No local
  listing, equipment or toilet claim was added from these blocked sources.
- **Boone Woods restroom project:** the November 5, 2024 minutes (six scanned
  pages, 257,650 bytes) were rendered, with the proposal on pages 4–5 inspected.
  They approve a heated restroom building intended for year-round use. The [2024
  annual report](https://cms7files.revize.com/boonecountyky/document_center/BCFC_AnnualReport2024_8.5x11_04_Final_PDFx1a%20%281%29.pdf) (20 pages, 13,428,577 bytes, February 3, 2025 metadata), PDF page 15,
  also describes a future summer-2025 replacement. Neither establishes completion
  or operation. The current general shelter policy still gives April–November.
  No year-round availability, new restroom features or current stage route inferred.
- **County imagery:** the old 2025 newsletter URL is 404. The current parks page
  links a [working 2026 newsletter](https://www.boonecountyky.org/Documents/Services/Parks/BooneCounty_ParksNewsletter_2026_Final_Spreads.pdf) (13 PDF pages of cover/spreads/back cover,
  18,915,921 bytes, February 13 metadata). Relevant event/shelter pages and the
  moved-office back cover were rendered and inspected. Its generic shelter photo
  is not explicitly matched to Boone Woods; its other photos do not provide a
  useful matched entrance/restroom walkthrough. The annual report's small concert
  photo includes prominent audience members and predates the planned work. No
  additional venue photo or guide entry selected from these documents.
- **Other photos:** Commons searches for Chapin/Petersburg, Boone Woods and local
  IKEA variants did not establish a reusable matched access photograph. Do not
  substitute the Florence malls in Alabama or South Carolina. The 2019 mall views
  include more prominent visitors; the store-front close-up adds little useful
  route information. Two examined IKEA Flickr photo pages ([2007](https://www.flickr.com/photos/verybigjen/2098760987/in/album-72157594243413815) and [2015](https://www.flickr.com/photos/thaddfiala/18816264289)) say
  All rights reserved; their photographs were not downloaded or reused.
- **Mall directory:** `/map` returned 403, but `/map.php` fetched 200 and embeds a
  working one-page PDF at
  https://cdn.mallprism.com/images/directory/directorymap-638.pdf . It was rendered
  and inspected; it is an image-only layout with upper/lower levels and a facility
  legend, not a photograph. File metadata November 11, 2026 does not establish when
  the depicted conditions were observed. The new note links the map page; no
  diagram labels were converted into current equipment or restroom-feature claims.
- **Booking provider:** the mall's linked Santa reservation provider fetched as a
  script shell. No availability, package charge, entrance choice or detailed
  lighting/sound procedure was imported from it. The mall's own dated event
  statement supports the narrower note.
- **IKEA stale search content:** an undated parking-repainting warning appeared in
  search results but was absent from fresh official HTML. It was rejected before
  import. U.K./India shopping supports and other stores' changing tables are not
  West Chester evidence. The Florence Plan and Order Point is a future lead,
  distinct from the full West Chester store.

## Validation and continuation

Types, lint, 53 unit tests, 42 pipeline tests and production build pass. The existing
Atkinson font-fallback warning remains nonfatal. New routes and category discovery
checks use the existing test files. Preservation checks confirm all unrelated venue
records, prior history, untouched quotes/media and unselected source state remain
unchanged; `git diff --check` passes. Eleven final-build HTTP checks cover all touched
notes/limitations, Shopping filters in both states, media index, source credits,
revision link and exact new image bytes. These are markup checks, not a layout audit.

The suite lists **91 browser tests**. The targeted Florence Mall test failed before
navigation because macOS denied Chromium's Mach port (1100); browser-host inventory
also reported unavailable. No browser pass or rendered-site screenshot is claimed.
The runner must complete browser validation before pushing. Images and relevant
linked-guide pages were visually inspected independently.

Next: resolve Northern Kentucky grocery sources with an available browser; examine
IKEA's Florence Plan and Order Point separately; resolve the county office-address
conflict and completed restroom-project evidence; seek current Covington transfer
and boarding photos. Keep older AMC and other queue holds unchanged. Leave commits,
atomic branch pushes and the two scheduled daily releases to the runner.
