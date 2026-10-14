import {launch,close,open,out,mods,wp,sleep,base,VP} from './lib.mjs';
import puppeteer from 'puppeteer-core';
await launch();
const PUB='pub-1234567890123456';
const slots=(p)=>p.evaluate(()=>[...document.querySelectorAll('.widget.LinkList .adB, #sec_Under_Header .adB')].map(a=>{const ins=a.querySelector('ins.adsbygoogle');const img=a.querySelector('img');const lnk=a.querySelector('a');const r=a.getBoundingClientRect();return {id:a.parentElement.id,live:a.classList.contains('is-live'),ins:ins?{client:ins.dataset.adClient,slot:ins.dataset.adSlot,format:ins.dataset.adFormat,w:Math.round(ins.getBoundingClientRect().width)}:null,img:img?{src:img.src.split('/').pop(),lazy:img.loading,w:Math.round(img.getBoundingClientRect().width)}:null,link:lnk?{href:lnk.getAttribute('href'),rel:lnk.rel,target:lnk.target}:null,boxW:Math.round(r.width),text:a.dataset.text||null}}));
// capture requests to googlesyndication (no internet needed: they are aborted)
for(const vp of ['desktop','mobile']){
  // 1) publisher id only: loader requested lazily
  mods({wplusui_adsense_id:PUB});
  let p=await open('/',vp,{wait:300});
  const reqs=[];await p.setRequestInterception(true);p.on('request',r=>{if(/googlesyndication/.test(r.url())){reqs.push(r.url());r.abort().catch(()=>{});}else r.continue().catch(()=>{});});
  await p.reload({waitUntil:'domcontentloaded'});await sleep(1200);const beforeScroll=reqs.length;
  await p.evaluate(()=>window.scrollBy(0,40));await sleep(1200);
  out('ADS-loader-lazy',vp,{beforeInteraction:beforeScroll,afterScroll:reqs.length,url:reqs[0]?.replace(/^https:\/\/pagead2.googlesyndication.com/,'')});await p.close();
  mods({wplusui_adsense_lazy:false});
  p=await open('/',vp,{wait:200});const r2=[];await p.setRequestInterception(true);p.on('request',r=>{if(/googlesyndication/.test(r.url())){r2.push(r.url());r.abort().catch(()=>{});}else r.continue().catch(()=>{});});await p.reload({waitUntil:'domcontentloaded'});await sleep(800);
  out('ADS-loader-immediate',vp,{requests:r2.length,tag:await p.evaluate(()=>document.querySelector('script[src*=adsbygoogle]')?.outerHTML.slice(0,160))});await p.close();
  mods({wplusui_adsense_lazy:null});
  // 2) numeric unit in slots, image, linked image, raw html
  mods({wplusui_ad_under_header:'1111111111',wplusui_ad_above_pinned:base+'/wp-content/themes/wplus-ui/assets/images/misty-grape-cluster.jpg',wplusui_ad_below_posts:base+'/wp-content/themes/wplus-ui/assets/images/frosty-pine-cones.jpg\nhttps://example.com/promo',wplusui_ad_sidebar_sticky:'<div class="mine">Custom <b>HTML</b></div>'});
  p=await open('/',vp,{wait:300});await p.evaluate(()=>window.scrollBy(0,40));await sleep(500);out('ADS-slots',vp,await slots(p));await p.close();
  // 3) numeric unit but no publisher id -> nothing
  mods({wplusui_adsense_id:null});p=await open('/',vp,{wait:300});out('ADS-numeric-without-id',vp,{underHeaderSlotPresent:await p.evaluate(()=>!!document.querySelector('#LinkList81'))});await p.close();
  mods({wplusui_adsense_id:PUB,wplusui_ad_under_header:null,wplusui_ad_above_pinned:null,wplusui_ad_below_posts:null,wplusui_ad_sidebar_sticky:null});
  // 4) full AdSense code pasted in a slot: loader not printed twice
  mods({wplusui_ad_under_header:'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456" crossorigin="anonymous"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1234567890123456" data-ad-slot="2222222222"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script>'});
  p=await open('/',vp,{wait:300});out('ADS-pasted-code',vp,await p.evaluate(()=>({loaders:document.querySelectorAll('script[src*="adsbygoogle.js"]').length,inlineLazyLoader:[...document.scripts].filter(s=>!s.src&&/googlesyndication/.test(s.textContent)).length,ins:document.querySelectorAll('.adB ins.adsbygoogle').length})));await p.close();
  mods({wplusui_ad_under_header:null});
  // 5) in-article unit
  mods({wplusui_ad_in_article:'3333333333',wplusui_ad_in_article_after:2});
  p=await open('/?p=27',vp,{wait:300});out('ADS-in-article',vp,await p.evaluate(()=>{const ins=document.querySelector('.pS ins.adsbygoogle');const par=ins?[...ins.closest('.adB').parentElement.children]:[];const idx=ins?par.indexOf(ins.closest('.adB')):-1;return {present:!!ins,slot:ins?.dataset.adSlot,afterParagraph:idx>0&&par.slice(0,idx).filter(e=>e.tagName==='P').length}}));await p.close();
  mods({wplusui_ad_in_article:null,wplusui_ad_in_article_after:null,wplusui_adsense_id:null});
  // 6) invalid publisher id is ignored
  mods({wplusui_adsense_id:'<script>alert(1)</script>'});p=await open('/',vp,{wait:300});out('ADS-invalid-id',vp,await p.evaluate(()=>({loader:document.documentElement.innerHTML.includes('googlesyndication'),xss:document.documentElement.innerHTML.includes('<script>alert(1)')})));await p.close();mods({wplusui_adsense_id:null});
}
await close();
