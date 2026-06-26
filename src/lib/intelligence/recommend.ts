import type { RelatedRefs, ResolvedLink } from "@/lib/content/types";
import { resolveRelated, type ResolvedRelated } from "@/lib/content/related";
import { connectionsForPath, mergeRefs } from "@/lib/intelligence/graph";
import { getGuide } from "@/lib/content/decision-guides";
import { getCalculator } from "@/lib/content/calculators";
import { getLocation } from "@/lib/content/locations";
import type { VisitorIntent } from "@/lib/intelligence/visitor";

/**
 * Recommendation Engine 2.0. Given everything we know about a visitor, return a
 * personalized, ranked set of next best steps across every content type. Pure
 * and isomorphic — callable from server or client.
 */
export type RecommendationContext = {
  intent?: VisitorIntent;
  funnelType?: string;
  currentPath?: string;
  previousPath?: string;
  guideResult?: { slug: string; tier?: string };
  calcResult?: { slug: string };
  location?: string;
  leadSubmitted?: boolean;
};

export type Recommendations = ResolvedRelated & { advisorCta: boolean };

const intentSeeds: Record<VisitorIntent, RelatedRefs> = {
  buy: {
    landings: ["first-time-homebuyer", "conventional-loans", "low-down-payment"],
    guides: ["should-i-put-more-money-down", "fha-or-conventional"],
    comparisons: ["conventional-vs-fha", "buy-vs-rent"],
    calculators: ["affordability-planner"],
    articles: ["how-much-home-can-you-afford"],
    lifeEvents: ["getting-married", "growing-your-family"],
    funnels: ["purchase"],
  },
  refinance: {
    landings: ["lower-payment", "cash-out-refinance"],
    guides: ["would-refinancing-make-sense"],
    comparisons: ["heloc-vs-cash-out"],
    calculators: ["cash-out-vs-heloc"],
    articles: ["when-does-refinancing-make-sense"],
    funnels: ["refinance"],
  },
  "home-equity": {
    guides: ["would-a-heloc-fit"],
    comparisons: ["heloc-vs-cash-out"],
    calculators: ["cash-out-vs-heloc"],
    articles: ["heloc-vs-cash-out-refinance"],
    lifeEvents: ["buying-an-investment-property", "retirement"],
    funnels: ["heloc"],
  },
  va: {
    landings: ["va-loans"],
    comparisons: ["va-vs-conventional"],
    articles: ["va-loan-benefits"],
    funnels: ["va"],
  },
  fha: {
    landings: ["fha-loans"],
    guides: ["fha-or-conventional"],
    comparisons: ["conventional-vs-fha"],
    articles: ["fha-vs-conventional"],
    funnels: ["fha"],
  },
  unknown: {},
};

function funnelTypeToIntent(funnelType?: string): VisitorIntent {
  switch (funnelType) {
    case "purchase":
    case "first-time-homebuyer":
      return "buy";
    case "refinance":
      return "refinance";
    case "heloc":
      return "home-equity";
    case "va":
      return "va";
    case "fha":
      return "fha";
    default:
      return "unknown";
  }
}

function cap(links: ResolvedLink[], currentPath: string | undefined, limit: number) {
  return links.filter((l) => l.href !== currentPath).slice(0, limit);
}

export function recommend(
  ctx: RecommendationContext,
  limit = 4,
): Recommendations {
  const seeds: (RelatedRefs | undefined)[] = [];

  if (ctx.intent) seeds.push(intentSeeds[ctx.intent]);
  if (ctx.funnelType) seeds.push(intentSeeds[funnelTypeToIntent(ctx.funnelType)]);
  if (ctx.guideResult) seeds.push(getGuide(ctx.guideResult.slug)?.related);
  if (ctx.calcResult) seeds.push(getCalculator(ctx.calcResult.slug)?.related);
  if (ctx.location) {
    const loc = getLocation(ctx.location);
    seeds.push(loc?.related);
    seeds.push({ locations: [ctx.location] });
  }
  if (ctx.currentPath) seeds.push(connectionsForPath(ctx.currentPath).refs);

  const resolved = resolveRelated(mergeRefs(...seeds));
  const path = ctx.currentPath;

  return {
    articles: cap(resolved.articles, path, limit),
    guides: cap(resolved.guides, path, limit),
    comparisons: cap(resolved.comparisons, path, limit),
    calculators: cap(resolved.calculators, path, limit),
    landings: cap(resolved.landings, path, limit),
    lifeEvents: cap(resolved.lifeEvents, path, limit),
    locations: cap(resolved.locations, path, limit),
    funnels: cap(resolved.funnels, path, limit),
    advisorCta: true,
  };
}

export function hasRecommendations(r: Recommendations): boolean {
  return (
    r.articles.length > 0 ||
    r.guides.length > 0 ||
    r.comparisons.length > 0 ||
    r.calculators.length > 0 ||
    r.landings.length > 0 ||
    r.lifeEvents.length > 0 ||
    r.locations.length > 0
  );
}
