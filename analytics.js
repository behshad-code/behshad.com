/* Privacy-first metrics on behshad.com and /ballot/. No cookies or hidden identity tracking by this application. */
(function(){
  'use strict';
  const allowed=new Set(['ballot-start','how-it-works-open','local-preview-open','reference-sheet-open','reference-sheet-print','priorities-dialog-open','research-tab-open','ballot-navigation','landing-feature-open']);
  const code=(window.BC_ANALYTICS_GOATCOUNTER_CODE||'').trim(), backlog=[];
  window.BCAnalytics={enabled:/^[a-z0-9-]{2,70}$/i.test(code),track:function(name){
    if(!this.enabled||!allowed.has(name))return;
    if(window.goatcounter && typeof window.goatcounter.count==='function'){
      window.goatcounter.count({path:'interaction-'+name,title:'Ballot Compass: '+name,event:true});
    }else if(backlog.length<30)backlog.push(name);
  }};
  if(!window.BCAnalytics.enabled)return;
  const script=document.createElement('script');
  script.src='https://gc.zgo.at/count.js';script.async=true;
  script.dataset.goatcounter='https://'+code+'.goatcounter.com/count';
  script.onload=function(){
    while(backlog.length&&window.goatcounter?.count){
      const name=backlog.shift();
      window.goatcounter.count({path:'interaction-'+name,title:'Ballot Compass: '+name,event:true});
    }
  };
  document.head.appendChild(script);
})();
