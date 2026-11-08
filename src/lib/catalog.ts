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
  public_agency: "Public agency listing",
} as const;
export type SourceType = keyof typeof SOURCE_TYPE_LABELS;

/**
 * source_checked: summary matched the source when retrieved.
 * needs_recheck: the source changed or is overdue; shown with a caution.
 * source_unavailable: the source no longer loads; shown with a caution.
 */
export type ReviewStatus =
  | "source_checked"
  | "needs_recheck"
  | "source_unavailable";

export interface FactHistoryEntry {
  date: string;
  action: "added" | "rechecked" | "revised" | "flagged";
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
export const places = rawPlaces as PublicPlace[];
export const categories = [...new Set(places.map((p) => p.category))].sort();
export const cities = [...new Set(places.map((p) => p.city))].sort();
export const factCount = places.reduce((n, p) => n + p.facts.length, 0);
export const allFacts = places.flatMap((p) =>
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
