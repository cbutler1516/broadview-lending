import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
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
        <section className="border-b border-border bg-surface">
          <div className="section-container py-10 md:py-16">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Life Events", path: "/life" },
              ]}
            />
            <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Mortgage strategy for life&apos;s big moments
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              The decisions that matter most rarely start with a loan. They start
              with life. Here&apos;s how we&apos;d think it through together.
            </p>
          </div>
        </section>

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
