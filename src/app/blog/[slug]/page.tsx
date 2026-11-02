import { getBookingUrl } from "@/lib/brand/booking";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { BookingLink } from "@/components/booking-link";
import { TrackedLink } from "@/components/tracked-link";
import { BlogCard } from "@/components/blog/blog-card";
import { getPost, getPublishedPosts, getRelatedPosts, formatBlogDate, readingMinutes } from "@/lib/blog/posts";
import { absoluteUrl, articleSchema } from "@/lib/seo/schema";
import { brand } from "@/lib/brand/config";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getPublishedPosts().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title, description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, url: `/blog/${post.slug}`, publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: [brand.companyName], images: [{ url: post.image.src, alt: post.image.alt }] },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.image.src] },
  };
}

export default async function BlogArticle({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);
  const schema = { ...articleSchema({ headline: post.title, description: post.excerpt, path: `/blog/${post.slug}`, datePublished: post.publishedAt, dateModified: post.updatedAt }), "@type": "BlogPosting", image: absoluteUrl(post.image.src), mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`) };
  return (
    <main className="bg-white">
      <Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <article className="mx-auto max-w-3xl py-10 sm:py-16">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
          <header className="mt-10">
            <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.16em] text-brand">{post.category}</Link>
            <h1 className="mt-2 text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">{post.title}</h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-600">{post.excerpt}</p>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">{brand.companyName} · <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time> · {readingMinutes(post)} min read</p>
            {post.dataAsOf && <p className="mt-3 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">Market snapshot: {post.dataAsOf}. This is dated context, not a live quote or forecast.</p>}
          </header>
          <figure className="mt-8"><div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100"><Image src={post.image.src} alt={post.image.alt} fill preload sizes="(min-width: 768px) 768px, 100vw" className="object-cover" /></div><figcaption className="mt-3 text-xs text-slate-500">AI-created editorial illustration. Not an actual client, listing, or financed property.</figcaption></figure>
          <aside className="mt-8 rounded-xl border-l-4 border-brand bg-slate-50 p-6"><p className="text-xs font-semibold uppercase tracking-widest text-brand">The coffee-break takeaway</p><p className="mt-3 text-lg font-medium leading-relaxed text-navy-950">{post.takeaway}</p></aside>
          {post.sections.map((section, index) => <section key={section.heading} aria-labelledby={`section-${index}`} className="mt-10"><h2 id={`section-${index}`} className="text-2xl font-semibold tracking-tight text-navy-950">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-lg leading-8 text-slate-700">{paragraph}</p>)}</section>)}
          <aside className="mt-10 rounded-xl bg-slate-50 p-6"><h2 className="font-semibold text-navy-950">Sources & context</h2><ul className="mt-3 space-y-3">{post.sources.map((source) => <li key={source.href}><a href={source.href} className="text-sm text-brand underline underline-offset-4">{source.label}</a></li>)}</ul><p className="mt-4 text-xs leading-relaxed text-slate-500">Sources checked {formatBlogDate(post.sourcesCheckedAt)}. Article updated {formatBlogDate(post.updatedAt)}. Linked reports may change; market figures reflect the period described above.</p></aside>
          <aside className="mt-10 rounded-2xl bg-navy-950 p-6 text-white sm:p-9"><p className="text-xs font-semibold uppercase tracking-widest text-white/60">Make it personal</p><h2 className="mt-3 text-2xl font-semibold">What does this mean for your next move?</h2><p className="mt-4 leading-relaxed text-slate-300">Bring your plans and questions. A Broadview advisor can help you understand the choices without the jargon.</p><div className="mt-6 flex flex-wrap gap-3"><TrackedLink href={post.nextStep.href === "/contact" ? getBookingUrl() : post.nextStep.href} group="blog_next_step" label={post.nextStep.label} className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-slate-100">{post.nextStep.label} →</TrackedLink><BookingLink location={`blog_${post.slug}`} className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10">Talk with an advisor</BookingLink></div></aside>
          <nav aria-label="Related financing options" className="mt-6 flex flex-wrap gap-x-6 gap-y-2">{post.productLinks.map((item) => <TrackedLink key={item.href} href={item.href} group="blog_product" label={item.label} className="inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4">{item.label} →</TrackedLink>)}</nav>
          <p className="mt-8 text-sm leading-relaxed text-slate-500">General educational information, not individualized financial, tax, or legal advice. Examples and market averages are not loan offers, commitments, or guarantees. Loan availability and terms depend on borrower and property review and applicable program requirements. <Link href="/disclosures" className="underline underline-offset-4">Licensing & disclosures</Link>.</p>
        </article>
        <section className="border-t border-slate-200 py-12 sm:py-16" aria-labelledby="keep-reading"><h2 id="keep-reading" className="mb-6 text-2xl font-semibold text-navy-950">Another good read</h2><div className="grid gap-6 md:grid-cols-3">{related.map((item) => <BlogCard key={item.slug} post={item} />)}</div><Link href="/blog" className="mt-8 inline-flex min-h-11 items-center font-semibold text-brand">← All stories</Link></section>
      </Container>
    </main>
  );
}
