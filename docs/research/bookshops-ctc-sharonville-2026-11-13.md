# Neighborhood shopping, City Hall and transport evidence — November 13, 2026

Prepared in the dedicated automation workspace from
`0186dafdac223eda22c96bb0363978fef678d7f5`. The starting tree had no unfinished edits
or conflict markers. The accepted base already contained the previous Walton test
repair. No open Source monitor issue was returned. No Git writes, push, deployment,
preview, scheduler/database change, private correspondence or outbound message was made.
This is a local batch for runner validation, not a production-release claim.

## Public information added

| New venue | New notes | Main evidence and remaining limits |
|---|---:|---|
| Poor Charlotte’s Books, Covington | 4 | Regular hours, reading lounge, attributed crawl parking/restroom descriptions. The queue’s Madisonville identity was wrong; current official address is 112 West Pike Street. Threshold, lot identity, toilet layout and changing facilities remain unknown. |
| Blue Marble Books, Fort Thomas | 6 | Street/YMCA parking description, phone ordering, separate Bookshop inventory and event restrictions on the Great Green Room. Homepage includes Sunday hours while the contact page omits them. Historical side ramp and current-published front steps are separate views; no current complete route is inferred. |
| Book Bus Depot, Sharonville | 7 | Fixed shop, parking, attributed restroom description, no telephone, donation timing and separate neighboring café hours. The shop’s overflow-parking address says 10090 Reading Road; the city gives City Hall as 10900. Both source claims remain attributed. |
| Sharonville City Hall | 7 | Council accommodation request at least one week ahead, agenda/viewing links, tax-office move, appointment/help cutoff, tax-only exterior drop box near the labeled accessible entrance, and accommodation contact. Door controls, route continuity, seating and toilets remain unresolved. |
| Joseph-Beth Booksellers, Rookwood | 3 | Current location/hours, phone availability/set-aside/special-order help, and an undated temporary online-order pause. A useful licensed interior panorama prompted this fifth listing while time remained. No official elevator or curbside promise was imported. |

**33 new note IDs:** 27 across the five new listings, plus four CTC Dial-A-Ride
notes and two Fresh Thyme Newport notes. CTC additions document discount-application
requirements and verification, historical alternative-format/relay instructions,
and a historical cancellation-policy discrepancy. Fresh Thyme additions cover order
changes before picking starts and the limits of third-party delivery offers.

All notes retain permanent IDs, source type, source URL, date, history and gated
supporting passages. Crawl access descriptions are `partner_official`; they are
neither Threshold certification nor field observations. The crawl page interleaves
columns when flattened. The [HTML/CSS context receipt](bookshops-ctc-sharonville-2026-11-13-crawl-context.json)
keeps each shop’s name/address/access block together; Blue Marble was not assigned
its neighbor’s restroom claim. Event hours were not substituted for normal hours.

## Accuracy, evidence backfill and freshness

- **Two full rechecks:** every pre-existing CTC note (9) and Fresh Thyme Newport note
  (6) was compared clause by clause with current sources. Both whole-listing dates
  moved November 12 → 13. These repeat venues already reviewed in the rolling week;
  they are not two additional unique weekly venues. No partial recheck is claimed.
- **15 old note texts retained; five source pointers corrected.** Newport’s current
  page links the pickup FAQ under `rsid/104`, replacing the five `rsid/801` pointers.
  Both endpoints returned 200 with the same FAQ fingerprint; the source URL and
  appended history were updated through the helper’s fresh-fetch gate. This is
  source repair, separate from the 33 new IDs and from semantic corrections.
- **Zero missing-record backfills and zero old-text semantic revisions.** The same
  20 legacy missing records remain: Heritage 8, Molly Malone’s 4, AMC 6, CSO 2.
  These blocked/manual-review cases were not repeatedly retried or marked verified.
  Two new-note context passages (Book Bus contact purposes and the city coordinator
  role) were strengthened during prepublication review; neither is legacy backfill.
- CTC’s current webpage makes cancellation under two hours a no-show; its linked
  brochure marked Revised 1-2023 uses a third late cancellation within 30 days.
  Historical wording is explicitly dated and separated. Different child-fare
  categories are also retained as a warning, not silently reconciled.
- The Sharonville transition plan has an unfilled adoption date and unfinished
  inventories; it is not a completed audit or a compliance finding. Its old tax
  office address is superseded by the current city tax page. The displayed council
  calendar differs from the recurring timetable; specific dates need confirmation.

The initial evidence attempt had three passage mismatches (two Blue Marble text
boundaries and PDF spacing). Its diagnostic receipt is preserved. Quotes were
corrected against the actual extracted source and the gate rerun; no failed gate
was bypassed. The canonical [final evidence](bookshops-ctc-sharonville-2026-11-13-final-evidence.verified.json)
passes **53 checks: 48 notes and five addresses**. A matching passage remains a
presence check; the editorial scope/condition/date review is separate.

## Photographs, original guides and community reports

