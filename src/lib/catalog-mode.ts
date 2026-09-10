/**
 * Serve the public-source catalog without requiring a database connection.
 * Community features stay disabled while the restored ThresholdAccess database
 * and its
 * publication, profile-privilege, and upload RLS policies await review.
 * Re-enable only after implementing and verifying those controls.
 */
export const COMMUNITY_ENABLED = false;
