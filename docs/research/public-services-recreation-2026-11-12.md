# Public services and recreation — November 12, 2026

Prepared in the dedicated automation workspace from publication base
`a0f29e5cdcd4fc69629ce45885d116619ea8ad7a`. The workspace started clean; there were
no unfinished edits or conflict markers to resolve. The preceding runner phase and
summary were read. No open Source monitor issue was returned. No private messages,
Git writes, deployments, previews, scheduler/hosting changes or database work were
performed. The runner owns validation and atomic publication-branch pushes.

## New coverage and public information

Three new listings, with 32 initial notes in total:

- **Kenton County Government Center (eight notes):** the August 17 county update
  sends vehicle access to the lot via Pike Street from August 18, with construction
  expected through spring 2027. This does not identify a pedestrian door or prove a
  continuous rolling route. The listing distinguishes Clerk hours and Thanksgiving
  closures from other offices, identifies the Independence alternative for named
  services, links the election photo guide, and explains online/mail alternatives
  for Clerk records and the separate Circuit Clerk destination.
- **UC Campus Recreation Center (seventeen notes):** community membership, physical
  photo-ID entry, the main-lobby rule, nearest named garages and member parking-card
  procedure, different activity levels, leisure-pool zero-depth entry, lap-pool
  depth/lane limits, cleaning closures, busiest times, staff equipment orientation,
  locker procedures, single-occupancy restroom numbers and student-only exceptions,
  and the narrowly scoped family-changing provision. UC's gym emergency plan says
  there are no designated Areas of Rescue Assistance in the Campus Rec Center Gym;
  visitors are directed to discuss arrangements with Campus Rec, without presenting
  Threshold's own evacuation instructions or extending the statement to housing.
- **Dunham Recreation Complex / Otto Armleder Pool (seven notes):** zero-depth entry
  and other listed pool features, summer-only schedule, members-only late entry,
  separate center hours/contact, program-accommodation request steps, possible
  communication supports, and separate fees. The published summer closing date is
  August 8, 2026; this is not November operation or a 2027 schedule. CRC's inclusion
  process is explicitly systemwide, not a local equipment inventory.

**Depth:** three new Bogart's notes cover labelled medication/photo-ID requirements,
limited dietary provision without a guarantee, and its fee-free cash-to-card kiosk.
Together with the new listings, this is **35 new public notes**. There are no
revisions or retirements of prior notes. The Public services and Recreation & fitness
categories are discoverable; Dunham follows the existing LeBlond convention within
Parks & outdoors. New route/category checks were added to the existing test files.

## Freshness

All **eleven prior Bogart's notes** were read against fresh accessibility and visit
pages and confirmed without changing their text or permanent IDs. Supporting quotes
were stored and `rechecked` entries appended; its full-review date is November 12.
This adds **one full existing-venue review**, taking the documented week to **21/8**.
No new partial old-note review was performed. AMC's six held notes and its listing
date were not touched. All other prior venue objects are identical to the base.
New listings' initial source reviews are counted separately from freshness work.

## Photographs and linked guide

Four reusable, full-frame access photographs were selected after rights/location
review and visual inspection of each source image and final WebP:

- **Government Center, March 23, 2020, w_lemay, CC0:** one view shows a railed walkway
  beside the former-brewery wing and the adjacent roadside sidewalk; another shows
  the glazed entrance forecourt, parking-bay markings, stone spheres and separate
  steps. Both explicitly predate 2026 construction. Neither establishes today's
  approach, designated parking availability, measurements or current door operation.
- **UC lap pool, July 7, 2011, Bearcat2011, CC BY-SA 3.0:** pool deck/ladders, tiered
  spectator benches and daylight. This is the lap pool, not the zero-depth leisure
  pool. No lift, transfer, wheelchair seating or current lane-layout claim is made.
- **UC plaza, June 9, 2013, Greg Hume, CC BY-SA 3.0:** paved forecourt, low curved
  planter wall and separate steps/handrail at the recreation/housing complex. The
  author's HDR description is retained. The member doorway and present-day route
  are not established. The selected photographs have no visible identifiable people.

The entrance and plaza images also supply the two new listings' venue-context
photographs. These are two uses of the same two photographs, not additional capture
or access-photo counts. Files in both paths preserve the identical final WebP bytes.
No scene changes, cropping, generated access imagery or private submissions were used.
Bogart's existing 2008 context photograph was inspected and not duplicated.

