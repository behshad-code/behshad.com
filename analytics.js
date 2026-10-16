/* Privacy-first metrics on behshad.com and /ballot/. No cookies or hidden identity tracking by this application. */
(function(){
  'use strict';
  const allowed=new Set(['ballot-start','how-it-works-open','local-preview-open','reference-sheet-open','reference-sheet-print','priorities-dialog-open','research-tab-open','ballot-navigation','landing-feature-open','local-preview-selected','local-directory-search-used','homepage-linkedin-open','county-election-office-open','official-research-source-open','external-research-source-open','share-button-open','share-sheet-completed','share-link-copied']);
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


/* Aggregate engagement events. Names are fixed categories, never voter choices,
   search strings, external URLs, visitor identifiers, or other personal data. */
(function(){
  'use strict';
  const isBallot = /^\/ballot\/?(?:index\.html)?$/.test(location.pathname);
  const track = name => { if (window.BCAnalytics && window.BCAnalytics.track) window.BCAnalytics.track(name); };
  const shareURL = 'https://behshad.com/ballot/?utm_campaign=ballot_shared&utm_source=visitor_share';

  function init(){
    document.addEventListener('click', e => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (isBallot && target.closest('#v25CityGrid .v25-city-inapp')) {
        track('local-preview-selected');
      }
      const a = target.closest('a[href]');
      if (!a) return;
      let url;
      try { url = new URL(a.href, location.href); } catch (_) { return; }
      if (!/^https?:$/.test(url.protocol) || url.origin === location.origin) return;
      if (!isBallot) {
        if (url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com')) track('homepage-linkedin-open');
      } else if (a.closest('#v25CityGrid .v25-city-verify')) {
        track('county-election-office-open');
      } else if (url.hostname.endsWith('.gov') || url.hostname.endsWith('.ca.gov')) {
        track('official-research-source-open');
      } else {
        track('external-research-source-open');
      }
    }, {capture:true});

    if (!isBallot) return;
    const input = document.getElementById('cityFilter');
    if (input) {
      let counted = false;
      input.addEventListener('input', () => {
        if (!counted && input.value.trim().length >= 2) {
          counted = true;
          track('local-directory-search-used');
        }
      });
    }

    // Add a small share action to the ballot workspace only; never touch the welcome hero.
    const tools = document.querySelector('#workspace .appbar-tools');
    if (!tools || document.getElementById('bcShareBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'bcShareBtn';
    btn.type = 'button';
    btn.className = 'btn ghost slim';
    btn.textContent = 'Share ↗';
    btn.title = 'Share Ballot Compass with a friend';
    btn.style.whiteSpace = 'nowrap';
    const mobile = document.getElementById('mobileSwitch');
    const mq = typeof window.matchMedia === 'function' ? window.matchMedia('(max-width: 700px)') : null;
    function positionShare(){
      if (mobile && mq && mq.matches) {
        btn.className = 'share-mobile';
        btn.textContent = 'Share';
        mobile.appendChild(btn);
      } else {
        btn.className = 'btn ghost slim';
        btn.textContent = 'Share ↗';
        tools.appendChild(btn);
      }
    }
    positionShare();
    if (mq && mq.addEventListener) mq.addEventListener('change', positionShare);

    btn.addEventListener('click', async () => {
      track('share-button-open');
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({title: 'Behshad’s Ballot Compass', url: shareURL});
          track('share-sheet-completed');
          return;
        } catch (err) {
          if (err && err.name === 'AbortError') return;
        }
      }
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(shareURL);
        track('share-link-copied');
        btn.textContent = mq && mq.matches ? 'Copied' : 'Link copied ✓';
        setTimeout(positionShare, 2200);
      } catch (_) {
        // Manual fallback isn't a confirmed copy, so no copied event is recorded.
        window.prompt('Copy this link to share Ballot Compass:', shareURL);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
