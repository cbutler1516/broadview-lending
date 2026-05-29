import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/brand/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/funnel/purchase",
    "/funnel/refinance",
    "/funnel/heloc",
    "/funnel/va",
    "/funnel/fha",
    "/learn",
    "/contact",
    "/privacy",
    "/terms",
    "/disclosures",
  ];

  return staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/funnel") ? 0.9 : 0.7,
  }));
}
