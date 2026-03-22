---
title: "feat: Auth, Google Maps, and Accessibility Tests"
type: feat
status: active
date: 2026-03-22
---

# feat: Auth & Community + Google Maps + Accessibility Tests

## Overview

Three features that complete the AccessReview MVP:

1. **Auth & Community (Phase 5)** — Supabase Auth with Google OAuth + email/password, user profiles with mobility profile, community review submission with photo upload
2. **Google Maps** — Interactive map on browse page and venue detail pages with accessibility-rated venue pins
3. **Automated Accessibility Tests** — vitest-axe for component tests + Playwright axe-core for full-page e2e tests

## Implementation Units

### Unit 1: Supabase Auth + proxy.ts

**Goal:** User authentication with Google OAuth and email/password. Session refresh via proxy.ts.

**Files:**
- `src/app/proxy.ts` — Session refresh, auth gate for /submit and /profile routes
- `src/app/auth/callback/route.ts` — OAuth callback handler
- `src/app/login/page.tsx` — Sign-in/sign-up page
- `src/components/auth/AuthForm.tsx` — Client Component with email/password + Google OAuth buttons
- `src/components/layout/Header.tsx` — Update: show user avatar/sign-out when authenticated
- `src/lib/supabase/server.ts` — Already exists, uses async cookies

**Approach:**
- proxy.ts refreshes Supabase session on every request using getClaims()
- Google OAuth: configure in Supabase Dashboard, callback route exchanges code for session
- Protected routes: /submit and /profile/* gated by proxy.ts redirect
- On first sign-up, auto-create profile row via Supabase database trigger (or in the callback)
- Sign-out via Server Action that clears session cookies

**Supabase config needed:**
- Enable Google OAuth provider in Supabase Dashboard
- Enable email/password auth
- Set redirect URLs
- Add `NEXT_PUBLIC_SITE_URL` env var to Vercel

### Unit 2: User Profiles

**Goal:** Profile page showing user's mobility profile and their reviews.

**Files:**
- `src/app/profile/page.tsx` — Current user's profile (redirect to login if not authenticated)
- `src/app/profile/edit/page.tsx` — Edit profile form
- `src/components/shared/MobilityProfileSelector.tsx` — Multi-select chip UI for mobility types
- `src/types/database.ts` — Already has Profile type

**Approach:**
- Profile page reads from Supabase profiles table
- Edit page uses Server Actions to update profile
- MobilityProfileSelector is a Client Component with checkbox chips for each mobility type

### Unit 3: Community Review Submission

**Goal:** Authenticated users can submit reviews with photos for any venue.

**Files:**
- `src/app/submit/page.tsx` — Review submission form (protected route)
- `src/components/review/ReviewForm.tsx` — Client Component: venue selector, rating, body, photos, mobility device
- `src/app/submit/actions.ts` — Server Actions for review creation and photo upload
- Supabase Storage: create `review-images` public bucket

**Approach:**
- Venue selector: search/autocomplete from existing venues
- Accessibility rating: radio group (accessible/partially/not_accessible)
- Body: textarea (community reviews don't need MDX)
- Photo upload: direct to Supabase Storage via signed URLs
- Reviews created with status='pending' (moderation required)
- Mobility device used: dropdown from MobilityDevice type

### Unit 4: Google Maps Integration

**Goal:** Interactive maps on browse page and venue detail pages.

**Files:**
- `src/components/venue/VenueMap.tsx` — Client Component: map with venue markers
- `src/app/venues/page.tsx` — Update: add map view toggle
- `src/app/venues/[slug]/page.tsx` — Update: replace map placeholder with real map

**Dependencies:** `@vis.gl/react-google-maps`

**Approach:**
- VenueMap takes venues with lat/lng and renders AdvancedMarkers
- Marker colors match accessibility rating (green/yellow/red)
- Click marker → InfoWindow with venue name, rating, link
- Browse page: toggle between card grid and map view
- Venue detail: small map showing single venue location
- Text-based venue list remains alongside map for screen reader users
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` env var required

### Unit 5: Automated Accessibility Tests

**Goal:** axe-core tests catch WCAG 2.1 AA violations in CI.

**Files:**
- `vitest.config.ts` — Vitest configuration
- `src/__tests__/a11y/homepage.test.tsx` — Homepage component accessibility test
- `src/__tests__/a11y/venue-card.test.tsx` — VenueCard accessibility test
- `src/__tests__/a11y/rating-badge.test.tsx` — AccessibilityRatingBadge test
- `e2e/accessibility.spec.ts` — Playwright full-page accessibility tests
- `playwright.config.ts` — Playwright configuration
- `.github/workflows/a11y.yml` — GitHub Actions CI

**Dependencies:** `vitest @testing-library/react @testing-library/jest-dom jsdom vitest-axe @playwright/test @axe-core/playwright`

**Approach:**
- Component tests: render with Testing Library, run axe on container
- Page tests: Playwright navigates to each page, runs AxeBuilder with wcag2a + wcag2aa + wcag21aa tags
- Test pages: /, /venues, /venues/braxton-brewing-company, /reviews/braxton-brewing-company, /about
- CI: run on push to master, fail on any violations

## Acceptance Criteria

- [ ] Users can sign in with Google OAuth or email/password
- [ ] Users can create/edit profiles with mobility profile
- [ ] Users can submit community reviews with photos (pending moderation)
- [ ] Browse page has map view toggle showing venue pins color-coded by rating
- [ ] Venue detail pages show embedded map
- [ ] vitest-axe tests pass for key components
- [ ] Playwright accessibility tests pass for all pages (WCAG 2.1 AA)
- [ ] CI runs accessibility tests on push

## Dependencies

- Google Maps API key (must be provisioned)
- Supabase Google OAuth configured in Dashboard
- Supabase Storage bucket created for review images
