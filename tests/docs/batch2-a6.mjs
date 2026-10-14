import {launch,close,open,out,mods,wp,sleep,base} from './lib.mjs';
await launch();
const id=()=>wp('echo (int) wp_get_attachment_url(139) ? 139 : 0;');
for(const vp of ['desktop','mobile']){
  // A10 identity: title, slogan, logo, site icon, and the fallback icon
  wp('remove_theme_mod("custom_logo"); update_option("site_icon",0);');
  let p=await open('/',vp);
  out('A10-none',vp,await p.evaluate(()=>({headerTitle:document.querySelector('.headT').textContent.trim(),headerHasImg:!!document.querySelector('.headN img'),footerLogo:(document.querySelector('.abtL img')||{}).src?.split('/').slice(-2).join('/'),icons:[...document.querySelectorAll('link[rel~=icon]')].map(l=>l.href.split('/').slice(-2).join('/').slice(0,40)),desc:document.querySelector('meta[name=description]')?.content.slice(0,40)})));await p.close();
  wp('set_theme_mod("custom_logo",139); update_option("site_icon",139);');
  p=await open('/',vp);
  out('A10-logo+icon',vp,await p.evaluate(()=>({headerHasImg:!!document.querySelector('.headN img'),footerLogoClass:(document.querySelector('.abtL img')||{}).className,footerLogoSrc:(document.querySelector('.abtL img')||{}).src?.split('/').pop(),icons:[...document.querySelectorAll('link[rel~=icon]')].map(l=>l.getAttribute('sizes')+' '+l.href.split('/').pop().slice(0,32))})));await p.close();
  wp('remove_theme_mod("custom_logo"); update_option("site_icon",0);');
  wp('update_option("blogname","Nama Uji"); update_option("blogdescription","Slogan uji");');
  p=await open('/',vp); out('A10-title+tagline',vp,await p.evaluate(()=>({headerTitle:document.querySelector('.headT').textContent.trim(),tabTitle:document.title,footerName:document.querySelector('.abtT h2')?.textContent.trim()})));await p.close();
  wp('update_option("blogname","WPlus UI Demo"); update_option("blogdescription","WPlus UI is a modern responsive WordPress theme which provides a set of useful features.");');
}
await close();
