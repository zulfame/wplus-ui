import {launch,close,open,out,mods,wp,sleep,base} from './lib.mjs';
await launch();
const pin=(p)=>p.evaluate(()=>{const e=document.getElementById('FeaturedPost01');if(!e)return {pinned:false};const a=e.querySelector('article');const r=a.getBoundingClientRect();return {pinned:true,title:e.querySelector('.pTtl a').textContent.trim().slice(0,28),w:Math.round(r.width),layout:Math.round(a.querySelector('.pThmb').getBoundingClientRect().width)<Math.round(r.width)-50?'side-by-side':'stacked'}});
const sticky=()=>wp('echo json_encode(get_option("sticky_posts"));').trim();
const orig=sticky();
for(const vp of ['desktop','mobile']){
  let p=await open('/',vp); out('B02-default',vp,{sticky:orig,...await pin(p)}); await p.close();
  mods({wplusui_pinned_enabled:false}); p=await open('/',vp); out('B02-off',vp,await pin(p)); await p.close(); mods({wplusui_pinned_enabled:null});
  wp('update_option("tmp_sticky",get_option("sticky_posts")); update_option("sticky_posts",array());'); p=await open('/',vp); out('B02-no-sticky',vp,await pin(p)); await p.close();
  wp('update_option("sticky_posts",array(28,26)); '); p=await open('/',vp); out('B02-two-sticky',vp,await pin(p)); await p.close();
  wp('update_option("sticky_posts",get_option("tmp_sticky")); delete_option("tmp_sticky");');
}
await close();
