import type { MetadataRoute } from "next";
import { roadmapItems } from "@/data/roadmap";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/roadmap", "/releases", "/organizations", "/resources", "/license"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...roadmapItems.map((item) => ({
      url: `${siteUrl}/roadmap/${item.id}`,
      lastModified: new Date(item.lastUpdated),
    })),
  ];
}
