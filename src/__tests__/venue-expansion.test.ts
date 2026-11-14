import { describe, expect, it } from "vitest";
import { places, findPlaces } from "@/lib/catalog";
import { artForCategory } from "@/lib/media";

const newSlugs = [
  "nku-care-closet",
  "we-rock-spectrum-northern-kentucky", "fei-house-covington", "wondercade-westwood",
  "lehrs-prime-market-milford", "seafood-station-loveland",
  "boone-county-drive-thru-food-pantry", "action-ministries-covington",
  "metronow-on-demand", "dorothy-lane-market-mason", "university-cincinnati-campus-recreation-center",
  "bayley-fitness-club-delhi",
  "trihealth-fitness-health-pavilion", "powel-crosley-jr-ymca", "silverlake-family-place-erlanger",
  "fifty-west-wooster-pike", "fords-garage-norwood",
  "campbell-county-ymca", "central-parkway-ymca",
  "ohio-valley-antique-mall",
  "handzy-shop-studio-covington",
  "kentucky-driver-licensing-burlington",
  "kentucky-driver-licensing-independence",

  "joseph-beth-booksellers-rookwood",
  "poor-charlottes-books-covington", "blue-marble-books-fort-thomas",
  "book-bus-depot-sharonville", "sharonville-city-hall",
  "cincinnati-bus-station-galbraith",
  "ink-dayton", "major-minor-books-silverton",
  "fabled-brew-works", "remke-markets-taylor-mill",
  "walton-post-office",
  "farbach-werner-nature-preserve",
  "glenwood-gardens",
  "fernald-preserve",
  "arco-arts-community",
  "brink-brewing-college-hill",
  "little-miami-brewing-company",
  "streetside-brewery",

  "fort-thomas-coffee", "junipers-gin-bar-covington", "mellow-mushroom-wilder", "olla-taqueria-covington",
  "element-eatery", "schoolhouse-restaurant-camp-dennison",
  "fretboard-brewing-blue-ash", "wabi-sabi-covington",
  "ludlow-garage", "florence-yalls-thomas-more-stadium", "molly-malones-covington",
  "smoke-justis", "falcon-theatre", "southgate-house-revival",
  "amc-newport-on-the-levee-20", "go-bananas-comedy-club",
];
const place = (slug: string) => places.find((p) => p.slug === slug)!;
const text = (slug: string) => place(slug).facts.map((f) => f.text).join(" ");

