# Threshold: Implementation Plan

Version 1.1, September 10, 2026 (costs and environments revised after the Supabase discussion). Owners: Brad Eilerman, Matthew Brothers.
Status: draft for review. This file is meant to live at `docs/PLAN.md` in the repo and be read by Claude Code on every session.

---

## 0. Decisions already made (this session)

| Decision | Choice | Consequence |
|---|---|---|
| Relationship to prior work | Extend Threshold, not greenfield | Recover the repo from Matthew first; reuse the paused `ThresholdAccess` Supabase project if its schema is salvageable |
| Launch data | Seed from open data, mark unverified, audit later | Needs a licensed seed source and a visible trust tier on every fact |
| Ownership / revenue | Undecided; build free, keep paid org tiers possible | No Stripe in beta; `organizations` table carries a `plan` column from day one so tiers are additive |
| Team | Brad + Matthew | Two-person repo conventions; agents do the typing |
| Rubric domains | Mobility, Sensory, Cognitive/neurodivergent/mental health, Chronic/invisible | Four attribute groups in one rubric, persona filters across them |
| Timeline | Public beta in about 6 weeks (target: end of the week of Oct 20, 2026) | Org accounts ship in beta but paid features do not |

Assumptions I made where you did not say (correct any of these):

- Users must sign in to post reviews or observations; browsing is anonymous.
- The name stays "Threshold" (the step at the door is a good name for this).
- Weekend-and-evening effort, roughly 8 to 12 hours per person per week.
- No SEP resources, branding, or data are used. This is a personal/LLC project.

---

## 1. What Threshold is

**One sentence.** Threshold tells a person with a disability, before they leave the house, whether a specific place in Greater Cincinnati and Northern Kentucky will work for them, with evidence they can see and a date on it.

**Who it is for.** Primary: adults with mobility, sensory, cognitive, psychiatric, or chronic-illness needs, and the family members who plan outings for them. Secondary: organizations (restaurants, clinics, venues, parks, government offices) that want to publish accurate information once instead of answering the same phone call daily.

**The job of the site.** Answer "will this place work for me?" Not "is this place good?" Yelp and Google already answer the second question badly for this audience. The design consequence: Threshold publishes observable facts with provenance, and layers lived-experience reviews on top. It never collapses accessibility into one star rating.

**What it is not.**

- Not a compliance authority. Threshold never states that a place is "ADA compliant." That is a legal conclusion. It states that the entrance has no step and the door is 34 inches wide, observed on a date, by whom.
- Not a review site with an accessibility tab. Facts first, opinions second, both visible, both dated.
- Not a national product at launch. One metro, done well, exported in a standard format (A11yJSON) so the data outlives the site.

---

## 2. Trust model (the core design decision)

Every fact on a place page is an **observation** with a **source tier**, a **date**, and optionally a **photo**. Place pages show the best current value per attribute and its provenance. Nothing is anonymous "site data."

| Tier | Who | Label shown | Precedence |
|---|---|---|---|
| 4 Audited | A Threshold auditor on site with the full rubric and photos | "Audited by Threshold, Oct 3, 2026" | Highest |
| 3 Organization | A verified org account for a claimed place | "Reported by [Org], Sep 20, 2026" | Second |
| 2 Community | Any signed-in user, with a photo strongly encouraged | "Reported by 3 visitors, latest Sep 28" | Third; consensus rule below |
| 1 Seed | Imported open data (Overture, GTFS, OSM layer) | "Unverified, from open data" | Lowest |

Rules:

- **Freshness beats tier when the gap is large.** An org report from 2 years ago is outranked by a community report with a photo from last month. Implement as: precedence by tier, then a staleness decay (audit 24 months, org 18 months, community 12 months), then the page shows "last confirmed" prominently.
- **Community consensus.** A community value becomes current when 2 independent users agree or 1 user attaches a photo. A conflicting later observation flags the attribute for review rather than silently overwriting.
- **Conflicts are shown, not hidden.** If an org says "step-free entrance" and two visitors say "one 4-inch step," the page shows both with dates. This is the product's honesty guarantee and the reason to prefer it over the org's own website.
- **Persona filters, not a score.** A user picks "power wheelchair" or "low vision" or "sensory sensitivity" and the map shows works / partially / unknown / does not work for that persona, computed from attribute predicates (section 3.3). No composite number.

