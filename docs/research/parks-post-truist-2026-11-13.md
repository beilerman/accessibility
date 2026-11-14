# Parks, postal service and arena access — November 13, 2026

Prepared in the dedicated automation workspace from publication base
`9890e39bf8d59968a412bc69408d3984a6aee3dc`. This report describes local preparation;
the runner owns validation, Git publication and the scheduled production release.

All same-prefix mutation specs are already applied; do not rerun the add/depth/recheck
scripts against them. Earlier evidence receipts record intermediate reviews. The
`-final-evidence.verified.json` and final validation receipt describe the final catalog.

## Recovery before expansion

The supplied host failure was an outdated E2E assertion that Walton Library must
have an undocumented information domain. Its new notes cover all four domains.
The accepted base already fixes that assumption by selecting a catalog place with
an actual gap, retaining the unknown-state assertion and the Walton search/source
checks. The seven hashes in the preceding integration receipt matched the starting
files. The workspace started clean, with no conflict markers or pending edits.
No further repair or weakened assertion was necessary.

A targeted attempt at the repaired browser test in this agent session failed
before loading a page: Chromium's macOS MachPort launch returned permission denied
1100. The separate CUA browser host was unavailable. Those environment failures do
not reproduce the original host assertion failure. The runner must run the full
164-test browser suite, including mobile/axe checks, before publication.

## New coverage and new information

| New venue | New notes | Useful information and boundaries |
|---|---:|---|
| Walton Post Office, Kentucky | 5 | Local phone, parking-lot listing, counter/held-mail/notice-pickup hours; national identification, ten-day collection and third-party written permission rules. No curbside or carrying assistance inferred. |
| Farbach-Werner Nature Preserve, Ohio | 7 | Dawn–dusk hours, parking, barn restrooms, conflicting Pin Oak distances/surfaces, vehicle permit, and two-week program-accommodation notice. No measured grade or complete route established. |
| Glenwood Gardens, Ohio | 11 | Dated restroom restriction/portable-toilet notice, park and seasonal facility hours, trail-distance conflict, sound-producing garden, permit/accommodation procedure, transit-sidewalk/crossing connection and unfinished through-trail. |
| Fernald Preserve, Ohio | 10 | Different indoor/outdoor hours, arrival direction, service-animal exception, indoor toilets, shelter seating/table restrictions, room-booking timing/approval, conflicting room capacities and driving-tour limits. |

**42 new note IDs:** 33 in new venues and nine at existing venues. The existing
additions comprise seven Truist notes (changing-station inconsistency, entrance and
box-office relationship, first aid, conflicting payment guidance and general door
time, plus two commencement-specific elevator/entrance and companion/arrival notes) and two Southgate notes (in-person ticket purchase and outside-drink policy).
All four locations have fresh address evidence. New route/category tests cover the
postal service and all three outdoor additions.

USPS's location response embeds the actual `poDetail` record alongside an unpopulated
generic template. Quotes bind specifically to Walton location ID **1386341**, its
address and named service-hours records. No generic Washington-template hours or
facilities were imported. National Hold Mail rules are explicitly national.

Glenwood's November 12–17 maintenance notice supplied no year; the note says it was
present on November 13, 2026 and requests confirmation. Its portable toilet is not
assumed wheelchair usable. The operator's current project page describes completed
Phase 1 sidewalk/crossing work and continuing Phase 2 construction through a
**tentative fall 2027**; it does not establish an open through-route, bus frequency
or boarding conditions. Fernald's linked September 2024 policy is identified by
version, while its current webpage's different conference capacity remains visible.

## Corrections, evidence support and freshness

**Three full rechecks:** Southgate House Revival (four old notes) and Truist Arena
(ten old notes), November 10 → November 13; Kenwood Towne Centre (ten old notes),
November 11 → November 13. All repeat venues already reviewed within the rolling
week; they do not add three unique weekly venues. No partial
venue review is claimed.

Of **24 old notes reviewed**, 18 retain their wording and six are revised:
Truist's production-dependent accessible seating, limited first-come wheelchair
assistance, event-dependent drop-off/parking requirements and attributed restroom
description; separation of medical-bag exceptions from the outside-food prohibition;
and Kenwood’s second-floor Nordstrom-wing seating location. Eight old compound
records received missing secondary-clause support:
Southgate's ID requirement; Truist's medical-bag inspection, service-animal leash,
limited first-come parking, no rented/borrowed wheelchair seating, entrance/placard,
and listening-device/interpretation conditions; and Kenwood’s wheelchair-collection
clause in its Security-office note. The emergency-route quote also
retains its emergency context. All 24 old records have fresh claim/source bindings.
These are support repairs and qualifications, not new note growth.

No previously absent quote record was repaired: **20 missing records remain**
(Heritage 8, Molly 4, AMC 6, CSO 2). Those notes and venue dates are unchanged.
Newport Aquarium's official access page returned **403**; its eight existing notes,
quotes and full-review date remain unchanged. A blocked attempt is not a partial
or full review, and those eight quoted notes do not increase the missing-record count.

## Access photographs and original visual guides

