import { describe, expect, it } from "vitest";
import { teamReviews } from "@/lib/team-reviews";
import { DOMAIN_LABELS, places } from "@/lib/catalog";

describe("Threshold team reviews", () => {
  it("attach to listed places and carry a byline, context and date", () => {
    expect(new Set(teamReviews.map((r) => r.placeSlug)).size).toBe(
      teamReviews.length,
    );
    for (const r of teamReviews) {
      expect(places.some((p) => p.slug === r.placeSlug)).toBe(true);
      expect(r.reviewer).toBeTruthy();
      expect(r.reviewerRole).toMatch(/Threshold/);
      expect(r.visitContext).toBeTruthy();
      expect(r.reportedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (r.visitedAt) expect(r.visitedAt <= r.reportedAt).toBe(true);
      expect(r.points.length).toBeGreaterThan(0);
      for (const p of r.points) {
        expect(Object.keys(DOMAIN_LABELS)).toContain(p.domain);
        expect(p.text.length).toBeGreaterThan(10);
      }
    }
  });
  it("names no individual venue staff", () => {
    const text = teamReviews.flatMap((r) => r.points.map((p) => p.text)).join(" ");
    expect(text).not.toMatch(/Elliott|Cliff/);
  });
  it("shows the club's differing description alongside our Bailey finding", () => {
    const tql = teamReviews.find((r) => r.placeSlug === "tql-stadium")!;
    const bailey = tql.points.find((p) => p.text.includes("accessible seating level with the mezzanine"))!;
    expect(bailey.text).toMatch(/describes the Bailey as standing only/);
  });
});