Confidence this is the right core design: 85. Uncertainty source: I have not seen Threshold's existing schema, and the consensus thresholds are a first guess to be tuned after the pilot audits.

---

## 3. Rubric v1

Design principles: every item is **observable** by a visitor in under a minute, answerable **yes / no / unknown** or from a short list, and **mappable to A11yJSON** where a field exists so the data can be exported to accessibility.cloud later. Items that need a tape measure are flagged `audit_only` and appear only in the auditor form.

### 3.1 Attribute groups

**Mobility (M)**

| Key | Prompt | Type | Audit only |
|---|---|---|---|
| m_entrance_step_free | Can you enter without any step? | yes / no / ramp on request | |
| m_entrance_door_width | Main door clear width | number, inches | yes |
| m_entrance_door_type | How does the door open? | automatic / push button / manual light / manual heavy | |
| m_parking_accessible_count | Accessible parking spaces at or next to the site | number | |
| m_parking_route_step_free | Route from accessible parking to the door has no steps or curbs | yes / no | |
| m_parking_distance | Distance from parking to entrance | short (<100 ft) / medium / long | |
| m_interior_path_width | A wheelchair can move through the main areas | yes / partly / no | |
| m_restroom_type | Restroom | none public / single-user accessible / accessible stall / not accessible | |
| m_restroom_grab_bars | Grab bars present | yes / no | |
| m_elevator_all_floors | Elevator or lift reaches every public floor | yes / no / single floor | |
| m_seating_available | Places to sit while waiting or resting | yes / limited / no | |
| m_table_wheelchair | Tables a wheelchair fits under | yes / some / no | |
| m_counter_lowered | Lowered counter section | yes / no | |

**Sensory (S)**

| Key | Prompt | Type | Audit only |
|---|---|---|---|
| s_braille_signage | Braille or tactile signage on rooms and restrooms | yes / no | |
| s_large_print_menu | Large print or high-contrast menu / materials | yes / no / n/a | |
| s_digital_menu | Menu or key info available on the web in text form (not image only) | yes / no / n/a | |
| s_lighting | Lighting | bright and even / dim / variable or flashing | |
| s_hearing_assist | Hearing loop or assistive listening system | yes / no / unknown | |
| s_captions_screens | Screens show captions | yes / no / no screens | |
| s_staff_text_communication | Staff will communicate by writing or text | yes / no | |
| s_service_animal_experience | Service animal welcomed without friction (observed, not policy) | yes / friction / refused | |
| s_visual_alarm | Visual fire alarm | yes / no | yes |
| s_tactile_hazard_markers | Tactile markers at stairs or platform edges | yes / no | |

**Cognitive, neurodivergent, mental health (C)**

| Key | Prompt | Type | Audit only |
|---|---|---|---|
| c_noise_level | Typical noise | quiet / moderate / loud | |
| c_music | Background music | none / low / loud | |
| c_crowding | Typical crowding at busy times | low / moderate / packed | |
| c_quiet_space | A quiet or low-stimulation space is available | yes / no | |
| c_sensory_hours | Scheduled sensory-friendly hours | yes (details) / no | |
| c_wayfinding | Signage makes it clear where to go and what to do | yes / partly / no | |
| c_process_predictable | Ordering / check-in / checkout steps are posted or obvious | yes / no | |
| c_nonverbal_option | You can order or check in without speaking (kiosk, app, written) | yes / no | |
| c_flexible_waiting | You can wait outside or be texted instead of standing in line | yes / no | |
| c_staff_training | Staff have disability-awareness training | org-attested only | |
| c_easy_exit | You can leave quickly without passing through a crowd or checkpoint | yes / no | |

**Chronic illness and invisible disability (I)**

