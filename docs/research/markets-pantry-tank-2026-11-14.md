# Markets, pantries, TANK and Eastgate — November 14, 2026

Prepared in the dedicated automation workspace against publication base
`ead109e52fa3e3d96b93dd45d14058f755057b29`. The workspace started clean, with no
conflicts or unfinished edits: the previous recovery batch was already in HEAD.
This report describes this pass only, not a new production deployment. All mutation
specs below have been applied; do not replay them.

## New public information

Four new listings add 20 notes:

- **Lehr’s Prime Market, Milford — five:** call-ahead sandwich ordering, separate
  sandwich hours, gluten-free enquiries, and explicitly dated Thanksgiving 2026
  ordering/pickup windows. Neither call-ahead nor holiday pickup establishes curbside
  handoff or carrying assistance. The November 19 online deadline is seasonal.
- **Seafood Station, Loveland — four:** current contact/hours, party-order lead time,
  item-specific allergen enquiries and the DIY boil kit’s no-cooking limit. No
  physical-access or delivery claim comes from third-party directory badges.
- **Boone County Drive-Thru Food Pantry, Erlanger — four:** second-Saturday sessions,
  no appointment/documentation requirement, wider-county welcome and food loaded into
  guests’ vehicles. This does not describe passenger transfers or a walk-up service.
- **Action Ministries, Covington — seven:** five-county/income scope, first-visit ID
  requirements, registration timing, regular/evening sessions, weather closure line,
  location and an explicitly historical 2025 residence-delivery program. The three
  named residences are not a current general-delivery service. Income-table year and
  first-time evening registration remain uncertain.

Existing venues gain nine notes: TANK seven (RAMP zones/fares, assessment procedure,
alternate formats, conditional clinical verification, written decision/PCA status,
Plus group booking and a dated Route 39X stop closure); Eastgate two (orientation
maps and yearless holiday-hours table). **Total growth: 29 new permanent IDs.**

## Accuracy and freshness, separate from growth

All **45 old TANK notes and nine old Eastgate notes** were read against current
sources. Both whole-venue dates move November 12 to November 14. These repeat venues
already reviewed during the week; do not count them as two additional unique weekly
venues. No partial reviews were promoted and 199 existing listings are unchanged.

Two TANK texts were corrected: doctor verification is now explicitly attributed to
the eligibility checklist, and an unsupported media-date aside was removed from the
November 7 service-change note. Four existing supporting records were strengthened
with full stop lists, route direction, effective date or construction/travel context.
**Zero absent-quote repairs; all 20 legacy gaps remain unresolved.**

Keep these TANK differences visible: $1 versus $0.75 reduced fares; old Plus-zone and
Link/Route 16 wording versus November 7 changes; Route 5 timetable versus the removed
Holman/MLK stop; doctor-verification checklist versus conditional clinical forms; FAQ
RAMP hours printed as 4:30 a.m.–1 p.m. versus regular-route-linked service language.
Do not silently repair a suspected typo or promise current trip/assistance availability.

The canonical `-final-evidence.json` is generated from the saved public catalog and
stored passages, including all 83 affected notes and four new addresses. Its fresh
helper result is **87 checked / zero failed**. Earlier preliminary gates are retained
as history; the final gate governs this batch. The ID/history audit confirms every
old ID and history prefix, all old media/report records and unrelated venues survive.
Twenty-nine selected source baselines were refreshed (11 new); **595 unselected
source records are byte-for-value unchanged**. No selected source needs attention. A late retry of six legacy source URLs returned five 403s and a Symphony shared-session redirect; none supplied usable evidence. No affected fact date, quote or baseline was refreshed. See `-held-retries.json`.

## Photographs, guides and reported experience

Two full-frame **CC0 1.0 Warren LeMay photographs, June 14, 2020**, now cover Eastgate’s
parking/frontage orientation and a partial aisle beside pallet displays under ceiling
lights. Original source/licence/date metadata and image hashes are retained in the
media receipt. Original 3024 × 4032 files became 1200 × 1600 WebP files by faithful
resizing/conversion. Source previews and final frames were visually compared. Distant
doors and partial aisles do not establish clearances, current conditions or a complete
route. No AI or copyrighted-photo republication.

Five original guides link to Lehr’s changing historical frontage, the pantry’s
vehicle queue/loading gallery, TANK’s open door and deployed ramp, RAMP app booking
instructions, and Eastgate’s store map. All **eight distinct guide/source/photo-page
links return 200**. The one-page Eastgate PDF is 1,548,422 bytes; the URL says December
2023, metadata November 2025, visible copyright 2025 and modification August 2026.
These differences are disclosed. Its image-only layout was visually inspected, not
passed off as extracted quote evidence. Restroom symbols are orientation only.

