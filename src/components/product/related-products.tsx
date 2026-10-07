import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductRelatedLink } from "@/lib/product/types";

export function RelatedProducts({
  links,
  resources = [],
  title = "Compare your options",
  description = "A few related paths worth considering.",
}: {
  links: ProductRelatedLink[];
  resources?: ProductRelatedLink[];
  title?: string;
  description?: string;
}) {
  if (links.length === 0 && resources.length === 0) return null;

  return (
    <section className="bg-slate-50 px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-4">
          Related
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-navy-900 mb-3">
          {title}
        </h2>
        <p className="text-slate-500 max-w-xl mb-10 leading-relaxed">{description}</p>
        <ul className="divide-y divide-slate-200/90 border-y border-slate-200/90">
          {links.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <Link
                href={link.href}
                className="group grid sm:grid-cols-12 gap-2 sm:gap-8 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 rounded-sm"
              >
                <h3 className="sm:col-span-4 text-base font-semibold text-navy-900 group-hover:text-teal-700">
                  {link.label}
                </h3>
                <p className="sm:col-span-6 text-sm text-slate-500 leading-relaxed">
                  {link.description ?? "Stay in the same conversation."}
                </p>
                <span className="sm:col-span-2 sm:justify-self-end inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
                  Explore
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {resources.length > 0 ? (
          <div className="mt-10 border-t border-slate-200 pt-8">
            <h3 className="text-lg font-semibold text-navy-950">Helpful guides before you decide</h3>
            <ul className="mt-5 grid gap-6 sm:grid-cols-3">
              {resources.map(resource => (
                <li key={resource.href}>
                  <Link href={resource.href} className="block rounded-sm py-2 text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand">{resource.label}</Link>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{resource.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
