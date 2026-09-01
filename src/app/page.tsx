import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { PrimaryFinancingPaths } from "@/components/sections/primary-financing-paths";
import { ToolsSection } from "@/components/sections/tools-section";
import { WhySection } from "@/components/sections/why-section";
import { ConversationSection } from "@/components/sections/conversation-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { buildPageMetadata } from "@/lib/brand/seo";
import { jsonLdString, organizationSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(organizationSchema()) }}
      />
      <main>
        <HeroSection />
        <PrimaryFinancingPaths />
        <ToolsSection />
        <WhySection />
        <ConversationSection />
        <FinalCTA />
      </main>
    </>
  );
}
