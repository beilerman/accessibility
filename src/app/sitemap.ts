import type { MetadataRoute } from "next";
import { places } from "@/lib/catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://accessibility-omega-ten.vercel.app";
  return ["", "/venues", "/about", "/sources", "/accessibility"]
    .map((path) => ({ url: origin + path }))
    .concat(
      places.map((p) => ({
        url: `${origin}/venues/${p.slug}`,
        lastModified: p.checked_at,
      })),
    );
}
