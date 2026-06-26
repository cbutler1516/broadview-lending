import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { ExperienceFlow } from "@/components/experience/experience-flow";
import { DecisionPath } from "@/components/experience/decision-path";
import { AdvisorPromise } from "@/components/experience/advisor-promise";
import { DiscoveryJourney } from "@/components/experience/discovery-journey";
import { HomeStrategyLayer } from "@/components/strategy/home-strategy-layer";
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
          subtitle="Start with the goal. Your strategy builds from there."
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
          funnelHref="/#start"
          className="border-t border-border bg-surface-muted"
        />

        <HomeStrategyLayer />
      </main>

      <ComplianceFooter />
    </>
  );
}
