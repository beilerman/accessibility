# Creation Museum, Shakespeare, Emery, Proudworks and Second Sight — November 13, 2026

> Recovery follow-up: the host later passed 131 browser tests and failed one stale expected check date. That assertion is repaired, all pending work is preserved, and this report's counts/hashes are historical. See the [continuation report](music-observatory-ballet-jcc-2026-11-13.md) and its validation receipt for the current final batch.

Prepared in the dedicated automation workspace from `ea30d7ab9ea106160e791850b04d610f6946858f`. The workspace began clean, with no unfinished edits or conflict markers. The preceding run was the Ludlow/Miami Whitewater/Harrison/Lou Hartfiel/Bea Taylor batch. The runner owns validation, commits, atomic publication and scheduled deployment. No Git writes, deployment, private correspondence or database work occurred here.

## Evidence backfill and freshness

Four existing venues received full clause-by-clause reviews: **Creation Museum (10 old notes), Cincinnati Shakespeare Company (10), Children's Theatre at the Emery (9), and Proudworks transportation (5)**. All 34 pre-existing notes retain their permanent IDs and history; 29 are unchanged and five revised. Twenty-six previously missing evidence records were repaired: Creation 8, Shakespeare 9, Emery 9. The legacy missing-passage backlog falls **283 → 257**. All four whole-venue dates are November 13. No other existing venue date was advanced, and no partial review is counted as a full review. The weekly minimum of eight was already met before this pass; these are four additional review events, not eight newly claimed distinct venues.

Corrections/clarifications are separate from growth:

- Creation `mobility.2`: keep the accessibility HTML's first-come statement attached to wheelchairs; its ECV paragraph states limited supply. The separate current map describes rentals first come, first served, so no contradictory equipment policy is alleged.
- Creation `mobility.3`: add the $15 manual wheelchair price and non-refundable rental condition while retaining the $45 limited ECV supply/on-arrival arrangement.
- Creation `mobility.5`: attribute the paved mile/five-bridge description and retain its instruction to consult the bridge-access map. It does not establish universal step-free bridge access.
- Emery `sensory.2`: retain TCT-performance scope for listening devices and MainStage scope for sensory bags, rather than implying every independent event at the building.
- Emery `cognitive.2`: preserve the sensory-friendly section, the at-home guide title and Word-format narrative. It is not a promise of a generic venue photo guide.

The gated helpers freshly fetched sources before saving verified claims. Compound notes retain separate passages. A later final-verification fetch of Creation accessibility transiently failed; no gate was bypassed. A repeat fetch passed, as did the final expanded verification. Blocked sources below remain unresolved.

## New public information and breadth

**35 new notes**, separate from the 34 old-note reviews:

| Venue | New notes | Useful additions |
|---|---:|---|
| Creation Museum | 14 | Parking assistance; adult-changing inquiry location without invented facilities; zoo sand/paved-viewing distinction; sensory-loan collection/return; stairwell break-exit warning; exhibit bypasses; Braille and captions; tactile-request lead time; seasonal opening restrictions; service-animal assistance limits. |
| Cincinnati Shakespeare Company | 9 | Upper Gallery side-section step; publisher seat widths; performance-specific lighting/sound limits; break areas/equipment; capacity and front-row restrictions; advance caption/audio-description requests; phone-only parking payment; elevator/restroom approach directions. |
| Children's Theatre — Emery | 7 | Precise calming-room location; sensory-performance audience/reservation limits; written school-group seating requests and companion limitations; Box Office opening; weather notices; dated restroom-location/fixture information; possible screening and volunteer wayfinding. |
| **Second Sight Spirits — new Food & drink listing, Ludlow** | 5 | Operator's one-floor/no-steps description; recommended reservations without guaranteed walk-in places; Thursday tour/lounge distinction; own-food permission; tasting/wait options. |