| Key | Prompt | Type | Audit only |
|---|---|---|---|
| i_restroom_no_purchase | Restroom available without purchase | yes / no | |
| i_restroom_proximity | Restroom reachable within about a minute from the main area | yes / no | |
| i_seating_throughout | Seating available in most areas, not just one | yes / no | |
| i_water | Free drinking water | yes / no | |
| i_allergen_info | Allergen or ingredient info available on request or posted | yes / no / n/a | |
| i_fragrance_free | Fragrance-free or scent-reduced policy | yes / no | |
| i_shade_climate | Shade or climate control where you wait | yes / no | |
| i_wait_time_typical | Typical wait | under 10 min / 10 to 30 / over 30 | |
| i_air_filtration | HEPA filtration or open-air option | yes / no / unknown | org-attested or audit |

Plus per place: `hours_confirmed_at`, `phone_confirmed_at`, `website`, and a free-text "what to know before you go" field written by the org or auditor.

### 3.2 Answer envelope

Every observation stores: `attribute_key`, `value` (jsonb), `note` (optional, 280 chars), `photo_id` (optional), `source_type`, `contributor_id`, `org_id` (if org), `audit_id` (if audit), `observed_at`, `created_at`, `status`.

### 3.3 Personas (filters)

A persona is a named set of predicates over attributes. Users choose one or more for themselves (private by default) and the map colors places against them.

| Persona | Works when | Does not work when |
|---|---|---|
| Power wheelchair | m_entrance_step_free=yes, m_interior_path_width=yes, m_restroom_type in (single-user accessible, accessible stall), m_parking_route_step_free=yes | m_entrance_step_free=no or m_interior_path_width=no |
| Manual wheelchair | as above; m_entrance_door_type not "manual heavy" adds "partially" | same |
| Walker or cane, low stamina | m_entrance_step_free in (yes, ramp), m_seating_available in (yes, limited), m_parking_distance in (short, medium) | m_seating_available=no and m_parking_distance=long |
| Blind or low vision | s_digital_menu=yes or s_large_print_menu=yes, s_braille_signage=yes, s_lighting != variable | s_service_animal_experience=refused |
| Deaf or hard of hearing | s_staff_text_communication=yes or c_nonverbal_option=yes | none (partial by default) |
| Autistic / sensory sensitivity | c_noise_level=quiet or c_sensory_hours=yes, c_music != loud, c_process_predictable=yes | c_noise_level=loud and c_crowding=packed |
| Anxiety / panic | c_easy_exit=yes, c_flexible_waiting=yes, c_crowding != packed | c_easy_exit=no |
| Chronic illness (GI, cardiac, autoimmune) | i_restroom_proximity=yes, i_seating_throughout=yes, i_water=yes | i_restroom_no_purchase=no and i_restroom_proximity=no |
| Chemical sensitivity | i_fragrance_free=yes | i_fragrance_free=no |
| Service animal handler | s_service_animal_experience=yes | s_service_animal_experience=refused |

"Unknown" is a first-class state. Most places will start unknown for most personas; the map should make that honest instead of hiding it.

Store personas as rows in a `personas` table with a `rules` jsonb column so they can be tuned without a deploy.

---

## 4. Data model (Postgres on Supabase, PostGIS enabled)

### 4.1 Tables

```
places                 id, overture_id (unique, nullable), name, category, subcategory,
                       address_line, city, state, postal_code, geom geography(Point,4326),
                       website, phone, status (active|closed|duplicate|pending),
                       claimed_org_id -> organizations, source (overture|user|org|gtfs),
                       created_by, created_at, updated_at

attribute_definitions  key (pk), domain (M|S|C|I), label, prompt, answer_type
                       (bool3|enum|number|text), options jsonb, unit, audit_only bool,
                       a11yjson_path text, sort int, active bool

observations           id, place_id, attribute_key, value jsonb, note, photo_id,
                       source_type (seed|community|org|audit), contributor_id,
                       org_id, audit_id, observed_at, created_at,
                       status (active|retracted|flagged|rejected)

place_attribute_current  place_id, attribute_key, value jsonb, source_type,
                       observation_id, observed_at, confidence (0..1),
                       conflict bool   -- maintained by trigger on observations

personas               id, slug, label, description, rules jsonb, sort, active

place_persona_fit      place_id, persona_id, fit (works|partial|unknown|no),
                       computed_at   -- recomputed by trigger or nightly job

reviews                id, place_id, user_id, body, visit_date, would_return bool,
                       persona_tags text[], helpful_count, status, created_at

photos                 id, place_id, storage_path, uploader_id, alt_text (required),
                       caption, taken_at, status

profiles               user_id (pk -> auth.users), display_name, personas uuid[],
                       personas_public bool default false, role
                       (user|auditor|moderator|admin), created_at

organizations          id, name, website, email_domain, verification_status
                       (pending|verified|rejected), verification_method,
                       verified_at, verified_by, plan (free|pro) default free

org_members            org_id, user_id, role (owner|editor)

org_claims             id, place_id, org_id, status (pending|approved|rejected),
                       evidence text, decided_by, decided_at

audits                 id, place_id, auditor_id, rubric_version, started_at,
                       completed_at, summary

flags                  id, target_type (observation|review|photo|place), target_id,
                       reporter_id, reason, status, resolved_by, resolved_at

moderation_log         id, actor_id, action, target_type, target_id, note, created_at
```

