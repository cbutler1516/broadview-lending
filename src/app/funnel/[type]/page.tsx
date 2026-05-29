import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { FunnelWizard } from "@/components/funnel-wizard";
import { getFunnelDefinition } from "@/lib/funnels/config";
import { buildPageMetadata, pageMetadata } from "@/lib/brand/seo";
import { brand } from "@/lib/brand/config";

type FunnelPageProps = {
  params: Promise<{ type: string }>;
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

export default async function FunnelPage({ params }: FunnelPageProps) {
  const { type } = await params;
  const definition = getFunnelDefinition(type);

  if (!definition || definition.questions.length === 0) {
    notFound();
  }

  return (
    <>
      <SiteNav />
      <main className="flex-1 py-10 md:py-14">
        <div className="section-container mb-8 max-w-xl">
          <p className="text-sm font-medium text-brand">{definition.title}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Let&apos;s find your mortgage strategy
          </h1>
          <p className="mt-3 text-muted">{definition.subtitle}</p>
          <p className="mt-3 text-sm font-medium text-foreground">
            {brand.trust.funnelDuration}
          </p>
        </div>
        <div className="section-container">
          <FunnelWizard definition={definition} />
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}
