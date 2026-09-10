# Threshold implementation status

Updated 2026-09-10. This is the current execution record; the older plans' completion labels are historical and do not establish current readiness.

## Outcome and scope

The local read-only directory is implemented and validated with 32 places and 106 sourced facts across Northern Kentucky and Greater Cincinnati. A protected Vercel preview is READY and has been checked in Chrome; production publication awaits user approval. The full six-week program remains unfinished, including community accounts, database authorization, organization claims and field reviews.

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
| Security and community workflows | Gated | Accounts, uploads, claims and publication need tested authorization, moderation and attribution. No successful database-policy test has been recorded here. |
| ThresholdAccess database | Blocked for live reactivation | Coordinating agent observed the project is inactive. Reported alternatives involve paying for capacity or pausing an unrelated service; these require the user's decision. No such action is authorized by this document. |
| Build and browser validation | Passed for local scope | Build: 46 routes; 22 unit tests; 10 browser tests; type and lint checks pass, with 16 legacy lint warnings. Dependency audit reports zero findings. Details and limits below. |
| Preview and production release | Preview READY; production approval pending | [Release record](RELEASE-2026-09-10.md) identifies commit, preview, live checks and rollback. Chrome search/detail navigation and authenticated HTTP checks passed. Preview requires Vercel sign-in. Production remains on the previous deployment. |
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
| 1 | Engineering + research | Local directory and checks complete. Preview review and release evidence complete; obtain production approval and verify the live production release. User decides any service-capacity changes separately. |
| 2 | Data steward + engineering | Add per-fact IDs, source type, retrieval/publication/observation dates, attribution history and review status. Deduplicate candidate imports; refresh a small sample and verify changes reach the interface. |
| 3 | Engineering + security reviewer | Establish minimal grants, row policies, protected roles and private pending uploads. Exercise signed-out, user A, user B and moderator access, including denied writes, ownership changes and draft visibility. Enable community workflows only after evidence passes. |
| 4 | Editorial lead + actual visitors | Recruit willing local reviewers and conduct a small pilot across mobility, sensory, cognitive and chronic-illness needs. Capture dated observations, measurements where relevant, photo rights and authors' approvals. Reconcile contradictions without erasing history. |
| 5 | Research + moderation | Expand everyday coverage beyond attractions: restaurants, groceries, libraries, parks, transit and public services across both states. Trial organization claims with location-specific authority review and a dispute path. |
| 6 | Engineering + editorial + user | Test the complete contribution-to-publication flow, conduct assistive-technology user testing, review source freshness and correction handling, and approve the next release scope using recorded evidence. |

## Measures and handoff

Baseline for the local directory is 32 places and 106 facts; the separate staging sample has 25 unreviewed identities and zero accessibility facts. Track published sourced venues, fact coverage by domain/geography, unsupported claims removed, overdue source reviews, unresolved contradictions, and correction turnaround. Track completed field reviews separately from public-web records. Set targets after establishing a baseline; do not manufacture review counts, community participation or outcomes.

Before the next operator proceeds, update the work ledger with finished changes and validation evidence. Preserve the original plans as history and use [DECISIONS.md](DECISIONS.md) for the revised operating rules.
