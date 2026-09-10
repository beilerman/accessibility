/**
 * Serve the public-source catalog without requiring a database connection.
 * Community features stay disabled while ThresholdAccess is paused and its
 * publication, profile-privilege, and upload RLS policies await review.
 * Re-enable only after restoring the database and verifying those controls.
 */
export const COMMUNITY_ENABLED = false;
