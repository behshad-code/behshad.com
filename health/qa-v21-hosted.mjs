// First-party hosted v2.1 preview validation; uses real Chromium, never a local mockup.
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const root='https://behshad.com/sandbox/mhc-v21-review/';
const routes=['','health/','health/prostate/','health/prostate/basics/','health/prostate/screening/','health/prostate/diagnosis/','health/prostate/treatments/','health/prostate/living-well/','health/prostate/research/','health/prostate/rising-psa/','health/prostate/tests-explained/','health/prostate/active-surveillance/','health/prostate/treatment-decisions/','health/prostate/recovery-follow-up/','health/prostate/insurance-access/','health/prostate/treatments/robotic-surgery/operation/','health/prostate/treatments/robotic-surgery/surgeon-questions/','health/prostate/resources/glossary/','health/prostate/resources/sources/','health/prostate/resources/questions/'];
const viewports=[{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
let checks=0;const errors=[];
try{
 for(const vp of viewports){
  const page=await browser.newPage({viewport:{width:vp.width,height:vp.height}});
  page.on('pageerror',e=>errors.push(vp.name+' JS error: '+e.message));
  page.on('response',r=>{if(r.url().startsWith(root)&&r.status()>=400)errors.push(r.status()+' '+r.url())});
  for(const route of routes){
   const response=await page.goto(root+route,{waitUntil:'load',timeout:35000});
   assert.equal(response?.status(),200,route+' HTTP '+response?.status());
   assert.equal(await page.locator('main h1').count(),1,'Wrong main heading '+route);
   const check=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,missingAlt:[...document.images].filter(i=>!i.hasAttribute('alt')).length,broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src)}));
   assert(check.overflow<=2,'Horizontal overflow: '+route+' '+vp.name+' '+check.overflow);
   assert.equal(check.missingAlt,0,'Missing alt: '+route);
   assert.equal(check.broken.length,0,'Broken images: '+route+' '+check.broken.join(', '));
   checks++;
  }
  await page.goto(root+'health/prostate/',{waitUntil:'load'});
  assert.equal(await page.locator('a.v21-topic-card').count(),6,'Six primary categories');
  assert.equal(await page.locator('a.guide-library-card').count(),0,'Competing guide grid');
  await page.locator('a.v21-topic-card').first().click();
  assert(page.url().endsWith('/health/prostate/basics/'),'Category click navigation');
  await page.goto(root+'health/prostate/treatments/',{waitUntil:'load'});
  assert.equal(await page.locator('section#treatment-at-a-glance').count(),1,'Treatment comparison');
  await page.goto(root+'health/prostate/resources/questions/',{waitUntil:'load'});
  await page.locator('[data-question-choice]').first().check();
  assert((await page.locator('[data-question-count]').textContent()).includes('1 selected'),'Question builder');
  checks+=4;await page.close();
 }
 assert.deepEqual(errors,[],'Browser errors: '+errors.join('; '));
 console.log('Hosted first-party v2.1 preview PASS: '+checks+' checks over '+routes.length+' routes and two viewports');
}finally{await browser.close()}
