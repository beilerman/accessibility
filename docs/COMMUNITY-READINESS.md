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
