import type { MetadataRoute } from "next";
import { places } from "@/lib/catalog";
import { SITE_ORIGIN } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = SITE_ORIGIN;
  return [
    "",
    "/venues",
    "/about",
    "/sources",
    "/updates",
    "/visitor-reports",
    "/accessibility",
    "/access-in-pictures",
  ]
    .map((path) => ({ url: origin + path }))
    .concat(
      places.map((p) => ({
        url: `${origin}/venues/${p.slug}`,
        lastModified: p.checked_at,
      })),
    );
}
