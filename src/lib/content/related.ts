import type { RelatedRefs, ResolvedLink } from "@/lib/content/types";
import { getArticle, knowledgeArticles } from "@/lib/content/knowledge";
import { getCalculator } from "@/lib/content/calculators";
import { landingPages } from "@/lib/content/landing-pages";
import { getComparison } from "@/lib/content/comparisons";
import { getGuide } from "@/lib/content/decision-guides";
import { getLifeEvent } from "@/lib/content/life-events";
import { getLocation } from "@/lib/content/locations";
import { getFunnelDefinition } from "@/lib/funnels/config";

export type ResolvedRelated = {
  articles: ResolvedLink[];
  calculators: ResolvedLink[];
  landings: ResolvedLink[];
  funnels: ResolvedLink[];
  comparisons: ResolvedLink[];
  guides: ResolvedLink[];
  lifeEvents: ResolvedLink[];
  locations: ResolvedLink[];
};

function resolveArticle(slug: string): ResolvedLink | null {
  const a = getArticle(slug);
  if (!a) return null;
  return {
    kind: "article",
    label: a.title,
    href: `/learn/${a.slug}`,
    description: a.summary,
  };
}

function resolveCalculator(slug: string): ResolvedLink | null {
  const c = getCalculator(slug);
  // Only link to live, routable tools — never to a planned page.
  if (!c || c.status !== "live") return null;
  return {
    kind: "calculator",
    label: c.title,
    href: `/tools/${c.slug}`,
    description: c.tagline,
  };
}

function resolveLanding(slug: string): ResolvedLink | null {
  const page = landingPages.find((p) => p.slug === slug);
  if (!page) return null;
  return {
    kind: "landing",
    label: page.seo.title,
    href: page.path,
    description: page.highlights[0],
  };
}

function resolveFunnel(type: string): ResolvedLink | null {
  const def = getFunnelDefinition(type);
  if (!def) return null;
  return {
    kind: "funnel",
    label: def.title,
    href: def.href,
    description: def.subtitle,
  };
}

function resolveComparison(slug: string): ResolvedLink | null {
  const c = getComparison(slug);
  if (!c) return null;
  return {
    kind: "comparison",
    label: c.title,
    href: `/compare/${c.slug}`,
    description: c.intro,
  };
}

function resolveGuide(slug: string): ResolvedLink | null {
  const g = getGuide(slug);
  if (!g) return null;
  return {
    kind: "guide",
    label: g.title,
    href: `/guides/${g.slug}`,
    description: g.intro,
  };
}

function resolveLifeEvent(slug: string): ResolvedLink | null {
  const e = getLifeEvent(slug);
  if (!e) return null;
  return {
    kind: "life-event",
    label: e.title,
    href: `/life/${e.slug}`,
    description: e.intro,
  };
}

function resolveLocation(slug: string): ResolvedLink | null {
  const l = getLocation(slug);
  if (!l) return null;
  return {
    kind: "location",
    label: l.seo.title,
    href: `/locations/${l.slug}`,
    description: l.intro,
  };
}

function dedupe(links: ResolvedLink[]): ResolvedLink[] {
  const seen = new Set<string>();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

/**
 * Resolve a content item's declared related refs into renderable links.
 * Anything that can't be resolved (missing/planned) is silently dropped so we
 * never render a broken or 404 link.
 */
export function resolveRelated(refs: RelatedRefs): ResolvedRelated {
  return {
    articles: dedupe(
      (refs.articles ?? [])
        .map(resolveArticle)
        .filter((l): l is ResolvedLink => l !== null),
    ),
    calculators: dedupe(
      (refs.calculators ?? [])
        .map(resolveCalculator)
        .filter((l): l is ResolvedLink => l !== null),
    ),
    landings: dedupe(
      (refs.landings ?? [])
        .map(resolveLanding)
        .filter((l): l is ResolvedLink => l !== null),
    ),
    funnels: dedupe(
      (refs.funnels ?? [])
        .map(resolveFunnel)
        .filter((l): l is ResolvedLink => l !== null),
    ),
    comparisons: dedupe(
      (refs.comparisons ?? [])
        .map(resolveComparison)
        .filter((l): l is ResolvedLink => l !== null),
    ),
    guides: dedupe(
      (refs.guides ?? [])
        .map(resolveGuide)
        .filter((l): l is ResolvedLink => l !== null),
    ),
    lifeEvents: dedupe(
      (refs.lifeEvents ?? [])
        .map(resolveLifeEvent)
        .filter((l): l is ResolvedLink => l !== null),
    ),
    locations: dedupe(
      (refs.locations ?? [])
        .map(resolveLocation)
        .filter((l): l is ResolvedLink => l !== null),
    ),
  };
}

export function hasAnyRelated(resolved: ResolvedRelated): boolean {
  return (
    resolved.articles.length > 0 ||
    resolved.calculators.length > 0 ||
    resolved.landings.length > 0 ||
    resolved.funnels.length > 0 ||
    resolved.comparisons.length > 0 ||
    resolved.guides.length > 0 ||
    resolved.lifeEvents.length > 0 ||
    resolved.locations.length > 0
  );
}

/** Suggest a few articles when an item declares none, preventing dead ends. */
export function fallbackArticles(excludeSlug?: string, limit = 3): ResolvedLink[] {
  return knowledgeArticles
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit)
    .map((a) => ({
      kind: "article" as const,
      label: a.title,
      href: `/learn/${a.slug}`,
      description: a.summary,
    }));
}
