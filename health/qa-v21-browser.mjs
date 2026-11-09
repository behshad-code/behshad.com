// Men's Health Compass v2.1 browser journey QA.
// Runs in a real Playwright Chromium browser against a local static copy of the repo.
// Production deploy requires separate verification of the hosted page.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.xml':'application/xml','.pdf':'application/pdf','.txt':'text/plain'};
const server=createServer((req,res)=>{
 const rel=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const path=resolve(root,'.'+rel,rel.endsWith('/')?'index.html':'');
 if(!path.startsWith(root+sep)&&path!==root){res.writeHead(403).end();return}
 if(!existsSync(path)){res.writeHead(404).end();return}
 try{const data=readFileSync(path);res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream'});res.end(data)}catch(e){res.writeHead(500).end(String(e))}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base='http://127.0.0.1:'+server.address().port;
const out=resolve(root,'health/qa-screenshots');
mkdirSync(out,{recursive:true});
let browser, checks=0, errors=[];
const widths=[{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}];
const routes=['/health/','/health/about/','/health/privacy/','/health/prostate/','/health/prostate/basics/','/health/prostate/screening/','/health/prostate/diagnosis/','/health/prostate/treatments/','/health/prostate/surgery-recovery/','/health/prostate/living-well/','/health/prostate/living-well/recovery-essentials/','/health/prostate/research/','/health/prostate/rising-psa/','/health/prostate/tests-explained/','/health/prostate/active-surveillance/','/health/prostate/treatment-decisions/','/health/prostate/recovery-follow-up/','/health/prostate/insurance-access/','/health/prostate/treatments/robotic-surgery/operation/','/health/prostate/treatments/robotic-surgery/nerve-sparing/','/health/prostate/resources/sources/','/health/prostate/resources/glossary/','/health/prostate/resources/questions/','/health/prostate/resources/editorial-methods/'];
try{
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const vp of widths){
  const page=await browser.newPage({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:1});
  page.on('pageerror',e=>errors.push(vp.name+': '+e.message));
  await page.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
  for(const route of routes){
   const resp=await page.goto(base+route,{waitUntil:'domcontentloaded'});
   assert.equal(resp?.status(),200,route+' did not load '+resp?.status());
   assert.equal(await page.locator('main h1').count(),1,route+' should have exactly one main h1');
   const measure=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,bodyOverflow:document.body.scrollWidth-innerWidth,mainCount:document.querySelectorAll('main').length,missingAlt:[...document.images].filter(i=>!i.hasAttribute('alt')).length}));
   assert(measure.overflow<=2,route+' horizontal overflow on '+vp.name+': '+measure.overflow);
   assert.equal(measure.missingAlt,0,route+' image missing alt attribute');
   checks++;
  }
  await page.goto(base+'/health/prostate/',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('a.v21-topic-card').count(),7,'Seven primary topic cards required');
  assert.equal(await page.locator('a.guide-library-card').count(),0,'No competing guide card grid');
  assert.equal(await page.locator('section#situations a').count(),6,'Six contextual question shortcuts');
  await page.screenshot({path:resolve(out,'prostate-'+vp.name+'.png'),fullPage:true});
  await page.locator('a.v21-topic-card').first().click();
  assert(page.url().endsWith('/health/prostate/basics/'),'Topic card navigation failed');
  await page.screenshot({path:resolve(out,'basics-'+vp.name+'.png'),fullPage:true});
  await page.goto(base+'/health/prostate/basics/',{waitUntil:'domcontentloaded'});
  await page.locator('footer a[href="/health/about/"]').click();
  assert(page.url().endsWith('/health/about/'),'About link from guide failed');
  assert((await page.locator('main').textContent()).includes('not been independently peer reviewed by a licensed clinician'),'Editorial transparency missing');
  await page.locator('footer a[href="/health/privacy/"]').click();
  assert(page.url().endsWith('/health/privacy/'),'Privacy link failed');
  assert((await page.locator('main').textContent()).includes("Men's Health Compass"),'Health privacy notice missing');
  checks+=4;
  await page.goto(base+'/health/prostate/treatments/',{waitUntil:'domcontentloaded'});
  assert(await page.locator('section#treatment-at-a-glance').count()===1,'Treatment comparison missing');
  await page.screenshot({path:resolve(out,'treatments-'+vp.name+'.png'),fullPage:true});
  await page.goto(base+'/health/prostate/resources/questions/',{waitUntil:'domcontentloaded'});
  await page.locator('[data-question-choice]').first().check();
  assert((await page.locator('[data-question-count]').textContent()).includes('1 selected'),'Question builder failed to update');
  // Recovery essentials pilot: test both contextual navigation and the Amazon link metadata.
  await page.goto(base+'/health/prostate/living-well/',{waitUntil:'domcontentloaded'});
  const teaser=page.locator('#pillar-1 a.re-teaser[href="/health/prostate/living-well/recovery-essentials/"]');
  assert.equal(await teaser.count(),1,'Illustrated Recovery Essentials teaser missing');
  await teaser.scrollIntoViewIfNeeded();
  const teaserPhoto=teaser.locator('img.re-teaser-image');
  assert(await teaserPhoto.evaluate(img=>img.decode().then(()=>img.naturalWidth>0).catch(()=>false)),'Teaser image did not load');
  assert.equal(await teaserPhoto.evaluate(img=>getComputedStyle(img).objectFit),'contain','Recovery teaser must show the whole illustration');
  await teaser.click();
  assert(page.url().endsWith('/health/prostate/living-well/recovery-essentials/'),'Recovery companion link failed');
  const amazon=page.locator('#urinary-protection a.re-buy');
  assert.equal(await amazon.count(),1,'Exactly one pilot affiliate product expected');
  const target=new URL(await amazon.getAttribute('href'));
  assert.equal(target.hostname,'www.amazon.com');
  assert.equal(target.pathname,'/dp/B0G6GSZ89J/ref=nosim');
  assert.equal(target.searchParams.get('tag'),'healthcompa0e-20','Affiliate tag missing');
  assert((await amazon.getAttribute('rel')).includes('sponsored'),'Sponsored link disclosure missing');
  assert.equal(await amazon.getAttribute('data-goatcounter-click'),'affiliate-amazon-us-depend-guards-B0G6GSZ89J','Product click event missing');
  const productPhoto=page.locator('#urinary-protection .re-product-photo');
  await productPhoto.scrollIntoViewIfNeeded();
  assert(await productPhoto.evaluate(img=>img.decode().then(()=>img.naturalWidth>0).catch(()=>false)),'Depend product photograph did not load');
  const productLinks=page.locator('#urinary-protection a.re-product-photo-link, #urinary-protection a.re-product-title-link, #urinary-protection a.re-buy');
  assert.equal(await productLinks.count(),3,'Photo, title and button must each link to Amazon');
  const expectedAmazonHref='https://www.amazon.com/dp/B0G6GSZ89J/ref=nosim?tag=healthcompa0e-20';
  for(const link of await productLinks.all()){
   assert.equal(await link.getAttribute('href'),expectedAmazonHref,'Product links must use the same tracked Amazon URL');
   assert((await link.getAttribute('rel')).includes('sponsored'),'Product affiliate link missing sponsored rel');
   assert((await link.getAttribute('data-goatcounter-click')).includes('affiliate-amazon-us-depend-guards-B0G6GSZ89J'),'Product link missing click event');
  }

  // Each recommendation reuses the existing image-left card design and has 3 independently tracked hotspots.
  const additionalProducts=[
   ['sofy-fine-bed-pads','https://link.amazon/B0aIFZCdx'],
   ['utopia-reusable-bed-pads','https://link.amazon/B09o3BMiD'],
   ['mens-white-bathrobe','https://link.amazon/B01k5sBBO'],
   ['mens-long-sleep-shirt','https://link.amazon/B022zd3ME']
  ];
  assert.equal(await page.locator('article.re-product').count(),5,'Five recovery product cards expected');
  for(const [id,href] of additionalProducts){
   const card=page.locator('article.re-product[data-recovery-product="'+id+'"]');
   assert.equal(await card.count(),1,'Missing recovery product '+id);
   const pic=card.locator('img.re-product-photo');
   assert(await pic.evaluate(img=>img.decode().then(()=>img.naturalWidth>0).catch(()=>false)),'Recovery product image failed: '+id);
   const links=card.locator('a.re-product-photo-link, a.re-product-title-link, a.re-buy');
   assert.equal(await links.count(),3,'Image, title, and button required: '+id);
   for(const link of await links.all()){
    assert.equal(await link.getAttribute('href'),href,'Amazon destination mismatch: '+id);
    assert((await link.getAttribute('rel')).includes('sponsored'),'Sponsored link missing: '+id);
    assert((await link.getAttribute('data-goatcounter-click')).includes('affiliate-amazon-us-'+id),'GoatCounter event missing: '+id);
   }
  }
  checks+=22;
  assert((await page.locator('.re-disclosure').textContent()).includes('As an Amazon Associate I earn from qualifying purchases.'),'Affiliate disclosure missing');
  assert.equal(await page.locator('.re-note').filter({hasText:'Affiliate disclosure'}).count(),0,'Obtrusive affiliate box still present');
  await page.screenshot({path:resolve(out,'recovery-essentials-'+vp.name+'.png'),fullPage:true});
  // V2.6: test direct top-level recovery guide, illustration loading, true four-page PDF and legacy aliases.
  await page.goto(base+'/health/prostate/surgery-recovery/',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('.rc-phase').count(),7,'Seven recovery phases required');
  assert.equal(await page.locator('.rc-safety').count(),2,'Emergency and prompt contact sections required');
  for(const name of ['prostatectomy-anatomy-comparison.svg','prostatectomy-recovery-roadmap.svg','prostatectomy-function-tracks.svg']){
    const image=page.locator('img[src="/health/assets/'+name+'"]');
    assert.equal(await image.count(),1,'Missing illustration '+name);
    assert(await image.evaluate(img=>img.decode().then(()=>img.naturalWidth>0).catch(()=>false)),'Illustration did not render '+name);
  }
  const pdfHref='/health/assets/Prostate_Surgery_Recovery_Compass_V2.6.pdf';
  assert(await page.locator('a[href="'+pdfHref+'"]').count()>=1,'Direct PDF download link missing');
  const pdfRes=await page.request.get(base+pdfHref);
  assert.equal(pdfRes.status(),200,'PDF download must return 200');
  const bytes=await pdfRes.body(),pdfText=bytes.toString('latin1');
  assert(pdfText.startsWith('%PDF-1.4'),'Download is not a genuine PDF');
  assert.equal((pdfText.match(/\/Type \/Page\b/g)||[]).length,4,'PDF must have exactly four pages');
  await page.screenshot({path:resolve(out,'recovery-compass-v26-'+vp.name+'.png'),fullPage:true});
  const alias=await page.request.get(base+'/health/prostate/living-well/recovery-compass/',{maxRedirects:0});
  assert.equal(alias.status(),200,'Legacy alias must remain reachable');
  assert((await alias.text()).includes('http-equiv="refresh"'),'Legacy alias must redirect visitors');
  checks+=8;
  await page.goto(base+'/health/prostate/living-well/continence/',{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('a.v2-card[href="/health/prostate/living-well/recovery-essentials/"]').count(),1,'Continence companion link missing');
  checks+=9;
  checks+=4;
  await page.close();
 }

 // Tablet-sized Chromium test specifically covers the layout reported on iPad Safari.
 const tablet=await browser.newPage({viewport:{width:820,height:1180},deviceScaleFactor:2});
 await tablet.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
 await tablet.goto(base+'/health/prostate/living-well/',{waitUntil:'domcontentloaded'});
 const tabletImage=tablet.locator('a.re-teaser img.re-teaser-image');
 assert(await tabletImage.evaluate(img=>img.decode().then(()=>img.naturalWidth>0&&getComputedStyle(img).objectFit==='contain').catch(()=>false)),'Tablet teaser must load without image cropping');
 const tabletOverflow=await tablet.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
 assert(tabletOverflow<=2,'Tablet has horizontal overflow');
 await tabletImage.scrollIntoViewIfNeeded();
 await tablet.screenshot({path:resolve(out,'recovery-teaser-tablet.png'),fullPage:true});
 await tablet.close();
 checks+=2;
 assert.equal(errors.length,0,'Browser page errors: '+errors.join('; '));
 writeFileSync(resolve(out,'results.json'),JSON.stringify({status:'passed',checked_routes:routes.length,viewports:widths,checks,errors,notes:'Tests local branch files with real Chromium. Not a production-hosted visual verification.'},null,2)+'\n');
 console.log('v2.1 Chromium browser QA PASS: '+routes.length+' routes x '+widths.length+' viewports; '+checks+' checks');
}catch(e){errors.push(e.stack||String(e));writeFileSync(resolve(out,'results.json'),JSON.stringify({status:'failed',checks,errors},null,2)+'\n');throw e}
finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve))}
