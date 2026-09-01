import { FaqList } from "@/components/content/faq-list";
import type { Faq } from "@/lib/content/types";

export function LoanFAQ({
  title,
  items,
}: {
  title: string;
  items: Faq[];
}) {
  return (
    <section className="bg-white px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <FaqList faqs={items} heading={title} withSchema={false} className="!mx-0 !max-w-none !px-0" />
      </div>
    </section>
  );
}
