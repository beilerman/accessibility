import rawPlaces from "@/data/places.json";

export const DOMAIN_LABELS = {
  mobility: "Mobility & getting around",
  sensory: "Sensory & communication",
  cognitive: "Planning & predictability",
  chronic: "Rest & everyday needs",
} as const;
export type Domain = keyof typeof DOMAIN_LABELS;

/** Who published a fact's source, relative to the listed place. */
export const SOURCE_TYPE_LABELS = {
  venue_official: "Venue’s official website",
  operator_official: "Operating organization’s website",
  partner_official: "Venue partner’s official website",
  public_agency: "Public agency listing",
} as const;
export type SourceType = keyof typeof SOURCE_TYPE_LABELS;

/**
 * source_checked: summary matched the source when retrieved.
 * needs_recheck: the source changed or is overdue; shown with a caution.
 * source_unavailable: the source no longer loads; shown with a caution.
 * retired: the source no longer supports the note. Hidden from the site but
 *   kept, with its ID, so history is never erased and IDs are never reused.
 */
export type ReviewStatus =
  | "source_checked"
  | "needs_recheck"
  | "source_unavailable"
  | "retired";

export interface FactHistoryEntry {
  date: string;
  action: "added" | "rechecked" | "revised" | "flagged" | "retired";
  note: string;
}

export interface Fact {
  /** Stable, never reused: `<slug>.<domain>.<n>`. */
  id: string;
  domain: Domain;
  text: string;
  source_url: string;
  source_type: SourceType;
  /** When Threshold last read the source. */
  retrieved_at: string;
  /** When the publisher says the source changed, if stated. */
  published_at: string | null;
  /** When a visitor observed the condition. Always null for website facts. */
  observed_at: string | null;
  review_status: ReviewStatus;
  history: FactHistoryEntry[];
}

/** Days after retrieval before a public-website fact is due for a recheck. */
export const RECHECK_AFTER_DAYS = 180;

export function recheckDueDate(fact: Pick<Fact, "retrieved_at">) {
  const d = new Date(fact.retrieved_at + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + RECHECK_AFTER_DAYS);
  return d.toISOString().slice(0, 10);
}

/** A fact needs a caution when flagged or past its recheck date. */
export function factNeedsCaution(
  fact: Pick<Fact, "retrieved_at" | "review_status">,
  today = new Date().toISOString().slice(0, 10),
) {
  return fact.review_status !== "source_checked" || recheckDueDate(fact) < today;
}

export interface PublicPlace {
  slug: string;
  name: string;
  city: string;
  state: string;
  category: string;
  address?: string;
  website: string;
  source_url: string;
  checked_at: string;
  observed_at: null;
  evidence_type: "public_website";
  facts: Fact[];
  limitations: string;
}
/** Every place with every fact, including retired ones (for audits and tests). */
export const catalogRecords = rawPlaces as PublicPlace[];
/** What the site shows: retired facts removed. */
export const places: PublicPlace[] = catalogRecords.map((p) => ({
  ...p,
  facts: p.facts.filter((f) => f.review_status !== "retired"),
}));
export const categories = [...new Set(places.map((p) => p.category))].sort();
export const cities = [...new Set(places.map((p) => p.city))].sort();
export const factCount = places.reduce((n, p) => n + p.facts.length, 0);
export const allFacts = catalogRecords.flatMap((p) =>
  p.facts.map((f) => ({ ...f, place: p })),
);

/** Most recent retrieval across a place's facts. */
export function latestRetrieval(place: PublicPlace) {
  return place.facts.map((f) => f.retrieved_at).sort().at(-1)!;
}

/** Filters describe available information, never whether a place fits a person. */
export function findPlaces(filters: {
  q?: string;
  region?: string;
  city?: string;
  category?: string;
  domain?: string;
}) {
  const tokens = (filters.q ?? "")
    .toLocaleLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return places.filter((p) => {
    const haystack = [
      p.name,
      p.city,
      p.state,
      p.category,
      ...p.facts.map((f) => f.text),
    ]
      .join(" ")
      .toLocaleLowerCase();
    return (
      tokens.every((t) => haystack.includes(t)) &&
      (!filters.region || p.state === filters.region) &&
      (!filters.city || p.city === filters.city) &&
      (!filters.category || p.category === filters.category) &&
      (!filters.domain || p.facts.some((f) => f.domain === filters.domain))
    );
  });
}

export function dateLabel(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso + "T12:00:00Z"));
}

export interface CatalogChange {
  date: string;
  action: "revised" | "retired" | "added" | "flagged";
  note: string;
  fact: Fact;
  place: PublicPlace;
}

/**
 * Editorial changes worth showing publicly, newest first. Routine rechecks
 * are counted, not listed; notes added in the initial September 2026
 * catalog build are summarized rather than listed one by one.
 */
export function catalogChanges(records: PublicPlace[] = catalogRecords) {
  const changes: CatalogChange[] = [];
  const rechecks = new Map<string, number>();
  for (const place of records) {
    for (const fact of place.facts) {
      fact.history.forEach((h, i) => {
        if (h.action === "rechecked") {
          rechecks.set(h.date, (rechecks.get(h.date) ?? 0) + 1);
        } else if (!(h.action === "added" && i === 0 && h.date < "2026-11-01")) {
          changes.push({ date: h.date, action: h.action, note: h.note, fact, place });
        }
      });
    }
  }
  const order = { revised: 0, retired: 1, flagged: 2, added: 3 } as const;
  changes.sort(
    (a, b) =>
      b.date.localeCompare(a.date) ||
      order[a.action] - order[b.action] ||
      a.place.name.localeCompare(b.place.name),
  );
  return {
    changes,
    rechecks: [...rechecks.entries()]
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.date.localeCompare(a.date)),
  };
}

