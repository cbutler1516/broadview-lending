import type { Metadata } from "next";
import { EngagementTracker } from "@/components/analytics/engagement-tracker";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { RelatedProducts } from "@/components/product/related-products";
import { InvestorDealAnalyzer } from "@/components/tools/investor-deal-analyzer";
import { ANALYZER_RELATED, DEAL_ANALYZER_SLUG } from "@/lib/tools/investor-deal-analyzer";
import { siteUrl } from "@/lib/brand/config";
import { breadcrumbSchema, jsonLdString, webPageSchema } from "@/lib/seo/schema";

const TITLE = "Investor Deal Analyzer";
const DESCRIPTION =
  "Estimate financing, cash flow, DSCR, cap rate, and returns for an investment property. Educational estimates based on your assumptions — not an approval or commitment to lend.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteUrl}/tools/investor-deal-analyzer`,
  },
};

const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: TITLE, path: "/tools/investor-deal-analyzer" },
];

export default function InvestorDealAnalyzerPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            webPageSchema({
              name: TITLE,
              description: DESCRIPTION,
              path: "/tools/investor-deal-analyzer",
            }),
            breadcrumbSchema(BREADCRUMBS),
          ),
        }}
      />
      <EngagementTracker contentId={DEAL_ANALYZER_SLUG} contentType="calculator" />

      <CinematicHero
        theme="tools"
        breadcrumbs={BREADCRUMBS}
        eyebrow="Investor tools"
        title="Investor Deal Analyzer"
        subtitle="Analyze the deal. Understand the financing. Build your strategy."
        note="Estimates update as you type. Not a quote, approval, or commitment to lend."
        size="sm"
        ctas={[
          { label: "Analyze a Deal", href: "#analyzer" },
          {
            label: "Talk With An Advisor",
            booking: true,
            bookingLocation: "tool_investor-deal-analyzer_hero",
            variant: "secondary",
          },
        ]}
      />

      <section
        id="analyzer"
        className="scroll-mt-24 bg-white px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-24"
      >
        <div className="max-w-6xl mx-auto">
          <InvestorDealAnalyzer />
        </div>
      </section>

      <RelatedProducts
        title="Related financing paths"
        description="Use the estimates to choose the conversation closest to the deal — then review structure with an advisor."
        links={[...ANALYZER_RELATED]}
      />
    </main>
  );
}
