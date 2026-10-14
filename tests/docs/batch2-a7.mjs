import {launch,close,open,out,mods,sleep} from './lib.mjs';
await launch();
for(const vp of ['desktop','mobile']){
  const got={};
  for(const h of [2,8,14,18,20,23]){ const p=await open('/?p=27',vp,{hour:h}); got[h]=await p.evaluate(()=>{const e=document.getElementById('postGreeting');const b=e&&getComputedStyle(e);return {text:e?e.getAttribute('data-text'):null,visible:e?b.display!=='none'&&e.getBoundingClientRect().width>0:false}}); await p.close(); }
  out('A11',vp,got);
  // A12 search
  let p=await open('/',vp);
  const hasInput=await p.evaluate(()=>({input:!!document.getElementById('forSearch'),min:document.getElementById('forSearch').minLength,visibleIcon:(()=>{const l=document.querySelector('label.tSrch');return l&&getComputedStyle(l).display!=='none'&&l.getBoundingClientRect().width>0})(),visibleBox:(()=>{const e=document.querySelector('.srchF');const r=e.getBoundingClientRect();return r.width>0&&getComputedStyle(e).visibility!=='hidden'})()}));
  if(vp==='mobile') await p.evaluate(()=>document.querySelector('label.tSrch').click());
  await p.focus('#forSearch');await p.keyboard.type('ge');await p.keyboard.press('Enter');await sleep(800);const short=p.url();
  await p.keyboard.type('tting');await p.keyboard.press('Enter');await p.waitForNavigation({waitUntil:'networkidle0'}).catch(()=>{});await sleep(1200);
  out('A12',vp,{...hasInput,urlAfterTwoLetters:short.replace(/^.*127.0.0.1:8091/,''),finalUrl:p.url().replace(/^.*127.0.0.1:8091/,''),...await p.evaluate(()=>({title:document.querySelector('.blogT .t.srch')?.textContent.trim().slice(0,45),cards:document.querySelectorAll('.blogP article').length,overflow:document.documentElement.scrollWidth>innerWidth}))});
  await p.close();
}
await close();
