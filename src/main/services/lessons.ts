// Structured lesson data for Murphy Blue units 1-145
// Each lesson: rule, formula, examples, notes

export interface Lesson {
  rule: string
  formula: string
  examples: { sentence: string; translation?: string; correct?: boolean }[]
  notes?: string[]
}

export const lessons: Record<number, Lesson> = {
  1: {
    rule: 'We use the present continuous for things happening now, at the time of speaking, or around now (temporary situations).',
    formula: 'Subject + am/is/are + verb-ing',
    examples: [
      { sentence: "She's driving to work.", correct: true },
      { sentence: "I'm reading a good book at the moment.", correct: true },
      { sentence: "Please be quiet. I'm trying to work.", correct: true },
      { sentence: "I'm not watching TV — you can turn it off.", correct: true },
    ],
    notes: [
      'Use "am" with I, "is" with he/she/it, "are" with we/you/they.',
      'Spelling: live → living, run → running, die → dying.',
    ],
  },
  2: {
    rule: 'We use the present simple for things in general, things that happen repeatedly, or permanent situations.',
    formula: 'Subject + verb (+ -s/-es for he/she/it)',
    examples: [
      { sentence: 'Water boils at 100 degrees Celsius.', correct: true },
      { sentence: 'I usually go to work by car.', correct: true },
      { sentence: 'The shop opens at 9 and closes at 5.30.', correct: true },
      { sentence: 'I promise I won\'t be late.', correct: true },
    ],
    notes: [
      'For negatives: I/we/you/they don\'t + verb; he/she/it doesn\'t + verb.',
      'For questions: Do you …? / Does she …?',
      'Always use simple (not continuous) with: like, love, want, need, know, understand, believe, remember.',
    ],
  },
  3: {
    rule: 'Present continuous = things happening now or temporary. Present simple = things in general or permanent.',
    formula: 'Now/temporary → am/is/are + -ing | General/always → verb (-s)',
    examples: [
      { sentence: "The water is boiling. Can you turn it off?", correct: true },
      { sentence: "Water boils at 100 degrees.", correct: true },
      { sentence: "I'm working in a hotel for the summer.", correct: true },
      { sentence: "Tom works in a bank. He's been there for 5 years.", correct: true },
    ],
    notes: [
      '"I always do" = I do it every time. "I\'m always doing" = too often (complaining).',
    ],
  },
  4: {
    rule: 'Some verbs are not normally used in the continuous form (state verbs): like, know, believe, want, need, understand, remember, belong, etc.',
    formula: 'State verbs → always simple, NOT continuous',
    examples: [
      { sentence: 'I understand what you mean.', correct: true },
      { sentence: 'I\'m understanding what you mean.', correct: false },
      { sentence: 'This food tastes good.', correct: true },
      { sentence: 'I\'m thinking about buying a car. (= considering)', correct: true },
      { sentence: 'I think you\'re right. (= believe)', correct: true },
    ],
    notes: [
      'think: "I think" (= believe) is simple; "I\'m thinking about" (= considering) is continuous.',
      'have: "I have a car" (= possess) is simple; "I\'m having dinner" (= eating) is continuous.',
      'see: "I see" (= understand) is simple; "I\'m seeing the doctor" (= visiting) is continuous.',
    ],
  },
  5: {
    rule: 'We use the past simple for completed actions in the past. The action started and finished in the past.',
    formula: 'Subject + verb-ed (regular) / V2 (irregular)',
    examples: [
      { sentence: 'Mozart wrote more than 600 pieces of music.', correct: true },
      { sentence: 'We didn\'t go out last night.', correct: true },
      { sentence: '"Did you go to the cinema?" "Yes, I did."', correct: true },
      { sentence: 'She got up, had breakfast, and left for work.', correct: true },
    ],
    notes: [
      'Regular: work → worked, play → played, stop → stopped.',
      'Irregular: go → went, see → saw, write → wrote, buy → bought.',
      'Negative: didn\'t + base form. Question: Did you + base form?',
    ],
  },
  6: {
    rule: 'We use the past continuous for an action that was in progress at a certain time in the past, often interrupted by another action.',
    formula: 'Subject + was/were + verb-ing',
    examples: [
      { sentence: 'I was watching TV when the phone rang.', correct: true },
      { sentence: 'At 10 o\'clock last night, I was studying.', correct: true },
      { sentence: 'It was raining, so we didn\'t go out.', correct: true },
      { sentence: 'While I was cooking, the doorbell rang.', correct: true },
    ],
    notes: [
      'Past continuous = longer action in progress. Past simple = shorter action that interrupts.',
      'Use "while" for the longer action, "when" for the shorter action.',
    ],
  },
  7: {
    rule: 'We use the present perfect for past actions connected to now — the result is important, not the time.',
    formula: 'Subject + have/has + past participle (V3)',
    examples: [
      { sentence: 'I\'ve lost my keys. (= I still don\'t have them)', correct: true },
      { sentence: '"Is Tom here?" "No, he\'s gone home."', correct: true },
      { sentence: 'I\'ve just finished my work.', correct: true },
      { sentence: 'She hasn\'t come yet.', correct: true },
    ],
    notes: [
      'Use with: just, already, yet, ever, never, recently.',
      'gone vs been: "He\'s gone to Paris" (= he\'s there now). "He\'s been to Paris" (= and came back).',
    ],
  },
  8: {
    rule: 'Present perfect for experiences (ever/never) and with superlatives (the best ... I\'ve ever ...).',
    formula: 'Have you ever + V3 …? | This is the best … I\'ve ever …',
    examples: [
      { sentence: 'Have you ever been to Australia?', correct: true },
      { sentence: 'I\'ve never eaten sushi.', correct: true },
      { sentence: 'This is the best film I\'ve ever seen.', correct: true },
      { sentence: 'It\'s the first time I\'ve driven a car.', correct: true },
    ],
    notes: [
      'Don\'t use present perfect with finished time words (yesterday, last week, in 2020).',
    ],
  },
  9: {
    rule: 'We use the present perfect continuous for an activity that has recently stopped or is still happening, focusing on the activity itself and its duration.',
    formula: 'Subject + have/has been + verb-ing',
    examples: [
      { sentence: 'You\'re out of breath. Have you been running?', correct: true },
      { sentence: 'It\'s been raining all day.', correct: true },
      { sentence: 'I\'ve been learning English for three years.', correct: true },
      { sentence: 'How long have you been waiting?', correct: true },
    ],
    notes: [
      'Continuous = focus on the activity / how long. Simple = focus on the result / how many.',
    ],
  },
  10: {
    rule: 'Present perfect continuous = how long (activity). Present perfect simple = how much/many (result).',
    formula: 'How long → have been doing | How much/many → have done',
    examples: [
      { sentence: 'I\'ve been reading your book. (= not finished, focus on activity)', correct: true },
      { sentence: 'I\'ve read your book. (= finished, focus on result)', correct: true },
      { sentence: 'She\'s been writing 10 emails. (wrong — use simple for quantity)', correct: false },
      { sentence: 'She\'s written 10 emails. (= completed 10)', correct: true },
    ],
    notes: [
      'State verbs (know, like, believe) don\'t use continuous: "I\'ve known her for years" (not "been knowing").',
    ],
  },
  11: {
    rule: 'Use "How long have you …?" with present perfect (simple or continuous) for situations that started in the past and continue now.',
    formula: 'How long + have/has + been doing / done …?',
    examples: [
      { sentence: 'How long have they been married?', correct: true },
      { sentence: 'I\'ve known Bob since we were at school.', correct: true },
      { sentence: 'How long have you been learning English?', correct: true },
      { sentence: 'She\'s lived in London since 2018.', correct: true },
    ],
    notes: [
      'State verbs (know, have, like) → present perfect simple. Action verbs → either form.',
    ],
  },
  12: {
    rule: '"For" is used with a period of time (how long). "Since" is used with a point in time (when it started).',
    formula: 'for + period (3 years, a long time) | since + point (Monday, 2020, I was born)',
    examples: [
      { sentence: 'I\'ve been waiting for 20 minutes.', correct: true },
      { sentence: 'She\'s worked here since April.', correct: true },
      { sentence: 'We\'ve known each other for a long time.', correct: true },
      { sentence: 'I haven\'t seen him since last week.', correct: true },
    ],
  },
  13: {
    rule: 'Present perfect = connected to now. Past simple = finished time in the past.',
    formula: 'No time / connected to now → have done | Specific past time → did',
    examples: [
      { sentence: 'I\'ve lost my keys. (= still lost now)', correct: true },
      { sentence: 'I lost my keys yesterday. (= specific time)', correct: true },
      { sentence: '"Have you ever been to Japan?" "Yes, I went there last year."', correct: true },
      { sentence: 'I\'ve just had lunch. (= recently)', correct: true },
    ],
    notes: [
      'Past time words (yesterday, last week, ago, in 2019, when) → always past simple.',
    ],
  },
  14: {
    rule: 'Present perfect with "today / this week / this year" (unfinished time). Past simple when the time period is finished.',
    formula: 'Unfinished period → have done | Finished period → did',
    examples: [
      { sentence: 'I\'ve drunk four cups of coffee today.', correct: true },
      { sentence: 'The weather has been nice this week.', correct: true },
      { sentence: 'Did you see the news last night?', correct: true },
      { sentence: 'Have you seen Anna this morning? (if still morning)', correct: true },
    ],
  },
  15: {
    rule: 'We use the past perfect to talk about something that happened before another past action.',
    formula: 'Subject + had + past participle (V3)',
    examples: [
      { sentence: 'When I arrived, Tom had already gone home.', correct: true },
      { sentence: 'I\'d seen the film before, so I didn\'t want to see it again.', correct: true },
      { sentence: 'The house was dirty. They hadn\'t cleaned it for weeks.', correct: true },
      { sentence: 'After she had finished her work, she went home.', correct: true },
    ],
  },
  16: {
    rule: 'Past perfect continuous = something had been happening for a period before something else happened.',
    formula: 'Subject + had been + verb-ing',
    examples: [
      { sentence: 'I\'d been waiting for 30 minutes when the bus finally came.', correct: true },
      { sentence: 'He was tired because he\'d been working all day.', correct: true },
      { sentence: 'Her eyes were red. She\'d been crying.', correct: true },
      { sentence: 'We\'d been playing tennis, so we were hot.', correct: true },
    ],
  },
  17: {
    rule: '"Have" for possession (= have got). "Have" for actions (breakfast, a shower) — NOT "have got".',
    formula: 'Possession → have / have got | Action → have (NOT have got)',
    examples: [
      { sentence: 'I have a new car. / I\'ve got a new car.', correct: true },
      { sentence: 'I have breakfast at 8. (NOT "I\'ve got breakfast")', correct: true },
      { sentence: 'Do you have any brothers? / Have you got any brothers?', correct: true },
      { sentence: 'I usually have a shower in the morning.', correct: true },
    ],
  },
  18: {
    rule: '"Used to" describes past habits or states that are no longer true.',
    formula: 'Subject + used to + base verb',
    examples: [
      { sentence: 'I used to play tennis, but now I prefer golf.', correct: true },
      { sentence: 'Did you use to live near the sea?', correct: true },
      { sentence: 'There used to be a cinema here, but it was knocked down.', correct: true },
      { sentence: 'I used to going to school by bus.', correct: false },
    ],
    notes: [
      'Negative: didn\'t use to. Question: Did you use to …? (no "d").',
      'Don\'t use "used to" for how long: "I lived there for 5 years" (NOT "used to live for 5 years").',
    ],
  },
  19: {
    rule: 'We use present continuous for future arrangements and present simple for timetables/schedules.',
    formula: 'Arrangement → am/is/are + doing | Timetable → verb-s',
    examples: [
      { sentence: 'I\'m playing tennis with Tom tomorrow. (= arranged)', correct: true },
      { sentence: 'The train leaves at 6.15 tomorrow morning. (= timetable)', correct: true },
      { sentence: 'What time does the film start tonight?', correct: true },
      { sentence: 'I\'m going to the dentist on Tuesday.', correct: true },
    ],
  },
  20: {
    rule: '"Going to" for plans/intentions already decided and predictions based on present evidence.',
    formula: 'Subject + am/is/are + going to + base verb',
    examples: [
      { sentence: 'I\'m going to buy a new laptop. I\'ve saved the money.', correct: true },
      { sentence: 'Look at those clouds. It\'s going to rain.', correct: true },
      { sentence: 'She isn\'t going to pass the exam. She hasn\'t studied.', correct: true },
      { sentence: 'Are you going to watch the game tonight?', correct: true },
    ],
    notes: [
      '"Going to" = already decided / evidence now. "Will" = deciding now / no evidence.',
    ],
  },
}

export function getLesson(unitNumber: number): Lesson | null {
  return lessons[unitNumber] ?? null
}
