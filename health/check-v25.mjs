// Men's Health Compass V2.5 release integrity checks.
// Run after build-v2.mjs; checks navigation, editorial boundaries and the print guide.
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {resolve} from "node:path";
const base=resolve(import.meta.dirname,"..");
const read=p=>readFileSync(resolve(base,p),"utf8");
const landing="health/prostate/living-well/recovery-compass/index.html";
const booklet="health/prostate/living-well/recovery-compass/brochure/index.html";
const css="health/prostate/living-well/recovery-compass/compass.css";
for(const path of [landing,booklet,css,"health/prostate/data/v2.5-overlays.json"])assert(existsSync(resolve(base,path)),path+" missing");
const h=read(landing),b=read(booklet),s=read(css);
for(const id of ["what-changes","three-tracks","journey","when-to-call","deeper","quick-guide","sources","before","early","catheter","routine","progress","year","beyond"])assert(h.includes('id="'+id+'"'),"Missing recovery stage or anchor "+id);
assert.equal((h.match(/class="rc-phase" id=/g)||[]).length,7,"Must have exactly seven phases");
assert.equal((b.match(/class="bp-sheet/g)||[]).length,4,"Brochure must have four sheets");
assert(b.includes("window.print()")&&s.includes("@media print")&&s.includes("@page"),"Printable PDF version missing");
for(const v of [h,b]){assert(v.includes('href="/health/about/"')&&v.includes('href="/health/privacy/"'),"Publication trust links missing");assert(v.includes('data-goatcounter="https://behshad.goatcounter.com/count"'),"Existing analytics missing");assert(!v.includes("amazon.com")&&!v.includes("data-goatcounter-click=\"affiliate"),"No shopping/affiliate links in surgical education");}
const required=[
["health/prostate/living-well/continence/index.html","v25-control-plan"],
["health/prostate/living-well/sexual-health/index.html","v25-sexual-recovery"],
["health/prostate/living-well/survivorship/index.html","v25-one-year"],
["health/prostate/treatments/robotic-surgery/operation/index.html","v25-what-is-removed"],
["health/prostate/living-well/index.html","v25-surgery-compass"],
["health/prostate/recovery-follow-up/index.html","v25-surgery-safety"]];
for(const [p,id] of required)assert(read(p).includes('id="'+id+'"'),"Missing focused enrichment "+p);
assert(!read("health/prostate/index.html").includes('class="guide-library-card"'),"Do not restore duplicate prostate topic cards");
const index=JSON.parse(read("health/prostate/content-index.json"));
for(const path of ["/health/prostate/living-well/recovery-compass/","/health/prostate/living-well/recovery-compass/brochure/"])assert(index.pages.filter(x=>x.path===path).length===1,"Missing or duplicate index route "+path);
const refs=JSON.parse(read("health/prostate/source-index.json")).sources;
for(const id of ["MSK-SURG","EAU-ED"])assert(refs.filter(x=>x.id===id).length===1,"Missing or duplicate clinical reference "+id);
assert(read("sitemap.xml").includes("https://behshad.com/health/prostate/living-well/recovery-compass/brochure/"),"Booklet missing sitemap");
for(const page of [landing,booklet]){const t=read(page);for(const match of t.matchAll(/href="#([^"]+)"/g))assert(t.includes('id="'+match[1]+'"'),"Broken in-page anchor "+page+"#"+match[1]);}
console.log("V2.5 QA PASS: seven recovery phases, four-page brochure, focused enrichment, preserved navigation, evidence and discovery links");
