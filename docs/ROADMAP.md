# Threshold roadmap

Written November 10, 2026, after a review of the architecture, the design and the update process. This is the current forward plan. It replaces the six-week schedules in `PLAN.md` (the September draft, kept as history) and in `IMPLEMENTATION-STATUS.md` (kept as the record of what was done). `DECISIONS.md` still governs how content is handled.

## What Threshold is today

Threshold is a read-only, source-linked directory: 101 places, 699 active notes, 8 firsthand reviews by Matthew Brothers and 51 visitor reports. It is not yet the community product the September plan described (accounts, organization claims, field audits, persona filters, a map).

| Layer | How it works now |
|---|---|
| Data | JSON files in `src/data/`. `places.json` holds every place and note with its ID, source, dates, status and history. Reviews, visitor reports and image credits are separate files. |
| Site | Next.js 16, statically generated. Place pages re-render daily so overdue cautions appear without a deploy. The directory and visitor-report pages render per request and work without JavaScript. |
| Database | Supabase holds only the legacy community tables. The site has no database code. |
| Updates | Research agents propose notes with verbatim quotes; scripts re-fetch and verify each quote; an editor writes the note; scripts append it. |
| Monitoring | `pipeline/check_sources.py` runs weekly in GitHub Actions and opens an issue when sources change. |
| Release | Production is deployed by CLI from the working tree, at most twice a day. |

The trust model is the strongest part: per-note provenance, append-only history, retired notes kept, unknown stays unknown, firsthand reviews kept apart from website notes. Nothing below changes it.

## Review findings and what was fixed on November 10

