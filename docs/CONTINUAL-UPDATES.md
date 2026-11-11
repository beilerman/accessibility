# Continual Threshold updates

Brad requested continual work on the breadth and depth of collected and displayed
access information, with particular interest in photographs relevant to access.

## Operating schedule

The Mac job local.threshold.maintain starts at login and every hour thereafter.
Each pass works on a bounded batch for up to 45 minutes, followed by validation.
Passes never overlap. The process continues until Brad stops it.

Priorities are source corrections, licensed access photographs, official photo
walkthroughs, deeper venue notes and new venues with adequate evidence. The weekly
rolling source recheck continues alongside expansion. Each pass records the next
concrete tasks in the project handoff.

Vercel release checks remain at 9 a.m. and 5 p.m. Eastern, with at most two
deployments per Eastern calendar day. Releases use the exact public commit that
passed GitHub CI. The release job uses an isolated checkout, so pending research
and independent work in the main checkout can be preserved during a release.

## Files and recovery

The versioned runner, research prompt and output schema are in scripts/automation/.
macOS runs the versioned runner from the main Threshold checkout.

Runtime state is under ~/Library/Application Support/Threshold Updates/.
The workspace/ checkout belongs to this process. Research continues there after
an interruption or validation failure. Before reconciling it with newer public
work, the runner records a recovery patch that includes new files and binary photos.
The research pass resolves any conflict and reviews all pending edits. The runner
validates the complete batch before committing and atomically pushing both
publication branches.

latest.json records the current phase, last summary, errors, pending work and log path.
runs/ contains per-pass prompts, reports, command logs and recovery patches.
maintain.log records the scheduler's summaries and failures. release.log records
release checks and visible verification. A failed pass retains its work and retries
on the next hourly cycle.

The main checkout is fast-forwarded after a successful push when its working tree
is clean and its branch permits a fast-forward. Independent changes are preserved.
The release job checks the current public commit in its own temporary checkout.

## Local operation

These are local macOS jobs. The Mac must be awake and Brad must be logged in
for work to run. A login starts a new pass. A scheduled pass missed during sleep
runs according to macOS launchd timing after wake.

To inspect progress, read latest.json and the log file it names.
To trigger an idle pass, run launchctl kickstart gui/501/local.threshold.maintain.
To stop continual research, run launchctl bootout gui/501/local.threshold.maintain.
To restore it, run launchctl bootstrap gui/501 ~/Library/LaunchAgents/local.threshold.maintain.plist.

The release job is separate. Stopping research leaves the two scheduled release
checks registered.
