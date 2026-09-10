# Public-source directory slice

## User outcome

A visitor searches local places, filters by area/type/information needs, opens a place, reads sourced details and limitations, and follows the official venue guidance without an account.

## Acceptance criteria

- At least 30 sourced places across both Kentucky and Ohio; each fact links to an inspected primary source.
- Each listing separates the source-check date from unknown visit/observation dates.
- Search and filters combine correctly; empty results offer a recovery link.
- Unknown domains remain unknown; no generated audit, authorship, ratings or venue imagery.
- Public pages render without the inactive Supabase project; disabled contribution routes redirect cleanly and do not initiate auth networking.
- Build, type checks, existing relevant unit tests, catalog evidence tests, route smoke tests and automated access checks pass.
- Responsive visuals and keyboard search/navigation receive direct review.

## Scope boundary

This slice implements the reviewable directory and staging pipeline. It does not claim to complete the six-week program, database restoration, live RLS verification, field audits, reviewer recruitment, organization authority checks, terms, privacy review, or production approval.
