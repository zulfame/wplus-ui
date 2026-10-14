// Builds docs/TRACE.md from the results of the trace-*.mjs scripts (/tmp/trace/*.json) and checks that every feature of FITUR.md has claims.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dir = '/tmp/trace';
const items = fs.readdirSync(dir).filter((f) => /^trace-.*\.json$/.test(f)).flatMap((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).map((i) => ({ ...i, script: f.replace('.json', '.mjs') })));
const features = fs.readFileSync(root + '/docs/FITUR.md', 'utf8').split('\n').filter((l) => /^\| [A-N]\d\d \|/.test(l)).map((l) => { const c = l.split('|').map((x) => x.trim()); return { id: c[1], name: c[2] }; });
const byFeature = new Map(features.map((f) => [f.id, new Map()]));
for (const it of items) { const fid = it.id.split('-')[0]; if (!byFeature.has(fid)) continue; const m = byFeature.get(fid); if (!m.has(it.id)) m.set(it.id, { id: it.id, text: it.text.replace(/\s*\(desktop|mobile\)$/, ''), d: null, m: null, s: null, scripts: new Set(), detail: '' }); const c = m.get(it.id); c.scripts.add(it.script); if (it.vp === 'desktop') c.d = (c.d ?? true) && it.ok; else if (it.vp === 'mobile') c.m = (c.m ?? true) && it.ok; else c.s = (c.s ?? true) && it.ok; if (!it.ok) c.detail = it.detail; }
const mark = (v) => (v === null ? '' : v ? '✔' : '✘');
let pass = 0, fail = 0, claims = 0; const noClaims = [];
let out = `# Penelusuran klaim: kalimat FITUR.md ke uji

Setiap fitur di [FITUR.md](FITUR.md) dipecah menjadi klaim bernomor (\`A01-1\`, \`A01-2\`, ...) yang diuji mesin oleh skrip \`tests/docs/trace-*.mjs\`. Tabel ini dibuat otomatis dari hasil nyata (\`node tests/docs/trace-report.mjs\` setelah semua skrip trace dijalankan).

- ✔ lulus, ✘ gagal, kosong = tidak relevan untuk ukuran itu. Kolom **Umum** untuk klaim yang tidak bergantung ukuran layar (server, HTML, admin).
- Desktop = 1280x720, Mobile = 390 piksel (emulasi ponsel).
- Klaim yang butuh akun nyata (iklan AdSense yang terisi, Disqus) atau plugin berbayar (WPML) hanya diuji pada antarmuka yang bisa dijangkau; batasnya dinyatakan di kalimat klaim.

`;
for (const f of features) {
  const cl = [...byFeature.get(f.id).values()].sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
  if (!cl.length) { noClaims.push(f.id); out += `### ${f.id} ${f.name}\n\n**Belum ada klaim.**\n\n`; continue; }
  const bad = cl.filter((c) => c.d === false || c.m === false || c.s === false).length; claims += cl.length; fail += bad; pass += cl.length - bad;
  out += `### ${f.id} ${f.name} (${cl.length - bad}/${cl.length})\n\n| Klaim | Pernyataan | Desktop | Mobile | Umum |\n|---|---|---|---|---|\n`;
  for (const c of cl) out += `| ${c.id} | ${c.text.replace(/\|/g, '/')} | ${mark(c.d)} | ${mark(c.m)} | ${mark(c.s)} |\n`;
  out += '\n';
}
out = out.replace('Setiap fitur', `**Ringkasan: ${claims} klaim, ${pass} lulus, ${fail} gagal; ${features.length - noClaims.length} dari ${features.length} fitur punya klaim.**\n\nSetiap fitur`);
fs.writeFileSync(root + '/docs/TRACE.md', out);
console.log(`claims=${claims} pass=${pass} fail=${fail} features=${features.length} withoutClaims=${noClaims.join(',') || '-'} rawItems=${items.length}`);
