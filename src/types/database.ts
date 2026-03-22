// Enums
export type VenueCategory =
  | "restaurant"
  | "bar_brewery"
  | "coffee_shop"
  | "retail"
  | "grocery"
  | "pharmacy"
  | "medical_office"
  | "hospital"
  | "hotel"
  | "entertainment"
  | "museum_gallery"
  | "park_trail"
  | "sports_venue"
  | "theater_cinema"
  | "gym_fitness"
  | "government"
  | "transportation"
  | "worship"
  | "education"
  | "other";

export type AccessibilityRating =
  | "accessible"
  | "partially_accessible"
  | "not_accessible"
  | "not_yet_reviewed";

export type ParkingDistance = "adjacent" | "short" | "moderate" | "far";
export type EntranceType = "level" | "ramp" | "steps_only" | "steps_with_ramp" | "automatic_door" | "manual_door";
export type DoorWidth = "wide" | "standard" | "narrow";
export type RampSlope = "gentle" | "moderate" | "steep" | "too_steep";
export type FloorSurface = "smooth" | "carpet" | "uneven" | "mixed";
export type AisleWidth = "spacious" | "adequate" | "tight" | "impassable";
export type SeatingOptions = "flexible" | "fixed_booth" | "bar_height" | "mixed";
export type TableHeight = "standard" | "high_top" | "mixed" | "adjustable";
export type StallWidth = "spacious" | "adequate" | "tight";
export type StaffHelpfulness = "excellent" | "good" | "neutral" | "unhelpful" | "hostile";
export type NoiseLevel = "quiet" | "moderate" | "loud" | "very_loud";
export type Lighting = "well_lit" | "dim" | "mixed";
export type MobilityDevice = "scooter" | "manual_wheelchair" | "power_wheelchair" | "walker" | "cane" | "none_gait_disorder" | "stroller" | "other";
export type PhotoCategory = "entrance" | "interior" | "bathroom" | "parking" | "menu" | "exterior" | "signage" | "other";
export type MobilityType = "scooter" | "manual_wheelchair" | "power_wheelchair" | "walker" | "cane" | "gait_disorder" | "temporary_injury" | "stroller" | "other";

// Tables
export interface Venue {
  id: string;
  name: string;
  slug: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  google_place_id?: string;
  category: VenueCategory;
  subcategory?: string;
  phone?: string;
  website?: string;
  hours?: Record<string, { open: string; close: string }>;
  overall_rating: AccessibilityRating;
  has_editorial_review: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface VenueAccessibilityDetails {
  id: string;
  venue_id: string;
  // Parking
  has_accessible_parking?: boolean;
  parking_notes?: string;
  parking_distance_to_entrance?: ParkingDistance;
  // Entrance
  entrance_type?: EntranceType;
  entrance_door_width?: DoorWidth;
  entrance_has_automatic_door?: boolean;
  entrance_ramp_slope?: RampSlope;
  entrance_notes?: string;
  // Interior
  interior_floor_surface?: FloorSurface;
  interior_aisle_width?: AisleWidth;
  interior_has_elevator?: boolean;
  interior_multiple_floors?: boolean;
  interior_seating_options?: SeatingOptions;
  interior_table_height?: TableHeight;
  interior_notes?: string;
  // Bathroom
  bathroom_accessible?: boolean;
  bathroom_stall_width?: StallWidth;
  bathroom_has_grab_bars?: boolean;
  bathroom_door_width?: DoorWidth;
  bathroom_notes?: string;
  // Scooter-specific
  scooter_maneuverable?: boolean;
  scooter_charging_available?: boolean;
  scooter_notes?: string;
  // Overall
  staff_helpfulness?: StaffHelpfulness;
  noise_level?: NoiseLevel;
  lighting?: Lighting;
  last_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  venue_id: string;
  author_id: string;
  is_editorial: boolean;
  title?: string;
  body: string;
  body_html?: string;
  excerpt?: string;
  overall_rating: AccessibilityRating;
  visit_date?: string;
  mobility_device_used?: MobilityDevice;
  published: boolean;
  featured: boolean;
  status: "pending" | "approved" | "rejected";
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewPhoto {
  id: string;
  review_id: string;
  storage_path: string;
  caption?: string;
  photo_category?: PhotoCategory;
  alt_text: string;
  sort_order: number;
  created_at: string;
}

export interface Profile {
  id: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  mobility_profile: MobilityType[];
  home_city?: string;
  is_editor: boolean;
  is_admin: boolean;
  review_count: number;
  created_at: string;
}

export interface VenuePhoto {
  id: string;
  venue_id: string;
  storage_path: string;
  caption?: string;
  photo_category?: PhotoCategory;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
  uploaded_by?: string;
  created_at: string;
}

export interface MobilityTip {
  id: string;
  venue_id: string;
  mobility_type: MobilityType;
  tip: string;
  author_id?: string;
  created_at: string;
}

// Joined types for pages
export interface VenueWithDetails extends Venue {
  accessibility_details?: VenueAccessibilityDetails;
  photos: VenuePhoto[];
  reviews: Review[];
  mobility_tips: MobilityTip[];
}

export interface ReviewWithAuthor extends Review {
  author: Profile;
  photos: ReviewPhoto[];
  venue: Venue;
}

// Category display config
export const CATEGORY_LABELS: Record<VenueCategory, string> = {
  restaurant: "Restaurants",
  bar_brewery: "Bars & Breweries",
  coffee_shop: "Coffee Shops",
  retail: "Retail",
  grocery: "Grocery",
  pharmacy: "Pharmacy",
  medical_office: "Medical Offices",
  hospital: "Hospitals",
  hotel: "Hotels",
  entertainment: "Entertainment",
  museum_gallery: "Museums & Galleries",
  park_trail: "Parks & Trails",
  sports_venue: "Sports Venues",
  theater_cinema: "Theaters & Cinemas",
  gym_fitness: "Gyms & Fitness",
  government: "Government",
  transportation: "Transportation",
  worship: "Places of Worship",
  education: "Education",
  other: "Other",
};

export const RATING_LABELS: Record<AccessibilityRating, string> = {
  accessible: "Accessible",
  partially_accessible: "Partially Accessible",
  not_accessible: "Not Accessible",
  not_yet_reviewed: "Not Yet Reviewed",
};

export const MOBILITY_DEVICE_LABELS: Record<MobilityDevice, string> = {
  scooter: "Mobility Scooter",
  manual_wheelchair: "Manual Wheelchair",
  power_wheelchair: "Power Wheelchair",
  walker: "Walker",
  cane: "Cane",
  none_gait_disorder: "Gait Disorder (no device)",
  stroller: "Stroller",
  other: "Other",
};
