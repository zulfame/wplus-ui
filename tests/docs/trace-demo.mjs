// TRACE group M03 (demo content as its own download). The theme zip carries no demo content; the demo pack is a second zip
// of the same release. A fake release server (php -S on 8093) serves the zips built by bin/build-zip.sh, and a throw-away
// WordPress (port 8094) installs the theme from its zip, downloads the pack from Appearance > WPlus UI Demo's code,
// imports the demo, finishes the setup and is then walked through the JavaScript error check.
import * as L from './lib.mjs';
import { execFileSync, spawn } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
const { claim, summary, root, sleep } = L;

const T = path.join(root, 'wp-content/themes/wplus-ui');
const VER = /Version:\s*(\S+)/.exec(fs.readFileSync(path.join(T, 'style.css'), 'utf8'))[1];
execFileSync(path.join(root, 'bin/build-zip.sh'), ['--no-assets'], { stdio: 'ignore' });
const THEME_ZIP = path.join(root, `dist/wplus-ui-${VER}.zip`);
const DEMO_ZIP = path.join(root, `dist/wplus-ui-demo-${VER}.zip`);
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const list = (zip) => execFileSync('unzip', ['-Z1', zip], { encoding: 'utf8' }).split('\n').filter(Boolean);

const FAKE = fs.mkdtempSync(path.join(os.tmpdir(), 'fakegh-'));
const PORT = 8093;
const SITE = 8094;
const PKG = `http://127.0.0.1:${PORT}/dl/`;
const API = `http://127.0.0.1:${PORT}/releases/latest`;
fs.mkdirSync(path.join(FAKE, 'dl'));
fs.copyFileSync(THEME_ZIP, path.join(FAKE, 'dl', path.basename(THEME_ZIP)));
fs.copyFileSync(DEMO_ZIP, path.join(FAKE, 'dl', path.basename(DEMO_ZIP)));
fs.writeFileSync(path.join(FAKE, 'router.php'), `<?php
$f = '${FAKE}'; $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($uri === '/releases/latest') { $s = json_decode(file_get_contents($f.'/state.json'), true); http_response_code($s['status']); header('Content-Type: application/json'); echo $s['body']; return true; }
if (strpos($uri, '/dl/') === 0 && is_file($f.$uri)) { header('Content-Type: application/zip'); readfile($f.$uri); return true; }
http_response_code(404);`);
const serve = (assets) => fs.writeFileSync(path.join(FAKE, 'state.json'), JSON.stringify({ status: 200, body: JSON.stringify({ tag_name: 'v' + VER, draft: false, prerelease: false, published_at: '2026-10-20T08:00:00Z', html_url: 'https://example.test/r', body: '- New: test', assets }) }));
const asset = (zip, digest) => ({ name: path.basename(zip), browser_download_url: PKG + path.basename(zip), digest: digest === undefined ? 'sha256:' + sha(zip) : digest });
serve([asset(THEME_ZIP)]);
const gh = spawn('php', ['-S', `127.0.0.1:${PORT}`, path.join(FAKE, 'router.php')], { stdio: 'ignore' });

