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
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.xml':'application/xml','.txt':'text/plain'};
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
const routes=['/health/','/health/about/','/privacy/','/health/prostate/','/health/prostate/basics/','/health/prostate/screening/','/health/prostate/diagnosis/','/health/prostate/treatments/','/health/prostate/living-well/','/health/prostate/research/','/health/prostate/rising-psa/','/health/prostate/tests-explained/','/health/prostate/active-surveillance/','/health/prostate/treatment-decisions/','/health/prostate/recovery-follow-up/','/health/prostate/insurance-access/','/health/prostate/treatments/robotic-surgery/operation/','/health/prostate/treatments/robotic-surgery/nerve-sparing/','/health/prostate/resources/sources/','/health/prostate/resources/glossary/','/health/prostate/resources/questions/','/health/prostate/resources/editorial-methods/'];
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
  assert.equal(await page.locator('a.v21-topic-card').count(),6,'Six topic cards required');
  assert.equal(await page.locator('a.guide-library-card').count(),0,'No competing guide card grid');
  assert.equal(await page.locator('section#situations a').count(),6,'Six contextual question shortcuts');
  await page.screenshot({path:resolve(out,'prostate-'+vp.name+'.png'),fullPage:true});
  await page.locator('a.v21-topic-card').first().click();
  assert(page.url().endsWith('/health/prostate/basics/'),'Topic card navigation failed');
  await page.screenshot({path:resolve(out,'basics-'+vp.name+'.png'),fullPage:true});
  await page.goto(base+'/health/prostate/basics/',{waitUntil:'domcontentloaded'});
  await page.locator('footer a[href="/health/about/"]').click();
  assert(page.url().endsWith('/health/about/'),'About link from guide failed');
  assert((await page.locator('main').textContent()).includes('not received independent clinician peer review'),'Editorial transparency missing');
  await page.locator('footer a[href="/privacy/"]').click();
  assert(page.url().endsWith('/privacy/'),'Privacy link failed');
  assert((await page.locator('main').textContent()).includes('Men’s Health Compass'),'Health privacy notice missing');
  checks+=4;
  await page.goto(base+'/health/prostate/treatments/',{waitUntil:'domcontentloaded'});
  assert(await page.locator('section#treatment-at-a-glance').count()===1,'Treatment comparison missing');
  await page.screenshot({path:resolve(out,'treatments-'+vp.name+'.png'),fullPage:true});
  await page.goto(base+'/health/prostate/resources/questions/',{waitUntil:'domcontentloaded'});
  await page.locator('[data-question-choice]').first().check();
  assert((await page.locator('[data-question-count]').textContent()).includes('1 selected'),'Question builder failed to update');
  checks+=4;
  await page.close();
 }
 assert.equal(errors.length,0,'Browser page errors: '+errors.join('; '));
 writeFileSync(resolve(out,'results.json'),JSON.stringify({status:'passed',checked_routes:routes.length,viewports:widths,checks,errors,notes:'Tests local branch files with real Chromium. Not a production-hosted visual verification.'},null,2)+'\n');
 console.log('v2.1 Chromium browser QA PASS: '+routes.length+' routes x '+widths.length+' viewports; '+checks+' checks');
}catch(e){errors.push(e.stack||String(e));writeFileSync(resolve(out,'results.json'),JSON.stringify({status:'failed',checks,errors},null,2)+'\n');throw e}
finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve))}
