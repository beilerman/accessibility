import {
  venues,
  accessibilityDetails,
  reviews,
  reviewPhotos,
  venuePhotos,
  mobilityTips,
  profiles,
} from "./mock-data";
import type {
  Venue,
  VenueWithDetails,
  ReviewWithAuthor,
  VenueCategory,
  AccessibilityRating,
} from "@/types/database";

// Venue queries
export function getVenues(): Venue[] {
  return venues;
}

export function getVenueBySlug(slug: string): VenueWithDetails | null {
  const venue = venues.find((v) => v.slug === slug);
  if (!venue) return null;

  return {
    ...venue,
    accessibility_details: accessibilityDetails.find((d) => d.venue_id === venue.id),
    photos: venuePhotos.filter((p) => p.venue_id === venue.id),
    reviews: reviews.filter((r) => r.venue_id === venue.id && r.published),
    mobility_tips: mobilityTips.filter((t) => t.venue_id === venue.id),
  };
}

export function getFeaturedVenues(): Venue[] {
  return venues.filter((v) => v.featured);
}

export function filterVenues(params: {
  category?: VenueCategory | null;
  city?: string | null;
  rating?: AccessibilityRating | null;
  features?: string[];
}): Venue[] {
  let result = [...venues];

  if (params.category) {
    result = result.filter((v) => v.category === params.category);
  }
  if (params.city) {
    result = result.filter((v) => v.city.toLowerCase() === params.city!.toLowerCase());
  }
  if (params.rating) {
    result = result.filter((v) => v.overall_rating === params.rating);
  }
  if (params.features && params.features.length > 0) {
    result = result.filter((v) => {
      const details = accessibilityDetails.find((d) => d.venue_id === v.id);
      if (!details) return false;
      return params.features!.every((f) => {
        switch (f) {
          case "accessible_parking": return details.has_accessible_parking;
          case "automatic_door": return details.entrance_has_automatic_door;
          case "accessible_bathroom": return details.bathroom_accessible;
          case "scooter_friendly": return details.scooter_maneuverable;
          case "elevator": return details.interior_has_elevator;
          case "scooter_charging": return details.scooter_charging_available;
          default: return false;
        }
      });
    });
  }

  return result;
}

export function searchVenues(query: string): Venue[] {
  const q = query.toLowerCase();
  return venues.filter(
    (v) =>
      v.name.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.city.toLowerCase().includes(q)
  );
}

export function getUniqueCities(): string[] {
  return [...new Set(venues.map((v) => v.city))].sort();
}

// Review queries
export function getEditorialReviews(): ReviewWithAuthor[] {
  return reviews
    .filter((r) => r.is_editorial && r.published)
    .map((r) => ({
      ...r,
      author: profiles.find((p) => p.id === r.author_id)!,
      photos: reviewPhotos.filter((p) => p.review_id === r.id),
      venue: venues.find((v) => v.id === r.venue_id)!,
    }))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getFeaturedReview(): ReviewWithAuthor | null {
  const featured = reviews.find((r) => r.is_editorial && r.featured && r.published);
  if (!featured) return null;
  return {
    ...featured,
    author: profiles.find((p) => p.id === featured.author_id)!,
    photos: reviewPhotos.filter((p) => p.review_id === featured.id),
    venue: venues.find((v) => v.id === featured.venue_id)!,
  };
}

export function getReviewByVenueSlug(venueSlug: string): ReviewWithAuthor | null {
  const venue = venues.find((v) => v.slug === venueSlug);
  if (!venue) return null;
  const review = reviews.find((r) => r.venue_id === venue.id && r.is_editorial && r.published);
  if (!review) return null;
  return {
    ...review,
    author: profiles.find((p) => p.id === review.author_id)!,
    photos: reviewPhotos.filter((p) => p.review_id === review.id),
    venue,
  };
}

export function getReviewById(id: string): ReviewWithAuthor | null {
  const review = reviews.find((r) => r.id === id);
  if (!review) return null;
  return {
    ...review,
    author: profiles.find((p) => p.id === review.author_id)!,
    photos: reviewPhotos.filter((p) => p.review_id === review.id),
    venue: venues.find((v) => v.id === review.venue_id)!,
  };
}

// Venue photo query
export function getVenuePhoto(venueId: string): string | undefined {
  const photo = venuePhotos.find((p) => p.venue_id === venueId && p.is_primary);
  return photo?.storage_path ?? venuePhotos.find((p) => p.venue_id === venueId)?.storage_path;
}
