# Adversarial information-accuracy review — November 12, 2026

Reviewed catalog commit `d7b2ce0477dded6015dee7c7dcae4e44c4630c8e` (140 venues,
1,217 active notes). This includes the latest queued batch; it is not a statement
that this commit is deployed. The review found weaknesses in evidence assurance,
plus one specific wording overstatement. It did not establish widespread false
venue information. Passing software tests cannot establish information accuracy.

## Findings, highest priority first

### 1. High: a failed evidence check returned success; empty evidence passed

`scripts/research/verify.py` printed a failure and wrote `verified: false`, but
terminated successfully. It also treated an empty/whitespace quote as a match.
A controlled source containing “The entrance has stairs.” accepted an empty
passage, rejected “There is a ramp.”, and still completed successfully. This
means a caller relying on the command's exit status could advance failed work.
The add/recheck helpers also do not consume the verified output as a prerequisite;
a writer can assign `source_checked` without a machine-verified receipt.

**Fixed locally in this review:** reject blank passages and error text; exit 1
when any passage fails. Regression tests cover missing, blank and matching text.
**Remaining:** require a verified receipt bound to exact note text, URL, passage
and date at import/recheck. A passage match alone cannot establish entailment.
The verifier's curl fallback still lacks the monitor's HTTP-status/final-URL
validation; unify these transports in a subsequent focused change.

### 2. High: the monitor can certify only part of a compound note

The monitor marks a changed source `supported` when the single stored passage for
each note is still present. Several notes contain independently changeable claims
not covered by that passage. Examples:

- `taft-museum-of-art.mobility.2`: stored passage covers mobility aids, not limited
  free parking.
- `taft-museum-of-art.mobility.3`: stored passage covers Segways, not the garage
  opening 15 minutes early.
- `taft-museum-of-art.sensory.3`: stored passage covers certification, not flash rules.
- `tank-transit-authority-of-northern-kentucky.mobility.12`: stored passage is one
  stop name, while the note names three stops.
- `kenton-county-public-library-latonia-branch.cognitive.3`: stored passage covers
  November 13, not the separately listed Thanksgiving closures.

These are evidence-coverage defects, not findings that those other claims are
false. Fresh Taft visitor information supports the parking/opening details.
However, a later change to the uncovered clause could be silently classified as
supported. Split independent claims or retain and check every supporting passage.
Recheck the *whole* note before refreshing its date/status. A long unrelated quote
or a matching short keyword is insufficient.

### 3. Medium: 425 active notes lack retained supporting passages

The catalog-wide baseline inventory found 792 of 1,217 notes with stored quotes;
425 (34.9%) have none: 251 last retrieved November 8 and 174 November 9. All active
notes were `source_checked`. This is a legacy backfill gap, not evidence that all
425 are inaccurate. Their source URLs remain present, and changed pages without
quotes retain whole-page review behavior. Nevertheless the audit trail cannot
reconstruct the specific support for these summaries. Prioritize routes, changing
facilities, assistance limits, admission, transport and seasonal restrictions.
The machine-readable receipt lists every affected ID.

### 4. Medium: ASL advance-notice wording exceeded the cited source

`cincinnati-art-museum.sensory.2` said to request either ASL or CART at least two
weeks ahead. The current official page explicitly attaches the two-week period to
CART; its ASL paragraph directs visitors to request the service without stating
that deadline. A common deadline for both was an editorial inference.

**Corrected locally:** separate the arrangements, attach two weeks to CART, and
retain the full matched supporting passage. This is a partial note correction;
the museum's whole-listing review date was not advanced.

Source: https://www.cincinnatiartmuseum.org/visit/accessibility-resources/

### 5. Medium: operational claims share the generic 180-day freshness window

`src/lib/catalog.ts` uses 180 days for every note. Short-lived information such as
closure dates, event times, fares, construction diversions and collection policies
can remain uncautioned long after they become irrelevant or change. Many recent
notes correctly name the season/year and say to check, which reduces this risk;
it does not provide automatic expiry. The weekly monitor opens editorial issues
but does not change public statuses. There were no open issues at review time.
Use explicit validity dates/recheck intervals for volatile claims, while preserving
historical notes and their scope. This is a design risk, not a claim that an
identified expired item is currently presented as operational.

## Targeted verification and challenges that did not establish an error

A fresh automated sweep fetched 63 source URLs associated with 202 active notes
across 17 selected venues. 113 stored passages matched; 81 notes had no stored
passage, and eight quoted Aquarium notes could not be checked because its source
returned HTTP 403. No available stored passage in this sample was missing.
A block means unverified by this method, not a false claim or a closed venue.
The receipt records URLs, status, hashes and per-note results. Selection emphasized
arrival, toilets, transit, mobility equipment, recent additions and source conflicts.
This is a targeted review, not a fresh semantic verification of all 1,217 notes.

Official-source manual challenges included Art Museum facilities/requests, Taft
policy, Freedom Center floors/equipment, Vent Haven season, TQL entry/equipment,
Metro eligibility and Pyramid Hill entrance wording. Examples of important
boundaries already handled correctly:

- Pyramid Hill itself calls an entrance wheelchair accessible while also reporting
  a step. The listing's limitations already make that conflict explicit. Do not
  silently resolve it into a verified step-free route.
- The city's Connector page advertises fare-free Access trips within its corridor;
  Metro requires approval and reservations and posts a general fare. The existing
  Connector limitations correctly tell visitors to confirm eligibility/booking.
  The general fare alone does not disprove a specific fare exception.
- Freedom Center's official page really does list restrooms on floors one, three
  and four; the unusual floor numbering was not grounds to invent a correction.
- All 38 photo entries have capture dates and limitations. The two latest photos
  were visually inspected in the preceding session and explicitly labeled 2017
  and 2019. Older images are historical feature/context evidence, not confirmation
  of today's conditions. This review did not re-inspect/relicense every photograph.
  Linked guide limitations live in their descriptions rather than a dedicated field.

Primary references:
https://www.taftmuseum.org/visitor-information/
https://www.pyramidhill.org/visit
https://www.go-metro.com/access-paratransit/
https://www.cincinnati-oh.gov/streetcar/how-to-ride/accessibility/
https://freedomcenter.org/visit/accessibility/
https://www.venthaven.org/frequently-asked-questions
https://www.fccincinnati.com/matchday/accessibility

## Next research priority

Before another large expansion, backfill high-impact legacy evidence and make
compound-note coverage complete. Require explicit editorial comparison of all
clauses, including location, conditions and date, rather than equating a substring
match with verified accuracy. Keep photo date and limits next to the image.
Preserve the twice-daily production-deployment cap. No production deployment was
performed for this review.

## Validation and handoff

The nine research-helper regression tests (including three new quote-gate tests)
and all 86 application unit tests passed after the local corrections. The fresh
ASL/CART supporting passage was matched before the note was changed. No UI code
changed; no new browser/build/full-pipeline pass is asserted for this review.
The pre-fix controlled reproduction used mocked retrieval and performed no
external write. Changes remain local in the main checkout for review/integration;
no commit, push or production deployment is claimed. Preserve these edits when
the hourly workspace next synchronizes; do not reset the main checkout to make
it clean. The hourly runner uses its own worktree and will not automatically
import uncommitted main-checkout corrections.

## Follow-up status

The original local-review handoff above is historical. See
[the implemented accuracy follow-up](accuracy-follow-up-2026-11-12.md) for the
stronger import gates, multiple-passage monitoring and 44-note evidence review.
The generic freshness window and wider legacy evidence backlog remain open.
