# Everyday shopping and Northern Kentucky connections — November 12, 2026

Prepared in the dedicated automation workspace from publication base
`4c7f1765e8631d59207f4381d73a1b557426e1e3`. The run began late November 11 and
continued after midnight; new retrieval and review dates are November 12.
AGENTS.md, the current handoff, ROADMAP, DECISIONS, coverage queue and original
access-photo research were reviewed. The workspace started clean, with no unfinished
edits or conflict markers. latest.json was in researching phase and recorded the
previous Findlay/Kenwood/Florence/BCRTA batch as pushed at this publication base.
The open Source monitor issue query returned no issues.

No Git writes, deployment, scheduler changes, database work, private correspondence
or messages. The runner owns validation, commits and atomic publication-branch pushes.

## New coverage and public information

Four venues were investigated, in successive evidence batches. Three have prepared
public changes; the Kroger candidate remains held. **33 notes were added**, with
two existing TANK notes revised using their permanent IDs and earlier histories.

| Venue | Added notes | Scope |
| --- | ---: | --- |
| Target Newport, new Shopping listing | 8 | Branch-confirmed Drive Up, pickup and delivery; chain Aira support; provider's online-offer activation steps and use duration; app/website support and local contact |
| Smoke Justis | 5 | Upstairs room seating arrangements, screens and sound system, preselected buffet service and acoustic-music policy for private events |
| TANK | 20 | Front-seat priority and stop cord, travel training and practice boarding, Plus pickup/device/package/booking procedures, hours, transfer costs, RAMP booking, conflicting reduced fares, November 7 changes, Link stops and service breaks |

