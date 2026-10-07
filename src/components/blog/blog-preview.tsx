import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BlogCard } from "@/components/blog/blog-card";
import { getPublishedPosts } from "@/lib/blog/posts";

export function BlogPreview() {
  const posts = getPublishedPosts().slice(0, 3);
  if (!posts.length) return null;
  return (
    <section className="bg-slate-50 py-16 sm:py-24" aria-labelledby="blog-preview-heading">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">The Broadview Journal</p><h2 id="blog-preview-heading" className="mt-3 text-3xl font-semibold tracking-tight text-navy-950">A little perspective for your next move.</h2></div>
          <Link href="/blog" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand underline underline-offset-4">Visit the blog →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
      </Container>
    </section>
  );
}
