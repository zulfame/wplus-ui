import {launch,close,open,out,mods,wp,sleep,base} from './lib.mjs';
await launch();
for(const vp of ['desktop','mobile']){
  // A06 box design
  for(const on of [false,true]){ mods({wplusui_box_design:on?true:null}); const p=await open('/?cat=2',vp); out('A06',vp,await p.evaluate((on)=>{const a=document.querySelector('.blogP article.ntry');const c=getComputedStyle(a);return {setting:on,body:document.body.className.match(/\bb[XD]\b/)[0],cardBorder:c.borderTopWidth,cardRadius:c.borderTopLeftRadius,overflowX:document.documentElement.scrollWidth>innerWidth}},on)); await p.close(); }
  mods({wplusui_box_design:null});
  // A07 left menu default
  for(const m of ['collapsed','expanded']){ mods({wplusui_menu_default:m}); const p=await open('/',vp); const w=()=>p.evaluate(()=>({left:Math.round(document.querySelector('.mainL').getBoundingClientRect().width),leftX:Math.round(document.querySelector('.mainL').getBoundingClientRect().left),root:document.getElementById('root').className,drawerChecked:document.querySelector('.navI').checked}));
    const a=await w(); await p.evaluate(()=>document.querySelector('label.tNav').click()); await sleep(900); const b=await w(); out('A07',vp,{setting:m,initial:a,afterToggle:b}); await p.close(); }
  mods({wplusui_menu_default:null});
  // A08 mobile bar
  for(const on of [false,true]){ mods({wplusui_mobile_bar_show:on?true:null}); const p=await open('/?p=27',vp); out('A08',vp,await p.evaluate((on)=>{const e=document.querySelector('.mobM');return {setting:on,present:!!e,display:e?getComputedStyle(e).display:null,items:e?[...e.querySelectorAll('li')].map(l=>l.firstElementChild.getAttribute('data-text')):[],bottomGap:e&&getComputedStyle(e).display!=='none'?Math.round(innerHeight-e.getBoundingClientRect().bottom):null}},on)); await p.close(); }
  mods({wplusui_mobile_bar_show:null});
}
await close();
