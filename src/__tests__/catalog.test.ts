import { describe, it, expect } from "vitest";
import {
  places,
  findPlaces,
  DOMAIN_LABELS,
  SOURCE_TYPE_LABELS,
  allFacts,
  factNeedsCaution,
  recheckDueDate,
  latestRetrieval,
  catalogChanges,
} from "@/lib/catalog";
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
  it("gives every fact its own stable ID, publisher type, dates and history", () => {
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    const ids = allFacts.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const f of allFacts) {
      expect(f.id).toMatch(new RegExp(`^${f.place.slug}\\.${f.domain}\\.\\d+$`));
      expect(Object.keys(SOURCE_TYPE_LABELS)).toContain(f.source_type);
      expect(["source_checked", "needs_recheck", "source_unavailable", "retired"]).toContain(
        f.review_status,
      );
      expect(f.retrieved_at).toMatch(iso);
      expect(f.published_at === null || iso.test(f.published_at)).toBe(true);
      // Reading a website never establishes a visit.
      expect(f.observed_at).toBeNull();
      // History is append-only and chronological, starting with the addition.
      expect(f.history[0].action).toBe("added");
      const dates = f.history.map((h) => h.date);
      expect([...dates].sort()).toEqual(dates);
      for (const h of f.history) expect(h.note.length).toBeGreaterThan(10);
      // The retrieval date is the most recent time an editor read the source.
      const lastRead = f.history
        .filter((h) => h.action !== "flagged" && h.action !== "retired")
        .map((h) => h.date)
        .at(-1);
      expect(f.retrieved_at).toBe(lastRead);
      // A source on another domain must be explicitly classified.
      if (new URL(f.source_url).hostname.split(".").slice(-2).join(".") !==
          new URL(f.place.website).hostname.split(".").slice(-2).join("."))
        expect(f.source_type).not.toBe("venue_official");
    }
    for (const p of places) expect(p.checked_at <= latestRetrieval(p)).toBe(true);
  });
  it("hides retired facts from the site but keeps their record", () => {
    const retired = allFacts.filter((f) => f.review_status === "retired");
    for (const f of retired) {
      expect(f.history.at(-1)!.action).toBe("retired");
      const shown = places.find((p) => p.slug === f.place.slug)!;
      expect(shown.facts.some((x) => x.id === f.id)).toBe(false);
    }
    expect(places.every((p) => p.facts.length > 0)).toBe(true);
  });
  it("cautions on facts that are flagged or overdue for a recheck", () => {
    expect(recheckDueDate({ retrieved_at: "2026-09-10" })).toBe("2027-03-09");
    const fresh = { retrieved_at: "2026-09-10", review_status: "source_checked" as const };
    expect(factNeedsCaution(fresh, "2027-03-09")).toBe(false);
    expect(factNeedsCaution(fresh, "2027-03-10")).toBe(true);
    expect(
      factNeedsCaution({ ...fresh, review_status: "needs_recheck" }, "2026-09-11"),
    ).toBe(true);
  });
  it("lists editorial changes newest first and counts routine rechecks", () => {
    const { changes, rechecks } = catalogChanges();
    const dates = changes.map((c) => c.date);
    expect([...dates].sort().reverse()).toEqual(dates);
    expect(changes.some((c) => c.action === "rechecked" as never)).toBe(false);
    // The safety-relevant Creation Museum revision is visible.
    expect(
      changes.some((c) => c.action === "revised" && c.fact.id === "creation-museum.sensory.1"),
    ).toBe(true);
    // Retired notes appear, with their withdrawn text still available.
    const retired = changes.find((c) => c.fact.id === "sharon-woods.mobility.2");
    expect(retired?.action).toBe("retired");
    expect(retired?.fact.text).toMatch(/paved/);
    // Initial September catalog additions are summarized, not listed.
    expect(changes.some((c) => c.action === "added" && c.date === "2026-09-10")).toBe(false);
    const total = allFacts.flatMap((f) => f.history).filter((h) => h.action === "rechecked").length;
    expect(rechecks.reduce((n, r) => n + r.count, 0)).toBe(total);
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
