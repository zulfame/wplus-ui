import {launch,close,open,out,mods,sleep} from './lib.mjs';
await launch();
const state=(p)=>p.evaluate(()=>({cls:document.documentElement.className,bg:getComputedStyle(document.body).backgroundColor,stored:localStorage.getItem('WPLUS_UI_STORAGE')&&JSON.parse(localStorage.getItem('WPLUS_UI_STORAGE')).ui}));
// A01: default mode, no visitor choice
for(const vp of ['desktop','mobile']){
  for(const [mode,scheme] of [['light','light'],['dark','light'],['system','dark'],['system','light']]){
    mods({wplusui_default_mode:mode});
    const p=await open('/',vp,{scheme});
    out('A01',vp,{setting:mode,osScheme:scheme,...await state(p)});
    await p.close();
  }
}
// visitor choice wins and persists across reload (desktop and mobile)
mods({wplusui_default_mode:'light'});
for(const vp of ['desktop','mobile']){
  const p=await open('/',vp);
  await p.evaluate(()=>{document.querySelector('.drkB').click()});await sleep(600);
  const a=await state(p);
  await p.reload({waitUntil:'networkidle0'});await p.mouse.move(30,30);await sleep(1200);
  const b=await state(p);
  await p.evaluate(()=>{document.querySelector('.sysB').click()});await sleep(500);
  const c=await state(p);
  out('A01-visitor',vp,{afterDarkClick:a,afterReload:b,afterSystemClick:c});
  await p.close();
}
mods({wplusui_default_mode:null});
await close();
