import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { formatBlogDate, readingMinutes, type BlogPost } from "@/lib/blog/posts";

// Pillar's compact, image-led editorial card, adapted to Broadview's primitives.
export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white ${featured ? "grid md:grid-cols-2" : "flex flex-col"}`}>
      <TrackedLink href={`/blog/${post.slug}`} group="blog_card" label={post.title} className={`relative block overflow-hidden bg-slate-100 ${featured ? "aspect-[16/10] md:aspect-auto md:min-h-80" : "aspect-[16/9]"}`}>
        <Image src={post.image.src} alt={post.image.alt} fill sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"} preload={featured} className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]" />
        <span className="sr-only">Read {post.title}</span>
      </TrackedLink>
      <div className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-9 lg:p-12" : "p-6"}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{post.category}</p>
        <h2 className={`mt-4 font-semibold leading-tight tracking-tight text-navy-950 ${featured ? "text-3xl lg:text-4xl" : "text-xl"}`}>
          <TrackedLink href={`/blog/${post.slug}`} group="blog_card" label={post.title} className="hover:text-brand">{post.title}</TrackedLink>
        </h2>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <p className="mt-5 text-xs text-slate-500"><time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time> · {readingMinutes(post)} min read</p>
        <TrackedLink href={`/blog/${post.slug}`} group="blog_card" label={post.title} className="mt-4 inline-flex min-h-11 items-center justify-between border-t border-slate-100 pt-3 text-sm font-semibold text-brand">
          Read the story<span aria-hidden="true">↗</span><span className="sr-only">: {post.title}</span>
        </TrackedLink>
      </div>
    </article>
  );
}
