import { CinematicHero } from "@/components/media/cinematic-hero";
import { RelatedContent } from "@/components/content/related-content";
import { StrategySnapshot } from "@/components/intelligence/strategy-snapshot";
import { AdvisorInsight } from "@/components/intelligence/advisor-insight";
import { WhatWeDiscuss } from "@/components/intelligence/what-we-discuss";
import { WhatHappensNext } from "@/components/what-happens-next";
import { InViewTracker } from "@/components/analytics/in-view-tracker";
import { jsonLdString, webPageSchema } from "@/lib/seo/schema";
import type { LifeEvent } from "@/lib/content/life-events";

export function LifeEventTemplate({ event }: { event: LifeEvent }) {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            webPageSchema({
              name: event.seo.title,
              description: event.seo.description,
              path: `/life/${event.slug}`,
            }),
          ),
        }}
      />
      <InViewTracker event="life_event_viewed" metadata={{ event: event.slug }} />

      <CinematicHero
        theme="life"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Life Events", path: "/life" },
          { name: event.title, path: `/life/${event.slug}` },
        ]}
        eyebrow={event.eyebrow}
        title={event.title}
        subtitle={event.intro}
        ctas={[
          { label: "Build My Strategy", href: "/#funnels" },
          {
            label: "Talk With An Advisor",
            booking: true,
            bookingLocation: `life_${event.slug}_hero`,
            variant: "secondary",
          },
        ]}
      />

      <section className="section-container grid gap-10 py-12 md:py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Your situation</h2>
          <div className="mt-4 space-y-3">
            {event.situation.map((p) => (
              <p key={p} className="leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            What&apos;s worth thinking about
          </h2>
          <ul className="mt-4 space-y-2.5">
            {event.considerations.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-muted">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand"
                >
                  ✓
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AdvisorInsight
        insight={event.advisorInsight}
        sourceId={`life_${event.slug}`}
        className="pb-4"
      />

      <StrategySnapshot
        snapshot={event.snapshot}
        sourceId={`life_${event.slug}`}
        className="py-12 md:py-16"
      />

      <WhatWeDiscuss
        sourceId={`life_${event.slug}`}
        className="border-y border-border bg-surface-muted py-14 md:py-18"
      />

      <RelatedContent
        refs={event.related}
        className="border-b border-border py-14 md:py-18"
      />

      <WhatHappensNext className="border-b border-border bg-surface-muted" />
    </main>
  );
}
