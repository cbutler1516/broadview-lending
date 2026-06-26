import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ComplianceFooter } from "@/components/compliance-footer";
import { ArticleTemplate } from "@/components/content/article-template";
import { getArticle, knowledgeArticles } from "@/lib/content/knowledge";
import { siteUrl } from "@/lib/brand/config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return knowledgeArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Article Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: article.seo.title,
    description: article.seo.description,
    keywords: article.seo.keywords,
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      url: `${siteUrl}/learn/${article.slug}`,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <SiteNav />
      <ArticleTemplate article={article} />
      <ComplianceFooter />
    </>
  );
}
