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
import { PRODUCT_DEFINITIONS } from "@/lib/product/configs";
import { getPublishedPosts } from "@/lib/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {

  const staticRoutes = [
    "",
    "/buy",
    "/refinance",
    "/heloc",
    "/commercial",
    "/invest",
    "/learn",
    "/learn/realtor-academy",
    "/learn/homebuyer-center",
    "/blog",
    "/completed-financing",
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
    ...PRODUCT_DEFINITIONS.map((product) => product.path),
  ];

  const aliases = new Set(PRODUCT_DEFINITIONS.filter(product => product.canonicalPath && product.canonicalPath !== product.path).map(product => product.path));
  const existing: MetadataRoute.Sitemap = [...new Set([...staticRoutes, ...dynamicRoutes])].filter(path => !aliases.has(path)).map((path) => ({
    url: `${siteUrl}${path}`,
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
  return [...existing, ...getPublishedPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.updatedAt}T12:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))];
}
