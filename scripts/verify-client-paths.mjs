import assert from "node:assert/strict";

// Read-only local smoke checks. Never submit lead forms or contact a live CRM.
const base = new URL(process.argv[2] ?? "http://localhost:3100");
assert(["localhost", "127.0.0.1", "[::1]"].includes(base.hostname), "Use a local preview only.");
const applicationUrl = "https://broadviewlending.my1003app.com/1585236/register?time=1791233747222";
const paths = [
  "/", "/contact", "/buy", "/refinance", "/heloc", "/invest", "/invest/fix-and-flip",
  ...["purchase", "refinance", "heloc", "va", "fha", "first-time-homebuyer", "investment"].map(type => `/funnel/${type}`),
];
for (const path of paths) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `${path} should render successfully`);
  const html = await response.text();
  assert.match(html, /<h1[\s>]/, `${path} should have a page heading`);
  assert(html.includes(`href="${applicationUrl}"`), `${path} must offer the exact Arive destination`);
  assert(!/<video[\s>]/.test(html), `${path} should not mount decorative videos`);
  assert(!html.includes("Functions cannot be passed directly to Client Components"), `${path} must serialize safely`);
  console.log(`PASS ${path}`);
}
const missing = await fetch(new URL("/funnel/not-a-funnel", base));
assert.equal(missing.status, 404, "Unknown funnels must remain 404");
console.log(`PASS ${paths.length} client paths, still-image rendering, Arive links and unknown-funnel 404`);
