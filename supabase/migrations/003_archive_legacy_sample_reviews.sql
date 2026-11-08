-- Withdraw the March 2026 sample editorials from public reads.
--
-- The March plan commissioned three sample reviews written in Matthew
-- Brothers' voice. They are generated prose, not firsthand visits, and were
-- never approved by him (docs/DECISIONS.md section 2). The website stopped
-- showing them in September, but they stayed published in the database and
-- were readable with the public API key shipped in the site bundle.
--
-- Rows are kept as history, marked rejected with an explanatory note, so a
-- moderator cannot accidentally re-approve them without reading why.
UPDATE reviews
   SET published = false,
       featured = false,
       status = 'rejected',
       moderated_at = now(),
       moderation_note = 'Archived 2026-11-08: generated sample content from the March 2026 plan, '
         || 'not a firsthand account and not approved by the named author. Do not republish.'
 WHERE is_editorial
   AND created_at < '2026-04-01';
