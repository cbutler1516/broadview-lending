import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/brand/config";
import { helocLandingPages } from "@/lib/heloc/content";
import { landingPages } from "@/lib/content/landing-pages";
import { knowledgeArticles } from "@/lib/content/knowledge";
import { getLiveCalculators } from "@/lib/content/calculators";
import { decisionGuides } from "@/lib/content/decision-guides";
import { comparisons } from "@/lib/content/comparisons";
import { lifeEvents } from "@/lib/content/life-events";
import { locationPages } from "@/lib/content/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/buy",
    "/refinance",
    "/heloc",
    "/learn",
    "/tools",
    "/guides",
    "/compare",
    "/life",
    "/locations",
    "/funnel/purchase",
    "/funnel/refinance",
    "/funnel/heloc",
    "/funnel/va",
    "/funnel/fha",
    "/contact",
    "/privacy",
    "/terms",
    "/disclosures",
  ];

  const dynamicRoutes = [
    ...landingPages.map((p) => p.path),
    ...helocLandingPages.map((p) => p.path),
    ...knowledgeArticles.map((a) => `/learn/${a.slug}`),
    ...getLiveCalculators().map((c) => `/tools/${c.slug}`),
    ...decisionGuides.map((g) => `/guides/${g.slug}`),
    ...comparisons.map((c) => `/compare/${c.slug}`),
    ...lifeEvents.map((e) => `/life/${e.slug}`),
    ...locationPages.map((l) => `/locations/${l.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path.startsWith("/heloc") ||
            path.startsWith("/buy") ||
            path.startsWith("/refinance") ||
            path.startsWith("/funnel")
          ? 0.9
          : 0.7,
  }));
}
