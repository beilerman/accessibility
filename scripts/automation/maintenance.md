# Threshold ongoing development and research

Continue developing the depth and breadth of information collected and displayed by
Threshold, with particular priority for photographs relevant to access.
Work exclusively in the dedicated workspace named at the end of this prompt.
Read its AGENTS.md, current handoff, docs/ROADMAP.md and docs/DECISIONS.md.
The runner fetches the two publication branches and prepares this workspace before
starting you. Use read-only Git commands as needed. The runner performs Git writes
after validation. The main checkout is /Users/bradeilerman/Projects/threshold.
Run paths and commands from the dedicated workspace even if handoff examples
use the main checkout. Review the previous summary and phase in
/Users/bradeilerman/Library/Application Support/Threshold Updates/latest.json.

An hourly background job runs this process throughout the day. Continue until
stopped by Brad. Finish one useful, bounded batch each run and leave the next
specific tasks in the handoff. Resume all unfinished edits already in this
automation workspace. If there are merge conflict markers, resolve them while
preserving newer public work and supported pending evidence. The runner records
recovery patches before reconciling changes and stages resolutions after your review.
When a prior batch failed validation, diagnose and fix it before expanding the batch. Address urgent source corrections first,
then rotate among access-photo collection, deeper venue notes and new venue coverage.
Aim for eight full rolling venue rechecks weekly while making new coverage progress.
Prioritize entrances and thresholds, parking-to-door routes, ramps, lifts, seating,
restrooms, changing facilities, quiet spaces and sensory supports. For new venues,
seek underrepresented everyday places and Northern Kentucky coverage where official
sources or approved firsthand records support useful details. Unknown remains unknown.

For photos, search reusable sources such as Wikimedia Commons and official visual
guides. Download a photograph only when its licence permits reuse. Visually inspect
every candidate to confirm the location and the feature actually visible. Retain the
full frame, truthful alt text, source, author, licence, photo date if known, check date,
and specific limits. Publish licensed photographs through src/data/access-photos.json
and public/images/access/. Do not alter ground-level features or generate access imagery.
For official photo guides whose images have no reuse licence, inspect the guide and
add its original link through src/data/access-guides.json, with page count, size,
known version/date and an accurate description. Verify links with a fresh fetch.
Do not treat a webpage screenshot or publicity rendering as a venue photograph.
Avoid identifiable incidental people or private details where possible.

For notes and places, verify supporting passages against fresh official source fetches.
Use the existing research helpers, permanent IDs, history and stored quotes. Broaden
thin listings and add new places when adequate location and access evidence is available.
New listings need the existing route/category test updates and source baselines.
Record partial reviews accurately. Blocked sources stay held for manual review.
Do not refresh a whole venue's checked_at after a partial review.
Review docs/research/access-photos-2026-11-10.md for initial sources and gaps.

Python test environments are provided by the runner outside every Git checkout.
For agent-side Python checks, use uv run --python 3.11 --with-requirements
pipeline/requirements.txt python with the required command. Continue prioritizing
new public-facing access details and imagery alongside freshness checks.

Make safe, in-scope content and application improvements needed to collect and display
verified access information. Reuse the existing data and UI conventions. Add or update
regression tests when needed for a specific new behavior. Read the installed Next.js
documentation before changing framework code. Visually inspect new imagery and
meaningful display changes. Keep notes, photo provenance and facts defensible.
Preserve unrelated public changes. Leave deployment and scheduler administration
to the runner. Update the handoff with actual progress and the next concrete batch.

Mark publish_ready true only after reviewing all edits and evidence for the runner's
test suite and Git push. Summarize added venues, new notes, fully/partly rechecked venues,
licensed photos, linked guides and held findings. If no supported change is ready,
mark publish_ready false. The runner handles commits and atomic pushes to both branches.
Only the dedicated release job deploys to Vercel, at 9 a.m. and 5 p.m. Eastern and at
most twice per Eastern day. Do not deploy, create previews, change hosting settings,
send messages, read private correspondence, modify the database or start community features.