### 4.2 Row-level security (summary; the full policies are hand-reviewed, never merged blind)

- Anonymous: select on `places`, `place_attribute_current`, `place_persona_fit`, `reviews` (status=active), `photos` (status=active), `attribute_definitions`, `personas`, `organizations` (verified only).
- Authenticated user: insert `observations` (source_type forced to `community` by trigger), `reviews`, `photos`, `flags`; update own rows within 24 hours; read own `profiles` row; update own profile.
- Org member: insert `observations` with source_type `org` only where `place_id` is in an approved `org_claims` row for their org; update org profile.
- Auditor: insert `audits` and `observations` with source_type `audit`.
- Moderator/admin: update status on any content; insert `moderation_log`. Role lives in a custom JWT claim set by a Postgres function, not in client state.
- Seed rows are inserted by the service role from the pipeline only.

### 4.3 Geo query

One RPC: `places_in_view(min_lon, min_lat, max_lon, max_lat, persona_id, category[])` returning GeoJSON features with `fit` precomputed. Index: GIST on `geom`. Cap results at 500 and cluster client-side.

---

## 5. Architecture and stack

The rule for this plan: use what you have already shipped wherever possible, and confine the new things to a short list you can learn in an afternoon each.

| Layer | Pick | Already shipped by you? | Confidence | Notes |
|---|---|---|---|---|
| Front end | Vite + React + TypeScript + Tailwind | Yes (RheumatologyCDS, consulting site) | 95 | Single-page app at beta |
| UI primitives | Radix via shadcn/ui | Partly | 85 | Accessible by default; the site must pass its own audit |
| Routing / data | React Router, TanStack Query, supabase-js | Partly | 85 | |
| Backend | Supabase: Postgres + PostGIS, Auth, Storage, Edge Functions | Yes (Open Brain, ThresholdAccess, paddockloop) | 90 | New to you: RLS with roles, PostGIS, triggers |
| Map | MapLibre GL JS + OpenFreeMap vector tiles | No | 80 | Free, no key, no request limits, but no SLA. Fallback: MapTiler (paid) or self-hosted Protomaps |
| Hosting | Vercel or Netlify static deploy | Yes | 85 | Vercel Hobby is non-commercial; move to Pro ($20/mo) or Cloudflare Pages if org tiers go paid |
| Auth email | Supabase Auth with custom SMTP via Resend | No | 80 | Supabase's default mailer is rate-limited to a handful of emails per hour; set custom SMTP before beta |
| Tests | Playwright (smoke + axe-core), Vitest (persona rules, precedence) | No | 75 | Small suite, but it is what keeps agents honest |
| Seed pipeline | DuckDB + Python script in `pipeline/` | Partly (scripts) | 85 | Runs on your Mac or in Cowork; outputs CSV loaded via `supabase db` or an Edge Function |
| Analytics | Plausible or PostHog free tier | No | 70 | Privacy-respecting; this audience notices |

What is deliberately excluded from beta: SSR frameworks (Next.js, Remix), a custom API server, Stripe, mobile apps, real-time features, AI-generated content on place pages.

