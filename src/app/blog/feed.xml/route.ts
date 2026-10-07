import { getPublishedPosts } from "@/lib/blog/posts";
import { brand, siteUrl } from "@/lib/brand/config";

export const dynamic = "force-static";
const escapeXml = (value: string) => value.replace(/[<>&"']/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]!);

export function GET() {
  const posts = getPublishedPosts().slice(0, 30);
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>The Broadview Journal</title><link>${escapeXml(siteUrl)}/blog</link><description>Home, money and market notes from ${escapeXml(brand.companyName)}.</description><language>en-us</language><atom:link href="${escapeXml(siteUrl)}/blog/feed.xml" rel="self" type="application/rss+xml"/>${posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${escapeXml(siteUrl)}/blog/${post.slug}</link><guid isPermaLink="true">${escapeXml(siteUrl)}/blog/${post.slug}</guid><description>${escapeXml(post.excerpt)}</description><category>${escapeXml(post.category)}</category><pubDate>${new Date(`${post.publishedAt}T12:00:00Z`).toUTCString()}</pubDate></item>`).join("")}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "X-Content-Type-Options": "nosniff" } });
}
