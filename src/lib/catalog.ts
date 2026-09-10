import rawPlaces from "@/data/places.json";

export const DOMAIN_LABELS = {
  mobility: "Mobility & getting around",
  sensory: "Sensory & communication",
  cognitive: "Planning & predictability",
  chronic: "Rest & everyday needs",
} as const;
export type Domain = keyof typeof DOMAIN_LABELS;
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
  facts: { domain: Domain; text: string; source_url: string }[];
  limitations: string;
}
export const places = rawPlaces as PublicPlace[];
export const categories = [...new Set(places.map((p) => p.category))].sort();
export const cities = [...new Set(places.map((p) => p.city))].sort();
export const factCount = places.reduce((n, p) => n + p.facts.length, 0);

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
