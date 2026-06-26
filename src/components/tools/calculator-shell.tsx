import { Breadcrumbs } from "@/components/content/breadcrumbs";
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

      <section className="border-b border-border bg-surface">
        <div className="section-container py-10 md:py-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Tools", path: "/tools" },
              { name: meta.title, path: `/tools/${meta.slug}` },
            ]}
          />
          <h1 className="mt-8 text-4xl font-semibold tracking-tight md:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {meta.tagline}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
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
