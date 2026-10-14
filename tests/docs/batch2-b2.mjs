import {launch,close,open,out,mods,wp,sleep,base} from './lib.mjs';
await launch();
const car=(p)=>p.evaluate(()=>{const w=document.querySelector('.sldW');if(!w)return {carousel:false};const slides=[...w.querySelectorAll('.sldA')];return {carousel:true,slides:slides.length,titles:slides.map(s=>(s.querySelector('.sldT')||{}).dataset?.title||'-').map(t=>t.slice(0,20)),links:slides.map(s=>s.querySelector('.sldL')?.getAttribute('href')?.replace(/^.*127.0.0.1:8091/,'')||'(none)'),imgs:slides.map(s=>(s.querySelector('img')?.src||'').split('/').pop().slice(0,26))}});
const html=async(u)=>await (await fetch(base+u)).text();
const logo=wp('echo wp_get_attachment_url(139);').trim();
for(const vp of ['desktop','mobile']){
  // custom slides: 1 with everything, 2 with image only (no title, no link), 3 title only (no image -> ignored)
  mods({wplusui_carousel_image_1:logo,wplusui_carousel_title_1:'Slide satu',wplusui_carousel_url_1:'https://example.com/satu',wplusui_carousel_image_2:base+'/wp-content/themes/wplus-ui/assets/images/misty-grape-cluster.jpg',wplusui_carousel_title_3:'Tanpa gambar'});
  let p=await open('/',vp); out('B01-custom',vp,await car(p)); await p.close();
  mods({wplusui_carousel_image_1:null,wplusui_carousel_title_1:null,wplusui_carousel_url_1:null,wplusui_carousel_image_2:null,wplusui_carousel_title_3:null});
  // switch off
  mods({wplusui_carousel_enabled:false}); p=await open('/',vp); out('B01-off',vp,await car(p)); await p.close(); mods({wplusui_carousel_enabled:null});
}
// preload only with carousel (server HTML)
const on=await html('/'); mods({wplusui_carousel_enabled:false}); const off=await html('/'); mods({wplusui_carousel_enabled:null});
out('B01-preload','server',{withCarousel:/rel="preload" as="image"/.test(on),carouselOff:/rel="preload" as="image"/.test(off)});
await close();
