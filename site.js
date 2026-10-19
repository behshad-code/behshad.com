
(function(){
 'use strict';
 // Privacy-first site analytics: only fixed event names; never capture message text, contact data or personal details.
 const eventNames=new Set(['nav-home','nav-about','nav-experience','nav-beyond','nav-contact','hero-explore','hero-experience','focus-overview','focus-transformation','focus-ai','focus-ma','focus-risk','perspective-biz2','perspective-ai','perspective-team','perspective-ma','perspective-diligence','interest-travel','interest-diving','interest-aviation','interest-cooking','interest-learning','interest-nature','external-linkedin','external-ballot','experience-filter-all','experience-filter-ai','experience-filter-ma','experience-filter-security','experience-filter-transformation','view-home','view-about','view-experience','view-beyond','view-contact']);
 const isLive=location.hostname==='behshad.com' && (location.pathname==='/' || location.pathname==='/index.html');
 const code='behshad';
 if(isLive){let s=document.createElement('script');s.src='https://gc.zgo.at/count.js';s.async=true;s.dataset.goatcounter='https://'+code+'.goatcounter.com/count';s.addEventListener('load',()=>{const hash=location.hash.slice(1).split('/')[0];track('view-'+(['home','about','experience','beyond','contact'].includes(hash)?hash:'home'));});document.head.appendChild(s);}
 function track(n){if(!eventNames.has(n)||!isLive||!window.goatcounter||typeof window.goatcounter.count!=='function')return;window.goatcounter.count({path:'personal-'+n,title:'Behshad.com: '+n,event:true});}
 document.addEventListener('click',e=>{const b=e.target.closest('[data-event]');if(b)track(b.dataset.event);});
 const views=[...document.querySelectorAll('.view')],links=[...document.querySelectorAll('[data-page-link]')];
 const nav=document.querySelector('#main-nav'),menu=document.querySelector('#mobile-menu');
 function route(){let hash=(location.hash||'#home').slice(1).split('/')[0];if(!views.some(v=>v.id===hash))hash='home';views.forEach(v=>v.hidden=v.id!==hash);links.forEach(l=>{if(l.dataset.pageLink===hash)l.setAttribute('aria-current','page');else l.removeAttribute('aria-current');});menu.setAttribute('aria-expanded','false');nav.classList.remove('open');document.title=(hash==='home'?'Behshad Beheshti':hash==='beyond'?'Beyond Work':hash[0].toUpperCase()+hash.slice(1))+' | Technology Leadership';window.scrollTo({top:0,behavior:'instant'});if(window.goatcounter)track('view-'+hash);}
 window.addEventListener('hashchange',route);route();
 menu.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));});
 // Topics are descriptions, not fabricated published posts or promises.
 const topics={
 overview:['Focus areas','My work connects four themes: technology transformation, practical AI governance, M&A integration, and cybersecurity. Each matters most when it makes an organization stronger and creates measurable business value.'],
 transformation:['Enterprise transformation','Technology modernization works best when business processes, operating models, data, people, and platforms move together. The goal is not simply newer systems, but better business performance.'],
 ai:['AI governance & innovation','Responsible AI adoption means connecting a clear use case with data stewardship, security, human judgment, sustainable economics, and outcomes the business can measure.'],
 ma:['M&A integration','Technology diligence and integration create value when Day 1 readiness is followed by harmonized systems, accountable teams, risk reduction, and a realistic operating model.'],
 risk:['Cybersecurity & risk','Security is an enterprise leadership priority. Strong programs connect practical controls, resilience, monitoring, response planning, privacy, and governance to the organization’s risk appetite.'],
 teams:['Global technology teams','High-performing organizations are built across functions and borders through clear objectives, strong leadership, talent development, and disciplined execution. This includes engineering, enterprise applications, and offshore delivery capabilities.']};
 const interests={
 travel:['Travel & exploration','Travel gives me a chance to discover new cultures, landscapes, cuisines, and perspectives. The photographs shown are illustrative, not my private travel album.'],
 diving:['Scuba diving','I enjoy the discipline and wonder of exploring the underwater world. It is a different experience from the pace of everyday work.'],
 aviation:['Aviation','Recreational flying combines curiosity, preparation, technology, and a unique perspective on the world.'],
 cooking:['Cooking','Experimenting with recipes and cuisines is a creative way to learn and connect with others.'],
 reading:['Learning','I am drawn to technology, history, society, and the questions that challenge how we think about the future.'],
 nature:['Nature & the outdoors','Time outdoors offers perspective, quiet, and the chance to reset.']};
 const modal=document.querySelector('#info-modal'),mTitle=document.querySelector('#modal-title'),mBody=document.querySelector('#modal-body'),mClose=document.querySelector('#modal-close'),mAction=document.querySelector('#modal-action');let lastFocus=null;
 function openModal(item){lastFocus=document.activeElement;mTitle.textContent=item[0];mBody.textContent=item[1];modal.hidden=false;document.body.style.overflow='hidden';mClose.focus();}
 function closeModal(){modal.hidden=true;document.body.style.overflow='';if(lastFocus?.focus)lastFocus.focus();}
 document.querySelectorAll('[data-focus]').forEach(b=>b.addEventListener('click',()=>openModal(topics[b.dataset.focus])));
 document.querySelectorAll('[data-interest]').forEach(b=>b.addEventListener('click',()=>openModal(interests[b.dataset.interest])));
 mClose.addEventListener('click',closeModal);mAction.addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal();});
 document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{const tag=b.dataset.filter;document.querySelectorAll('.filter-btn').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('.company-card').forEach(c=>{c.hidden=tag!=='all'&&!c.dataset.tags.split(' ').includes(tag);});track('experience-filter-'+tag); }));
})();

