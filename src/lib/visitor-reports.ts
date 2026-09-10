import ohReports from "@/data/visitor-reports-oh.json";
import kyReports from "@/data/visitor-reports-ky.json";
import specialist from "@/data/visitor-reports-specialist.json";
import { places, type Domain } from "./catalog";

export interface VisitorReport {
  id: string;
  placeSlug: string;
  sourceTitle: string;
  sourceUrl: string;
  publisher: string;
  author: string | null;
  publishedAt: string | null;
  visitedAt: string | null;
  checkedAt: string;
  kind: "firsthand_review" | "community_comment" | "reported_experience";
  domains: Domain[];
  summary: string;
  caveat: string;
  contextSourceUrl?: string;
}

export const REPORT_LABELS = {
  firsthand_review: "Firsthand review",
  community_comment: "Public community comment",
  reported_experience: "Reported visitor experience",
} as const;

export const visitorReports: VisitorReport[] = [
  ...specialist,
  ...kyReports,
  ...ohReports,
] as VisitorReport[];
export const reportsForPlace = (slug: string) =>
  visitorReports.filter((report) => report.placeSlug === slug);

export function findVisitorReports(filters: {
  q?: string;
  region?: string;
  domain?: string;
}) {
  const tokens = (filters.q || "")
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  return visitorReports.filter((report) => {
    const place = places.find((item) => item.slug === report.placeSlug);
    const text = [
      place?.name,
      place?.city,
      report.summary,
      report.caveat,
      report.publisher,
    ]
      .join(" ")
      .toLocaleLowerCase();
    return (
      tokens.every((token) => text.includes(token)) &&
      (!filters.region || place?.state === filters.region) &&
      (!filters.domain || report.domains.includes(filters.domain as Domain))
    );
  });
}
