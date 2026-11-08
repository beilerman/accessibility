// @vitest-environment node
/**
 * Authorization tests for the community database, run in PGlite (real
 * Postgres compiled to WebAssembly) with a minimal stand-in for Supabase's
 * auth schema. Reproduces the live grants (Supabase gives anon/authenticated
 * every table privilege by default), applies the checked-in migrations in
 * order, then exercises allowed AND denied operations as an anonymous
 * visitor, two ordinary users and a moderator.
 *
 * Limits: this validates SQL grants, policies and functions. It does not
 * exercise Supabase Auth, PostgREST, Storage or the live project.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";

const A = "00000000-0000-4000-8000-00000000000a";
const B = "00000000-0000-4000-8000-00000000000b";
const MOD = "00000000-0000-4000-8000-0000000000ad";
const VENUE = "00000000-0000-4000-8000-0000000000e1";

const SUPABASE_STUB = `
  CREATE ROLE anon NOLOGIN;
  CREATE ROLE authenticated NOLOGIN;
  CREATE SCHEMA auth;
  CREATE TABLE auth.users (id uuid PRIMARY KEY, raw_user_meta_data jsonb DEFAULT '{}'::jsonb);
  CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$
    SELECT nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'sub', '')::uuid
  $$;
  GRANT USAGE ON SCHEMA auth, public TO anon, authenticated;
  GRANT EXECUTE ON FUNCTION auth.uid() TO anon, authenticated;
  -- Supabase's default: every new public table is fully granted to clients.
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
`;

let db: PGlite;

/** Run statements as a role; null user = anonymous visitor. */
async function as<T = Record<string, unknown>>(
  user: string | null,
  sql: string,
  params: unknown[] = [],
) {
  await db.exec("RESET ROLE");
  await db.query("SELECT set_config('request.jwt.claims', $1, false)", [
    user ? JSON.stringify({ sub: user, role: "authenticated" }) : "",
  ]);
  await db.exec(user ? "SET ROLE authenticated" : "SET ROLE anon");
  try {
    return await db.query<T>(sql, params);
  } finally {
    await db.exec("RESET ROLE");
  }
}

async function denied(user: string | null, sql: string, params: unknown[] = []) {
  await expect(as(user, sql, params)).rejects.toThrow(
    /permission denied|row-level security|not authorized|cannot moderate/,
  );
}

async function signUp(id: string, meta: object = {}) {
  await db.query("INSERT INTO auth.users (id, raw_user_meta_data) VALUES ($1, $2)", [
    id,
    JSON.stringify(meta),
  ]);
}

async function submitReview(user: string, body = "Level entrance at the north door.") {
  const r = await as<{ id: string }>(
    user,
    `INSERT INTO reviews (venue_id, author_id, body, overall_rating)
     VALUES ($1, $2, $3, 'accessible') RETURNING id`,
    [VENUE, user, body],
  );
  return r.rows[0].id;
}

beforeAll(async () => {
  db = new PGlite();
  await db.exec(SUPABASE_STUB);
  const dir = path.resolve(__dirname, "../../../supabase/migrations");
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
    await db.exec(readFileSync(path.join(dir, f), "utf8"));
  }
  await db.query(
    `INSERT INTO venues (id, name, slug, address_line1, city, zip, category)
     VALUES ($1, 'Test Library', 'test-library', '1 Main St', 'Florence', '41042', 'education')`,
    [VENUE],
  );
  await signUp(A, { display_name: "Avery" });
  await signUp(B);
  await signUp(MOD, { display_name: "Morgan" });
  // Moderators are appointed by an administrator with direct database access.
  await db.query("UPDATE profiles SET is_editor = true WHERE id = $1", [MOD]);
}, 60_000);

describe("profiles", () => {
  it("are created on sign-up with a safe default name and no privileges", async () => {
    const r = await db.query<{ id: string; display_name: string; is_admin: boolean; is_editor: boolean }>(
      "SELECT id, display_name, is_admin, is_editor FROM profiles ORDER BY display_name",
    );
    expect(r.rows.map((p) => p.display_name)).toEqual(["Avery", "Member", "Morgan"]);
    expect(r.rows.find((p) => p.id === A)).toMatchObject({ is_admin: false, is_editor: false });
  });

  it("expose public fields to anyone but never mobility or home details", async () => {
    const r = await as<{ display_name: string }>(null, "SELECT display_name FROM profiles WHERE id = $1", [A]);
    expect(r.rows[0].display_name).toBe("Avery");
    await denied(null, "SELECT mobility_profile FROM profiles");
    await denied(B, "SELECT home_city FROM profiles WHERE id = $1", [A]);
    await denied(null, "SELECT * FROM profiles");
  });

  it("let owners edit their own ordinary fields and read them back privately", async () => {
    await as(A, "UPDATE profiles SET bio = 'Power chair user', mobility_profile = '{power_chair}', home_city = 'Florence' WHERE id = $1", [A]);
    const mine = await as<{ mobility_profile: string[]; home_city: string }>(A, "SELECT * FROM get_my_profile()");
    expect(mine.rows).toHaveLength(1);
    expect(mine.rows[0]).toMatchObject({ mobility_profile: ["power_chair"], home_city: "Florence" });
    const theirs = await as(B, "SELECT * FROM get_my_profile()");
    expect(theirs.rows[0]).toMatchObject({ id: B, home_city: null });
    await denied(null, "SELECT * FROM get_my_profile()");
  });

  it("never let users grant themselves privileges or edit others", async () => {
    await denied(A, "UPDATE profiles SET is_admin = true WHERE id = $1", [A]);
    await denied(A, "UPDATE profiles SET is_editor = true WHERE id = $1", [A]);
    await denied(A, "UPDATE profiles SET review_count = 99 WHERE id = $1", [A]);
    const r = await as(B, "UPDATE profiles SET bio = 'hijacked' WHERE id = $1", [A]);
    expect(r.affectedRows).toBe(0);
    await denied(A, "INSERT INTO profiles (id, display_name) VALUES ($1, 'x')", [B]);
    await denied(A, "DELETE FROM profiles WHERE id = $1", [A]);
  });
});

