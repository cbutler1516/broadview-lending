import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { EcosystemExperience } from "@/components/experience/ecosystem-experience";
import { refinanceExperience } from "@/lib/experience/goals";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Refinancing | Start With Your Goal",
  description:
    "Goal-first refinance guidance from Broadview Lending — lower payment, access cash, remove MI, consolidate debt, and more with a real advisor.",
  openGraph: { url: `${siteUrl}/refinance` },
};

export default function RefinanceHubPage() {
  return (
    <>
      <SiteNav />
      <EcosystemExperience config={refinanceExperience} />
      <ComplianceFooter />
    </>
  );
}
