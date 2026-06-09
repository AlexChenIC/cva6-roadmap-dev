import type { MetadataRoute } from "next";
import { roadmapItems } from "@/data/roadmap";

const baseUrl = "https://cva6-roadmap-dev.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/roadmap", "/projects", "/features", "/releases", "/organizations", "/contribute", "/license"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...roadmapItems.map((item) => ({
      url: `${baseUrl}/features/${item.id}`,
      lastModified: new Date(item.lastUpdated),
    })),
  ];
}
