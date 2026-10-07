import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { BlogCard } from "@/components/blog/blog-card";
import { BLOG_CATEGORIES, getPublishedPosts } from "@/lib/blog/posts";

type Props = { searchParams: Promise<{ category?: string; page?: string }> };
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = await searchParams;
  return {
    title: "The Broadview Journal | Home, Money & Market Notes",
    description: "Short, useful reads on real estate, mortgage rates, buying a home and making the most of the one you have. Less jargon. More perspective.",
    alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
    ...(query.category || query.page ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title: "The Broadview Journal", description: "Home, money and the market—made a little simpler.", url: "/blog", images: [{ url: "/images/blog/neighborhood.webp", alt: "An illustrative neighborhood in warm autumn light" }] },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const query = await searchParams;
  const category = BLOG_CATEGORIES.find((item) => item === query.category);
  const posts = getPublishedPosts().filter((post) => !category || post.category === category);
  const pages = Math.max(1, Math.ceil(posts.length / 12));
  const requestedPage = Number(query.page ?? 1);
  const page = Number.isSafeInteger(requestedPage) ? Math.min(pages, Math.max(1, requestedPage)) : 1;
  const visible = posts.slice((page - 1) * 12, page * 12);
  const featured = !category && page === 1 ? visible[0] : undefined;
  const pageHref = (number: number) => `/blog?${new URLSearchParams({ ...(category ? { category } : {}), page: String(number) })}`;
  return (
    <main className="bg-white">
      <header className="border-b border-slate-200 bg-slate-50 py-8 sm:py-10">
        <Container>
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand">The Broadview Journal</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-navy-950 sm:text-4xl">Home, money, and the market.<br /><span className="text-slate-500">A little simpler.</span></h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">Useful reads for your coffee break. Fresh perspective, practical ideas, and no mortgage dictionary required.</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-brand"><Link href="/learn" className="inline-flex min-h-11 items-center underline underline-offset-4">Looking for an in-depth guide?</Link><a href="/blog/feed.xml" className="inline-flex min-h-11 items-center underline underline-offset-4">Follow via RSS ↗</a></div>
        </Container>
      </header>
      <Container>
        <nav aria-label="Blog topics" className="flex flex-wrap gap-2 py-6">
          {[undefined, ...BLOG_CATEGORIES].map((item) => <Link key={item ?? "all"} href={item ? `/blog?category=${encodeURIComponent(item)}` : "/blog"} aria-current={category === item ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${category === item ? "border-navy-950 bg-navy-950 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"}`}>{item ?? "All stories"}</Link>)}
        </nav>
        <section aria-label={category ?? "Latest stories"} className="pb-16 sm:pb-24">
          {featured && <div className="mb-8"><BlogCard post={featured} featured /></div>}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visible.filter((post) => post !== featured).map((post) => <BlogCard key={post.slug} post={post} />)}</div>
          {!visible.length && <p className="py-12 text-slate-600">New stories are on the way. <Link href="/learn" className="underline">Explore our learning library</Link> in the meantime.</p>}
          {pages > 1 && <nav aria-label="Blog pages" className="mt-10 flex items-center justify-between gap-4 border-t border-slate-200 pt-6">{page > 1 ? <Link className="inline-flex min-h-11 items-center font-semibold text-brand" href={pageHref(page - 1)}>← Newer stories</Link> : <span />}<span className="text-sm text-slate-500">Page {page} of {pages}</span>{page < pages ? <Link className="inline-flex min-h-11 items-center font-semibold text-brand" href={pageHref(page + 1)}>Older stories →</Link> : <span />}</nav>}
        </section>
      </Container>
    </main>
  );
}