**One licensed photograph** was added: Antony-22’s Rookwood interior panorama,
October 16, 2022, CC BY-SA 4.0. It shows stairs/handrails between two levels and
upper-level armchairs. The full original frame was proportionally resized to
2560 × 613 and converted to WebP, with no crop, retouching or AI. The final output
was visually inspected; distant customers have no discernible identifying detail
at the delivered size. It does not show an identified elevator or verify today’s
layout. [Photo provenance](bookshops-ctc-sharonville-2026-11-13-licensed-photo.json)
and the [media review](bookshops-ctc-sharonville-2026-11-13-media-review.json) retain
source, author, licence, date, hashes, conversion and limits.

**Nine original guide links** cover 14 selected photo views: Poor Charlotte’s 2025
entrance report; Blue Marble front steps and separate 2023 side-ramp report; two
Book Bus photo pages; Sharonville counter/drop box; CTC’s service-specific vehicle
photos; its two-page January 2023 brochure; and the official Rookwood shop-floor view. All nine linked originals returned
200 in fresh helper and raw fetches. The city photos are labeled by the city as its
tax office at the city building and tax drop box. Their capture dates are unknown.
The deployed lift in CTC’s homepage picture belongs to the medical-transport section;
it is not evidence of the vehicle assigned to a Dial-A-Ride booking.

**32 candidate image views / 32 distinct hashes and three PDF pages were visually
reviewed.** Commons category paths and photographer credits were followed. The
Commons 4X Amelia Express photo is the wrong CTC service; Depot Square is not Book
Bus Depot; an August 2005 City Hall image has a noncommercial licence and insufficient
entrance detail. Portraits, logos, a book cover and decorative close-ups were not
promoted as access evidence. No copyrighted guide photo was republished. The previous
85 licensed photos and every prior guide/report entry are preserved.

**Three separate community reports:** a 2023 Blue Marble ramp news report, a public
Book Bus donation recommendation, and historical Rookwood seating/elevator comments.
None is merged into official facts or described as a documented access visit.
Publication/visit-date uncertainty remains visible; unnecessary usernames, personal
health details and staff names are omitted. Public Reddit material was read, not
just search snippets. Searches also covered r/covington, Northern Kentucky/local
interest discussions and Tripadvisor; no useful new account was invented when
results were irrelevant or the underlying page failed to load.

## Held findings and next concrete work

- CAM’s official location page and winter storefront photo do not resolve current
  entrance, aisles, toilets or pickup help; no licence/capture date was established.
- Country Fresh’s Vine and Beechmont branches are distinct. The community grocery
  recommendation does not name a branch, and third-party curbside claims were not
  imported.
- The discussion’s Deer Park IGA identity is not yet tied to Dillonvale. The latter’s
  generic FastLane/subscriptions template exposes broken shortcodes; it does not
  establish a working collection procedure.
- Handzy’s fresh location page currently lists holiday hours every day, unlike the
  indexed regular-hours text. Its product-page fetch returned 429, so indexed pickup
  text is unresolved. Investigate current entrance, fitting rooms, seating/toilets
  and collection help. The shop and neighboring coffee service have different hours.
- Blue Marble’s guessed rental URL returned 404. Tripadvisor’s Blue Marble and
  Cincinnati wheelchair-parks pages were unavailable; no snippet claim was imported.
- Next growth: Handzy and branch-specific everyday grocery/service leads. Pair this
  with the next due usable full venue review (for example Findlay Market or Price
  Hill Library), not another pass devoted only to the same blocked sources.
- Next photo/depth targets: current Blue Marble side entrance and toilets; Poor
  Charlotte threshold/toilets; Book Bus parking/crossing/toilets; City Hall route,
  powered doors and changing; CTC boarding deployment and fit; Fresh Thyme pickup;
  Rookwood elevator, entrance and toilet route. Keep existing iNK/Major Minor, LeBlond
  and Chestnut gaps active.

The community queue now has **62 names: 21 added, 33 lead-only, eight held**.
Catalog totals are **186 venues / 1,941 active + one retired note / 1,921 quoted /
20 missing / 86 licensed photos / 111 guides / 53 community reports**. Categories:
parks 34, arts 33, food 28, shopping 23, museums 21, libraries 15, public services 14,
recreation 10, transportation 8. Preserve breadth beyond bookshops in the next batch.

## Validation and runner boundary

The final local checks are recorded in the [validation receipt](bookshops-ctc-sharonville-2026-11-13-validation.json).
53 evidence checks, 113 unit tests, 79 Python pipeline tests, lint, TypeScript and
the production build pass. Eighteen selected factual URLs have current baselines.
The catalog audit preserves 179 unrelated place records, every prior permanent ID
and history prefix, all earlier media/reports and 550 unselected source baselines.

Chromium cannot launch in this agent sandbox: MachPort rendezvous permission denied
1100. The independent browser-control inventory reports its host unavailable.
No browser/axe/visual layout pass is claimed. **174 browser tests remain the runner’s
required gate** before atomic pushes. HTTP page/link and image-hash receipts are
separate from browser testing. All mutation specs are already applied; do not rerun
the add/depth scripts. Final evidence and validation supersede intermediate receipts.
Only the release runner deploys, at 9 a.m. and 5 p.m. Eastern, at most twice per day.
