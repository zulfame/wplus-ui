import {launch,close,open,out,mods,wp,sleep,base,VP} from './lib.mjs';
import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--no-sandbox']});
for(const vp of ['desktop','mobile']){
  const p=await b.newPage();await p.setViewport(VP[vp]);await p.setJavaScriptEnabled(false);
  await p.goto(base+'/',{waitUntil:'networkidle0'});
  const nav=await p.evaluate(()=>{const n=document.querySelector('#blog-pager');const r=n.getBoundingClientRect();return {links:[...n.children].map(c=>c.getAttribute('data-text')||c.className.slice(0,10)),visible:r.width>0&&r.height>0,oldestHref:n.querySelector('.olLnk')?.getAttribute('href').replace(/^.*127.0.0.1:8091/,'')}});
  await p.goto(base+'/?paged=2',{waitUntil:'networkidle0'});
  const p2=await p.evaluate(()=>({cards:document.querySelectorAll('#Blog01 > .blogP > article').length,newest:document.querySelector('#blog-pager .nwLnk')?.getAttribute('href')?.replace(/^.*127.0.0.1:8091/,''),hasSections:document.querySelectorAll('.aCat').length}));
  out('B03-no-js',vp,{page1:nav,page2:p2});await p.close();
}
await b.close();
