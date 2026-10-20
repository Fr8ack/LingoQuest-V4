/* LingoQuest AR — Arabic-first English learning content. All content is locally bundled. */
window.LQ_CONTENT = (() => {
  const stages = [
    {id:'A0',group:'مبتدئ',name:'الانطلاقة',emoji:'🌱',subtitle:'الحروف والكلمات الأولى',color:'#54c5a2'},
    {id:'A1',group:'مبتدئ',name:'خطواتي الأولى',emoji:'🐣',subtitle:'المفردات والجمل اليومية',color:'#70b5f4'},
    {id:'A2',group:'مبتدئ',name:'أتكلم بثقة',emoji:'🦋',subtitle:'الروتين والأحداث الماضية',color:'#9c8dff'},
    {id:'B1',group:'متوسط',name:'مستكشف اللغة',emoji:'🧭',subtitle:'الرأي والنصيحة ورواية القصص',color:'#e7a259'},
    {id:'B2',group:'متقدم',name:'قائد الحوار',emoji:'🚀',subtitle:'التحليل والافتراض والحجة',color:'#eb7da6'},
    {id:'C1',group:'متقدم',name:'المحترف',emoji:'👑',subtitle:'الدقة والأسلوب والتفكير النقدي',color:'#a2a6ff'}
  ];
  const c = (q,options,a,explain,skill='vocab') => ({type:'choice',q,options,a,explain,skill});
  const l = (say,q,options,a,explain) => ({type:'listen',say,q,options,a,explain,skill:'listening'});
  const t = (q,answers,hint,explain,skill='writing') => ({type:'type',q,answers,hint,explain,skill});
  const o = (q,words,answer,explain) => ({type:'order',q,words,answer,explain,skill:'grammar'});
  const m = (q,pairs,explain) => ({type:'match',q,pairs,explain,skill:'vocab'});
  const lessons = [
    {id:'a0-1',stage:'A0',title:'الحروف والأصوات',icon:'🔤',time:6,goal:'تميّز بعض الحروف وأصواتها والكلمات الأولى',cards:[['A a','Apple 🍎'],['B b','Book 📘'],['C c','Cat 🐱'],['D d','Dog 🐶']],items:[
      c('أي حرف يأتي بعد B؟',['D','C','A','F'],'C','ترتيب الحروف: A, B, C, D.'),
      l('cat','استمع، ما الكلمة التي سمعتها؟',['Dog','Cat','Book','Sun'],'Cat','Cat تعني قط.'),
      m('طابق الكلمة الإنجليزية بمعناها',[['Apple','تفاحة'],['Book','كتاب'],['Cat','قط']],'ربط المعنى بالصوت يساعد على التذكر.'),
      c('اختر الحرف الأول في كلمة Dog',['B','D','T','G'],'D','Dog تبدأ بحرف D.'),
      t('اكتب كلمة «قطة» بالإنجليزية',['cat'],'تبدأ بـ C','Cat = قطة.'),
      o('رتّب الحروف لتكوّن كلمة «كتاب»',['o','B','k','o'],'Book','ترتيب الحروف B-o-o-k.')
    ]},
    {id:'a0-2',stage:'A0',title:'التحيات والتعارف',icon:'👋',time:6,goal:'تسلّم على الآخرين وتعرّف بنفسك',cards:[['Hello','مرحبًا 👋'],['My name is','اسمي'],['Thank you','شكرًا'],['Goodbye','إلى اللقاء']],items:[
      c('كيف تقول «مرحبًا»؟',['Goodbye','Hello','Sorry','Thanks'],'Hello','Hello هي تحية.'),
      l('Thank you','استمع واختر المعنى الصحيح',['شكرًا','مرحبًا','عفوًا','تصبح بخير'],'شكرًا','Thank you = شكرًا.'),
      o('رتّب جملة التعارف',['Ali','is','name','My'],'My name is Ali','My name is... للتعريف بالاسم.'),
      m('صِل التحية بمعناها',[['Hello','مرحبًا'],['Goodbye','مع السلامة'],['Please','من فضلك']],'تُستخدم هذه الكلمات يوميًا.'),
      t('أكمل التحية: Good ___',['morning'],'الكلمة تعني صباح','Good morning = صباح الخير.'),
      c('When someone says “Thank you”, you can reply…',['Good night','You’re welcome','My name','Blue'],'You’re welcome','You’re welcome = العفو.', 'grammar')
    ]},
    {id:'a1-1',stage:'A1',title:'بيتي وعائلتي',icon:'🏠',time:7,goal:'تصف أفراد العائلة وأغراض المنزل',cards:[['mother','أم'],['brother','أخ'],['kitchen','مطبخ'],['window','نافذة']],items:[
      c('معنى كلمة brother هو…',['أخت','أخ','أب','عم'],'أخ','brother = أخ.'),
      l('kitchen','أي مكان سمعته؟',['bedroom','kitchen','school','garden'],'kitchen','kitchen = مطبخ.'),
      m('صِل الكلمات بمعانيها',[['mother','أم'],['window','نافذة'],['house','منزل']],'لاحظ الفرق بين أسماء الأشخاص والأماكن.'),
      o('رتّب الجملة',['is','This','my','father'],'This is my father','This is my ... للتعريف بشخص.'),
      c('She ___ my sister.',['am','are','is','be'],'is','نستخدم is مع She.', 'grammar'),
      t('اكتب كلمة «عائلة» بالإنجليزية',['family'],'تبدأ بـ f','Family = عائلة.')
    ]},
    {id:'a1-2',stage:'A1',title:'طعامي ومدرستي',icon:'🍎',time:7,goal:'تطلب الطعام وتتحدث عن ما تحبه',cards:[['water','ماء'],['rice','أرز'],['hungry','جائع'],['I like','أنا أحب']],items:[
      l('I like apples','ما الجملة المسموعة؟',['I like apples','I have a book','I am tired','I like milk'],'I like apples','I like = أنا أحب.'),
      c('I am thirsty. I want…',['water','a pencil','a chair','a door'],'water','Thirsty = عطشان.'),
      o('رتّب جملة صحيحة',['like','I','rice'],'I like rice','الفعل يأتي بعد الفاعل.'),
      m('طابق الكلمات',[['hungry','جائع'],['water','ماء'],['teacher','معلم']],'أعد الاستماع إليها بصوت عالٍ.'),
      c('He ___ an apple every day.',['eat','eats','eating','ate'],'eats','مع he/she/it نضيف s في المضارع البسيط.', 'grammar'),
      t('أكمل: I ___ English. (أدرس)',['study'],'s _ _ d y','I study English.')
    ]},
    {id:'a2-1',stage:'A2',title:'يومي المعتاد',icon:'⏰',time:8,goal:'تصف الروتين والتكرار والمواعيد',cards:[['usually','عادةً'],['sometimes','أحيانًا'],['breakfast','إفطار'],['before','قبل']],items:[
      c('“Usually” means…',['أبدًا','عادةً','غدًا','قريبًا'],'عادةً','Usually تصف ما يحدث في معظم الأوقات.'),
      l('I usually wake up at six','ما التوقيت الذي سمعته؟',['six','seven','eight','nine'],'six','at six = عند السادسة.'),
      o('رتّب الجملة',['go','I','usually','to school','early'],'I usually go to school early','ظرف التكرار عادةً قبل الفعل الأساسي.'),
      m('طابق مفردات الروتين',[['before','قبل'],['after','بعد'],['always','دائمًا']],'استخدمها لوصف يومك.'),
      c('She ___ to work by bus.',['go','goes','going','gone'],'goes','goes مع she في المضارع البسيط.','grammar'),
      t('أكمل: I eat ___ at 7 a.m. (الفطور)',['breakfast'],'تبدأ بـ b','breakfast = وجبة الفطور.')
    ]},
    {id:'a2-2',stage:'A2',title:'ماذا حدث أمس؟',icon:'📅',time:8,goal:'تستخدم الماضي البسيط لوصف أحداث قصيرة',cards:[['yesterday','أمس'],['visited','زار'],['went','ذهب'],['last week','الأسبوع الماضي']],items:[
      c('Past tense of “go” is…',['goed','going','went','goes'],'went','go → went فعل غير منتظم.','grammar'),
      l('I visited my grandmother yesterday','متى حدثت الزيارة؟',['غدًا','اليوم','أمس','بعد أسبوع'],'أمس','yesterday = أمس.'),
      o('رتّب الجملة بالماضي',['played','yesterday','football','We'],'We played football yesterday','Played فعل في الماضي.'),
      m('طابق الفعل بماضيه',[['go','went'],['eat','ate'],['see','saw']],'تُحفظ الأفعال غير المنتظمة تدريجيًا.'),
      c('They ___ a movie last night.',['watch','watched','watches','watching'],'watched','last night قرينة للماضي البسيط.','grammar'),
      t('اكتب ماضي الفعل «visit»',['visited'],'أضف ed','visit → visited.')
    ]},
    {id:'b1-1',stage:'B1',title:'أفكاري وآرائي',icon:'💬',time:9,goal:'تعبّر عن الرأي وتبرر اختيارك',cards:[['In my opinion','في رأيي'],['because','لأن'],['although','مع أن'],['advantage','ميزة']],items:[
      c('“In my opinion” introduces…',['an order','a personal view','a date','an apology'],'a personal view','هي عبارة للتعبير عن الرأي.'),
      l('Although it was raining, we went out','هل خرجوا رغم المطر؟',['نعم','لا','غير معروف','خرجوا غدًا'],'نعم','Although تشير إلى مفارقة.'),
      o('رتّب جملة تعبر عن رأي',['reading','I think','is useful'],'I think reading is useful','I think ... يستخدم للتعبير عن وجهة نظر.'),
      m('طابق روابط المعنى',[['because','لأن'],['however','مع ذلك'],['therefore','لذلك']],'الروابط تصنع نقاشًا مترابطًا.'),
      c('He studied hard; ___, he passed.',['however','therefore','although','despite'],'therefore','therefore تربط السبب بالنتيجة.','grammar'),
      t('أكمل: ___ my opinion, practice matters.',['in'],'حرف جر من حرفين','In my opinion.')
    ]},
    {id:'b1-2',stage:'B1',title:'نصيحة وحكاية',icon:'📖',time:9,goal:'تقدّم نصيحة وتربط أحداث الماضي',cards:[['should','ينبغي'],['used to','اعتاد أن'],['while','بينما'],['suddenly','فجأة']],items:[
      c('You ___ see a doctor if you feel ill.',['should','might to','must to','used'],'should','Should + مصدر الفعل للنصيحة.','grammar'),
      l('I was cooking when the phone rang','ماذا كان يفعل المتحدث؟',['كان يطبخ','كان يركض','كان ينام','كان يقرأ'],'كان يطبخ','was cooking حدث مستمر وقت الرنين.'),
      o('رتّب الجملة',['used to','I','play','outside'],'I used to play outside','Used to تصف عادة ماضية.'),
      m('طابق كلمات الحكاية',[['suddenly','فجأة'],['meanwhile','في الأثناء'],['eventually','في النهاية']],'تُظهر الكلمات تسلسل الأحداث.'),
      c('While I ___, she arrived.',['study','studied','was studying','have studied'],'was studying','while تُستخدم هنا مع فعل مستمر في الماضي.','grammar'),
      t('أكمل النصيحة: You ___ get more sleep.',['should'],'تبدأ بـ s','You should get more sleep.')
    ]},
    {id:'b2-1',stage:'B2',title:'الإقناع والحجج',icon:'⚖️',time:10,goal:'توازن بين حجتين وتستخدم لغة دقيقة',cards:[['nevertheless','مع ذلك'],['evidence','دليل'],['assumption','افتراض'],['consequently','وبالتالي']],items:[
      c('“Nevertheless” is closest to…',['therefore','however','because','for example'],'however','كلاهما قد يقدّم فكرة معاكسة.'),
      l('The evidence does not support that assumption','ما الذي لا يدعمه الدليل؟',['الافتراض','النتيجة المؤكدة','التعليمات','الموعد'],'الافتراض','Assumption تعني افتراضًا.'),
      o('رتّب الجملة',['the evidence','we should','evaluate','carefully'],'we should evaluate the evidence carefully','Evaluate = يقيّم.'),
      m('طابق المصطلحات',[['assumption','افتراض'],['counterargument','حجة مضادة'],['bias','تحيز']],'هذه مصطلحات أساسية للتفكير النقدي.'),
      c('___ the risks, the team proceeded.',['Despite','Although','Because','Unless'],'Despite','Despite + noun phrase.','grammar'),
      t('أكمل: The data is not ___ to prove the claim. (كافية)',['sufficient'],'تبدأ بـ suff','Sufficient evidence = أدلة كافية.')
    ]},
    {id:'b2-2',stage:'B2',title:'الشرط والاحتمالات',icon:'🌌',time:10,goal:'تتحدث عن مواقف افتراضية ونتائجها',cards:[['If I had known','لو كنت أعلم'],['would have','لكان قد'],['unless','ما لم'],['provided that','بشرط أن']],items:[
      c('If I had studied, I ___ passed.',['will have','would have','would','had'],'would have','الشرط الثالث: If + past perfect, would have + past participle.','grammar'),
      l('We will go provided that the weather improves','ما الشرط للخروج؟',['تحسن الطقس','زيادة المال','حضور المعلم','انتهاء العمل'],'تحسن الطقس','Provided that = بشرط أن.'),
      o('رتّب بداية شرط ثالث',['known','If','I had','earlier'],'If I had known earlier','الشرط الثالث يتعلق بماضٍ لم يحدث.'),
      m('طابق عبارات الشرط',[['unless','ما لم'],['otherwise','وإلا'],['provided that','بشرط أن']],'اختيار الرابط يغير العلاقة المنطقية.'),
      c('Unless you hurry, you ___ the train.',['miss','will miss','would miss','missed'],'will miss','Unless = if not، ونستخدم will هنا للنتيجة المستقبلية.','grammar'),
      t('أكمل: If she had left early, she ___ have arrived on time.',['would'],'تبدأ بـ w','would have arrived.')
    ]},
    {id:'c1-1',stage:'C1',title:'الدقة والأسلوب',icon:'✍️',time:11,goal:'تستخدم تراكيب متقدمة وأساليب خطاب رسمية',cards:[['albeit','وإن كان'],['notwithstanding','على الرغم من'],['substantiate','يسند بدليل'],['nuance','دلالة دقيقة']],items:[
      c('“Substantiate a claim” means…',['repeat it','support it with evidence','hide it','translate it'],'support it with evidence','Substantiate تعني إسناد الادعاء بالأدلة.'),
      l('The proposal is promising, albeit costly','كيف وُصف المقترح؟',['واعد لكنه مكلف','رخيص وضعيف','مرفوض تمامًا','غير مكتمل'],'واعد لكنه مكلف','Albeit تضيف قيدًا على الوصف.'),
      o('رتّب تركيبًا رسميًا',['the findings','Not only were','unexpected'],'Not only were the findings unexpected','يتطلب Not only عكس ترتيب الفاعل والفعل المساعد.'),
      m('طابق المفردات',[['nuance','فرق دلالي دقيق'],['plausible','معقول ظاهريًا'],['rigorous','صارم منهجيًا']],'افهم الدقة قبل استخدام المفردة.'),
      c('Rarely ___ such a convincing argument.',['I have heard','have I heard','did heard I','I heard have'],'have I heard','بعد Rarely في أول الجملة يحدث inversion.','grammar'),
      t('أكمل: The argument lacks sufficient ___ . (اتساق)',['coherence'],'تبدأ بـ coh','Coherence = ترابط واتساق.')
    ]},
    {id:'c1-2',stage:'C1',title:'التحليل والنقد',icon:'🧠',time:11,goal:'تميّز الاستنتاجات والتحفظات والاحتمالات',cards:[['inference','استنتاج'],['implication','دلالة ضمنية'],['caveat','تحفّظ'],['concede','يقرّ بنقطة']],items:[
      c('A “caveat” is…',['a warning or qualification','a proven result','a headline','an unrelated story'],'a warning or qualification','Caveat = تحفظ أو شرط يجب أخذه بالحسبان.'),
      l('The conclusion is plausible but not conclusive','أي وصف أدق؟',['محتمل لكنه غير حاسم','خاطئ دائمًا','محسوم نهائيًا','غير منطقي'],'محتمل لكنه غير حاسم','Plausible لا تعني proven.'),
      o('رتّب الجملة النقدية',['does not','correlation','imply','causation'],'correlation does not imply causation','الارتباط لا يثبت السببية.'),
      m('طابق المصطلحات',[['inference','استنتاج'],['implication','دلالة ضمنية'],['concede','يقرّ بنقطة']],'تُستخدم في القراءة التحليلية.'),
      c('Had the data been reliable, the findings ___ stronger.',['would have been','will be','are','had been'],'would have been','صيغة قلب للشرط الثالث مع Had.','grammar'),
      t('أكمل: The findings should be interpreted with ___ . (حذر)',['caution'],'تبدأ بـ caut','With caution = بحذر.')
    ]}
  ];
  const p = (stage,q,options,a,skill='grammar',say='') => ({stage,type:say?'listen':'choice',q,options,a,skill,say,explain:''});
  const placement = [
    p('A0','اختر ترجمة “Book”',['قلم','كتاب','باب','قطة'],'كتاب','vocab'),
    p('A0','استمع واختر الكلمة',['Dog','Sun','Tree','Fish'],'Dog','listening','dog'),
    p('A0','أكمل: I ___ Ali.',['is','am','are','be'],'am'),
    p('A0','أي كلمة تعني «شكرًا»؟',['Hello','Sorry','Thank you','Goodbye'],'Thank you','vocab'),
    p('A0','Choose the correct word: ___ apple.',['a','an','the are','am'],'an'),
    p('A0','Which number comes after five?',['four','seven','six','three'],'six','vocab'),
    p('A0','استمع واختر الترجمة',['صباح الخير','مساء الخير','إلى اللقاء','لو سمحت'],'صباح الخير','listening','Good morning'),
    p('A0','She ___ happy.',['are','is','am','be'],'is'),
    p('B1','He usually ___ early.',['wake','wakes','waking','woke'],'wakes'),
    p('B1','معنى “although” هو…',['لأن','مع أن','إذا','ثم'],'مع أن','vocab'),
    p('B1','Yesterday we ___ a movie.',['watch','watching','watched','watches'],'watched'),
    p('B1','استمع: ماذا حدث قبل وصولها؟',['انتهى العمل','بدأ العمل','سافرت','لم يحضر أحد'],'انتهى العمل','listening','By the time she arrived, the meeting had ended'),
    p('B1','If it rains, we ___ home.',['stayed','will stay','would stay','staying'],'will stay'),
    p('B1','اختر معنى “reliable”',['موثوق','غاضب','معقد','شائع'],'موثوق','vocab'),
    p('B1','I have lived here ___ 2020.',['for','since','ago','during'],'since'),
    p('B1','“Despite the rain, he walked” means…',['He did not walk','He walked even though it rained','It never rained','He took a bus'],'He walked even though it rained','reading'),
    p('C1','Had I known, I ___ differently.',['act','will act','would have acted','had acted'],'would have acted'),
    p('C1','“Mitigate” means…',['worsen','reduce severity','ignore','estimate'],'reduce severity','vocab'),
    p('C1','استمع واختر الفكرة',['الخطة ممكنة لكنها محفوفة بالمخاطر','الخطة مستحيلة','الخطة مجانية','الخطة مكتملة'],'الخطة ممكنة لكنها محفوفة بالمخاطر','listening','The plan is feasible, albeit risky'),
    p('C1','Not until later ___ the mistake.',['we noticed','did we notice','we did notice','have we notice'],'did we notice'),
    p('C1','“Her claim lacks empirical evidence” suggests…',['Her claim is fully proven','Her claim is not backed by observed data','Her claim is popular','Her claim is about grammar'],'Her claim is not backed by observed data','reading'),
    p('C1','The results are ___ with earlier findings.',['consistent','consisting','consist','consistency'],'consistent','vocab'),
    p('C1','Were it not for his help, we ___ failed.',['will have','would have','were','had'],'would have'),
    p('C1','“An implicit assumption” is…',['a clearly stated rule','an unstated belief','a measured outcome','a formal definition'],'an unstated belief','vocab')
  ];
  const alphabet = [['A','Apple','تفاحة','🍎'],['B','Ball','كرة','⚽'],['C','Cat','قطة','🐈'],['D','Dog','كلب','🐕'],['E','Elephant','فيل','🐘'],['F','Fish','سمكة','🐟'],['G','Grapes','عنب','🍇'],['H','House','منزل','🏠'],['I','Ice cream','مثلجات','🍦'],['J','Juice','عصير','🧃'],['K','Key','مفتاح','🔑'],['L','Lion','أسد','🦁'],['M','Moon','قمر','🌙'],['N','Nose','أنف','👃'],['O','Orange','برتقالة','🍊'],['P','Pencil','قلم رصاص','✏️'],['Q','Queen','ملكة','👑'],['R','Rabbit','أرنب','🐇'],['S','Sun','شمس','☀️'],['T','Tree','شجرة','🌳'],['U','Umbrella','مظلة','☂️'],['V','Van','شاحنة صغيرة','🚐'],['W','Water','ماء','💧'],['X','X-ray','أشعة سينية','🩻'],['Y','Yellow','أصفر','🟨'],['Z','Zebra','حمار وحشي','🦓']];
  // Four mastery checkpoints: 26 letters, with uppercase/lowercase and first-word cues.
  // NOTE: spelling and word listening do not replace explicit phonemic instruction.
  const foundations = [
    {id:'letters-1',title:'مجموعة الأصدقاء',range:'A–G',emoji:'🍎',letters:'ABCDEFG',goal:'التعرف إلى أول سبعة أحرف وكتابتها'},
    {id:'letters-2',title:'رحلة الكلمات',range:'H–N',emoji:'🏠',letters:'HIJKLMN',goal:'التمييز بين أشكال الحروف والأصوات في الكلمات'},
    {id:'letters-3',title:'عالم الاكتشاف',range:'O–T',emoji:'🌳',letters:'OPQRST',goal:'سماع الكلمات وتحديد حرف البداية'},
    {id:'letters-4',title:'أبطال الأبجدية',range:'U–Z',emoji:'🦓',letters:'UVWXYZ',goal:'إكمال الحروف الـ26 ومراجعة كتابتها'}
  ];
  const alphabetNotes = {
    'A':'في Apple يبدأ الصوت قريبًا من «أَ». الحرف A قد يُنطق بطرق أخرى.',
    'B':'ابدأ بشفتين مغلقتين ثم افتحهما برفق: b.',
    'C':'في Cat يشبه الصوت /k/، لكن C له أصوات مختلفة في كلمات أخرى.',
    'D':'يلامس طرف اللسان المنطقة خلف الأسنان العليا عند البداية.',
    'E':'في Elephant يبدأ الصوت قريبًا من «إِ».',
    'F':'قرّب الأسنان العليا من الشفة السفلى ومرر الهواء.',
    'G':'في Grapes نسمع الصوت القوي /g/؛ وفي كلمات أخرى قد يتغير.',
    'H':'يخرج الهواء في أول House دون ضغط شديد.',
    'I':'في Ice cream يبدأ الاسم بالصوت /aɪ/، وله أصوات أخرى في كلمات مثل sit.',
    'J':'في Juice يبدأ الصوت القريب من «ج» الإنجليزية.',
    'K':'في Key يبدأ الصوت /k/ مثل بداية Cat.',
    'L':'المس بطرف اللسان منطقة خلف الأسنان العليا.',
    'M':'أغلق الشفتين ودع الصوت يمر من الأنف.',
    'N':'يلمس اللسان خلف الأسنان العليا مع مرور الصوت من الأنف.',
    'O':'في Orange يبدأ صوت قصير يختلف حسب اللكنة.',
    'P':'افتح الشفتين بخفة مع دفعة هواء: p.',
    'Q':'في Queen نرى غالبًا الحرفين qu معًا.',
    'R':'يختلف نطق R بحسب اللكنة؛ استمع لكلمة Rabbit.',
    'S':'في Sun تسمع صوت الهواء /s/.',
    'T':'يلمس طرف اللسان منطقة خلف الأسنان العليا مع دفعة هواء.',
    'U':'في Umbrella يبدأ صوت قصير قريب من «أَ».',
    'V':'ضع الأسنان العليا على الشفة السفلى، مع اهتزاز الصوت.',
    'W':'في Water تبدأ الشفتان مضمومتين ثم تنفتحان.',
    'X':'في X-ray ننطق اسم الحرف X؛ وغالبًا يكتب صوت /ks/ في كلمات أخرى.',
    'Y':'في Yellow يقترب الصوت من بداية كلمة «يوم».',
    'Z':'يُسمى Zee في الأمريكية وZed في البريطانية؛ في Zebra يبدأ صوت /z/.'
  };
  const pronunciation = {
    A0:['Hello','Thank you','Good morning','My name is Ali'],
    A1:['This is my family','I like English','Can I have some water?'],
    A2:['I usually wake up early','Yesterday I visited my friend'],
    B1:['In my opinion, reading is useful','You should practice every day'],
    B2:['We should evaluate the evidence carefully','The results were not conclusive'],
    C1:['Correlation does not imply causation','The proposal is promising, albeit costly']
  };

  // Original A0 short-vowel CVC curriculum. Each phoneme is a learning cue,
  // not a promise of precise synthesised phoneme audio.
  const phonics = [
    {id:'sound-a',title:'صوت A القصير',vowel:'a',ipa:'/æ/',emoji:'🍎',hint:'افتح فمك قليلًا: الصوت القصير في cat يختلف عن اسم الحرف A.',words:[
      {word:'cat',ar:'قطة',emoji:'🐱',parts:['/k/','/æ/','/t/'],extra:'p'},
      {word:'map',ar:'خريطة',emoji:'🗺️',parts:['/m/','/æ/','/p/'],extra:'s'},
      {word:'bag',ar:'حقيبة',emoji:'🎒',parts:['/b/','/æ/','/ɡ/'],extra:'t'},
      {word:'fan',ar:'مروحة',emoji:'🪭',parts:['/f/','/æ/','/n/'],extra:'b'}]},
    {id:'sound-e',title:'صوت E القصير',vowel:'e',ipa:'/ɛ/',emoji:'✏️',hint:'في pen ننطق E بصوت قصير، ولا ننطق اسم الحرف الطويل.',words:[
      {word:'pen',ar:'قلم',emoji:'🖊️',parts:['/p/','/ɛ/','/n/'],extra:'t'},
      {word:'ten',ar:'عشرة',emoji:'🔟',parts:['/t/','/ɛ/','/n/'],extra:'p'},
      {word:'bed',ar:'سرير',emoji:'🛏️',parts:['/b/','/ɛ/','/d/'],extra:'g'},
      {word:'red',ar:'أحمر',emoji:'🟥',parts:['/r/','/ɛ/','/d/'],extra:'b'}]},
    {id:'sound-i',title:'صوت I القصير',vowel:'i',ipa:'/ɪ/',emoji:'🧩',hint:'في sit صوت I قصير /ɪ/ وليس اسم الحرف /aɪ/.',words:[
      {word:'pin',ar:'دبوس',emoji:'📌',parts:['/p/','/ɪ/','/n/'],extra:'s'},
      {word:'sit',ar:'اجلس',emoji:'🪑',parts:['/s/','/ɪ/','/t/'],extra:'p'},
      {word:'fin',ar:'زعنفة',emoji:'🐟',parts:['/f/','/ɪ/','/n/'],extra:'d'},
      {word:'big',ar:'كبير',emoji:'🐘',parts:['/b/','/ɪ/','/ɡ/'],extra:'t'}]},
    {id:'sound-o',title:'صوت O القصير',vowel:'o',ipa:'/ɑ/ (أمريكي)',emoji:'🐶',hint:'صوت O في dog يختلف بين اللهجات؛ سنستخدم نطق المتصفح الأمريكي للتدريب.',words:[
      {word:'dog',ar:'كلب',emoji:'🐶',parts:['/d/','/ɑ/','/ɡ/'],extra:'p'},
      {word:'pot',ar:'قدر',emoji:'🍲',parts:['/p/','/ɑ/','/t/'],extra:'s'},
      {word:'top',ar:'أعلى',emoji:'🔝',parts:['/t/','/ɑ/','/p/'],extra:'r'},
      {word:'hop',ar:'يقفز',emoji:'🐇',parts:['/h/','/ɑ/','/p/'],extra:'t'}]},
    {id:'sound-u',title:'صوت U القصير',vowel:'u',ipa:'/ʌ/',emoji:'☀️',hint:'في sun يكون صوت U قصيرًا؛ استمع للكلمة كاملة ورددها.',words:[
      {word:'sun',ar:'شمس',emoji:'☀️',parts:['/s/','/ʌ/','/n/'],extra:'p'},
      {word:'cup',ar:'كوب',emoji:'🥤',parts:['/k/','/ʌ/','/p/'],extra:'t'},
      {word:'bus',ar:'حافلة',emoji:'🚌',parts:['/b/','/ʌ/','/s/'],extra:'n'},
      {word:'run',ar:'يجري',emoji:'🏃',parts:['/r/','/ʌ/','/n/'],extra:'p'}]}
  ];
  return {stages,lessons,placement,alphabet,foundations,alphabetNotes,pronunciation,phonics};
})();
