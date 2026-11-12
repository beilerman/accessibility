# Cold Spring Branch coverage — November 11, 2026

Prepared in the dedicated automation workspace at publication base
ba9f1f2a024546c385f5b1a3b082f16aabaec1bd. The workspace started clean, with no
unfinished edits or conflict markers. latest.json recorded the preceding Aronoff
batch as pushed. Open GitHub Source monitor issue search returned no issues.
No Git writes, deployments, private correspondence or database work performed.

## New public-source listing

Campbell County Public Library — Cold Spring Branch, 3920 Alexandria Pike,
Cold Spring, KY 41076. Four notes cover:

- Branch location, phone and general information email.
- Curbside arrival: hold-ready notification, designated parking, phone check-in
  and staff delivery while the visitor remains in the vehicle.
- Physical-card requirement, seven-day pickup window and collection by someone
  else with the card number.
- Countywide home delivery eligibility, free postal option and Adult Outreach
  contact. This is explicitly a library-system service, not a building feature.

Official URLs, all fetched successfully with HTTP 200 using Python urllib:

- https://www.cc-pl.org/locations
- https://www.cc-pl.org/curbside-pickup
- https://www.cc-pl.org/adult-outreach-services

Location was verified in the Cold Spring section, separately from Alexandria,
Fort Thomas and Newport. /locations/cold-spring currently returns the same
all-branch page; use the existing /locations address. /adult-outreach redirects
to /adult-outreach-services; the new note uses the final URL. Existing Newport
notes and their source URLs were preserved.

All four complete stored supporting passages matched another fresh fetch using
pipeline/check_sources.py quote_text. Eight evidence checks (including location,
service applicability and delivery terms) passed scripts/research/verify.py.
An initial punctuation-space mismatch in the all-branches passage was resolved
against the source before import. Full quotes are in pipeline/evidence/quotes.json;
three new source baselines returned 200, with no new monitor findings. Earlier
findings and baselines were preserved.

No entrance, door controls, restroom, quiet-room or continuous-route claim was
inferred from the curbside service. These building details remain explicitly
unverified. New listing checked_at is November 11; existing listing review dates
are unchanged. No existing venue was fully or partly rechecked in this batch.

## Photo and guide search: no publication

Searched Commons for Cold Spring library and the official library website for
branch photos, social stories and access information. Search results for Cold
Spring Harbor Library in New York describe a different place and were excluded.
No candidate photograph was downloaded or published, and no suitable official
photo narrative was found in this bounded search. This does not establish that
none exists.

Historical lead, not promoted to current access guidance:
https://www.cc-pl.org/wp-content/uploads/2020/07/August-2020-Newsletter-1.pdf

Search-index text mentions a 2020 driveway project, curbless sidewalks and parking
beside the building. The PDF has not been downloaded or visually inspected in this
batch, and those historical statements have not been verified against current
physical conditions. It is not a photo walkthrough selected for the guide manifest.
Current entrances, curbside-space layout and route connections still need evidence.
AMC's six blocked notes, BCM/NaturePlay and Aronoff's held photo are unchanged.

## Validation

Passed: 44 unit tests, 39 pipeline tests, TypeScript, lint and production build.
An initial test used state instead of the catalog's region filter; corrected to
region and all checks rerun successfully. Build retains the existing Atkinson
font-fallback warning. The new route is in the browser test list; the category
regression checks Kentucky-library discovery, pickup conditions and explicit gaps.
Preservation check: all 101 pre-existing venue records and all earlier quote
entries are byte-equivalent as parsed JSON. Only four notes and four quote entries
were added. Snapshot diff contains only the three new baselines.

Catalog now: 102 venues, 719 active notes, 152 stored quotes, four licensed access
photos, six official guide links. Weekly full rechecks remain 4/8.

Playwright attempted all 81 registered tests with one worker and max-failures=1.
Chromium failed before page load with macOS bootstrap_check_in Mach-port
Permission denied (1100): one launch failure, 80 tests did not run. Runner must
pass its browser validation before pushing. No rendered-browser inspection is
claimed. This batch introduces content in the existing venue layout, with no
framework, component, layout or imagery changes.

Next concrete batch: resume the full rolling review with Ault Park; look for a
licensed pavilion approach/path photo with clearly visible surfaces and documented
reuse rights during that review. Then Bettman, Big Bone Lick and Bogart's, aiming
for four more full reviews this week. Cold Spring's old newsletter is a held
historical lead, not a reason to defer rolling rechecks.
