import {launch,close,open,out,mods,wp,sleep} from './lib.mjs';
await launch();
const btn=(p)=>p.evaluate(()=>{const a=document.createElement('a');a.className='button';a.textContent='x';a.href='#';document.querySelector('.pS, .blogP, main').appendChild(a);const c=getComputedStyle(a);const r={bg:c.backgroundColor,radius:c.borderRadius};a.remove();return r});
for(const vp of ['desktop','mobile']){
  // A03/A04 on a real .button
  mods({wplusui_accent_light:'#e91e63',wplusui_button_radius:20});
  let p=await open('/?page_id=44',vp); out('A03/A04-button',vp,await btn(p)); await p.close();
  mods({wplusui_accent_light:null,wplusui_button_radius:null});
  p=await open('/?page_id=44',vp); out('A03/A04-default-button',vp,await btn(p)); await p.close();
}
await close();