| # | Finding | Status |
|---|---|---|
| 1 | **82 of 231 source pages were never monitored.** The snapshot was last committed on November 8; every source added on November 9 had no baseline, and a source with no baseline can never report a change. | Fixed. `check_sources.py --new-only` baselines new sources; a pipeline test now fails CI if any active source lacks a baseline. |
| 2 | **The monitor is too noisy to act on.** One day after the baseline it reported 22 of 149 pages changed (issue #3, still open). It hashes whole pages, so library hours or an events list count as a change. Nobody triaged the issue and the handoff did not mention it. | Fixed going forward. Notes can now carry their verified supporting quote (`pipeline/evidence/quotes.json`). A changed page whose quotes are all still present reports `SUPPORTED`; a missing quote reports `QUOTE_MISSING` with the exact note IDs. Existing notes have no stored quote yet; the rolling recheck below fills them in. |
| 3 | **All notes fall due at once.** 463 notes were read on November 8 and 236 on November 9, so every note shows a recheck caution on May 7–8, 2027 unless the whole catalog is re-read that week. | Process fixed: `queue.py recheck` and `recheck.py` support a rolling recheck. The rechecking itself is work item 2 below. |
| 4 | **CI on `master` failed for the commit that is live**, and for an earlier one. The keyboard test clicked the mobile menu before the page hydrated; under load it failed about half the time (14 of 25 runs). | Fixed: 25 of 25 runs pass. |
| 5 | **Every page shipped the Supabase client** (about 207 KB of JavaScript) though community features are off, which also widened the window in which the menu button does nothing. | Fixed, then removed with the legacy code. |
| 6 | **The proxy ran on every page and image request** only to redirect three account routes. | Fixed, then replaced by three static redirects. |
| 7 | **Image optimizer quota risk.** The Vercel account is shared with other projects and one of them has already exhausted the optimizer quota. The default 4-hour cache re-transforms every image size many times a month. | Reduced: 31-day cache and fewer generated sizes. If a 402 ever appears, switch to pre-sized files and `unoptimized` images. |
| 8 | **Place pages bury the notes.** On a phone the visitor scrolls past the photo, the credit and the review before reaching any access note, with no sense of what the page holds. | Fixed: jump links under the heading show each topic and its note count, plus limits and visitor reports. |
| 9 | **Nothing stopped a bad deploy.** Deploys come from the local tree, so uncommitted, unpushed or CI-failing work could go live. | Fixed: `scripts/release-check.sh`. |
| 10 | **Research helpers threw away the evidence.** Quotes were verified and then discarded, and nothing recorded a recheck except hand edits. | Fixed: `apply_depth.py` and `add_places.py` store quotes and reject duplicates and bad values; `recheck.py` records rechecks; `queue.py` builds the research briefs. |

These fixes were committed as `3c288e2` and deployed on November 10.

**Later the same day:**

- **Issue #3 cleared.** All 99 notes on the 23 flagged sources were re-read against fresh fetches, and every supporting quote was machine-matched. 93 were confirmed and 6 were reworded (Brady Music Center entrances, The Carnegie parking, Southgate House seating, two Taft Theatre notes, Erlanger drive-through). All 99 now have a stored quote, and the monitor reports those pages as `SUPPORTED`.
- **Legacy community code removed** (about 5,400 lines, 29 files, six dependencies). The proxy is gone; old account URLs redirect through `next.config.ts`. Migrations and the authorization tests are kept.

## Findings that need a decision from Brad or Matthew

1. **There is no way to report an error.** No page lists an email address or form. A directory that asks for trust needs a corrections path, and an accessibility statement normally names a contact. Decide the address (a shared inbox is best), then add "Report a problem with this page" to every place page and the footer.
2. **Hosting plan.** Vercel's free plan is for non-commercial use and its limits are shared across all of Brad's projects. Moving Threshold to its own team, or to Pro, removes both the deploy cap and the optimizer risk. Do it before any launch push.

## Operating cadence

This is the update plan. Each session follows it in order.

**Every session**

1. `git status`, pull, and re-read `places.json` if another agent has committed.
2. Check the open "Source monitor" issue. Work `QUOTE_MISSING` and `UNAVAILABLE` first, then `CHANGED`. Record outcomes with `recheck.py`, or revise or retire the note by hand, then close the issue.
3. Check Matthew's messages for new reviews.

**Every week: rolling recheck**

1. `python3 scripts/research/queue.py recheck 8` prints the eight places read longest ago, as research briefs with note IDs.
2. An agent returns a verbatim supporting quote per note ID. `verify.py` checks each quote against a fresh fetch.
3. `python3 scripts/research/recheck.py spec.json` records the recheck and stores the quotes.

Eight places a week covers the catalog in about 13 weeks, inside the 180-day window, and spreads the due dates so they never fall on one day again. It also backfills the stored quotes, so the monitor gets quieter every week. Track progress with `queue.py status`.

**Every content round**

1. Brief with `queue.py brief <slug>…` or `queue.py thin`.
2. Verify, write the notes, and apply them with the quote as the last item of each note.
3. `python3 pipeline/check_sources.py --new-only`, and commit the snapshot. CI fails without it.
4. Add new routes to the browser test list.

**Every release**

1. Commit and push to both branches. Wait for CI on `master`.
2. `sh scripts/release-check.sh`, then `npx vercel --prod --yes`, then append the line it prints to the deploy log.
3. At most two production deploys a day.

## Next work, in order

### 1. Clear issue #3 (done November 10)

### 2. Start the rolling recheck (weekly, from now)

99 of 699 notes have a stored quote so far. Target: every note has a stored quote and a staggered due date by mid-February 2027. Measure with `queue.py status`.

### 3. Corrections path (after decision 1)

A contact link on every place page and in the footer, carrying the place name and note ID. Log each correction in the note history.

### 4. Firsthand reviews as the main growth line

Venue websites are nearly exhausted for the places that publish anything, and everyday places (restaurants, shops, clinics: 5 of 101 listings) publish almost nothing. Firsthand reviews are the only realistic source for them and are what no other site has.

- Allow more than one review per place, and more than one reviewer. The code currently reads one review per place.
- Give Matthew a short structured form (a private page or a shared note template: place, date, entrance, seating, restroom, parking, what went wrong) in place of free-text messages. It removes the message-database parsing and the guessed years.
- Work through his remaining list: GABP, Music Hall, NKU, Heritage Bank Center, The Comet, Taft, AMC Levee, Florence Y'alls, Molly Malone's, Blinkers, Smoke Justis.
- Let a place exist with a firsthand review and no website notes. The Comet, Blinkers and Hard Rock Casino cannot be listed otherwise. This needs a small change to the "every place has a note" rule and to the page wording.

### 5. Make the catalog easier to search

- Add coordinates for each place from its confirmed address (the US Census geocoder is public domain), then a "near me" sort and a simple map. Ten places still lack an address.
- Tag notes with plain features (wheelchair seating, assistive listening, sensory bag, quiet room, companion restroom, paratransit stop). Tags describe what a source says, never whether a place fits a person, so they stay inside `DECISIONS.md` §3.
- Add schema.org place data to place pages for search engines.

### 6. Data file structure (when it starts to hurt)

`places.json` is one 616 KB file edited by scripts and by two agents. Split it into one file per place when the catalog passes about 150 places or the first merge conflict costs real time. The loader and the scripts each have one place to change (`src/lib/catalog.ts`, `scripts/research/_catalog.py`).

### 7. Community launch (not scheduled)

The order stays as in `COMMUNITY-READINESS.md`: rebuild contribution against catalog slugs, storage bucket and upload rules, moderation screen, owner claims, then re-enable sign-ups. Do not start until items 1 to 4 are steady and a corrections inbox has shown how much reader input arrives. Persona "works for me" filters stay out until an evidence model is designed (`DECISIONS.md` §3).

## Small known issues

- Three sources are stored under two spellings (with and without a trailing slash): American Sign Museum `/visit`, Boone County library `/locations`, Metro `/accessibility`. They are fetched twice. Normalize them during the rolling recheck.
- The NKU policies page fails TLS with the system Python, and AMC, Heritage Village, IMAX, Molly Malone's and Newport Aquarium block scripts. All need a browser check each cycle.
- The keyboard test once failed in CI at a different step (focus on the search field after the skip link). It did not reproduce in 60 local runs. Watch for it.
- `IMPLEMENTATION-STATUS.md` has grown into a long diary. Keep adding dated entries, but put plans here.
