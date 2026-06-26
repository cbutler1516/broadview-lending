import { TrackedLink } from "@/components/tracked-link";
import {
  fallbackArticles,
  hasAnyRelated,
  resolveRelated,
  type ResolvedRelated,
} from "@/lib/content/related";
import type { RelatedRefs, ResolvedLink } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";

type RelatedContentProps = {
  refs: RelatedRefs;
  className?: string;
  /** Used to avoid recommending the current article in fallbacks. */
  currentSlug?: string;
};

function LinkGroup({
  title,
  links,
  group,
}: {
  title: string;
  links: ResolvedLink[];
  group: string;
}) {
  if (links.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
        {title}
      </h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <TrackedLink
            key={link.href}
            href={link.href}
            group={group}
            label={link.label}
            className="card-elevated group block p-4"
          >
            <p className="font-semibold group-hover:text-brand">{link.label}</p>
            {link.description && (
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
                {link.description}
              </p>
            )}
          </TrackedLink>
        ))}
      </div>
    </div>
  );
}

/**
 * Smart internal-linking block. Renders related guides, tools, strategy pages,
 * and funnel entries — guaranteeing no page is a dead end.
 */
export function RelatedContent({
  refs,
  className,
  currentSlug,
}: RelatedContentProps) {
  const resolved: ResolvedRelated = resolveRelated(refs);

  const articles = resolved.articles.length
    ? resolved.articles
    : fallbackArticles(currentSlug);

  return (
    <section className={cn("section-container", className)}>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Keep exploring
      </h2>
      <p className="mt-2 text-muted">
        Continue your strategy — every step here leads somewhere useful.
      </p>
      <div className="mt-8 space-y-8">
        <LinkGroup title="Related articles" links={articles} group="related_articles" />
        <LinkGroup
          title="Interactive guides"
          links={resolved.guides}
          group="related_guides"
        />
        <LinkGroup
          title="Compare your options"
          links={resolved.comparisons}
          group="related_comparisons"
        />
        <LinkGroup
          title="Helpful tools"
          links={resolved.calculators}
          group="related_calculators"
        />
        <LinkGroup
          title="Related strategies"
          links={resolved.landings}
          group="related_landings"
        />
        <LinkGroup
          title="Life events"
          links={resolved.lifeEvents}
          group="related_life_events"
        />
        <LinkGroup
          title="Local guidance"
          links={resolved.locations}
          group="related_locations"
        />
        <LinkGroup
          title="Start your assessment"
          links={resolved.funnels}
          group="related_funnels"
        />
      </div>
    </section>
  );
}

export { hasAnyRelated };
