import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { DecisionPath } from "@/components/experience/decision-path";
import { decisionGuides } from "@/lib/content/decision-guides";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Interactive Decision Guides | Mortgage Clarity",
  description:
    "Answer a few thoughtful questions and get educational guidance on HELOCs, refinancing, down payments, and more — from Broadview Lending. Clarity, not qualification.",
  openGraph: { url: `${siteUrl}/guides` },
};

export default function GuidesHubPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <CinematicHero
          theme="guides"
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
          ]}
          eyebrow="Interactive decision guides"
          title="Get clarity before you decide"
          subtitle="A few thoughtful questions, then clear educational guidance. These guides help you understand your options — they never imply approval or qualification."
          ctas={[
            { label: "Build My Strategy", href: "/#funnels" },
            {
              label: "Talk With An Advisor",
              booking: true,
              bookingLocation: "guides_hub_hero",
              variant: "secondary",
            },
          ]}
        />

        <div className="section-container py-14 md:py-18">
          <DecisionPath active={0} className="mb-10" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {decisionGuides.map((guide) => (
              <TrackedLink
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                group="guides_hub"
                label={guide.title}
                className="card-elevated group flex flex-col p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  {guide.eyebrow}
                </p>
                <h2 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-brand">
                  {guide.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {guide.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Start guide
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
