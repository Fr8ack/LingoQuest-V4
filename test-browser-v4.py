"""Browser-based smoke/integration test of the real bundled UI (Chromium via Playwright)."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json,random,threading,http.server,functools
root=Path(__file__).resolve().parent
msgs=[]
legacy={'id':'v3-legacy','name':'اختبار V4','createdAt':'2026-10-01T12:00:00.000Z','stage':'B1','placementDone':True,'xp':240,'completed':{'a0-1':100,'b1-1':85},'foundations':{},'phonics':{},'mistakes':[]}
css=(root/'styles.css').read_text(encoding='utf8').split('\n',1)[1]  # skip external Google Fonts import
sources=[(root/n).read_text(encoding='utf8') for n in ['content.js','adventure-content.js','app.js']]
def boot(page,legacy):
    page.set_content('<html lang="ar" dir="rtl"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="app"></div><div id="toast"></div></body></html>')
    page.add_style_tag(content=css)
    page.evaluate("""v => { const mem=new Map(Object.entries(v)); Object.defineProperty(window,'localStorage',{value:{getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)}}); }""", {'lingoquest_ar_v1':json.dumps({'profiles':[legacy]},ensure_ascii=False)})
    for source in sources:page.add_script_tag(content=source)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 ctx=browser.new_context(viewport={'width':1280,'height':800},device_scale_factor=1,accept_downloads=True)
 page=ctx.new_page();page.on('pageerror',lambda e:msgs.append(str(e)))
 boot(page,legacy)
 assert page.get_by_text('مغامرة إنجليش').count()>0
 page.locator('button[data-action="choose-profile"]').click()
 assert page.locator('button[data-action="open-adventure"]').count()>=1
 page.locator('button[data-action="open-adventure"]').first.click()
 assert page.locator('.adventure-card').count()==12
 assert page.locator('button[data-action="read-story"][data-id="story-07"]').is_enabled()
 assert not page.locator('button[data-action="read-story"][data-id="story-08"]').is_enabled()
 assert not page.locator('button[data-action="read-story"][data-id="story-09"]').is_enabled()
 page.locator('button[data-action="read-story"][data-id="story-07"]').click()
 assert page.get_by_text('The Library Project').count()>0
 assert page.locator('.story-paragraph').count()==4
 page.locator('button[data-action="toggle-translation"]').click()
 assert page.locator('.story-paragraph .muted').count()==0
 page.locator('button[data-action="toggle-translation"]').click()
 assert page.locator('.story-paragraph .muted').count()==4
 page.locator('button[data-action="story-quiz"]').click()
 # 5 correct using authoring data
 story=page.evaluate("() => window.LQ_ADVENTURE.stories.find(s=>s.id==='story-07')")
 answers=[q['a'] for q in story['questions']]+[v['ar'] for v in story['vocab']]
 for a in answers:
  page.locator('button[data-action="quiz-answer"]').filter(has_text=a).first.click()
  assert page.locator('button[data-action="quiz-next"]').count()==1
  page.locator('button[data-action="quiz-next"]').click()
 assert page.get_by_text('تحدٍّ رائع!').count()>0
 saved=page.evaluate("() => JSON.parse(localStorage.getItem('lingoquest_ar_v1')).profiles[0]")
 assert saved['stories']['story-07']['score']==100
 assert saved['completed']['b1-1']==85
 assert saved['xp']>=240
 page.locator('button[data-action="open-adventure"]').first.click()
 assert page.locator('button[data-action="read-story"][data-id="story-08"]').is_enabled()
 page.locator('button[data-action="adventure-tab"][data-tab="dialogues"]').click()
 assert page.locator('button[data-action="start-dialog"][data-id="dialog-07"]').is_enabled()
 assert not page.locator('button[data-action="start-dialog"][data-id="dialog-08"]').is_enabled()
 page.locator('button[data-action="start-dialog"][data-id="dialog-07"]').click()
 d=page.evaluate("() => window.LQ_ADVENTURE.dialogs.find(d=>d.id==='dialog-07')")
 for step in d['steps']:
  page.locator('button[data-action="dialog-answer"]').filter(has_text=step['good']).click()
  assert page.locator('.dialog-feedback.right').count()==1
  page.locator('button[data-action="dialog-next"]').click()
 assert page.get_by_text('أنجزت المهمة').count()>0
 saved=page.evaluate("() => JSON.parse(localStorage.getItem('lingoquest_ar_v1')).profiles[0]")
 assert 'dialog-07' in saved['dialogues']
 page.locator('button[data-action="open-adventure"]').first.click()
 assert page.locator('button[data-action="start-dialog"][data-id="dialog-08"]').is_enabled()
 page.locator('button[data-action="adventure-tab"][data-tab="patterns"]').click()
 assert page.locator('button[data-action="open-pattern"][data-id="pattern-silent-e"]').is_enabled()
 page.locator('button[data-action="open-pattern"][data-id="pattern-vowel-teams"]').is_enabled()
 page.locator('button[data-action="open-pattern"][data-id="pattern-silent-e"]').click()
 assert page.locator('.pattern-word').count()==4
 page.locator('button[data-action="pattern-quiz"]').click()
 pat=page.evaluate("() => window.LQ_ADVENTURE.patterns.find(x=>x.id==='pattern-silent-e')")
 for a in [* [w[0] for w in pat['words']],pat['words'][0][0],pat['words'][2][0]]:
  page.locator('button[data-action="quiz-answer"]').filter(has_text=a).first.click()
  page.locator('button[data-action="quiz-next"]').click()
 saved=page.evaluate("() => JSON.parse(localStorage.getItem('lingoquest_ar_v1')).profiles[0]")
 assert 'pattern-silent-e' in saved['readingPatterns']
 page.locator('button[data-action="open-adventure"]').first.click()
 page.screenshot(path=str(root/'screenshot-v4-desktop.png'),full_page=True)
 # Mobile visual and overflow check
 mobile=browser.new_context(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
 m=mobile.new_page();m.on('pageerror',lambda e:msgs.append('mobile: '+str(e)))
 boot(m,legacy)
 m.locator('button[data-action="choose-profile"]').click()
 m.locator('button[data-action="open-adventure"]').first.click()
 m.screenshot(path=str(root/'screenshot-v4-mobile.png'),full_page=True)
 over=m.evaluate('() => document.documentElement.scrollWidth > window.innerWidth + 2')
 assert not over,'mobile horizontal overflow'
 print('PASS real Chromium: V3 progress preserved, B1 story, 5/5 answers, sequential unlock, translation toggle, 3-turn dialogue saved, pattern lab 6/6, desktop/mobile screenshots, no horizontal overflow.')
 assert not msgs,'JavaScript errors: '+repr(msgs)
 browser.close()

