import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { CinematicHero } from "@/components/media/cinematic-hero";
import { FaqList } from "@/components/content/faq-list";
import { RelatedContent } from "@/components/content/related-content";
import { TrackedLink } from "@/components/tracked-link";
import { EngagementTracker } from "@/components/analytics/engagement-tracker";
import { AdvisorInsight } from "@/components/intelligence/advisor-insight";
import { StrategySnapshot } from "@/components/intelligence/strategy-snapshot";
import { QuestionsWeHear } from "@/components/trust/trust-modules";
import { articleSchema, jsonLdString } from "@/lib/seo/schema";
import {
  getArticle,
  knowledgeCategories,
  type KnowledgeArticle,
} from "@/lib/content/knowledge";

type ArticleTemplateProps = {
  article: KnowledgeArticle;
};

export function ArticleTemplate({ article }: ArticleTemplateProps) {
  const category = knowledgeCategories.find((c) => c.slug === article.category);
  const next = article.nextArticle ? getArticle(article.nextArticle) : undefined;

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            articleSchema({
              headline: article.title,
              description: article.summary,
              path: `/learn/${article.slug}`,
              datePublished: article.updated,
            }),
          ),
        }}
      />
      <EngagementTracker contentId={article.slug} contentType="article" />

      <article>
        <CinematicHero
          theme="learn"
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
            ...(category
              ? [{ name: category.title, path: `/learn#${category.slug}` }]
              : []),
            { name: article.title, path: `/learn/${article.slug}` },
          ]}
          eyebrow={article.eyebrow}
          title={article.title}
          subtitle={article.intro}
          note={`${article.readingTime} read · Updated ${new Date(
            article.updated,
          ).toLocaleDateString("en-US", { year: "numeric", month: "long" })}`}
          ctas={[
            {
              label: "Talk With An Advisor",
              booking: true,
              bookingLocation: `article_${article.slug}_hero`,
            },
            { label: "Build My Strategy", href: "/#funnels", variant: "secondary" },
          ]}
        />

        <div className="section-container grid gap-12 py-12 md:py-16 lg:grid-cols-[1fr_280px]">
          <div className="max-w-2xl">
            <div className="rounded-2xl border border-brand/20 bg-brand-light/60 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
                The short answer
              </p>
              <p className="mt-2 leading-relaxed text-foreground">{article.summary}</p>
            </div>

            <div className="mt-10 space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="leading-relaxed text-muted"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {article.keyTakeaways.length > 0 && (
              <div className="mt-10 rounded-2xl border border-border bg-surface-muted p-6">
                <h2 className="text-lg font-semibold">Key takeaways</h2>
                <ul className="mt-4 space-y-2">
                  {article.keyTakeaways.map((takeaway) => (
                    <li key={takeaway} className="flex items-start gap-3 text-sm text-muted">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand"
                      >
                        ✓
                      </span>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card-elevated p-6">
              <p className="text-sm font-semibold">Talk it through</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A Broadview advisor can apply this to your exact situation.
              </p>
              <BookingLink
                location={`article_${article.slug}_sidebar`}
                className="btn-primary mt-4 w-full"
              >
                Talk With An Advisor
              </BookingLink>
              <Link
                href="/tools"
                className="btn-secondary mt-3 w-full"
              >
                Explore Tools
              </Link>
            </div>
          </aside>
        </div>

        {article.advisorInsight && (
          <AdvisorInsight
            insight={article.advisorInsight}
            sourceId={`article_${article.slug}`}
            className="pb-12 md:pb-16"
          />
        )}

        {article.questionsWeHear && article.questionsWeHear.length > 0 && (
          <QuestionsWeHear
            items={article.questionsWeHear}
            className="pb-12 md:pb-16"
          />
        )}

        {article.strategySnapshot && (
          <StrategySnapshot
            snapshot={article.strategySnapshot}
            sourceId={`article_${article.slug}`}
            className="pb-12 md:pb-16"
          />
        )}

        <FaqList faqs={article.faqs} className="pb-12 md:pb-16" />

        {next && (
          <div className="section-container pb-4">
            <TrackedLink
              href={`/learn/${next.slug}`}
              group="next_article"
              label={next.title}
              className="card-elevated group flex items-center justify-between gap-4 p-6"
            >
              <span>
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
                  Read next
                </span>
                <span className="mt-1 block text-lg font-semibold group-hover:text-brand">
                  {next.title}
                </span>
              </span>
              <span aria-hidden className="text-2xl text-muted transition-transform group-hover:translate-x-1">
                →
              </span>
            </TrackedLink>
          </div>
        )}

        <RelatedContent
          refs={article.related}
          currentSlug={article.slug}
          className="border-t border-border py-14 md:py-18"
        />
      </article>
    </main>
  );
}
