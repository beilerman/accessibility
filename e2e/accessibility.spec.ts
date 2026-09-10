import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/venues",
  "/venues/newport-aquarium",
  "/about",
  "/sources",
  "/accessibility",
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