**One original linked guide:** the Clerk's 2026 General Election pictorial, 34 pages,
6,915,159 bytes (6.9 MB), PDF metadata September 4, 2026. Cover and page 20 were rendered
and inspected. Page 20 shows the Government Center exterior, glazed front entrance,
interior corridor and Riedlin Schott Room doorway; its text describes the main front
doors and an elevator or steps to the second floor. The guide's photographs have
unknown capture dates. This is election-specific preparation, not a construction-route
walkthrough, daily-service guarantee or future election instruction. Images are not
republished. A fresh Mozilla-user-agent fetch returned HTTP 200 with bytes identical
to the inspected PDF; default Python urllib user-agent retrieval returned 403.

Full metadata, hashes, guide receipt and held imagery are in
`public-services-recreation-2026-11-12-media.json`. The broader Commons search indexed
80 files; 75 licensed thumbnails were visually screened in contact sheets and eleven
shortlisted full frames inspected individually. Five thumbnails could not be fetched
and remain uninspected/held. Many views are architectural details without useful
routes; no extra imports were made for volume.

## Conflicts, scope limits and held leads

- **Government Center:** Pike Street is the lot-access instruction. Front-door
  photos and the election guide do not resolve today's pedestrian route. A late-
  October reopening forecast elsewhere in the county notice is not confirmation of
  actual reopening. The Kentucky polling-place survey registry showed a county
  selector through web retrieval, but direct urllib/curl returned 403; no individual
  survey, assessment date or measurements were retrieved. Manual review is required.
- **County transition plan:** a 22-page official document was fetched and its page 8
  text reviewed. It schedules facility self-evaluation from July 2025 through June
  2027, not a completed Government Center-specific audit. It was not added as a photo
  guide. Source: <https://www.kentoncountyky.gov/AgendaCenter/ViewFile/Item/5993?fileID=8237>.
- **UC destination:** the recreation-center page says 2820 Bearcat Way, ZIP 45219;
  Campus Rec contact says 2820 with ZIP 45221-0017; the building directory says 2840,
  ZIP 45219. These differences remain visible. No CARE/Crawley or Siddall features
  were transferred. Elevators, continuous routes, adult assisted changing, transfer
  arrangements and quiet rooms remain unknown. The old campus access-map and
  official how-to video playlist are leads, not inspected/current route evidence.
- **Dunham:** a separate city announcement says May 30, 2026 early pool opening,
  while the schedule still prints June 6. The closing date and all pool guidance
  remain explicitly scoped to summer 2026. Renovation funding/design leads are not
  completion receipts. No matched reusable access photo or inspected photo guide
  was selected; toilets, entrances and transfer procedures remain unknown.
- **Bogart's:** no newly inspected view establishes which door is the Great Bands
  entrance, a complete mezzanine/lift route or the kiosk controls. Existing upper-
  floor, seating, restroom and quiet-space limitations remain intact.

## Helper correction

`recheck.py` now requires every active note to be both read on the review date and
`source_checked` before advancing a full-listing date, matching the depth helper's
existing rule. A test reproduced the old incorrect advance with an unresolved
same-day note, for both `needs_recheck` and `source_unavailable`. Three regression
cases now pass, covering those holds, older unreviewed notes, full confirmation and
retired notes. Unselected notes and old history remain unchanged in the tests.
The input file is also closed after reading. No Next.js framework code changed.

The concert-guide test's fixed November 8 dates were updated to permit subsequent
source reviews while preserving the source/field-report separation checks.

## Evidence and validation

`public-services-recreation-2026-11-12-evidence.json` records **65 fresh matching
checks, zero misses**: 35 new notes, 11 prior notes, three addresses and sixteen
extra supporting passages. Eighteen cited HTML sources have HTTP 200 baselines and
no new attention findings. Unselected monitor snapshots/findings, prior quotes,
media records and unrelated venue objects are preserved against the publication base.

Final checks: types and lint pass; **60 unit tests and 48 pipeline tests pass**;
production build passes. Fifteen final-build HTTP checks cover all visible notes and
limitations at the four venues, three category/region filters, visual/source/update
pages, homepage and exact bytes of the four new access images. Whitespace and
preservation checks pass. Existing nonfatal font/Vite/Node warnings remain.

**Browser limit:** 99 browser tests are listed. The targeted new Government Center
route test cannot launch Chromium because macOS denies the Mach-port registration
(1100), before navigation; the CUA browser host is unavailable. No browser pass,
site screenshot or full access audit is claimed. The runner must complete its browser
validation before pushing. Only the dedicated release job deploys.

Prepared totals: **117 venues, 957 active notes, 477 stored supporting quotes,
20 access photos and eleven guide entries covering ten distinct documents.**