Target's address, **160 Pavilion Pkwy, Newport, KY 41071-2884**, matched its fresh
[local store page](https://www.target.com/sl/newport/2483). The new route and
Shopping/Kentucky filter expectation are included in the existing test lists.
Drive Up is confirmed locally. The [chain accessibility page](https://www.target.com/c/accessibility/-/N-4ynq1),
[chain collection instructions](https://www.target.com/c/drive-up/-/N-9d42z) and
[linked Aira provider page](https://aira.io/target/) describe support policies,
not an observed Newport entrance or equipment collection point. The Aira page is
classified partner_official; Target itself links it. The self-checkout rollout is
still described as coming; no Newport installation, cart availability, toilet
feature, door control or quiet room was inferred.

Smoke Justis's former [private-experiences URL](https://www.smokejustis.com/private-experiences)
now redirects to [its booking site](https://parties.smokejustis.com/). All four
existing notes still match that live source. The [Boardroom](https://parties.smokejustis.com/parties/boardroom)
and [Clubhouse](https://parties.smokejustis.com/parties/clubhouse) descriptions
provide additional seating and event details. They remain explicitly upstairs,
reached by stairs with no elevator. The main dining room/Bourbon Lounge lower-level
description is the venue's statement; it establishes no measured entrance or
restroom route. Screens and a private sound system establish no quiet-space service.

Two revised TANK notes:

- `tank-transit-authority-of-northern-kentucky.mobility.2` now preserves the
  eligibility page's qualification about areas also served by fixed routes.
  Naming three counties does not establish coverage of every address.
- `tank-transit-authority-of-northern-kentucky.cognitive.3` now follows the agency's
  service-animal wording without adding an independent claim about the only legally
  permitted questions. The published control/threat conditions and modification
  request channels are retained.

## Current changes and conflicts

The [November 7, 2026 service notice](https://www.tankbus.org/building-better-transit/)
says the Southbank Shuttle and Route 16 are replaced with a fixed-route corridor,
and directs former Route 16 riders to Route 1 and the Licking River Link. It also
announces Alexandria Walmart and Village Green Shopping Center in the expanded
Plus zone, with a **six-mile distance cap**. These are dated agency statements,
not an independent check of a vehicle or trip operating.

Three unresolved differences are visible in the listing's notes and limitations:

- The [fare page](https://www.tankbus.org/fares-guides/fare/) lists **$1** for the
  reduced fixed-route fare; the [FAQ](https://www.tankbus.org/faq/) lists **$0.75**.
  Each amount has its own source note. The May 2025 brochure lists $1, but this
  does not authorize silently discarding the FAQ's contradictory statement.
- The separate [Plus page](https://www.tankbus.org/microtransit/) still describes
  Zone 1 in Campbell County, while the November notice announces the expansion
  and cap. Confirm the specific requested journey and current boundary.
- The [Licking River Link page](https://www.tankbus.org/licking-river-link/) still
  recommends a Newport transfer to Route 16. The listing warns against relying
  on that instruction without current schedules because the November notice says
  Route 16 is replaced. No unverified transfer path was imported.

The Link's published Newport and Covington stop locations, one-way loop, fare-free
status, weekday/weekend hours and half-hour operator breaks were verified. Stop
names are not evidence of curb ramps, pavement condition, distances or a continuous
walking/rolling connection. No claim of a short or step-free transfer is made.
TANK Plus curb-to-curb service, fixed-route buses and RAMP door-to-door paratransit
remain distinct. Numerical vehicle capacity is attributed to TANK.

## Freshness and evidence

All **14 prior notes** at Smoke Justis (4) and TANK (10) were reviewed: twelve
confirmed and two revised. Only these two existing listings advance checked_at.
The new Target listing is dated November 12. **No new partial review** is counted.
Weekly full reviews are now **14/8**; AMC's earlier partial review and six held notes
are unchanged.

All **47 touched notes plus Target's address** passed quote matching against a fresh
official fetch: **48 checks, 17 URLs, zero failures**, all HTTP 200. Quotes were
retained in `pipeline/evidence/quotes.json`. The selected-source monitor and new-source
baseline passes also returned 200 without new attention findings. The November 12
snapshot preserves all earlier unselected baselines, findings and missing-quote
records; the November 11 snapshot is unchanged.

Comparison with the publication base confirms preservation of unrelated venue
records, earlier media entries, untouched quotes, IDs and history prefixes.
Prepared totals: **107 venues, 818 active notes, 311 stored supporting quotes,
12 licensed access images and eight linked guides**.

## Photograph and linked guide

**One licensed photograph:** [Dwight Burdette's Southbank Shuttle in Covington](https://commons.wikimedia.org/wiki/File:Transportation_Authority_Northern_Kentucky_Southbank_Shuttle_trolley_Covington.JPG),
March 27, 2011, CC BY 3.0. Fresh Commons imageinfo metadata identifies the author,
capture date and Philadelphia/Fourth Street location. The full-frame source and
converted WebP were visually inspected. Steps are visible through the front doors;
the bus is in the street, not shown boarding. No ramp or lift is deployed and no
alternative boarding entrance, wheelchair space or securement equipment is shown.
The caption does not infer that another boarding method was absent. The November 7
replacement notice is linked beside this historical image. It is not current-fleet
or current-Shuttle-service evidence. No scene elements were changed.

| File | Size | SHA-256 |
| --- | ---: | --- |
| Commons source thumbnail, 1280 × 606 | 160,991 bytes | `768a560721d18663c06e1d768f843b53fadd31b28bd00f96155faa780b2475aa` |
| `tank-southbank-shuttle-steps-2011.webp`, 1280 × 606 | 123,976 bytes | `7f9a9345131ca6f99c8e5fa16915e36a22d7b17691cea138bf628e83b0fcd980` |

**One official guide link:** [TANK How to Ride, revised May 2025](https://www.tankbus.org/wp-content/uploads/2025/05/TANK-How-To-Ride-Brochure-2025.pdf),
two pages, 3,432,406 bytes (3.4 MB), PDF metadata May 8, 2025. Both complete pages
were rendered and visually inspected. Page 1 has waiting/bus and fare-reader photos;
page 2 includes passengers near a bus doorway. It explains signs, announcements,
the signal cord and front-seat priority. No ramp/lift deployment or station route
is shown. Photo dates are unknown. Its description explicitly warns that it predates
the November 2026 route changes. No copyrighted brochure photographs were republished.
A second original-link fetch returned HTTP 200 with identical bytes; SHA-256
`309f806c836df5b44d69eedd55461446fe58aab3b0fe28c79e24794f9e411114`.

## Investigated and held

- **Kroger Newport Pavilion, 130 Pavilion Parkway:** the official store page was
  readable through web retrieval, but repeated direct requests to the canonical,
  slash, short and query-string variants timed out. Curl HTTP/2 failed; HTTP/1.1
  timed out. No new listing, source baseline or local physical-access claim was
  imported. The chain pickup FAQ loaded, but contains differing store selections
  and a Harris Teeter-specific payment paragraph. Those are not local entrance,
  cart or Newport service evidence. Keep this candidate for manual browser review.
- **Target:** no location-matched reusable access photo was established. The old
  2016 Caroline's Cart rollout is not current proof of Newport equipment. Legacy
  help.target.com article URLs redirected to a generic help page on direct fetch;
  their barcode and other detailed instructions were not imported. The working
  chain Drive Up page supplies the simpler steps actually used.
- **Smoke photos:** six licensed Commons views of the Citizens Telephone Company
  Exchange Building were downloaded and inspected. They show a different building
  in the Helentown/Eastside collection, not the Court Street premises; none was
  attached. A licensed Court Street view shows Keystone, and a separate April 2019
  Old Citizens Telephone Company Building view shows the correct frontage but cars
  obscure the approach and the doorway's visitor role is not established. Vehicle
  plates are also prominent. Both were inspected and rejected for this purpose.
  The city's freshly fetched June 2023 sidewalk announcement describes planned
  widening, not completion or today's surface; no current-route fact was inferred.
- **TANK photos:** eight licensed bus photographs were inspected, including the
  selected image. Other views mostly show closed doors, buses in traffic, more
  prominent people or uncertain stop locations; none demonstrates a deployed ramp
  or wheelchair space. No contemporary boarding/securement photograph was found.
- **Older map and planning report:** the indexed 2025 system-map PDF returned 404.
  The current linked April 21, 2026 TDP downloaded successfully (170 pages,
  15,266,504 bytes). Text search and complete-page visual review of the relevant
  proposal/facility sections did not establish a useful arrival-photo guide. Its
  proposed Southbank service differs from the later November notice. No proposal,
  route recommendation or generic facility paragraph was presented as a current
  physical-access finding. No second guide link was added.
- Earlier AMC, Florence lift/next-season, CVG/tour, Findlay pickup-window, BCM,
  park-season and other queue holds remain unchanged.

## Validation and next work

TypeScript, lint, all 49 unit tests, all 42 pipeline tests and the final production
build passed. The existing Atkinson font-fallback warning is nonfatal. A
preservation check and `git diff --check` passed. Eight final-build HTTP checks
on port 3223 confirmed all 47 visible notes and limitations across the three
changed pages, Shopping/Kentucky discovery, the visual index, source register,
updates and the exact new image bytes. These markup/HTTP checks are not browser
layout or keyboard checks.

Browser validation is still a runner gate. A targeted Target route check failed at
Chromium launch, before navigation, at macOS Mach-port Permission denied (1100).
The browser connector inventory also reported its host unavailable. The suite
lists **89 tests**, including Target and TANK. No browser pass, rendered-page
screenshot or full access audit is claimed. The new WebP and both linked-guide
pages were visually inspected independently.

Next: resolve Kroger through an available browser; seek another Northern Kentucky
grocery branch with local service evidence; deepen Boone Woods/Chapin and obtain
current Covington transfer/boarding photos. Keep the newly found TANK conflicts
visible. Leave Git writes, atomic pushes and the two scheduled releases to the runner.
