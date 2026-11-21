// Branch-only QA. External requests are blocked; no analytics or advertising is sent.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const out=resolve(root,'qa-output/adsense'); mkdirSync(out,{recursive:true});
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.pdf':'application/pdf','.xml':'application/xml','.txt':'text/plain'};
const server=createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 const name=resolve(root,'.'+decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');
 if(!name.startsWith(root+sep)){res.writeHead(403).end();return}
 try{res.writeHead(200,{'Content-Type':mime[extname(name)]||'application/octet-stream'});res.end(readFileSync(name))}catch{res.writeHead(404).end()}
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const base='http://127.0.0.1:'+server.address().port;
const routes=['/','/ma/','/ma/integration/','/ma/technology-diligence/','/et/biz2/','/transformation/revenue-engine/','/transformation/business-2-0/','/ma/pace-arris-integration/','/ma/private-equity-diligence/','/health/','/health/prostate/','/health/about/','/health/privacy/','/health/prostate/living-well/recovery-essentials/','/health/prostate/surgery-recovery/','/ballot/','/ballot/2026-results/','/privacy/'];
const widths=[{name:'desktop',width:1440,height:900},{name:'tablet',width:820,height:1180},{name:'mobile',width:390,height:844}];
const failures=[],observations=[],errors=[];
let checks=0,browser;
async function check(name,fn){try{await fn();checks++}catch(e){failures.push(name+': '+e.message)}}
try{
 browser=await chromium.launch({headless:true});
 for(const vp of widths){
  const context=await browser.newContext({viewport:{width:vp.width,height:vp.height}});
  await context.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(vp.name+': '+e.message));
  for(const route of routes){
   await check(vp.name+' '+route,async()=>{
    const response=await page.goto(base+route,{waitUntil:'networkidle'});
    assert.equal(response.status(),200);
    assert(await page.locator('h1').first().isVisible(),'visible h1');
    const meta=await page.evaluate(()=>({
     canonical:document.querySelector('link[rel="canonical"]')?.href,
     robots:document.querySelector('meta[name="robots"]')?.content,
     overflow:document.documentElement.scrollWidth-innerWidth,
     missingAlt:[...document.images].filter(x=>!x.hasAttribute('alt')).length,
     brokenImages:[...document.images].filter(x=>x.src.startsWith(location.origin)&&x.complete&&x.naturalWidth===0).map(x=>x.getAttribute('src')),
     links:[...document.querySelectorAll('a[href]')].map(x=>x.getAttribute('href'))
    }));
    assert.equal(meta.canonical,'https://behshad.com'+route,'canonical');
    // An omitted robots meta defaults to index/follow, as on both Ballot pages.
    const bridge=['/transformation/business-2-0/','/ma/pace-arris-integration/','/ma/private-equity-diligence/'].includes(route);
    if(!bridge)assert(!/noindex/i.test(meta.robots||''),'unexpected noindex');
    assert(meta.overflow<=2,'horizontal document overflow '+meta.overflow);
    assert.equal(meta.missingAlt,0,'image alt attributes');
    assert.equal(meta.brokenImages.length,0,'broken local images: '+meta.brokenImages);
    for(const href of meta.links){
     if(!href||/^(?:mailto:|tel:|javascript:)/.test(href))continue;
     const u=new URL(href,base+route);
     if(u.origin!==base)continue;
     const target=resolve(root,'.'+decodeURIComponent(u.pathname),u.pathname.endsWith('/')?'index.html':'');
     assert(existsSync(target),'missing internal target '+href);
    }
    observations.push({viewport:vp.name,route,...meta,links:undefined});
   });
  }
  await page.goto(base+'/ma/integration/',{waitUntil:'networkidle'});
  await check(vp.name+' M&A interactions',async()=>{
   assert.equal(await page.locator('nav[aria-label="Main navigation"] a').first().innerText(),'Home');
   assert(!/Private mockup/.test(await page.locator('footer').innerText()));
   for(const name of ['timeline','decision','capability','value']){
    const buttons=page.locator('[data-control="'+name+'"] button');
    for(let i=0;i<await buttons.count();i++){
     await buttons.nth(i).press('Enter');
     assert.equal(await buttons.nth(i).getAttribute('aria-pressed'),'true');
     assert((await page.locator('[data-render="'+name+'"]').innerText()).trim().length>20);
    }
   }
   const skip=page.locator('a.skip');await skip.press('Enter');assert.equal(new URL(page.url()).hash,'#main');
   const menu=page.locator('[data-menu]');
   if(await menu.isVisible()){await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');}
   await page.screenshot({path:resolve(out,'ma-'+vp.name+'.png'),fullPage:true});
  });
  await check(vp.name+' home fragments',async()=>{
   for(const fragment of ['home','about','experience','beyond','contact']){
    await page.goto(base+'/#'+fragment,{waitUntil:'networkidle'});
    assert(await page.locator('#'+fragment).isVisible(),'fragment '+fragment);
   }
  });
  await check(vp.name+' health transparency',async()=>{
   await page.goto(base+'/health/about/',{waitUntil:'networkidle'});
   assert(/Amazon Associate/i.test(await page.locator('main').innerText()));
   await page.goto(base+'/health/privacy/',{waitUntil:'networkidle'});
   assert(/affiliate links/i.test(await page.locator('main').innerText()));
   await page.goto(base+'/health/prostate/living-well/recovery-essentials/',{waitUntil:'networkidle'});
   assert(/As an Amazon Associate I earn from qualifying purchases/.test(await page.locator('main').innerText()));
   const links=await page.locator('a[rel~="sponsored"]').evaluateAll(nodes=>nodes.map(x=>({href:x.href,rel:x.rel})));
   assert.equal(links.length,15);
   for(const link of links)assert(/noopener/.test(link.rel)&&/noreferrer/.test(link.rel));
   await page.screenshot({path:resolve(out,'recovery-'+vp.name+'.png'),fullPage:true});
  });
  await check(vp.name+' Ballot navigation',async()=>{
   await page.goto(base+'/ballot/',{waitUntil:'networkidle'});
   const results=page.locator('a[href="/ballot/2026-results/#results"]');
   assert(await results.isVisible());
   await results.click();await page.waitForURL(base+'/ballot/2026-results/#results');
   assert(await page.locator('#results').isVisible());
   await page.goto(base+'/ballot/',{waitUntil:'networkidle'});
   await page.locator('#startBtn').click();
   assert(await page.locator('#workspace').isVisible());
   await page.screenshot({path:resolve(out,'ballot-'+vp.name+'.png'),fullPage:true});
  });
  await context.close();
 }
 await check('PDF delivery',async()=>{
  const res=await fetch(base+'/health/assets/Prostate_Surgery_Recovery_Compass_V2.6.pdf');
  assert.equal(res.status,200);assert.equal(res.headers.get('content-type'),'application/pdf');
  const bytes=Buffer.from(await res.arrayBuffer());assert.equal(bytes.subarray(0,5).toString(),'%PDF-');
 });
 assert.equal(errors.length,0,'uncaught browser errors: '+errors.join('; '));
}finally{
 if(browser)await browser.close();await new Promise(done=>server.close(done));
 writeFileSync(resolve(out,'results.json'),JSON.stringify({checks,failures,errors,observations},null,2));
 console.log(JSON.stringify({checks,failures,errors},null,2));
}
assert.equal(failures.length,0,'Branch QA failures');
