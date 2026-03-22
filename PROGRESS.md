# AccessReview Site - Build Progress

## Phase 1: Foundation
- [x] Next.js 16 + TypeScript + Tailwind CSS 4 initialized
- [x] Dependencies installed (Supabase, Lucide, next-themes, MDX, typography)
- [x] Global styles (fonts, colors, CSS variables, dark mode)
- [x] Root layout with ThemeProvider, SkipToContent, FocusManager
- [x] Header component (logo, nav, search, dark mode toggle, mobile menu)
- [x] Footer component (nav, newsletter, copyright)
- [x] MobileNav component
- [x] Custom 404 page
- [x] .env.local.example
- [x] PROGRESS.md created

## Phase 2: Database & Data
- [x] TypeScript types mirroring schema
- [x] Supabase migration file (applied to ThresholdAccess project)
- [x] 25 venues seeded (12 original + 13 from Matthew's list)
- [x] 3 editorial reviews in Matthew's voice
- [x] Supabase client utilities
- [x] Data access functions (swapped from mock to Supabase)
- [x] RLS policies enabled on all tables

## Phase 3: Core Pages
- [x] Homepage (hero, featured review, latest reviews, categories, how it works, newsletter)
- [x] Browse/Search page (filters, card grid, search, live region)
- [x] Venue detail page (hero, accessibility card, reviews, tips, photo gallery, map placeholder)
- [x] Editorial review page (magazine layout, hero, prose, venue sidebar, related reviews)
- [x] About page (Matthew's story, mission, team bios)

## Phase 4: Components & Polish
- [x] Dark mode (verified in both light and dark themes)
- [x] prefers-reduced-motion (CSS media query disables animations)
- [x] Loading states (skeleton UI for homepage and venues)
- [x] Error states (error.tsx boundary with retry)
- [x] Focus indicators (2px accent outline on all interactive elements)
- [x] Skip to content link
- [x] Focus management on route changes
- [x] Semantic HTML throughout (landmarks, headings, fieldsets)
- [x] ARIA labels on all interactive elements
- [x] 44px minimum tap targets (header, dark mode toggle, gallery buttons)
- [x] Unsplash image hostname configured in next.config
- [x] XSS fix: replaced dangerouslySetInnerHTML with safe React rendering
- [x] Null safety: data lookups guard against missing profiles/venues
- [x] Production build passes

## Phase 5: Auth & Community (deferred)
- [ ] Supabase Auth (email + Google OAuth)
- [ ] proxy.ts for session refresh and auth gates
- [ ] Profile creation with mobility profile
- [ ] Community review submission form
- [ ] Photo upload to Supabase Storage
- [ ] Review moderation workflow

## Tracked Deferrals
- [ ] Google Maps integration (@vis.gl/react-google-maps) — requires API key
- [ ] Automated accessibility tests (vitest-axe + @axe-core/playwright)
- [ ] VenueCard/FeaturedReview/ReviewCard: swap `<img>` to `next/image` for LCP
- [ ] Review-specific slugs for 1:many venue-to-review relationship
- [ ] Footer link 44px tap targets
- [ ] JSON-LD Review schema on review pages (LocalBusiness done on venue pages)

## Deployment
- **Live:** https://accessibility-omega-ten.vercel.app
- **GitHub:** https://github.com/beilerman/accessibility
- **Supabase:** ThresholdAccess (us-east-1, nzwlruornfchbgakwqgo)
