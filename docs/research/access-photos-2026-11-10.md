# Access photographs and visual guides

Prepared November 10, 2026, for Brad's request to develop the depth and breadth of
Threshold's information, especially photographs relevant to access.

## Implemented collection

The venue pages now have an access-media section, reached from the page's jump links.
The Visual guide page collects the same photographs and official photo-guide links.
The source register includes each additional photograph. Images preserve their full
frames, use descriptive alt text and display photo dates, credit and reuse licence.
Published route information is linked beside the photographs.

The photographs were downloaded from Commons thumbnails, visually inspected, then
resized/converted to WebP with Sharp. No scene elements were changed. Local files are
in public/images/access/. Date and licence metadata were checked against the Commons
imageinfo API and description pages. The images show historical views.

| Place | Visible detail | Photo date | Author | Reuse |
| --- | --- | --- | --- | --- |
| Cincinnati Art Museum | Long ramp behind a low wall and planting bed, with separate steps | June 1, 2021 | EEJCC | CC0 |
| Smale Riverfront Park | Paved riverfront path and river-side railing near the Roebling Bridge | July 18, 2021 | w_lemay | CC BY-SA 2.0 |
| Miami Whitewater Forest | Paved Shaker Trace Trail segment and grassy verge | May 12, 2013 | Quadell | CC BY-SA 3.0 |

Original photograph pages are linked in src/data/access-photos.json. The 2013 trail
photo predates the resurfacing described in the venue notes. Each caption tells
visitors what to confirm. A visible surface or ramp does not establish gradient,
measurements, a complete route or current operation.

## Official photo walkthroughs

All four PDFs were freshly downloaded successfully with HTTP 200. Their page counts,
content and file sizes were inspected locally with PyMuPDF. Representative pages
were rendered and visually inspected. Their photographs are linked at the publisher,
with descriptions in src/data/access-guides.json.

- Cincinnati Art Museum, Getting Around the Cincinnati Art Museum, 2025 version,
  20 pages, 2.3 MB. Shows the Welcome Cart, restroom approaches, elevators and quiet
  space. Pages 7–10 cover the Great Hall restroom approach, Elevator A, quiet space
  and ground-floor restrooms.
- Cincinnati Museum Center, Quiet Zones & Restrooms Accessibility Amenities,
  cover dated May 26, 2023, 13 pages, 6.6 MB. Photos show quiet spaces, restroom
  approaches and adult changing tables, especially pages 8–11.
- Boone County Public Library Main Library sensory-room social narrative,
  date unknown, 20 pages, 29 MB. Photos show staff sign-in, the timer, light switches
  and sensory equipment. The public page confirms the room is on Main's second floor.
- Cincinnati Zoo & Botanical Garden, Going to the Zoo social narrative, 2025 version,
  32 pages, 29 MB. Arrival photos on pages 3–7 show parking, elevator/escalator,
  pedestrian bridge, ticket building and entrance gates.

The 2025 Art Museum entering-the-museum PDF advertised by the current accessibility
page returned 404 through web retrieval. Its older 2020 file was not selected for this
batch. The Getting Around PDF loaded successfully with a direct fetch. Web retrieval
also failed on some working large PDFs. Direct downloads and local inspection
established the working links included above.

## Additional notes

Eight new notes were written from official HTML pages and machine-matched against a
second fresh fetch, using the existing quote normalizer. They cover Art Museum
elevator locations and Art Climb platforms, Main Library room access and equipment,
Museum Center rental conditions and photo walkthroughs, and zoo accessible parking.
Full-listing checked_at dates were preserved because these were partial depth reviews.
The source snapshot was refreshed for those four URLs.

The earlier recurring batch is retained, including Brady's qualified medical-bag
policy and AMC's six held notes. Its filename-parsing failure came from stripping
the leading space from git status output. The Mac runner now preserves those spaces.

A partial source-monitor run also erased earlier findings for unselected URLs.
check_sources.py now retains unreviewed findings and missing-quote lists. A regression
test covers that case. Earlier unreviewed findings, including Krohn's unstable source,
were restored in this snapshot.

## Ongoing priorities

Brad's Mac maintenance prompt now rotates access-photo collection, deeper venue notes,
new venue coverage and the weekly rolling recheck. It supports photo and guide
manifests, access-photo assets, research notes and the existing new-venue test lists.
The release job remains limited to 9 a.m. and 5 p.m. Eastern and two Vercel deployments
per Eastern calendar day.

Prioritize Northern Kentucky entrances, parking-to-door connections, actual lift
platforms, wheelchair seating, restroom interiors and changing facilities. Search
licensed public sources and official visual guides. Keep private submissions and
unlicensed venue images held until their publication permission is established.
Record capture dates, avoid inferring measurements, and verify each linked guide.
Look for new everyday venues with adequate official evidence. BCM/NaturePlay remains
a research lead because live retrieval failed during this batch.

Screenshots and source downloads for this review are local temporary research files
under /tmp/threshold-access-research/. Production verification follows the next
scheduled release.
