# Newport Aquarium: visual guides and full source recheck

November 10, 2026. Bounded hourly batch; local content prepared for the runner.
No private correspondence was read, no Git writes or deployment performed.

## Official visual guides

The current [official accessibility page](https://www.newportaquarium.com/Plan-Your-Visit/Accessibility)
links both guides below. The HTML page and both Widen landing pages returned HTTP
200 with Python urllib's default user agent. Original PDFs were downloaded via the
landing pages' Download links, also HTTP 200, and opened with PyMuPDF. Both complete
one-page documents were rendered and visually inspected. The photographs show the
Aquarium entrance and Levee garage features alongside illustrated car/home symbols;
the guides are mixed photo checklists, not standalone venue photographs.

| Guide | Original publisher link | Pages | Bytes | Visible relevant features |
| --- | --- | --- | --- | --- |
| Going to the Aquarium | https://hfe.widen.net/s/8rvlhx5dtr/going-to-newport-aquarium-visual-support-document | 1 | 3,206,835 | Garage, elevator beside stairs, aquarium entrance, security checks, ticket counter and elevator/escalator to exhibits |
| Leaving the Aquarium | https://hfe.widen.net/s/fpcjg8plbx/leaving-newport-aquarium-visual-support-document-1 | 1 | 2,109,159 | Exit doors, courtyard crossing, elevator beside stairs |

PDF creation and modification metadata for both files is February 18, 2020. There
is no visible issue date; photo dates are unknown. The manifest explicitly identifies
the date as PDF metadata. The arrival PDF SHA-256 is
`b7e4f4847e6aa016aea887ce361d65e7ea808a69f5f444ffe833342ff999ab59`;
the departure PDF SHA-256 is
`ef79271b7305c3f555c6607386ed5c8709a356ab8e7a913b1cdbf3d6ce3d78c7`.

No reuse licence was established. Only the original publisher links were added to
`src/data/access-guides.json`; no image was copied into public assets. Do not infer
continuous step-free access, lift operation or present-day screening procedures from
these historical views. The linked arrival guide includes people at the bag check;
no individual image or personal detail was republished.

## Notes and evidence

All seven existing notes were read against the freshly fetched official accessibility
page. Supporting passages for every clause were normalized with `quote_text()` and
matched against a second fresh HTTP 200 fetch using the default urllib user agent.
Eight supporting passages (seven existing notes and the new note) are now stored in
`pipeline/evidence/quotes.json`.

- Retained all permanent IDs and prior histories. All seven existing notes now have
  November 10 retrieved dates and recheck histories. The full listing checked date
  advances from November 8 to November 10 because all active notes were reviewed.
- Revised `newport-aquarium.chronic.1` to include required in-person ticket-window
  pickup by the visitor and paid attendant, and documentation of attendant status.
  This qualifies the prior ticket summary; it does not establish eligibility.
- Added `newport-aquarium.mobility.4`: published garage parking-space locations,
  elevator to plaza (PL) level, and east-side plaza entrance. These are published
  directions, not a Threshold route inspection.
- Added two original guide links. No new venue, licensed photo or firsthand review.

The source monitor's `ThresholdSourceCheck/1.0` user agent receives HTTP 403 on the
same HTML URL. Its `--only` run therefore retains the existing source baseline and
adds an accurate `blocked` finding; other URLs and findings are unchanged. This
retrieval limitation does not erase the successful default-agent fetches, and must
not be described as an automated-monitor confirmation. AMC's six held notes remain
unchanged. No open GitHub Source monitor issues were returned during this pass.

## Validation and next work

43 unit tests and 37 pipeline tests pass, along with TypeScript, lint, production
build and `git diff --check`. The plain system Python lacked DuckDB; rerunning with
the existing pipeline virtual environment passed all 37 tests. The build retains
the existing Atkinson font-fallback warning. No application code changed.

Chromium cannot launch in this managed session (`bootstrap_check_in` / Mach port
permission denied). All 80 Playwright tests failed at browser launch; the supplemental layout capture
also could not exercise a page. Browser-control fallback also reported its host unavailable.
No browser or site-layout pass is claimed; the runner must complete its browser suite.
The two source PDF pages were visually inspected successfully. Research downloads
and rendered guide pages are temporary under `/tmp/threshold-aquarium/`.

Weekly full-review progress is now two of eight: Brady and Newport Aquarium.
AMC remains partial. Next, fully recheck Ark Encounter (then Aronoff) using the queue,
retaining blocked-source boundaries. In the next media round, seek licensed Northern
Kentucky entrance/threshold or parking-to-door photos; inspect Aquarium's separate
Rules visual guide if useful. New everyday-place coverage remains a separate upcoming
batch, with BCM/NaturePlay still an unverified lead rather than a published listing.
