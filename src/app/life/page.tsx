import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { lifeEvents } from "@/lib/content/life-events";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Mortgage Strategy for Life Events",
  description:
    "Mortgage guidance organized around life — marriage, growing families, divorce, retirement, relocation, and investing. Educational strategy from Broadview Lending.",
  openGraph: { url: `${siteUrl}/life` },
};

export default function LifeHubPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <CinematicHero
          theme="life"
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Life Events", path: "/life" },
          ]}
          eyebrow="Life events"
          title="Mortgage strategy for life's big moments"
          subtitle="The decisions that matter most rarely start with a loan. They start with life. Here's how we'd think it through together."
          ctas={[
            { label: "Build My Strategy", href: "/#funnels" },
            {
              label: "Talk With An Advisor",
              booking: true,
              bookingLocation: "life_hub_hero",
              variant: "secondary",
            },
          ]}
        />

        <div className="section-container py-14 md:py-18">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lifeEvents.map((event) => (
              <TrackedLink
                key={event.slug}
                href={`/life/${event.slug}`}
                group="life_hub"
                label={event.title}
                className="card-elevated group flex flex-col p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  {event.eyebrow}
                </p>
                <h2 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-brand">
                  {event.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {event.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Explore
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}
