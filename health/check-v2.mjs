
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {resolve} from "node:path";
import {fileURLToPath} from "node:url";
const root=resolve(fileURLToPath(new URL("../",import.meta.url)));
const read=p=>readFileSync(resolve(root,p),"utf8");
const slugs=["part1","part2","part3a","part3b","part4"];
const articles=slugs.flatMap(p=>JSON.parse(read("health/prostate/data/v2-articles-"+p+".json")).articles);
const sources=JSON.parse(read("health/prostate/data/v2-sources.json"));
const glossary=JSON.parse(read("health/prostate/data/v2-glossary.json"));
const ids=new Set(sources.map(x=>x.id));
const hubs=["basics","screening","diagnosis","treatments","living-well","research"];
const guides=["rising-psa","tests-explained","active-surveillance","treatment-decisions","recovery-follow-up","insurance-access"];
const resources=["sources","glossary","questions","editorial-methods"];
const topic=read("health/prostate/index.html"),home=read("health/index.html");
assert.equal(articles.length,24,"24 authored articles expected");
assert.equal(new Set(articles.map(x=>x.path)).size,24,"Unique article routes required");
assert.equal(glossary.length,78,"78 glossary entries expected");
assert.equal(ids.size,sources.length,"Source IDs must be unique");
assert.equal((topic.match(/class="guide-library-card"/g)||[]).length,0,"Prostate page cannot duplicate the flagship guide library");
assert.equal((topic.match(/class="v21-topic-card"/g)||[]).length,6,"Prostate page must have one six-category navigation");
assert.equal((topic.match(/class="prostate-research-card"/g)||[]).length,3,"Three research highlights maximum");
assert.equal((topic.match(/class="v2-card"/g)||[]).length,0,"A secondary six-card Explore Further grid is prohibited");
assert.equal((home.match(/class="guide-library-card"/g)||[]).length,0,"No guide library on general health home");
const paths=[...articles.map(a=>"health/prostate/"+a.path+"/index.html"),...hubs.map(h=>"health/prostate/"+h+"/index.html"),...resources.map(r=>"health/prostate/resources/"+r+"/index.html"),"health/prostate/index.html",...guides.map(g=>"health/prostate/"+g+"/index.html")];
const pillarMap={basics:"Prostate Basics",screening:"Screening & PSA",diagnosis:"Prostate Cancer",treatments:"Treatment Options","living-well":"Living Well",research:"Research & Updates"};
let pillarWords=0;
for(const hub of hubs){
 const p=JSON.parse(read("health/prostate/data/v2.1-pillars/"+hub+".json"));
 assert.equal(p.slug,hub,"Pillar slug mismatch "+hub);
 assert.equal(p.name,pillarMap[hub],"Pillar title mismatch "+hub);
 assert(p.sections.length>=6,"Too few educational sections: "+hub);
 const words=p.sections.flatMap(s=>s.paragraphs||[]).join(" ").split(/\\s+/).length;
 assert(words>=650,"Pillar needs more substantive content: "+hub+" has "+words+" words");
 pillarWords+=words;
 for(const s of p.sections){assert(s.heading&&s.paragraphs.length,"Incomplete section "+hub);for(const id of s.refs||[])assert(ids.has(id),"Unknown pillar source "+id+" in "+hub)}
 const html=read("health/prostate/"+hub+"/index.html");
 assert((html.match(/id="pillar-\\d+"/g)||[]).length===p.sections.length,"Rendered pillar section count mismatch: "+hub);
}
let linkCount=0;
for(const p of paths){
 assert(existsSync(resolve(root,p)),"Missing route "+p);
 const h=read(p);
 assert(h.includes("<h1")&&h.includes('rel="canonical"'),"Missing title/canonical "+p);
 for(const match of h.matchAll(/href="#([^"]+)"/g))assert(h.includes('id="'+match[1]+'"'),"Broken fragment "+p+"#"+match[1]);
 for(const match of h.matchAll(/href="(\/health\/[^"#?]*\/)(?:#[^"]*)?"/g)){
  const target=resolve(root,match[1].slice(1),"index.html");
  assert(existsSync(target),"Broken internal route: "+p+" -> "+match[1]);
  linkCount++;
 }
 for(const match of h.matchAll(/(?:href|src)="(\/health\/[^"#?]+\.(?:css|js|png|svg|webp))"/g))assert(existsSync(resolve(root,match[1].slice(1))),"Missing asset "+match[1]+" on "+p);
 if(!guides.some(g=>p==="health/prostate/"+g+"/index.html")&&p!=="health/prostate/index.html")assert(h.includes('name="robots" content="index,follow,max-image-preview:large"'),"Published page incorrectly marked noindex: "+p);
}
for(const a of articles){
 assert(a.sections.length>=4,"Incomplete article "+a.path);
 const wc=a.sections.flatMap(s=>s.paragraphs).join(" ").split(/\s+/).length;
 assert(wc>=210,"Article too short: "+a.path);
 assert(a.questions.length>=4,"Questions missing: "+a.path);
 for(const s of a.sections)for(const id of s.refs)assert(ids.has(id),"Unknown evidence ID: "+id+" on "+a.path);
}
assert(read("health/v2.js").includes("data-question-choice"),"Question builder script missing");
const sitemap=read("sitemap.xml");
for(const p of paths)assert(sitemap.includes("<loc>https://behshad.com/"+p.replace(/index\.html$/,"")+"</loc>"),"Sitemap missing "+p);
console.log("Men's Health Compass v2.1 checks PASS: 24 articles; 6 hubs; 4 resources; 6 flagship guides; "+glossary.length+" glossary terms; "+sources.length+" sources; "+linkCount+" internal links; "+pillarWords+" verified-source-linked pillar words");
