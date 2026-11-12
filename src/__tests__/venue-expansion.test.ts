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
  it("keeps Boone Woods' shelter-office conflict separate from the park arrival address", () => {
    const slug = "boone-woods-park";
    expect(place(slug).address).toBe("6000 Veterans Way, Burlington, KY 41005");
    expect(place(slug).limitations).toMatch(/5958 Garrard Street.*3920 Maplewood Drive.*3290 Maplewood Drive/);
    expect(text(slug)).toMatch(/April–November/);
    expect(text(slug)).toMatch(/24 hours ahead/);
    const note = place(slug).facts.find((f) => f.id === "boone-woods-park.chronic.2")!;
    expect(note.history.at(-1)?.action).toBe("revised");
  });

  it("finds West Chester shopping with local pickup steps and scoped equipment policies", () => {
    const slug = "ikea-west-chester";
    expect(findPlaces({ category: "Shopping", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("9500 IKEA Way, West Chester, OH 45069");
    expect(text(slug)).toMatch(/Store Entrance Lobby/);
    expect(text(slug)).toMatch(/does not offer motorized scooters/);
    expect(text(slug)).toMatch(/loading help to back in/);
    expect(text(slug)).toMatch(/through the store exit, turning left/);
    expect(text(slug)).toMatch(/does not establish adult-changing equipment/);
    expect(place(slug).limitations).toMatch(/U.S. chain policies/);
    expect(place(slug).observed_at).toBeNull();
  });

  it("finds Florence shopping while dating the sensory event and preserving route gaps", () => {
    const slug = "florence-mall";
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("2028 Florence Mall, Florence, KY 41042");
    expect(text(slug)).toMatch(/accessible parking spaces are near every entrance/);
    expect(text(slug)).toMatch(/December 6, 2026, 8:30–9:30 a.m./);
    expect(text(slug)).toMatch(/not a daily quiet-hour program/);
    expect(place(slug).limitations).toMatch(/current elevator locations and operation/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("keeps Chapin's unstaffed procedures and Saturday source difference visible", () => {
    const slug = "boone-county-public-library-chapin-memorial";
    expect(text(slug)).toMatch(/No library staff are on site/);
    expect(text(slug)).toMatch(/government-issued photo ID/);
    expect(text(slug)).toMatch(/public-address announcements/);
    expect(place(slug).limitations).toMatch(/branch page omits it/);
    expect(place(slug).limitations).toMatch(/wheelchair-loan and curbside lists do not include Chapin/);
  });

  it("finds Newport shopping while keeping chain support separate from premises evidence", () => {
    const slug = "target-newport";
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("160 Pavilion Pkwy, Newport, KY 41071-2884");
    expect(text(slug)).toMatch(/without leaving the car/);
    expect(text(slug)).toMatch(/free Aira visual assistance/);
    expect(place(slug).limitations).toMatch(/chain policies rather than observations/);
    expect(place(slug).limitations).toMatch(/Newport installation is not established/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("keeps TANK service types, fare conflicts and package-assistance limits visible", () => {
    const slug = "tank-transit-authority-of-northern-kentucky";
    expect(text(slug)).toMatch(/does not establish that every address/);
    expect(text(slug)).toMatch(/does not pull into driveways/);
    expect(text(slug)).toMatch(/Operators are not permitted to help passengers with packages/);
    expect(text(slug)).toMatch(/November 7, 2026.*Southbank Shuttle and Route 16 are replaced/);
    expect(text(slug)).toMatch(/six-mile distance cap/);
    expect(place(slug).limitations).toMatch(/\$1.*\$0\.75.*unresolved/);
    expect(place(slug).limitations).toMatch(/Individual stop pavement/);
  });
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
