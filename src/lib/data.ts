import { createClient } from "@supabase/supabase-js";
import type {
  Venue,
  VenueWithDetails,
  ReviewWithAuthor,
  VenueCategory,
  AccessibilityRating,
} from "@/types/database";

// Server-side Supabase client (no cookie auth needed for public reads)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Venue queries
export async function getVenues(): Promise<Venue[]> {
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .neq("overall_rating", "not_yet_reviewed")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getVenueBySlug(slug: string): Promise<VenueWithDetails | null> {
  const { data: venue, error } = await supabase
    .from("venues")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !venue) return null;

  const [detailsRes, photosRes, reviewsRes, tipsRes] = await Promise.all([
    supabase.from("venue_accessibility_details").select("*").eq("venue_id", venue.id).single(),
    supabase.from("venue_photos").select("*").eq("venue_id", venue.id).order("sort_order"),
    supabase.from("reviews").select("*").eq("venue_id", venue.id).eq("published", true),
    supabase.from("mobility_tips").select("*").eq("venue_id", venue.id),
  ]);

  return {
    ...venue,
    accessibility_details: detailsRes.data ?? undefined,
    photos: photosRes.data ?? [],
    reviews: reviewsRes.data ?? [],
    mobility_tips: tipsRes.data ?? [],
  };
}

export async function getFeaturedVenues(): Promise<Venue[]> {
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("featured", true);
  if (error) throw error;
  return data ?? [];
}

export async function filterVenues(params: {
  category?: VenueCategory | null;
  city?: string | null;
  rating?: AccessibilityRating | null;
  features?: string[];
}): Promise<Venue[]> {
  let query = supabase.from("venues").select("*").neq("overall_rating", "not_yet_reviewed").order("name");

  if (params.category) {
    query = query.eq("category", params.category);
  }
  if (params.city) {
    query = query.ilike("city", params.city);
  }
  if (params.rating) {
    query = query.eq("overall_rating", params.rating);
  }

  const { data: venues, error } = await query;
  if (error) throw error;
  let result = venues ?? [];

  // Feature filtering requires joining with accessibility_details
  if (params.features && params.features.length > 0) {
    const venueIds = result.map((v) => v.id);
    const { data: details } = await supabase
      .from("venue_accessibility_details")
      .select("*")
      .in("venue_id", venueIds);

    if (details) {
      result = result.filter((v) => {
        const d = details.find((det: Record<string, unknown>) => det.venue_id === v.id);
        if (!d) return false;
        return params.features!.every((f) => {
          switch (f) {
            case "accessible_parking": return d.has_accessible_parking;
            case "automatic_door": return d.entrance_has_automatic_door;
            case "accessible_bathroom": return d.bathroom_accessible;
            case "scooter_friendly": return d.scooter_maneuverable;
            case "elevator": return d.interior_has_elevator;
            case "scooter_charging": return d.scooter_charging_available;
            default: return false;
          }
        });
      });
    }
  }

  return result;
}

export async function searchVenues(query: string): Promise<Venue[]> {
  const q = `%${query}%`;
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .neq("overall_rating", "not_yet_reviewed")
    .or(`name.ilike.${q},city.ilike.${q},category.ilike.${q}`)
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getUniqueCities(): Promise<string[]> {
  const { data, error } = await supabase
    .from("venues")
    .select("city")
    .neq("overall_rating", "not_yet_reviewed")
    .order("city");
  if (error) throw error;
  return [...new Set((data ?? []).map((v: { city: string }) => v.city))];
}

// Review queries
export async function getEditorialReviews(): Promise<ReviewWithAuthor[]> {
  const { data: reviewsData, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_editorial", true)
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error || !reviewsData) return [];

  const results: ReviewWithAuthor[] = [];
  for (const review of reviewsData) {
    const [authorRes, photosRes, venueRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", review.author_id).single(),
      supabase.from("review_photos").select("*").eq("review_id", review.id).order("sort_order"),
      supabase.from("venues").select("*").eq("id", review.venue_id).single(),
    ]);
    if (authorRes.data && venueRes.data) {
      results.push({
        ...review,
        author: authorRes.data,
        photos: photosRes.data ?? [],
        venue: venueRes.data,
      });
    }
  }
  return results;
}

export async function getFeaturedReview(): Promise<ReviewWithAuthor | null> {
  const { data: review, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_editorial", true)
    .eq("featured", true)
    .eq("published", true)
    .limit(1)
    .single();
  if (error || !review) return null;

  const [authorRes, photosRes, venueRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", review.author_id).single(),
    supabase.from("review_photos").select("*").eq("review_id", review.id).order("sort_order"),
    supabase.from("venues").select("*").eq("id", review.venue_id).single(),
  ]);
  if (!authorRes.data || !venueRes.data) return null;

  return {
    ...review,
    author: authorRes.data,
    photos: photosRes.data ?? [],
    venue: venueRes.data,
  };
}

export async function getVenuePhoto(venueId: string): Promise<string | undefined> {
  const { data } = await supabase
    .from("venue_photos")
    .select("storage_path")
    .eq("venue_id", venueId)
    .order("is_primary", { ascending: false })
    .order("sort_order")
    .limit(1)
    .single();
  return data?.storage_path ?? undefined;
}
