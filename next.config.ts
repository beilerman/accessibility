import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Venue images are static files that never change under the same name.
    // The default 4-hour cache makes the optimizer redo each size many times
    // a month, which spends the hosting plan's transformation quota.
    minimumCacheTTL: 2678400, // 31 days
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
