// TRACE group O01 (updates from the WordPress dashboard). A fake GitHub (php -S on 8093) answers the releases API and serves
// theme zips, so nothing here talks to the real GitHub. The behaviour is checked in the dev site; the real upgrade
// (Theme_Upgrader replacing the theme folder) runs in a separate throw-away WordPress.
import * as L from './lib.mjs';
import { execFileSync, spawn } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
const { wp, claim, summary, root, sleep } = L;

const FAKE = fs.mkdtempSync(path.join(os.tmpdir(), 'fakegh-'));
const PORT = 8093;
const API = `http://127.0.0.1:${PORT}/releases/latest`;
const PKG = `http://127.0.0.1:${PORT}/dl/`;
const THEME = path.join(root, 'wp-content/themes/wplus-ui');
fs.mkdirSync(path.join(FAKE, 'dl'));
fs.writeFileSync(path.join(FAKE, 'router.php'), `<?php
$f = '${FAKE}'; $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($uri === '/releases/latest') { file_put_contents($f.'/hits.log', "hit\\n", FILE_APPEND); $s = json_decode(file_get_contents($f.'/state.json'), true); http_response_code($s['status']); header('Content-Type: application/json'); echo $s['body']; return true; }
if (strpos($uri, '/dl/') === 0 && is_file($f.$uri)) { header('Content-Type: application/zip'); readfile($f.$uri); return true; }
http_response_code(404);`);
fs.writeFileSync(path.join(FAKE, 'state.json'), JSON.stringify({ status: 404, body: '' }));
const server = spawn('php', ['-S', `127.0.0.1:${PORT}`, path.join(FAKE, 'router.php')], { stdio: 'ignore' });
await sleep(800);

const hits = () => (fs.existsSync(path.join(FAKE, 'hits.log')) ? fs.readFileSync(path.join(FAKE, 'hits.log'), 'utf8').split('\n').filter(Boolean).length : 0);
const resetHits = () => fs.rmSync(path.join(FAKE, 'hits.log'), { force: true });
// a zip of the theme with another version number, for the checksum and the real upgrade
const makeZip = (version, extra = '') => {
  const dir = path.join(FAKE, 'build-' + version);
  fs.mkdirSync(dir, { recursive: true });
  execFileSync('rsync', ['-a', '--exclude', 'node_modules', '--exclude', 'AGENTS.md', '--exclude', 'CLAUDE.md', '--exclude', 'MEMORY.md', '--exclude', 'COMPARISON.md', THEME + '/', dir + '/wplus-ui/']);
  for (const [f, a, b] of [['style.css', 'Version: 1.7.1', 'Version: ' + version], ['functions.php', "'WPLUSUI_VERSION', '1.7.1'", `'WPLUSUI_VERSION', '${version}'`]]) {
    const p = path.join(dir, 'wplus-ui', f); fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace(a, b));
  }
  if (extra) fs.writeFileSync(path.join(dir, 'wplus-ui', 'marker.txt'), extra);
  const zip = path.join(FAKE, 'dl', `wplus-ui-${version}.zip`);
  execFileSync('zip', ['-qr', zip, 'wplus-ui'], { cwd: dir });
  return { zip, sha: crypto.createHash('sha256').update(fs.readFileSync(zip)).digest('hex') };
};
const release = (tag, o = {}) => JSON.stringify({ tag_name: tag, draft: !!o.draft, prerelease: !!o.pre, published_at: '2026-10-20T08:00:00Z', html_url: 'https://github.com/zulfame/wplus-ui/releases/tag/' + tag, body: o.body ?? '## Notes\n- **Bold** item with `code`', assets: o.noAsset ? [] : [{ name: `wplus-ui-${(o.nameVer ?? tag.replace(/^v/, ''))}.zip`, browser_download_url: o.url ?? `${PKG}wplus-ui-${tag.replace(/^v/, '')}.zip`, digest: o.digest === undefined ? '' : o.digest }] });
const serve = (body, status = 200) => fs.writeFileSync(path.join(FAKE, 'state.json'), JSON.stringify({ status, body }));
const PRE = `add_filter('wplusui_update_api_url',function(){return '${API}';});add_filter('wplusui_update_package_prefix',function(){return '${PKG}';});add_filter('http_request_host_is_external','__return_true');add_filter('http_allowed_safe_ports',function($p){$p[]=${PORT};return $p;});`;
const run = (code, pre = PRE) => wp(pre + code);
const J = (code, pre) => JSON.parse(run(code, pre));
const SLUG = 'wplus-ui';
const probe = `delete_site_transient('wplusui_latest_release');$t=new stdClass();$t->checked=['${SLUG}'=>'1.7.1'];$t=apply_filters('pre_set_site_transient_update_themes',$t);echo json_encode(['resp'=>$t->response['${SLUG}']??null,'noup'=>isset($t->no_update['${SLUG}'])]);`;

