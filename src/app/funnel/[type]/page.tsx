import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { FunnelEntry } from "@/components/funnel-wizard";
import { getFunnelDefinition } from "@/lib/funnels/config";
import { resolveGoalEntry } from "@/lib/funnels/goal-entry";
import { buildPageMetadata, pageMetadata } from "@/lib/brand/seo";

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
          <header className="section-container pt-8 md:pt-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">{definition.title}</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{goalEntry.headline}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              A few details help your advisor prepare. No credit pull here—this is a conversation starter, not a loan application.
            </p>
          </header>
        )}

        <section
          className={
            isHomeEquityStrategy
              ? ""
              : "py-8 md:py-10"
          }
        >
          <div className={isHomeEquityStrategy ? "" : "section-container"}>
            <FunnelEntry
              type={definition.type}
              campaignPage={query.campaign_page}
            />
          </div>
        </section>
      </main>
      <ComplianceFooter />
    </>
  );
}
