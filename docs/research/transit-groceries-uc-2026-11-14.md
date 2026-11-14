# MetroNow, Mason groceries, UC recreation and recovered-batch review

Prepared November 14, 2026 in the dedicated automation workspace. All import and
revision specifications are already applied; do not rerun them. The runner owns
final validation, Git writes and publication. No deployment, preview, database,
scheduler, messages or private correspondence actions were taken.

## Recovery and actual host failure

The prepared workspace contained the previous recreation/library batch: 11 modified
and 31 new files, without conflict markers. Its host run passed lint, 119 unit tests,
build and 185 of 186 browser tests. The one failure was a strict-mode locator collision:
Little Miami and newly added Bayley both had a two-panorama tour link. This was a test
ambiguity, not a failed source gate or a demonstrated broken tour.

The mobile-gallery test now matches each tour's full accessible name, including its
specific title and new-tab suffix, with tolerance for inline whitespace. Both target
URLs are asserted. The built page's HTML and computed accessible names each identify
one intended link. This does not substitute for the runner's browser/axe suite.

The agent's targeted browser attempt failed before navigation with Chromium
MachPortRendezvousServer permission denied (1100). CUA separately reported the browser
access host unavailable. These local restrictions are distinct from the real host
failure above. All 189 discovered browser tests and visual page QA remain runner-required.

## New public information in this pass

Three new listings add 29 notes: MetroNow! (10), Dorothy Lane Market Mason (4) and
UC Campus Recreation Center (15). Three additional Metro/Access notes bring this
pass to **32 new permanent IDs**.

- MetroNow: public eligibility with advance booking for every rider, Less Walking
  versus Less Waiting, two mobility-aid spaces, wheelchair account setting, package
  assistance limits, service hours/holidays, fares/discount exclusions, language
  options and child-seat responsibilities. Launched-zone heading and stale FAQ
  wording remain explicitly different; neighborhood names do not guarantee coverage.
- Mason DLM: branch location/hours, mezzanine Culinary Center contact, rearrangeable
  private-event seating and the specific telephone frittata-pickup option. The
  linked Drive-Up service identifies Washington Square pickup; Mason grocery
  curbside collection is not established. Elevator route, door controls and toilets
  remain unknown.
- UC CRC: community membership, main-lobby rule, physical ID, leisure-pool-only
  zero-depth entry, pool cleaning/lane restrictions, family changing policy,
  single-occupancy room numbers with student-only restrictions, lockers and
  yearless seasonal closure table. Arrival follow-through adds nearest garages,
  member-parking eligibility, barcode entry/exit, three-hour limit and game-day/HELP
  procedures. Official pages conflict on **2820 versus 2840 Bearcat Way** and on
  weekday pool closing. Both conflicts remain visible; residence-hall/classroom
  entrances and historical event routes are not substituted for the recreation entrance.
- Metro/Access: effective-dated fare versus older fare wording, TTY/relay contact,
  written eligibility decision and appeal-notice process.

## Evidence backfill, correction and freshness

All 17 pre-existing Metro/Access notes were reread in full. Its whole-review date moves
November 12 to 14; this repeats a venue already reviewed in the rolling week, and is
not claimed as an additional unique weekly venue. Four existing evidence records now
retain fixed-route scope or the heading that makes assistance prohibitions explicit.
One existing Fare Deal note now states the proof-of-age condition. These are separate
from new-note growth. No previously absent quote record was repaired: **20 legacy
missing-evidence records remain held**.

The inherited Covington/Newport full reviews, expired closure correction and five
strengthened evidence records were preserved. All recovered public note clauses and
stored passages were reviewed, and 57 recovered checks passed a fresh helper fetch.
The combined final gate binds **102 saved note IDs** to current text and stored
passages; all pass fresh fetches. Original address checks remain in pre-import
receipts. Earlier verify files are chronological and may precede the Fare Deal
revision or final UC arrival additions; only `-final-verify.verified.json` describes
the complete final combined catalog.

Across both pending batches: seven new venues, **69 new notes**, three full existing
venue reviews covering 33 old notes, two existing text corrections, nine strengthened
existing evidence records, and zero partial fact reviews or missing-quote repairs.
The audit preserves every old ID and history prefix, 191 unchanged published venues,
and 576 unselected source records. Thirty-seven selected sources are baselined;
nine are new in this pass and 21 are new across the combined pending batch.

## Access photographs and original guides