SEO note: location pages are the long-term asset and an SPA hides them from crawlers. Beta ships as an SPA with a sitemap. Phase 2 adds build-time prerendering of `/place/:slug` pages (a script that renders each place to static HTML; an agent can write it in a day). Do not start with SSR to solve this; it drags in a framework you have not used.

---

## 6. Seed data pipeline

### 6.1 Source choice

| Source | Use | License | Verdict |
|---|---|---|---|
| Overture Maps Places | Primary seed: name, category, address, point, website, phone, confidence | CDLA-Permissive 2.0 (attribution only; some rows Apache 2.0) | **Use.** Permissive license lets you enrich rows and keep your own license on the result |
| OpenStreetMap (`wheelchair=*`, `toilets:wheelchair=*`) | Overlay layer only | ODbL (share-alike) | **Display as a separate layer with attribution. Do not merge into `observations`.** Merging OSM data into your enriched table would make your database a derivative work under ODbL share-alike |
| Google Places | None for storage | Terms prohibit storing anything except place IDs | **Do not use as a seed.** Optional later: store `google_place_id` for a "see on Google" link |
| GTFS (Cincinnati Metro, TANK) | Phase 2: transit stops with `wheelchair_boarding` | Open | Cheap, high value for the mobility persona |
| Cincinnati Open Data / CAGIS | Phase 2: curb ramps, parks, public buildings | Public | Investigate; coverage unknown |
| accessibility.cloud (Wheelmap) | Phase 2: import and export via A11yJSON | Check terms | Interop target; their API exists and A11yJSON is the schema to map to |

Confidence that Overture is the right primary seed: 85. Uncertainty source: Overture's place coverage and duplicate rate for this metro is untested; the pilot pull (below) settles it.

### 6.2 Pull

Bounding box for the metro (first cut, tighten after the pull): longitude -84.95 to -84.15, latitude 38.85 to 39.40. That covers Hamilton, Clermont, Butler (south), Warren (south) in Ohio and Boone, Kenton, Campbell in Kentucky.

Steps, all scriptable by an agent:

1. DuckDB query against the Overture S3 release filtered by bbox and `basic_category` in the launch list.
2. Drop rows with `confidence < 0.5`.
3. Dedupe by name + 30 m radius.
4. Write `places.csv` with `overture_id`, and load via `supabase db` or a service-role Edge Function.
5. Record the Overture release date in a `data_sources` table for attribution and future refresh diffs.

Launch category list (public-facing places where the rubric applies): restaurants and cafes, retail, grocery and pharmacy, healthcare (clinics, hospitals, dental, therapy), parks and trails, libraries and museums, venues and theaters, government offices, gyms and pools, places of worship, hotels. Expect low tens of thousands of rows for the bbox; trim to a pilot corridor if the map feels empty of verified data (see section 8, week 6).

### 6.3 What "unverified" looks like on the page

A seed place shows name, address, category, a map pin, and one line: "No accessibility information yet. Been here? Tell us what you saw." plus the three highest-value prompts for the most common personas (step-free entrance, restroom type, noise level). That is the on-ramp for community data.

---

## 7. Feature slices

Each slice is one PR with acceptance criteria written before code. Order matters; each builds on the previous.

1. **Schema and seed.** Migrations for section 4, PostGIS on, seed load, `places_in_view` RPC. Acceptance: RPC returns pins for a Covington bbox in under 300 ms.
2. **Map and search.** Map page with clustering, search by name and category, persona selector (anonymous, stored in local storage). Acceptance: keyboard-only user can search and open a place; axe reports zero serious violations.
3. **Place page.** Header, map thumbnail, attribute groups with provenance labels and dates, conflicts shown, photos with alt text, "before you go" text. Acceptance: renders a seed-only place and a fully audited place from fixtures.
4. **Accounts and profiles.** Magic-link sign-in, display name, private persona selection, role claim in JWT. Acceptance: RLS test script passes for anon, user, org, moderator keys.
5. **Contribute an observation.** Per-attribute "what did you see?" form, photo upload with required alt text, consensus trigger updates `place_attribute_current`. Acceptance: two users agreeing flips a value; one photo flips a value; a conflict sets `conflict=true`.
6. **Reviews.** Text review, visit date, would-return, persona tags, helpful votes, flag button. Acceptance: review appears only after status=active; flagged review hides.
7. **Organization accounts.** Org sign-up, claim a place with evidence (email domain match auto-approves when domain matches `places.website`; otherwise manual), org editor form for the full rubric, org-tier provenance labels. Acceptance: org observation shows "Reported by [Org]" and outranks community per section 2.
8. **Moderation.** Flags queue, retract/reject, moderation log. In beta this is Supabase Studio plus a minimal `/admin` page; a proper console is Phase 2.
9. **Auditor mode.** The full rubric including audit-only items, offline-tolerant form, photo per section, audit summary. Acceptance: one complete audit end-to-end on a phone in the field.
10. **Site basics.** Accessibility statement, terms, privacy, data attribution, contact, sitemap, analytics, 404.

