# Ark Encounter: full recheck and access photograph — November 11, 2026

Prepared in the dedicated automation workspace for runner validation; no Git writes
or deployment by this session. No unfinished edits or conflict markers were present.
The previous summary in latest.json referred to the Aquarium batch; section 16 of
the handoff records the subsequent environment repair. No open Source monitor issues
were returned by the GitHub issue query this session.

## Official evidence

https://arkencounter.com/accessibility/ returned HTTP 200 on two independent direct
fetches. Every stored passage was normalized with pipeline/check_sources.py's
quote_text and matched against the second fresh fetch before edits. All nine existing
notes remain supported; all nine now have stored quotes and rechecked history. The
listing checked_at advances from November 8 to November 11. This is a website review,
not a visit or confirmation that equipment is operating.

Five additions: mobility.5 (first entrance automatic door), mobility.6 (rental pickup
relative to the bus drop-off), sensory.4 (Deck 2 air effects, sounds, mirrors and jump
scare), sensory.5 (outside Christmas show flashing lights), sensory.6 (descriptive
audio on the visitor's device). The sensory.1 revision adds name/phone borrowing,
return-before-departure and no-reservation conditions. Permanent IDs and original
history are preserved. Other venues are unchanged. Longer stored passages for existing
multi-topic notes intentionally span all supporting sections on the single page.

The monitor-agent fresh fetch also returned HTTP 200. Refreshed only this URL in
pipeline/source-checks/2026-11-11.json; previous unselected baselines/findings retained.

## Licensed photograph

- Source: https://commons.wikimedia.org/wiki/File:Ark_Encounter_004.jpg
- Author: Cimerondagert; own work. Photo date: May 2, 2019.
- Licence: CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/.
- Commons source page freshly inspected through web retrieval. Its API returned
  HTTP 403; metadata was verified on the description page instead.
- Downloaded only after licence confirmation, HTTP 200:
  https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ark_Encounter_004.jpg/1280px-Ark_Encounter_004.jpg
- 1280 × 960 JPEG SHA-256:
  9441659b119831f693ba3f398b01444de4e2322145d87e4748da6b6caa683b8c
- Published WebP SHA-256:
  0412196a1b4202b49240af57482fd604ffbd866202f9083d7313ef257200b6f7

Both source and final WebP visually inspected. The full frame shows the Ark exterior,
a raised wooden ramp structure and railings, and benches beside the lower paved
walkway. No identifiable incidental people were observed. The ramp walking surface,
doorway and parking connections are outside this view; no slope, dimensions,
continuous route or current condition is established. No scene elements were altered.
The caption records resizing/conversion. Manifest includes author, licence, date,
check date, full-frame alt text and limits, with the existing mobility.1 note linked.

The official maps page also returned HTTP 200 and links to
https://assets.arkencounter.com/img/art/maps/2604_Map_Accessibility.pdf.
This is a follow-up map lead, not a photo walkthrough verified in this batch; its
PDF was not downloaded or inspected, and no guide entry is being published for it.
No reuse licence established for official site images; none copied.

## Validation and outcome

43 unit tests, 39 pipeline tests, TypeScript, lint and production build passed.
Existing build warning: Atkinson Hyperlegible Next fallback font values unavailable.
Python checks used uv with Python 3.11 and pipeline/requirements.txt; UV_CACHE_DIR
was set to /tmp/threshold-uv-cache because the default cache was not writable.

Playwright: attempted all 80 tests with one worker and max-failures=1. Chromium
failed at launch with macOS bootstrap_check_in Mach-port Permission denied (1100).
One launch failure; 79 tests not run. No page was exercised and no site screenshot
is claimed. Runner must pass the full browser suite before pushing. The final image
itself was visually inspected. No framework, component or layout code changed.

Catalog now: 101 venues, 713 active notes, 134 stored quotes, four licensed access
photos, six guide links. This batch: zero venues, five new notes, one revised note,
one full recheck, zero partial rechecks, one licensed photograph, zero linked guides.
Weekly full rechecks: 3/8 (Brady, Newport Aquarium, Ark Encounter). AMC's six blocked
notes remain held, and BCM/NaturePlay remains an unverified coverage lead.
