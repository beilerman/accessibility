# Threshold decisions

Updated 2026-09-10. Accepted implementation direction for the current recovery and content-population task. The read-only directory and bounded candidate staging are implemented locally; the broader six-week plan remains in progress. Production publication awaits user approval. Items explicitly described as future work are not implemented guarantees.

## 1. Retain the recovered application

Keep Next.js 16 and React 19. The repository already contains the application and supporting code; a migration to Vite would consume effort without resolving the immediate content and trust problems. Make framework-specific changes against the installed documentation as required by `AGENTS.md`.

## 2. Launch with attributed public information

Use official venue pages for initial accessibility facts. Label these as public-source information, even when the source organization owns the website. Reading that website does not establish a verified organization account, a Threshold audit or a firsthand observation.

Replace the mock reviews, fictionalized access details and stock-image presentation commissioned by the March plan. Do not publish prose under Matthew's or anyone else's byline without that person's authorship or explicit approval. Retain original artifacts as history where appropriate.

## 3. Describe features and uncertainty

Organize information by mobility, sensory, cognitive and chronic-illness needs. Give visitors concrete facts and conditions: entrances, available seating, noise tools, advance reservations and restrictions.

Do not infer an individual's experience from a diagnosis, and do not turn information coverage into a global accessibility score. The v1.1 proposed “works / partial / no” persona predictions require a separately designed, reviewed evidence model before use. A source mentioning an elevator does not establish an uninterrupted step-free route or suitability for every mobility device.

Unmentioned is unknown. A negative claim requires evidence just as a positive one does. Source conflicts remain visible.

## 4. Make provenance specific to each fact

The integrated dataset has 106 facts across 32 places (15 Kentucky, 17 Ohio). Every fact carries its own source URL; each listing carries `evidence_type: public_website`, `checked_at: 2026-09-10`, `observed_at: null` and limitations. Source type and date currently apply at listing level, not as independent per-fact observations. Add stable fact identifiers, independent date fields and change history as the data layer develops.

Keep these dates separate:

- **Checked/retrieved:** when Threshold read a source.
- **Published/updated:** when the publisher says the source changed, if supplied.
- **Observed:** when an actual visitor observed the condition, if known.

The current checked date is not a field-visit or reinspection date. A refreshed webpage does not prove an elevator, restroom or accommodation was available that day.

## 5. Evaluate evidence without suppressing contradictions

The Claude v1.1 source-tier idea is useful for identifying provenance; a fixed tier must not automatically decide truth. Evaluate scope, specificity, age, conflicts and evidence quality.

An older audit cannot suppress a newer report of an out-of-service entrance or lift. Present the conflict and dates, request follow-up and maintain the prior record. Neither a photograph nor repeated copies of the same claim establishes independent consensus. A photograph may support a narrow visible feature; it does not prove measurements, continuous access, opening hours or current operation.

## 6. Verify organization authority per location

An email-domain match is one signal, not automatic authority to control a listing. Chains, franchises, contractors, shared domains and buildings with multiple tenants require location-specific authorization.

Future claim processing needs a recorded reviewer decision, claimed location, supporting authority, scoped permissions, expiry/recheck and a dispute/revocation path. Organization updates retain their provenance and do not overwrite independent observations merely because an account is approved.

## 7. Keep the initial directory read-only

The implemented local directory provides public discovery without relying on the inactive ThresholdAccess database. Accounts, profile collection, organization claims, photo uploads and submissions remain unavailable until their access model and moderation are validated.

This mode is a deployment gate, not a substitute for database security. Re-enabling old routes or credentials requires reviewing the underlying policies first. Apply least-privilege grants and row access rules; test both allowed and denied operations and protect moderator/editor roles from user modification. Official [Supabase RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security) explains the separate roles of grants and policies.

No paid upgrade, unrelated-project pause or account change is authorized by this decision.

## 8. Stage expansion before publication

The implemented Overture pipeline preserves release, retrieval time, feature IDs, upstream sources, source filenames and a run manifest. Its eight tests and actual 25-record remote sample passed; see [verification evidence](../pipeline/verification/remote-sample-2026-09-10.json). The sample is capped and remains staging-only, with empty accessibility facts and no site/database import. A candidate place is not an accessibility fact.

Promotion requires location matching, suitable evidence, rights/attribution review and editorial approval under the eventual workflow. Do not auto-publish bulk candidates or reuse their imagery without checking rights. The initial interface can function without guessed coordinates or a mandatory map.

## 9. Protect evidence and contributors

Publish only relevant venue information. Do not collect diagnosis histories to offer basic filtering. Before accepting visitor photos or reviews, define consent, photo rights, incidental-person handling, moderation, corrections and retention. Keep pending evidence private until reviewed. Public excerpts should summarize relevant facts with links, not reproduce source pages.

## 10. Treat testing as evidence with limits

Record actual commands, results, browser routes and manual checks. Do not inherit “completed” status from an old plan, claim a pass from test-file existence or describe an automated scan as proof of full accessibility compliance. [Playwright's accessibility guidance](https://playwright.dev/docs/accessibility-testing) explicitly recommends combining automated tests with manual assessment and inclusive user testing.

Include keyboard and focus behavior, responsive presentation, zoom, contrast and assistive-technology review. Test the needs discovery flow and visible caveats, not only component rendering. Publish a release only after its final state is inspected and the applicable user approval is obtained.

## Plan references

- [Original Claude Threshold v1.1](PLAN.md): preserved verbatim after download from the [Claude artifact](https://claude.ai/cowork/cse_013pQ93PyPT65RBRxNqzjzwt?artifact=18419720-bc48-4c87-9773-5e398c8a0dfa). The original remains a draft plan; this decision record explains implementation departures.
- [March foundation plan](plans/2026-03-22-001-feat-accessibility-review-site-plan.md) and [auth follow-up](plans/2026-03-22-002-feat-auth-maps-a11y-tests-plan.md): retained historical implementation context. Decisions above supersede conflicting instructions to publish mock evidence, use global ratings or infer compliance from automated tools.
- [Implementation status](IMPLEMENTATION-STATUS.md): current evidence, dependencies and six-week backlog.

