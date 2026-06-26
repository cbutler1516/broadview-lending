import { CinematicHero } from "@/components/media/cinematic-hero";
import { DecisionPath } from "@/components/experience/decision-path";
import { AdvisorPromise } from "@/components/experience/advisor-promise";
import { DiscoveryJourney } from "@/components/experience/discovery-journey";
import { ExperienceFlow } from "@/components/experience/experience-flow";
import { SeoLinks } from "@/components/experience/seo-links";
import type { ExperienceConfig } from "@/lib/experience/types";
import { brand } from "@/lib/brand/config";

type EcosystemExperienceProps = {
  config: ExperienceConfig;
};

/**
 * Goal-first ecosystem experience — replaces product-card hub grids.
 * SEO routes preserved via SeoLinks; user sees goals and guidance only.
 */
export function EcosystemExperience({ config }: EcosystemExperienceProps) {
  const slug = config.path.replace("/", "") || "home";

  return (
    <main className="flex-1">
      <CinematicHero
        theme={config.theme}
        size="lg"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: config.title, path: config.path },
        ]}
        title={config.question}
        subtitle={config.intro}
        note={brand.trust.funnelDuration}
      />

      <section id="start" className="scroll-mt-24 py-14 md:py-20">
        <div className="section-container">
          <DecisionPath active={0} className="mb-8" />
          <ExperienceFlow config={config} context={`${slug}_hub`} />
        </div>
      </section>

      <AdvisorPromise compact />

      <DiscoveryJourney
        funnelHref={config.funnelHref}
        funnelLabel="Build Your Strategy"
        className="border-t border-border bg-surface-muted"
      />

      {config.seoRoutes && config.seoRoutes.length > 0 && (
        <SeoLinks routes={config.seoRoutes} />
      )}
    </main>
  );
}
