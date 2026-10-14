import {launch,close,open,out,mods,wp,sleep,base} from './lib.mjs';
await launch();
const car=(p)=>p.evaluate(()=>{const w=document.querySelector('.sldW');if(!w)return {carousel:false};const r=w.getBoundingClientRect();const slides=[...w.querySelectorAll('.sldA')];return {carousel:true,box:[Math.round(r.width),Math.round(r.height)],slides:slides.length,titles:slides.map(s=>(s.querySelector('.sldT')||{}).dataset?.title||'-').map(t=>t.slice(0,22)),links:slides.map(s=>(s.querySelector('.sldL')||{}).getAttribute?.('href')?.replace(/^.*127.0.0.1:8091/,'')||'-'),imgs:slides.map(s=>(s.querySelector('img')?.src||'').split('/').pop().slice(0,24)||'(placeholder)'),auto:w.dataset.autoAdvanceAfter,checkedIdx:[...w.querySelectorAll('input[name=iRcarousel]')].findIndex(i=>i.checked)}});
for(const vp of ['desktop','mobile']){
  // default: featured / latest posts
  let p=await open('/',vp); const a=await car(p); await sleep(5600); const b=await p.evaluate(()=>[...document.querySelectorAll('.sldW input[name=iRcarousel]')].findIndex(i=>i.checked)); out('B01-default',vp,{...a,checkedAfter5s:b}); await p.close();
}
await close();
