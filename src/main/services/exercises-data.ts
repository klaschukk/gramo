// Static exercises for Murphy Blue units
// Each exercise: unit number, type, question, options (null for fill-in), answer, explanation

export type ExData = {
  unit: number
  type: string
  q: string
  opts: string[] | null
  a: string
  expl: string
}

export const exercises: ExData[] = [
  // ===== UNIT 1: Present continuous =====
  { unit: 1, type: 'multiple-choice', q: 'Please be quiet. I ___ to concentrate.', opts: ['try', 'am trying', 'tried', 'tries'], a: 'am trying', expl: 'Present continuous for actions happening now.' },
  { unit: 1, type: 'multiple-choice', q: 'Look! Somebody ___ in the river.', opts: ['swims', 'is swimming', 'swim', 'was swimming'], a: 'is swimming', expl: 'Use present continuous for something happening at the moment of speaking.' },
  { unit: 1, type: 'fill-in-blank', q: '"Where is Tom?" "He ___ (have) a shower."', opts: null, a: 'is having', expl: 'Present continuous: subject + am/is/are + -ing form.' },
  { unit: 1, type: 'true-false', q: '"I am believing you." — This sentence is correct.', opts: ['True', 'False'], a: 'False', expl: '"Believe" is a state verb — not used in continuous form. Correct: "I believe you."' },
  { unit: 1, type: 'multiple-choice', q: 'She ___ at the moment, so she can\'t answer the phone.', opts: ['sleeps', 'is sleeping', 'sleep', 'slept'], a: 'is sleeping', expl: 'Action happening right now = present continuous.' },
  { unit: 1, type: 'fill-in-blank', q: 'Why ___ you ___ (wear) a coat? It\'s warm today.', opts: null, a: 'are, wearing', expl: 'Question: am/is/are + subject + -ing.' },

  // ===== UNIT 2: Present simple =====
  { unit: 2, type: 'multiple-choice', q: 'Water ___ at 100 degrees Celsius.', opts: ['is boiling', 'boils', 'boil', 'was boiling'], a: 'boils', expl: 'Present simple for permanent facts and general truths.' },
  { unit: 2, type: 'multiple-choice', q: 'The shop ___ at 9 o\'clock every morning.', opts: ['is opening', 'opens', 'open', 'opened'], a: 'opens', expl: 'Present simple for regular/repeated actions and timetables.' },
  { unit: 2, type: 'fill-in-blank', q: 'She ___ (not/eat) meat. She is vegetarian.', opts: null, a: "doesn't eat", expl: 'Present simple negative: subject + doesn\'t + base verb.' },
  { unit: 2, type: 'true-false', q: '"I am usually getting up at 7." — This sentence is correct.', opts: ['True', 'False'], a: 'False', expl: 'Habits/routines use present simple: "I usually get up at 7."' },
  { unit: 2, type: 'multiple-choice', q: 'How often ___ you ___ tennis?', opts: ['do/play', 'are/playing', 'does/play', 'is/playing'], a: 'do/play', expl: 'Present simple question with "how often".' },
  { unit: 2, type: 'fill-in-blank', q: 'My father ___ (work) in a hospital. He\'s a doctor.', opts: null, a: 'works', expl: 'He/she/it + verb-s in present simple.' },

  // ===== UNIT 3: Present continuous vs simple 1 =====
  { unit: 3, type: 'multiple-choice', q: 'The water ___. Can you turn it off?', opts: ['boils', 'is boiling', 'boil', 'boiled'], a: 'is boiling', expl: 'Something happening right now = present continuous.' },
  { unit: 3, type: 'multiple-choice', q: 'He ___ in a bank. He has been there for five years.', opts: ['is working', 'works', 'work', 'working'], a: 'works', expl: 'Permanent situation = present simple.' },
  { unit: 3, type: 'fill-in-blank', q: 'I ___ (speak) English now, but I usually ___ (speak) French.', opts: null, a: 'am speaking, speak', expl: 'Now = continuous. Usually = simple.' },
  { unit: 3, type: 'multiple-choice', q: 'Why ___ you ___ at me like that? Stop it!', opts: ['do/look', 'are/looking', 'did/look', 'were/looking'], a: 'are/looking', expl: 'Happening now = present continuous.' },
  { unit: 3, type: 'true-false', q: '"Tom is always leaving the door open!" — This expresses annoyance, not routine.', opts: ['True', 'False'], a: 'True', expl: '"Is always doing" = complaining about something happening too often.' },
  { unit: 3, type: 'fill-in-blank', q: 'This week I ___ (stay) with my friends. (= temporary)', opts: null, a: "am staying", expl: 'Temporary situation around now = present continuous.' },

  // ===== UNIT 4: Present continuous vs simple 2 =====
  { unit: 4, type: 'multiple-choice', q: 'I ___ what you mean.', opts: ['am understanding', 'understand', 'understands', 'understood'], a: 'understand', expl: '"Understand" is a state verb — not used in continuous.' },
  { unit: 4, type: 'multiple-choice', q: 'This food ___ delicious.', opts: ['is tasting', 'tastes', 'taste', 'tasted'], a: 'tastes', expl: '"Taste" as a state verb uses simple.' },
  { unit: 4, type: 'fill-in-blank', q: 'I ___ (think) about selling my car. What do you think?', opts: null, a: 'am thinking', expl: '"Think about" = considering (action) → continuous.' },
  { unit: 4, type: 'true-false', q: '"I\'m seeing the doctor tomorrow." — This use of present continuous is correct.', opts: ['True', 'False'], a: 'True', expl: 'Present continuous for planned future arrangements.' },
  { unit: 4, type: 'multiple-choice', q: 'She ___ three languages: English, French, and Spanish.', opts: ['is speaking', 'speaks', 'speak', 'speaking'], a: 'speaks', expl: 'Permanent ability = present simple.' },
  { unit: 4, type: 'fill-in-blank', q: 'I ___ (have) a great time right now!', opts: null, a: 'am having', expl: '"Have a time" = action (experience), so continuous is OK.' },

  // ===== UNIT 5: Past simple =====
  { unit: 5, type: 'multiple-choice', q: 'Mozart ___ more than 600 pieces of music.', opts: ['writes', 'has written', 'wrote', 'was writing'], a: 'wrote', expl: 'Completed action in the past (historical) = past simple.' },
  { unit: 5, type: 'fill-in-blank', q: 'We ___ (not/go) out last night. We stayed at home.', opts: null, a: "didn't go", expl: 'Past simple negative: didn\'t + base verb.' },
  { unit: 5, type: 'fill-in-blank', q: 'She ___ (get) up early and ___ (catch) the 7:30 train.', opts: null, a: 'got, caught', expl: 'Irregular verbs: get → got, catch → caught.' },
  { unit: 5, type: 'multiple-choice', q: '"___ you ___ the party?" "Yes, it was great."', opts: ['Did/enjoy', 'Have/enjoyed', 'Do/enjoy', 'Were/enjoying'], a: 'Did/enjoy', expl: 'Asking about a completed past event.' },
  { unit: 5, type: 'multiple-choice', q: 'The accident ___ three days ago.', opts: ['has happened', 'happened', 'happens', 'was happening'], a: 'happened', expl: '"Ago" = specific past time → past simple.' },
  { unit: 5, type: 'fill-in-blank', q: 'It ___ (be) cold, so I ___ (shut) the window.', opts: null, a: 'was, shut', expl: 'Irregular: shut → shut → shut (all forms the same).' },

  // ===== UNIT 6: Past continuous =====
  { unit: 6, type: 'multiple-choice', q: 'I ___ TV when the phone rang.', opts: ['watched', 'was watching', 'watch', 'am watching'], a: 'was watching', expl: 'Past continuous for action in progress interrupted by another event.' },
  { unit: 6, type: 'fill-in-blank', q: 'What ___ you ___ (do) at 10 o\'clock last night?', opts: null, a: 'were, doing', expl: 'Past continuous question: was/were + subject + -ing.' },
  { unit: 6, type: 'true-false', q: '"When I arrived, they were having dinner." — Past continuous is correct here.', opts: ['True', 'False'], a: 'True', expl: 'Action in progress (having dinner) when another event happened (arrived).' },
  { unit: 6, type: 'multiple-choice', q: 'It ___ when we went out.', opts: ['snowed', 'was snowing', 'snows', 'has snowed'], a: 'was snowing', expl: 'Past continuous for describing the scene.' },
  { unit: 6, type: 'fill-in-blank', q: 'While I ___ (cook), the doorbell ___ (ring).', opts: null, a: 'was cooking, rang', expl: 'While + continuous (long action), simple (short interruption).' },
  { unit: 6, type: 'multiple-choice', q: 'They ___ in the garden when it started to rain.', opts: ['played', 'were playing', 'play', 'have played'], a: 'were playing', expl: 'Past continuous for action in progress before interruption.' },

  // ===== UNITS 7-20: Present Perfect, Past Perfect, etc. =====
  // Unit 7: Present perfect 1
  { unit: 7, type: 'multiple-choice', q: 'I ___ my keys. I can\'t find them.', opts: ['lost', 'have lost', 'am losing', 'lose'], a: 'have lost', expl: 'Present perfect for past action with present result.' },
  { unit: 7, type: 'fill-in-blank', q: 'Oh no! I ___ (forget) her name.', opts: null, a: 'have forgotten', expl: 'Present perfect: can\'t remember NOW.' },
  { unit: 7, type: 'multiple-choice', q: '"Is Tom here?" "No, he ___ home."', opts: ['went', 'has gone', 'goes', 'is going'], a: 'has gone', expl: '"Has gone" = went and hasn\'t come back.' },
  { unit: 7, type: 'fill-in-blank', q: 'I ___ (just/finish) my lunch.', opts: null, a: 'have just finished', expl: '"Just" with present perfect = a moment ago.' },
  { unit: 7, type: 'true-false', q: '"I have already eaten" means I ate before now and I\'m not hungry.', opts: ['True', 'False'], a: 'True', expl: '"Already" = sooner than expected, completed before now.' },
  { unit: 7, type: 'multiple-choice', q: 'She ___ yet. We\'re still waiting.', opts: ['hasn\'t arrived', 'didn\'t arrive', 'doesn\'t arrive', 'won\'t arrive'], a: 'hasn\'t arrived', expl: '"Yet" in negative = up to this moment.' },

  // Units 8-20 abbreviated for brevity — 6 exercises each
  { unit: 8, type: 'multiple-choice', q: 'Have you ___ been to Japan?', opts: ['ever', 'never', 'just', 'yet'], a: 'ever', expl: '"Have you ever …?" = in your life up to now.' },
  { unit: 8, type: 'fill-in-blank', q: 'This is the best cake I ___ ever ___ (eat).', opts: null, a: 'have, eaten', expl: 'Superlative + present perfect.' },
  { unit: 8, type: 'true-false', q: '"I have read that book last week." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"Last week" = specific past time → use past simple.' },
  { unit: 8, type: 'multiple-choice', q: 'She is the most interesting person I ___.', opts: ['ever met', 'have ever met', 'meet', 'met'], a: 'have ever met', expl: 'Superlative + present perfect for life experience.' },

  { unit: 9, type: 'multiple-choice', q: 'You\'re out of breath. ___ you ___?', opts: ['Did/run', 'Have/been running', 'Are/running', 'Were/running'], a: 'Have/been running', expl: 'Present perfect continuous: recent activity with visible result.' },
  { unit: 9, type: 'fill-in-blank', q: 'How long ___ you ___ (wait) here?', opts: null, a: 'have, been waiting', expl: 'Present perfect continuous for duration.' },
  { unit: 9, type: 'fill-in-blank', q: 'She ___ (learn) English for three years.', opts: null, a: 'has been learning', expl: 'Duration of an ongoing activity.' },
  { unit: 9, type: 'multiple-choice', q: 'It ___ all day. The ground is wet.', opts: ['rained', 'has been raining', 'rains', 'was raining'], a: 'has been raining', expl: 'Recently stopped activity with present result.' },

  { unit: 10, type: 'multiple-choice', q: 'I ___ the book you lent me. You can have it back.', opts: ['have been reading', 'have read', 'read', 'was reading'], a: 'have read', expl: 'Simple = completed. Continuous = still in progress.' },
  { unit: 10, type: 'true-false', q: '"I have been knowing her for years." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"Know" is a state verb — use simple: "I have known her."' },
  { unit: 10, type: 'fill-in-blank', q: 'She ___ (write) ten emails today.', opts: null, a: 'has written', expl: 'Quantity = simple (completed count).' },

  // Units 11-20
  { unit: 11, type: 'multiple-choice', q: 'How long ___ they ___ married?', opts: ['are/being', 'have/been', 'were/being', 'did/be'], a: 'have/been', expl: 'Started in the past, continues now.' },
  { unit: 11, type: 'fill-in-blank', q: 'She ___ (live) in London since 2018.', opts: null, a: 'has lived', expl: '"Since" = starting point → present perfect.' },

  { unit: 12, type: 'multiple-choice', q: 'I\'ve been waiting ___ 20 minutes.', opts: ['since', 'for', 'from', 'during'], a: 'for', expl: '"For" + period of time.' },
  { unit: 12, type: 'multiple-choice', q: 'She has worked here ___ April.', opts: ['for', 'since', 'from', 'at'], a: 'since', expl: '"Since" + point in time.' },

  { unit: 13, type: 'fill-in-blank', q: 'I ___ (just/arrive). I ___ (arrive) five minutes ago.', opts: null, a: 'have just arrived, arrived', expl: '"Just" = perfect. "Ago" = simple.' },
  { unit: 13, type: 'true-false', q: '"I have seen him yesterday." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"Yesterday" = specific past time → past simple.' },

  { unit: 14, type: 'multiple-choice', q: 'I ___ four books this month.', opts: ['have read', 'read', 'was reading', 'am reading'], a: 'have read', expl: '"This month" (unfinished) → present perfect.' },
  { unit: 14, type: 'fill-in-blank', q: 'The weather ___ (be) good since Sunday.', opts: null, a: 'has been', expl: '"Since Sunday" + still good = present perfect.' },

  { unit: 15, type: 'multiple-choice', q: 'When I arrived, Tom ___ already ___ home.', opts: ['has/gone', 'had/gone', 'was/going', 'went/to'], a: 'had/gone', expl: 'Past perfect for earlier past event.' },
  { unit: 15, type: 'fill-in-blank', q: 'The house was dirty. They ___ (not/clean) it for weeks.', opts: null, a: "hadn't cleaned", expl: 'Past perfect negative.' },

  { unit: 16, type: 'multiple-choice', q: 'I ___ for two hours when the bus finally came.', opts: ['waited', 'have waited', 'had been waiting', 'was waiting'], a: 'had been waiting', expl: 'Duration before a past event.' },
  { unit: 16, type: 'fill-in-blank', q: 'Her eyes were red. She ___ (cry).', opts: null, a: 'had been crying', expl: 'Past result of recent activity.' },

  { unit: 17, type: 'true-false', q: '"I\'ve got breakfast at 8." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"Have breakfast" is an action → use "have", not "have got".' },
  { unit: 17, type: 'multiple-choice', q: 'I ___ breakfast at 8 every morning.', opts: ['have', 'have got', 'am having', 'had got'], a: 'have', expl: '"Have" for actions (breakfast, shower).' },

  { unit: 18, type: 'multiple-choice', q: 'I ___ a lot of coffee, but now I prefer tea.', opts: ['used to drink', 'use to drink', 'was used to drink', 'am used to drink'], a: 'used to drink', expl: '"Used to + infinitive" for past habits.' },
  { unit: 18, type: 'true-false', q: '"I used to going to school by bus." — This is correct.', opts: ['True', 'False'], a: 'False', expl: 'Correct: "I used to GO to school by bus."' },

  { unit: 19, type: 'multiple-choice', q: 'I ___ tennis with Tom tomorrow. (= arranged)', opts: ['play', 'am playing', 'will play', 'played'], a: 'am playing', expl: 'Present continuous for definite arrangements.' },
  { unit: 19, type: 'multiple-choice', q: 'The train ___ at 6.15 tomorrow morning.', opts: ['is leaving', 'leaves', 'will leave', 'left'], a: 'leaves', expl: 'Present simple for timetables.' },

  { unit: 20, type: 'multiple-choice', q: 'Look at those clouds. It ___ rain.', opts: ['will', 'is going to', 'is', 'does'], a: 'is going to', expl: 'Prediction based on present evidence.' },
  { unit: 20, type: 'fill-in-blank', q: 'She ___ (not/going to/pass) the exam. She hasn\'t studied.', opts: null, a: "isn't going to pass", expl: 'Evidence-based prediction (negative).' },

  // ===== UNITS 21-46: Modals, Conditionals, Passive =====
  { unit: 21, type: 'multiple-choice', q: '"It\'s cold." — "I ___ close the window."', opts: ['am going to', 'will', 'am closing', 'close'], a: 'will', expl: 'Instant decision at moment of speaking = will.' },
  { unit: 21, type: 'fill-in-blank', q: 'I promise I ___ (not/tell) anyone.', opts: null, a: "won't tell", expl: '"Will" for promises.' },
  { unit: 21, type: 'multiple-choice', q: '___ I open the window?', opts: ['Will', 'Shall', 'Am', 'Do'], a: 'Shall', expl: '"Shall I…?" for offers.' },

  { unit: 24, type: 'multiple-choice', q: 'I\'ll call you when I ___.', opts: ['arrive', 'will arrive', 'arrived', 'am arriving'], a: 'arrive', expl: 'After "when" in future → present simple, NOT will.' },
  { unit: 24, type: 'true-false', q: '"When I will arrive, I\'ll call you." — This is correct.', opts: ['True', 'False'], a: 'False', expl: 'Don\'t use "will" in the time clause. Correct: "When I arrive…"' },

  { unit: 26, type: 'multiple-choice', q: 'I ___ swim when I was five.', opts: ['can', 'could', 'was able', 'may'], a: 'could', expl: '"Could" = past ability.' },
  { unit: 26, type: 'fill-in-blank', q: 'I haven\'t ___ (be able to) sleep recently.', opts: null, a: 'been able to', expl: '"Be able to" in present perfect (can has no perfect form).' },

  { unit: 28, type: 'multiple-choice', q: 'You\'ve been working all day. You ___ be tired.', opts: ['must', 'can', 'might', 'should'], a: 'must', expl: '"Must" = I\'m sure (logical deduction).' },
  { unit: 28, type: 'multiple-choice', q: 'She ___ be at home. Her car isn\'t there.', opts: ['must', 'can\'t', 'might', 'shouldn\'t'], a: 'can\'t', expl: '"Can\'t" = I\'m sure it\'s NOT true.' },

  { unit: 31, type: 'multiple-choice', q: 'I ___ wear a uniform at work. (= it\'s the rule)', opts: ['must', 'have to', 'should', 'could'], a: 'have to', expl: '"Have to" for external obligation/rules.' },
  { unit: 31, type: 'true-false', q: '"You mustn\'t go" and "You don\'t have to go" mean the same thing.', opts: ['True', 'False'], a: 'False', expl: '"Mustn\'t" = prohibited. "Don\'t have to" = not necessary.' },

  { unit: 33, type: 'multiple-choice', q: 'You ___ see a doctor about your headache.', opts: ['must', 'should', 'have to', 'would'], a: 'should', expl: '"Should" for advice (weaker than "must").' },
  { unit: 33, type: 'fill-in-blank', q: 'I ___ (should/study) harder. I failed the exam.', opts: null, a: 'should have studied', expl: '"Should have done" = regret about the past.' },

  { unit: 38, type: 'multiple-choice', q: 'If I ___ rich, I would travel the world.', opts: ['am', 'was', 'were', 'be'], a: 'were', expl: '2nd conditional: If + past → would. Use "were" for all persons.' },
  { unit: 38, type: 'fill-in-blank', q: 'What ___ you ___ (do) if you won the lottery?', opts: null, a: 'would, do', expl: 'Imaginary situation: would + base verb.' },

  { unit: 39, type: 'fill-in-blank', q: 'I wish I ___ (know) the answer. (but I don\'t)', opts: null, a: 'knew', expl: '"Wish + past simple" = I want it to be different now.' },
  { unit: 39, type: 'multiple-choice', q: 'I wish I ___ speak French.', opts: ['can', 'could', 'would', 'will'], a: 'could', expl: '"Wish + could" for ability you don\'t have.' },

  { unit: 40, type: 'multiple-choice', q: 'If I ___ known, I would have helped.', opts: ['have', 'had', 'would', 'did'], a: 'had', expl: '3rd conditional: If + had V3 → would have V3.' },
  { unit: 40, type: 'fill-in-blank', q: 'I wish I ___ (study) harder at school.', opts: null, a: 'had studied', expl: '"Wish + had V3" = regret about the past.' },

  { unit: 42, type: 'multiple-choice', q: 'English ___ all over the world.', opts: ['speaks', 'is spoken', 'has spoken', 'spoke'], a: 'is spoken', expl: 'Passive: be + past participle.' },
  { unit: 42, type: 'fill-in-blank', q: 'My car ___ (steal) last night.', opts: null, a: 'was stolen', expl: 'Past passive: was/were + V3.' },

  { unit: 46, type: 'multiple-choice', q: 'I need to ___ my eyes tested.', opts: ['have', 'get', 'both are correct', 'make'], a: 'both are correct', expl: '"Have/get something done" = arrange for someone else to do it.' },
  { unit: 46, type: 'fill-in-blank', q: 'She\'s ___ (have) her hair cut tomorrow.', opts: null, a: 'having', expl: '"Having something done" = someone does it for her.' },
]
