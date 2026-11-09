# Threshold implementation status

Updated 2026-09-10. This is the current execution record; the older plans' completion labels are historical and do not establish current readiness.

## Outcome and scope

The local read-only directory is implemented and validated with 32 places and 106 sourced facts across Northern Kentucky and Greater Cincinnati. The sourced directory was published to production after the user approved it. The expanded photo update is live: 20 licensed venue photographs, five labeled AI category artworks covering the other 12 listings, and three separate AI teaching illustrations. All 32 listings have a visual. A new visitor-report layer adds 17 attributed public accounts across 12 places, clearly separated from official venue facts; [research and release verification](VISITOR-RESEARCH-RELEASE-2026-09-10.md) is complete. See the [visual coverage and production verification record](VISUAL-COVERAGE-2026-09-10.md). The full six-week program remains unfinished, including community accounts, database authorization, organization claims and field reviews.

The original Claude v1.1 plan is now preserved verbatim in [PLAN.md](PLAN.md), downloaded from the [Claude artifact](https://claude.ai/cowork/cse_013pQ93PyPT65RBRxNqzjzwt?artifact=18419720-bc48-4c87-9773-5e398c8a0dfa). The [March foundation plan](plans/2026-03-22-001-feat-accessibility-review-site-plan.md) and [auth follow-up](plans/2026-03-22-002-feat-auth-maps-a11y-tests-plan.md) remain historical context. [DECISIONS.md](DECISIONS.md) records the current departures and safeguards; the original plan is not rewritten to imply completion.

## Work ledger

| Workstream | Status | Evidence or next exit condition |
|---|---|---|
| Project recovery | Done | Repository `beilerman/accessibility` recovered into this working tree; package manifest uses Next.js 16 and React 19. |
| Original-content assessment | Done | March plan explicitly commissioned mock accessibility attributes, three sample reviews in Matthew's voice and placeholder imagery. Coordinating agent reports the live site still displayed those samples. These cannot serve as visit evidence. |
| Public-source research and inclusion | Done for initial scope | [Integrated dataset](../src/data/places.json): 32 places, 106 facts; 15 Kentucky and 17 Ohio. Bettman excluded because full-page retrieval was unreliable. [Ohio notes](research/cincinnati-sources.md) and [Kentucky notes](research/nky-sources.md) preserve research context. |
| Content QA | Done for initial scope | Per-fact source links, source-check date and limitations retained; all records are public-website reporting with unknown observation dates. Corrected MegaCorp restroom scope and added Big Bone Lick lake restrictions. No venue measurements, reviews or visit evidence invented. |
| Public-page replacement | Done locally | Sourced place details, provenance, checked dates, limitations and combined search/filter discovery implemented. Sample editorials and stock-photo evidence are absent from public presentation. |
| Read-only operating mode | Done locally | Public discovery works without database access. Contribution/profile/callback routes redirect to the information-only login page. Browser checks observed no Supabase requests; legacy sample review URL returns 404. Accounts and writes remain gated. |
| Data expansion tooling | Done for bounded staging | Eight pipeline tests pass. An actual remote sample staged 25 distinct Overture identities from release `2026-08-19.0`, retaining provenance and empty accessibility facts. [Verification report](../pipeline/verification/remote-sample-2026-09-10.json) records successful exit and matching hashes. No rows imported into site or database; no full regional extraction performed. |
| Per-fact provenance (week 2) | Done and deployed 2026-11-08 | All 106 facts carry a stable ID (`<slug>.<domain>.<n>`), publisher type (`venue_official` 95 / `operator_official` 9 / `public_agency` 2), separate `retrieved_at` / `published_at` / `observed_at`, `review_status` and an append-only history. Venue pages show per-fact publisher, check date, caution state and a disclosed history with anchors. `pipeline/check_sources.py` snapshots all 31 source pages and flags changed or dead sources. See "Week 2" below. |
| Full source recheck | Done 2026-11-08 for all places (Newport Aquarium rechecked in a regular browser) | 31 of 32 places re-read: 97 notes confirmed, 3 revised, 1 retired, 15 added. Now 120 displayed notes. See "Full recheck" below. |
| Coverage expansion (week 5, first slice) | Done 2026-11-08 | 9 new listings / 41 notes: Metro + Access paratransit, the Connector streetcar, TANK + RAMP, Kenton County Library Covington, Great American Ball Park, TQL Stadium, American Sign Museum, Vent Haven Museum, Dinsmore Homestead. Catalog now 41 places / 161 notes. |
| Database authorization (week 3) | Applied live and verified 2026-11-08 | `supabase/migrations/002_harden_community_permissions.sql` + `003_archive_legacy_sample_reviews.sql`; 15 PGlite authorization tests. See [COMMUNITY-READINESS.md](COMMUNITY-READINESS.md). |
| Security and community workflows | Gated | Accounts, uploads, claims and publication need tested authorization, moderation and attribution. No successful database-policy test has been recorded here. |
| ThresholdAccess database | Restored and healthy | Organization is now Pro. User confirmed subscription; restore succeeded and live SQL was verified at 2026-09-10 19:32 UTC. Other projects were not paused. Community permission fixes remain; see [COMMUNITY-READINESS.md](COMMUNITY-READINESS.md). |
| Build and browser validation | Passed for local scope | Build: 46 routes; 22 unit tests; 10 browser tests; type and lint checks pass, with 16 legacy lint warnings. Dependency audit reports zero findings. Details and limits below. |
| Production release | Catalog and photo update live | User approved publication. Catalog deployment `dpl_H5whfMQDvD5oh6YaBfDMgekxoKg5` was READY and publicly served the 32-place/106-fact directory, confirmed by HTTP and Chrome. [Photo release record](PHOTOS-RELEASE-2026-09-10.md) tracks the follow-up. |
| Field reviews and owner claims | Human work required | Actual visits, measurements, photographs, authorship approval and organization authority checks have not been performed by this research run. |

## Local validation evidence

Results below were supplied by the coordinating agent from this run. The browser last-run artifact was independently inspected and reports `passed` with no failed tests; the retained remote extraction report was also inspected. These are local implementation checks, not a live database authorization test or a comprehensive accessibility audit.

| Check | Command or artifact | Result |
|---|---|---|
| Production build | `npm run build` | Passed; 46 routes in build output. |
| Type check | `npx tsc --noEmit` | Passed. |
| Lint | `npm run lint` | Passed with 16 warnings in legacy code; not a warning-free result. |
| Unit tests | `npm test` | 22 passed. |
| Browser tests | `npm run test:e2e`; local production server on port 3217 | 10 passed; `test-results/.last-run.json` records passed/no failures. |
| Dependency audit | `npm audit` | Zero reported vulnerabilities at this checkpoint; not a security guarantee. |
| Pipeline tests | From `pipeline/`: `.venv/bin/python -m unittest -v test_seed_overture.py` | Eight passed. |
| Actual remote staging | Exact command and hashes in [remote sample report](../pipeline/verification/remote-sample-2026-09-10.json) | Exit 0; 25 distinct IDs; source arrays and filenames preserved; exact bounds checked; no network/schema errors; no import. |

Browser coverage includes seven public routes, combined search/filter/detail/source navigation, empty-result recovery, read-only redirects and absence of Supabase requests. Keyboard search and skip-link focus, mobile navigation at 375 px, narrow-layout overflow, and automated dark-theme/reduced-motion access checks passed. Automated checks found no violations on the tested routes/states; they do not establish full WCAG conformance. Manual assistive-technology testing and live RLS tests have not been completed.

The Overture sample reached its 25-record cap, so regional completeness is unknown. Its identity confidence is not accessibility confidence. Keep the staged sample separate from the 32 curated public listings.

The coordinating agent also inspected rendered screenshots of the homepage at 1440 px and Newport Aquarium detail at 375 px; spacing and source links were legible, and Playwright captured no page errors. Local screenshots: `/tmp/threshold-qa/home-desktop.png` and `/tmp/threshold-qa/place-mobile.png` (temporary evidence, not committed artifacts).

Existing production rollback reference: deployment `dpl_3oRDbYAsFFpUgtpPt42siyBB1k9s`, [existing deployment URL](https://accessibility-itec246ug-brad-eilermans-projects.vercel.app), initial repository commit `d4a1ac2`. This identifies the previous sample-content release; it is not the new preview or a recommended content state. The new preview is recorded in [RELEASE-2026-09-10.md](RELEASE-2026-09-10.md).

## Release acceptance

1. Every displayed accessibility fact has an attributable source, checked date and appropriate limitation; absence of a fact displays as unknown.
2. No sample prose, invented measurements, stock imagery or machine-generated illustrations appear as evidence of a venue visit.
3. Search and filters work individually and together, including keyboard use, mobile layout, empty results and direct venue URLs. Domain filters mean information coverage, not guaranteed suitability.
4. Source links resolve to the intended organization and location. Time-sensitive accommodations and advance-notice requirements remain visible.
5. Read-only routes do not require the inactive database. Disabled write workflows cannot be reached by posting directly to their endpoints.
6. Relevant lint, type, build, unit and browser checks finish successfully. Manual keyboard, focus, zoom and assistive-technology checks are recorded separately from automated scans.
7. The release record identifies source commit, deployed URL, deployment readiness, live route checks and rollback target.

## Six-week execution sequence

Weeks are relative to the restart; this is an ordered backlog, not a claim that outside participants have committed.

| Week | Accountable role | Deliverable and exit condition |
|---|---|---|
| 1 | Engineering + research | Local directory and checks complete. Preview review and release evidence complete; production catalog and photo update published and verified. User decides any service-capacity changes separately. |
| 2 | Data steward + engineering | Add per-fact IDs, source type, retrieval/publication/observation dates, attribution history and review status. Deduplicate candidate imports; refresh a small sample and verify changes reach the interface. |
| 3 | Engineering + security reviewer | Establish minimal grants, row policies, protected roles and private pending uploads. Exercise signed-out, user A, user B and moderator access, including denied writes, ownership changes and draft visibility. Enable community workflows only after evidence passes. |
| 4 | Editorial lead + actual visitors | Recruit willing local reviewers and conduct a small pilot across mobility, sensory, cognitive and chronic-illness needs. Capture dated observations, measurements where relevant, photo rights and authors' approvals. Reconcile contradictions without erasing history. |
| 5 | Research + moderation | Expand everyday coverage beyond attractions: restaurants, groceries, libraries, parks, transit and public services across both states. Trial organization claims with location-specific authority review and a dispute path. |
| 6 | Engineering + editorial + user | Test the complete contribution-to-publication flow, conduct assistive-technology user testing, review source freshness and correction handling, and approve the next release scope using recorded evidence. |

## Measures and handoff

Baseline for the local directory is 32 places and 106 facts; the separate staging sample has 25 unreviewed identities and zero accessibility facts. Track published sourced venues, fact coverage by domain/geography, unsupported claims removed, overdue source reviews, unresolved contradictions, and correction turnaround. Track completed field reviews separately from public-web records. Set targets after establishing a baseline; do not manufacture review counts, community participation or outcomes.

Before the next operator proceeds, update the work ledger with finished changes and validation evidence. Preserve the original plans as history and use [DECISIONS.md](DECISIONS.md) for the revised operating rules.

## Photo phase — September 10

Nine licensed venue photographs (four KY, five OH) were downloaded, matched to catalog locations and visually inspected. Attribution records retain source/author/license/photo date, including an unknown date where evidence conflicts. Full frames are retained; no access measurements or venue alterations are inferred. Three generic AI illustrations explain entrance, sensory and rest features with visible labels and question prompts. They are separate from venue photos. Local build/type validation, 24 unit tests and 12 browser tests passed; lint retains 16 legacy warnings and no errors. Desktop and mobile image/caption checks passed. See [photo release evidence](PHOTOS-RELEASE-2026-09-10.md).

## Week 2 — per-fact provenance and source monitoring (November 8)

- **Data model.** `pipeline/migrate_fact_provenance.py` (idempotent, one-time) assigned per-fact IDs, publisher types and dates. IDs are data from now on: never renumber or reuse them. Editing a fact keeps its ID and appends a `revised` history entry. `observed_at` stays null for website facts (contract-tested). `published_at` is null everywhere because no source states a page-update date.
- **Freshness.** A fact is due for recheck 180 days after `retrieved_at` (`RECHECK_AFTER_DAYS`). Overdue, `needs_recheck` or `source_unavailable` facts show a visible caution. Venue pages revalidate daily (`revalidate = 86400`, confirmed in the prerender manifest), so overdue cautions appear within a day without a redeploy. The first notes come due 2027-03-09.
- **Change detection.** `python3 pipeline/check_sources.py` fetches each distinct source, hashes normalized visible text and diffs against the latest snapshot in `pipeline/source-checks/`. `--flag` marks affected facts and records a `flagged` history entry. A hash change is a prompt for editorial review, not a finding. HTTP 401/403/429 count as `blocked` (bot protection) and never flag facts. Baseline 2026-11-08: 30/31 loaded. The Newport Aquarium page returns 403 to automated clients (Akamai); it needs a manual browser check each cycle.
- **Sample refresh.** Five places (21 facts) were re-read against their live sources on 2026-11-08: Aronoff, Cincinnati Art Museum, CVG, Creation Museum and the Freedom Center. Twenty still matched and were marked `rechecked`. `creation-museum.sensory.1` was `revised` to include the source's strobe/photosensitive-epilepsy warning for the 4D theater and the flashing lights in the Corruption exhibit. The revision appears on the venue page and in its history.
- **Validation.** 29 unit tests (incl. provenance contract and caution logic), 16 browser tests (new: per-fact provenance, history disclosure and an axe scan with history expanded), 16 pipeline tests (`.venv/bin/python`, which supplies duckdb), build of 48 routes, lint with 0 errors and 16 legacy warnings. The gitignored `output/` scratch harness is now excluded from lint. Desktop and 375 px dark screenshots inspected: no overflow.
- **Deployed** 2026-11-08 after user approval: `dpl_554w2gCdLUMiPQcJr6UX5ZhBtxkJ` (commit `e49e3c2`), Ready; all 32 venue pages returned 200 and the revised note and history were present in live HTML. Rollback: `dpl_2f4LUxGzK34pSV1pRuJYDid8VBed`.
- **Not done at that commit.** The remaining 27 places keep their 2026-09-10 retrieval date. Deduplication of Overture candidates (also listed for week 2) has not started; candidates remain staging-only.

## Full recheck and monitor hardening (November 8, continued)

- **Method.** The 27 remaining places (85 notes) were split across three research agents. Each verdict had to cite verbatim passages, and every passage was machine-checked as an exact substring of a fresh fetch. All passed except Music Hall's quotes, which differed only in apostrophes; those passages were confirmed directly. Every proposed revision or addition was read against the source before inclusion. Clauses without a supporting passage were dropped: an unsupported "loud grinding noises" for the Zoo train and a "clear-bag policy" for Truist Arena.
- **Outcome.** 77 confirmed. Revised: `contemporary-arts-center.cognitive.1` (the two-week notice was attached to the wrong service) and `big-bone-lick-state-historic-site.mobility.1` (adds the state's warning of a steep hill down from the museum parking lot and the switch to a dirt trail). Retired: `sharon-woods.mobility.2`, because Great Parks removed the statement it described. Retired notes are hidden from the site but kept with their ID and history (`review_status: retired`). Added 15 sourced notes, including the Zoo's hill/incline warning and Safari Train noise warning, Great Parks' two-week accommodation notice on all four Great Parks listings, Sharon Lake's drawdown until spring 2027, library parking and curbside/drive-thru service per branch, NKY Convention Center's powered-device rules, CAC accessible parking and Truist Arena's medical-bag exception.
- **Newport Aquarium.** It returns 403 to scripts (Akamai), so it was re-read in a regular Chrome session on 2026-11-08. All 5 notes still match. Added: free admission for paid personal care attendants (call for companion tickets), and the magnifier rental and weighted lap pad. Future rechecks of this source need a browser.
- **Monitor accuracy.** `check_sources.py` fingerprint v4:
  - Text inside inline scripts now counts (parks.ky.gov ships content as Vue JSON; the old hash saw only navigation). `<nav>`, `<header>` and `<footer>` are excluded.
  - Blocks are sorted, so a menu shuffled per request does not count as a change. Library load-balancer node names are stripped.
  - Snapshots record `fingerprint_version`, so changing the method never reads as a content change.
  - A "changed" page is re-fetched twice before being reported; inconsistent pages report `unstable` and never flag facts.
  - Measured: 0 of 32 sources varied across 5 consecutive fetches (v1 had 5 noisy sources).
- **Validation.** 45 unit tests, 16 browser tests (incl. retired-note removal), 25 pipeline tests; build of 48 routes; lint 0 errors.

## Coverage expansion (November 8)

Two research agents proposed 10 listings (6 Ohio, 4 Kentucky) from official sources only, each fact backed by verbatim passages. All 44 quotes re-verified against fresh fetches; each fact read against its passages before inclusion.

- **Added (9):** Cincinnati Metro and Access paratransit, the Connector streetcar (City of Cincinnati pages; the Connector's own domain blocks scripts), TANK and RAMP paratransit, Kenton County Public Library Covington Branch, Great American Ball Park, TQL Stadium (FC Cincinnati's page, tagged operating organization), American Sign Museum, Vent Haven Museum and Dinsmore Homestead. City fields for Dinsmore (Burlington) and TANK (Fort Wright) were confirmed on their official sites.
- **Edited before inclusion:** a ballpark restroom note that named levels the guide does not tie to those sections.
- **Excluded:** Smale Riverfront Park. Its only official source is a 2020 news article, not a current visitor page; it is kept as a lead. Agents also skipped Campbell County Public Library, Devou Park, Newport on the Levee and others for lack of a substantive official accessibility page. Behringer-Crawford Museum's site failed TLS with the system Python and returned 403 otherwise.
- **Test hardening:** browser tests now derive place counts from the catalog. The dark-theme scan waited on nothing and could sample colors mid-switch (3 of 4 local runs failed after the page grew); it now waits for the theme to settle (5 of 5 pass).
- **Follow-ups:** transit-specific artwork (the transportation art shows an airport); visitor-report research for the new listings; Smale once a current official page exists.

## Coverage round 2, Recent changes page, reflow (November 8, later)

- **Added 8 places / 36 notes** (51 places, 227 active notes): Cincinnati Shakespeare Company, Ensemble Theatre Cincinnati, Taft Theatre, Cincinnati Observatory, Paycor Stadium (Bengals game-day guide; limitations say other events may differ), Heritage Bank Center, Boone Woods Park and Lou Hartfiel Memorial Park.
  - Every passage was re-verified against a fresh fetch, and every city was confirmed on an official page.
  - Dropped before inclusion: a Boone Woods sports-weather line (not access content) and a duplicate MegaCorp Pavilion proposal.
  - Skipped for lack of a substantive official page: Kenton Erlanger/Independence branches ("accessible" only), Stained Glass Theatre, Southgate House Revival, A.J. Jolly Park, Boone County Arboretum (trail lengths only), Harriet Beecher Stowe House (403) and Glenwood Gardens.
  - Unreadable here: nku.edu and Behringer-Crawford Museum (TLS failures with the system Python 3.9/LibreSSL), and Madison Theater (403).
- **Recent changes (`/updates`).** Built from note history. It lists corrections and withdrawals with the reason, the current or withdrawn wording and a link to the exact note; groups additions by place; and counts rechecks.
- **Reflow (WCAG 1.4.10).** Five venue pages scrolled sideways at 320px: mobile `1fr` grid columns could not shrink below a long URL in the limitations, and CVG's title contained "Cincinnati/Northern". Fixed in CSS. A browser test now loads every public route and venue page at 320px.
- **Parallel work.** Commits `c24f652` and `dea7761` (Riverbend, Bogart's, TQL expansion, dependency upgrades) came from another session working in this same tree. Coordinate before editing `src/data/places.json` concurrently.
- **Validation.** 54 unit tests, 23 browser tests, 27 pipeline tests; build of 68 pages; lint 0 errors.

## Custom domain (November 8)

- Production is served at https://thresholdaccessibility.com with a Let's Encrypt certificate (expires 2027-02-06; Vercel renews it automatically). The `www` host, the misspelled `thresholdaccessability.com` (+`www`) and `accessibility-omega-ten.vercel.app` all 308 to it, preserving paths. Plain HTTP also 308s to HTTPS.
- Sitemap, `metadataBase` and the new `robots.txt` use the canonical origin. `robots.txt` excludes the gated `/auth/`, `/profile` and `/submit`.
- Deployment `dpl_3cBVwwECDa1buE6FWkC3ZQaJVJ7N`. DNS records were set in Namecheap by the assistant with user approval; see README "Domains".


## Images, coverage round 3 and Threshold reviews (November 8, evening)

- **Current totals:** 66 places, 285 active notes, 3 firsthand Threshold reviews, 48 freely licensed photos, 14 labeled AI venue images and 4 places with category art.
- **Content expansion merged.** PR #2 (eight guides plus three TQL notes from a parallel session) was reviewed against live sources, fast-forwarded and deployed.
- **Photos.** Wikimedia Commons and Flickr (found through Openverse) photos, each license confirmed on its source page. Rejected: same-name places elsewhere, outdated vehicles and a pre-renovation Levee photo.
- **AI venue images.** 14 places with no free photo have labeled AI images; method in [research/ai-venue-images.md](research/ai-venue-images.md). Each is generated from a text description of a reference photo, compared with it, and cropped above ground level after a pilot showed the generator inventing step-free entrances.
- **Coverage round 3:** Ark Encounter, Kings Island, Krohn Conservatory, Reds Hall of Fame, Devou Park, and the Kenton County Erlanger and Independence branches (33 notes). Every quote was re-matched against a fresh fetch. Skipped: Hard Rock Casino (no access content), EnterTrainment Junction (site broken), Behringer-Crawford (blocks scripts) and Campbell County libraries (no building details).
- **Threshold reviews.** Co-owner Matthew Brothers' firsthand reports for Bogart's, Riverbend and TQL Stadium are published under his name in their own section ([DECISIONS §11](DECISIONS.md)). They are surfaced on the homepage and on `/updates`.
- **Source monitor.** 87 sources checked. Two routine page changes were reviewed and the notes are still supported; 3 sources block scripts (Newport Aquarium, IMAX, Molly Malone's) and need a browser.
- **Validation.** 64 unit tests, 40 browser tests (now including the new venue pages) and the production build.
- **Later the same evening:** added five Cincinnati public spaces from city and 3CDC pages: Smale Riverfront Park, Eden Park, Ault Park, Washington Park and Fountain Square (23 notes, all 39 quotes and addresses re-matched). Notes drawn from the July 2020 Cincinnati Parks article carry that publication date. No source says any of their restrooms is accessible, so the notes say that is not stated. Free photos were added for all five, and labeled AI images for the two Kenton County branches. Six missing addresses were filled from official pages; three wrong candidates were rejected (a City Hall footer, garage addresses and an arts-office address). Behringer-Crawford was read in Chrome but still has no building access details; NewportOnTheLevee blocks scripts; the World Peace Bell is in storage. Totals: 71 places, 308 active notes, 53 photos, 16 AI images, 2 category-art places.


## Breadth and depth expansion (November 8, night)

- **Breadth: 16 new places**, 9 in Cincinnati and 7 in the suburbs: Andrew J Brady Music Center, Children's Theatre at the Emery, Cincinnati Ballet Center for Dance, Nippert Stadium, Fifth Third Arena, Everybody's Treehouse, Bettman Nature Preserve, Burnet Woods, Jungle Jim's (Fairfield), Great Wolf Lodge, Fitton Center, Kenwood Towne Centre (new Shopping category), Voice of America MetroPark, Heritage Village Museum, BCRTA/BCARE paratransit and the Ohio Renaissance Festival. All 116 quotes and addresses were re-matched against fresh fetches by Threshold. Ten have free Commons photos.
- **Depth: 72 notes added to 26 thin listings**, curated from 136 verified candidates. Kept accessibility contacts, standing-only and no-re-entry rules, banned items (such as chairs and unlabeled prescriptions), trails labeled Not Accessible, restroom locations, homebound and mail services, and drive-thrus. Dropped trivia such as sanitizer stations, square footage and general phone lines. Notes that combined two pages were split so each cites its own page.
- **Judgment calls:** Jungle Jim's is filed under Food & drink. The treehouse listing says the city's pages disagree about whether it is open. The ballet listing covers only the building, since its audio description and interpreting refer to other theaters. Renaissance Festival notes say its guide's author works with the festival.
- **Threshold reviews:** Matthew Brothers added Cincinnati Shakespeare Company (parking near Washington Park, balcony seating with its own accessible restroom). His parking observation was also added to his Memorial Hall review.
- **Totals:** 88 places, 446 active notes, 6 Threshold reviews, 42 visitor reports.
- **Still thin:** Go Bananas, AMC Newport and Southgate House publish almost nothing about physical access.
- **Later:** added 7 Northern Kentucky places: NKU Fine Arts Center, Middleton-Mills Park, Giles Conrad Park, Central Park & Boone County Arboretum, Licking River Greenway, the Campbell County Library's Newport branch, and Boone County's Chapin Memorial Library. All 41 quotes were re-matched. Turfway Park was skipped because its only notes are about smoking. Also added 9 more verified visitor reports for Taft Theatre, Music Hall, Krohn, Aronoff, the Renaissance Festival and Brady Music Center. Tripadvisor reviews were checked in a browser, and one wrong date from the research pass was corrected. Fixed a draft caveat to match the Taft's own statement that it has no elevator. The source monitor now covers 149 sources.
