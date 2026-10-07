import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

// Adapted from Pillar's data-driven Insight model. One file per story keeps
// daily editorial work isolated from page code and from other pending work.
export const BLOG_CATEGORIES = ["Market Notes", "Rates, Simply", "Buying a Home", "Owning a Home", "Investor Basics"] as const;
const text = z.string().min(1);
const date = z.iso.date();
const localHref = z.string().regex(/^\/(?!\/)[a-z0-9/#-]*$/);
const link = z.object({ label: text, href: localHref });
export const blogPostSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: text,
  excerpt: text,
  category: z.enum(BLOG_CATEGORIES),
  publishedAt: date,
  updatedAt: date,
  sourcesCheckedAt: date,
  dataAsOf: text.optional(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean().default(false),
  image: z.object({ src: z.string().regex(/^\/images\/blog\/[a-z0-9-]+\.webp$/), alt: text }),
  takeaway: text,
  sections: z.array(z.object({ heading: text, paragraphs: z.array(text).min(1) })).min(3),
  sources: z.array(z.object({ label: text, href: z.union([z.url().refine((url) => url.startsWith("https://")), localHref]) })).min(1),
  relatedSlugs: z.array(text).min(3),
  productLinks: z.array(link).min(1),
  nextStep: link,
}).refine((post) => post.updatedAt >= post.publishedAt, { message: "Update date cannot precede publication" });

export type BlogPost = z.infer<typeof blogPostSchema>;

const directory = path.join(process.cwd(), "src/content/blog");
const posts: BlogPost[] = readdirSync(directory)
  .filter((file) => file.endsWith(".json"))
  .map((file) => {
    const post = blogPostSchema.parse(JSON.parse(readFileSync(path.join(directory, file), "utf8")));
    if (file !== `${post.slug}.json`) throw new Error(`Blog filename does not match slug: ${file}`);
    return post;
  });

export function getPublishedPosts(asOf = new Date().toISOString().slice(0, 10)): BlogPost[] {
  return posts.filter((post) => post.status === "published" && post.publishedAt <= asOf)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || Number(b.featured) - Number(a.featured) || a.slug.localeCompare(b.slug));
}

export function getPost(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost) {
  const available = getPublishedPosts();
  return post.relatedSlugs.flatMap((slug) => {
    const related = available.find((item) => item.slug === slug && slug !== post.slug);
    return related ? [related] : [];
  }).slice(0, 3);
}

export function readingMinutes(post: BlogPost) {
  const words = [post.excerpt, post.takeaway, ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs])].join(" ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}
