import {launch,close,open,out,mods,wp,sleep,base} from './lib.mjs';
await launch();
const grid=(p)=>p.evaluate(()=>{const g=document.querySelector('#Blog01 .blogP');const cs=[...g.querySelectorAll(':scope > article')];const lefts=[...new Set(cs.map(c=>Math.round(c.getBoundingClientRect().left)))].length;const pg=document.querySelector('#Blog01 .blogN, .blogPg, .pagination, nav.pager');return {cards:cs.length,columns:lefts,title:document.querySelector('#Blog01 .blogT .title')?.textContent.trim(),pager:pg?[...pg.querySelectorAll('a,span')].map(a=>a.textContent.trim()||a.getAttribute('aria-label')).filter(Boolean).slice(0,6):null,pagerCls:pg?pg.className:null}});
for(const vp of ['desktop','mobile']){
  let p=await open('/',vp); out('B03-home',vp,await grid(p)); await p.close();
  p=await open('/?paged=2',vp); out('B03-page2',vp,await grid(p)); await p.close();
  wp('update_option("posts_per_page",3);'); p=await open('/',vp); out('B03-3-per-page',vp,await grid(p)); await p.close(); wp('update_option("posts_per_page",6);');
  p=await open('/?paged=99',vp); out('B03-page99',vp,{status:await p.evaluate(()=>document.title.slice(0,25)),body:await p.evaluate(()=>document.body.className.match(/on404|onId|onHm/g))}); await p.close();
}
await close();
