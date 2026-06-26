import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { EcosystemExperience } from "@/components/experience/ecosystem-experience";
import { AdvisorTrustSection } from "@/components/advisor-trust-section";
import { homeEquityExperience } from "@/lib/experience/goals";
import { brand, siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Home Equity Solutions | Start With Your Goal",
  description:
    "Goal-first home equity guidance from Broadview Lending — remodel, consolidate debt, invest, and more. A real advisor helps you choose the right path.",
  openGraph: {
    title: "Home Equity Solutions | Broadview Lending",
    description:
      "Technology helps us understand your situation quickly. A real mortgage advisor helps you make the right decision.",
    url: `${siteUrl}/heloc`,
  },
};

export default function HelocHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: `${brand.companyName} Home Equity Solutions`,
    url: `${siteUrl}/heloc`,
    description:
      "Human-first home equity guidance for homeowners and real estate investors.",
    parentOrganization: {
      "@type": "Organization",
      name: brand.companyName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <EcosystemExperience config={homeEquityExperience} />
      <AdvisorTrustSection
        heading="Your equity decision deserves a real conversation."
        paragraphs={[
          "Your answers help us prepare. The real value comes from the conversation that follows.",
        ]}
        className="border-t border-border"
      />
      <ComplianceFooter />
    </>
  );
}
