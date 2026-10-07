import type { Metadata } from "next";
import { MortgagePlanningLinks } from "@/components/content/mortgage-planning-links";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { TrackedLink } from "@/components/tracked-link";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { LearningPaths } from "@/components/content/learning-paths";
import {
  getArticlesByCategory,
  knowledgeCategories,
} from "@/lib/content/knowledge";

export const metadata: Metadata = { title: "Education | Realtor Academy & Homebuyer Learning Center", description: "Practical playbooks for real estate professionals and clear guides for homebuyers and homeowners. Learn, compare, and prepare your next conversation." };

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
          size="sm"
          eyebrow="Broadview Education"
          title="Clear answers for your next move."
          subtitle="Buying, owning, or helping a client? Start with what matters to you."
          ctas={[
            { label: "Find your learning path", href: "#learning-paths" },
          ]}
        />

        <div className="section-container space-y-14 py-14 md:py-18">
          <section id="learning-paths" className="scroll-mt-28"><LearningPaths /></section>
          <TrackedLink href="/blog" group="learn_hub" label="The Broadview Journal" className="card-elevated block p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Prefer a quick read?</p>
            <h2 className="mt-2 text-xl font-semibold">Visit the Broadview Journal →</h2>
            <p className="mt-2 text-muted">Market notes, rate explainers and useful ideas for your next coffee break.</p>
          </TrackedLink>
          <section aria-labelledby="guide-library-title">
          <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-widest text-brand">Go a little deeper</p><h2 id="guide-library-title" className="mt-3 text-3xl font-semibold">Choose a topic.</h2><p className="mt-3 text-muted">The full guide library is here whenever you need it.</p></div>
          {knowledgeCategories.filter((category) => category.slug !== "realtor-academy").map((category) => {
            const articles = getArticlesByCategory(category.slug);
            if (articles.length === 0) return null;
            return (
              <details
                key={category.slug}
                id={category.slug}
                className="group/library scroll-mt-28 border-b border-border py-2"
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 focus-visible:outline-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="text-xl font-semibold tracking-tight">
                      {category.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{articles.length} {articles.length === 1 ? "guide" : "guides"}</span>
                  </span>
                  <span aria-hidden="true" className="text-2xl text-brand group-open/library:rotate-45">+</span>
                </summary>
                <p className="text-sm text-muted">{category.description}</p>
                <div className="my-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              </details>
            );
          })}
          </section>
        </div>
        <MortgagePlanningLinks />
      </main>
      <ComplianceFooter />
    </>
  );
}
