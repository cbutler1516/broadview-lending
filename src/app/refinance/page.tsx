import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { EcosystemHub } from "@/components/landing/ecosystem-hub";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Refinancing | Lower Payment, Cash-Out & More",
  description:
    "Explore refinance strategies with Broadview Lending — lower your payment, cash-out, remove mortgage insurance, consolidate debt, and rate-and-term options.",
  openGraph: { url: `${siteUrl}/refinance` },
};

export default function RefinanceHubPage() {
  return (
    <>
      <SiteNav />
      <EcosystemHub ecosystem="refinance" />
      <ComplianceFooter />
    </>
  );
}
