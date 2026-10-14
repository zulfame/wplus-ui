import {launch,close,open,out,mods,sleep} from './lib.mjs';
await launch();
const cs=(p)=>p.evaluate(()=>{const r=getComputedStyle(document.documentElement);return {cls:document.documentElement.className.split(' ').filter(c=>/^cs\d+$|drK|lgT/.test(c)).join(' '),linkB:r.getPropertyValue('--linkB').trim(),linkC:r.getPropertyValue('--linkC').trim()}});
for(const vp of ['desktop','mobile']){
  // A02: default scheme and visitor choice
  for(const n of [0,5,15]){ mods({wplusui_default_scheme:n}); const p=await open('/',vp); out('A02-default',vp,{setting:n,...await cs(p)}); await p.close(); }
  mods({wplusui_default_scheme:0});
  const p=await open('/',vp);
  const nb=await p.evaluate(()=>document.querySelectorAll('.thmP button').length);
  await p.evaluate(()=>{document.getElementById('forAppearance').checked=true;document.getElementById('forTheme').checked=true;document.querySelector('.csB7').click()});await sleep(700);
  const a=await cs(p); await p.reload({waitUntil:'networkidle0'});await p.mouse.move(30,30);await sleep(1200);const b=await cs(p);
  out('A02-visitor',vp,{schemeButtons:nb,afterPick7:a,afterReload:b});await p.close();
  // A03: accent colors
  mods({wplusui_accent_light:'#e91e63',wplusui_accent_dark:'#ff9800'});
  let q=await open('/',vp,{scheme:'light'}); out('A03-light',vp,await cs(q)); 
  const btn=await q.evaluate(()=>{const e=document.querySelector('.button');return e?getComputedStyle(e).backgroundColor:null});out('A03-button',vp,{bg:btn});await q.close();
  mods({wplusui_default_mode:'dark'}); q=await open('/',vp,{scheme:'light'}); out('A03-dark',vp,await cs(q)); await q.close();
  mods({wplusui_default_mode:null});
  // visitor scheme beats accent
  mods({wplusui_default_scheme:0}); q=await open('/',vp); await q.evaluate(()=>{document.querySelector('.csB7').click()});await sleep(600);out('A03-visitor-scheme-wins',vp,await cs(q));await q.close();
  mods({wplusui_accent_light:null,wplusui_accent_dark:null});
  // A04: radius
  for(const r of [0,20,'']){ mods({wplusui_button_radius:r===''?null:r}); const p4=await open('/?page_id=44',vp); out('A04',vp,await p4.evaluate((r)=>({setting:r,linkR:getComputedStyle(document.documentElement).getPropertyValue('--linkR').trim(),buttonRadius:(()=>{const b=document.querySelector('a.button');return b?getComputedStyle(b).borderRadius:null})()}),r)); await p4.close(); }
  mods({wplusui_button_radius:null});
  // A05: fonts
  mods({wplusui_font_body:'Lora',wplusui_font_heading:'Merriweather'});
  const p5=await open('/?p=27',vp);
  out('A05',vp,await p5.evaluate(()=>({gfLinks:[...document.querySelectorAll('link[href*="fonts.googleapis"]')].map(l=>decodeURIComponent(l.href).slice(0,110)),bodyFont:getComputedStyle(document.body).fontFamily.slice(0,40),h1Font:getComputedStyle(document.querySelector('h1')).fontFamily.slice(0,40)})));await p5.close();
  mods({wplusui_font_body:'Bad<script>',wplusui_font_heading:null});
  const p6=await open('/',vp);out('A05-invalid',vp,await p6.evaluate(()=>({gfLinks:document.querySelectorAll('link[href*="fonts.googleapis"]').length,html:document.head.innerHTML.includes('Bad<script>')})));await p6.close();
  mods({wplusui_font_body:null,wplusui_font_heading:null});
}
await close();
