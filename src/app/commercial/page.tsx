import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { EcosystemExperience } from "@/components/experience/ecosystem-experience";
import { commercialExperience } from "@/lib/experience/goals";
import { siteUrl } from "@/lib/brand/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Financing | Business & Investment Property",
  description:
    "Commercial mortgage strategy from Broadview Lending — acquire property, expand operations, investment real estate, construction, bridge, and working capital guidance.",
  openGraph: { url: `${siteUrl}/commercial` },
};

export default function CommercialPage() {
  return (
    <>
      <SiteNav />
      <EcosystemExperience config={commercialExperience} />
      <ComplianceFooter />
    </>
  );
}