---

## 8. Six-week schedule (two people, evenings and weekends)

| Week | Dates | Brad | Matthew | Exit criterion |
|---|---|---|---|---|
| 0 | Sep 10 to 14 | Decide entity, name, data license, Supabase plan; approve rubric v1; define bbox and categories | Recover the Threshold repo and Supabase schema; write `CLAUDE.md`, repo skeleton, CI | Repo builds, local Supabase stack running on both Macs, `ThresholdAccess` restored, `docs/` complete |
| 1 | Sep 15 to 21 | Run the Overture pull; review dedupe results; write persona rules | Slice 1 (schema, seed, RPC); Slice 2 started | Pins on a map for the whole bbox |
| 2 | Sep 22 to 28 | Fixtures for place page; write copy for empty states and provenance labels | Slice 2 done; Slice 3; Slice 4 | A place page with provenance renders from real seed rows |
| 3 | Sep 29 to Oct 5 | Test RLS script by hand; recruit 5 to 8 disability-community beta reviewers | Slice 5; Slice 6 | Contributions and reviews work end to end |
| 4 | Oct 6 to 12 | Pilot audits: 10 places in one corridor with the auditor form | Slice 7; Slice 9 | An org account has claimed a place and edited it; one field audit completed |
| 5 | Oct 13 to 19 | Pilot audits: 15 to 25 more places; legal pages; beta reviewer feedback | Slice 8; Slice 10; accessibility audit of the site; prerender spike | axe clean, VoiceOver pass, terms and privacy live |
| 6 | Oct 20 to 26 | Closed beta with reviewers; fix list triage; outreach to 10 orgs | Fix list; performance; launch checklist | Public beta live |

Role split assumes Matthew is the more hands-on-keyboard builder and Brad owns product, data, rubric, and field audits. Swap if wrong; the slices do not change.

The pilot corridor should be somewhere you both can walk in an afternoon and that has a mix of categories. A 25-to-35-place audited corridor makes the map feel real on launch day; a whole-metro map with 20 audited places scattered across it feels empty.

Confidence the schedule is achievable at 8 to 12 hours per person per week with agents doing the typing: 65. Uncertainty sources: the repo recovery (week 0) could cost a week if the code is gone; RLS and triggers are the parts most likely to eat a weekend; field audits take longer than planned every time.

---

## 9. The vibe-coding operating model

This is the section that maps the plan to what you have already shown you can do: ship a React/Vite/Tailwind tool, stand up Supabase projects, run agents through Cowork and Linear, and audit agent output for silent failure. The gaps you have not demonstrated are RLS with roles, PostGIS, triggers, maps, and an automated test suite. Those are the parts where agents will confidently produce wrong code, so they get the most human review.

### 9.1 Repo layout

```
threshold/
  CLAUDE.md                 how to work in this repo (below)
  docs/PLAN.md              this file
  docs/RUBRIC.md            section 3, kept in sync with attribute_definitions seed
  docs/SCHEMA.md            generated from migrations; agents read this, not the DB
  docs/DECISIONS.md         one line per decision with date and reason
  apps/web/                 Vite app
  supabase/migrations/      the only way the schema changes
  supabase/seed/            attribute_definitions, personas, fixtures
  pipeline/                 DuckDB/Python seed scripts
  tests/                    Playwright, RLS script
```

