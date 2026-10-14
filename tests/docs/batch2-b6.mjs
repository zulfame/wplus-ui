import {launch,close,open,out,mods,wp,sleep,base} from './lib.mjs';
await launch();
const side=(p)=>p.evaluate(()=>{const s=document.querySelector('.sideB');const m=document.querySelector('.blogB');const mr=m.getBoundingClientRect();const sr=s?s.getBoundingClientRect():null;return {sidebar:!!s,bodyHsSb:document.body.classList.contains('hsSb'),mainW:Math.round(mr.width),sideW:sr?Math.round(sr.width):0,sideBelow:sr?sr.top>mr.bottom-5:null,overflow:document.documentElement.scrollWidth>innerWidth}});
const pop=(p)=>p.evaluate(()=>{const w=document.getElementById('PopularPosts01');if(!w)return {popular:false};return {popular:true,title:w.querySelector('.title').textContent.trim(),items:[...w.querySelectorAll('article')].map(a=>a.querySelector('.iTtl a').textContent.trim().slice(0,22))}});
for(const vp of ['desktop','mobile']){
  // B06 sidebar toggle on the home page
  for(const on of [true,false]){ mods({wplusui_sidebar_home:on?null:false}); const p=await open('/',vp); out('B06',vp,{setting:on,...await side(p)}); await p.close(); }
  mods({wplusui_sidebar_home:null});
  // B07 popular posts
  let p=await open('/',vp); out('B07-default',vp,await pop(p)); await p.close();
  mods({wplusui_popular_title:'Terpopuler',wplusui_popular_count:3}); p=await open('/',vp); out('B07-title+count3',vp,await pop(p)); await p.close();
  mods({wplusui_popular_title:null,wplusui_popular_count:null,wplusui_popular_show:false}); p=await open('/',vp); out('B07-off',vp,await pop(p)); await p.close(); mods({wplusui_popular_show:null});
}
// ordering rules on the server (same on both viewports): views, comments, recent
const ids=(order)=>wp(`$q=wplusui_get_popular_posts(4,array(),"${order}"); echo implode(",",wp_list_pluck($q->posts,"ID"));`).trim();
wp('update_post_meta(30,"wplusui_views",500); update_post_meta(29,"wplusui_views",300); update_post_meta(33,"wplusui_views",100); global $wpdb; $wpdb->update($wpdb->posts,["comment_count"=>9],["ID"=>34]); $wpdb->update($wpdb->posts,["comment_count"=>4],["ID"=>35]); clean_post_cache(34); clean_post_cache(35);');
out('B07-order','server',{views:ids('views'),comments:ids('comments'),recent:ids('recent'),expectViews:'30,29,33,...',expectComments:'34,35,...'});
wp('delete_post_meta(30,"wplusui_views"); delete_post_meta(29,"wplusui_views"); delete_post_meta(33,"wplusui_views"); global $wpdb; $wpdb->update($wpdb->posts,["comment_count"=>0],["ID"=>34]); $wpdb->update($wpdb->posts,["comment_count"=>0],["ID"=>35]); clean_post_cache(34); clean_post_cache(35);');
await close();
