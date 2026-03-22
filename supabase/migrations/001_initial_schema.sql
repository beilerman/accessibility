-- Enums
CREATE TYPE venue_category AS ENUM (
  'restaurant', 'bar_brewery', 'coffee_shop', 'retail', 'grocery',
  'pharmacy', 'medical_office', 'hospital', 'hotel', 'entertainment',
  'museum_gallery', 'park_trail', 'sports_venue', 'theater_cinema',
  'gym_fitness', 'government', 'transportation', 'worship', 'education', 'other'
);

CREATE TYPE accessibility_rating AS ENUM (
  'accessible', 'partially_accessible', 'not_accessible', 'not_yet_reviewed'
);

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  mobility_profile TEXT[],
  home_city TEXT,
  is_editor BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Venues
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'KY',
  zip TEXT NOT NULL,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  google_place_id TEXT,
  category venue_category NOT NULL,
  subcategory TEXT,
  phone TEXT,
  website TEXT,
  hours JSONB,
  overall_rating accessibility_rating DEFAULT 'not_yet_reviewed',
  has_editorial_review BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Venue accessibility details
CREATE TABLE venue_accessibility_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  has_accessible_parking BOOLEAN,
  parking_notes TEXT,
  parking_distance_to_entrance TEXT,
  entrance_type TEXT,
  entrance_door_width TEXT,
  entrance_has_automatic_door BOOLEAN,
  entrance_ramp_slope TEXT,
  entrance_notes TEXT,
  interior_floor_surface TEXT,
  interior_aisle_width TEXT,
  interior_has_elevator BOOLEAN,
  interior_multiple_floors BOOLEAN,
  interior_seating_options TEXT,
  interior_table_height TEXT,
  interior_notes TEXT,
  bathroom_accessible BOOLEAN,
  bathroom_stall_width TEXT,
  bathroom_has_grab_bars BOOLEAN,
  bathroom_door_width TEXT,
  bathroom_notes TEXT,
  scooter_maneuverable BOOLEAN,
  scooter_charging_available BOOLEAN,
  scooter_notes TEXT,
  staff_helpfulness TEXT,
  noise_level TEXT,
  lighting TEXT,
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id),
  is_editorial BOOLEAN DEFAULT FALSE,
  title TEXT,
  body TEXT NOT NULL,
  body_html TEXT,
  excerpt TEXT,
  overall_rating accessibility_rating NOT NULL,
  visit_date DATE,
  mobility_device_used TEXT,
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Review photos
CREATE TABLE review_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  caption TEXT,
  photo_category TEXT,
  alt_text TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Venue photos
CREATE TABLE venue_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  caption TEXT,
  photo_category TEXT,
  alt_text TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mobility tips
CREATE TABLE mobility_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  mobility_type TEXT NOT NULL,
  tip TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_accessibility_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE mobility_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read venues" ON venues FOR SELECT USING (true);
CREATE POLICY "Public read accessibility details" ON venue_accessibility_details FOR SELECT USING (true);
CREATE POLICY "Public read published reviews" ON reviews FOR SELECT USING (published = true);
CREATE POLICY "Public read review photos" ON review_photos FOR SELECT USING (true);
CREATE POLICY "Public read venue photos" ON venue_photos FOR SELECT USING (true);
CREATE POLICY "Public read mobility tips" ON mobility_tips FOR SELECT USING (true);
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);

-- Authenticated write access
CREATE POLICY "Authenticated create reviews" ON reviews FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Author edit reviews" ON reviews FOR UPDATE TO authenticated
  USING (auth.uid() = author_id);
CREATE POLICY "Authenticated upload review photos" ON review_photos FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY "Owner edit profile" ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Indexes
CREATE INDEX idx_venues_slug ON venues(slug);
CREATE INDEX idx_venues_category ON venues(category);
CREATE INDEX idx_venues_city ON venues(city);
CREATE INDEX idx_venues_rating ON venues(overall_rating);
CREATE INDEX idx_reviews_venue_id ON reviews(venue_id);
CREATE INDEX idx_reviews_editorial ON reviews(is_editorial) WHERE is_editorial = true;
CREATE INDEX idx_venue_photos_venue_id ON venue_photos(venue_id);
CREATE INDEX idx_mobility_tips_venue_id ON mobility_tips(venue_id);
