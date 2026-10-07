import Link from "next/link";
import { searchLandingPages } from "@/lib/content/search-landings";

export function MortgagePlanningLinks() {
  return (
    <section aria-label="Mortgage planning questions" className="section-container py-12">
      <h2 className="text-2xl font-semibold tracking-tight">Before you choose a loan.</h2>
      <p className="mt-3 text-muted">Clear answers about costs, offers and the decisions worth talking through.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {searchLandingPages.map((page) => (
          <Link key={page.path} href={page.path} className="rounded-xl border border-border p-5 transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
            <h3 className="font-semibold">{page.h1}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{page.highlights[0]}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