### 9.2 CLAUDE.md rules (paste these)

- Read `docs/PLAN.md`, `docs/SCHEMA.md`, and `docs/RUBRIC.md` before any task.
- Schema changes happen only through a new file in `supabase/migrations/`. Never run ad-hoc DDL against a remote project.
- Every feature is one vertical slice with acceptance criteria stated in the PR description before code.
- Every PR includes: migration applied to the local stack, `npm run test` output, a Playwright smoke run, an axe-core run on any new page, and a screenshot or preview URL. No evidence, no merge.
- Never write RLS policies without a matching case in `tests/rls.test.ts` that asserts what anon, user, org, and moderator can and cannot do.
- Never commit secrets. `.env.local` only. The service-role key exists only in the pipeline environment.
- Do not invent accessibility attributes. The rubric is `docs/RUBRIC.md`; propose changes there, in a separate PR.
- Use Radix/shadcn primitives for anything interactive. Native semantics first, ARIA second.
- If a task cannot be completed, say so and stop. A partial implementation labeled done is worse than no implementation.

### 9.3 The loop

1. Write the slice spec: 10 lines, acceptance criteria as testable statements.
2. Claude Code implements on a branch.
3. Run `npm run test` and the Playwright smoke locally. Open the preview in a browser and use it with the keyboard only.
4. Read the diff. Read every line of any migration or policy.
5. Merge. Update `docs/DECISIONS.md` if anything was decided.

Time budget per slice: half a day of agent time, one to two hours of human review. If review runs longer, the spec was too big; split it.

### 9.4 What you do not vibe

- RLS policies and the role claim function. Read every line; run the RLS test script yourself.
- Auth configuration (redirect URLs, email templates, rate limits).
- Data deletion and moderation actions. Hand-written, tested, logged.
- The consensus and precedence trigger. Small, but it is the product's honesty guarantee.
- Legal copy.

### 9.5 Applying your own audit findings

