import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import places from "../src/data/places.json";
import { dateLabel, latestRetrieval, places as publicPlaces } from "../src/lib/catalog";
import accessPhotos from "../src/data/access-photos.json";
import accessGuides from "../src/data/access-guides.json";
const routes = [
  "/venues/cain-the-market",
  "/venues/be-concerned-covington",
  "/venues/mayerson-jcc",
  "/venues/second-sight-spirits",
  "/venues/freestore-foodbank-bea-taylor-market",
  "/venues/jungle-jims-eastgate",
  "/venues/clermont-transportation-connection-dial-a-ride",
  "/venues/proudworks-transportation",
  "/venues/freestore-foodbank-liberty-street-market",
  "/venues/cincinnati-metro-and-access-paratransit",
  "/venues/national-underground-railroad-freedom-center",
  "/venues/vent-haven-museum",
  "/venues/new-riff-distilling",
  "/venues/braxton-brewing-covington",
  "/venues/riverside-mainstrasse-village-food-tour",
  "/venues/nolia-kitchen",
  "/venues/aj-jolly-park",
  "/venues/pendery-park",
  "/venues/moon-bridge-yoga",
  "/venues/tousey-house-tavern",
  "/venues/blue-ash-recreation-center",
  "/venues/sharonville-community-center-aquatic-center",
  "/venues/mamas-on-main",
  "/venues/price-hill-recreation-center-dempsey-pool",
  "/venues/oxford-aquatic-center",
  "/",
  "/venues",
  "/venues/newport-aquarium",
  "/venues/riverbend-music-center",
  "/venues/bogarts",
  "/venues/tql-stadium",
  "/venues/ludlow-garage",
  "/venues/florence-yalls-thomas-more-stadium",
  "/venues/molly-malones-covington",
  "/venues/smoke-justis",
  "/venues/falcon-theatre",
  "/venues/southgate-house-revival",
  "/venues/amc-newport-on-the-levee-20",
  "/venues/go-bananas-comedy-club",
  "/venues/ark-encounter",
  "/venues/kings-island",
  "/venues/krohn-conservatory",
  "/venues/cincinnati-reds-hall-of-fame-and-museum",
  "/venues/devou-park",
  "/venues/kenton-county-public-library-erlanger-branch",
  "/venues/kenton-county-public-library-independence-branch",
  "/venues/smale-riverfront-park",
  "/venues/winton-woods",
  "/venues/eden-park",
  "/venues/ault-park",
  "/venues/washington-park",
  "/venues/fountain-square",
  "/venues/memorial-hall-otr",
  "/venues/cincinnati-museum-center",
  "/venues/andrew-j-brady-music-center",
  "/venues/childrens-theatre-of-cincinnati-emery-theater",
  "/venues/cincinnati-ballet-center-for-dance",
  "/venues/nippert-stadium",
  "/venues/fifth-third-arena",
  "/venues/everybodys-treehouse-mt-airy-forest",
  "/venues/bettman-nature-preserve",
  "/venues/big-bone-lick-state-historic-site",
  "/venues/burnet-woods-trailside-nature-center",
  "/venues/jungle-jims-fairfield",
  "/venues/findlay-market",
  "/venues/great-wolf-lodge-mason",
  "/venues/fitton-center-for-creative-arts",
  "/venues/kenwood-towne-centre",
  "/venues/voice-of-america-metropark",
  "/venues/heritage-village-museum",
  "/venues/butler-county-regional-transit-authority",
  "/venues/tank-transit-authority-of-northern-kentucky",
  "/venues/ohio-renaissance-festival",
  "/venues/nku-fine-arts-center",
  "/venues/middleton-mills-park",
  "/venues/giles-conrad-park",
  "/venues/woodward-theater",
  "/venues/lindner-family-tennis-center-cincinnati-open",
  "/venues/mariemont-players-walton-creek-theater",
  "/venues/summit-park-blue-ash",
  "/venues/rhinegeist-brewery",
  "/venues/boone-cliffs-state-nature-preserve",
  "/venues/central-park-boone-county-arboretum",
  "/venues/licking-river-greenway-trails",
  "/venues/campbell-county-public-library-newport-branch",
  "/venues/campbell-county-public-library-cold-spring-branch",
  "/venues/price-hill-branch-library",
  "/venues/leblond-recreation-center",
  "/venues/walmart-supercenter-fort-wright",
  "/venues/target-newport",
  "/venues/florence-mall",
  "/venues/ikea-florence-plan-and-order-point",
  "/venues/publix-farmview-commons",
  "/venues/galaxie-covington",
  "/venues/hofbrauhaus-newport",
  "/venues/brkthrough-cincinnati-kenwood",
  "/venues/kenton-county-government-center",
  "/venues/uc-campus-recreation-center",
  "/venues/dunham-recreation-complex",
  "/venues/symphony-hotel-bar",
  "/venues/golden-lamb",
  "/venues/cincinnati-premium-outlets",
  "/venues/kenton-county-public-library-latonia-branch",
  "/venues/cincinnati-city-hall",
  "/venues/cincinnati-recycling-reuse-hub",
  "/venues/hamilton-county-courthouse",
  "/venues/mt-auburn-indoor-pool",
  "/venues/sams-club-florence",
  "/venues/fresh-thyme-market-newport",
  "/venues/ikea-west-chester",
  "/venues/cincinnati-northern-kentucky-international-airport-cvg",
  "/venues/boone-county-public-library-chapin-memorial",
  "/about",
  "/sources",
  "/updates",
  "/visitor-reports",
  "/accessibility",
  "/access-in-pictures",
  "/login",
];
for (const path of routes) {
  test(`public route ${path} renders and passes automated access checks`, async ({
    page,
  }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
  });
}
test("concert guides expose sources and cautions on narrow screens", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const slug of ["riverbend-music-center", "bogarts"]) {
    const place = publicPlaces.find((p) => p.slug === slug)!;
    await page.goto(`/venues?q=${encodeURIComponent(place.name)}`);
    await page.getByRole("link", { name: place.name, exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(place.name);
    await expect(
      page.getByText("Sources last checked " + dateLabel(latestRetrieval(place)), { exact: false }),
    ).toBeVisible();
    await expect(page.getByText(place.limitations, { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Official source for/ })).toHaveCount(
      place.facts.length,
    );
    const reports = page.locator("#visitor-reports article.visitor-report");
    await expect(reports.first()).toBeVisible();
    await expect(
      reports.first().getByRole("link").first(),
    ).toHaveAttribute("href", /^https:/);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.body).color))
      .toBe("rgb(237, 237, 237)");
    await page.waitForTimeout(250);
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
  }
});
test("search, combined filters, details, sources and empty state work", async ({
  page,
}) => {
  await page.goto("/venues");
  await page.getByLabel("Name, place, or detail").fill("wheelchair");
  await page.getByLabel("Area", { exact: true }).selectOption("KY");
  await page.getByLabel("Type of place").selectOption("Libraries");
  await page.getByRole("button", { name: "Find places", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("places found");
  await expect(
    page.getByRole("heading", {
      name: "Boone County Public Library — Walton Branch",
    }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Boone County Public Library — Walton Branch" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Walton");
  await expect(
    page.getByText("From official public websites", { exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByText(
        "Not documented in the sources we checked. Confirm with the venue.",
      )
      .first(),
  ).toBeVisible();
  expect(
    await page.getByRole("link", { name: /Official source for/ }).count(),
  ).toBeGreaterThan(0);
  await page.goto("/venues?q=zz-no-such-place");
  await expect(
    page.getByRole("heading", { name: "No places match these filters." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Clear all filters", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(`${places.length} places found`);
});
test("access photographs and venue photo guides are reachable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/venues/cincinnati-art-museum");
  await page.getByRole("link", { name: "Access photos & guides", exact: true }).click();
  const gallery = page.locator("#access-photos");
  await expect(gallery.getByRole("heading", { name: "Main entrance approach" })).toBeVisible();
  const image = gallery.locator("figure img");
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(gallery.getByRole("link", { name: "Photo by EEJCC" })).toHaveAttribute("href", /^https:\/\/commons.wikimedia.org/);
  await expect(gallery.getByRole("link", { name: /Open photo guide/ })).toHaveAttribute("href", /social-narrative-getting-around-2025\.pdf$/);
  await gallery.getByRole("link", { name: "Read the published route information" }).click();
  await expect(page.locator('[id="cincinnati-art-museum.mobility.2"]')).toBeInViewport();
  await page.goto("/access-in-pictures");
  await expect(page.locator(".access-photo")).toHaveCount(accessPhotos.length);
  await expect(page.getByRole("link", { name: /Open photo guide/ })).toHaveCount(accessGuides.length);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("photos load with credits and AI examples have visible disclosure", async ({
  page,
}) => {
  await page.goto("/venues/newport-aquarium");
  const photo = page.locator("figure.venue-photo");
  await expect(photo.getByText(/Venue photo/)).toBeVisible();
  await expect(photo.getByRole("link", { name: /Photo:/ })).toBeVisible();
  await expect(photo.locator("img")).toBeVisible();
  await expect
    .poll(() =>
      photo
        .locator("img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await page
    .getByRole("link", { name: "Explore illustrated access features" })
    .click();
  const figures = page.locator("figure.access-illustration");
  await expect(figures).toHaveCount(3);
  for (const figure of await figures.all()) {
    await figure.scrollIntoViewIfNeeded();
    await expect(
      figure.getByText("AI illustration — example setting", { exact: true }),
    ).toBeVisible();
    const img = figure.locator("img");
    await expect(img).toHaveAttribute("alt", /^AI/);
    await expect
      .poll(() =>
        img.evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
});
test("every listing has a labeled visual and illustrated category links filter correctly", async ({
  page,
}) => {
  await page.goto("/venues");
  const cards = page.locator("article.place-card");
  await expect(cards).toHaveCount(places.length);
  await expect(cards.locator("figure img")).toHaveCount(places.length);
  for (const figure of await cards.locator("figure.category-art").all()) {
    await expect(figure.getByText(/AI artwork/)).toBeVisible();
    await expect(
      figure.getByText("Imagined scene, not a photograph of this venue."),
    ).toBeVisible();
  }
  for (const figure of await cards.locator("figure.ai-venue-image").all())
    await expect(
      figure.getByText("AI-generated image · not a photograph"),
    ).toBeVisible();
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore Libraries", exact: true })
    .click();
  await expect(page).toHaveURL(/category=Libraries/);
  await expect(page.getByLabel("Type of place")).toHaveValue("Libraries");
  await page
    .getByRole("link", {
      name: "Boone County Public Library — Walton Branch",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(
    /\/venues\/boone-county-public-library-walton-branch$/,
  );
  const aiImage = page.locator("figure.ai-venue-image");
  await expect(
    aiImage.getByText("AI-generated image · not a photograph"),
  ).toBeVisible();
  await expect(
    aiImage.getByText(/Do not use this image to judge physical access/),
  ).toBeVisible();
  await expect(aiImage.locator("img")).toHaveAttribute("alt", /^AI-generated/);
});
test("disabled community routes never collect information or contact Supabase", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (req) => {
    if (req.url().includes("supabase.co")) external.push(req.url());
  });
  for (const route of [
    "/",
    "/venues",
    "/submit",
    "/profile",
    "/profile/edit",
    "/auth/callback?code=test",
  ]) {
    await page.goto(route);
    if (route !== "/" && route !== "/venues")
      await expect(page).toHaveURL(/\/login$/);
  }
  expect(external).toEqual([]);
  await expect(page.getByRole("textbox")).toHaveCount(0);
  const sample = await page.goto("/reviews/braxton-brewing-company");
  expect(sample?.status()).toBe(404);
});
test("keyboard-only search and mobile navigation, narrow layout and dark theme", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByLabel("Search places or access details"),
  ).toBeFocused();
  await page.keyboard.type("Newport");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toContainText("places found");
  // The search submit is a full page load, and the menu button only responds
  // once the page has hydrated. Retry the click instead of racing hydration
  // (this failed about half the time under parallel load and broke CI).
  await expect(async () => {
    const open = page.getByRole("button", { name: "Open menu" });
    if (await open.isVisible()) await open.click();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible({ timeout: 1000 });
  }).toPass();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Sources", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Know where a detail comes from.",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  // next-themes applies the class after the media change; scanning before it
  // settles samples half-switched colors (a test race, not a user-visible state).
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.body).color))
    .toBe("rgb(237, 237, 237)");
  await page.waitForTimeout(250);
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
});

test("visitor reports preserve context, filter correctly and link back to venue evidence", async ({
  page,
}) => {
  await page.goto("/visitor-reports");
  await expect(page.getByText(/not a representative survey/)).toBeVisible();
  await page
    .getByLabel("Place or experience", { exact: true })
    .fill("touch tour");
  await page.getByLabel("Report area", { exact: true }).selectOption("OH");
  await page
    .getByLabel("Report topic", { exact: true })
    .selectOption("sensory");
  await page.getByRole("button", { name: "Find reports", exact: true }).click();
  const report = page
    .locator("article.visitor-report")
    .filter({ hasText: "Even Grounds" });
  await expect(report).toHaveCount(1);
  await expect(report.getByText(/Published Oct 30, 2023/)).toBeVisible();
  await expect(report.getByText(/Exact visit date unknown/)).toBeVisible();
  await expect(report.getByRole("link")).toHaveAttribute(
    "href",
    "https://evengrounds.com/touch-tour-in-the-cincinnati-art-museum/",
  );
  await page
    .getByRole("link", { name: "Cincinnati Art Museum", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/cincinnati-art-museum#visitor-reports$/);
  await expect(
    page.getByRole("heading", {
      name: "What the venue publishes",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Visitor reports from around the web",
      exact: true,
    }),
  ).toBeVisible();
  await page.goto("/visitor-reports?q=no-report-xyz");
  await expect(
    page.getByText(
      "No reports match these filters. Try another place or topic.",
    ),
  ).toBeVisible();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/visitor-reports");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
});

test("each access note shows its own source type, check date and history", async ({
  page,
}) => {
  await page.goto("/venues/creation-museum");
  const note = page.locator("#creation-museum\\.sensory\\.1");
  const sourceNote = places
    .find((place) => place.slug === "creation-museum")!
    .facts.find((fact) => fact.id === "creation-museum.sensory.1")!;
  await expect(note).toContainText("photosensitive epilepsy");
  await expect(note).toContainText(
    "Venue’s official website · Checked " + dateLabel(sourceNote.retrieved_at),
  );
  const history = note.locator("details.fact-history");
  await expect(history.locator("ol")).toBeHidden();
  await history.locator("summary").click();
  await expect(history).toContainText("Sep 10, 2026");
  await expect(history).toContainText("added its strobe");
  await expect(history).toContainText("creation-museum.sensory.1");
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await page.goto("/venues/boone-county-public-library-walton-branch");
  await expect(page.locator(".fact-meta").first()).toBeVisible();
  await expect(page.getByText("Operating organization’s website").first()).toBeVisible();
  expect(await page.locator(".fact-caution").count()).toBe(0);
  // Retired notes leave the page; their replacements and history remain in data.
  await page.goto("/venues/sharon-woods");
  await expect(page.getByText("blanket statement about accessible paved")).toHaveCount(0);
  await expect(page.locator("#sharon-woods\\.mobility\\.2")).toHaveCount(0);
  await expect(page.getByText("will stay lowered until spring 2027")).toBeVisible();
});

test("recent changes list corrections and withdrawals with links to the note", async ({
  page,
}) => {
  await page.goto("/updates");
  const corrected = page.getByRole("heading", { name: /Corrected/ }).first();
  await expect(corrected).toBeVisible();
  await expect(page.getByText(/photosensitive-epilepsy warning/)).toBeVisible();
  await expect(page.getByText(/Withdrawn wording:.*paved/)).toBeVisible();
  // Later "Added" entries also link to the venue, so target the corrected note's link.
  await page.locator('a[href$="#creation-museum.sensory.1"]').first().click();
  await expect(page).toHaveURL(/\/venues\/creation-museum#creation-museum\.sensory\.1$/);
  await expect(page.locator("#creation-museum\\.sensory\\.1")).toBeInViewport();
});

test("every page reflows at 320px without sideways scrolling (WCAG 1.4.10)", async ({
  page,
}) => {
  const slugs = places.map((p) => `/venues/${p.slug}`);
  await page.setViewportSize({ width: 320, height: 800 });
  const overflowing: string[] = [];
  for (const path of [...routes, ...slugs]) {
    await page.goto(path);
    const fits = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    );
    if (!fits) overflowing.push(path);
  }
  expect(overflowing).toEqual([]);
});

test("a firsthand Threshold review is credited, dated and kept apart from website notes", async ({
  page,
}) => {
  await page.goto("/venues/tql-stadium");
  const review = page.locator("#threshold-review");
  await expect(
    review.getByRole("heading", { name: "What we found when we went" }),
  ).toBeVisible();
  await expect(review).toContainText("Matthew Brothers, Threshold co-owner");
  await expect(review).toContainText("not the venue's policy");
  await expect(
    page.getByRole("link", { name: "Includes a firsthand Threshold review" }),
  ).toHaveAttribute("href", "#threshold-review");
  await page.goto("/venues/ark-encounter");
  await expect(page.locator("#threshold-review")).toHaveCount(0);
  await expect(page.getByText("Not field audited").first()).toBeVisible();
});

test("reviewed places are surfaced on the homepage and in recent changes", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.locator("section", {
    has: page.getByRole("heading", { name: "Firsthand Threshold reviews" }),
  });
  await expect(
    section.getByRole("link", { name: "TQL Stadium" }).first(),
  ).toBeVisible();
  await page.goto("/updates");
  await expect(
    page.getByRole("link", { name: "Bogart’s" }).first(),
  ).toBeVisible();
  await expect(page.getByText(/New Threshold reviews \(6\)/)).toBeVisible();
});

test("navigation marks the current section and hero photos link to real places", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator(".arch-trio");
  await expect(hero.getByRole("link")).toHaveCount(3);
  await expect(page.locator(".arch-credits")).toContainText("Photos:");
  await hero.getByRole("link", { name: /Cincinnati Music Hall/ }).click();
  await expect(page).toHaveURL(/\/venues\/cincinnati-music-hall$/);
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", {
      name: "Browse places",
    }),
  ).toHaveAttribute("aria-current", "page");
  await page.goto("/sources");
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", {
      name: "Sources",
    }),
  ).toHaveAttribute("aria-current", "page");
});


test("place pages offer jump links with note counts", async ({ page }) => {
  const place = places.find((p) => p.slug === "bogarts")!;
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/venues/bogarts");
  const jumps = page.getByRole("navigation", { name: "On this page" });
  const mobility = place.facts.filter(
    (f) => f.domain === "mobility" && f.review_status !== "retired",
  ).length;
  await expect(
    jumps.getByRole("link", { name: /Mobility & getting around/ }),
  ).toContainText(String(mobility));
  await jumps.getByRole("link", { name: /Sensory & communication/ }).click();
  await expect(page).toHaveURL(/#sensory$/);
  await expect(
    page.getByRole("heading", { name: "Sensory & communication" }),
  ).toBeInViewport();
});

test("every place page and the footer offer a way to report a problem", async ({
  page,
}) => {
  await page.goto("/venues/the-carnegie");
  const link = page.getByRole("link", {
    name: /Report a problem with this page/,
  });
  const href = await link.getAttribute("href");
  expect(href).toMatch(/^mailto:/);
  expect(decodeURIComponent(href!)).toContain("The Carnegie");
  expect(decodeURIComponent(href!)).toContain("/venues/the-carnegie");
  await expect(
    page
      .getByRole("navigation", { name: "Footer" })
      .getByRole("link", { name: "Report a problem" }),
  ).toHaveAttribute("href", /^mailto:/);
});
