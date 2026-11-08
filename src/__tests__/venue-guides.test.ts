import { describe, expect, it } from "vitest";
import { findPlaces, places } from "@/lib/catalog";
import { reportsForPlace } from "@/lib/visitor-reports";

const slugs = ["riverbend-music-center", "bogarts"];

describe("Reviewed concert venue guides", () => {
  it.each(slugs)("keeps %s source research distinct from field reports", (slug) => {
    const place = places.find((p) => p.slug === slug)!;
    expect(place).toBeDefined();
    expect(place.evidence_type).toBe("public_website");
    expect(place.observed_at).toBeNull();
    expect(place.checked_at).toBe("2026-11-08");
    expect(place.limitations).toContain("no on-site audit");
    expect(reportsForPlace(slug)).toEqual([]);
    expect(new Set(place.facts.map((f) => f.domain)).size).toBe(4);
    for (const fact of place.facts) {
      expect(fact.source_type).toBe("venue_official");
      expect(fact.review_status).toBe("source_checked");
      expect(fact.observed_at).toBeNull();
      expect(fact.published_at).toBeNull();
      expect(fact.retrieved_at).toBe("2026-11-08");
      expect(new URL(fact.source_url).hostname.replace(/^www\./, "")).toBe(
        new URL(place.website).hostname.replace(/^www\./, ""),
      );
    }
    expect(findPlaces({ q: place.name, domain: "mobility" })).toContain(place);
  });

  it("preserves the Riverbend advance versus on-site companion distinction", () => {
    const place = places.find((p) => p.slug === slugs[0])!;
    const companions = place.facts.find((f) => f.id.endsWith("mobility.2"))!;
    expect(companions.text).toContain("up to three companions");
    expect(companions.text).toContain("one companion for on-site reseating");
    expect(place.limitations).toContain("Do not rely on day-of reseating");
    expect(place.limitations).toContain("conflicting private-pickup locations");
  });

  it("does not equate Bogart’s ticket policy with guaranteed space or upstairs access", () => {
    const place = places.find((p) => p.slug === slugs[1])!;
    expect(place.facts.find((f) => f.id.endsWith("mobility.1"))!.text).toContain(
      "does not establish guaranteed space or companion seating",
    );
    expect(place.facts.find((f) => f.id.endsWith("mobility.2"))!.text).toContain(
      "There is no elevator to the upstairs level",
    );
    expect(place.limitations).toContain("exact entrance-to-mezzanine route");
    expect(place.limitations).toContain("lift dimensions and operation");
  });
});
