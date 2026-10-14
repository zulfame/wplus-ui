// "Di mana diatur" column: every "WPlus UI: Section > Label" path named in FITUR.md exists in the real Customizer, in that section, with that label.
import * as L from './lib.mjs';
import fs from 'fs';
const { wp, claim, summary, root } = L;
const reg = JSON.parse(wp(`require_once ABSPATH.WPINC.'/class-wp-customize-manager.php';require_once ABSPATH.WPINC.'/class-wp-customize-control.php';$GLOBALS['wp_customize']=new WP_Customize_Manager();wp_set_current_user(1);do_action('customize_register',$GLOBALS['wp_customize']);$m=$GLOBALS['wp_customize'];$o=[];foreach($m->sections() as $s){$o[$s->title]=[];}foreach($m->controls() as $c){$sec=$m->get_section($c->section);if($sec)$o[$sec->title][]=['id'=>$c->id,'label'=>wp_strip_all_tags($c->label),'prio'=>$c->priority,'type'=>$c->type];}foreach($o as &$v){usort($v,fn($a,$b)=>$a['prio']<=>$b['prio']);}echo json_encode($o);`));
const sections = Object.keys(reg).filter((t) => t.startsWith('WPlus UI:'));
fs.writeFileSync('/tmp/customizer-registry.json', JSON.stringify(reg, null, 1));
const fitur = fs.readFileSync(root + '/docs/FITUR.md', 'utf8').split('\n').filter((l) => /^\| [A-N]\d\d \|/.test(l));
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9<>/ ]+/g, ' ').replace(/\s+/g, ' ').trim();
let paths = 0;
for (const row of fitur) {
  const cells = row.split('|').map((c) => c.trim());
  const id = cells[1]; const where = cells[3] || '';
  for (const m of where.matchAll(/WPlus UI: ([A-Za-z ]+?) > ([^;]+)/g)) {
    const sec = 'WPlus UI: ' + m[1].trim(); paths++;
    const labels = (reg[sec] || []).map((c) => norm(c.label));
    claim(id, `bagian "${sec}" ada di Customizer`, sections.includes(sec), sections);
    // split the label list on commas outside parentheses
    const parts = m[2].replace(/\([^)]*\)/g, (x) => x.replace(/,/g, '§')).split(/,|;| \/ /).map((x) => x.replace(/§/g, ',').trim()).filter(Boolean);
    for (let part of parts) {
      part = part.replace(/\s*(semua slot)\s*$/, '').replace(/\s*\(.*?\)\s*$/, '').replace(/ \d+ sampai \d+.*$/, '').replace(/^Popup: .*/, 'Popup:').replace(/^\(.*$/, '');
      if (!part) continue;
      const q = norm(part);
      const hit = labels.some((l) => l.includes(q) || q.includes(l));
      claim(id, `kontrol "${part}" ada di ${sec}`, hit, labels.slice(0, 40));
    }
  }
}
// section order documented in the FITUR.md introduction
const order = JSON.parse(wp(`$m=$GLOBALS['wp_customize'];$o=[];foreach($m->sections() as $s)if(strpos($s->title,'WPlus UI:')===0)$o[]=[$s->priority,$s->title];usort($o,fn($a,$b)=>$a[0]<=>$b[0]);echo json_encode(array_column($o,1));`.replace('$m=$GLOBALS','require_once ABSPATH.WPINC."/class-wp-customize-manager.php";require_once ABSPATH.WPINC."/class-wp-customize-control.php";$GLOBALS["wp_customize"]=new WP_Customize_Manager();wp_set_current_user(1);do_action("customize_register",$GLOBALS["wp_customize"]);$m=$GLOBALS')));
const doc = [...fs.readFileSync(root + '/docs/FITUR.md', 'utf8').matchAll(/^\s+\d+\. (WPlus UI: [A-Za-z ]+?)(?: \(|$)/gm)].map((m) => m[1].trim());
claim('Urutan', 'urutan bagian WPlus UI di Customizer sama dengan daftar di FITUR.md', JSON.stringify(order) === JSON.stringify(doc), { order, doc });
console.log('paths checked:', paths, ' sections:', sections.join(' | '));
summary();
