-- Harden community permissions before any account feature is enabled.
--
-- Fixes found in the 2026-09-10 readiness review and confirmed against the
-- live database on 2026-11-08 (all tables empty, community features off):
--   * users could grant themselves is_admin / is_editor
--   * authors could self-publish or self-approve reviews
--   * any user could attach photos to anyone's review; photos of unpublished
--     reviews were publicly readable
--   * mobility_profile / home_city were readable by anonymous visitors
--   * no profile was ever created (no trigger, no insert policy)
--   * authors could not read back their own pending review
--   * anon/authenticated held TRUNCATE, which row-level security does not cover
--
-- Model: column-level GRANTs decide WHICH fields a role may touch; RLS
-- policies decide WHICH ROWS. Moderation happens only through
-- moderate_review(), a checked SECURITY DEFINER function.
-- Tests: src/__tests__/db/rls.test.ts runs this file in PGlite as anonymous,
-- user A, user B and a moderator.

-- 1. Start from no client privileges ---------------------------------------
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;

-- Read-only reference data.
GRANT SELECT ON venues, venue_accessibility_details, venue_photos, mobility_tips
  TO anon, authenticated;

-- 2. Roles -------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_moderator()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$
  SELECT coalesce(
    (SELECT p.is_editor OR p.is_admin FROM public.profiles p WHERE p.id = auth.uid()),
    false)
$$;
REVOKE ALL ON FUNCTION public.is_moderator() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.is_moderator() TO authenticated;

-- 3. Profiles ----------------------------------------------------------------
-- Public fields only; private fields come back through get_my_profile().
GRANT SELECT (id, display_name, bio, avatar_url, review_count, created_at)
  ON profiles TO anon, authenticated;
-- Owners may edit their own non-privileged fields. is_editor, is_admin and
-- review_count are deliberately not granted.
GRANT UPDATE (display_name, bio, avatar_url, mobility_profile, home_city)
  ON profiles TO authenticated;

DROP POLICY IF EXISTS "Public read profiles" ON profiles;
DROP POLICY IF EXISTS "Owner edit profile" ON profiles;
CREATE POLICY "Read public profile fields" ON profiles FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "Owner edits own profile" ON profiles FOR UPDATE
  TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

ALTER TABLE profiles
  ADD CONSTRAINT profiles_display_name_length CHECK (char_length(display_name) BETWEEN 1 AND 80);

CREATE OR REPLACE FUNCTION public.get_my_profile()
RETURNS SETOF public.profiles
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$ SELECT * FROM public.profiles WHERE id = auth.uid() $$;
REVOKE ALL ON FUNCTION public.get_my_profile() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.get_my_profile() TO authenticated;

-- Every new auth user gets exactly one ordinary profile.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    coalesce(nullif(left(trim(NEW.raw_user_meta_data ->> 'display_name'), 80), ''), 'Member')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM public, anon, authenticated;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Reviews -----------------------------------------------------------------
ALTER TABLE reviews
  ADD COLUMN moderated_by uuid REFERENCES profiles(id),
  ADD COLUMN moderated_at timestamptz,
  ADD COLUMN moderation_note text,
  ADD CONSTRAINT reviews_published_requires_approval
    CHECK (published = false OR status = 'approved'),
  ADD CONSTRAINT reviews_body_length CHECK (char_length(body) BETWEEN 1 AND 10000);

GRANT SELECT ON reviews TO anon, authenticated;
-- Authors write content only; status, published, featured, is_editorial,
-- body_html, helpful_count and moderation fields are never client-writable.
GRANT INSERT (venue_id, author_id, title, body, overall_rating, visit_date, mobility_device_used)
  ON reviews TO authenticated;
GRANT UPDATE (title, body, overall_rating, visit_date, mobility_device_used)
  ON reviews TO authenticated;
GRANT DELETE ON reviews TO authenticated;

DROP POLICY IF EXISTS "Public read published reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated create reviews" ON reviews;
DROP POLICY IF EXISTS "Author edit reviews" ON reviews;
CREATE POLICY "Read approved reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (published AND status = 'approved');
CREATE POLICY "Authors read own reviews" ON reviews FOR SELECT
  TO authenticated USING (author_id = auth.uid());
CREATE POLICY "Authors submit pending reviews" ON reviews FOR INSERT
  TO authenticated WITH CHECK (author_id = auth.uid() AND status = 'pending' AND NOT published);
CREATE POLICY "Authors edit own pending reviews" ON reviews FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid() AND status = 'pending')
  WITH CHECK (author_id = auth.uid() AND status = 'pending');
CREATE POLICY "Authors delete own pending reviews" ON reviews FOR DELETE
  TO authenticated USING (author_id = auth.uid() AND status = 'pending');

CREATE OR REPLACE FUNCTION public.moderate_review(
  review_id uuid, decision text, note text DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  author uuid;
BEGIN
  IF NOT public.is_moderator() THEN
    RAISE EXCEPTION 'not authorized' USING ERRCODE = '42501';
  END IF;
  IF decision NOT IN ('approved', 'rejected') THEN
    RAISE EXCEPTION 'decision must be approved or rejected' USING ERRCODE = '22023';
  END IF;
  SELECT r.author_id INTO author FROM public.reviews r WHERE r.id = review_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'review not found' USING ERRCODE = 'P0002';
  END IF;
  IF author = auth.uid() THEN
    RAISE EXCEPTION 'moderators cannot moderate their own review' USING ERRCODE = '42501';
  END IF;
  UPDATE public.reviews
     SET status = decision,
         published = (decision = 'approved'),
         moderated_by = auth.uid(),
         moderated_at = now(),
         moderation_note = note,
         updated_at = now()
   WHERE id = review_id;
END $$;
REVOKE ALL ON FUNCTION public.moderate_review(uuid, text, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.moderate_review(uuid, text, text) TO authenticated;

-- 5. Review photos -----------------------------------------------------------
-- Photo rows are visible only with an approved review (or to its author).
-- Upload paths must sit under the author's own folder: "<uid>/...".
GRANT SELECT ON review_photos TO anon, authenticated;
GRANT INSERT (review_id, storage_path, caption, photo_category, alt_text, sort_order)
  ON review_photos TO authenticated;
GRANT DELETE ON review_photos TO authenticated;

DROP POLICY IF EXISTS "Public read review photos" ON review_photos;
DROP POLICY IF EXISTS "Authenticated upload review photos" ON review_photos;
CREATE POLICY "Read photos of approved reviews" ON review_photos FOR SELECT
  TO anon, authenticated USING (EXISTS (
    SELECT 1 FROM reviews r
     WHERE r.id = review_photos.review_id AND r.published AND r.status = 'approved'));
CREATE POLICY "Authors read own review photos" ON review_photos FOR SELECT
  TO authenticated USING (EXISTS (
    SELECT 1 FROM reviews r WHERE r.id = review_photos.review_id AND r.author_id = auth.uid()));
CREATE POLICY "Authors attach photos to own pending reviews" ON review_photos FOR INSERT
  TO authenticated WITH CHECK (
    storage_path LIKE auth.uid()::text || '/%'
    AND EXISTS (
      SELECT 1 FROM reviews r
       WHERE r.id = review_photos.review_id
         AND r.author_id = auth.uid() AND r.status = 'pending'));
CREATE POLICY "Authors remove photos from own pending reviews" ON review_photos FOR DELETE
  TO authenticated USING (EXISTS (
    SELECT 1 FROM reviews r
     WHERE r.id = review_photos.review_id
       AND r.author_id = auth.uid() AND r.status = 'pending'));
