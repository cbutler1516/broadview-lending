import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { contentCategories, featuredArticles } from "@/lib/content/hub";
import { buildPageMetadata } from "@/lib/brand/seo";

export const metadata: Metadata = buildPageMetadata("learn");

export default function LearnPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 py-12 md:py-16">
        <div className="section-container">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Mortgage Education Hub
            </h1>
            <p className="mt-4 text-lg text-muted">
              Practical guides for homebuyers and homeowners — purchase mortgages,
              refinance strategies, VA and FHA loans, HELOCs, and Pacific Northwest
              market insights.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contentCategories.map((cat) => (
              <article
                key={cat.slug}
                id={cat.slug}
                className="card-elevated scroll-mt-24 p-6"
              >
                <h2 className="text-lg font-semibold">{cat.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {cat.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Articles
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {featuredArticles.map((article) =>
                article.external ? (
                  <a
                    key={article.title}
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-elevated block p-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-brand">
                      {article.category}
                    </p>
                    <h3 className="mt-2 font-semibold">{article.title}</h3>
                    <p className="mt-2 text-sm text-muted">{article.excerpt}</p>
                  </a>
                ) : (
                  <Link
                    key={article.title}
                    href={article.href}
                    className="card-elevated block p-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-brand">
                      {article.category}
                    </p>
                    <h3 className="mt-2 font-semibold">{article.title}</h3>
                    <p className="mt-2 text-sm text-muted">{article.excerpt}</p>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}
