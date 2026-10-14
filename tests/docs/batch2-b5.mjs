import {launch,close,open,out,mods,wp,sleep,base} from './lib.mjs';
await launch();
const secs=(p)=>p.evaluate(()=>[...document.querySelectorAll('.aCat')].map(a=>({title:a.querySelector('.title').textContent.trim(),cards:a.querySelectorAll('article').length,viewAll:a.querySelector('.blogT a')?.getAttribute('href')?.replace(/^.*127.0.0.1:8091/,'')})));
const grid=(p)=>p.evaluate(()=>({gridCats:[...new Set([...document.querySelectorAll('#Blog01 > .blogP > article .pLbls a, #Blog01 .blogP.oGrd:not(.aCat .blogP) > article .pLbls a')].map(a=>a.dataset.text))],gridCards:document.querySelectorAll('#Blog01 > .blogP > article').length}));
const cats=wp('echo json_encode(array_map(function($c){return [$c->term_id,$c->slug,$c->count];},get_categories(["hide_empty"=>false])));').trim();
console.log('categories [id,slug,count]:',cats);
for(const vp of ['desktop','mobile']){
  // B04 sections
  for(const v of ['documentation,product','documentation, plugin ,nope','',null]){ mods({wplusui_home_categories:v}); const p=await open('/',vp); out('B04',vp,{setting:v,sections:await secs(p)}); await p.close(); }
  mods({wplusui_home_categories:null});
  let p=await open('/?paged=2',vp); out('B04-not-on-page-2',vp,{sections:await secs(p)}); await p.close();
  // B05 exclude categories from the Latest grid
  for(const v of ['documentation','2','documentation,troubleshoot']){ mods({wplusui_home_exclude_cats:v}); p=await open('/',vp); out('B05',vp,{setting:v,...await grid(p),sectionsStillShown:(await secs(p)).map(s=>s.title)}); await p.close(); }
  mods({wplusui_home_exclude_cats:null});
}
await close();
