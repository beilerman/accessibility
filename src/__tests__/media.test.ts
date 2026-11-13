import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  venuePhotos,
  aiVenueImages,
  illustrations,
  categoryArt,
  artForCategory,
  photoForPlace,
  accessPhotos,
  accessGuides,
} from "@/lib/media";
import { places } from "@/lib/catalog";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AccessMedia } from "@/components/catalog/AccessMedia";

describe("Public image provenance", () => {
  it("labels an original web gallery without inventing PDF pages or download size", () => {
    const html = renderToStaticMarkup(createElement(AccessMedia, { slug: "paycor-stadium" }));
    const doc = new DOMParser().parseFromString(html, "text/html");
    const link = doc.querySelector('a[href="https://www.bengals.com/news/2026-paycor-stadium-renovations-first-look"]');
    expect(link?.textContent).toContain("Open photo guide (web page, 26 photos)");
    expect(link?.textContent).not.toContain("PDF");
    expect(link?.getAttribute("rel")).toContain("noopener");
    expect(doc.body.textContent).not.toMatch(/undefined|null/);
    const singlePhotoHtml = renderToStaticMarkup(createElement(AccessMedia, { slug: "mary-rose-mission" }));
    expect(singlePhotoHtml).toContain("Open photo guide (web page, 1 photo)");
    const pdfHtml = renderToStaticMarkup(createElement(AccessMedia, { slug: "cincinnati-art-museum" }));
    expect(pdfHtml).toContain("Open photo guide (PDF, 20 pages, 2.3 MB)");
  });
  it("keeps access photographs licensed and route references tied to the right place", () => {
    expect(new Set(accessPhotos.map((photo) => photo.id)).size).toBe(accessPhotos.length);
    expect(new Set(accessPhotos.map((photo) => photo.src)).size).toBe(accessPhotos.length);
    for (const photo of accessPhotos) {
      const place = places.find((place) => place.slug === photo.slug);
      expect(place).toBeDefined();
      expect(photo.src.startsWith("/images/access/")).toBe(true);
      expect(existsSync(path.join(process.cwd(), "public", photo.src))).toBe(true);
      for (const value of [photo.alt, photo.caption, photo.author, photo.license, photo.limitations]) {
        expect(value.trim().length).toBeGreaterThan(0);
      }
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
      expect(new URL(photo.sourceUrl).protocol).toBe("https:");
      expect(new URL(photo.licenseUrl).protocol).toBe("https:");
      for (const id of photo.relatedFactIds) {
        expect(place!.facts.some((fact) => fact.id === id)).toBe(true);
      }
    }
    expect(new Set(accessGuides.map((guide) => guide.id)).size).toBe(accessGuides.length);
    for (const guide of accessGuides) {
      expect(places.some((place) => place.slug === guide.slug)).toBe(true);
      expect(new URL(guide.url).protocol).toBe("https:");
      expect(new URL(guide.sourceUrl).protocol).toBe("https:");
      if (guide.format === "web") {
        expect(guide.imageCount).toBeGreaterThan(0);
        expect(guide.pageCount).toBeUndefined();
      } else {
        expect(guide.pageCount).toBeGreaterThan(0);
        expect(guide.sizeLabel).toBeTruthy();
      }
      expect(guide.publisher).toBeTruthy();
      expect(guide.description).toBeTruthy();
      expect(guide.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
  it("provides every listing with either a real photo or explicitly generated category art", () => {
    expect(new Set(categoryArt.map((item) => item.category)).size).toBe(
      categoryArt.length,
    );
    for (const item of categoryArt) {
      expect(item.alt).toMatch(/^AI/);
      expect(item.src.startsWith("/images/categories/")).toBe(true);
      expect(existsSync(path.join(process.cwd(), "public", item.src))).toBe(
        true,
      );
    }
    for (const place of places)
      expect(
        photoForPlace(place.slug) || artForCategory(place.category),
      ).toBeTruthy();
  });
  it("requires local venue images to have valid place mappings and reusable-source credits", () => {
    expect(venuePhotos.length).toBeGreaterThan(0);
    expect(new Set(venuePhotos.map((p) => p.src)).size).toBe(
      venuePhotos.length,
    );
    // One photo per place: photoForPlace returns the first match, so a
    // duplicate would be silently hidden.
    expect(new Set(venuePhotos.map((p) => p.slug)).size).toBe(
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
  it("labels AI images of real places and never pairs them with a real photo", () => {
    expect(new Set(aiVenueImages.map((i) => i.slug)).size).toBe(
      aiVenueImages.length,
    );
    for (const image of aiVenueImages) {
      expect(places.some((p) => p.slug === image.slug)).toBe(true);
      expect(venuePhotos.some((p) => p.slug === image.slug)).toBe(false);
      expect(image.src.startsWith("/images/ai-venues/")).toBe(true);
      expect(existsSync(path.join(process.cwd(), "public", image.src))).toBe(
        true,
      );
      expect(image.alt).toMatch(/^AI-generated /);
      expect(image.caption).toMatch(/^AI-generated image, not a photograph\./);
      expect(new URL(image.referencePage).protocol).toBe("https:");
      expect(image.referenceDate).toBeTruthy();
      expect(image.knownDifferences).toBeTruthy();
      // Cropped above ground level, which never leaves a portrait frame.
      expect(image.width).toBeGreaterThanOrEqual(image.height);
    }
  });
});
