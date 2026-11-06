// Network-aware public-reference URL audit for v2.1 publication.
// A link responding 401/403/429 or timing out is NOT considered medically verified.
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const sources=JSON.parse(readFileSync(resolve(root,'health/prostate/data/v2-sources.json'),'utf8'));
const results=[];let idx=0;
const concurrency=6;
async function worker(){
 while(idx<sources.length){
  const s=sources[idx++];
  let status=0,finalUrl=s.url,outcome='',detail='';
  try{
   // GET is more reliable than HEAD for academic publishing sites.
   const r=await fetch(s.url,{method:'GET',redirect:'follow',signal:AbortSignal.timeout(13000),headers:{'user-agent':'Mozilla/5.0 (compatible; MensHealthCompassSourceReview/2.1; educational link checker)'}});
   status=r.status;finalUrl=r.url;
   await r.body?.cancel?.();
   outcome=[404,410].includes(status)?'broken':status>=200&&status<400?'accessible':['restricted','unconfirmed'][Number(!(status===401||status===403||status===429))];
   if(status>=500)outcome='server-error';
  }catch(e){outcome='unconfirmed';detail=String(e.message||e).slice(0,250)}
  results.push({id:s.id,title:s.title,url:s.url,final_url:finalUrl,status,outcome,detail});
 }
}
await Promise.all(Array.from({length:concurrency},worker));
results.sort((a,b)=>a.id.localeCompare(b.id));
const counts=results.reduce((o,x)=>(o[x.outcome]=(o[x.outcome]||0)+1,o),{});
const out=resolve(root,'health/qa-screenshots/source-links.json');
mkdirSync(dirname(out),{recursive:true});
writeFileSync(out,JSON.stringify({checked_at:new Date().toISOString(),count:sources.length,counts,results,qualification:'HTTP status does not verify a scientific claim; restricted and unconfirmed sources require manual review.'},null,2)+'\n');
console.log('External links checked:',sources.length,JSON.stringify(counts));
for(const x of results)if(x.outcome!=='accessible')console.warn(x.id,x.status,x.outcome,x.url);
if((counts.broken||0)>0){console.error('Known broken primary source links require correction.');process.exitCode=1}
