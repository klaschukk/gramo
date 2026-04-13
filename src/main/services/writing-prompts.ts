// Writing prompts tailored to each Murphy Blue unit's grammar topic.
// Maps unit number → targeted writing task.

export interface WritingPrompt {
  prompt: string
  checklist: string[] // grammar points to use
  minWords: number
}

const PROMPTS: Record<number, WritingPrompt> = {
  // ===== PRESENT (1-6) =====
  1: { prompt: 'Describe what is happening around you right now. Look out the window, listen, observe.', checklist: ['Use present continuous (am/is/are + -ing)', 'Include at least 5 verbs', 'Mention time words: now, at the moment, currently'], minWords: 60 },
  2: { prompt: 'Write about your daily routine — what you usually do on a typical weekday.', checklist: ['Use present simple for habits', 'Include frequency adverbs (usually, always, often, sometimes)', 'Use the 3rd person -s correctly'], minWords: 80 },
  3: { prompt: 'Describe both a permanent situation and a temporary one in your current life. For example, your job vs a project you\'re working on this month.', checklist: ['Present simple for permanent', 'Present continuous for temporary', 'Contrast the two clearly'], minWords: 80 },
  4: { prompt: 'Write about your opinions, feelings, and beliefs on one topic (e.g. remote work, reading, learning languages).', checklist: ['Use state verbs: think, believe, know, love, prefer', 'Avoid using them in continuous form', 'Use "I think that..." structures'], minWords: 80 },

  // ===== PAST (5-6) =====
  5: { prompt: 'Tell the story of what you did yesterday, from morning to night.', checklist: ['Use past simple for completed actions', 'Include at least 3 irregular verbs (went, ate, saw, had...)', 'Use time expressions (first, then, after that, finally)'], minWords: 80 },
  6: { prompt: 'Describe a specific moment in your past when you were interrupted while doing something. ("I was reading when the phone rang...")', checklist: ['Use past continuous for the background action', 'Use past simple for the interruption', 'Include "when" or "while"'], minWords: 80 },

  // ===== PRESENT PERFECT (7-14) — critical for B1+ =====
  7: { prompt: 'Write about experiences you have had in your life (travel, food, sports). Then describe one specific event that happened recently.', checklist: ['Present perfect for life experience (have been, have tried)', 'Past simple for specific time (I went to Paris last year)', 'Contrast the two tenses deliberately'], minWords: 100 },
  8: { prompt: 'Describe things that started in the past and are still true. (Where you live, what you\'ve been learning, what you\'ve had for a long time.)', checklist: ['Use "for" + period (for 5 years)', 'Use "since" + point in time (since 2020)', 'Avoid present simple ("I live here for 5 years" is WRONG)'], minWords: 100 },
  9: { prompt: 'Write about things you have recently done or things that have just happened in your life.', checklist: ['Use present perfect with "just", "already", "yet"', 'Use "have/has been" for present result', 'Explain why these things matter now'], minWords: 80 },
  10: { prompt: 'Describe what you have been doing lately (continuous activities still ongoing).', checklist: ['Use present perfect continuous (have/has been + -ing)', 'Include duration: for weeks, lately, recently', 'Avoid simple perfect where continuous fits'], minWords: 80 },
  11: { prompt: 'Compare how long two different things in your life have lasted or been true.', checklist: ['Present perfect + for / since', 'Compare: "I\'ve lived here for 3 years but worked here only for 6 months"', 'Use "how long" in a question at the end'], minWords: 80 },
  12: { prompt: 'Tell me about things you did in specific past moments (completed, finished past).', checklist: ['Use past simple, NOT present perfect', 'Include concrete time references (yesterday, last week, in 2019)', 'Avoid the "since" + specific-date trap'], minWords: 80 },
  13: { prompt: 'Write 6 sentences: 3 using present perfect + 3 using past simple. Make the contrast clear.', checklist: ['Clear past time → past simple', 'No specific time or "up to now" → present perfect', 'Same topic but different tenses'], minWords: 100 },
  14: { prompt: 'Describe a sequence of past events where one action happened BEFORE another past action.', checklist: ['Use past perfect (had + V3) for the earlier action', 'Use past simple for the later one', 'Example: "By the time I arrived, the film had already started."'], minWords: 80 },

  // ===== FUTURE (19-24) =====
  19: { prompt: 'Write about your plans and decisions for the next week and the next year.', checklist: ['Use "going to" for intentions', 'Use present continuous for fixed arrangements', 'Use "will" for spontaneous decisions'], minWords: 100 },
  20: { prompt: 'Predict what will happen in your life, in technology, or in the world in the next 10 years.', checklist: ['Use "will" for predictions', 'Use "will probably", "will definitely"', 'Include at least 5 future forms'], minWords: 100 },
  22: { prompt: 'Describe what you will be doing at a specific time in the future.', checklist: ['Use future continuous (will be + -ing)', 'Include time marker: "this time tomorrow", "at 8pm on Friday"', 'Contrast with what you are doing now'], minWords: 80 },
  23: { prompt: 'Write about things you will have finished by a certain point in the future.', checklist: ['Use future perfect (will have + V3)', 'Include deadline: "by 2030", "by the end of the year"', 'Think about long-term goals'], minWords: 80 },

  // ===== MODALS (25-37) =====
  25: { prompt: 'Write about habits you had in the past but no longer have. Or things that were true in the past but not anymore.', checklist: ['Use "used to + infinitive" for past habits', 'Contrast with "but now..."', 'Don\'t confuse with "be used to + -ing" (accustomed)'], minWords: 80 },
  28: { prompt: 'Write advice you would give to a friend in various situations (lost job, can\'t sleep, stressed).', checklist: ['Use "should / shouldn\'t"', 'Use "You\'d better"', 'Use "ought to" at least once'], minWords: 80 },
  29: { prompt: 'Describe things you must do, have to do, and don\'t have to do in your life.', checklist: ['Use "must" for personal obligation', 'Use "have to" for external rules', 'Use "don\'t have to" (not "mustn\'t") for no obligation'], minWords: 80 },

  // ===== CONDITIONALS (38-40) — critical for Kirill =====
  38: { prompt: 'Write about real future possibilities: things that WILL happen IF certain conditions are met.', checklist: ['Use first conditional: If + present simple, will + infinitive', 'Example: "If it rains, I will stay home"', 'Don\'t use "will" in the if-clause'], minWords: 80 },
  39: { prompt: 'Imagine an alternative present reality. What WOULD you do IF your life were different?', checklist: ['Use second conditional: If + past simple, would + infinitive', 'NEVER use "would" in the if-clause (WRONG: "If I would have money")', 'Use "were" for all persons with "be" (If I were rich...)'], minWords: 100 },
  40: { prompt: 'Write about past regrets. What WOULD HAVE happened IF things had been different?', checklist: ['Use third conditional: If + past perfect, would have + V3', 'Example: "If I had studied harder, I would have passed"', 'Good for expressing regret about the past'], minWords: 100 },

  // ===== PASSIVE (42-44) — critical for Kirill =====
  42: { prompt: 'Describe how common things are made or produced. (Cars, bread, software, etc.)', checklist: ['Use passive voice: be + past participle', 'Most verbs: "is made", "are produced", "was built"', 'Watch irregular past participles: built, made, written'], minWords: 80 },
  43: { prompt: 'Describe historical events using passive voice. (When things were invented, built, discovered.)', checklist: ['Past passive: "was/were + V3"', 'Use "in + year" (was built IN 1990, not AT 1990)', 'Mix with past simple active'], minWords: 80 },
  44: { prompt: 'Write about things you expect to happen or things that people believe.', checklist: ['Use passive reporting: "is said to", "is believed to", "is thought to"', 'Example: "He is said to be very rich"', 'Good for formal writing'], minWords: 80 },

  // ===== REPORTED SPEECH (47-48) =====
  47: { prompt: 'Report what someone told you last week. Convert direct speech into indirect.', checklist: ['Backshift tenses: present → past, will → would', 'Use "said (that)" or "told me (that)"', 'Remember: "said" does NOT take an object; "told" does'], minWords: 100 },

  // ===== GERUNDS & INFINITIVES (53-60) =====
  53: { prompt: 'Write about things you enjoy, suggest, avoid, and can\'t help doing.', checklist: ['Use -ing after: enjoy, suggest, avoid, can\'t help, deny, finish', 'NEVER use to-infinitive after these (WRONG: "enjoy to read")', 'At least 5 gerund constructions'], minWords: 80 },
  54: { prompt: 'Describe things you decided, want, hope, and can\'t afford.', checklist: ['Use to-infinitive after: decide, want, hope, can\'t afford, promise, refuse', 'Contrast with -ing verbs from Unit 53', 'At least 5 to-infinitive constructions'], minWords: 80 },
  55: { prompt: 'Write sentences where you want/ask/tell SOMEONE to do something.', checklist: ['Pattern: verb + object + to-infinitive', 'Example: "I want YOU to be happy" (NOT "I want that you be happy")', 'Use at least 5 different reporting verbs'], minWords: 80 },

  // ===== RELATIVE CLAUSES (71-74) =====
  71: { prompt: 'Describe 5 people or things using relative clauses (who/which/that/whose/where).', checklist: ['"who" for people as subject', '"which/that" for things', '"whose" for possession', '"where" for places'], minWords: 80 },

  // ===== ARTICLES (69-70) — Kirill weakness =====
  69: { prompt: 'Write a short story using "a/an" for first mention and "the" for specific things already mentioned.', checklist: ['First mention: a/an', 'Known/specific: the', 'Zero article for general plural/uncountable'], minWords: 100 },
  70: { prompt: 'Describe places and institutions. Use "the" with rivers/seas/hotels, but NOT with most countries/cities/meals.', checklist: ['"the" with: rivers, oceans, hotels, cinemas, (the UK, the US)', 'NO article with: meals, sports, most countries, languages', 'Double-check every noun'], minWords: 100 },

  // ===== PREPOSITIONS (121-124) — Kirill weakness =====
  121: { prompt: 'Write about things you did AT specific times, ON specific days, and IN specific months/years.', checklist: ['"at" + exact time (at 8pm, at noon)', '"on" + day/date (on Monday, on 25th March)', '"in" + month/year/season'], minWords: 80 },
  122: { prompt: 'Describe places you know, using "at", "in", and "on" correctly.', checklist: ['"at" for specific point (at the station, at the door)', '"in" for enclosed (in a room, in London)', '"on" for surface (on the wall)'], minWords: 80 },

  // ===== DESPITE / ALTHOUGH (112) — Kirill weakness =====
  112: { prompt: 'Write 5 sentences where something unexpected happens despite a difficulty.', checklist: ['"Despite + noun/-ing" (Despite the rain, we went out)', '"Although + clause" (Although it was raining, we went out)', 'NEVER: "Despite of"'], minWords: 80 },

  // ===== PHRASAL VERBS (133-136) =====
  133: { prompt: 'Write a story using at least 6 phrasal verbs with GET.', checklist: ['get up, get along with, get on/off, get over, get rid of, get away with', 'Natural narrative flow', 'Show meaning from context'], minWords: 100 },
  134: { prompt: 'Write a story using at least 6 phrasal verbs with TAKE, PUT, or MAKE.', checklist: ['take off, take after, take up, put on, put off, put up with, make up, make out', 'Mix at least two verbs', 'Natural context'], minWords: 100 },
}

export function getWritingPrompt(unitNumber: number): WritingPrompt {
  if (PROMPTS[unitNumber]) return PROMPTS[unitNumber]

  // Fallback — generic prompt
  return {
    prompt: 'Write a short text using the grammar from this unit. Try to use the rules you just learned as much as possible.',
    checklist: [
      'Use the specific grammar from this unit',
      'Write at least 5-10 sentences',
      'Re-read your text and check for mistakes',
    ],
    minWords: 60,
  }
}
