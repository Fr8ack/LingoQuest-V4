// LingoQuest V4 — original adventure dataset integrity checks.
import fs from 'node:fs';
import vm from 'node:vm';
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('./content.js',import.meta.url),'utf8'),ctx);
vm.runInNewContext(fs.readFileSync(new URL('./adventure-content.js',import.meta.url),'utf8'),ctx);
const {stages}=ctx.window.LQ_CONTENT;
const {stories,dialogs,patterns}=ctx.window.LQ_ADVENTURE;
const levels=new Set(stages.map(s=>s.id));
const issues=[],check=(c,msg)=>{if(!c)issues.push(msg)};
const allIds=new Set();
for(const [kind,items,n] of [['story',stories,12],['dialogue',dialogs,12],['pattern',patterns,5]]){
  check(items.length===n,`${kind}: expected ${n} got ${items.length}`);
  for(const item of items){
    check(!allIds.has(item.id),`duplicate ${item.id}`);allIds.add(item.id);
    check(levels.has(item.stage),`${item.id}: unknown stage`);
    check(typeof item.title==='string'&&item.title.trim()||kind==='pattern',`${item.id}: missing title`);
    check(typeof item.titleAr==='string'||kind==='pattern',`${item.id}: missing Arabic label`);
    if(kind==='story'){
      check(item.paras.length>=3,`${item.id}: insufficient reading`);
      check(item.vocab.length===2,`${item.id}: expected 2 vocabulary challenges`);
      check(item.questions.length===3,`${item.id}: expected 3 comprehension questions`);
      for(const p of item.paras)check(p.en.length>=15&&p.ar.length>=6,`${item.id}: untranslated paragraph`);
      for(const q of item.questions){
        check(q.options.length===3&&new Set(q.options).size===3,`${item.id}: invalid options`);
        check(q.options.includes(q.a),`${item.id}: answer missing`);
      }
    } else if(kind==='dialogue'){
      check(item.steps.length===3,`${item.id}: expected 3 dialogue turns`);
      for(const [i,s] of item.steps.entries()){
        check(s.bot.length>=10&&s.hint.length>=5,`${item.id}/${i}: missing question/translation`);
        check(s.wrong.length===2,`${item.id}/${i}: missing distractors`);
        check(new Set([s.good,...s.wrong]).size===3,`${item.id}/${i}: duplicate dialogue options`);
        check(s.reply.length>3&&s.explain.length>3,`${item.id}/${i}: no correction`);
      }
    } else {
      check(item.words.length===4,`${item.id}: must have 4 practice words`);
      check(new Set(item.words.map(w=>w[0])).size===4,`${item.id}: repeated words`);
      check(new Set(item.words.map(w=>w[1])).size===4,`${item.id}: repeated translation meaning`);
      check(item.explain.length>25,`${item.id}: insufficient phonics explanation`);
    }
  }
}
for(const st of stages){
  check(stories.filter(s=>s.stage===st.id).length===2,`${st.id}: expected 2 stories`);
  check(dialogs.filter(s=>s.stage===st.id).length===2,`${st.id}: expected 2 dialogues`);
}
if(issues.length){console.error('FAILED\n'+issues.map(s=>' - '+s).join('\n'));process.exitCode=1;}
else console.log(`PASS V4: ${stories.length} original graded stories, ${stories.reduce((n,s)=>n+s.questions.length+s.vocab.length,0)} comprehension/vocabulary prompts, ${dialogs.length} dialogues with ${dialogs.reduce((n,d)=>n+d.steps.length,0)} decision turns, ${patterns.length} phonics labs (30 questions).`);