Your Open Engine audit found a 76 percent silent agent failure rate and approval blockers stacking up. The countermeasures here are the evidence contract in 9.2 (an agent's claim of done is not evidence), one slice at a time (no long-running autonomous queues for this project), and two humans who each read the other's merged diffs weekly. Run your `completion-evidence-audit` skill on any agent PR that touches migrations or policies.

Cowork scheduled tasks fit two jobs only: a nightly job that runs the test suite against a fresh local stack in CI and posts failures, and a weekly job that summarizes new flags, claims, and observations for the two of you. Do not put implementation work in a scheduled loop.

### 9.6 Environments

Beta: one remote Supabase project (`ThresholdAccess`, restored) as production on Pro, and local Supabase via the CLI (Docker on each Mac) as staging. Pro includes compute for one project; every additional active project bills about $10 per month, so a second remote project is a cost, not a default. Pause the org's other projects while they are idle for the same reason. Free tier is fine for the first weeks of development but pauses projects after seven days of low activity, which would take a public site down, so the upgrade happens no later than launch week. Migrations are written locally, tested against the local stack, then applied to production through the Supabase MCP or CLI.

---

## 10. Costs

| Item | Monthly | Notes |
|---|---|---|
| Supabase Pro (org) | $25 | One active project. Each additional active project adds ~$10 (a remote staging project would make this $35). Includes 100k MAU, 8 GB disk, 250 GB egress, daily backups, no auto-pausing |
| Hosting | $0 to $20 | Vercel Hobby free for non-commercial; Pro $20 if org tiers become paid |
| OpenFreeMap tiles | $0 | No key, no limits, no SLA |
| Resend (auth email) | $0 | Free tier covers beta volume |
| Analytics | $0 to $9 | Plausible $9 or PostHog free |
| Domain | ~$1.25 | ~$15/yr |
| Claude subscription | already paid | |
| **Total** | **$26 to $55** | |

One-time: none required. Optional: a MapTiler key as a tile fallback (~$25/mo only if OpenFreeMap fails you).

Why Supabase rather than something cheaper: Neon, PocketBase, Cloudflare D1, and Firebase all undercut it on the hosting line, but they do so by unbundling (Neon is only the database) or by dropping Postgres (SQLite or NoSQL), which loses PostGIS and the RLS trust model in section 4. The $20 to $30 per month difference is under one hour of the builders' time per month, and Supabase is the one backend both builders have already shipped on. Revisit only if egress or MAU overages appear, which is unlikely at metro scale.

---

## 11. Legal, privacy, and risk

- **User content.** Section 230 protects the platform for user-generated reviews and observations, but only if you do not edit their substance. Moderate by status changes, not by rewriting. Publish terms and a takedown path before beta.
- **Never say "ADA compliant."** Describe observed features with dates. Add a standing disclaimer: conditions change; confirm with the venue for anything critical.
- **Organization attestations** are labeled as the org's own statements. The site does not vouch for them; the audit tier does.
- **Photos.** Exteriors and fixtures only. No identifiable people without consent. Alt text is required on upload; this is both an accessibility requirement and a moderation aid.
- **Persona data is disability-adjacent.** Personas are optional, private by default, never displayed without explicit opt-in, never sold, and deletable. Collect the minimum: email and display name.
- **Not a healthcare service.** Nothing here is PHI and HIPAA does not apply, but keep it that way: no place to enter diagnoses, no free-text health fields on profiles.
- **Employment.** Check SEP's outside-activity and IP policy before launch and keep the project entirely off SEP systems, brand, and time. Decide whether this lives under Eilerman Endocrinology LLC or a new entity; the nonprofit path (fiscal sponsor or 501(c)(3)) matters if you want grants, which are plausible for this kind of civic data project.
- **The site's own accessibility** is the credibility test. Target WCAG 2.2 AA: axe-core in CI, a VoiceOver pass on every page before launch, keyboard-only walk-through, reduced-motion respected, 200 percent zoom without horizontal scroll. Publish an accessibility statement with a contact.
- **Data licensing.** Attribute Overture (CDLA-Permissive) and, on the OSM layer, OpenStreetMap contributors (ODbL). Choose a license for Threshold's own data before launch. CC BY 4.0 keeps the nonprofit and interop doors open; if you want to keep data proprietary for paid tiers, say so in the terms now, because you cannot retroactively close it.

---

## 12. Beta metrics (define before launch so the numbers are not chosen after)

- Places with at least one non-seed attribute, and the share that are audited.
- Audited places in the pilot corridor (target 25 to 35 at launch).
- Observations per active contributor per month.
- Conflict rate (attributes with `conflict=true`) and median time to resolve.
- Org claims submitted and approved.
- Persona filter use as a share of map sessions (tells you whether the core idea lands).
- Return visitors at 30 days.

---

## 13. This week

1. **Repo.** Ask Matthew for the Threshold repo location. If it is gone, do not rebuild from memory; start the new skeleton on this plan and salvage only the Supabase schema and any data.
2. **Supabase.** The org is at its two-active-free-project limit (`eilermanendocrinology@gmail.com's Project` and `paddockloop`), so `ThresholdAccess` cannot be restored until one is paused or the org is upgraded to Pro. Upgrading is the beta plan anyway; do it now and restore, then export the schema into `docs/SCHEMA.md`.
3. **Rubric.** Review section 3 with one or two people from the disability community before it becomes the seed for `attribute_definitions`. Their edits are the cheapest quality improvement available.
4. **Seed pull.** Run the Overture pull for the bbox and look at the row count and duplicate rate. I can run this in the cloud workspace and hand back the CSV and a coverage summary.
5. **Decisions.** Name, entity, data license, pilot corridor. One line each in `docs/DECISIONS.md`.

---

## 14. Open questions for you

1. Matthew's role and hours: is he the primary builder, or are you both product-side with agents doing all of the code?
2. Pilot corridor: which neighborhood or main street do you want audited first?
3. Data license for Threshold's own observations: open (CC BY) or reserved?
4. Entity: Eilerman Endocrinology LLC, a new LLC, or a nonprofit path?
5. Should healthcare facilities be a launch category, given that SEP sites would be among them and you will want to avoid any appearance of conflict?
6. Should the org claim path accept phone verification, or email domain only at beta?
7. Do you want the OSM wheelchair layer at launch or Phase 2?
