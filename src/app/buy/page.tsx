import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { EcosystemExperience } from "@/components/experience/ecosystem-experience";
import { buyExperience } from "@/lib/experience/goals";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Home Buying | Start With Your Goal",
  description:
    "Goal-first home buying guidance from Broadview Lending — first home, move-up, military benefits, low down payment, and jumbo strategies with a real advisor.",
  openGraph: { url: `${siteUrl}/buy` },
};

export default function BuyHubPage() {
  return (
    <>
      <SiteNav />
      <EcosystemExperience config={buyExperience} />
      <ComplianceFooter />
    </>
  );
}
