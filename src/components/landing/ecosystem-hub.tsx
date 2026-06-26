import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { AdvisorTrustSection } from "@/components/advisor-trust-section";
import { WhatHappensNext } from "@/components/what-happens-next";
import { CinematicHero, type HeroCta } from "@/components/media/cinematic-hero";
import {
  getLandingPagesByEcosystem,
  landingEcosystems,
  type LandingEcosystem,
} from "@/lib/content/landing-pages";

type EcosystemHubProps = {
  ecosystem: LandingEcosystem;
};

const ecosystemFunnel: Record<LandingEcosystem, string> = {
  buy: "/funnel/purchase",
  refinance: "/funnel/refinance",
};

export function EcosystemHub({ ecosystem }: EcosystemHubProps) {
  const meta = landingEcosystems[ecosystem];
  const pages = getLandingPagesByEcosystem(ecosystem);
  const funnelHref = ecosystemFunnel[ecosystem] ?? "/#funnels";

  const ctas: HeroCta[] = [
    { label: "Build My Strategy", href: funnelHref },
    {
      label: "Talk With An Advisor",
      booking: true,
      bookingLocation: `${ecosystem}_hub_hero`,
      variant: "secondary",
    },
  ];

  return (
    <main className="flex-1">
      <CinematicHero
        theme={ecosystem}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: meta.title, path: meta.path },
        ]}
        eyebrow={meta.title}
        title={meta.title}
        subtitle={meta.intro}
        ctas={ctas}
        size="lg"
      />

      <section className="py-14 md:py-18">
        <div className="section-container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <TrackedLink
                key={page.path}
                href={page.path}
                group={`${ecosystem}_hub`}
                label={page.seo.title}
                className="card-elevated group flex flex-col p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
                  {page.eyebrow}
                </p>
                <h2 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-brand">
                  {page.seo.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {page.intro}
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

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/tools" className="btn-secondary">
              Explore Calculators
            </Link>
            <Link href="/learn" className="btn-secondary">
              Visit the Learning Center
            </Link>
          </div>
        </div>
      </section>

      <AdvisorTrustSection className="border-y border-border bg-surface-muted" />
      <WhatHappensNext className="border-b border-border" />
    </main>
  );
}
