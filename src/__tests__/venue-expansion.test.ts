import { describe, expect, it } from "vitest";
import { places, findPlaces } from "@/lib/catalog";
import { artForCategory } from "@/lib/media";

const newSlugs = [
  "ludlow-garage", "florence-yalls-thomas-more-stadium", "molly-malones-covington",
  "smoke-justis", "falcon-theatre", "southgate-house-revival",
  "amc-newport-on-the-levee-20", "go-bananas-comedy-club",
];
const place = (slug: string) => places.find((p) => p.slug === slug)!;
const text = (slug: string) => place(slug).facts.map((f) => f.text).join(" ");

describe("November source-backed venue expansion", () => {
  it("adds eight distinct public-source guides without implying a field visit", () => {
    for (const slug of newSlugs) {
      const p = place(slug);
      expect(p).toBeDefined();
      expect(p.evidence_type).toBe("public_website");
      expect(p.observed_at).toBeNull();
      expect(p.limitations).toMatch(/no on-site audit/i);
      for (const f of p.facts) {
        expect(f.source_url).toMatch(/^https:/);
        expect(f.review_status).toBe("source_checked");
        expect(f.observed_at).toBeNull();
        expect(f.retrieved_at).toBe("2026-11-08");
      }
    }
  });
  it("preserves room-specific barriers and entrance distinctions", () => {
    expect(text("ludlow-garage")).toMatch(/east entrance has one step/);
    expect(text("ludlow-garage")).toMatch(/west-side.*Ace Hardware/);
    expect(text("ludlow-garage")).toMatch(/lift.*lower-level/);
    expect(text("smoke-justis")).toMatch(/upstairs.*stairs.*no elevator/);
    expect(text("smoke-justis")).toMatch(/lower-level main dining room/);
    expect(text("molly-malones-covington")).toMatch(/second-floor Pub.*third-floor Ballroom/);
    expect(place("molly-malones-covington").limitations).toMatch(/Private restrooms are not necessarily accessible/);
  });
  it("keeps limited-source venues' route gaps visible", () => {
    expect(place("southgate-house-revival").limitations).toMatch(/Physical access remains unverified/);
    expect(place("southgate-house-revival").limitations).toMatch(/Sanctuary, Revival Room or Lounge/);
    expect(place("amc-newport-on-the-levee-20").limitations).toMatch(/outage alternative/);
    expect(text("amc-newport-on-the-levee-20")).not.toMatch(/kitchen|service elevator/i);
    expect(place("go-bananas-comedy-club").limitations).toMatch(/Physical access remains unverified/);
    expect(text("go-bananas-comedy-club")).toContain("513-873-7233");
  });
  it("dates Bailey sensory guidance and limits dress rules to supporter sections", () => {
    const p = place("tql-stadium");
    expect(text(p.slug)).toMatch(/safe standing without a physical seat/);
    expect(text(p.slug)).toMatch(/Supporter sections prohibit yellow and opposing-team colors/);
    const f = p.facts.find((f) => f.id === "tql-stadium.sensory.3")!;
    expect(f.text).toContain("November 7, 2026 match");
    expect(f.published_at).toBe("2026-11-05");
    expect(f.source_type).toBe("operator_official");
  });
  it("makes food and drink discoverable with explicitly illustrative art", () => {
    expect(findPlaces({ category: "Food & drink" }).map((p) => p.slug).sort()).toEqual([
      "molly-malones-covington", "smoke-justis",
    ]);
    const art = artForCategory("Food & drink")!;
    expect(art.alt).toMatch(/^AI artwork/);
    expect(art.caption).toMatch(/not a view or accessibility assessment/);
  });
  it("uses the precise source and publisher for limited policy claims", () => {
    const imax = place("amc-newport-on-the-levee-20").facts.filter((f) => f.source_url.includes("imax.com"));
    expect(imax).toHaveLength(2);
    expect(imax.every((f) => f.source_type === "partner_official")).toBe(true);
    expect(place("go-bananas-comedy-club").facts[0].source_url).toBe("https://gobananascomedy.com/main/");
    expect(text("florence-yalls-thomas-more-stadium")).toContain("Medically necessary items");
  });
});
