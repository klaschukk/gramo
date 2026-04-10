// Structured lesson data for Murphy Blue units 1-145
// Each lesson: rule, formula, examples, notes

export interface Lesson {
  rule: string
  formula: string
  examples: { sentence: string; correct?: boolean }[]
  notes?: string[]
}

export const lessons: Record<number, Lesson> = {
  // ===== PRESENT TENSES (Units 1-4) =====
  1: {
    rule: 'We use the present continuous for things happening now, at the time of speaking, or around now (temporary situations). It describes actions in progress — not finished yet.',
    formula: 'Subject + am/is/are + verb-ing',
    examples: [
      { sentence: "She's driving to work right now.", correct: true },
      { sentence: "I'm reading a really good book at the moment.", correct: true },
      { sentence: "Please be quiet. I'm trying to concentrate.", correct: true },
      { sentence: "Why are you wearing a coat? It's not cold.", correct: true },
      { sentence: "I'm not watching TV — you can turn it off.", correct: true },
      { sentence: "Is it raining? — Yes, take an umbrella.", correct: true },
    ],
    notes: [
      'Use "am" with I, "is" with he/she/it, "are" with we/you/they.',
      'Spelling rules: live → living, run → running, die → dying, write → writing.',
      'Also used for temporary situations: "I\'m living with friends until I find a flat."',
      '"I\'m always losing things" = too often, a complaint (NOT a routine).',
    ],
  },
  2: {
    rule: 'We use the present simple for things in general, things that happen repeatedly or all the time, and permanent situations. Also used for facts and timetables.',
    formula: 'Subject + verb (+ -s/-es for he/she/it)',
    examples: [
      { sentence: 'Water boils at 100 degrees Celsius.', correct: true },
      { sentence: 'I usually go to work by car.', correct: true },
      { sentence: 'The shop opens at 9 and closes at 5.30.', correct: true },
      { sentence: 'She works in a bank. She\'s been there for five years.', correct: true },
      { sentence: 'I don\'t drink coffee very often.', correct: true },
      { sentence: 'What does your brother do? — He\'s an engineer.', correct: true },
    ],
    notes: [
      'Negative: I/we/you/they don\'t + verb; he/she/it doesn\'t + verb.',
      'Questions: Do you …? / Does she …?',
      'Frequency adverbs: always, usually, often, sometimes, rarely, never — go before the main verb.',
      'Use simple with: promise, suggest, apologise — "I promise I won\'t be late."',
    ],
  },
  3: {
    rule: 'Present continuous = things happening now or around now (temporary). Present simple = things in general, always true, or permanent.',
    formula: 'Now/temporary → am/is/are + -ing | General/permanent → verb (-s)',
    examples: [
      { sentence: "The water is boiling. Can you turn it off? (= happening now)", correct: true },
      { sentence: "Water boils at 100°C. (= always true)", correct: true },
      { sentence: "I'm working in a hotel this summer. (= temporary)", correct: true },
      { sentence: "Tom works in a bank. (= permanent job)", correct: true },
      { sentence: "You're being very quiet. What's wrong? (= behaviour now)", correct: true },
      { sentence: "You're very quiet. You never say anything. (= in general)", correct: true },
    ],
    notes: [
      '"I always do" = every time (neutral). "I\'m always doing" = too often, I\'m annoyed.',
      'Example: "I always go to work by car" vs "Tom is always leaving the door open!"',
    ],
  },
  4: {
    rule: 'Some verbs describe states, not actions. These "state verbs" are NOT normally used in the continuous form. Use present simple instead.',
    formula: 'State verbs → always present simple | Action meaning → can be continuous',
    examples: [
      { sentence: 'I understand what you mean. (NOT "am understanding")', correct: true },
      { sentence: 'I\'m understanding what you mean.', correct: false },
      { sentence: 'This food tastes delicious. (= has a flavour)', correct: true },
      { sentence: 'I\'m tasting the soup to see if it needs salt. (= action)', correct: true },
      { sentence: 'I think you\'re right. (= believe)', correct: true },
      { sentence: 'I\'m thinking about buying a new car. (= considering)', correct: true },
    ],
    notes: [
      'Common state verbs: like, love, hate, want, need, prefer, know, understand, believe, remember, forget, mean, belong, contain, depend, seem, suppose.',
      '"think" = believe → simple. "think about" = consider → continuous.',
      '"have" = possess → simple. "have lunch/a shower" = action → continuous.',
      '"see" = understand or perceive → simple. "see the doctor" = visit → continuous.',
    ],
  },

  // ===== PAST TENSES (Units 5-6) =====
  5: {
    rule: 'We use the past simple for completed actions in the past. The action started and finished at a definite time in the past, even if we don\'t mention the time.',
    formula: 'Subject + verb-ed (regular) / V2 (irregular)',
    examples: [
      { sentence: 'Mozart wrote more than 600 pieces of music.', correct: true },
      { sentence: 'We didn\'t go out last night. We stayed at home.', correct: true },
      { sentence: '"Did you enjoy the party?" — "Yes, it was great."', correct: true },
      { sentence: 'She got up early, had breakfast, and left for work.', correct: true },
      { sentence: 'It was cold, so I shut the window.', correct: true },
      { sentence: 'The accident happened three days ago.', correct: true },
    ],
    notes: [
      'Regular: work → worked, stop → stopped, try → tried, plan → planned.',
      'Common irregulars: go → went, see → saw, buy → bought, come → came, know → knew, take → took, make → made, write → wrote, give → gave, find → found.',
      'Negative: didn\'t + base form. Question: Did you + base form?',
      'The past of "be": I/he/she/it was, we/you/they were.',
    ],
  },
  6: {
    rule: 'We use the past continuous for an action in progress at a specific time in the past, or when one action (long) was interrupted by another (short).',
    formula: 'Subject + was/were + verb-ing',
    examples: [
      { sentence: 'I was watching TV when the phone rang.', correct: true },
      { sentence: 'At 10 o\'clock last night, I was studying for my exam.', correct: true },
      { sentence: 'It was raining, so we didn\'t go out.', correct: true },
      { sentence: 'While I was cooking dinner, the doorbell rang.', correct: true },
      { sentence: 'They were playing in the garden when it started to rain.', correct: true },
      { sentence: 'What were you doing at 8 o\'clock yesterday evening?', correct: true },
    ],
    notes: [
      'Past continuous = longer background action. Past simple = shorter action that interrupts.',
      'Use "while" with the continuous (longer action), "when" with the simple (shorter action).',
      'Both past continuous = two actions happening at the same time: "While I was reading, my sister was watching TV."',
      'Don\'t use past continuous for completed actions: "I read a book yesterday" (NOT "was reading" if finished).',
    ],
  },

  // ===== PRESENT PERFECT (Units 7-14) =====
  7: {
    rule: 'We use the present perfect for past actions that have a result NOW. The exact time is not important — what matters is the present result.',
    formula: 'Subject + have/has + past participle (V3)',
    examples: [
      { sentence: 'I\'ve lost my keys. (= I still don\'t have them now)', correct: true },
      { sentence: '"Is Tom here?" — "No, he\'s gone home."', correct: true },
      { sentence: 'I\'ve just finished my work. (= a moment ago)', correct: true },
      { sentence: 'She hasn\'t come yet. (= we\'re still waiting)', correct: true },
      { sentence: 'I\'ve already eaten. (= I\'m not hungry now)', correct: true },
      { sentence: 'Have you ever been to Japan?', correct: true },
    ],
    notes: [
      'Use with: just (= a short time ago), already (= sooner than expected), yet (= until now, in negatives/questions).',
      '"He\'s gone to Paris" = he\'s there now. "He\'s been to Paris" = he went and came back.',
      'Don\'t use present perfect with finished time: "I lost my keys yesterday" (NOT "have lost").',
    ],
  },
  8: {
    rule: 'We use the present perfect to talk about experiences — things that have happened (or not) in our lives up to now. Often with ever, never, or superlatives.',
    formula: 'Have you ever + V3 …? | This is the (superlative) … I\'ve ever …',
    examples: [
      { sentence: 'Have you ever been to Australia? — Yes, twice.', correct: true },
      { sentence: 'I\'ve never eaten sushi in my life.', correct: true },
      { sentence: 'This is the best film I\'ve ever seen.', correct: true },
      { sentence: 'It\'s the first time I\'ve driven a car.', correct: true },
      { sentence: 'How many countries have you visited?', correct: true },
      { sentence: 'She\'s read that book three times.', correct: true },
    ],
    notes: [
      '"Have you ever …?" = at any time in your life up to now.',
      'With superlatives: "It\'s the most beautiful place I\'ve ever visited."',
      '"It\'s the first/second time something has happened" uses present perfect.',
    ],
  },
  9: {
    rule: 'We use the present perfect continuous for an activity that has recently stopped (and we can see the result) or is still happening. Focus is on the activity itself and its duration.',
    formula: 'Subject + have/has been + verb-ing',
    examples: [
      { sentence: 'You\'re out of breath. Have you been running?', correct: true },
      { sentence: 'It\'s been raining all day. The ground is wet.', correct: true },
      { sentence: 'I\'ve been learning English for three years.', correct: true },
      { sentence: 'How long have you been waiting here?', correct: true },
      { sentence: 'Your hands are dirty. What have you been doing?', correct: true },
      { sentence: 'She\'s been working since 7 o\'clock this morning.', correct: true },
    ],
    notes: [
      'The activity may be still happening or may have just stopped.',
      'We see the result of the recent activity: wet ground (rain), out of breath (running).',
      'Use "how long", "for", "since" with present perfect continuous.',
    ],
  },
  10: {
    rule: 'Present perfect continuous = focus on the activity / how long. Present perfect simple = focus on the result / how many / completed.',
    formula: 'How long (activity) → have been doing | How many (result) → have done',
    examples: [
      { sentence: 'I\'ve been reading your book. (= still reading, focus on activity)', correct: true },
      { sentence: 'I\'ve read your book. (= finished, focus on completion)', correct: true },
      { sentence: 'She\'s been writing emails all morning. (= activity)', correct: true },
      { sentence: 'She\'s written 10 emails today. (= quantity/result)', correct: true },
      { sentence: 'I\'ve been knowing her for years.', correct: false },
      { sentence: 'I\'ve known her for years. (state verb → simple)', correct: true },
    ],
    notes: [
      'State verbs (know, like, believe, have, be) → always present perfect simple, NOT continuous.',
      'Continuous: "How long have you been reading?" Simple: "How many pages have you read?"',
      'Both possible with live/work: "I\'ve lived here" / "I\'ve been living here" (no big difference).',
    ],
  },
  11: {
    rule: 'We use "How long have you …?" with present perfect for situations that started in the past and continue now.',
    formula: 'How long + have/has + been doing / done …?',
    examples: [
      { sentence: 'How long have you been married? — Since 2015.', correct: true },
      { sentence: 'I\'ve known Bob since we were at school together.', correct: true },
      { sentence: 'How long have you been learning English?', correct: true },
      { sentence: 'She\'s lived in London since 2018.', correct: true },
      { sentence: 'How long do you know Bob?', correct: false },
      { sentence: 'How long have you known Bob?', correct: true },
    ],
    notes: [
      '"When …?" asks about the time → past simple: "When did you start?"',
      '"How long …?" asks about the duration → present perfect: "How long have you been …?"',
      'State verbs (know, have, like, be) → present perfect simple (not continuous).',
    ],
  },
  12: {
    rule: '"For" is used with a period of time (how long). "Since" is used with a point in time (when something started).',
    formula: 'for + period (3 years, a long time, ages) | since + point (Monday, 2020, I was born)',
    examples: [
      { sentence: 'I\'ve been waiting for 20 minutes.', correct: true },
      { sentence: 'She\'s worked here since April.', correct: true },
      { sentence: 'We\'ve known each other for a long time.', correct: true },
      { sentence: 'I haven\'t seen him since last Friday.', correct: true },
      { sentence: 'They\'ve been married for 25 years.', correct: true },
      { sentence: 'I\'ve had this car since three years.', correct: false },
    ],
    notes: [
      '"For": for a week, for two hours, for ages, for a long time, for six months.',
      '"Since": since Monday, since 9 o\'clock, since April, since 2019, since I was a child, since they got married.',
      'The wrong example: "since three years" → should be "for three years".',
    ],
  },
  13: {
    rule: 'Present perfect = the action is connected to now, no specific time. Past simple = the action happened at a specific time in the past.',
    formula: 'Connected to now → have done | Specific past time → did',
    examples: [
      { sentence: 'I\'ve lost my keys. (= I can\'t find them now)', correct: true },
      { sentence: 'I lost my keys yesterday. (= specific time)', correct: true },
      { sentence: '"Have you ever been to Japan?" — "Yes, I went there last year."', correct: true },
      { sentence: 'He\'s just gone out. (= a moment ago)', correct: true },
      { sentence: 'He went out ten minutes ago. (= specific time)', correct: true },
      { sentence: 'I\'ve seen that film last week.', correct: false },
    ],
    notes: [
      'Past time words ALWAYS need past simple: yesterday, last week, ago, in 2019, when I was young.',
      'Present perfect time words: just, already, yet, ever, never, recently, so far, today (unfinished), this week.',
      'Conversations often start with present perfect, then switch to past simple for details.',
    ],
  },
  14: {
    rule: 'Use present perfect with "today / this week / this year" when the period is NOT finished. Use past simple when the period is finished.',
    formula: 'Unfinished period → present perfect | Finished period → past simple',
    examples: [
      { sentence: 'I\'ve drunk four cups of coffee today. (= today is not over)', correct: true },
      { sentence: 'The weather has been nice this week.', correct: true },
      { sentence: 'Did you see the news last night? (= last night is over)', correct: true },
      { sentence: 'I didn\'t eat anything yesterday.', correct: true },
      { sentence: 'Have you seen Anna this morning? (= if still morning)', correct: true },
      { sentence: 'Did you see Anna this morning? (= if now afternoon)', correct: true },
    ],
    notes: [
      '"This morning" can be present perfect or past simple — depends on when you\'re speaking!',
      '"Today" is an unfinished time period → usually present perfect.',
    ],
  },

  // ===== PAST PERFECT (Units 15-16) =====
  15: {
    rule: 'We use the past perfect to talk about something that happened BEFORE another past action. It\'s the "past of the past".',
    formula: 'Subject + had + past participle (V3)',
    examples: [
      { sentence: 'When I arrived at the party, Tom had already gone home.', correct: true },
      { sentence: 'I\'d seen the film before, so I didn\'t want to watch it again.', correct: true },
      { sentence: 'The house was dirty. They hadn\'t cleaned it for weeks.', correct: true },
      { sentence: 'After she had finished her work, she went home.', correct: true },
      { sentence: 'I didn\'t know who he was. I\'d never seen him before.', correct: true },
      { sentence: 'By the time we got to the cinema, the film had started.', correct: true },
    ],
    notes: [
      'Past perfect = the EARLIER of two past events.',
      'Signal words: already, just, never (before), by the time, after, before, when.',
      'If the order is clear, past simple is also OK: "After she finished, she went home."',
    ],
  },
  16: {
    rule: 'The past perfect continuous describes something that had been in progress for a period BEFORE another past event.',
    formula: 'Subject + had been + verb-ing',
    examples: [
      { sentence: 'I\'d been waiting for 30 minutes when the bus finally came.', correct: true },
      { sentence: 'He was tired because he\'d been working all day.', correct: true },
      { sentence: 'Her eyes were red. She\'d been crying.', correct: true },
      { sentence: 'We\'d been playing tennis, so we were hot and tired.', correct: true },
      { sentence: 'How long had you been waiting before the taxi arrived?', correct: true },
      { sentence: 'I\'d been knowing him for years.', correct: false },
    ],
    notes: [
      'Like present perfect continuous, but the reference point is a past moment, not now.',
      'State verbs (know, have, be) use past perfect simple: "I\'d known him for years."',
    ],
  },

  // ===== HAVE, USED TO, FUTURE (Units 17-25) =====
  17: {
    rule: '"Have" and "have got" both express possession. For actions (have breakfast, have a shower), only "have" is used — NOT "have got".',
    formula: 'Possession → have / have got | Actions → have (only)',
    examples: [
      { sentence: 'I have a new car. / I\'ve got a new car. (both OK)', correct: true },
      { sentence: 'Do you have any brothers? / Have you got any brothers?', correct: true },
      { sentence: 'I have breakfast at 8 every morning. (action)', correct: true },
      { sentence: 'I\'ve got breakfast at 8.', correct: false },
      { sentence: 'I usually have a shower before work.', correct: true },
      { sentence: 'We\'re having a party next Saturday. (action = organizing)', correct: true },
    ],
    notes: [
      'In American English, "have" (without "got") is more common for possession.',
      'Past tense: "had" (NOT "had got") — "I had a headache yesterday."',
      'Common "have" actions: have breakfast/lunch/dinner, have a shower/bath, have a rest, have a party, have a good time.',
    ],
  },
  18: {
    rule: '"Used to + infinitive" describes past habits or states that are no longer true. There is no present form — use present simple for current habits.',
    formula: 'Subject + used to + base verb (past only)',
    examples: [
      { sentence: 'I used to play tennis a lot, but now I prefer golf.', correct: true },
      { sentence: 'Did you use to live near the sea? (question form)', correct: true },
      { sentence: 'There used to be a cinema here, but it was knocked down.', correct: true },
      { sentence: 'She didn\'t use to like coffee, but she does now.', correct: true },
      { sentence: 'I used to going to school by bus.', correct: false },
      { sentence: 'I used to go to school by bus.', correct: true },
    ],
    notes: [
      'Question: Did you use to …? (no "d"). Negative: didn\'t use to.',
      '"Used to" has no present form. Don\'t say "I use to" for present habits.',
      'Don\'t confuse with "be used to" (= be accustomed to): "I\'m used to getting up early."',
      'Don\'t use "used to" with specific times: "I lived there for 5 years" (NOT "used to live for 5 years").',
    ],
  },
  19: {
    rule: 'We use present continuous for definite future arrangements. We use present simple for future events based on a timetable or schedule.',
    formula: 'Arrangement → am/is/are doing | Timetable → verb(-s)',
    examples: [
      { sentence: 'I\'m playing tennis with Tom tomorrow. (= it\'s arranged)', correct: true },
      { sentence: 'The train leaves at 6.15 tomorrow morning. (= timetable)', correct: true },
      { sentence: 'I\'m going to the dentist on Tuesday. (= appointment made)', correct: true },
      { sentence: 'What time does the film start tonight?', correct: true },
      { sentence: 'We\'re having a party next Saturday. Come!', correct: true },
      { sentence: 'The meeting is at 3 o\'clock. (= fixed schedule)', correct: true },
    ],
    notes: [
      'Present continuous for personal arrangements (you\'ve made a plan with someone).',
      'Present simple for official timetables: flights, trains, cinema, classes.',
      '"I\'m leaving tomorrow" = I\'ve decided and arranged it.',
    ],
  },
  20: {
    rule: '"Going to" for plans/intentions already decided, and for predictions based on present evidence (we can see what\'s going to happen).',
    formula: 'Subject + am/is/are + going to + base verb',
    examples: [
      { sentence: 'I\'m going to buy a new laptop. I\'ve already saved the money.', correct: true },
      { sentence: 'Look at those clouds! It\'s going to rain.', correct: true },
      { sentence: 'She isn\'t going to pass the exam. She hasn\'t studied.', correct: true },
      { sentence: 'Are you going to watch the game tonight?', correct: true },
      { sentence: 'Be careful! That shelf is going to fall!', correct: true },
      { sentence: 'We\'re going to get married in October.', correct: true },
    ],
    notes: [
      '"Going to" = already decided or evidence now. "Will" = deciding at the moment of speaking.',
      '"I\'m going to call him tonight" (= I decided earlier). "Oh, I\'ll call him now" (= deciding now).',
    ],
  },
  21: {
    rule: 'We use "will" when we decide to do something at the moment of speaking, for offers, promises, and predictions without evidence.',
    formula: 'Subject + will (\'ll) + base verb',
    examples: [
      { sentence: '"It\'s cold." — "I\'ll close the window." (= deciding now)', correct: true },
      { sentence: 'I\'ll help you with your homework. (= offer)', correct: true },
      { sentence: 'I promise I won\'t tell anyone. (= promise)', correct: true },
      { sentence: 'I think it will rain tomorrow. (= opinion/prediction)', correct: true },
      { sentence: 'Don\'t worry, you\'ll pass the exam. (= prediction)', correct: true },
      { sentence: 'Shall I open the window? (= offer with shall)', correct: true },
    ],
    notes: [
      '"Will" for instant decisions, offers, promises, requests, predictions (I think/probably).',
      '"Shall I …?" and "Shall we …?" for offers and suggestions (British English).',
      'Don\'t use "will" for pre-planned actions — use "going to" or present continuous.',
    ],
  },
  22: {
    rule: '"Will be doing" (future continuous) = something will be in progress at a certain time in the future. "Will have done" (future perfect) = something will be completed by a certain time.',
    formula: 'In progress → will be + -ing | Completed by → will have + V3',
    examples: [
      { sentence: 'This time tomorrow I\'ll be flying to New York.', correct: true },
      { sentence: 'Don\'t call at 8 — I\'ll be having dinner.', correct: true },
      { sentence: 'By next Friday, I\'ll have finished this book.', correct: true },
      { sentence: 'They\'ll have been married for 20 years next month.', correct: true },
      { sentence: 'Will you be using the car tonight?', correct: true },
      { sentence: 'I\'ll have left by the time you arrive.', correct: true },
    ],
  },
  23: {
    rule: '"I will" vs "I\'m going to" — will for instant decisions and predictions (opinion). Going to for pre-planned intentions and predictions (evidence).',
    formula: 'Deciding now / opinion → will | Already decided / evidence → going to',
    examples: [
      { sentence: '"There\'s no milk." — "Oh, I\'ll go and get some." (= deciding now)', correct: true },
      { sentence: 'I\'m going to buy some milk — it\'s on my list. (= already planned)', correct: true },
      { sentence: 'I think the exam will be difficult. (= opinion)', correct: true },
      { sentence: 'Look — she\'s going to fall! (= I can see evidence)', correct: true },
      { sentence: 'I will call you tonight. (= promise)', correct: true },
      { sentence: 'We\'re going to fly to Rome. We booked the tickets. (= arranged)', correct: true },
    ],
  },
  24: {
    rule: 'When we talk about the future using "when / after / before / until / as soon as", we use PRESENT tense (not will) in the time clause.',
    formula: 'When/After/Before/Until + PRESENT … , … will/going to …',
    examples: [
      { sentence: 'I\'ll call you when I arrive. (NOT "when I will arrive")', correct: true },
      { sentence: 'When I will arrive, I\'ll call you.', correct: false },
      { sentence: 'We\'ll go out after it stops raining.', correct: true },
      { sentence: 'Wait here until I come back.', correct: true },
      { sentence: 'Before you go, make sure you\'ve got everything.', correct: true },
      { sentence: 'As soon as she arrives, we\'ll start the meeting.', correct: true },
    ],
    notes: [
      'This rule applies to: when, while, before, after, until, as soon as, unless, in case.',
      'The MAIN clause uses will/going to. The TIME clause uses present simple or present perfect.',
      '"I\'ll wait until you\'ve finished." (present perfect in time clause = completed before main action)',
    ],
  },
  25: {
    rule: 'Conjunctions "when" and "if" in future sentences use present tense, not will. "When" = it will definitely happen. "If" = it may or may not happen.',
    formula: 'When + present (certain) | If + present (uncertain) → will + verb',
    examples: [
      { sentence: 'When I get home, I\'ll have dinner. (= certain)', correct: true },
      { sentence: 'If I get home early, I\'ll cook dinner. (= maybe)', correct: true },
      { sentence: 'I\'ll phone you when I arrive.', correct: true },
      { sentence: 'I\'ll phone you if I have time.', correct: true },
      { sentence: 'When it will rain, we\'ll stay inside.', correct: false },
      { sentence: 'When it rains, we\'ll stay inside.', correct: true },
    ],
  },

  // ===== MODALS (Units 26-37) =====
  26: {
    rule: '"Can" expresses ability (I can do it) or possibility (it can happen). "Could" is past of "can" or a more polite/tentative form. "Be able to" replaces "can" in tenses where "can" doesn\'t exist.',
    formula: 'can + base verb | could + base verb | be able to + base verb',
    examples: [
      { sentence: 'I can speak three languages.', correct: true },
      { sentence: 'I could swim when I was five. (= past ability)', correct: true },
      { sentence: 'I haven\'t been able to sleep recently. (= present perfect)', correct: true },
      { sentence: 'She will be able to help you tomorrow.', correct: true },
      { sentence: 'He can to drive.', correct: false },
      { sentence: 'He can drive.', correct: true },
    ],
    notes: [
      '"Can" has no infinitive/perfect form — use "be able to": "I\'d like to be able to fly."',
      '"Could" for general ability in past: "I could run fast when I was young."',
      'For one specific achievement, use "managed to" or "was able to": "The fire was bad, but we managed to escape."',
    ],
  },
  27: {
    rule: '"Could do" = it is possible or was possible. "Could have done" = it was possible but didn\'t happen (missed opportunity or criticism).',
    formula: 'could + base verb (possible now) | could have + V3 (was possible, but didn\'t)',
    examples: [
      { sentence: 'We could go to the cinema tonight. (= suggestion)', correct: true },
      { sentence: 'Why did you walk? You could have taken a taxi. (= but you didn\'t)', correct: true },
      { sentence: 'She could have been hurt. She was lucky.', correct: true },
      { sentence: 'I could have gone to university, but I decided to get a job.', correct: true },
      { sentence: 'It\'s a nice day. We could have a picnic. (= suggestion)', correct: true },
      { sentence: 'You could have told me earlier! (= criticism)', correct: true },
    ],
  },
  28: {
    rule: '"Must" = I\'m sure it\'s true (logical deduction). "Can\'t" = I\'m sure it\'s NOT true. Both express certainty based on evidence.',
    formula: 'must + verb (= I\'m sure it\'s true) | can\'t + verb (= I\'m sure it\'s NOT true)',
    examples: [
      { sentence: 'You\'ve been working all day. You must be tired. (= I\'m sure)', correct: true },
      { sentence: 'She can\'t be at home. Her car isn\'t there.', correct: true },
      { sentence: 'He must have forgotten about the meeting. (= past deduction)', correct: true },
      { sentence: 'They can\'t have left already. It\'s only 7 o\'clock.', correct: true },
      { sentence: 'You must be joking! That\'s impossible!', correct: true },
      { sentence: 'The restaurant can\'t be very good — it\'s always empty.', correct: true },
    ],
  },
  29: {
    rule: '"May" and "might" express possibility — something is possibly true or will possibly happen. "Might" is slightly less certain than "may".',
    formula: 'may/might + base verb = it\'s possible (maybe)',
    examples: [
      { sentence: 'She may be at home. I\'m not sure.', correct: true },
      { sentence: 'I might go to the cinema tonight. I don\'t know yet.', correct: true },
      { sentence: 'It may rain later — take an umbrella.', correct: true },
      { sentence: 'He might not come to the party.', correct: true },
      { sentence: 'She may have missed the train. (= maybe she missed it)', correct: true },
      { sentence: 'I might not be able to come tomorrow.', correct: true },
    ],
    notes: [
      '"May/might" ≈ maybe, perhaps, it\'s possible.',
      'Negative: may not / might not (no contraction "mayn\'t").',
      '"Could" can also mean "possibly": "It could rain" ≈ "It might rain."',
    ],
  },
  30: {
    rule: '"May have done" / "might have done" = it\'s possible that something happened in the past (but we\'re not sure).',
    formula: 'may/might + have + V3 = possibly happened',
    examples: [
      { sentence: 'She might have gone home already.', correct: true },
      { sentence: 'I can\'t find my phone. I may have left it at work.', correct: true },
      { sentence: '"Why didn\'t he answer?" — "He might not have heard you."', correct: true },
      { sentence: 'I wonder why she didn\'t come. She may have forgotten.', correct: true },
      { sentence: 'The bus might have been delayed by the traffic.', correct: true },
      { sentence: 'You should have studied. You might have passed. (= but you didn\'t)', correct: true },
    ],
  },
  31: {
    rule: '"Have to" = it\'s necessary because of rules, other people, or circumstances. "Must" = I personally believe it\'s necessary. In the past, only "had to" is used.',
    formula: 'must (personal) / have to (external) + base verb',
    examples: [
      { sentence: 'I must study tonight. (= I think it\'s necessary)', correct: true },
      { sentence: 'I have to wear a uniform at work. (= it\'s the rule)', correct: true },
      { sentence: 'I had to wait 40 minutes for the bus. (past)', correct: true },
      { sentence: 'You don\'t have to pay — it\'s free.', correct: true },
      { sentence: 'I must to go now.', correct: false },
      { sentence: 'I must go now.', correct: true },
    ],
    notes: [
      '"Mustn\'t" = it\'s necessary NOT to do (prohibition). "Don\'t have to" = it\'s not necessary (optional).',
      '"You mustn\'t tell anyone" (= don\'t tell). "You don\'t have to tell anyone" (= you can if you want).',
    ],
  },
  32: {
    rule: '"Must" (personal obligation/necessity), "mustn\'t" (prohibition — don\'t do it!), "needn\'t" / "don\'t need to" (not necessary — you can but you don\'t have to).',
    formula: 'must = necessary | mustn\'t = prohibited | needn\'t = not necessary',
    examples: [
      { sentence: 'You must keep it a secret. Don\'t tell anyone.', correct: true },
      { sentence: 'You mustn\'t tell anyone. (= it\'s prohibited)', correct: true },
      { sentence: 'You needn\'t tell anyone. (= it\'s not necessary, but you can)', correct: true },
      { sentence: 'I needn\'t have bought any food. There was plenty. (= I bought it, but it was unnecessary)', correct: true },
      { sentence: 'You don\'t need to come if you don\'t want to.', correct: true },
      { sentence: 'Must I pay now? — No, you needn\'t. / No, you don\'t have to.', correct: true },
    ],
  },
  33: {
    rule: '"Should" is used for advice, opinions, and saying what is right or wrong. "Should have done" = you didn\'t do it, but it would have been the right thing.',
    formula: 'should + base verb (advice) | should have + V3 (regret about past)',
    examples: [
      { sentence: 'You should see a doctor about your headache.', correct: true },
      { sentence: 'I think the government should do more about pollution.', correct: true },
      { sentence: 'You shouldn\'t stay up so late. You look tired.', correct: true },
      { sentence: 'I should have studied harder. I failed the exam. (= I regret not studying)', correct: true },
      { sentence: 'She shouldn\'t have said that. It upset everyone.', correct: true },
      { sentence: 'You should have told me about the problem earlier.', correct: true },
    ],
    notes: [
      '"Should" is weaker than "must". It\'s advice, not obligation.',
      '"Ought to" = same meaning as "should": "You ought to see a doctor."',
    ],
  },
  34: {
    rule: '"Should" can also be used with suggestions, asking for advice, and after certain expressions (It\'s important that …, I suggest that …).',
    formula: 'Should I/we …? (asking for advice) | It\'s important that … should …',
    examples: [
      { sentence: 'Should I apply for the job? What do you think?', correct: true },
      { sentence: 'Where should we have dinner tonight?', correct: true },
      { sentence: 'I demanded that he should apologise.', correct: true },
      { sentence: 'It\'s essential that everyone should be informed.', correct: true },
      { sentence: 'Why should I help you? You never help me.', correct: true },
      { sentence: 'If you should see Tom, can you tell him to call me?', correct: true },
    ],
  },
  35: {
    rule: '"Had better" gives strong advice — stronger than "should". It suggests something bad will happen if you don\'t follow the advice.',
    formula: 'had better (\'d better) + base verb (WITHOUT "to")',
    examples: [
      { sentence: 'You\'d better take an umbrella. It looks like rain.', correct: true },
      { sentence: 'I\'d better not be late, or the boss will be angry.', correct: true },
      { sentence: 'We\'d better hurry. The train leaves in 5 minutes.', correct: true },
      { sentence: 'You had better to apologise.', correct: false },
      { sentence: 'You\'d better apologise.', correct: true },
      { sentence: '"Shall I phone Tom?" — "You\'d better not. He\'s probably asleep."', correct: true },
    ],
    notes: [
      '"Had better" has no past or future form. It\'s always about now or the near future.',
      '"Should" = general advice. "Had better" = stronger, implies negative consequence.',
    ],
  },
  36: {
    rule: '"Would" is used for imaginary situations, past habits, polite requests, and in reported speech. "Would like" = a polite way to say "want".',
    formula: 'would + base verb',
    examples: [
      { sentence: 'If I had more money, I would travel the world. (= imaginary)', correct: true },
      { sentence: 'Would you like some coffee? (= polite offer)', correct: true },
      { sentence: 'I\'d like to book a table, please. (= polite request)', correct: true },
      { sentence: 'When I was young, I would play in the garden every day. (= past habit)', correct: true },
      { sentence: 'She said she would call me later. (= reported speech)', correct: true },
      { sentence: 'I wouldn\'t do that if I were you.', correct: true },
    ],
  },
  37: {
    rule: 'Polite requests, offers, permissions and invitations using can/could/would/shall/may.',
    formula: 'Can/Could/Would you …? | Can/May I …? | Shall I/we …?',
    examples: [
      { sentence: 'Can you help me, please? (= informal request)', correct: true },
      { sentence: 'Could you tell me the time? (= more polite)', correct: true },
      { sentence: 'Would you mind closing the door? (= very polite)', correct: true },
      { sentence: 'Can I use your phone? (= asking permission)', correct: true },
      { sentence: 'May I sit here? (= formal permission)', correct: true },
      { sentence: 'Shall I carry that for you? (= offer)', correct: true },
    ],
    notes: [
      '"Could you" is more polite than "Can you".',
      '"Would you mind + -ing?" — "Would you mind opening the window?"',
      '"Shall I …?" / "Shall we …?" for offers and suggestions.',
    ],
  },

  // ===== CONDITIONALS & WISH (Units 38-41) =====
  38: {
    rule: '"If + present simple" for real/likely situations (1st conditional). "If + past simple" for unreal/imaginary situations now (2nd conditional).',
    formula: 'Real: If + present → will | Unreal: If + past → would',
    examples: [
      { sentence: 'If I find your book, I\'ll give it back. (= possible)', correct: true },
      { sentence: 'If I found a wallet on the street, I\'d take it to the police. (= imaginary)', correct: true },
      { sentence: 'If I were you, I wouldn\'t go there. (= advice)', correct: true },
      { sentence: 'What would you do if you won the lottery?', correct: true },
      { sentence: 'I\'ll come to the party if I have time. (= possible)', correct: true },
      { sentence: 'I\'d buy a house if I had enough money. (= I don\'t have enough)', correct: true },
    ],
    notes: [
      '2nd conditional: use "were" (not "was") in formal English: "If I were rich …"',
      '"If I knew the answer, I\'d tell you." (= I don\'t know now)',
    ],
  },
  39: {
    rule: '"If I knew …" and "I wish I knew …" — both describe unreal situations in the present. "Wish + past simple" = I\'d like the situation to be different.',
    formula: 'I wish + past simple = I want it to be different now (but it isn\'t)',
    examples: [
      { sentence: 'I wish I knew the answer. (= but I don\'t know)', correct: true },
      { sentence: 'I wish I could speak French.', correct: true },
      { sentence: 'I wish it wasn\'t / weren\'t raining.', correct: true },
      { sentence: 'I wish I had a bigger flat.', correct: true },
      { sentence: 'I wish I am taller.', correct: false },
      { sentence: 'I wish I were taller.', correct: true },
    ],
  },
  40: {
    rule: '"If I had known …" (3rd conditional) for unreal situations in the PAST — things that didn\'t happen. "I wish I had done" = regret about the past.',
    formula: 'If + had V3 → would have V3 | I wish + had V3 (= past regret)',
    examples: [
      { sentence: 'If I had known you were coming, I would have cooked dinner.', correct: true },
      { sentence: 'I wish I had studied harder at school.', correct: true },
      { sentence: 'If I hadn\'t missed the bus, I wouldn\'t have been late.', correct: true },
      { sentence: 'She wishes she hadn\'t said that. (= she regrets it)', correct: true },
      { sentence: 'If I had taken the job, I would have moved to London.', correct: true },
      { sentence: 'I wish I had known about the party. I would have come.', correct: true },
    ],
  },
  41: {
    rule: '"I wish someone would do something" = I want someone to do something (or something to happen), and I\'m annoyed that they don\'t/it doesn\'t.',
    formula: 'I wish + would + base verb (= I\'m annoyed, I want change)',
    examples: [
      { sentence: 'I wish it would stop raining. (= I\'m annoyed it keeps raining)', correct: true },
      { sentence: 'I wish you would listen to me!', correct: true },
      { sentence: 'I wish she would hurry up.', correct: true },
      { sentence: 'I wish the neighbours wouldn\'t make so much noise.', correct: true },
      { sentence: 'I wish I would be taller.', correct: false },
      { sentence: 'I wish I were taller. (= wish about yourself → past simple, NOT would)', correct: true },
    ],
    notes: [
      '"I wish … would" is NOT used about yourself. Use past simple: "I wish I knew" (not "I wish I would know").',
      '"I wish you wouldn\'t do that" = please stop doing that (complaint).',
    ],
  },

  // ===== PASSIVE (Units 42-46) =====
  42: {
    rule: 'The passive voice is used when the focus is on the action/object, not the person who does it. Formed with "be + past participle".',
    formula: 'Subject + be (am/is/are/was/were) + past participle (V3)',
    examples: [
      { sentence: 'The window was broken. (= we don\'t know or care who broke it)', correct: true },
      { sentence: 'English is spoken all over the world.', correct: true },
      { sentence: 'My car was stolen last night.', correct: true },
      { sentence: 'This house was built in 1920.', correct: true },
      { sentence: 'The meeting has been cancelled.', correct: true },
      { sentence: 'Dinner will be served at 8 o\'clock.', correct: true },
    ],
    notes: [
      'Active: Someone stole my car. → Passive: My car was stolen.',
      'Use "by" to say who did the action: "The book was written by J.K. Rowling."',
    ],
  },
  43: {
    rule: 'Passive forms exist in all tenses: be done, been done, being done, be going to be done, will be done.',
    formula: 'Tense + be + V3 (present: is done | past: was done | perfect: has been done)',
    examples: [
      { sentence: 'The room is being cleaned right now. (= present continuous passive)', correct: true },
      { sentence: 'My car has been repaired. (= present perfect passive)', correct: true },
      { sentence: 'The new hospital will be built next year.', correct: true },
      { sentence: 'I don\'t like being told what to do. (= infinitive passive)', correct: true },
      { sentence: 'She wants to be promoted.', correct: true },
      { sentence: 'The report should have been finished yesterday.', correct: true },
    ],
  },
  44: {
    rule: 'Use passive with "get" (informal) and in structures like "I was born", "it is said that", "he is supposed to".',
    formula: 'get + V3 (informal passive) | It is said/believed/known that …',
    examples: [
      { sentence: 'I got invited to the party. (= informal passive)', correct: true },
      { sentence: 'He got fired from his job.', correct: true },
      { sentence: 'I was born in 1995. (NOT "I born" or "I am born")', correct: true },
      { sentence: 'Two people were injured in the accident.', correct: true },
      { sentence: 'The window got broken during the storm.', correct: true },
      { sentence: 'I didn\'t get offered the job.', correct: true },
    ],
  },
  45: {
    rule: '"It is said that …" and "He is said to …" are used to report what people say/believe/think in a formal way.',
    formula: 'It is said/believed/expected that … | Subject + is said/believed to + verb',
    examples: [
      { sentence: 'It is said that he is 108 years old.', correct: true },
      { sentence: 'He is said to be 108 years old.', correct: true },
      { sentence: 'The company is expected to lose money this year.', correct: true },
      { sentence: 'It is believed that the thieves got in through the window.', correct: true },
      { sentence: 'She is known to be very generous.', correct: true },
      { sentence: 'He is supposed to be a brilliant scientist.', correct: true },
    ],
  },
  46: {
    rule: '"Have something done" = you arrange for someone else to do it for you. You don\'t do it yourself.',
    formula: 'Subject + have + object + past participle (V3)',
    examples: [
      { sentence: 'I had my car repaired. (= someone repaired it for me)', correct: true },
      { sentence: 'She\'s having her hair cut tomorrow.', correct: true },
      { sentence: 'We had the house painted last month.', correct: true },
      { sentence: 'Have you ever had your fortune told?', correct: true },
      { sentence: 'I need to have my eyes tested.', correct: true },
      { sentence: 'He had his wallet stolen. (= something bad happened to him)', correct: true },
    ],
    notes: [
      '"I had my car repaired" ≠ "I repaired my car". The first = someone did it for me.',
      'Also used for bad experiences: "I had my phone stolen" = someone stole my phone.',
    ],
  },
}

import { lessons47to90 } from './lessons-47-90'
import { lessons91to145 } from './lessons-91-145'

const allLessons: Record<number, Lesson> = { ...lessons, ...lessons47to90, ...lessons91to145 }

export function getLesson(unitNumber: number): Lesson | null {
  return allLessons[unitNumber] ?? null
}