describe("reviews", () => {
  let pending: string;
  beforeAll(async () => {
    pending = await submitReview(A);
  });

  it("are submitted as pending and readable by their author only", async () => {
    expect(pending).toMatch(/[0-9a-f-]{36}/);
    expect((await as(A, "SELECT id FROM reviews WHERE id = $1", [pending])).rows).toHaveLength(1);
    expect((await as(B, "SELECT id FROM reviews WHERE id = $1", [pending])).rows).toHaveLength(0);
    expect((await as(null, "SELECT id FROM reviews WHERE id = $1", [pending])).rows).toHaveLength(0);
  });

  it("cannot be self-published, self-approved, featured or written for someone else", async () => {
    const base = "INSERT INTO reviews (venue_id, author_id, body, overall_rating";
    await denied(A, `${base}, published) VALUES ($1, $2, 'x', 'accessible', true)`, [VENUE, A]);
    await denied(A, `${base}, status) VALUES ($1, $2, 'x', 'accessible', 'approved')`, [VENUE, A]);
    await denied(A, `${base}, is_editorial) VALUES ($1, $2, 'x', 'accessible', true)`, [VENUE, A]);
    await denied(A, `${base}, featured) VALUES ($1, $2, 'x', 'accessible', true)`, [VENUE, A]);
    await denied(A, `${base}, body_html) VALUES ($1, $2, 'x', 'accessible', '<script>')`, [VENUE, A]);
    await denied(A, `${base}) VALUES ($1, $2, 'x', 'accessible')`, [VENUE, B]);
    await denied(null, `${base}) VALUES ($1, $2, 'x', 'accessible')`, [VENUE, A]);
    await denied(A, "UPDATE reviews SET published = true WHERE id = $1", [pending]);
    await denied(A, "UPDATE reviews SET status = 'approved' WHERE id = $1", [pending]);
    await denied(A, "UPDATE reviews SET helpful_count = 500 WHERE id = $1", [pending]);
  });

  it("can be edited or withdrawn by the author only while pending", async () => {
    await as(A, "UPDATE reviews SET body = 'Level entrance; door is heavy.' WHERE id = $1", [pending]);
    expect((await as(B, "UPDATE reviews SET body = 'vandalized' WHERE id = $1", [pending])).affectedRows).toBe(0);
    expect((await as(B, "DELETE FROM reviews WHERE id = $1", [pending])).affectedRows).toBe(0);
    const draft = await submitReview(A, "Withdrawn draft.");
    expect((await as(A, "DELETE FROM reviews WHERE id = $1", [draft])).affectedRows).toBe(1);
  });

  it("are published only by a moderator who is not the author", async () => {
    await denied(A, "SELECT moderate_review($1, 'approved')", [pending]);
    await denied(null, "SELECT moderate_review($1, 'approved')", [pending]);
    const own = await submitReview(MOD, "Moderator's own visit.");
    await denied(MOD, "SELECT moderate_review($1, 'approved')", [own]);
    // Moderators act through the function, never by editing rows directly.
    await denied(MOD, "UPDATE reviews SET status = 'approved' WHERE id = $1", [pending]);
    expect((await as(MOD, "UPDATE reviews SET body = 'rewritten' WHERE id = $1", [pending])).affectedRows).toBe(0);

    await as(MOD, "SELECT moderate_review($1, 'approved', 'Matches photos')", [pending]);
    const pub = await as<{ body: string; moderated_by: string; published: boolean }>(
      null, "SELECT body, moderated_by, published FROM reviews WHERE id = $1", [pending]);
    expect(pub.rows[0]).toMatchObject({ body: "Level entrance; door is heavy.", moderated_by: MOD, published: true });

    // Approved content is frozen for its author.
    expect((await as(A, "UPDATE reviews SET body = 'changed later' WHERE id = $1", [pending])).affectedRows).toBe(0);
    expect((await as(A, "DELETE FROM reviews WHERE id = $1", [pending])).affectedRows).toBe(0);
  });

  it("rejection keeps a review private and rejects bad decisions", async () => {
    const r = await submitReview(B, "Unclear claim.");
    await expect(as(MOD, "SELECT moderate_review($1, 'maybe')", [r])).rejects.toThrow(/approved or rejected/);
    await as(MOD, "SELECT moderate_review($1, 'rejected', 'Needs a visit date')", [r]);
    expect((await as(null, "SELECT id FROM reviews WHERE id = $1", [r])).rows).toHaveLength(0);
    const own = await as<{ status: string }>(B, "SELECT status FROM reviews WHERE id = $1", [r]);
    expect(own.rows[0].status).toBe("rejected");
  });

  it("enforce publication only after approval at the table level", async () => {
    const r = await submitReview(B, "Constraint check.");
    await expect(db.query("UPDATE reviews SET published = true WHERE id = $1", [r])).rejects.toThrow(
      /reviews_published_requires_approval/,
    );
  });
});

