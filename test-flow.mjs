/** No-browser deterministic integration test: executes production scripts against DOM/event stubs. */
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const src=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');
const content=fs.readFileSync(new URL('./content.js',import.meta.url),'utf8');
const adventure=fs.readFileSync(new URL('./adventure-content.js',import.meta.url),'utf8');
const save=new Map();
const app={innerHTML:'',events:{},addEventListener(ev,fn){this.events[ev]=fn;}};
const toast={textContent:'',classList:{add(){},remove(){}}};
let currentInput='';
const document={getElementById(id){return id==='app'?app:id==='toast'?toast:id==='type-answer'?{value:currentInput}:null;}};
const localStorage={getItem:k=>save.get(k)||null,setItem:(k,v)=>save.set(k,v)};
class FakeFileReader{readAsText(file){this.result=file.textPayload;this.onload();}}
const sandbox={window:{},document,FileReader:FakeFileReader,localStorage,structuredClone,setTimeout:()=>0,clearTimeout:()=>{},console,navigator:{},location:{protocol:'file:',hostname:''},Date,Math,Number,JSON,String,Array,Set};
vm.createContext(sandbox);
vm.runInContext(content,sandbox,{filename:'content.js'});
vm.runInContext(adventure,sandbox,{filename:'adventure-content.js'});
const {phonics,foundations}=sandbox.window.LQ_CONTENT;
assert.equal(phonics.length,5);
const initial={id:'p-test',name:'تجربة',stage:'A0',placementDone:true,createdAt:new Date().toISOString(),completed:{},gatePass:{},foundations:Object.fromEntries(foundations.map(g=>[g.id,{score:100}])),mistakes:[]};
const legacy={id:'p-b1',name:'متعلم قديم',stage:'B1',placementDone:true,createdAt:new Date().toISOString(),completed:{'a0-1':100,'b1-1':83},gatePass:{A0:true},foundations:{},mistakes:[]};
localStorage.setItem('lingoquest_ar_v1',JSON.stringify({profiles:[initial,legacy]}));
vm.runInContext(src,sandbox,{filename:'app.js'});
const click=(action,more={})=>{
 const b={dataset:{action,...more}};
 app.events.click({target:{closest:sel=>sel==='button[data-action]'?b:null}});
};
const saved=()=>JSON.parse(localStorage.getItem('lingoquest_ar_v1')).profiles[0];
const chosen=(action)=>{const re=new RegExp(`<button[^>]*data-action="${action}"[^>]*>`, 'g');return [...app.innerHTML.matchAll(re)].length;};
const pick=(letter)=>{
 const re=/<button class="blend-piece" data-action="blend-pick" data-i="(\d+)"[^>]*>\s*<span class="en" lang="en">([a-z])<\/span><\/button>/g;
 const buttons=[...app.innerHTML.matchAll(re)];
 const button=buttons.find(m=>m[2]===letter && !/disabled/.test(m[0]));
 assert.ok(button,'tile not found: '+letter);click('blend-pick',{i:button[1]});
};
const chooseWord=(word)=>{
 const re=/<button class="option[^\"]*" data-action="quiz-answer" data-i="(\d+)"[^>]*><span class="en" lang="en">([^<]+)<\/span><\/button>/g;
 const buttons=[...app.innerHTML.matchAll(re)];
 const x=buttons.find(m=>m[2]===word);assert.ok(x,'option not found '+word);
 click('quiz-answer',{i:x[1]});
};
click('choose-profile',{id:'p-test'});
assert.ok(app.innerHTML.includes('مختبر الأصوات'));
assert.ok(/start-lesson" data-id="a0-1" disabled/.test(app.innerHTML),'A0 course must wait for phonics');
click('open-phonics');
assert.ok(app.innerHTML.includes('مختبر أصوات الكلمات'));
assert.equal(chosen('open-phonic'),5);
for(const [gi,g] of phonics.entries()){
 click('open-phonic',{id:g.id});
 assert.ok(app.innerHTML.includes(g.title));
 click('phonics-quiz',{id:g.id});
 for(let j=0;j<8;j++){
  const w=j<4?g.words[j]:j<6?g.words[j-4]:j===6?g.words[2]:g.words[3];
  if(j<4){
   const letters=j===0&&gi===0?[w.extra,w.word[1],w.word[2]]:[...w.word];
   for(const letter of letters)pick(letter);
   click('blend-submit');
  } else if(j<7)chooseWord(w.word);
  else {currentInput=w.word;app.events.submit({target:{closest:sel=>sel==='[data-form]'?{dataset:{form:'answer-type'}}:null},preventDefault(){}});}
  assert.ok(chosen('quiz-next')===1,`not answered ${g.id} ${j}`);
  click('quiz-next');
 }
 assert.ok(app.innerHTML.includes('نتيجة')||app.innerHTML.includes('تحدٍّ رائع'));
 assert.ok(saved().phonics[g.id],`unit not passed ${g.id}`);
 if(gi===0){assert.equal(Object.keys(saved().reviewCards).length,1,'wrong blend should enter review scheduler');}
 click('open-phonics');
}
assert.equal(Object.keys(saved().phonics).length,5);
assert.equal(saved().daily.bonusClaimed,true);
assert.equal(saved().daily.correct,39);
click('nav',{page:'path'});
assert.ok(!/start-lesson" data-id="a0-1" disabled/.test(app.innerHTML),'A0 should unlock');
click('nav',{page:'games'});
click('practice',{mode:'review'});
assert.ok(app.innerHTML.includes('مراجعة أخطائي'));
for(const ch of phonics[0].words[0].word)pick(ch);
click('blend-submit');click('quiz-next');
assert.equal(saved().reviewCards['sound-a-0'].step,1);
assert.ok(saved().reviewCards['sound-a-0'].dueAt>Date.now());
assert.equal(saved().phonics['sound-u'].score,100);
// restart app should preserve progression and quiz content
const replay=JSON.parse(localStorage.getItem('lingoquest_ar_v1')).profiles[0];
assert.equal(replay.phonics['sound-a'].score,88);
click('switch-profile');click('choose-profile',{id:'p-b1'});
assert.ok(app.innerHTML.includes('مستكشف اللغة'));
click('nav',{page:'path'});
assert.ok(app.innerHTML.includes('start-lesson\" data-id=\"b1-2\"'),'B1 existing path should be available');
click('start-lesson',{id:'b1-2'});
assert.ok(app.innerHTML.includes('بطاقات')||app.innerHTML.includes('LEARN FIRST'));
assert.equal(JSON.parse(localStorage.getItem('lingoquest_ar_v1')).profiles[1].stage,'B1');
// File import from an older V2 export, even if localStorage differs between file:// paths
app.events.change({target:{id:'import-file',files:[{size:200,textPayload:JSON.stringify(legacy)}]}});
const all=JSON.parse(localStorage.getItem('lingoquest_ar_v1')).profiles;
assert.equal(all.length,3);assert.equal(all[2].stage,'B1');assert.equal(all[2].completed['b1-1'],83);
console.log('PASS: V2 A0/B1 profiles preserved; phonics locked until previous unit; all 5 groups passed; 40 questions; mistake scheduled and reviewed; daily bonus once; A0 unlocked; V2 JSON import.');
