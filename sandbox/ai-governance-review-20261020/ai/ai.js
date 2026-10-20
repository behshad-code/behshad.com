/* AI field guide: progressive enhancement, optional analytics, no third-party dependencies. */
(() => {
  'use strict';
  const menu=document.querySelector('#mobile-menu');
  const nav=document.querySelector('#main-nav');
  if (menu && nav) {
    menu.addEventListener('click',() => {
      const open=menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded',String(open));
      nav.classList.toggle('open',open);
    });
    nav.addEventListener('click',e => {
      if (e.target.closest('a')) {
        menu.setAttribute('aria-expanded','false');
        nav.classList.remove('open');
      }
    });
  }

  // No tracking fires on the separate preview host or local files.
  // Production article views are counted by GoatCounter on /ai/.
  const live=location.hostname==='behshad.com' && /^\/ai\/?(?:index\.html)?$/.test(location.pathname);
  if(!live)return;

  const fixedEvents=new Set(['ai-start-reading','ai-chapter-open','ai-sources-open','ai-return-home']);
  function count(name){
    if(!fixedEvents.has(name))return;
    if(window.goatcounter && typeof window.goatcounter.count==='function'){
      window.goatcounter.count({path:'personal-'+name,title:'AI field guide: '+name,event:true});
    }
  }
  const script=document.createElement('script');
  script.src='https://gc.zgo.at/count.js';
  script.async=true;
  script.dataset.goatcounter='https://behshad.goatcounter.com/count';
  document.head.appendChild(script);

  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');
    if(!a)return;
    if(a.matches('.ai-hero-cta')) count('ai-start-reading');
    else if(a.closest('.ai-toc')) count('ai-chapter-open');
    else if(a.closest('.ai-references')) count('ai-sources-open');
    else if(a.matches('.ai-return')) count('ai-return-home');
  });
})();