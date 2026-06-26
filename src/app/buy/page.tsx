import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { EcosystemHub } from "@/components/landing/ecosystem-hub";
import { buyBackgroundVideo } from "@/lib/media/assets";
import { siteUrl } from "@/lib/brand/config";

export const metadata: Metadata = {
  title: "Home Buying | Loan Programs & Strategy",
  description:
    "Explore home buying strategies with Broadview Lending — first-time buyer, low down payment, FHA, VA, conventional, jumbo, physician, and self-employed loans.",
  openGraph: { url: `${siteUrl}/buy` },
};

export default function BuyHubPage() {
  return (
    <>
      <SiteNav />
      <EcosystemHub
        ecosystem="buy"
        heroVideo={buyBackgroundVideo}
        heroCaption="Picture the home you're working toward — we'll help you plan the path to it."
      />
      <ComplianceFooter />
    </>
  );
}
