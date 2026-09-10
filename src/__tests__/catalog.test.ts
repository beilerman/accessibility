import { describe, it, expect } from "vitest";
import { places, findPlaces, DOMAIN_LABELS } from "@/lib/catalog";
import { getVenues, getEditorialReviews, getFeaturedReview } from "@/lib/data";

describe("Public-source evidence contract", () => {
  it("retains per-fact primary links and distinguishes research from visits", () => {
    expect(places.length).toBeGreaterThanOrEqual(30);
    expect(new Set(places.map((p) => p.slug)).size).toBe(places.length);
    expect(
      places.filter((p) => p.state === "KY").length,
    ).toBeGreaterThanOrEqual(10);
    expect(
      places.filter((p) => p.state === "OH").length,
    ).toBeGreaterThanOrEqual(10);
    for (const p of places) {
      expect(p.evidence_type).toBe("public_website");
      expect(p.observed_at).toBeNull();
      expect(p.checked_at).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.limitations).toBeTruthy();
      expect(p.facts.length).toBeGreaterThan(0);
      for (const f of p.facts) {
        expect(new URL(f.source_url).protocol).toBe("https:");
        expect(Object.keys(DOMAIN_LABELS)).toContain(f.domain);
        expect(f.text.length).toBeGreaterThan(10);
      }
    }
  });
  it("combines text, location, category and information coverage without a fit score", () => {
    const selected = findPlaces({
      q: "wheelchair",
      region: "KY",
      category: "Libraries",
      domain: "mobility",
    });
    expect(selected.length).toBeGreaterThan(0);
    expect(
      selected.every((p) => p.state === "KY" && p.category === "Libraries"),
    ).toBe(true);
    expect(findPlaces({ q: "zz-no-such-place" })).toEqual([]);
    expect(findPlaces({ city: "Newport", region: "OH" })).toEqual([]);
  });
  it("never exposes legacy generated reviews while the community system is gated", async () => {
    expect(await getVenues()).toEqual([]);
    expect(await getEditorialReviews()).toEqual([]);
    expect(await getFeaturedReview()).toBeNull();
  });
});
