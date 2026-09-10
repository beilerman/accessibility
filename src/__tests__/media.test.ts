import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { venuePhotos, illustrations } from "@/lib/media";
import { places } from "@/lib/catalog";

describe("Public image provenance", () => {
  it("requires local venue images to have valid place mappings and reusable-source credits", () => {
    expect(venuePhotos.length).toBeGreaterThan(0);
    expect(new Set(venuePhotos.map((p) => p.src)).size).toBe(
      venuePhotos.length,
    );
    for (const photo of venuePhotos) {
      expect(places.some((p) => p.slug === photo.slug)).toBe(true);
      expect(photo.src.startsWith("/images/venues/")).toBe(true);
      expect(existsSync(path.join(process.cwd(), "public", photo.src))).toBe(
        true,
      );
      for (const value of [
        photo.alt,
        photo.author,
        photo.caption,
        photo.license,
      ])
        expect(value).toBeTruthy();
      for (const url of [photo.sourceUrl, photo.licenseUrl])
        expect(new URL(url).protocol).toBe("https:");
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
    }
  });
  it("keeps generated teaching examples separate from venue photographs", () => {
    expect(illustrations).toHaveLength(3);
    for (const item of illustrations) {
      expect(item.src.startsWith("/images/illustrations/")).toBe(true);
      expect(existsSync(path.join(process.cwd(), "public", item.src))).toBe(
        true,
      );
      expect(item.shown.length).toBeGreaterThan(0);
      expect(item.confirm.length).toBeGreaterThan(0);
      expect(new URL(item.guidanceUrl).protocol).toBe("https:");
      expect(venuePhotos.some((photo) => photo.src === item.src)).toBe(false);
    }
  });
});