const W = fs.mkdtempSync(path.join(os.tmpdir(), 'wp-demo-'));
const DB = 'plusui_demo_test';
const sh = (cmd, args, o = {}) => execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...o });
const php = (code) => execFileSync('php', ['-r', `$_SERVER['HTTP_HOST']='127.0.0.1:${SITE}';define('WP_LOAD_IMPORTERS',true);define('WP_ADMIN',true);${code}`], { cwd: W, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 26 });
const PRE = `add_filter('wplusui_update_api_url',function(){return '${API}';});add_filter('wplusui_update_package_prefix',function(){return '${PKG}';});add_filter('http_request_host_is_external','__return_true');add_filter('http_allowed_safe_ports',function($p){$p[]=${PORT};return $p;});`;
const J = (code) => { const out = php(code); return JSON.parse(out.slice(out.indexOf('{'))); };
let site;
try {
  // M03-1: the packaging
  const themeFiles = list(THEME_ZIP);
  const demoFiles = list(DEMO_ZIP);
  const themeSize = fs.statSync(THEME_ZIP).size;
  claim('M03-1', `zip tema tanpa konten demo dan kecil (${(themeSize / 1048576).toFixed(2)} MB < 1.5 MB); paket demo terpisah berisi XML, skrip impor, README dan 30 gambar`, !themeFiles.some((f) => /demo-content\//.test(f)) && !themeFiles.some((f) => /assets\/images\/(?!wplus-ui-logo-square\.png)[^/]+$/.test(f)) && themeSize < 1.5 * 1048576 && demoFiles.includes('wplus-ui-demo/wplus-ui-demo-content.xml') && demoFiles.includes('wplus-ui-demo/import-demo.php') && demoFiles.filter((f) => /^wplus-ui-demo\/images\/[^/]+\.[a-z]+$/.test(f)).length === 30, [themeSize, themeFiles.length, demoFiles.length]);

  // a fresh WordPress with the theme installed from its zip
  sh('rsync', ['-a', '--exclude', 'wp-content', '--exclude', 'wp-config.php', '--exclude', 'node_modules', '--exclude', '.git', '--exclude', 'tests', '--exclude', 'docs', '--exclude', 'bin', '--exclude', '.github', root + '/', W + '/']);
  for (const d of ['themes', 'uploads', 'plugins']) fs.mkdirSync(path.join(W, 'wp-content', d), { recursive: true });
  sh('rsync', ['-a', root + '/wp-content/themes/twentytwentyfive/', W + '/wp-content/themes/twentytwentyfive/']);
  sh('rsync', ['-a', root + '/wp-content/plugins/wordpress-importer/', W + '/wp-content/plugins/wordpress-importer/']);
  sh('unzip', ['-q', THEME_ZIP, '-d', W + '/wp-content/themes']);
  sh('mysql', ['-u', 'root', '-e', `DROP DATABASE IF EXISTS ${DB}; CREATE DATABASE ${DB} CHARACTER SET utf8mb4;`]);
  fs.writeFileSync(W + '/wp-config.php', `<?php
define('DB_NAME','${DB}');define('DB_USER','root');define('DB_PASSWORD','');define('DB_HOST','localhost');define('DB_CHARSET','utf8mb4');define('DB_COLLATE','');$table_prefix='wp_';
define('WP_HOME','http://127.0.0.1:${SITE}');define('WP_SITEURL','http://127.0.0.1:${SITE}');define('FS_METHOD','direct');define('WP_DEBUG',true);define('WP_DEBUG_LOG',true);define('WP_DEBUG_DISPLAY',false);
define('AUTH_KEY','a');define('SECURE_AUTH_KEY','b');define('LOGGED_IN_KEY','c');define('NONCE_KEY','d');define('AUTH_SALT','e');define('SECURE_AUTH_SALT','f');define('LOGGED_IN_SALT','g');define('NONCE_SALT','h');
if(!defined('ABSPATH'))define('ABSPATH',__DIR__.'/');require_once ABSPATH.'wp-settings.php';`);
  php(`define('WP_INSTALLING',true);require 'wp-load.php';require ABSPATH.'wp-admin/includes/upgrade.php';wp_install('Demo','admin','a@example.test',true,'','not-used-elsewhere');`);
  php(`require 'wp-load.php';switch_theme('wplus-ui');activate_plugin('wordpress-importer/wordpress-importer.php');`);
  const installed = J(`require 'wp-load.php';echo json_encode(['theme'=>get_option('stylesheet'),'demoDirInTheme'=>is_dir(get_template_directory().'/demo-content'),'dir'=>wplusui_demo_dir()]);`);
  claim('M03-2', 'tema terpasang dari zip tidak punya folder demo-content dan tidak menemukan konten demo', installed.theme === 'wplus-ui' && installed.demoDirInTheme === false && installed.dir === '', installed);

  // M03-3: the page offers the download, not the import steps
  const page0 = php(`require 'wp-load.php';wp_set_current_user(1);require_once ABSPATH.'wp-admin/includes/template.php';ob_start();wplusui_demo_page();echo ob_get_clean();`);
  claim('M03-3', 'halaman WPlus UI Demo tanpa paket: menawarkan "Download demo content" dan belum menampilkan langkah impor', /Download demo content/.test(page0) && /wplusui_demo_download/.test(page0) && !/Finish demo setup/.test(page0) && !/github/i.test(page0.replace(/<[^>]+>/g, ' ')), page0.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 160));

  // M03-4: nothing to download / wrong checksum / complete
  serve([asset(THEME_ZIP)]);
  const none = J(`require 'wp-load.php';${PRE}$r=wplusui_demo_fetch_pack();echo json_encode(['code'=>is_wp_error($r)?$r->get_error_code():'ok','dir'=>wplusui_demo_dir()]);`);
  serve([asset(THEME_ZIP), asset(DEMO_ZIP, 'sha256:' + 'c'.repeat(64))]);
  const bad = J(`require 'wp-load.php';${PRE}delete_site_transient('wplusui_latest_release');$r=wplusui_demo_fetch_pack();echo json_encode(['code'=>is_wp_error($r)?$r->get_error_code():'ok','dir'=>wplusui_demo_dir()]);`);
  claim('M03-4', 'rilis tanpa paket demo: pesan "tidak ditemukan"; checksum salah: dibatalkan; keduanya tidak meninggalkan berkas', none.code === 'wplusui_demo_none' && none.dir === '' && bad.code === 'wplusui_checksum' && bad.dir === '', [none, bad]);
  serve([asset(THEME_ZIP), asset(DEMO_ZIP)]);
  const ok = J(`require 'wp-load.php';${PRE}delete_site_transient('wplusui_latest_release');$r=wplusui_demo_fetch_pack();$d=wplusui_demo_dir();echo json_encode(['res'=>is_wp_error($r)?$r->get_error_message():$r,'dir'=>$d,'xml'=>is_readable($d.'/wplus-ui-demo-content.xml'),'imp'=>is_readable($d.'/import-demo.php'),'images'=>count(glob($d.'/images/*.*')),'url'=>wplusui_demo_xml_url()]);`);
  claim('M03-5', 'unduh paket demo (checksum cocok): dibuka ke uploads/wplus-ui-demo dengan XML, skrip impor, 30 gambar; tautan XML menunjuk ke sana', ok.res === true && /uploads\/wplus-ui-demo$/.test(ok.dir) && ok.xml && ok.imp && ok.images === 30 && ok.url === `http://127.0.0.1:${SITE}/wp-content/uploads/wplus-ui-demo/wplus-ui-demo-content.xml`, ok);
  const page1 = php(`require 'wp-load.php';wp_set_current_user(1);require_once ABSPATH.'wp-admin/includes/template.php';ob_start();wplusui_demo_page();echo ob_get_clean();`);
  claim('M03-6', 'halaman WPlus UI Demo sesudah unduh: langkah impor dan "Finish demo setup" tampil, tombol unduh hilang', /Finish demo setup/.test(page1) && /wplus-ui-demo-content\.xml/.test(page1) && !/Download demo content/.test(page1), null);

  // M03-7: import the XML like the WordPress Importer does, then finish the setup from the downloaded pack
  const imp = J(`require 'wp-load.php';wp_set_current_user(1);
    foreach(['import','post','taxonomy','file','media','image'] as $f) require_once ABSPATH."wp-admin/includes/$f.php";
    require_once ABSPATH.'wp-admin/includes/class-wp-importer.php';
    require_once WP_PLUGIN_DIR.'/wordpress-importer/wordpress-importer.php';
    $i=new WP_Import(); $i->fetch_attachments=false; ob_start(); $i->import(wplusui_demo_dir().'/wplus-ui-demo-content.xml'); ob_end_clean();
    $msg=wplusui_demo_run_setup(); global $wpdb;
    echo json_encode(['msg'=>$msg,'posts'=>(int)wp_count_posts()->publish,'thumbs'=>count(get_posts(['meta_key'=>'_thumbnail_id','numberposts'=>-1,'fields'=>'ids'])),'menus'=>count(wp_get_nav_menus()),'sticky'=>count((array)get_option('sticky_posts')),'left'=>(int)$wpdb->get_var("SELECT COUNT(*) FROM $wpdb->posts WHERE post_type IN ('post','page') AND post_content LIKE '%/assets/images/%'"),'galleryAtts'=>(int)$wpdb->get_var("SELECT COUNT(*) FROM $wpdb->postmeta WHERE meta_key='_wplusui_demo_file' AND meta_value IN ('colorful-spider-fantasy.jpg','frosty-pine-cones.jpg','jungle-trekking-adventure.jpg','misty-grape-cluster.jpg','skydivers-holding-hands.jpg','urban-basketball-game.jpg','winter-alpine-village.jpg')")]);`);
  claim('M03-7', 'impor XML dan "Finish demo setup" dari paket yang diunduh: 19 gambar unggulan, 2 menu, 1 pos sticky, tidak ada lagi alamat gambar di folder tema, 7 gambar galeri masuk media library', /ready/.test(imp.msg) && imp.thumbs >= 19 && imp.menus === 2 && imp.sticky === 1 && imp.left === 0 && imp.galleryAtts === 7, imp);
  // M03-8: running the setup again changes nothing (separate process: the script declares a function)
  const again = J(`require 'wp-load.php';wp_set_current_user(1);$a=count(get_posts(['post_type'=>'attachment','numberposts'=>-1,'fields'=>'ids']));wplusui_demo_run_setup();$b=count(get_posts(['post_type'=>'attachment','numberposts'=>-1,'fields'=>'ids']));echo json_encode(['before'=>$a,'after'=>$b]);`);
  claim('M03-8', 'menjalankan "Finish demo setup" lagi tidak menggandakan lampiran', again.before === again.after && again.after > 0, again);
  // M03-9: every page of the finished site works and the gallery pictures load
  site = spawn('php', ['-S', `127.0.0.1:${SITE}`, '-t', W], { stdio: 'ignore' });
  await sleep(1000);
  const html = execFileSync('curl', ['-s', `http://127.0.0.1:${SITE}/?name=ui-components-and-typography`], { encoding: 'utf8', maxBuffer: 1 << 26 });
  const imgs = [...new Set([...html.matchAll(/src="([^"]*\/wp-content\/uploads\/[^"]+)"/g)].map((m) => m[1]))].slice(0, 12);
  const codes = imgs.map((u) => execFileSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', u.startsWith('http') ? u : `http://127.0.0.1:${SITE}${u}`], { encoding: 'utf8' }));
  claim('M03-9', 'gambar di pos demo (galeri) dimuat dari media library: semua alamat menjawab 200', imgs.length > 0 && codes.every((c) => c === '200'), [imgs.length, codes.join()]);
  let js = '';
  try { js = execFileSync('node', [path.join(root, 'tests/visual/js-errors.mjs'), `http://127.0.0.1:${SITE}`], { encoding: 'utf8', maxBuffer: 1 << 26 }); } catch (e) { js = (e.stdout || '') + (e.message || ''); }
  claim('M03-10', 'situs hasil instal bersih + paket demo: 17 jenis halaman, desktop dan mobile, tanpa galat JavaScript', /^OK: 34 page checks/m.test(js), js.trim().split('\n').slice(-4).join(' | '));
  const log = fs.existsSync(W + '/wp-content/debug.log') ? fs.readFileSync(W + '/wp-content/debug.log', 'utf8').split('\n').filter((l) => /PHP (Warning|Notice|Fatal|Deprecated)/.test(l) && !/hostname/.test(l)) : [];
  claim('M03-11', 'log debug PHP kosong sepanjang pemasangan, unduh, impor, dan penelusuran halaman', log.length === 0, log.slice(0, 2).map((l) => l.slice(0, 200)));
} finally {
  if (site) site.kill();
  gh.kill();
  try { sh('mysql', ['-u', 'root', '-e', `DROP DATABASE IF EXISTS ${DB}`]); } catch (e) { /* nothing */ }
  fs.rmSync(W, { recursive: true, force: true });
  fs.rmSync(FAKE, { recursive: true, force: true });
}
summary('trace-demo');
