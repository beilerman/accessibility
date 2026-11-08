-- Recorded from the live ThresholdAccess history (applied 2026-03-22 as
-- `remove_profiles_auth_fk_for_seeding`; it was never checked in). It let the
-- March sample profiles exist without auth accounts. New profiles are created
-- only by the on_auth_user_created trigger (migration 002), so every profile
-- after that has a matching auth user even without this foreign key.
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
