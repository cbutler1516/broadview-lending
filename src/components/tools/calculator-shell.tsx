import { CinematicHero } from "@/components/media/cinematic-hero";
import { RelatedContent } from "@/components/content/related-content";
import { WhatHappensNext } from "@/components/what-happens-next";
import { ComplianceDisclaimer } from "@/components/compliance-disclaimer";
import { EngagementTracker } from "@/components/analytics/engagement-tracker";
import { jsonLdString, webPageSchema } from "@/lib/seo/schema";
import type { CalculatorMeta } from "@/lib/content/calculators";

type CalculatorShellProps = {
  meta: CalculatorMeta;
  children: React.ReactNode;
};

export function CalculatorShell({ meta, children }: CalculatorShellProps) {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            webPageSchema({
              name: meta.seo.title,
              description: meta.seo.description,
              path: `/tools/${meta.slug}`,
            }),
          ),
        }}
      />
      <EngagementTracker contentId={meta.slug} contentType="calculator" />

      <CinematicHero
        theme="tools"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: meta.title, path: `/tools/${meta.slug}` },
        ]}
        eyebrow="Decision tool"
        title={meta.title}
        subtitle={meta.tagline}
        ctas={[
          { label: "Use This Tool", href: "#tool" },
          {
            label: "Talk With An Advisor",
            booking: true,
            bookingLocation: `tool_${meta.slug}_hero`,
            variant: "secondary",
          },
        ]}
      />

      <section id="tool" className="scroll-mt-24 py-12 md:py-16">
        <div className="section-container">{children}</div>
      </section>

      <RelatedContent
        refs={meta.related}
        className="border-t border-border py-14 md:py-18"
      />

      <WhatHappensNext className="border-y border-border bg-surface-muted" compact={false} />

      <section className="py-10">
        <ComplianceDisclaimer className="section-container text-center" />
      </section>
    </main>
  );
}
