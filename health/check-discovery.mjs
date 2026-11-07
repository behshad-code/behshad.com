// Static discovery and transparency regression checks for Men's Health Compass.
// Verifies published files and metadata only. Does not claim search-engine indexing.
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { resolve, relative, join } from "node:path";
import { fileURLToPath } from "node:url";

const base = resolve(fileURLToPath(new URL("../", import.meta.url)));
const read = path => readFileSync(resolve(base, path), "utf8");
const files = [];
function visit(dir) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) visit(abs);
    else if (name === "index.html") files.push(relative(base, abs).replaceAll("\\", "/"));
  }
}
visit(resolve(base, "health"));
const sitemap = read("sitemap.xml");
const robots = read("robots.txt");
const privacy = read("privacy/index.html");
const healthPrivacy = read("health/privacy/index.html");
assert(files.length >= 44, "Expected all published Health Compass pages and the About page");
assert(robots.includes("User-agent: *") && robots.includes("Allow: /"), "The main site must allow normal crawling");
assert(robots.includes("Sitemap: https://behshad.com/sitemap.xml"), "Root sitemap must be advertised");
assert(!sitemap.includes("/sandbox/"), "Public sitemap must not list review sandboxes");
assert(privacy.includes("Men’s Health Compass") && privacy.includes("GoatCounter"), "Privacy must cover the health publication and analytics");
assert(existsSync(resolve(base, "health/about/index.html")), "Missing publisher/editorial transparency page");
assert(healthPrivacy.includes("GoatCounter") && healthPrivacy.includes("affiliate"), "Health publication privacy notice missing analytics or funding information");

const seen = new Set();
let ldCount = 0;
for (const path of files) {
  const html = read(path);
  const url = "https://behshad.com/" + path.replace(/index\.html$/, "");
  assert(!seen.has(url), "Duplicate canonical URL: " + url);
  seen.add(url);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  assert(canonical && canonical[1] === url, path + ": canonical URL mismatch");
  assert(sitemap.includes("<loc>" + url + "</loc>"), "Missing from sitemap: " + url);
  assert(/<meta name="description" content="[^"]{30,}"/.test(html), "Missing meaningful description: " + path);
  assert(/<meta name="robots" content="index,follow,max-image-preview:large"/.test(html), "Wrong robots meta: " + path);
  assert(html.includes("<h1"), "Missing h1: " + path);
  for (const prop of ["og:title", "og:description", "og:url", "og:image"]) {
    assert(html.includes('property="' + prop + '"'), path + ": missing " + prop);
  }
  assert(html.includes('href="/health/about/"'), "No editorial About link: " + path);
  assert(html.includes('href="/health/privacy/"'), "No Health Privacy link: " + path);
  assert(!html.includes("Behshad Beheshti"), "Personal publisher name must not appear in Health Compass pages: " + path);
  assert(html.includes('data-goatcounter="https://behshad.goatcounter.com/count"'), "Missing existing page-view analytics: " + path);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const obj = JSON.parse(m[1]);
    assert(obj["@context"] === "https://schema.org", "Unexpected structured data context: " + path);
    ldCount++;
  }
}
assert(ldCount >= 37, "Unexpected loss of structured data across the V2.1 pages");
for (const path of ["health/index.html", "health/prostate/index.html", "health/about/index.html"])
  assert(read(path).includes('type="application/ld+json"'), "Required top-level structured data missing: " + path);
console.log("Discovery checks PASS:", files.length, "indexable Health Compass pages,", ldCount, "valid structured-data blocks, sitemap and trust links intact.");
