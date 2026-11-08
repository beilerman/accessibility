import data from "@/data/team-reviews.json";
import type { Domain } from "./catalog";

/**
 * A firsthand review by a member of the Threshold team. Shown separately
 * from notes summarized from venue websites: it records what the reviewer
 * experienced, not what the venue promises.
 */
export interface TeamReview {
  id: string;
  placeSlug: string;
  reviewer: string;
  reviewerRole: string;
  visitContext: string;
  /** A known visit date, if recorded. */
  visitedAt: string | null;
  /** When the reviewer wrote the review. */
  reportedAt: string;
  points: { domain: Domain; text: string }[];
}

export const teamReviews = data as TeamReview[];
export const teamReviewForPlace = (slug: string) =>
  teamReviews.find((review) => review.placeSlug === slug);
