import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { blogPostSchema, getPublishedPosts, getPost, getRelatedPosts, readingMinutes } from "../src/lib/blog/posts.ts";

const posts = getPublishedPosts();
assert(posts.length >= 10, "Keep the ten starter stories");
assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length, "Unique slugs");
assert.equal(getPost("not-a-real-story"), undefined);
assert.equal(getPublishedPosts("2026-10-04").length, 0, "Future launch content stays hidden");
const imageOwners = new Map();
const imageHashes = new Map();
for (const file of readdirSync("src/content/blog").filter((file) => file.endsWith(".json"))) {
  const raw = JSON.parse(readFileSync(path.join("src/content/blog", file), "utf8"));
  blogPostSchema.parse(raw);
  assert.equal(file, `${raw.slug}.json`);
  // Include future-dated published entries, not just today's archive.
  if (raw.status === "published") {
    assert(!imageOwners.has(raw.image.src), `${raw.slug} reuses the cover from ${imageOwners.get(raw.image.src)}: ${raw.image.src}`);
    const asset = path.join("public", raw.image.src);
    assert(existsSync(asset), `Missing image: ${raw.slug}`);
    const hash = createHash("sha256").update(readFileSync(asset)).digest("hex");
    assert(!imageHashes.has(hash), `${raw.slug} has an identical image file to ${imageHashes.get(hash)}; renaming does not make it unique`);
    imageOwners.set(raw.image.src, raw.slug);
    imageHashes.set(hash, raw.slug);
  }
}
for (const post of posts) {
  assert(existsSync(path.join("public", post.image.src)), `Missing image: ${post.slug}`);
  assert.equal(new Set(post.relatedSlugs).size, post.relatedSlugs.length, `Duplicate related links: ${post.slug}`);
  assert.equal(getRelatedPosts(post).length, 3, `Three valid related articles: ${post.slug}`);
  assert(!post.relatedSlugs.includes(post.slug), "No self references");
  assert(post.sourcesCheckedAt <= post.updatedAt, "Source review does not postdate the update");
  assert(readingMinutes(post) >= 1);
  assert(!blogPostSchema.safeParse({ ...post, nextStep: { label: "Bad link", href: "javascript:alert(1)" } }).success);
  assert(!blogPostSchema.safeParse({ ...post, publishedAt: "2026-02-30" }).success);
}

const base = process.argv[2];
if (base) {
  assert(/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(base), "Verification is local-only");
  const routes = new Set(["/blog", "/blog?category=Buying%20a%20Home", "/blog?page=999", "/blog/feed.xml", "/sitemap.xml"]);
  for (const post of posts) {
    routes.add(`/blog/${post.slug}`);
    routes.add(post.image.src);
    routes.add(post.nextStep.href);
    post.productLinks.forEach((link) => routes.add(link.href));
  }
  for (const route of routes) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, `${route} returned ${response.status}`);
    if (route.startsWith("/blog/") && !route.endsWith(".xml")) {
      const html = await response.text();
      assert(html.includes('"@type":"BlogPosting"'), `Missing article schema: ${route}`);
      assert(html.includes("Sources &amp; context") || html.includes("Sources & context"));
      assert(html.includes('rel="canonical"'), `Missing canonical: ${route}`);
      const post = getPost(route.slice("/blog/".length));
      assert(html.includes(encodeURIComponent(post.image.src)), `Article does not render its assigned cover: ${route}`);
    }
  }
  assert.equal((await fetch(`${base}/blog/not-a-real-story`)).status, 404);
  const feed = await (await fetch(`${base}/blog/feed.xml`)).text();
  const archive = await (await fetch(`${base}/blog`)).text();
  for (const post of posts.slice(0, 12)) assert(archive.includes(encodeURIComponent(post.image.src)), `Archive missing cover: ${post.slug}`);
  assert.equal((feed.match(/<item>/g) ?? []).length, Math.min(posts.length, 30));
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const post of posts) assert(sitemap.includes(`/blog/${post.slug}</loc>`));
  console.log(`Local HTTP checks passed for ${routes.size} pages/assets, plus unknown-slug 404, RSS and sitemap.`);
}
console.log(`Blog content checks passed for ${posts.length} stories and ${imageOwners.size} distinct published covers (paths and file hashes).`);