This pass adds one full-frame **CC BY 2.0 photograph by Darius Pinkston**, captured
April 25, 2017: a Metro bus's open front door, yellow threshold, handrails and the
road/curb/grass-strip relationship. No ramp is deployed. The original and faithful
1280 × 720 WebP were visually compared. It does not establish a current boarding stop,
route, fleet assignment, ramp operation or continuous sidewalk connection.

Eight original guides are linked: Metro boarding/interior photographs; MetroNow
Bond Hill/Roselawn zone map; Mason frontage; Mason Culinary Center layout; UC lockers,
track and exercise rooms; UC pool/hot-tub views; UC's 2025 campus map; and Campus Green
parking-reader photographs. The PDF is one page, 521,797 bytes, with November 19, 2025
metadata. All 13 distinct guide/source links across both batches freshly return 200.

Thirty distinct still-photo/graphic views and two PDF pages were inspected in this
pass. Useful barriers remain visible: hot-tub steps, tall backless stools, a road-to-
curb gap and unknown doorway clearances. Vehicle cutouts/renderings, swimmer close-ups
and decorative glassware were excluded as access evidence. Mason's `mas` gallery is
separate from Washington Square's `wsq` gallery. The older UC fitness map (2020 metadata)
was inspected but held pending current-layout confirmation. The photographer's Flickr
origin was followed but could not be read; Commons metadata and licence were available.
No AI images or copyrighted gallery images were republished.

Recovered media were also re-reviewed: the Covington library file, three Crosley
views, eight Silverlake images, all twelve full Bayley panorama faces and the historical
Metro ramp image. The earlier report retains its PDF/video review receipts. Combined
pending additions are **two licensed photos and twelve linked guides**.

## Community breadth and holds

Three separate public reports preserve uncertain publication/visit dates: Mason's
opening-period crowd/evening contrast, a historical MetroNow ride in Colerain, and a
historical East Price Hill-to-UC transfer burden. Underlying discussions were read.
Commenter staffing speculation, usernames and unnecessary personal details are omitted;
none of these accounts becomes an official access fact. Combined pending reports: nine.

Public Cincinnati, Covington, Northern Kentucky, local-interest and Tripadvisor searches
continue the breadth lane. Tripadvisor retrieval remained throttled. Meijer Cold Spring
still fails the official helper with 403 despite readable web output; it was not imported.
A Bainbridge Meijer changing facility is not evidence for Cold Spring. Dillonvale's
physical access and local Fast Lane implementation remain unresolved. Norwood operation,
Alexandria address conflict, Maple Knoll public eligibility, TriHealth unextractable policy
and schedule passages, and all legacy evidence holds remain open.

The discovery queue now contains 82 names: 36 added, 33 lead-only and 13 held. New
concrete leads include Lehr's Prime Market in Milford and Seafood Station in Loveland,
from actual visit/purchase comments. They have not received an access assessment.

## Validation and next batch

Final local validation: 120 unit tests, 79 pipeline tests, lint, TypeScript and production
build pass. Seventeen HTTP checks confirm ten reviewed venue pages with all 102 note
texts, gallery links, both exact photo files and representative catalog/report routes.
The selector repair additionally passes computed accessible-name checks. Browser/axe
and visual page checks remain with the runner. Initial missing-baseline and report-kind
validation failures were corrected before the final checks; no failing evidence gate
was overridden. The build retains the existing Atkinson font-fallback warning.

The catalog now has **201 venues, 2,087 active notes, 2,067 quoted active notes,
90 licensed photographs, 133 guides and 77 community reports**. See `-audit.json`,
`-validation.json`, `-media-review.json`, image/PDF/link receipts and the final gate.

Next: investigate Lehr's and Seafood Station, then another supported Northern Kentucky
shopping/public-service lead rather than only retrying blocked stores. Pair this with
TANK's complete rolling review and real boarding/securement imagery. For depth, resolve
UC's arrival address/entrance route and DLM's mezzanine route, toilets and changing;
seek genuine MetroNow boarding imagery. Preserve all listed limits until attributable
current evidence resolves them.

Late next-batch preflight: Lehr’s official contact/sandwich pages and Seafood Station’s
home/Find Us pages returned 200. Exact official links and four fetch receipts are saved
in `transit-groceries-uc-2026-11-14-next-leads-preflight.json`; queue entries now
carry these links. Arrival/access review remains unfinished; no additional listing added.

Local QA cleanup: the temporary Next server on port 3217 stopped after Ctrl-C
(exit 130); a fresh HTTP request confirmed connection refused.