describe("review photos", () => {
  let mine: string;
  beforeAll(async () => {
    mine = await submitReview(A, "Photo test.");
  });

  it("attach only to the author's own pending review, under the author's folder", async () => {
    const ins = "INSERT INTO review_photos (review_id, storage_path, alt_text) VALUES ($1, $2, 'Ramp at entrance')";
    await as(A, ins, [mine, `${A}/ramp.jpg`]);
    await denied(B, ins, [mine, `${B}/spam.jpg`]);
    await denied(A, ins, [mine, `${B}/other-user.jpg`]);
    await denied(A, ins, [mine, "public/ramp.jpg"]);
    await denied(null, ins, [mine, `${A}/x.jpg`]);
  });

  it("stay private until the review is approved", async () => {
    const sel = "SELECT storage_path FROM review_photos WHERE review_id = $1";
    expect((await as(null, sel, [mine])).rows).toHaveLength(0);
    expect((await as(B, sel, [mine])).rows).toHaveLength(0);
    expect((await as(A, sel, [mine])).rows).toHaveLength(1);
    await as(MOD, "SELECT moderate_review($1, 'approved')", [mine]);
    expect((await as(null, sel, [mine])).rows).toHaveLength(1);
    // After approval the author can no longer add or remove photos.
    await denied(A, "INSERT INTO review_photos (review_id, storage_path, alt_text) VALUES ($1, $2, 'late')", [mine, `${A}/late.jpg`]);
    expect((await as(A, "DELETE FROM review_photos WHERE review_id = $1", [mine])).affectedRows).toBe(0);
  });
});

describe("reference data and dangerous privileges", () => {
  it("is public to read and closed to client writes", async () => {
    expect((await as(null, "SELECT slug FROM venues")).rows).toHaveLength(1);
    await denied(null, "INSERT INTO venues (name, slug, address_line1, city, zip, category) VALUES ('x','x','x','x','x','other')");
    await denied(A, "UPDATE venues SET name = 'renamed'");
    await denied(A, "DELETE FROM venues");
    await denied(A, "INSERT INTO mobility_tips (venue_id, mobility_type, tip) VALUES ($1, 'x', 'x')", [VENUE]);
    await denied(A, "INSERT INTO venue_photos (venue_id, storage_path, alt_text) VALUES ($1, 'x', 'x')", [VENUE]);
  });

  it("never allows TRUNCATE, which row-level security does not cover", async () => {
    for (const t of ["reviews", "profiles", "venues", "review_photos"]) {
      await denied(null, `TRUNCATE ${t} CASCADE`);
      await denied(A, `TRUNCATE ${t} CASCADE`);
    }
  });
});

describe("legacy sample content", () => {
  it("archives March sample editorials instead of deleting them", async () => {
    await db.exec("RESET ROLE");
    await db.query(
      `INSERT INTO profiles (id, display_name, is_editor) VALUES ('00000000-0000-4000-8000-0000000000aa', 'Sample Author', true)`,
    );
    await db.query(
      `INSERT INTO reviews (venue_id, author_id, body, overall_rating, is_editorial, published, status, featured, created_at)
       VALUES ($1, '00000000-0000-4000-8000-0000000000aa', 'Generated sample.', 'accessible', true, true, 'approved', true, '2026-03-22')`,
      [VENUE],
    );
    const dir = path.resolve(__dirname, "../../../supabase/migrations");
    await db.exec(readFileSync(path.join(dir, "003_archive_legacy_sample_reviews.sql"), "utf8"));
    const r = await db.query<{ published: boolean; status: string; moderation_note: string }>(
      "SELECT published, status, moderation_note FROM reviews WHERE author_id = '00000000-0000-4000-8000-0000000000aa'",
    );
    expect(r.rows).toHaveLength(1);
    expect(r.rows[0]).toMatchObject({ published: false, status: "rejected" });
    expect(r.rows[0].moderation_note).toMatch(/not a firsthand account/);
    expect((await as(null, "SELECT id FROM reviews WHERE is_editorial")).rows).toHaveLength(0);
  });
});
