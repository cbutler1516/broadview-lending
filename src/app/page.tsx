import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { ExperienceFlow } from "@/components/experience/experience-flow";
import { DecisionPath } from "@/components/experience/decision-path";
import { AdvisorPromise } from "@/components/experience/advisor-promise";
import { DiscoveryJourney } from "@/components/experience/discovery-journey";
import { BookingLink } from "@/components/booking-link";
import { brand, siteUrl } from "@/lib/brand/config";
import { buildPageMetadata } from "@/lib/brand/seo";

export const metadata: Metadata = buildPageMetadata("home");

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MortgageBroker",
    name: brand.companyName,
    legalName: brand.legalEntity,
    description: brand.positioning.description,
    url: siteUrl,
    telephone: brand.contact.phone,
    email: brand.contact.email,
    areaServed: ["United States", "Washington", "Seattle"],
    sameAs: Object.values(brand.social).map((s) => s.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      <main className="flex-1">
        <CinematicHero
          theme="home"
          size="lg"
          title="What are you trying to accomplish?"
          subtitle="People don't wake up wanting a mortgage. They wake up wanting a better future."
          note={brand.trust.funnelDuration}
        />

        <section id="start" className="scroll-mt-24 -mt-8 pb-16 md:pb-24">
          <div className="section-container">
            <DecisionPath active={0} className="mb-8" />
            <ExperienceFlow platform context="homepage" />
          </div>
        </section>

        <AdvisorPromise />

        <DiscoveryJourney
          funnelHref="/funnel/purchase"
          className="border-t border-border bg-surface-muted"
        />

        <section className="border-t border-border py-16 md:py-20">
          <div className="section-container text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Ready for a real conversation?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              A licensed Broadview advisor will personally review your information
              and walk through your options with you.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/funnel/purchase" className="btn-primary">
                {brand.ctas.primary}
              </Link>
              <BookingLink location="homepage_final" className="btn-secondary">
                {brand.ctas.secondary}
              </BookingLink>
            </div>
          </div>
        </section>
      </main>

      <ComplianceFooter />
    </>
  );
}
