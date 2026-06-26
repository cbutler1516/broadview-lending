import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { FunnelWizard } from "@/components/funnel-wizard";
import { CinematicHero } from "@/components/media/cinematic-hero";
import type { HeroTheme } from "@/lib/media/assets";
import { getFunnelDefinition } from "@/lib/funnels/config";
import { resolveGoalEntry } from "@/lib/funnels/goal-entry";
import { buildPageMetadata, pageMetadata } from "@/lib/brand/seo";
import { brand } from "@/lib/brand/config";

type FunnelPageProps = {
  params: Promise<{ type: string }>;
  searchParams?: Promise<{ campaign_page?: string }>;
};

const funnelSeoKeys: Record<string, keyof typeof pageMetadata> = {
  purchase: "purchase",
  refinance: "refinance",
  va: "va",
  fha: "fha",
  heloc: "heloc",
};

function themeForFunnel(type: string): HeroTheme {
  switch (type) {
    case "heloc":
      return "home-equity";
    case "refinance":
      return "refinance";
    case "va":
    case "fha":
    case "purchase":
    case "first-time-homebuyer":
    case "investment":
      return "buy";
    default:
      return "tools";
  }
}

export async function generateMetadata({
  params,
}: FunnelPageProps): Promise<Metadata> {
  const { type } = await params;
  const seoKey = funnelSeoKeys[type];
  if (seoKey) return buildPageMetadata(seoKey);

  const definition = getFunnelDefinition(type);
  if (!definition) return { title: "Strategy Not Found" };

  return {
    title: definition.title,
    description: definition.subtitle,
  };
}

export default async function FunnelPage({ params, searchParams }: FunnelPageProps) {
  const { type } = await params;
  const query = searchParams ? await searchParams : {};
  const definition = getFunnelDefinition(type);

  if (!definition || definition.questions.length === 0) {
    notFound();
  }

  const goalEntry = resolveGoalEntry(definition.type, query.campaign_page);
  const isHomeEquityStrategy = definition.type === "heloc";

  return (
    <>
      <SiteNav variant="strategy" />
      <main className="flex-1">
        {!isHomeEquityStrategy && (
          <CinematicHero
            theme={themeForFunnel(type)}
            size="sm"
            eyebrow={definition.title}
            title={goalEntry.headline}
            subtitle={definition.subtitle}
            note={brand.trust.funnelDuration}
          />
        )}

        <section
          className={
            isHomeEquityStrategy
              ? ""
              : "border-t border-border py-10 md:py-14"
          }
        >
          <div className={isHomeEquityStrategy ? "" : "section-container"}>
            <FunnelWizard
              definition={definition}
              campaignPage={query.campaign_page}
            />
          </div>
        </section>
      </main>
      <ComplianceFooter />
    </>
  );
}
