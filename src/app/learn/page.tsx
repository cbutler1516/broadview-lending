import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { CinematicHero } from "@/components/media/cinematic-hero";
import {
  getArticlesByCategory,
  knowledgeCategories,
} from "@/lib/content/knowledge";
import { buildPageMetadata } from "@/lib/brand/seo";

export const metadata: Metadata = buildPageMetadata("learn");

export default function LearnPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <CinematicHero
          theme="learn"
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
          ]}
          eyebrow="Mortgage Learning Center"
          title="We help you think it through"
          subtitle="A structured library — not a blog — to help you understand your options before recommending a loan. Clear answers, real examples, and a real advisor when you're ready."
          ctas={[
            { label: "Build My Strategy", href: "/#funnels" },
            {
              label: "Talk With An Advisor",
              booking: true,
              bookingLocation: "learn_hub_hero",
              variant: "secondary",
            },
          ]}
        />

        <div className="section-container space-y-14 py-14 md:py-18">
          {knowledgeCategories.map((category) => {
            const articles = getArticlesByCategory(category.slug);
            if (articles.length === 0) return null;
            return (
              <section
                key={category.slug}
                id={category.slug}
                className="scroll-mt-28"
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {category.title}
                    </h2>
                    <p className="mt-1 text-muted">{category.description}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <TrackedLink
                      key={article.slug}
                      href={`/learn/${article.slug}`}
                      group="learn_hub"
                      label={article.title}
                      className="card-elevated group flex flex-col p-6"
                    >
                      <p className="text-xs font-medium uppercase tracking-wider text-brand">
                        {article.readingTime} read
                      </p>
                      <h3 className="mt-2 font-semibold group-hover:text-brand">
                        {article.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                        {article.summary}
                      </p>
                    </TrackedLink>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <ComplianceFooter />
    </>
  );
}
