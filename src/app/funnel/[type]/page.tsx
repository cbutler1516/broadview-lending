import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { FunnelWizard } from "@/components/funnel-wizard";
import { LivingArchitectureVideo } from "@/components/media/living-architecture-video";
import { funnelJourneyVideo } from "@/lib/media/assets";
import { getFunnelDefinition } from "@/lib/funnels/config";
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

  return (
    <>
      <SiteNav />
      <main className="relative flex-1 overflow-hidden py-10 md:py-14">
        <LivingArchitectureVideo
          asset={funnelJourneyVideo}
          bare
          aspectClassName="aspect-square"
          rounded="rounded-[3rem]"
          className="pointer-events-none absolute -right-16 -top-10 z-0 hidden w-[480px] opacity-[0.12] blur-[2px] lg:block"
          fallback={<span className="block h-full w-full" />}
        />
        <div className="section-container relative z-10 mb-8 max-w-xl">
          <p className="text-sm font-medium text-brand">{definition.title}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {definition.type === "heloc"
              ? "Let's build your home equity strategy"
              : "Let's build your mortgage strategy"}
          </h1>
          <p className="mt-3 text-muted">{definition.subtitle}</p>
          {definition.type === "heloc" && (
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              Your answers help us prepare. A real Broadview mortgage advisor will
              personally review your information and walk through your options.
            </p>
          )}
          <p className="mt-3 text-sm font-medium text-foreground">
            {brand.trust.funnelDuration}
          </p>
        </div>
        <div className="section-container relative z-10">
          <FunnelWizard
            definition={definition}
            campaignPage={query.campaign_page}
          />
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}
