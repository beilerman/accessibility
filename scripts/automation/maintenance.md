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
stopped by Brad. Brad's current direction is to go broad and deep. Read
docs/research/coverage-queue.md and use it to choose the next substantive work.

Accuracy comes first after the November 12 adversarial review. Read
docs/research/adversarial-accuracy-2026-11-12.md and its accuracy follow-up.
Address high-impact missing or incomplete evidence alongside venue expansion.
Do not spend every pass only revisiting blocked sources. Backfill arrival/entrance, toilets/changing,
transport eligibility/booking, assistance limits and seasonal restrictions.
For every note, compare every clause with the current source, including scope,
conditions and date. A matching passage alone does not prove the summary.
Compound notes can pass a list of separate quotes to the research helpers;
retain support for every independently changeable claim. The helpers now
re-fetch and reject blank, missing, blocked or unextractable evidence before
saving source_checked data. Do not bypass a failed gate by editing the JSON to
claim verification. Preserve blocked sources as unresolved and distinguish
historical information from current arrangements. Report evidence backfill and
corrections separately from new-note growth. Continue access-photo research.

Brad requested more venues and discovery through message boards and Reddit on
November 13. Make this a recurring breadth lane: search public r/cincinnati,
r/covington, Northern Kentucky and local-interest discussions, Tripadvisor forums,
public message boards and specialist visitor accounts for concrete venue leads
and barriers. Investigate multiple new venues each pass where evidence allows;
use docs/research/community-venue-discovery-2026-11-13.json as the starting queue.
Follow promising names to current official location, visit and service sources.
Add supported listings rather than treating community recommendations as an
accessibility certification. Retain useful reports in visitor-reports-community.json
with original links, source identity, publication/visit-date uncertainty and caveats;
never merge them into venue_official facts. Preserve conflicting accounts and
distinguish conjecture from an actual reported visit. Omit unnecessary personal
health details and usernames. Never copy unsafe lifting advice, assume legal
compliance, or reuse forum photos without checking rights. Read public material
only: do not join private groups, post questions or send messages. Search snippets
are leads until the underlying discussion is read. Continue photographs alongside
new listings and needed corrections; no unsupported quota or fabricated gaps.

Use the available 45-minute research period to investigate several venues and
sources. Carry a useful batch through evidence review, then continue with additional
supported work while time remains. Pursue breadth, depth and access imagery together.
Investigate two to four venues when the evidence and time support it. Publish all
sound progress and preserve unfinished leads for the next pass.

For breadth, seek underrepresented everyday activities, neighborhoods and types of
places across Northern Kentucky and Greater Cincinnati. The queue identifies the
current category imbalance. Prioritize concrete new access information for shopping,
groceries, food venues, recreation, public services and transport alongside cultural
destinations. Build new listings from attributable location and access evidence.

For depth, seek precise arrival routes, entrance choices, thresholds and door controls,
elevator locations, seating and companion arrangements, toilet and changing facilities,
quiet spaces, lighting/noise conditions, communication supports, equipment procedures,
advance notice and seasonal restrictions. Investigate the gaps in thin existing
listings. Preserve and explain source conflicts. Unknown remains unknown.

For imagery, actively search for access-relevant photographs and official visual
walkthroughs during each substantive batch. Seek entrances, ramps, parking-to-door
connections, lifts, toilets, changing facilities, seating and quiet spaces. Visually
inspect both helpful features and barriers. Photos remain useful with clear capture
dates and narrow descriptions of what they show.

Brad renewed the deep-photo priority on November 12. Give photo research substantial
time in each cycle: inspect several candidate views, follow Commons categories and
photographer albums, search official social narratives/visual guides, and record
specific useful views and remaining gaps. Do not stop at a decorative exterior.

Resume all unfinished edits already in this automation workspace. Resolve any conflict
markers while preserving newer public work and supported pending evidence. The runner
records recovery patches and stages resolutions after your review. Diagnose and fix
prior validation failures before expanding an unfinished batch. Address urgent source
corrections, and continue the eight full rolling venue rechecks each week alongside
growth. Record new public information, new venue coverage and freshness work separately
in the run report so progress is clear.

For photos, search reusable sources such as Wikimedia Commons and official visual
guides. Republish a photograph only when its licence permits reuse. Visually inspect
every candidate to confirm the location and the feature actually visible. Retain the
full frame, truthful alt text, source, author, licence, photo date if known, check date,
and specific limits. Publish licensed photographs through src/data/access-photos.json
and public/images/access/. Keep documentary photographs unaltered apart from faithful
full-frame resizing/format conversion. Brad permits AI recreations of copyrighted
reference photos for illustration. Such work must be clearly labeled AI-generated,
retain its reference link/date and known differences, and remain separate from the
licensed access-photo evidence collection. Use the existing AI venue/context or
generic illustration conventions. An AI recreation cannot verify a doorway, ramp,
toilet, dimension, continuous route or current condition; never fabricate, repair or
remove a barrier to make a venue seem accessible. Prefer useful real photos and
original linked walkthroughs when available. Do not imply that changing a photo with
AI establishes permission, a licence or factual accuracy.
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
to the runner. Update the coverage queue and handoff with actual progress, unresolved gaps and the next concrete batch.

Mark publish_ready true only after reviewing all edits and evidence for the runner's
test suite and Git push. Summarize added venues, new notes, fully/partly rechecked venues,
licensed photos, linked guides and held findings. If no supported change is ready,
mark publish_ready false. The runner handles commits and atomic pushes to both branches.
Only the dedicated release job deploys to Vercel, at 9 a.m. and 5 p.m. Eastern and at
most twice per Eastern day. Do not deploy, create previews, change hosting settings,
send messages, read private correspondence, modify the database or start community features.
