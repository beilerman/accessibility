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
  it("finds Price Hill library and LeBlond recreation with source-limited routes", () => {
    expect(findPlaces({ category: "Libraries", region: "OH" }).map((p) => p.slug)).toContain("price-hill-branch-library");
    expect(place("price-hill-branch-library").address).toBe("970 Purcell Avenue, Cincinnati, OH 45205");
    expect(text("price-hill-branch-library")).toMatch(/designated quiet areas/);
    expect(place("price-hill-branch-library").limitations).toMatch(/entrance thresholds/);
    expect(findPlaces({ category: "Parks & outdoors", region: "OH" }).map((p) => p.slug)).toContain("leblond-recreation-center");
    expect(text("leblond-recreation-center")).toMatch(/connecting the center to St. Rose/);
    expect(place("leblond-recreation-center").limitations).toMatch(/sensory garden is not described as a quiet space/);
    for (const slug of ["price-hill-branch-library", "leblond-recreation-center"]) {
      expect(place(slug).observed_at).toBeNull();
      expect(place(slug).limitations).toMatch(/no on-site audit/);
    }
  });
  it("finds Fort Wright shopping with local sensory hours and scoped chain policies", () => {
    const slug = "walmart-supercenter-fort-wright";
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("3450 Valley Plaza Pkwy, Fort Wright, KY 41017");
    expect(text(slug)).toMatch(/every day, 8–10 a.m./);
    expect(text(slug)).toMatch(/lowering lights where possible/);
    expect(text(slug)).toMatch(/Sorenson QR code/);
    expect(place(slug).limitations).toMatch(/rather than observations at this branch/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Cold Spring as a Kentucky library with curbside conditions and explicit building gaps", () => {
    const slug = "campbell-county-public-library-cold-spring-branch";
    expect(findPlaces({ category: "Libraries", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("3920 Alexandria Pike, Cold Spring, KY 41076");
    expect(text(slug)).toMatch(/digital-only card does not qualify/);
    expect(text(slug)).toMatch(/county residents/i);
    expect(place(slug).limitations).toMatch(/Entrance thresholds.*remain unverified/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("preserves park route barriers and conflicting public-facility notices", () => {
    expect(text("big-bone-lick-state-historic-site")).toMatch(/gravel after 0.2 mile/);
    expect(text("big-bone-lick-state-historic-site")).toMatch(/62 cedar stairs/);
    expect(text("big-bone-lick-state-historic-site")).toMatch(/closed until further notice/);
    expect(text("big-bone-lick-state-historic-site")).toMatch(/mid-November to mid-March/);
    expect(text("bettman-nature-preserve")).toMatch(/These statements are not reconciled/);
    expect(place("bettman-nature-preserve").limitations).toMatch(/restroom availability are unresolved/);
  });
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
        // Guides were added on November 8; later notes may be read on later dates.
        expect(f.retrieved_at >= "2026-11-08").toBe(true);
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
    // A firsthand Threshold review now covers the stages; the website still says nothing.
    expect(place("southgate-house-revival").limitations).toMatch(/website does not describe physical access/);
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
      "findlay-market", "jungle-jims-fairfield", "molly-malones-covington", "rhinegeist-brewery", "smoke-justis",
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