Second Sight's address is supported by its [official FAQ](https://www.secondsightspirits.com/faqs). No ZIP was invented. No street-to-door route, toilet layout, accessible parking, quiet space or service-animal exclusion is inferred. Its dog policy does not answer service-animal arrangements. Its `/tours` page is a booking shell; no unsupported duration or assistance process was taken from it. Category and route tests include the new listing.

## Conflicts and boundaries

- [Creation accessibility](https://creationmuseum.org/accessibility/) describes five bridges; the [gardens page](https://creationmuseum.org/botanical-gardens/) describes an arched bridge, boardwalk and seven other bridges. Count/access differences remain explicit. The 2017 boardwalk-maintenance article is historical, not evidence of a current closure.
- Creation's [tactile form](https://creationmuseum.org/forms/tactile-experience-request/) lists Monday–Saturday sessions, while [winter hours](https://creationmuseum.org/hours/) close Sunday–Tuesday January 3–March 6, 2027. Confirm the requested date. Adult-changing location/equipment remains unknown; Guest Services is the inquiry point, not an asserted changing-table location.
- Shakespeare's seating page combines three listed wheelchair positions with removable Upper Gallery seats. Side sections require a step; do not turn the elevator into a universal seat-access claim. Its advertised sensory event and ticket widget do not establish available tickets. A 90-decibel cap is not a quietness or medical-suitability guarantee.
- The [Emery FAQ](https://thechildrenstheatre.com/faq/) gives first-public-Saturday ASL wording and both Monday/Thursday school ASL wording. The [accessibility page](https://thechildrenstheatre.com/accessibility/) lists specific signed dates and Thursday school performances. These conflicts are retained for show-specific confirmation. Earlier Taft Theatre narratives found in search are not Emery facility evidence.
- The October 2026 Mary Poppins narrative is a dated production guide. Its arrival time, running time, food policy and procedures are not generalized to future shows. The new notes explicitly attribute its restroom fixtures and possible screening.

## Access-photo research

**Two licensed, full-frame photographs added** under `public/images/access/` and `src/data/access-photos.json`:

1. [Creation entrance doors/forecourt, August 25, 2015](https://commons.wikimedia.org/wiki/File:15-23-1230,_exterior_of_museum_-_panoramio.jpg), David Dugan, CC BY-SA 3.0. Entrance and Exit Only labels, paving and the dinosaur barrier are visible. This is not the separate Welcome Center or a complete/current arrival route.
2. [Creation exhibit bench, August 25, 2015](https://commons.wikimedia.org/wiki/File:15_23_1128_creation_museum.jpg), Dsdugan, CC0. Backless bench, tiled floor and exhibit boundary rail are visible. The rail is not described as a ramp. Current availability, dimensions and continuous routes remain unknown.

Originals and converted outputs were visually inspected. Only full-frame resizing and WebP conversion were performed. Capture date is distinct from upload date. Source, author, licence, limits and source/output hashes are retained in the [media receipt](creation-shakespeare-second-sight-2026-11-13-media.json). No AI images were created.

**Two linked original photo guides added** through `src/data/access-guides.json`, without copying unlicensed images:

- [Shakespeare sensory pre-visit narrative](https://cincyshakes.com/assets/images/csc_sensory-performance_pre-visit-tour-narrative.pdf): 18 pages, 1,684,974 bytes (1.7 MB), metadata May 19, 2026. Doors, lobby seating, elevator/restroom approaches and tiered seating/aisle stairs. Its 80/20/45-minute performance example is not a current running-time promise. Exits at the top of stairs do not prove step-free egress.
- [Emery Mary Poppins narrative](https://thechildrenstheatre.com/wp-content/uploads/2026/10/MainStage-Social-Narrative-Mary-Poppins.pdf): seven pages, 1,116,243 bytes (1.1 MB), metadata October 9, 2026. Exterior/entrance facade, lobby/Box Office/stairs, seating, restroom interiors and calming-room view. Individual photo dates unknown; photographers remain credited in the original. No measured clearances, changing equipment or complete step-free route is established.

**Inspection effort:** 52 Commons candidate previews (34 initial and 18 additional after following the Creation Museum category), four selected Commons full-resolution originals, nine official Second Sight rental-gallery views, ten official Proudworks page images, and **50 PDF pages across six documents**. The earlier 17-page Shakespeare narrative, four-page watching checklist and two two-page Creation maps were also reviewed. Initial Commons thumbnail requests returned 403 until a descriptive research User-Agent was used; successful downloads were then inspected. Maps/diagrams were not misclassified as venue photographs.

Held media includes a Findlay forecourt/seating original with a readable vehicle plate; a Creation rear-deck view with people and no better route evidence; redundant Tousey front-step/side-path views; and Second Sight's unlicensed event gallery with prominent people, stage lighting and seating layouts. The [Second Sight rental page](https://www.secondsightspirits.com/rental) has useful original views but no reuse licence or capture dates found. The Warren LeMay Flickr source page was fetched; a full photographer-album inspection is not claimed. No public-facing HTML-gallery convention was added in this content-only pass.

## Other investigated leads and next work

- **Proudworks:** all five existing notes received a final full, fresh gated review against transportation, services and contact pages. Wording and existing supporting passages remain valid; no new facts or repaired gaps are counted. Its whole date advances from November 12 to November 13, not a new distinct venue for the already-met weekly minimum. Six unnamed counties, booking lead time, lift/securement, fares and assistance remain unresolved. Ten official-page images were inspected (seven transport views and three unrelated program portraits). A boarding view shows a wheelchair, doorway and yellow rail/lift mechanism; a side-on bus view shows front entrance steps. These do not establish a complete boarding cycle, capacity, securement or assistance policy. Dates/licence unknown and prominent people present; retain original links in the media receipt, no reuse. No existing note/date refreshed merely for fetching pages or photos.
- **Tousey House:** official reservation guidance still supports first-floor requests/no elevator; no new entrance/toilet evidence. No full-date change.
- **Clifton Market:** HTTP 403. **Kroger Delhi:** timed out. **Know Theatre** and three **Cincinnati Ballet** pages: HTTP 403. These do not support new or refreshed facts. Molly Malone's earlier four blocked notes remain unchanged.
- **Augusta Distillery:** official experience/private-event pages are promising but contain a truncated lift destination and a no-step entrance statement scoped to private events. Missing hearing-script answers and pet wording do not establish services or service-animal exclusions. Hold for a separate defensible listing review.
- Next: recover Ballet evidence without bypassing its block, or fully review Music Hall and Cincinnati Observatory/Playhouse. Pair this with grocery/public-service or neighborhood recreation evidence. Seek current Creation Welcome Center/parking-to-door/bridge/changing views; Emery entrance thresholds, elevator and changing facilities; Shakespeare current elevator/side-section routes; and Second Sight street-to-door/toilet/seating-clearance views. Continue the prior Ludlow/Miami Whitewater/Harrison/Lou Hartfiel/Bea Taylor photo queue and unresolved holiday conflicts.

## Validation and prepared totals

**146 places; 1,393 active notes and one retired; 1,136 quoted active notes; 257 missing passages; 56 licensed access photos; 25 guide entries covering 21 distinct documents.**

The [validation receipt](creation-shakespeare-second-sight-2026-11-13-validation.json) records final evidence checks, source baselines, unit/pipeline/type/lint/build results, direct HTTP/asset checks and preservation checks. Chromium cannot launch in this sandbox: `bootstrap_check_in ... MachPortRendezvousServer ... Permission denied (1100)`. The in-app browser host is unavailable. No rendered layout, interaction or browser accessibility pass is claimed; the runner must run its browser suite in its permitted host. Original/output imagery and every guide page were inspected directly.

No open GitHub Source monitor issue was returned during this pass. Publication readiness means ready for the runner's checks and Git push, not committed, pushed or deployed.
