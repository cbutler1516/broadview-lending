import { faqSchema, jsonLdString } from "@/lib/seo/schema";
import type { Faq } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";

type FaqListProps = {
  faqs: Faq[];
  heading?: string;
  className?: string;
  /** Emit FAQPage JSON-LD. Set false if another block on the page owns it. */
  withSchema?: boolean;
};

/**
 * Accessible FAQ block (native <details>) with optional FAQPage schema.
 * Concise question/answer pairs double as AI-search-friendly content.
 */
export function FaqList({
  faqs,
  heading = "Frequently asked questions",
  className,
  withSchema = true,
}: FaqListProps) {
  if (faqs.length === 0) return null;

  return (
    <section className={cn("section-container", className)}>
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema(faqs)) }}
        />
      )}
      {heading && (
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {heading}
        </h2>
      )}
      <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
        {faqs.map((faq) => (
          <details key={faq.question} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {faq.question}
              <span
                aria-hidden
                className="text-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