try {
  const z = makeZip('1.7.9');
  // O01-1 newer version: update offered with the package and the notes window address
  serve(release('v1.7.9', { digest: 'sha256:' + z.sha }));
  let r = J(probe);
  claim('O01-1', 'versi GitHub lebih baru (1.7.9 > 1.7.1): pembaruan ditawarkan dengan paket dan alamat catatan rilis', r.resp?.new_version === '1.7.9' && r.resp.package === `${PKG}wplus-ui-1.7.9.zip` && /wplusui-notes=1/.test(r.resp.url) && r.noup === false, r);
  // O01-2 same, older, draft, prerelease
  serve(release('v1.7.1')); r = J(probe);
  claim('O01-2', 'versi sama: tidak ada pembaruan; tema tercatat di no_update (supaya pembaruan otomatis tampil)', r.resp === null && r.noup === true, r);
  serve(release('v1.7.0')); r = J(probe);
  claim('O01-3', 'versi GitHub lebih lama: tidak ada pembaruan', r.resp === null, r);
  serve(release('v1.8.0', { draft: true })); const d1 = J(probe); serve(release('v1.8.0', { pre: true })); const d2 = J(probe);
  claim('O01-4', 'draft dan pra-rilis diabaikan', d1.resp === null && d2.resp === null, [d1, d2]);
  // O01-5 not usable releases
  const bad = [];
  for (const [name, body] of [['tag bukan angka versi', release('latest')], ['tanpa berkas zip', release('v1.9.0', { noAsset: true })], ['nama zip salah', release('v1.9.0', { nameVer: '1.0.0' })], ['zip di luar repositori', release('v1.9.0', { url: 'https://evil.example/wplus-ui-1.9.0.zip' })], ['bukan JSON', 'bukan json']]) {
    serve(body); const x = J(probe); if (x.resp !== null) bad.push(name);
  }
  claim('O01-5', 'rilis yang tidak layak (tag aneh, tanpa zip, nama zip salah, paket di luar repositori, bukan JSON) tidak pernah ditawarkan', bad.length === 0, bad);
  // O01-6 cache: one request for many checks, a forced check asks again
  serve(release('v1.7.9', { digest: 'sha256:' + z.sha })); resetHits();
  run(`delete_site_transient('wplusui_latest_release');wplusui_latest_release();wplusui_latest_release();wplusui_latest_release();`);
  const afterCached = hits();
  run(`wplusui_latest_release();wplusui_latest_release(true);`, PRE.replace('delete_site_transient', 'delete_site_transient'));
  claim('O01-6', 'hasil dicache 12 jam: tiga pengecekan = 1 permintaan; "Check now" memaksa permintaan baru', afterCached === 1 && hits() === 2, [afterCached, hits()]);
  // O01-7 failure: no update, no fatal error, remembered (no second request)
  serve('boom', 500); resetHits();
  const f = J(`delete_site_transient('wplusui_latest_release');$a=wplusui_latest_release();$b=wplusui_latest_release();echo json_encode([$a,$b,get_site_transient('wplusui_latest_release')]);`);
  claim('O01-7', 'GitHub gagal (HTTP 500): tanpa pembaruan, tanpa galat, kegagalan diingat (hanya 1 permintaan)', f[0] === null && f[1] === null && f[2] === 'none' && hits() === 1, [f, hits()]);
  // O01-8 switched off
  serve(release('v1.7.9')); resetHits();
  const off = J(`add_filter('wplusui_updates_enabled','__return_false');delete_site_transient('wplusui_latest_release');$t=new stdClass();$t->checked=['${SLUG}'=>'1.7.1'];$t=apply_filters('pre_set_site_transient_update_themes',$t);echo json_encode(['resp'=>$t->response??null,'noup'=>$t->no_update??null,'rel'=>wplusui_latest_release()]);`);
  claim('O01-8', 'dimatikan (filter wplusui_updates_enabled): tidak ada permintaan jaringan dan tidak ada data pembaruan', off.rel === null && !off.resp && !off.noup && hits() === 0, [off, hits()]);
  // O01-9 checksum: right, wrong, unknown
  const pkg = `${PKG}wplus-ui-1.7.9.zip`;
  const ck = J(`$rel=['version'=>'1.7.9','package'=>'${pkg}','sha256'=>'${z.sha}','notes'=>'','published'=>'','page'=>''];
    require_once ABSPATH.'wp-admin/includes/file.php';
    set_site_transient('wplusui_latest_release',$rel,3600); $ok=apply_filters('upgrader_pre_download',false,'${pkg}',null);
    $rel['sha256']=str_repeat('a',64); set_site_transient('wplusui_latest_release',$rel,3600); $bad=apply_filters('upgrader_pre_download',false,'${pkg}',null);
    $rel['sha256']=''; set_site_transient('wplusui_latest_release',$rel,3600); $none=apply_filters('upgrader_pre_download',false,'${pkg}',null);
    $other=apply_filters('upgrader_pre_download',false,'https://example.com/other.zip',null);
    echo json_encode(['ok'=>is_string($ok)&&is_file($ok),'bad'=>is_wp_error($bad)?$bad->get_error_code():'no-error','none'=>$none,'other'=>$other]);`);
  claim('O01-9', 'checksum: cocok = lanjut; tidak cocok = dibatalkan (wplusui_checksum); GitHub tanpa checksum atau paket lain = proses bawaan WordPress', ck.ok === true && ck.bad === 'wplusui_checksum' && ck.none === false && ck.other === false, ck);
  // O01-10 notes are escaped
  const nh = J(`echo json_encode(wplusui_notes_html("## Judul\\n**tebal** <script>alert(1)</script> <img src=x onerror=alert(1)> [tautan](https://example.com/a?b=1&c=2) [jahat](javascript:alert(1))\\n- butir \`kode\`"));`);
  claim('O01-10', 'catatan rilis: format dasar jalan (judul, tebal, kode, daftar, tautan https) dan HTML atau javascript: dari rilis tidak pernah menjadi markup', /<h3>Judul<\/h3>/.test(nh) && /<strong>tebal<\/strong>/.test(nh) && /<li>butir <code>kode<\/code><\/li>/.test(nh) && /<a href="https:\/\/example\.com\/a\?b=1&#038;c=2"/.test(nh) && !/<script|<img|href="javascript/i.test(nh), nh);
  // O01-11/12/13 the admin screens (as an administrator, using the cache so no network)
  const rel = release('v1.7.9', { digest: 'sha256:' + z.sha, body: '## Baru\n- Catatan **uji** `kode`' });
  const cookies = J(`$e=time()+3600;echo json_encode([[AUTH_COOKIE,wp_generate_auth_cookie(1,$e,'auth')],[LOGGED_IN_COOKIE,wp_generate_auth_cookie(1,$e,'logged_in')]]);`, '');
  const cookieHeader = cookies.map(([k, v]) => `${k}=${v}`).join('; ');
  const get = (u, hdr = cookieHeader) => execFileSync('curl', ['-s', '-i', '-H', 'Cookie: ' + hdr, L.base + u], { encoding: 'utf8', maxBuffer: 1 << 26 });
  run(`$d=json_decode(${JSON.stringify(rel)},true);set_site_transient('wplusui_latest_release',wplusui_parse_release($d),3600);`);
  let page = get('/wp-admin/index.php?wplusui-notes=1');
  claim('O01-11', 'jendela catatan ("View version details"): halaman polos tanpa menu admin, memuat versi dan catatan rilis; tanpa login diarahkan ke halaman masuk', /WPlus UI 1\.7\.9/.test(page) && /<li>Catatan <strong>uji<\/strong> <code>kode<\/code><\/li>/.test(page) && !/id="adminmenu"/.test(page) && /^HTTP\/\S+ 302/m.test(get('/wp-admin/index.php?wplusui-notes=1', 'x=1')), page.slice(0, 120));
  page = get('/wp-admin/themes.php?page=wplusui-updates');
  claim('O01-12', 'Tampilan > WPlus UI updates: versi terpasang, "Version 1.7.9 is available", tombol Update now (bernonce), tombol Check now, catatan rilis dan riwayat terpasang', /Installed version: 1\.7\.1/.test(page) && /Version 1\.7\.9 is available/.test(page) && /update\.php\?action=upgrade-theme&(?:amp;|#038;)theme=wplus-ui&(?:amp;|#038;)_wpnonce=[a-f0-9]+/.test(page) && /name="action" value="wplusui_check_updates"/.test(page) && /What is new in 1\.7\.9/.test(page) && /Recent changes in the installed version/.test(page), null);
  run(`$d=json_decode(${JSON.stringify(release('v1.7.1'))},true);set_site_transient('wplusui_latest_release',wplusui_parse_release($d),3600);`);
  page = get('/wp-admin/themes.php?page=wplusui-updates');
  claim('O01-13', 'versi terbaru: halaman menulis "You have the latest version." dan tidak menawarkan Update now', /You have the latest version\./.test(page) && !/Update now/.test(page), null);
  // O01-14 the update notice in Appearance > Themes
  const nt = J(`$t=new stdClass();$t->last_checked=time();$t->checked=['${SLUG}'=>'1.7.1'];$t->response=[];$t->no_update=[];
    set_site_transient('wplusui_latest_release',wplusui_parse_release(json_decode(${JSON.stringify(rel)},true)),3600);
    $t=apply_filters('pre_set_site_transient_update_themes',$t); set_site_transient('update_themes',$t);
    require_once ABSPATH.'wp-admin/includes/theme.php'; require_once ABSPATH.'wp-admin/includes/update.php'; wp_set_current_user(1);
    $themes=wp_prepare_themes_for_js([wp_get_theme('${SLUG}')]); $u=$themes[0]['update']??''; delete_site_transient('update_themes');
    echo json_encode(['update'=>$u,'auto'=>$themes[0]['autoupdate']['supported']??null]);`);
  claim('O01-14', 'Tampilan > Tema: pemberitahuan pembaruan menyebut versi baru dan menautkan "View version 1.7.9 details" ke jendela catatan; pembaruan otomatis didukung', /1\.7\.9/.test(nt.update) && /wplusui-notes=1/.test(nt.update) && nt.auto === true, nt);

  // O01-15 the real upgrade in a throw-away WordPress: Theme_Upgrader replaces the folder, settings and active theme stay
  const W = fs.mkdtempSync(path.join(os.tmpdir(), 'wp-upg-'));
  const DB = 'plusui_update_test';
  const sh = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    sh('rsync', ['-a', '--exclude', 'wp-content', '--exclude', 'wp-config.php', '--exclude', 'node_modules', '--exclude', '.git', '--exclude', 'tests', '--exclude', 'docs', '--exclude', 'bin', '--exclude', '.github', root + '/', W + '/']);
    fs.mkdirSync(W + '/wp-content/themes', { recursive: true }); fs.mkdirSync(W + '/wp-content/uploads', { recursive: true });
    sh('rsync', ['-a', root + '/wp-content/themes/twentytwentyfive/', W + '/wp-content/themes/twentytwentyfive/']);
    // the installed theme is the built zip of the current version, like a real install
    const base = makeZip('1.7.1');
    sh('unzip', ['-q', base.zip, '-d', W + '/wp-content/themes']);
    sh('mysql', ['-u', 'root', '-e', `DROP DATABASE IF EXISTS ${DB}; CREATE DATABASE ${DB} CHARACTER SET utf8mb4;`]);
    fs.writeFileSync(W + '/wp-config.php', `<?php
define('DB_NAME','${DB}');define('DB_USER','root');define('DB_PASSWORD','');define('DB_HOST','localhost');define('DB_CHARSET','utf8mb4');define('DB_COLLATE','');$table_prefix='wp_';
define('WP_HOME','http://127.0.0.1:8094');define('WP_SITEURL','http://127.0.0.1:8094');define('FS_METHOD','direct');define('WP_DEBUG',true);define('WP_DEBUG_LOG',true);define('WP_DEBUG_DISPLAY',false);
define('AUTH_KEY','a');define('SECURE_AUTH_KEY','b');define('LOGGED_IN_KEY','c');define('NONCE_KEY','d');define('AUTH_SALT','e');define('SECURE_AUTH_SALT','f');define('LOGGED_IN_SALT','g');define('NONCE_SALT','h');
if(!defined('ABSPATH'))define('ABSPATH',__DIR__.'/');require_once ABSPATH.'wp-settings.php';`);
    const php = (code) => execFileSync('php', ['-r', `$_SERVER['HTTP_HOST']='127.0.0.1:8094';${code}`], { cwd: W, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    php(`define('WP_INSTALLING',true);require 'wp-load.php';require ABSPATH.'wp-admin/includes/upgrade.php';wp_install('Upg','admin','a@example.test',true,'','not-used-elsewhere');`);
    php(`require 'wp-load.php';switch_theme('wplus-ui');set_theme_mod('wplusui_cookie_enabled',true);set_theme_mod('wplusui_cookie_text','Teks pemilik');`);
    const before = php(`require 'wp-load.php';echo wp_get_theme('wplus-ui')->get('Version');`);
    const z2 = makeZip('1.7.9', 'versi baru');
    serve(release('v1.7.9', { digest: 'sha256:' + z2.sha }));
    const out = php(`require 'wp-load.php';${PRE}wp_set_current_user(1);
      require_once ABSPATH.'wp-admin/includes/admin.php';require_once ABSPATH.'wp-admin/includes/class-wp-upgrader.php';
      wp_update_themes_stub();
      function wp_update_themes_stub(){ $t=new stdClass();$t->last_checked=time();$t->checked=['wplus-ui'=>wp_get_theme('wplus-ui')->get('Version')];$t->response=[];$t->no_update=[];$t=apply_filters('pre_set_site_transient_update_themes',$t);set_site_transient('update_themes',$t); }
      $up=new Theme_Upgrader(new Automatic_Upgrader_Skin()); $res=$up->upgrade('wplus-ui');
      wp_clean_themes_cache(); $th=wp_get_theme('wplus-ui');
      echo json_encode(['res'=>is_wp_error($res)?$res->get_error_message():$res,'version'=>$th->get('Version'),'marker'=>file_exists(get_theme_root().'/wplus-ui/marker.txt'),'active'=>get_option('stylesheet'),'text'=>get_theme_mod('wplusui_cookie_text'),'on'=>(bool)get_theme_mod('wplusui_cookie_enabled'),'messages'=>$up->skin->get_upgrade_messages()]);`);
    const u = JSON.parse(out.slice(out.indexOf('{')));
    claim('O01-15', `pembaruan sungguhan (Theme_Upgrader, paket dari "GitHub" palsu dengan checksum): ${before} -> versi baru, tema tetap aktif, pengaturan Customizer utuh`, before === '1.7.1' && u.version === '1.7.9' && u.marker === true && u.active === 'wplus-ui' && u.text === 'Teks pemilik' && u.on === true && u.res !== false, u);
    // and a wrong checksum stops the upgrade before anything is replaced
    makeZip('1.8.0', 'jangan terpasang');
    serve(release('v1.8.0', { digest: 'sha256:' + 'b'.repeat(64) }));
    const out2 = php(`require 'wp-load.php';${PRE}wp_set_current_user(1);
      require_once ABSPATH.'wp-admin/includes/admin.php';require_once ABSPATH.'wp-admin/includes/class-wp-upgrader.php';
      delete_site_transient('wplusui_latest_release'); $t=new stdClass();$t->last_checked=time();$t->checked=['wplus-ui'=>'1.7.9'];$t->response=[];$t->no_update=[];$t=apply_filters('pre_set_site_transient_update_themes',$t);set_site_transient('update_themes',$t);
      $up=new Theme_Upgrader(new Automatic_Upgrader_Skin()); $res=$up->upgrade('wplus-ui'); wp_clean_themes_cache();
      echo json_encode(['res'=>is_wp_error($res)?$res->get_error_code():$res,'version'=>wp_get_theme('wplus-ui')->get('Version'),'marker2'=>file_exists(get_theme_root().'/wplus-ui/marker.txt')?file_get_contents(get_theme_root().'/wplus-ui/marker.txt'):'']);`);
    const u2 = JSON.parse(out2.slice(out2.indexOf('{')));
    claim('O01-16', 'pembaruan dengan checksum salah dihentikan: versi terpasang tidak berubah dan berkas baru tidak masuk', u2.version === '1.7.9' && !/jangan/.test(u2.marker2) && u2.res !== true, u2);
  } finally {
    try { sh('mysql', ['-u', 'root', '-e', `DROP DATABASE IF EXISTS ${DB}`]); } catch (e) { /* nothing to drop */ }
    fs.rmSync(W, { recursive: true, force: true });
  }
} finally {
  run(`delete_site_transient('wplusui_latest_release');delete_site_transient('update_themes');`, '');
  server.kill();
  fs.rmSync(FAKE, { recursive: true, force: true });
}
summary('trace-update');