describe("November source-backed venue expansion", () => {
  it("keeps indoor-play supervision, care availability and upstairs seating boundaries", () => {
    expect(findPlaces({ category: "Recreation & fitness", region: "KY" }).map((p) => p.slug)).toContain("we-rock-spectrum-northern-kentucky");
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toContain("wondercade-westwood");
    expect(findPlaces({ category: "Food & drink", region: "KY" }).map((p) => p.slug)).toContain("fei-house-covington");
    expect(findPlaces({ category: "Public services", region: "KY" }).map((p) => p.slug)).toContain("nku-care-closet");
    expect(text("nku-care-closet")).toContain("Spring 2026");
    expect(text("nku-care-closet")).toContain("All Card");
    expect(text("nku-care-closet")).toContain("Clothing donations are not generally accepted");
    const gym = text("we-rock-spectrum-northern-kentucky");
    expect(gym).toContain("one adult guest for every four children");
    expect(gym).toContain("one non-staff adult for every three children");
    expect(gym).toContain("Services Coming Soon!");
    expect(gym).toContain("not stated as general open-play admission rules");
    expect(text("fei-house-covington")).toContain("low-floor seating");
    expect(place("fei-house-covington").limitations).toContain("another entrance or lift");
    expect(text("wondercade-westwood")).toContain("Under-18s are welcome before 9 p.m.");
    expect(text("bettman-nature-preserve")).toContain("July 26, 2020");
    expect(text("bettman-nature-preserve")).not.toContain("trail winding");
  });

  it("finds transport, shopping and community recreation with service boundaries intact", () => {
    expect(findPlaces({ category: "Transportation", region: "OH" }).map((p) => p.slug)).toContain("metronow-on-demand");
    expect(findPlaces({ category: "Shopping", region: "OH" }).map((p) => p.slug)).toContain("dorothy-lane-market-mason");
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toContain("university-cincinnati-campus-recreation-center");
    expect(text("metronow-on-demand")).toContain("Less Walking");
    expect(text("metronow-on-demand")).toContain("Operators are not permitted to help with packages");
    expect(place("metronow-on-demand").limitations).toContain("separate from eligibility-based Access");
    expect(text("dorothy-lane-market-mason")).toContain("mezzanine");
    expect(place("dorothy-lane-market-mason").limitations).toContain("Washington Square pickup");
    expect(text("university-cincinnati-campus-recreation-center")).toContain("specific to the leisure pool");
    expect(text("university-cincinnati-campus-recreation-center")).toContain("student-only");
    expect(place("university-cincinnati-campus-recreation-center").limitations).toContain("Pool closing information conflicts");
  });

  it("keeps recreation region, pool-entry scope and assistance conditions distinct", () => {
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toEqual(expect.arrayContaining([
      "trihealth-fitness-health-pavilion", "powel-crosley-jr-ymca", "bayley-fitness-club-delhi",
    ]));
    expect(findPlaces({ category: "Recreation & fitness", region: "KY" }).map((p) => p.slug)).toContain("silverlake-family-place-erlanger");
    expect(text("bayley-fitness-club-delhi")).toContain("72 hours");
    expect(text("bayley-fitness-club-delhi")).toContain("during scheduled classes");
    expect(place("bayley-fitness-club-delhi").address).toContain("401 Farrell Court");
    expect(text("trihealth-fitness-health-pavilion")).toContain("does not cover the indoor pools");
    expect(text("trihealth-fitness-health-pavilion")).toContain("not permitted to physically assist");
    expect(text("trihealth-fitness-health-pavilion")).toContain("at all times");
    expect(text("powel-crosley-jr-ymca")).toContain("cannot reserve classes or lap swim");
    expect(text("powel-crosley-jr-ymca")).toContain("table has no year");
    expect(text("silverlake-family-place-erlanger")).toContain("24 hours ahead");
    expect(text("silverlake-family-place-erlanger")).toContain("Water Park guests are permitted only Monday–Friday");
    expect(text("campbell-county-public-library-newport-branch")).toContain("Presidents Room is on the lower level");
    expect(text("kenton-county-public-library-covington-branch")).not.toContain("November 13, 2026");
  });

  it("keeps branch and shared restaurant policy scope distinct", () => {
    expect(place("fifty-west-wooster-pike").address).toContain("7605 Wooster Pike");
    expect(text("fifty-west-wooster-pike")).toContain("directory lists three");
    expect(text("fifty-west-wooster-pike")).toContain("no servers");
    expect(text("fifty-west-wooster-pike")).toContain("all skating availability dependent on weather");
    expect(place("fords-garage-norwood").city).toBe("Norwood");
    expect(text("fords-garage-norwood")).toContain("digital-access contact");
    expect(text("fords-garage-norwood")).toContain("not a promise of quiet");
  });
  it("finds both YMCA branches without turning guest rules into pool reservations", () => {
    expect(findPlaces({ category: "Recreation & fitness", region: "KY" }).map((p) => p.slug)).toContain("campbell-county-ymca");
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toContain("central-parkway-ymca");
    for (const slug of ["campbell-county-ymca", "central-parkway-ymca"]) {
      expect(text(slug)).toContain("cannot reserve classes or lap swim");
      expect(text(slug)).toContain("at all times");
      expect(text(slug)).toContain("members aged 18 or older");
      expect(text(slug)).toContain("first visit");
      expect(place(slug).observed_at).toBeNull();
    }
    expect(text("mt-auburn-indoor-pool")).toContain("That session has ended");
    expect(text("cincinnati-recycling-reuse-hub")).toContain("pre-sort recycling as much as possible");
  });
  it("keeps Fairfield wheelchair provision separate from historical motorized-cart reports", () => {
    const slug = "ohio-valley-antique-mall";
    expect(findPlaces({ category: "Shopping", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).city).toBe("Fairfield");
    expect(text(slug)).not.toMatch(/motorized carts/);
    expect(text(slug)).toContain("merchandise, not lifting or transferring visitors");
    expect(place(slug).limitations).toContain("Christmas Eve opening is unresolved");
  });
  it("separates regional licensing procedures from curbside service and County Clerk hours", () => {
    const slugs = ["kentucky-driver-licensing-burlington", "kentucky-driver-licensing-independence"];
    expect(findPlaces({ category: "Public services", region: "KY" }).map((p) => p.slug)).toEqual(expect.arrayContaining(slugs));
    for (const slug of slugs) {
      expect(text(slug)).toContain("not an every-Saturday schedule");
      expect(text(slug)).toContain("without a mobile device");
      expect(place(slug).limitations).toContain("Phone check-in is not curbside licensing");
      expect(text(slug)).toContain("KSP testing procedure");
      expect(text(slug)).toContain("does not confirm which format is offered at this branch");
      expect(place(slug).observed_at).toBeNull();
    }
    expect(place(slugs[0]).address).toContain("Suite 200");
    expect(place(slugs[1]).address).toContain("1655 Delaware Crossing");
    expect(text("kenton-county-government-center")).toContain("separate from the County Clerk’s hours");
  });
  it("finds Handzy at West 6th Street without turning local pickup into vehicle handoff", () => {
    const slug = "handzy-shop-studio-covington";
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("421 W. 6th Street, Covington, KY 41011");
    expect(text(slug)).toContain("holiday hours");
    expect(text(slug)).toContain("does not explain the collection point");
    expect(text(slug)).toContain("maximum of eight attendees");
    expect(place(slug).observed_at).toBeNull();
  });

  it("finds Rookwood phone-order support without promoting the historical elevator report to an official fact", () => {
    const slug = "joseph-beth-booksellers-rookwood";
    expect(findPlaces({ category: "Shopping", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(text(slug)).toContain("online orders are temporarily paused");
    expect(text(slug)).not.toMatch(/elevator/i);
    expect(place(slug).limitations).toContain("current location, operation and dimensions remain unverified");
    expect(place(slug).observed_at).toBeNull();
  });
  it("keeps neighborhood bookshops in their actual regions with source scope intact", () => {
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toEqual(expect.arrayContaining([
      "poor-charlottes-books-covington", "blue-marble-books-fort-thomas",
    ]));
    expect(place("poor-charlottes-books-covington").address).toContain("Covington, KY");
    expect(text("blue-marble-books-fort-thomas")).not.toMatch(/accessible restrooms/i);
    expect(text("blue-marble-books-fort-thomas")).toContain("not described as a quiet room");
    expect(findPlaces({ category: "Shopping", region: "OH" }).map((p) => p.slug)).toContain("book-bus-depot-sharonville");
    expect(text("book-bus-depot-sharonville")).toContain("10090 Reading Road");
    expect(text("book-bus-depot-sharonville")).toContain("10900 Reading Road");
    expect(text("book-bus-depot-sharonville")).toContain("not a promise of unloading or carrying help");
  });
  it("finds City Hall services without treating the drop box as a building access audit", () => {
    expect(findPlaces({ category: "Public services", region: "OH" }).map((p) => p.slug)).toContain("sharonville-city-hall");
    expect(text("sharonville-city-hall")).toContain("only for tax documents and payments");
    expect(text("sharonville-city-hall")).toContain("at least one week");
    expect(place("sharonville-city-hall").limitations).toContain("unfilled adoption date");
    expect(place("sharonville-city-hall").observed_at).toBeNull();
  });
  it("separates historical CTC instructions and the Newport-linked grocery FAQ", () => {
    expect(text("clermont-transportation-connection-dial-a-ride")).toContain("historical brochure wording");
    const faq = place("fresh-thyme-market-newport").facts.filter((f) => f.source_url.includes("pickup-and-delivery"));
    expect(faq).toHaveLength(7);
    expect(faq.every((f) => f.source_url.includes("/rsid/104/"))).toBe(true);
  });
  it("separates the Galbraith station from national assistance and carrier limits", () => {
    const slug = "cincinnati-bus-station-galbraith";
    expect(findPlaces({ category: "Transportation", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(text(slug)).toContain("Waldman Drive");
    expect(text(slug)).toContain("not confirmation of 24-hour staffing");
    expect(text(slug)).toContain("1,000 lb is not a universal allowance");
    expect(text(slug)).toContain("does not promise staff lifting");
    expect(place(slug).limitations).toContain("National rules do not establish station toilets");
    expect(place(slug).observed_at).toBeNull();
  });
  it("keeps each bookstore's entrance warning with its correct location", () => {
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain("ink-dayton");
    expect(findPlaces({ category: "Shopping", region: "OH" }).map((p) => p.slug)).toContain("major-minor-books-silverton");
    expect(text("ink-dayton")).toContain("one step");
    expect(text("ink-dayton")).not.toMatch(/accessible restroom/i);
    expect(text("major-minor-books-silverton")).toContain("ramp must be requested");
    expect(place("ink-dayton").address).toContain("Dayton, KY");
    expect(place("major-minor-books-silverton").observed_at).toBeNull();
  });
  it("finds Taylor Mill groceries and Erlanger dining with unresolved access conditions intact", () => {
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain("remke-markets-taylor-mill");
    expect(findPlaces({ category: "Food & drink", region: "KY" }).map((p) => p.slug)).toContain("fabled-brew-works");
    expect(place("remke-markets-taylor-mill").limitations).toContain("disagree on hours");
    expect(place("remke-markets-taylor-mill").limitations).toContain("does not establish curbside collection");
    expect(text("fabled-brew-works")).toContain("may frighten or excite");
    expect(place("fabled-brew-works").address).toContain("Suite 300");
    expect(place("fabled-brew-works").observed_at).toBeNull();
  });
  it("finds the postal service and outdoor additions in their location categories", () => {
    expect(findPlaces({ category: "Public services", region: "KY" }).map((p) => p.slug)).toContain("walton-post-office");
    expect(findPlaces({ category: "Parks & outdoors", region: "OH" }).map((p) => p.slug)).toEqual(expect.arrayContaining([
      "farbach-werner-nature-preserve", "glenwood-gardens", "fernald-preserve",
    ]));
    expect(place("walton-post-office").address).toBe("52 S Main Street, Walton, KY 41094");
    expect(text("walton-post-office")).toContain("written permission");
    expect(place("farbach-werner-nature-preserve").limitations).toContain("descriptions are unresolved");
    expect(text("glenwood-gardens")).toContain("notice gives no year");
    expect(place("fernald-preserve").limitations).toContain("disagree on conference-style room capacity");
  });
  it("finds the new NKY dining locations with physical and sensory limits intact", () => {
    const slugs = ["junipers-gin-bar-covington", "mellow-mushroom-wilder", "olla-taqueria-covington"];
    expect(findPlaces({ category: "Food & drink", region: "KY" }).map((p) => p.slug)).toEqual(expect.arrayContaining(slugs));
    expect(text(slugs[0])).toContain("while the bar remains open to the public");
    expect(place(slugs[0]).limitations).toContain("adult changing equipment separately");
    expect(place(slugs[1]).address).toBe("1014 Town Drive, Wilder, KY 41076");
    expect(text(slugs[1])).toContain("does not establish curbside handoff");
    expect(text(slugs[2])).toContain("does not establish step-free patio access");
    expect(text(slugs[2])).toContain("5% fee");
    expect(findPlaces({ category: "Food & drink", region: "KY" }).map((p) => p.slug)).toContain("fort-thomas-coffee");
    expect(text("fort-thomas-coffee")).toContain("only when the Cannon Event Suite is not rented");
    expect(place("fort-thomas-coffee").limitations).toContain("not a guaranteed quiet retreat");
    for (const slug of [...slugs, "fort-thomas-coffee"]) expect(place(slug).observed_at).toBeNull();
  });
  it("finds Edmondson Road groceries without assuming branch curbside or personal assistance", () => {
    const slug = "whole-foods-market-cincinnati";
    expect(findPlaces({ category: "Shopping", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("2693 Edmondson Road, Cincinnati, OH 45209-1910");
    expect(text(slug)).toContain("some stores require indoor collection");
    expect(text(slug)).toContain("a curbside bay at Edmondson Road has not been verified");
    expect(place(slug).limitations).toContain("not personal assistance or indoor carrying");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Florence grocery collection without extending car-loading help to personal assistance", () => {
    const slug = "gordon-food-service-florence";
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("5885 Merchants, Florence, KY 41042");
    expect(text(slug)).toContain("staff will help load the order into the car");
    expect(text(slug)).toContain("not a verified phone-order service");
    expect(place(slug).limitations).toContain("do not merge their ordering workflows");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Dunham recreation while preserving seasonal pool and assistance limits", () => {
    const slug = "dunham-recreation-center-pool";
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("4356 Dunham Lane, Cincinnati, OH 45238");
    expect(text(slug)).toContain("not confirmation of November opening or a 2027 season");
    expect(text(slug)).toContain("Other guests already inside may stay and swim");
    expect(place(slug).limitations).toContain("not guaranteed staffing or equipment at Dunham");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Burlington recreation while preserving conflicting pool status and outdoor entry scope", () => {
    const slug = "rc-durr-ymca";
    expect(findPlaces({ category: "Recreation & fitness", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("5874 Veterans Way, Burlington, KY 41005");
    expect(text(slug)).toContain("without a year");
    expect(text(slug)).toContain("does not establish an indoor-pool entry method");
    expect(place(slug).limitations).toContain("are unresolved; confirm operation directly");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Madison Road groceries while preserving collection and assistance limits", () => {
    const slug = "fresh-market-madison-road";
    expect(findPlaces({ category: "Shopping", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("3088 Madison Rd, Cincinnati, OH");
    expect(text(slug)).toContain("have groceries brought to your car");
    expect(place(slug).limitations).toContain("not an observed transaction");
    expect(place(slug).limitations).toContain("No claim of trunk loading or indoor delivery assistance");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Newport hardware pickup while preserving collection and delivery limits", () => {
    const slug = "great-lakes-ace-newport";
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("82 Carothers Road, Newport, KY 41071");
    expect(text(slug)).toContain("wait for the email confirming the order is ready");
    expect(text(slug)).toContain("call the store number in the confirmation email");
    expect(place(slug).limitations).toContain("not a promise of lifting, trunk loading");
    expect(place(slug).limitations).toContain("no on-site audit");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Covington thrift shopping and self-serve food without promising physical access or staff help", () => {
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain("thrifting-on-eastern");
    expect(place("thrifting-on-eastern").address).toBe("2014 Eastern Ave, Covington, KY 41014");
    expect(place("thrifting-on-eastern").limitations).toContain("lower approach is outside the frame");
    expect(findPlaces({ category: "Public services", region: "KY" }).map((p) => p.slug)).toContain("covunity-fridge-redden-gardens");
    expect(text("covunity-fridge-redden-gardens")).toContain("no staff present");
    expect(place("covunity-fridge-redden-gardens").limitations).toContain("not the separate Banklick Street fridge");
    expect(findPlaces({ category: "Public services", region: "KY" }).map((p) => p.slug)).toContain("covunity-fridge-banklick-street");
    expect(place("covunity-fridge-banklick-street").address).toBe("1214 Banklick St, Covington, KY 41011");
    expect(text("covunity-fridge-banklick-street")).toContain("no staff present");
    expect(text("covunity-fridge-banklick-street")).toContain("not established at this second location");
    expect(place("covunity-fridge-banklick-street").limitations).toContain("separate from Redden Gardens");
  });
  it("finds Covington food assistance while preserving registration conflicts and delivery limits", () => {
    const slug = "be-concerned-covington";
    expect(findPlaces({ category: "Public services", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("1100 Pike Street, Covington, KY 41011");
    expect(text(slug)).toContain("delivery is not guaranteed");
    expect(text(slug)).toContain("former United Ministries building in Erlanger is no longer operating");
    expect(place(slug).limitations).toContain("Registration hours conflict");
    expect(place(slug).limitations).toContain("carrying/loading assistance remain unverified");
    expect(place(slug).limitations).toContain("no on-site audit");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Northside food assistance while preserving the stair barrier and separate building routes", () => {
    const slug = "cain-the-market";
    expect(findPlaces({ category: "Public services", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("4230 Hamilton Avenue, Cincinnati, OH 45223");
    expect(text(slug)).toContain("lobby is reached only by stairs");
    expect(text(slug)).toContain("Staff can sign guests in person");
    expect(text(slug)).toContain("line closes at capacity");
    expect(place(slug).limitations).toContain("not evidence of the Market route");
    expect(place(slug).limitations).toContain("no on-site audit");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Mayerson recreation while preserving changing and personal-care limits", () => {
    const slug = "mayerson-jcc";
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("8485 Ridge Road, Cincinnati, OH 45236");
    expect(text(slug)).toContain("does not currently have adult changing tables");
    expect(text(slug)).toContain("do not assume personal care is supplied");
    expect(text(slug)).toContain("cannot guarantee every accommodation request");
    expect(place(slug).limitations).toContain("no on-site audit");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Ludlow's distillery while keeping its floor description separate from unverified arrival and facilities", () => {
    const slug = "second-sight-spirits";
    expect(findPlaces({ category: "Food & drink", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("301 Elm Street, Ludlow, KY");
    expect(text(slug)).toContain("one floor without steps");
    expect(text(slug)).toContain("Thursday tours without lounge coffee or cocktail service");
    expect(text(slug)).toContain("not a guaranteed place");
    expect(place(slug).limitations).toContain("not an observed continuous route from parking");
    expect(place(slug).limitations).toContain("no service-animal exclusion is inferred");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Bea Taylor food assistance without hiding conflicting holiday reopening dates", () => {
    const slug = "freestore-foodbank-bea-taylor-market";
    expect(findPlaces({ category: "Public services", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("3401 Rosenthal Way, Cincinnati, OH 45204");
    expect(text(slug)).toContain("cannot wait");
    expect(text(slug)).toContain("while supplies last");
    expect(place(slug).limitations).toContain("homepage says the market reopens November 28");
    expect(place(slug).limitations).toContain("flyer says December 1");
    expect(place(slug).limitations).toContain("remain unverified");
    expect(place(slug).observed_at).toBeNull();
    const holiday = place(slug).facts.find((f) => f.text.includes("closed November 26–30"))!;
    expect(holiday.source_url).toContain("2026-BeaTaylor-distribution-flyer");
  });
  it("finds Eastgate groceries while keeping store-specific services and unknown assistance explicit", () => {
    const slug = "jungle-jims-eastgate";
    expect(findPlaces({ category: "Shopping", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("4450 Eastgate South Drive, Cincinnati, OH 45245");
    expect(text(slug)).toContain("main entrances of both stores");
    expect(text(slug)).toContain("Caroline Cart");
    expect(text(slug)).toContain("party trays are for in-store pickup at Fairfield, not Eastgate");
    expect(text(slug)).toContain("limited availability during holidays and December");
    expect(place(slug).limitations).toContain("no on-site audit");
    expect(place(slug).limitations).toContain("transfer or carrying assistance");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Clermont Dial-A-Ride without merging ADA eligibility or promising personal assistance", () => {
    const slug = "clermont-transportation-connection-dial-a-ride";
    expect(findPlaces({ category: "Transportation", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toContain("4003 Filager Road, Batavia, OH 45103");
    expect(text(slug)).toContain("open to any person in Clermont County");
    expect(text(slug)).toContain("will not enter a home or business");
    expect(text(slug)).toContain("no Saturday service");
    expect(text(slug)).toContain("first come, first served");
    expect(place(slug).limitations).toContain("not a confirmed boarding point");
    expect(place(slug).limitations).toContain("not separate ADA paratransit eligibility");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Northern Kentucky transport while retaining program approval and unknown boarding arrangements", () => {
    const slug = "proudworks-transportation";
    expect(findPlaces({ category: "Transportation", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("7970 Kentucky Drive, Florence, KY 41042");
    expect(text(slug)).toContain("valid Kentucky Medicaid card");
    expect(text(slug)).toContain("approved destinations");
    expect(text(slug)).toContain("Medicaid Waiver consumers in six Northern Kentucky counties");
    expect(place(slug).limitations).toContain("not a confirmed boarding point");
    expect(place(slug).limitations).toContain("Booking lead time, fares, vehicle/lift dimensions");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Liberty Street food assistance without implying physical access or unrestricted transport", () => {
    const slug = "freestore-foodbank-liberty-street-market";
    expect(findPlaces({ category: "Public services", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("112 E Liberty Street, Cincinnati, OH 45202");
    expect(text(slug)).toContain("Choice shopping ends 30 minutes before closing");
    expect(text(slug)).toContain("protein items are reserved for customers using choice shopping");
    expect(text(slug)).toContain("first two weeks of a new job");
    expect(place(slug).limitations).toContain("not a door-to-door ride or guaranteed transport home");
    expect(place(slug).limitations).toContain("remain unverified");
    expect(place(slug).observed_at).toBeNull();
  });
  it("keeps museum preparation current without extending an older photo guide's admission claim", () => {
    const cac = place("contemporary-arts-center");
    const group = cac.facts.find((f) => f.id === "contemporary-arts-center.cognitive.2")!;
    expect(group.text).toMatch(/two weeks’ notice/);
    expect(group.source_url).toBe("https://www.contemporaryartscenter.org/visit/accessibility");
    expect(cac.facts.some((f) => f.text.includes("$12 general admission") && f.source_url.endsWith("/visit/hours-admission"))).toBe(true);
    expect(cac.limitations).toMatch(/blanket free-admission statement differs/);
    expect(text("taft-museum-of-art")).toMatch(/coatroom and lockers are on the first floor/);
    expect(text("taft-museum-of-art")).toMatch(/does not describe adult-changing equipment/);
  });
  it("finds Newport and Covington dining while preserving distinct destinations and entrance barriers", () => {
    const slugs = ["new-riff-distilling", "braxton-brewing-covington", "riverside-mainstrasse-village-food-tour"];
    expect(findPlaces({ category: "Food & drink", region: "KY" }).map((p) => p.slug)).toEqual(expect.arrayContaining(slugs));
    expect(place(slugs[0]).address).toBe("24 Distillery Way, Newport, KY 41073");
    expect(text(slugs[0])).toMatch(/West Newport Campus is at 1104 Lowell Street/);
    expect(text(slugs[1])).toMatch(/second-floor Loft private-event space/);
    expect(place(slugs[1]).limitations).toMatch(/not a confirmed rooftop route/);
    expect(text(slugs[2])).toMatch(/Some restaurant entrances may have a step up/);
    expect(place(slugs[2]).address).toMatch(/published meeting point/);
    for (const slug of slugs) {
      expect(place(slug).limitations).toContain("no on-site audit");
      expect(place(slug).observed_at).toBeNull();
    }
  });
  it("adds CVG arrival preparation without promising a particular vehicle or shuttle wait", () => {
    const slug = "cincinnati-northern-kentucky-international-airport-cvg";
    expect(place(slug).checked_at).toBe("2026-11-12");
    expect(text(slug)).toMatch(/cash is not accepted/);
    expect(text(slug)).toMatch(/not guaranteed waits or a device-fit assessment/);
    expect(text(slug)).toMatch(/Ride A WAV Cincy/);
    expect(text(slug)).toMatch(/separate from the Terminal curbfront/);
    expect(text(slug)).toMatch(/tactile cues for silent indoor navigation/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("keeps Walmart visual interpretation limits separate from local physical assistance", () => {
    const slug = "walmart-supercenter-fort-wright";
    expect(place(slug).checked_at).toBe("2026-11-12");
    expect(text(slug)).toMatch(/excludes assistance while crossing a street and inside public restrooms/);
    expect(text(slug)).toMatch(/transfer or carrying assistance is not described/);
    expect(text(slug)).toMatch(/remote service, not Fort Wright store opening hours/);
    expect(place(slug).limitations).toMatch(/rather than observations at this branch/);
  });
  it("finds OTR dining with table-versus-stool choices and an email booking alternative", () => {
    const slug = "nolia-kitchen";
    expect(findPlaces({ category: "Food & drink", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("1405 Clay Street, Cincinnati, OH 45202");
    expect(text(slug)).toMatch(/dining room has tables for up to 26/);
    expect(text(slug)).toMatch(/back bar seats eight on stools/);
    expect(text(slug)).toMatch(/email hello@noliakitchen.com/);
    expect(place(slug).limitations).toMatch(/does not establish a continuous step-free route/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Campbell County parks while keeping repair closures and winter toilets explicit", () => {
    const found = findPlaces({ category: "Parks & outdoors", region: "KY" }).map((p) => p.slug);
    expect(found).toEqual(expect.arrayContaining(["aj-jolly-park", "pendery-park"]));
    expect(place("aj-jolly-park").address).toBe("1501 Race Track Road, Alexandria, KY 41001");
    expect(text("aj-jolly-park")).toMatch(/closes camping and lake access/);
    expect(text("aj-jolly-park")).toMatch(/including to pedestrians/);
    expect(text("aj-jolly-park")).toMatch(/bathrooms are closed and portable toilets available/);
    expect(place("pendery-park").address).toBe("4113 Williams Lane, Melbourne, KY 41059");
    expect(text("pendery-park")).toMatch(/railroad tracks/);
    expect(text("pendery-park")).toMatch(/lists five picnic shelters/);
    expect(text("pendery-park")).toMatch(/separate rental page lists four/);
    for (const slug of ["aj-jolly-park", "pendery-park"]) {
      expect(place(slug).limitations).toContain("no on-site audit");
      expect(place(slug).observed_at).toBeNull();
    }
  });
  it("finds Queensgate yoga without treating a ramp and elevator as measured end-to-end access", () => {
    const slug = "moon-bridge-yoga";
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("516 Linn Street, Suite 416, Cincinnati, OH 45203");
    expect(text(slug)).toMatch(/Lot B.*elevator through the front door/);
    expect(text(slug)).toMatch(/narrow hallway/);
    expect(text(slug)).toMatch(/shared bathroom/);
    expect(place(slug).limitations).toMatch(/No medical suitability or ability to assist transfers is inferred/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("preserves Washington Park charging conditions and children's restroom restrictions after full review", () => {
    const p = place("washington-park");
    expect(p.checked_at).toBe("2026-11-12");
    expect(text(p.slug)).toMatch(/power is not guaranteed/);
    expect(text(p.slug)).toMatch(/only for children and parents using the playground/);
    expect(text(p.slug)).toMatch(/Porch’s schedule, separate from park opening hours/);
    expect(p.facts.filter((f) => f.history.some((h) => h.action === "revised"))).toHaveLength(3);
    expect(p.observed_at).toBeNull();
  });
  it("finds Burlington dining with a first-floor request and the no-elevator barrier", () => {
    const slug = "tousey-house-tavern";
    expect(findPlaces({ category: "Food & drink", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("5963 North Jefferson Street, Burlington, KY 41005");
    expect(text(slug)).toMatch(/upstairs and downstairs and no elevator/);
    expect(text(slug)).toMatch(/request is not confirmation/);
    expect(place(slug).limitations).toMatch(/no on-site audit/);
    expect(place(slug).limitations).toMatch(/not today’s visitor entrance/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Blue Ash recreation while separating pool entry from floor and transfer routes", () => {
    const slug = "blue-ash-recreation-center";
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("4433 Cooper Road, Blue Ash, OH 45242");
    expect(text(slug)).toMatch(/second floor.*does not describe an elevator route/);
    expect(text(slug)).toMatch(/state verification of disability status/);
    expect(text(slug)).toMatch(/notice does not confirm completion/);
    expect(place(slug).limitations).toContain("no on-site audit");
    expect(place(slug).observed_at).toBeNull();
  });
  it("preserves Sharonville lift assistance limits and in-person membership requirements", () => {
    const slug = "sharonville-community-center-aquatic-center";
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("10990 Thornview Drive, Sharonville, OH 45241");
    expect(text(slug)).toMatch(/staff demonstrate equipment but are not permitted to lift people/);
    expect(text(slug)).toMatch(/online purchase is unavailable/);
    expect(text(slug)).toMatch(/past seasonal schedule, not November/);
    expect(place(slug).limitations).toContain("no on-site audit");
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Covington dining with attributed side-entry evidence and held rooftop claims", () => {
    const slug = "mamas-on-main";
    expect(findPlaces({ category: "Food & drink", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("621 Main Street, Covington, KY 41011");
    expect(text(slug)).toMatch(/wheelchair-travel account published by Kentucky Tourism/);
    expect(place(slug).limitations).toMatch(/not a Threshold team visit/);
    expect(place(slug).limitations).toMatch(/stair-only rooftop description remains held/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds seasonal recreation while preserving entrance, lift and program limits", () => {
    const found = findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug);
    expect(found).toContain("price-hill-recreation-center-dempsey-pool");
    expect(found).toContain("oxford-aquatic-center");
    expect(place("price-hill-recreation-center-dempsey-pool").address).toBe("959 Hawthorne Avenue, Cincinnati, OH 45205");
    expect(text("price-hill-recreation-center-dempsey-pool")).toMatch(/933 Hawthorne Avenue/);
    expect(text("price-hill-recreation-center-dempsey-pool")).toMatch(/summer 2026 dates, not November/);
    expect(text("price-hill-recreation-center-dempsey-pool")).toMatch(/systemwide request process/);
    expect(text("oxford-aquatic-center")).toMatch(/Confirm which pool has a lift/);
    expect(text("oxford-aquatic-center")).toMatch(/photo can be taken at the Aquatic Center front desk/);
    expect(text("oxford-aquatic-center")).toMatch(/even for guests who are not swimming/);
    for (const slug of ["price-hill-recreation-center-dempsey-pool", "oxford-aquatic-center"]) {
      expect(place(slug).limitations).toContain("no on-site audit");
      expect(place(slug).observed_at).toBeNull();
    }
  });
  it("preserves Cold Spring vehicle-only delivery and unanswered-call instructions", () => {
    const all = text("campbell-county-public-library-cold-spring-branch");
    expect(all).toMatch(/do not leave voicemail/);
    expect(all).toMatch(/Staff deliver only to vehicles in designated spaces/);
    expect(all).toMatch(/January 3, 2027.*Easy Access Card/);
    expect(all).toMatch(/Digital cards need annual renewal/);
  });
  it("finds recycling services with rear-lot directions and non-QR check-in", () => {
    const slug = "cincinnati-recycling-reuse-hub";
    expect(findPlaces({ category: "Public services", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("911 Evans Street, Cincinnati, OH 45204");
    expect(text(slug)).toMatch(/Woodrow Street behind the building/);
    expect(text(slug)).toMatch(/QR code, phone number or email address/);
    expect(text(slug)).toMatch(/does not mean merchandise is free/);
    expect(place(slug).limitations).toMatch(/predates the 2026 Hub Club program/);
    expect(place(slug).limitations).toMatch(/no on-site audit/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Golden Lamb dining while preserving upstairs and historic-lift limits", () => {
    const slug = "golden-lamb";
    expect(findPlaces({ category: "Food & drink", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("27 S. Broadway, Lebanon, OH 45036");
    expect(text(slug)).toMatch(/Buckeye Room/);
    expect(text(slug)).toMatch(/second, third and fourth floors with no elevator/);
    expect(text(slug)).toMatch(/call 513-932-5065 from the car/);
    expect(place(slug).limitations).toMatch(/not evidence of completion/);
    expect(place(slug).limitations).toMatch(/no on-site audit/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("keeps TANK Senior Transportation eligibility, fares and trip restrictions separate", () => {
    const all = text("tank-transit-authority-of-northern-kentucky");
    expect(all).toMatch(/at least 67.*photo ID on every ride/);
    expect(all).toMatch(/Recreation and social trips are excluded/);
    expect(all).toMatch(/\$8 one-way fare, payable only in cash/);
    expect(all).toMatch(/Booking-office hours differ from the program’s travel hours/);
  });
  it("finds Newport grocery pickup with local collection limits and product exclusions", () => {
    const slug = "fresh-thyme-market-newport";
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("82A Carothers Road, Newport, KY 41071");
    expect(text(slug)).toMatch(/create a loyalty account/);
    expect(text(slug)).toMatch(/excludes alcohol from pickup/);
    expect(place(slug).limitations).toMatch(/do not establish curbside delivery to a vehicle/);
    expect(place(slug).limitations).toMatch(/no on-site audit/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds the courthouse while keeping juror amenities separate from public access", () => {
    const slug = "hamilton-county-courthouse";
    expect(findPlaces({ category: "Public services", region: "OH" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("1000 Main Street, Cincinnati, OH 45202");
    expect(text(slug)).toMatch(/juror amenity, not a confirmed quiet room for every courthouse visitor/);
    expect(text(slug)).toMatch(/Room 468/);
    expect(text(slug)).toMatch(/not at a ground-floor walk-up kiosk/);
    expect(place(slug).limitations).toMatch(/exact step-free street doorway/);
    expect(place(slug).limitations).toMatch(/no on-site audit/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("preserves Erlanger’s routine curbside restriction and construction exception", () => {
    const slug = "kenton-county-public-library-erlanger-branch";
    expect(text(slug)).toMatch(/does not offer regular curbside pickup/);
    expect(text(slug)).toMatch(/staff will bring items out to your vehicle/);
    expect(text(slug)).toMatch(/telescopes through the drive-through/);
    expect(place(slug).limitations).toMatch(/July and August without a year/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds Florence warehouse shopping while preserving local equipment and pickup barriers", () => {
    const slug = "sams-club-florence";
    expect(findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("4949 Houston Road, Florence, KY 41042");
    expect(text(slug)).toMatch(/some also offer manual wheelchairs/);
    expect(text(slug)).toMatch(/Additional Pickup Person/);
    expect(text(slug)).toMatch(/wait exceeding ten minutes.*inside/);
    expect(text(slug)).toMatch(/live chat daily, 7 a.m.–11 p.m. Central time/);
    expect(text(slug)).toMatch(/not Florence’s hearing-equipment inventory or a confirmed curbside check-in alternative/);
    expect(place(slug).limitations).toMatch(/phone-only check-in alternative/);
    expect(place(slug).limitations).toMatch(/U.S. chain policies/);
    expect(place(slug).limitations).toMatch(/no on-site audit/);
    expect(place(slug).observed_at).toBeNull();
  });
  it("finds civic services and indoor swimming without implying a complete entrance or transfer route", () => {
    expect(findPlaces({ category: "Public services", region: "OH" }).map((p) => p.slug)).toContain("cincinnati-city-hall");
    expect(place("cincinnati-city-hall").address).toBe("801 Plum Street, Cincinnati, OH 45202");
    expect(text("cincinnati-city-hall")).toMatch(/elevator to floor four/);
    expect(place("cincinnati-city-hall").limitations).toMatch(/8:30 a.m..*8 a.m./);
    expect(place("cincinnati-city-hall").limitations).toMatch(/step-free street entrance/);
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toContain("mt-auburn-indoor-pool");
    expect(place("mt-auburn-indoor-pool").address).toBe("2034 Young Street, Cincinnati, OH 45219");
    expect(text("mt-auburn-indoor-pool")).toMatch(/indoor, year-round warm-water pool/);
    expect(place("mt-auburn-indoor-pool").limitations).toMatch(/transfer methods.*remain unverified/);
    expect(place("mt-auburn-indoor-pool").limitations).toMatch(/5545 Belmont Avenue.*2034 Young Street/);
    for (const slug of ["cincinnati-city-hall", "mt-auburn-indoor-pool"]) {
      expect(place(slug).limitations).toMatch(/no on-site audit/);
      expect(place(slug).observed_at).toBeNull();
    }
  });
  it("keeps Independence's pickup exceptions and closure conflict visible", () => {
    const slug = "kenton-county-public-library-independence-branch";
    expect(text(slug)).toMatch(/telescope rule/);
    expect(text(slug)).toMatch(/three days/);
    expect(text(slug)).toMatch(/one-hour-early exception is specifically for Erlanger/);
    expect(place(slug).limitations).toMatch(/all-day staff-development closure.*used-book sale/);
    expect(place(slug).limitations).toMatch(/family-assisted restrooms/);
  });
  it("keeps partial arboretum review dates and conflicting Greenway distances visible", () => {
    const arboretum = place("central-park-boone-county-arboretum");
    const woodlandNote = arboretum.facts.find((f) => f.id === `${arboretum.slug}.mobility.2`)!;
    expect(arboretum.checked_at <= woodlandNote.retrieved_at).toBe(true);
    expect(text("central-park-boone-county-arboretum")).toMatch(/seasonal water availability/);
    expect(text("licking-river-greenway-trails")).toMatch(/upper-levee paved trail/);
    expect(place("licking-river-greenway-trails").limitations).toMatch(/lengths remain unresolved/);
  });
  it("finds Monroe shopping and Latonia library with equipment and route limits", () => {
    expect(findPlaces({ category: "Shopping", region: "OH" }).map((p) => p.slug)).toContain("cincinnati-premium-outlets");
    expect(text("cincinnati-premium-outlets")).toMatch(/Suite 400/);
    expect(text("cincinnati-premium-outlets")).toMatch(/closed Saturday–Sunday/);
    expect(place("cincinnati-premium-outlets").limitations).toMatch(/weekend or evening borrowing and returns are unverified/);
    expect(findPlaces({ category: "Libraries", region: "KY" }).map((p) => p.slug)).toContain("kenton-county-public-library-latonia-branch");
    expect(place("kenton-county-public-library-latonia-branch").address).toBe("3911 Winston Ave., Covington, KY 41015");
    expect(place("kenton-county-public-library-latonia-branch").limitations).toMatch(/not a verified current bus route/);
    expect(place("kenton-county-public-library-latonia-branch").limitations).toMatch(/date discrepancy remains unresolved/);
    for (const slug of ["cincinnati-premium-outlets", "kenton-county-public-library-latonia-branch"]) {
      expect(place(slug).observed_at).toBeNull();
      expect(place(slug).limitations).toMatch(/no on-site audit/);
    }
  });
  it("finds the Symphony bar while separating its ramp from stair-only hotel rooms", () => {
    expect(findPlaces({ category: "Food & drink", region: "OH" }).map((p) => p.slug)).toContain("symphony-hotel-bar");
    expect(place("symphony-hotel-bar").address).toBe("210 W 14th Street, Cincinnati, OH 45202");
    expect(text("symphony-hotel-bar")).toMatch(/ramp serves the main-floor bar/);
    expect(text("symphony-hotel-bar")).toMatch(/no elevator/);
    expect(text("symphony-hotel-bar")).toMatch(/restaurant has closed/);
    expect(place("symphony-hotel-bar").limitations).toMatch(/no on-site audit/);
    expect(place("symphony-hotel-bar").observed_at).toBeNull();
    expect(text("burnet-woods-trailside-nature-center")).toMatch(/April 15–October 31/);
    expect(text("burnet-woods-trailside-nature-center")).toMatch(/significant sinkholes/);
    expect(text("burnet-woods-trailside-nature-center")).toMatch(/same page says Saturday open hours/);
  });
  it("discovers public services and recreation while preserving construction and seasonal limits", () => {
    expect(findPlaces({ category: "Public services", region: "KY" }).map((p) => p.slug)).toEqual(["kenton-county-government-center", "be-concerned-covington", "brighton-center-family-center", "mary-rose-mission", "covunity-fridge-redden-gardens", "covunity-fridge-banklick-street", "walton-post-office", "kentucky-driver-licensing-burlington", "kentucky-driver-licensing-independence", "boone-county-drive-thru-food-pantry", "action-ministries-covington", "nku-care-closet"]);
    expect(findPlaces({ category: "Recreation & fitness", region: "OH" }).map((p) => p.slug)).toContain("uc-campus-recreation-center");
    expect(findPlaces({ category: "Parks & outdoors", region: "OH" }).map((p) => p.slug)).toContain("dunham-recreation-complex");
    expect(place("kenton-county-government-center").address).toBe("1840 Simon Kenton Way, Covington, KY 41011");
    expect(text("kenton-county-government-center")).toMatch(/vehicle-lot instruction/);
    expect(place("kenton-county-government-center").limitations).toMatch(/not a verified reopening/);
    expect(place("uc-campus-recreation-center").address).toBe("2820 Bearcat Way, Cincinnati, OH 45219");
    expect(place("uc-campus-recreation-center").limitations).toMatch(/2840 Bearcat Way/);
    expect(text("uc-campus-recreation-center")).toMatch(/zero-depth entry/);
    expect(place("uc-campus-recreation-center").limitations).toMatch(/not the zero-depth leisure pool/);
    expect(text("dunham-recreation-complex")).toMatch(/August 8 season closing date/);
    expect(place("dunham-recreation-complex").limitations).toMatch(/not a November opening or a 2027 schedule/);
    for (const slug of ["kenton-county-government-center", "uc-campus-recreation-center", "dunham-recreation-complex"]) {
      expect(place(slug).limitations).toMatch(/no on-site audit/);
      expect(place(slug).observed_at).toBeNull();
    }
  });

  it("finds Covington food and Kenwood recreation with their branch-specific limits", () => {
    expect(findPlaces({ category: "Food & drink", region: "KY" }).map((p) => p.slug)).toContain("galaxie-covington");
    expect(findPlaces({ category: "Museums & attractions", region: "OH" }).map((p) => p.slug)).toContain("brkthrough-cincinnati-kenwood");
    expect(place("galaxie-covington").address).toBe("815 Madison Ave, Covington, KY 41011");
    expect(place("galaxie-covington").limitations).toMatch(/Tuesday service/);
    expect(place("galaxie-covington").limitations).toMatch(/No Louisville-branch facilities/);
    expect(text("brkthrough-cincinnati-kenwood")).toMatch(/over 50%/);
    expect(place("brkthrough-cincinnati-kenwood").limitations).toMatch(/does not identify which rooms/);
    for (const slug of ["galaxie-covington", "brkthrough-cincinnati-kenwood"]) {
      expect(place(slug).limitations).toMatch(/no on-site audit/);
      expect(place(slug).observed_at).toBeNull();
    }
  });

  it("preserves TANK's removed-stop conflict and Middleton's limited-hours scope", () => {
    expect(text("tank-transit-authority-of-northern-kentucky")).toMatch(/outbound Holman at MLK stop is permanently removed/);
    expect(place("tank-transit-authority-of-northern-kentucky").limitations).toMatch(/timetable still lists/);
    expect(text("middleton-mills-park")).toMatch(/year-round with limited hours/);
    expect(place("middleton-mills-park").limitations).toMatch(/not a confirmed winter-opening schedule/);
  });

  it("finds Newport dining while keeping the older Biergarten route description dated", () => {
    const slug = "hofbrauhaus-newport";
    expect(findPlaces({ category: "Food & drink", region: "KY" }).map((p) => p.slug)).toContain(slug);
    expect(place(slug).address).toBe("200 E 3rd St, Newport, KY 41071");
    expect(place(slug).facts.find((f) => f.id === `${slug}.mobility.1`)?.published_at).toBe("2021-05-19");
    expect(place(slug).limitations).toMatch(/body prints ZIP 41017/);
    expect(place(slug).limitations).toMatch(/March 2013 photograph/);
    expect(text(slug)).toMatch(/Friday and Saturday reservations are not taken/);
  });

  it("limits Rhinegeist elevator evidence to private events and retains tour notice", () => {
    const slug = "rhinegeist-brewery";
    expect(text(slug)).toMatch(/all private event spaces have elevator access/);
    expect(place(slug).limitations).toMatch(/does not establish an uninterrupted public route/);
    const tour = place(slug).facts.find((f) => f.id === "rhinegeist-brewery.mobility.1")!;
    expect(tour.text).toMatch(/two weeks’ notice/);
    expect(tour.text).not.toMatch(/ADA accessible/);
    expect(tour.history.at(-1)?.action).toBe("revised");
  });

  it("discovers Florence order-point and grocery services without transferring full-store facilities", () => {
    const shopping = findPlaces({ category: "Shopping", region: "KY" }).map((p) => p.slug);
    expect(shopping).toContain("ikea-florence-plan-and-order-point");
    expect(shopping).toContain("publix-farmview-commons");
    const ikea = place("ikea-florence-plan-and-order-point");
    expect(ikea.address).toBe("7739 Mall Rd., Florence, KY 41042-1405");
    expect(ikea.limitations).toMatch(/7735 Mall Road/);
    expect(ikea.limitations).toMatch(/West Chester.*have not been transferred/);
    expect(text(ikea.slug)).toMatch(/no stock/);
    expect(text(ikea.slug)).toMatch(/same day/);
    const publix = place("publix-farmview-commons");
    expect(publix.address).toBe("8740 US Hwy 42, Florence, KY 41042");
    expect(publix.limitations).toMatch(/8470 US 42/);
    expect(publix.limitations).toMatch(/chain guidance rather than observations/);
    expect(text(publix.slug)).toMatch(/drive-through pharmacy/);
    for (const p of [ikea, publix]) {
      expect(p.observed_at).toBeNull();
      expect(p.limitations).toMatch(/no on-site audit/);
    }
  });

  it("keeps Newport pickup conditions and Giles Conrad facility conflicts visible", () => {
    const newport = "campbell-county-public-library-newport-branch";
    expect(text(newport)).toMatch(/digital-only card does not qualify/);
    expect(text(newport)).toMatch(/at least 72 hours/);
    expect(text(newport)).toMatch(/call again rather than leaving voicemail/);
    expect(place(newport).limitations).toMatch(/July 2022 photograph/);
    const giles = "giles-conrad-park";
    expect(text(giles)).toMatch(/portable toilets/);
    expect(text(giles)).toMatch(/uneven ground/);
    expect(place(giles).limitations).toMatch(/Shelter 2 has none/);
    expect(place(giles).limitations).toMatch(/operating season at this park are unknown/);
  });

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
  it("adds distinct public-source guides without implying a field visit", () => {
    for (const slug of newSlugs) {
      const p = place(slug);
      expect(p).toBeDefined();
      expect(p.evidence_type).toBe("public_website");
      expect(p.observed_at).toBeNull();
      expect(p.limitations).toMatch(/no on-site audit/i);
      for (const f of p.facts) {
        expect(f.source_url).toMatch(/^https:/);
        // A later failed source fetch must be allowed to flag an older guide.
        // Flagging retains its provenance; it must not masquerade as a recheck.
        expect(["source_checked", "needs_recheck"]).toContain(f.review_status);
        if (f.review_status === "needs_recheck") {
          expect(f.history.at(-1)?.action).toBe("flagged");
        }
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
      "fei-house-covington",
      "fifty-west-wooster-pike", "fords-garage-norwood",
      "fabled-brew-works", "little-miami-brewing-company", "brink-brewing-college-hill", "streetside-brewery",
      "braxton-brewing-covington", "findlay-market", "galaxie-covington", "golden-lamb", "hofbrauhaus-newport", "jungle-jims-fairfield", "mamas-on-main", "molly-malones-covington", "new-riff-distilling", "nolia-kitchen", "rhinegeist-brewery", "riverside-mainstrasse-village-food-tour", "second-sight-spirits", "smoke-justis", "symphony-hotel-bar", "tousey-house-tavern",
      "element-eatery", "schoolhouse-restaurant-camp-dennison", "fretboard-brewing-blue-ash", "wabi-sabi-covington",
      "fort-thomas-coffee", "junipers-gin-bar-covington", "mellow-mushroom-wilder", "olla-taqueria-covington",
    ].sort());
    const art = artForCategory("Food & drink")!;
    expect(art.alt).toMatch(/^AI artwork/);
    expect(art.caption).toMatch(/not a view or accessibility assessment/);
  });
  it("uses the precise source and publisher for limited policy claims", () => {
    const imax = place("amc-newport-on-the-levee-20").facts.filter((f) => f.source_url.includes("imax.com"));
    expect(imax).toHaveLength(2);
    expect(imax.every((f) => f.source_type === "partner_official")).toBe(true);
    expect(place("go-bananas-comedy-club").facts[0].source_url).toBe("https://gobananascomedy.com/main/");
    const medicalItems = place("florence-yalls-thomas-more-stadium").facts.find((f) => f.id === "florence-yalls-thomas-more-stadium.chronic.1")!;
    expect(medicalItems.source_url).toBe("https://florenceyalls.com/pages/yalls-a-z");
    expect(medicalItems.text).toContain("permits medically necessary items");
    expect(medicalItems.text).toContain("all bags are subject to inspection");
  });
});