**Display fix:** booking screenshots now say “Open visual instructions” and count
“graphics”; actual bus photographs retain “Open photo guide.” A regression test checks
both labels. Installed Next.js Link/Image docs were read before the component edit.
No layout or image treatment changed.

Forty-one still/graphic candidate views were inspected across official pages, Commons
TANK categories and Flickr (including held/decorative candidates). Eight historical
Commons bus views lacked useful ramp/securement detail and were not imported. Additional
PDF review covered the Eastgate map, Action’s relevant annual-report page and all nine
pages of the next-batch gym social story. No guide image was copied for publication. A further 2014 Flickr toilet-door view was inspected but held: all rights reserved and the exact branch is unconfirmed.

Four separate reports retain source identity and limitations: Lehr’s small indoor
seating in December 2016 and later patio in June 2018 (both Tripadvisor partner-collected
reviews), a subjective/undated Reddit Eastgate aisle comparison with a conjectured
stress benefit, and Grocery Dive’s July 29, 2024 account of jungle sounds and busy
visuals. The latter’s exact visit date is unknown. Their differing experiences remain
separate from official facts, and no personal health details or usernames were retained.

## Validation and boundaries

The final validation receipt records the completed checks. Local unit, pipeline,
lint, type, production-build and all 17 HTTP/HTML/asset checks pass. The new category entries, instruction-guide counting
and four new route tests are included; **193 browser/axe tests are discovered**.
The initial category test expected the old pantry list; it is corrected. An early
pipeline run preceded the baseline write and failed coverage; it passes after baselining.
The HTTP label check was scoped to the media section after first matching an official
fact-source link. These were diagnosed, not hidden or treated as evidence failures.

Chromium fails before navigation with macOS MachPortRendezvousServer permission denied
(1100); CUA reports its browser host unavailable. **Browser/axe execution, interactive
flows and page-layout visual QA remain runner-required.** HTTP checks and inspected
image files do not substitute for these. No Git writes, pushes, deployment, preview,
hosting/scheduler changes, database writes, messages or private correspondence access.

Totals: **205 venues, 2,116 active notes, one retired, 2,096 quoted, 20 missing,
92 licensed photos, 138 guides and 81 community-file reports**. Category counts:
parks 34, arts 33, food 30, shopping 28, museums 21, public services 18, recreation 17,
libraries 15, transport 9. Discovery queue: **87 names / 38 added / 35 lead-only /
14 held**. The catalog still needs more everyday recreation, services and transport.

## Next concrete batch

- Investigate **We Rock the Spectrum Northern Kentucky, Fei House and Pinball Garage**;
  pair them with one thin existing venue’s arrival/toilet review. The gym’s official
  about page and nine-page social story fetched 200. Images show frontage/marked
  parking, gym equipment, calming room and activity tables. **PDF page 3 visually says
  socks are required; its extracted layer still says barefoot or socks.** Retain that
  conflict and check current general versus field-trip rules before listing. No gym
  note or guide has been imported. Photo dates are unknown; PDF modified February 2024.
- Fei’s official page fetched 200, but second-floor events are past and the route to
  the tea room/toilets is unknown. Keep Kung Brew naming history and event dates clear.
- SparkHaus is held: the web reader shows its homepage, but the research helper returns
  403. The county page supports identity/location, not all booking/amenity claims.
- Pursue current Lehr entrance/railing and seating, Seafood Station collection/doors,
  Action toilets/loading, pantry walk-up/noncar arrangements, TANK securement and
  actual current vehicle boarding, Eastgate toilet interiors and door controls.
  Preserve UC address/pool-hour, DLM mezzanine and all earlier blocked-source holds.

Receipts use the `markets-pantry-tank-2026-11-14-` prefix: `audit`, `final-evidence`,
`media`, `http`, `next-preflight`, `validation`, and `source-urls`. The runner owns final
validation and atomic branch pushes. The dedicated release job alone deploys at the
scheduled times, capped at two per Eastern day.

Late next-batch follow-through: the gym’s [official open-play page](https://werockthespectrumnorthernkentucky.com/open-play/)
fetched 200. It confirms parent/guardian presence, socks for adults/children and
weekly schedule variation, consistent with the visible social-story text. The
branch-specific listing/calendar/field-trip-exception review remains unfinished;
no additional venue was imported. A public community party account was read but
its branch is unspecified, so its prices/facilities were not assigned to Erlanger.
