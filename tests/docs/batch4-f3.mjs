// F06: social icons on the Coming Soon page.
import * as L from './lib.mjs';
const { mods, wp, open, out, launch, close } = L;
await launch();
const old = wp(`echo json_encode(['m'=>get_theme_mod('wplusui_soon_mode',null),'s'=>get_theme_mod('wplusui_soon_social',null)]);`);
mods({ wplusui_soon_mode: 'coming_soon', wplusui_soon_social: true, wplusui_social_facebook: 'https://facebook.com/uji', wplusui_social_youtube: 'https://youtube.com/uji' });
for (const vp of ['desktop', 'mobile']) { const p = await open('/', vp); out('F06 soon', vp, await p.evaluate(() => ({ title: document.title, links: [...document.querySelectorAll('a[href*="facebook.com/uji"],a[href*="youtube.com/uji"]')].length }))); await p._ctx.close(); }
const o = JSON.parse(old); mods({ wplusui_soon_mode: o.m, wplusui_soon_social: o.s, wplusui_social_youtube: null, wplusui_social_facebook: '#' });
out('restored', 'php', wp(`echo get_theme_mod('wplusui_soon_mode','(none)'),' ',get_theme_mod('wplusui_social_facebook');`));
await close();
