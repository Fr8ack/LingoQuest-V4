// Run: node validate-content.mjs
// Pure data integrity check for bundled lessons and placement quiz.
import fs from 'node:fs';
import vm from 'node:vm';
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('./content.js',import.meta.url),'utf8'),sandbox);
const {stages,lessons,placement,alphabet,foundations,alphabetNotes,pronunciation,phonics}=sandbox.window.LQ_CONTENT;
const errors=[];
const assert=(ok,what)=>{if(!ok)errors.push(what)};
const ids=new Set();
assert(stages.length===6,`expected six stages got ${stages.length}`);
assert(placement.length===24,`expected 24 placement questions got ${placement.length}`);
assert(alphabet.length===26,`expected 26 letters got ${alphabet.length}`);
assert(phonics.length===5,`expected five sound groups got ${phonics.length}`);
assert(phonics.map(g=>g.vowel).join('')==='aeiou','phonics short vowel coverage wrong');
for(const g of phonics){
 assert(g.words.length===4,`${g.id}: expected four original words`);
 assert(new Set(g.words.map(w=>w.word)).size===4,`${g.id}: duplicate words`);
 for(const w of g.words){assert(w.word.length===3&&w.word[1]===g.vowel,`${g.id}: not CVC ${w.word}`);assert(w.parts.length===3&&w.extra&&!w.word.includes(w.extra),`${g.id}: invalid phoneme / distractor ${w.word}`);}
}
assert(foundations.length===4,`expected four foundation groups got ${foundations.length}`);
assert(foundations.map(g=>g.letters).join('')==='ABCDEFGHIJKLMNOPQRSTUVWXYZ','foundation letter order or coverage invalid');
for(const g of foundations)assert(g.letters.length>=6 && g.letters.length<=7,`incorrect group size ${g.id}`);
assert(Object.keys(alphabetNotes).length===26,'alphabet guidance missing a letter');
const types=['choice','listen','type','order','match'];
for(const stage of stages){
 const ls=lessons.filter(l=>l.stage===stage.id);
 assert(ls.length===2,`${stage.id}: expected 2 lessons, got ${ls.length}`);
 assert(Array.isArray(pronunciation[stage.id])&&pronunciation[stage.id].length>0,`${stage.id}: no pronunciation items`);
}
for(const l of lessons){
 assert(!ids.has(l.id),`${l.id}: duplicate id`);ids.add(l.id);
 assert(stages.some(s=>s.id===l.stage),`${l.id}: unknown stage`);
 assert(l.items.length>=6,`${l.id}: too few questions`);
 assert(l.cards.length>=4,`${l.id}: too few teaching cards`);
 for(const [i,q] of l.items.entries()){
  const key=`${l.id}[${i}]`;
  assert(types.includes(q.type),`${key}: unknown question type`);
  assert(typeof q.q==='string'&&q.q.length>3,`${key}: empty question`);
  assert(typeof q.explain==='string'&&q.explain.trim(),`${key}: missing explanation`);
  if(q.type==='choice'||q.type==='listen'){
   assert(q.options.length===4,`${key}: expected 4 options`);
   assert(q.options.includes(q.a),`${key}: answer missing from options`);
   assert(new Set(q.options).size===q.options.length,`${key}: repeated options`);
  }
  if(q.type==='listen')assert(typeof q.say==='string'&&q.say.trim(),`${key}: missing audio text`);
  if(q.type==='type')assert(Array.isArray(q.answers)&&q.answers.length>0,`${key}: missing spelling answer`);
  if(q.type==='order'){
   const list=q.words,sep=list.every(w=>w.length===1)?'':' ';
   const norm=v=>v.toLowerCase().replace(/[‘’']/g,'').replace(/[.,!?]/g,'').replace(/\s+/g,' ').trim();
   const canSolve=(chosen=[],left=list.map((_,i)=>i))=>!left.length?norm(chosen.map(i=>list[i]).join(sep))===norm(q.answer):left.some(j=>canSolve([...chosen,j],left.filter(z=>z!==j)));
   assert(canSolve(),`${key}: order puzzle unsolvable`);
  }
  if(q.type==='match'){
   assert(q.pairs.length>=3,`${key}: expected at least 3 pairs`);
   assert(new Set(q.pairs.map(p=>p[1])).size===q.pairs.length,`${key}: duplicate match targets`);
  }
 }
}
for(const [i,q] of placement.entries()){
 assert(['A0','B1','C1'].includes(q.stage),`placement[${i}]: invalid band`);
 assert(q.options?.includes(q.a),`placement[${i}]: answer absent`);
}
if(errors.length){console.error('FAILED:\n'+errors.map(s=>' - '+s).join('\n'));process.exit(1)}
console.log(`PASS: ${stages.length} stages, ${lessons.length} lessons, ${lessons.reduce((n,l)=>n+l.items.length,0)} lesson challenges, ${placement.length} placement questions, ${alphabet.length} letters, ${foundations.length} foundation sets, 6 promotion gates, ${phonics.length} sound labs, ${phonics.reduce((sum,g)=>sum+g.words.length,0)} original CVC words, ${phonics.length*8} phonics challenges.`);
