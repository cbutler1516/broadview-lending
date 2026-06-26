"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TrackedLink } from "@/components/tracked-link";
import { BookingLink } from "@/components/booking-link";
import {
  recommend,
  hasRecommendations,
  type RecommendationContext,
  type Recommendations,
} from "@/lib/intelligence/recommend";
import { readVisitor } from "@/lib/intelligence/visitor";
import { readWorkspace } from "@/lib/strategy/workspace";
import { workspaceToRecommendContext } from "@/lib/strategy/recommend-context";
import type { ResolvedLink } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";

type Props = {
  /** Optional context known by the page (intent, funnelType, location, etc.). */
  seed?: RecommendationContext;
  heading?: string;
  intro?: string;
  className?: string;
  /** Max links per group. */
  limit?: number;
};

function Group({ title, links }: { title: string; links: ResolvedLink[] }) {
  if (links.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
        {title}
      </h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <TrackedLink
            key={link.href}
            href={link.href}
            group="personalized_reco"
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
 * Personalized "next best step" surface powered by Recommendation Engine 2.0.
 * Reads the localStorage visitor profile on the client and ranks content across
 * every type. Renders nothing until mounted (and nothing if there's no signal),
 * so it never causes hydration mismatches or empty sections.
 */
export function PersonalizedRecommendations({
  seed,
  heading = "Your next best steps",
  intro = "Based on what you've explored, here's where we'd point you next.",
  className,
  limit = 3,
}: Props) {
  const pathname = usePathname();
  const [recs, setRecs] = useState<Recommendations | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Defer to a microtask so we don't call setState synchronously in the
    // effect body, and so the first paint stays in sync with the server.
    void Promise.resolve().then(() => {
      if (cancelled) return;
      const profile = readVisitor();
      const workspace = readWorkspace();
      const ctx: RecommendationContext = {
        intent: profile.intent,
        funnelType: profile.lastFunnel,
        guideResult: profile.lastGuide,
        calcResult: profile.lastCalc,
        location: profile.lastLocation ?? workspace.location,
        previousPath: profile.previousPath,
        leadSubmitted: profile.leadSubmitted,
        currentPath: pathname ?? undefined,
        ...workspaceToRecommendContext(workspace, pathname ?? undefined),
        ...seed,
      };
      setRecs(recommend(ctx, limit));
    });
    return () => {
      cancelled = true;
    };
  }, [pathname, seed, limit]);

  if (!recs || !hasRecommendations(recs)) return null;

  return (
    <section className={cn("section-container", className)}>
      <div className="card-elevated overflow-hidden p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          Personalized for you
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          {heading}
        </h2>
        <p className="mt-2 max-w-2xl text-muted">{intro}</p>

        <div className="mt-8 space-y-8">
          <Group title="Keep learning" links={recs.articles} />
          <Group title="Try an interactive guide" links={recs.guides} />
          <Group title="Compare your options" links={recs.comparisons} />
          <Group title="Run the numbers" links={recs.calculators} />
          <Group title="Explore strategies" links={recs.landings} />
          <Group title="Life events" links={recs.lifeEvents} />
          <Group title="Local guidance" links={recs.locations} />
          <Group title="Start your assessment" links={recs.funnels} />
        </div>

        {recs.advisorCta && (
          <div className="mt-8 flex flex-col gap-3 border-t border-default pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted">
              Prefer to talk it through? A Broadview advisor can help you decide.
            </p>
            <BookingLink className="btn-primary shrink-0" location="personalized_reco">
              Talk With A Mortgage Advisor
            </BookingLink>
          </div>
        )}
      </div>
    </section>
  );
}
