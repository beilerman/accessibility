// Legacy community queries are isolated while the public-source directory is active.
import { COMMUNITY_ENABLED } from "./catalog-mode";
import type * as Legacy from "./legacy-data";

export async function getVenues(
  ...args: Parameters<typeof Legacy.getVenues>
): ReturnType<typeof Legacy.getVenues> {
  if (!COMMUNITY_ENABLED) return [];
  return (await import("./legacy-data")).getVenues(...args);
}

export async function getVenueBySlug(
  ...args: Parameters<typeof Legacy.getVenueBySlug>
): ReturnType<typeof Legacy.getVenueBySlug> {
  if (!COMMUNITY_ENABLED) return null;
  return (await import("./legacy-data")).getVenueBySlug(...args);
}

export async function getFeaturedVenues(
  ...args: Parameters<typeof Legacy.getFeaturedVenues>
): ReturnType<typeof Legacy.getFeaturedVenues> {
  if (!COMMUNITY_ENABLED) return [];
  return (await import("./legacy-data")).getFeaturedVenues(...args);
}

export async function filterVenues(
  ...args: Parameters<typeof Legacy.filterVenues>
): ReturnType<typeof Legacy.filterVenues> {
  if (!COMMUNITY_ENABLED) return [];
  return (await import("./legacy-data")).filterVenues(...args);
}

export async function searchVenues(
  ...args: Parameters<typeof Legacy.searchVenues>
): ReturnType<typeof Legacy.searchVenues> {
  if (!COMMUNITY_ENABLED) return [];
  return (await import("./legacy-data")).searchVenues(...args);
}

export async function getUniqueCities(
  ...args: Parameters<typeof Legacy.getUniqueCities>
): ReturnType<typeof Legacy.getUniqueCities> {
  if (!COMMUNITY_ENABLED) return [];
  return (await import("./legacy-data")).getUniqueCities(...args);
}

export async function getEditorialReviews(
  ...args: Parameters<typeof Legacy.getEditorialReviews>
): ReturnType<typeof Legacy.getEditorialReviews> {
  if (!COMMUNITY_ENABLED) return [];
  return (await import("./legacy-data")).getEditorialReviews(...args);
}

export async function getFeaturedReview(
  ...args: Parameters<typeof Legacy.getFeaturedReview>
): ReturnType<typeof Legacy.getFeaturedReview> {
  if (!COMMUNITY_ENABLED) return null;
  return (await import("./legacy-data")).getFeaturedReview(...args);
}

export async function getVenuePhoto(
  ...args: Parameters<typeof Legacy.getVenuePhoto>
): ReturnType<typeof Legacy.getVenuePhoto> {
  if (!COMMUNITY_ENABLED) return undefined;
  return (await import("./legacy-data")).getVenuePhoto(...args);
}
