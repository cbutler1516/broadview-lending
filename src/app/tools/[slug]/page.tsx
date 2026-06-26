import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { CalculatorShell } from "@/components/tools/calculator-shell";
import { AffordabilityCalculator } from "@/components/tools/affordability-calculator";
import { CashOutVsHelocCalculator } from "@/components/tools/cash-out-vs-heloc-calculator";
import { getCalculator, getLiveCalculators } from "@/lib/content/calculators";
import { siteUrl } from "@/lib/brand/config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const calculatorComponents: Record<string, ReactNode> = {
  "affordability-planner": <AffordabilityCalculator />,
  "cash-out-vs-heloc": <CashOutVsHelocCalculator />,
};

export function generateStaticParams() {
  return getLiveCalculators().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc || calc.status !== "live") {
    return { title: "Tool Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: calc.seo.title,
    description: calc.seo.description,
    openGraph: {
      title: calc.seo.title,
      description: calc.seo.description,
      url: `${siteUrl}/tools/${calc.slug}`,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  const component = calculatorComponents[slug];

  if (!calc || calc.status !== "live" || !component) notFound();

  return (
    <>
      <SiteNav />
      <CalculatorShell meta={calc}>{component}</CalculatorShell>
      <ComplianceFooter />
    </>
  );
}
