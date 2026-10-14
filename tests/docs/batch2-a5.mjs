import {launch,close,open,out,mods,wp,sleep,base} from './lib.mjs';
await launch();
const bar=(p)=>p.evaluate(()=>{const e=document.querySelector('.ntfC');if(!e)return {bar:false};const cta=e.querySelector('.ntfA > a');const r=e.getBoundingClientRect();return {bar:true,visible:getComputedStyle(e).display!=='none'&&r.height>0,h:Math.round(r.height),text:e.querySelector('.ntfA > span').textContent.trim().slice(0,30),cta:cta?cta.textContent.trim()+' -> '+cta.getAttribute('href'):null}});
for(const vp of ['desktop','mobile']){
  // A09 notification bar
  mods({wplusui_notification_text:'Sale today!',wplusui_notification_cta_text:null,wplusui_notification_cta_url:null});
  let p=await open('/',vp); out('A09-text-only',vp,await bar(p)); await p.close();
  mods({wplusui_notification_cta_text:'Buy',wplusui_notification_cta_url:null});
  p=await open('/',vp); out('A09-label-without-url',vp,await bar(p)); await p.close();
  mods({wplusui_notification_cta_text:'Buy',wplusui_notification_cta_url:'https://example.com/buy'});
  p=await open('/',vp); const a=await bar(p);
  await p.evaluate(()=>document.querySelector('.ntfC label.c').click());await sleep(800);const closed=await p.evaluate(()=>({checked:document.getElementById('forNotification').checked,h:Math.round(document.querySelector('.ntfC').getBoundingClientRect().height)}));
  await p.reload({waitUntil:'networkidle0'});await p.mouse.move(30,30);await sleep(1200);const after=await p.evaluate(()=>({checked:document.getElementById('forNotification').checked,h:Math.round(document.querySelector('.ntfC').getBoundingClientRect().height)}));
  out('A09-full+dismiss',vp,{shown:a,afterClose:closed,afterReload:after});await p.close();
  mods({wplusui_notification_text:'',wplusui_notification_cta_text:null,wplusui_notification_cta_url:null});
  p=await open('/',vp); out('A09-empty',vp,await bar(p)); await p.close();
  mods({wplusui_notification_text:null});
}
await close();
