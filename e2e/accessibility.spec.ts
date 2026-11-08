import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/venues",
  "/venues/newport-aquarium",
  "/about",
  "/sources",
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
  await expect(page.getByRole("status")).toContainText("32 places found");
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
  await expect(cards).toHaveCount(32);
  await expect(cards.locator("figure img")).toHaveCount(32);
  for (const figure of await cards.locator("figure.category-art").all()) {
    await expect(figure.getByText(/AI artwork/)).toBeVisible();
    await expect(
      figure.getByText("Imagined scene, not a photograph of this venue."),
    ).toBeVisible();
  }
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
  await expect(
    page
      .locator("figure.category-art")
      .getByText("AI artwork · Libraries", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("figure.category-art img")).toHaveAttribute(
    "alt",
    /^AI/,
  );
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
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
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
  await expect(note).toContainText("photosensitive epilepsy");
  await expect(note).toContainText("Venue’s official website · Checked Nov 8, 2026");
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

