# Community accounts readiness

Updated September 10, 2026.

The user approved both community reviews and venue-owner accounts, then confirmed the Supabase subscription. The organization API now reports **Pro** for Eilerman Endocrinology (`efdbpwejhdzzwsbknvdt`). A further upgrade or pausing another project is not the current restoration prerequisite.

Restoration was requested for existing ThresholdAccess (`nzwlruornfchbgakwqgo`) and accepted. Open Brain and paddockloop were not paused or modified. Public Threshold remains independent of database startup.

## Implementation findings

These are repository findings, not assertions that the live database exactly matches the checked-in migration.

1. Separate account enablement from legacy content. `COMMUNITY_ENABLED` also re-enables the legacy query layer and sample editorial routes. The sourced catalog must stay authoritative for current place pages; old generated reviews must remain inaccessible.
2. Check and correct grants and row policies. The initial migration permits client-set review publication/editorial fields, editable profile privilege fields, public full-profile reads and unrestricted review-photo inserts. Protect roles and moderation fields; limit profile exposure and photo ownership.
3. Provision profiles reliably. Checked-in SQL lacks a profile creation trigger/INSERT policy; the callback ignores insert errors. Own-pending review reads also need an explicit policy so submission returning an ID succeeds.
4. Map contributions to sourced places. The static catalog uses slugs; legacy forms use venue UUIDs and exclude unreviewed venues. Validate mapping, keep unknown addresses unknown and display reviewed community observations separately from official-source facts.
5. Implement owner claims. Add pending claims, private supporting evidence, a moderator decision, scoped organization membership and attributed owner updates. Domain matching alone does not authorize control of a location.
6. Finish auth integration. Normalize and encode local return paths, verify email confirmation and redirect configuration, and expose Google login only if it is configured. Do not collect unnecessary mobility/diagnostic information.
7. Require verified upload constraints or defer community photos. Pending uploads need private storage, ownership enforcement, MIME/size limits, failure handling, consent and moderation before public display.

## Launch evidence required

Test anonymous access, two ordinary users, a moderator and an approved owner. Verify both allowed and denied reads/writes, protected fields, pending visibility, cross-user isolation and the complete sign-up → pending contribution → moderation → public display flow. Test claim rejection/revocation as well as approval. Retain the source-linked catalog and existing licensed/AI image distinction.

Supabase's [RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security) and [production checklist](https://supabase.com/docs/guides/deployment/going-into-prod) inform these checks. A passing advisor scan alone does not validate application authorization.

## Restore evidence

ThresholdAccess reached `ACTIVE_HEALTHY`. A fresh SQL query succeeded at `2026-09-10 19:32:47 UTC`. The live table inventory returned seven public tables, all with RLS enabled and zero rows reported. Live policy inspection confirms the legacy broad profile reads, unrestricted photo inserts, and author-only review write predicates described above. During restore startup a first query briefly succeeded before connections were refused; verification was repeated successfully only after the project became healthy.

The earlier advisor result returned no lints during startup and is not treated as evidence that application permissions are secure. No schema or content mutations were performed in this restore step. Community functionality remains disabled pending implementation and allowed/denied-operation tests. Public-site HTTP returned 200 during restoration.

## November 8, 2026: authorization layer

**Live state (read-only inspection).** ThresholdAccess holds data: 107 venues, 2 seeded profiles with no auth users, and the 3 March sample editorials, still `published`/`approved` under Matthew Brothers' byline. The live history also has `remove_profiles_auth_fk_for_seeding`, which was never checked in; it is now recorded as `001a_...`. Grants match Supabase defaults: anon and authenticated hold every table privilege, including TRUNCATE. **The deployed site bundle contains the project URL and public key**, so these gaps are reachable directly through the API even though the UI is read-only. Concretely: anyone can read the sample editorials and every profile column, including `mobility_profile`. If Auth sign-ups are open, a new account could insert photo rows on published reviews.

**Fix (tested; applied live 2026-11-08 with user approval).**
- `002_harden_community_permissions.sql` revokes all client privileges, then grants back by column. Ordinary users can no longer touch `is_admin`, `is_editor`, `review_count`, `status`, `published`, `featured`, `is_editorial`, `body_html` or `helpful_count`.
- Only public profile columns are readable; owners read private fields through `get_my_profile()`. A trigger creates each profile on sign-up.
- Authors submit, edit and withdraw only their own pending reviews and can read them back. A table constraint makes publication require approval.
- Moderation happens only through `moderate_review()`, which requires an editor or admin who is not the author and records who, when and why.
- Review photos attach only to the author's own pending review, under `<uid>/` paths, and stay private until approval.
- `003_archive_legacy_sample_reviews.sql` unpublishes the three sample editorials and marks them rejected with an explanatory note. Rows are kept as history.

**Evidence.** `src/__tests__/db/rls.test.ts` runs the migrations in PGlite (real Postgres in WebAssembly) with Supabase's default grants reproduced. It covers anonymous, user A, user B and moderator, testing allowed and denied reads/writes, privilege escalation, cross-user edits, moderation rules, photo isolation and TRUNCATE: 15 tests. Against the old schema, 13 of 14 authorization tests fail (once the missing profiles are patched in); with the migrations, all pass. The harness does not exercise Supabase Auth, PostgREST, Storage or the live project.

**Still required before enabling community features.**
- Update app code: profile reads must select explicit public columns or call `get_my_profile()`; the callback must stop inserting profiles; the review form must not send `published`/`status`.
- Create the private `review-uploads` storage bucket with owner-path policies; owner claims (item 5); consent and moderation UI.

**Live verification after applying 002 and 003 (2026-11-08):**
- Privilege checks: anon cannot read `mobility_profile` but can read `display_name`. Signed-in users cannot update `is_admin`, insert `published` or update `status`, but can update `bio`. Anon holds no TRUNCATE, cannot insert venues and cannot execute `moderate_review`. The sign-up trigger exists.
- Data: 107 venues and 2 profiles unchanged. All 3 sample editorials are `rejected`/unpublished with the archive note.
- Real API probes with the public key from the live bundle: reviews `[]`; profile names readable; `mobility_profile` and `select=*` refused (42501); venues readable; review photos `[]`; venue insert refused; `moderate_review` refused.
- Security advisor: warnings only, all intended. These are GraphQL visibility of tables that are deliberately public-readable under RLS and column grants, and the three SECURITY DEFINER functions meant for signed-in users, each of which checks the caller. No errors.

**Sign-ups paused (2026-11-08, user decision).** "Allow new users to sign up" was turned off in the Supabase dashboard. Verified: `/auth/v1/settings` reports `disable_signup: true`, and a sign-up attempt returns 422 `signup_disabled`. Re-enable it only when community features launch, after the remaining items above.

