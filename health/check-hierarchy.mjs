/**
 * Health Compass information architecture regression checks.
 * Run: node health/check-hierarchy.mjs
 *
 * /health/                  = general topic hub (no prostate guide library)
 * /health/prostate/         = the single prostate topic entry (six article cards)
 * /health/prostate/<guide>/ = full guides
 *
 * Expand the topics list when new *complete* topic pages exist.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');
const hub = read('health/index.html');
const prostate = read('health/prostate/index.html');
const count = (s, re) => [...s.matchAll(re)].length;
const guides = [
  'rising-psa', 'tests-explained', 'active-surveillance',
  'treatment-decisions', 'recovery-follow-up', 'insurance-access'
];
function checkLinks(s, page) {
  for (const [, fragment] of s.matchAll(/href="#([^"]+)"/g)) {
    assert(s.includes('id="' + fragment + '"'), page + ' has broken anchor #' + fragment);
  }
}
assert(hub.includes('<h1>Understand your health.'), 'Health root must remain the general health hub');
assert(hub.includes('id="topics"'), 'Health root must show its topic entrypoint');
assert(hub.includes('id="approach"'), 'Health root must explain the editorial approach');
assert.equal(count(hub, /class="guide-library-card"/g), 0, 'Health root must never duplicate article cards');
assert.equal(count(hub, /class="topic-feature topic-feature-with-anatomy"/g), 1, 'One current prostate topic tile expected');
assert.equal(count(hub, /href="\/health\/prostate\/"/g), 1, 'Root must link once from topic tile to prostate hub');
assert(!hub.includes('guide-library-section'), 'Article library must be on topic page, not general homepage');
assert(!hub.includes('Prostate health · Practical guides'), 'Remove prostate-specific content from site root');
assert.equal(count(prostate, /class="v21-topic-card"/g), 6, 'Prostate topic must have exactly six primary category cards');
assert.equal(count(prostate, /class="guide-library-card"/g), 0, 'Do not keep a competing flagship card grid');
assert.equal(count(prostate, /class="v2-card"/g), 0, 'Do not keep an Explore Further category grid');
assert(!prostate.includes('Explore further') && !prostate.includes('The practical prostate guide library'), 'Old overlapping navigation headings must be removed');
const categories=['basics','screening','diagnosis','treatments','living-well','research'];
for(const slug of categories){
 const href='/health/prostate/'+slug+'/';
 assert(prostate.includes('href="'+href+'"'),'Missing primary category '+href);
 assert(existsSync(new URL('health/prostate/'+slug+'/index.html',root)),'Missing pillar '+slug);
 const pillar=read('health/prostate/'+slug+'/index.html');
 assert(count(pillar, /id="pillar-\\d+"/g)>=6,'Category lacks substantive sections '+slug);
}
for (const slug of guides) {
  const href = '/health/prostate/' + slug + '/';
  const category=slug==='rising-psa'?'screening':slug==='tests-explained'?'diagnosis':slug==='recovery-follow-up'?'living-well':'treatments';
  const pillar=read('health/prostate/'+(slug==='insurance-access'?'treatments':category)+'/index.html');
  assert(pillar.includes('href="' + href + '"'), 'Flagship guide must remain discoverable from a relevant category: ' + href);
  assert(existsSync(new URL('health/prostate/' + slug + '/index.html', root)), 'Missing article file: ' + href);
  assert(!hub.includes('href="' + href + '"'), 'Root must not link directly to a prostate article: ' + href);
}
checkLinks(hub, 'Men\'s Health homepage');
checkLinks(prostate, 'Prostate topic page');
console.log('Health Compass v2.1 hierarchy: PASS (general hub → one six-category prostate home → deep guides)');
