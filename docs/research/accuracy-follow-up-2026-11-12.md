# Accuracy improvements — November 12, 2026

Follow-up to [the adversarial review](adversarial-accuracy-2026-11-12.md), against
catalog base `d7b2ce0`. This batch improves evidence reliability, not venue counts.

## What changed

- The verifier now uses the source monitor's transport and PDF extraction, with
  HTTP status and final URL checks. Error-page bodies, blocked responses, empty
  evidence, missing text and zero-item batches cannot satisfy the gate. Failure
  returns a nonzero exit status and still writes the diagnostic verified output.
- Add, depth and recheck helpers require nonblank passages and a fresh successful
  response. They verify the passages themselves before saving, so skipping the
  standalone verifier no longer bypasses presence checks. Failed evidence leaves
  both catalog and quote files unsaved. Responses are cached only within the
  importing process, so several notes can share one fresh URL fetch.
- Compound-note evidence accepts a list of passages. The registry preserves the
  original `quote` field and stores others in `additional_quotes`; the monitor
  tests every passage. Newly checked evidence records bind to the exact note text
  and retain the response fingerprint/final URL. CI detects a later unbound edit;
  the changed-page monitor falls back to whole-page review for invalid evidence.
  Legacy records remain readable until deliberately rechecked.
- The Art Museum ASL/CART timing correction from the review is integrated. Pyramid
  Hill's contradictory entrance wording is now explicitly attributed within the
  note itself, with direct confirmation advised. No step-free route is inferred.
- Ongoing research now prioritizes missing/incomplete high-impact evidence before
  large expansion, while continuing access-photo investigation and bounded growth.

## Editorial work and source checks

Re-read all clauses of **44 existing notes**: four full venue reviews (Art Museum
12, CAC 11, Pyramid Hill 7, Taft 12), plus partial reviews of TANK's three-stop
note and Latonia's closure/phone note. The first four total 42; the two partial
checks make 44. Supporting passages are retained in
[the review spec](accuracy-backfill-2026-11-12-spec.json). The helpers freshly
matched every supplied passage before recording the rechecks. The eight selected
source URLs were then refreshed with the monitor: all returned 200 and none
needed attention. Unselected findings were retained.

The 23 previously unquoted notes in those four venues now have evidence. Together
with the earlier Art Museum timing correction, this reduces the original audit's
425 missing passages to **401**. Current totals: 140 venues, 1,217 active notes,
816 quoted notes, 38 access-photo entries and 19 visual-guide entries. No new
photographs or new venue notes were added in this accuracy batch. Original IDs,
existing history prefixes and media are preserved; only full venue reviews
advance whole-listing dates. TANK and Latonia keep their prior full-review dates.

A passage match and note-text fingerprint do not establish semantic correctness,
field conditions or universal suitability. Editors must still compare every
clause, site, restriction and date. Existing compound notes outside this batch
still need evidence-completeness review. The remaining 401 missing records are a
backlog, not a count of demonstrated false statements.

## Validation and publication boundary

Types, lint, 86 unit tests, 70 Python tests and the production build passed.
The browser suite and final publication state are recorded in the handoff.
The unchanged nonfatal Atkinson font fallback warning remains. This is prepared
repository content; no production deployment is part of this follow-up. Keep the
maximum of two Vercel production deployments per Eastern day.

## Next

Prioritize unquoted transit eligibility and assistance limitations, restrooms and
changing facilities, and entrance routes. Continue current, licensed access-photo
research. TANK's stop and Latonia's holiday secondary-clause examples from the
review are now addressed; continue searching for similar compound-note gaps.
Design shorter review intervals/explicit validity windows for volatile information;
the generic 180-day window remains and is not claimed fixed by this batch.
