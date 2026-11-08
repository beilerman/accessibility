# Dependency security review: November 8, 2026

Base commit: `d4c6656` on `feat/threshold-public-catalog`.
This review and patch are local. They do not establish that production is
exploitable or that a patched version has been deployed.

## Changes

- Update Next.js and its matching ESLint configuration from 16.3.4 to 16.4.5.
  The minimum Next 16.x patch covering all listed advisories is 16.4.1;
  16.4.5 is the newer stable version recommended by the current audit.
- Resolve sharp 0.35.5, including its updated platform/libvips packages,
  and source-map-js 1.2.2 in the lockfile.
- Override only `@tailwindcss/typography`'s pinned selector parser with
  postcss-selector-parser 6.1.5. Typography 0.5.19 and the current 0.5.20
  still pin vulnerable 6.0.10. This stays on the parser's existing major
  version rather than accepting the audit's proposed typography downgrade.
  Remove the override once typography itself selects a patched parser.
- Apply compatible development-tool updates: Vitest 4.1.12, Vite 8.3.6,
  undici 7.30.2, and brace-expansion 1.1.21 / 5.0.12. Their required
  transitive packages are recorded in the lockfile.
- The updated React Hooks lint rules exposed an existing synchronous
  state-reset effect in the gated review form. Move the highlight reset
  into the search input's change handler. Selection already resets it.
  Two regression tests cover edited searches, keyboard selection, clearing
  an old selection, and Escape. No contribution gate is enabled.

## What the advisories mean for this application

The installed vulnerable versions were confirmed. Official GitHub advisory
records were independently checked; none of the reviewed records was withdrawn.
No exploit probes or tests against deployed services were performed.

- **Image processing:** Next image optimization is enabled and used, and
  the original lockfile resolves sharp 0.35.4. The
  [Next image RCE advisory](https://github.com/advisories/GHSA-2464-fhr4-w9xw)
  and [sharp/librsvg advisory](https://github.com/advisories/GHSA-wq5f-xc86-pv6w)
  have additional glibc-Linux and SVG/runtime prerequisites. This Mac
  checkout does not establish production's platform, Node PIE status,
  or actual librsvg version. The configuration does not enable
  `dangerouslyAllowSVG`, but that alone is not proof of immunity.
  A global/system libvips installation needs separate verification that
  its librsvg is at least 2.63.2; a package-lock update cannot prove that.
- **Other critical Next paths:** No `next/og` / `ImageResponse` usage or
  dynamic metadata-image routes were found for
  [the SVG-generation advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j).
  No Cache Components / `use cache` path returning multiple typed arrays
  was found for [the cache RCE advisory](https://github.com/advisories/GHSA-673q-mjm6-r5xr).
- **Server Actions:** No `use server` directives were found and the inspected
  build's Server Action manifest had empty node/edge action maps. The
  prerequisite for [this DoS advisory](https://github.com/advisories/GHSA-p3m5-59mp-jv5r)
  was not identified.
- **Image SSRF:** HTTPS `images.unsplash.com` is allowlisted. Image
  optimization therefore exists, but the attacker-controlled URL/DNS
  conditions in [the advisory](https://github.com/advisories/GHSA-cjq9-62q9-8jv4)
  were not established.
- **Development server:** The affected dev endpoint matters while running
  the vulnerable `next dev`, not the production server.
  [Advisory](https://github.com/advisories/GHSA-39w2-rjm5-chcv).
- **Cache/information leaks:** This is an App Router repository. No Pages
  Router, root catch-all, Draft Mode/use-cache path, or affected metadata
  image route was found. Venue ISR alone does not establish the additional
  prerequisites in these advisories:
  [Draft Mode](https://github.com/advisories/GHSA-3w37-wq28-93x7),
  [nested root params](https://github.com/advisories/GHSA-h694-7cp9-m8p3),
  [Pages Router SSG/ISR](https://github.com/advisories/GHSA-4jqv-mc3x-m676),
  [root catch-all](https://github.com/advisories/GHSA-mcj8-r9mp-w47p), and
  [metadata dynamicParams](https://github.com/advisories/GHSA-f87g-xv8r-7p7x).
- **Source-map and selector parsers:** Vulnerable versions existed, but
  no request-time application path parsing attacker-supplied indexed source
  maps or CSS selectors was found. Typography's selector parser is used
  during the trusted-source CSS build. Ordinary trusted build input is
  outside the selector advisory's stated exposure.
  [source-map-js](https://github.com/advisories/GHSA-68fv-2mgg-jv7q),
  [selector parser](https://github.com/advisories/GHSA-rj75-hqrm-r3gf).

These findings justify patching, not a claim of a demonstrated production RCE.

## Audit outcome and remaining limitation

- Production dependency audit: **0 reported vulnerabilities**, compared
  with 5 affected package entries before the patch (1 critical, 2 high,
  2 moderate).
- Full dependency audit: **8 moderate package entries, no high or critical**.
  All eight trace to one remaining
  [minimatch advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249)
  in the development-only TypeScript ESLint dependency chain. This is not
  eight independent vulnerabilities or a production dependency.
- Both the installed TypeScript ESLint 8.57.1 and the registry's current
  8.72.1 require minimatch `^10.2.2`; the fix is in 11.0.1. No forced
  cross-major override or downgrade to Next 15's ESLint configuration was
  applied. Track the upstream compatible update. Do not run lint against
  untrusted configuration or expose development tooling as a public service.
- A zero-result production audit is not a complete security assessment.
  Runtime configuration, deployment platform and system image libraries
  require separate checks when publication is approved.

## Verification

- Independent read-only patch review found no necessary correction.
- A clean `npm ci` from the final lockfile succeeded, followed by another
  passing TypeScript check and all 47 unit tests.
- The installed Mac sharp runtime reports sharp 0.35.5, libvips 8.18.7
  and librsvg 2.63.2. This is local evidence, not a production-runtime check.
- TypeScript check passed.
- Unit tests: 47 passed across 8 files, including the two new review-search
  regressions and the existing database authorization tests.
- Lint: no errors; 16 existing warnings remain.
- Next 16.4.5 production build passed (57 generated pages).
- Playwright: all 16 browser tests passed, including public routes,
  image loading, keyboard/mobile behavior, automated accessibility checks
  and disabled-community behavior.
- Pipeline tests: all 27 passed.
- No repository code, credentials, database permissions, community feature
  flags or deployment settings outside this isolated patch were changed.
  Remote CI and production verification remain pending publication approval.