**One licensed photo:** [Walton Post Office entrance, February 25, 2023](https://commons.wikimedia.org/wiki/File:United_States_Post_Office,_Main_Street,_Walton,_KY.jpg),
w_lemay, CC BY-SA 2.0. The full frame shows paired glass doors/pull handles, a
concrete apron, cracked asphalt, a yellow curb and collection boxes. It was
converted faithfully to WebP without cropping, retouching or changing the scene.
No threshold height, door force, powered opening or continuous route is inferred.
The final local asset was visually inspected. All 83 previous photo assets remain
unchanged; no AI illustration was added.

**Ten original guide links:** six photographic web guides, one 23-page historical
PDF, and three explicitly labeled maps (two web images and one PDF). Selected web views cover barn
approaches, a wooded paved path, Cotswold paving/bench, a Highfield timber-to-paving
transition, and Fernald's entrance/interior and historical meeting-room layout. The presentation has April 2024 PDF metadata;
pages 11–13 show Fernald rooms, lobby doors and a **raised bird-viewing blind with
stairs**; no alternative route is established. All 23 PDF pages were screened,
with those three inspected at larger scale. Publication/upload dates are not
photograph capture dates. NKU’s currently linked September-named campus PDF adds route/entrance/parking symbols and construction areas absent from an older hosted copy; its printed revision remains June 2025. It is explicitly a map, not a photograph. These originals have no assumed reuse licence and were
linked rather than copied into the documentary photo collection.

A later DOE gallery (last updated April 14, 2020) contributes a full-frame meeting-room view with movable tables and wheeled chairs; it does not establish current layout or clearances. NKU commencement instructions are separately scoped: staff direct circle-drive arrivals to the second-floor concourse elevator, and the ceremony uses a one-companion seating limit and 90-minute door time. These do not override the arena’s general event arrangements.

Media research included 77 official candidate assets (navigation, duplicates and
variants included), 45 selected contact-sheet views, two Walton Commons views,
nine further Commons views, and seven Truist event/gallery views. These counts
are research effort, not distinct usable access photographs. Commons categories
and photographer/agency collections were followed. Six April 2026 CC0 Fernald
wetland images lacked useful public-route detail; a 2015 exterior was mainly
decorative; industrial-era Fernald imagery, a historical Southgate church postcard,
and Truist concert images were rejected. Glenwood's mound search result had a
conflicting location caption. See the media receipt for original URLs, photo
licence/date metadata, byte counts, PDF metadata and precise remaining gaps.

## Public community research

The underlying [local wheelchair-path discussion](https://www.reddit.com/r/cincinnati/comments/1r1zxd0/best_local_wheelchair_accessible_nature_paths/)
was reread, and four separate linked reports retain Farbach's route recommendation,
Glenwood's paved/gravel distinction, a separate wheelchair-outing account with an
initial incline, and Fernald's segment-specific prairie/Hickory recommendation.
The thread is indexed to February 2026; exact comment and visit dates remain null.
No usernames, personal health details, unsafe movement advice or forum photographs
were imported. Recommendations are not access certifications or measured routes.

Searches also covered r/covington, Northern Kentucky, local-interest and Tripadvisor/
City-Data material. An older wheelchair-visitor thread supplied existing-venue leads;
no extra report was needed. Tripadvisor's underlying forum remained unavailable;
its snippets remain leads only. No private material, accounts, questions or messages
were used. The queue's stale aggregate fields were reconciled to its actual statuses, then extended with three grocery leads: **52 names, 14 added,
35 lead-only and three held** (38 remaining). CAM Evendale, Cold Spring Meijer and an unresolved Deer Park IGA branch are prepared
in the grocery preflight. CAM’s original winter entrance view was inspected; Meijer’s
helper returned 403 despite web-renderer access, and the IGA branch identity remains
uncertain. No additional public note/report or physical-access claim was imported.
Walton was a
licensed-photo discovery, not a community recommendation. Historical dining-only
counters remain separately labeled instead of posing as cumulative totals.

## Validation and next work

The canonical final evidence file verifies **70 items: 66 current notes and four
addresses**, with no failures. Twenty selected factual sources and all ten guide
originals return HTTP 200. The initial pipeline run correctly detected missing new
source baselines; after creating those baselines, all 79 pipeline tests pass.
The late unit run caught NKU commencement notes mislabeled as venue-official
despite their different publisher domain; they were corrected to public-agency
attribution with fresh evidence bindings. All 106 unit tests, lint, TypeScript and
production build pass. The final validation
receipt records local HTML checks and file hashes; browser/axe/layout validation
remains the runner's required gate. No source gate or browser assertion was weakened.
The late Kenwood FAQ also contains a yearless December 19–January 4 parental-guidance
period; no current-season restriction was inferred from that date range.

Prepared totals: **176 places / 1,868 active notes + one retired / 1,848 quoted /
20 missing / 84 licensed photographs / 97 linked guides**. All permanent IDs and
history prefixes, 169 unrelated existing place records, existing media/report
records and 524 unselected source baselines were preserved.

Next: pair Leblond or BCRTA full-note checks with shopping,
grocery and everyday-service leads (Remke Taylor Mill's conflicting hours, Kroger
Latonia's blocked location, Roebling's exact Dayton identity). Continue public
community discovery. Gilmore Ponds and Wasson Way are additional park leads, but
parks are now 34 listings; balance future growth toward the smaller everyday
categories. Return to Aquarium or the 20 missing records only when a usable source
or manual review is available. Prioritize current Glenwood transit/boardwalk/toilet
views, Farbach's barn/toilet route, Walton door controls and Fernald's toilets and
alternative blind approach. Fort Thomas's Matterport tour still needs a working
browser. Keep Git publication, scheduled deployment and source verification distinct.
