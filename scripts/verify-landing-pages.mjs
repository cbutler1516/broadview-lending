import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import ts from "typescript";

// Trusted local content/config only; no lead submissions or external requests.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const nativeRequire = createRequire(import.meta.url);
const modules = new Map();
function load(relative) {
  const requested = resolve(root, relative);
  const path = existsSync(requested) ? requested : requested.replace(/\.ts$/, "/index.ts");
  assert(path.startsWith(resolve(root, "src") + sep));
  if (modules.has(path)) return modules.get(path).exports;
  const mod = { exports: {} };
  modules.set(path, mod);
  const source = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const require = specifier => {
    if (specifier.startsWith("@/")) return load(`src/${specifier.slice(2)}.ts`);
    if (specifier.startsWith(".")) return load(resolve(dirname(path), `${specifier}.ts`));
    return nativeRequire(specifier);
  };
  new Function("require", "module", "exports", source)(require, mod, mod.exports);
  return mod.exports;
}

const base = new URL(process.argv[2] ?? "http://localhost:3100");
assert(["localhost", "127.0.0.1", "[::1]"].includes(base.hostname), "Local preview only");
const { PRODUCT_DEFINITIONS: products } = load("src/lib/product/configs/index.ts");
const { productResources } = load("src/lib/product/resources.ts");
const { landingPages } = load("src/lib/content/landing-pages.ts");
const { helocLandingPages } = load("src/lib/heloc/content.ts");
const { locationPages } = load("src/lib/content/locations.ts");
const { siteUrl } = load("src/lib/brand/config.ts");
const { scenarioHrefForPath } = load("src/lib/nav/constants.ts");
const routes = new Map([
  ...landingPages.map(p => [p.path, p.path]),
  ...helocLandingPages.map(p => [p.path, p.path]),
  ...locationPages.map(p => [`/locations/${p.slug}`, `/locations/${p.slug}`]),
  ["/invest", "/invest"],
  ...products.map(p => [p.path, p.canonicalPath ?? p.path]),
]);
const cache = new Map();
async function get(path) {
  if (!cache.has(path)) cache.set(path, (async () => {
    const res = await fetch(new URL(path, base));
    assert.equal(res.status, 200, `${path} HTTP status`);
    return res.text();
  })());
  return cache.get(path);
}
const plain = value => value.replace(/<[^>]*>/g, "").replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"').replace(/\s+/g, " ").trim();
const sitemap = await get("/sitemap.xml");
const titles = new Set();
for (const [path, canonical] of routes) {
  const html = await get(path);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${path} one H1`);
  assert(html.includes(`<link rel="canonical" href="${siteUrl}${canonical}"`), `${path} canonical`);
  assert(!/<video[\s>]/.test(html), `${path} still imagery`);
  assert(html.includes("https://broadviewlending.my1003app.com/1585236/register?time=1791233747222"), `${path} existing Arive link`);
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `${path} indexable`);
  if (path === canonical) {
    assert(sitemap.includes(`<loc>${siteUrl}${path}</loc>`), `${path} sitemap`);
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert(title && !titles.has(title), `${path} unique title`);
    titles.add(title);
  } else assert(!sitemap.includes(`<loc>${siteUrl}${path}</loc>`), `${path} alias excluded from sitemap`);
  const product = products.find(p => p.path === path);
  if (product) {
    const hero = product.page.hero;
    const heading = plain(html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1]);
    assert.equal(heading, plain(`${hero.headlineBefore}${hero.headlineAccent}${hero.headlineAfter ?? ""}`));
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(match => JSON.parse(match[1]));
    assert.equal(schemas.filter(s => s["@type"] === "BreadcrumbList").length, 1, `${path} single breadcrumb schema`);
    assert(html.includes('aria-label="Breadcrumb"') && html.includes('aria-current="page"'), `${path} visible breadcrumb`);
    const faq = schemas.find(s => s["@type"] === "FAQPage");
    assert.deepEqual(faq.mainEntity.map(q => ({ question: q.name, answer: q.acceptedAnswer.text })), product.page.faq.items, `${path} FAQ/schema parity`);
    for (const item of product.page.faq.items) assert(plain(html).includes(item.answer), `${path} server-rendered FAQ answer`);
    const resources = productResources(product.group);
    assert.equal(resources.length, 3, `${path} three educational resources`);
    for (const link of [...resources, ...(product.page.related ?? []), ...hero.ctas]) {
      assert(html.includes(`href="${link.href}"`), `${path} renders ${link.href}`);
      if (link.href.startsWith("/")) await get(link.href.split("#")[0]);
    }
    const primary = hero.ctas.find(c => c.variant === "primary");
    assert.equal(scenarioHrefForPath(path), primary.href, `${path} chrome and hero lead to the same experience`);
    assert(!primary.href.includes("#"), `${path} primary CTA is not an intermediate anchor`);
    assert(html.includes("ADVISOR") || html.includes("Advisor Guidance"), `${path} advisor section`);
  }
  console.log(`PASS ${path}`);
}
const campaignHtml = await get("/invest/dscr?utm_source=google&utm_medium=cpc&utm_campaign=dscr");
for (const page of landingPages.filter(p => p.sections)) {
  const html = await get(page.path);
  for (const section of page.sections) {
    assert(plain(html).includes(section.heading), `${page.path} educational heading`);
    for (const paragraph of section.body) assert(plain(html).includes(paragraph), `${page.path} server-rendered content`);
  }
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(match => JSON.parse(match[1]));
  const faq = schemas.find(s => s["@type"] === "FAQPage");
  assert.deepEqual(faq.mainEntity.map(q => ({ question: q.name, answer: q.acceptedAnswer.text })), page.faqs);
  for (const source of page.sources) assert(html.includes(`href="${source.href}"`), `${page.path} source link`);
  for (const slug of page.related.articles) {
    assert(html.includes(`href="/learn/${slug}"`), `${page.path} related article`);
    await get(`/learn/${slug}`);
  }
  assert(html.includes(`href="${page.funnelHref}"`), `${page.path} existing funnel`);
  for (const hub of ["/buy", "/refinance", "/learn"]) assert((await get(hub)).includes(`href="${page.path}"`), `${hub} discovers ${page.path}`);
}
const robots = await get("/robots.txt");
assert(robots.includes("User-Agent: *") && robots.includes("Allow: /"), "Public crawler access");
assert(campaignHtml.includes(`<link rel="canonical" href="${siteUrl}/invest/dscr"`), "Campaign parameters do not create a new canonical");
console.log(`PASS ${routes.size} landing routes, ${products.length} product configurations, canonical URLs, sitemap, primary CTAs, guide links, FAQ parity and campaign-query canonical.`);
