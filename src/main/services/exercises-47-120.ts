import type { ExData } from './exercises-data'

export const exercises47to120: ExData[] = [
  // ===== REPORTED SPEECH (47-48) =====
  { unit: 47, type: 'multiple-choice', q: '"I\'m tired." He said he ___ tired.', opts: ['is', 'was', 'be', 'were'], a: 'was', expl: 'Reported speech: present → past.' },
  { unit: 47, type: 'fill-in-blank', q: '"I\'ll call you." She said she ___ call me.', opts: null, a: 'would', expl: 'will → would in reported speech.' },
  { unit: 47, type: 'true-false', q: '"He said me he was tired." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"Said" doesn\'t take an object. Use "told me".' },
  { unit: 47, type: 'multiple-choice', q: '"I can swim." He said he ___ swim.', opts: ['can', 'could', 'may', 'will'], a: 'could', expl: 'can → could in reported speech.' },

  { unit: 48, type: 'multiple-choice', q: '"Where do you live?" She asked me where I ___.', opts: ['live', 'lived', 'do live', 'living'], a: 'lived', expl: 'Reported question: tense shift + statement order.' },
  { unit: 48, type: 'fill-in-blank', q: '"Are you married?" He asked me ___ I was married.', opts: null, a: 'if', expl: 'Yes/no questions: use "if" or "whether".' },
  { unit: 48, type: 'true-false', q: '"He asked me where did I live." — This is correct.', opts: ['True', 'False'], a: 'False', expl: 'Reported questions use statement order: "where I lived".' },
  { unit: 48, type: 'multiple-choice', q: '"Can you help?" She asked ___ I could help.', opts: ['if', 'that', 'what', 'do'], a: 'if', expl: 'Yes/no question → if/whether in reported speech.' },

  // ===== QUESTIONS (49-52) =====
  { unit: 49, type: 'multiple-choice', q: 'Where ___ she work?', opts: ['does', 'do', 'is', 'has'], a: 'does', expl: 'Present simple question: does + he/she/it.' },
  { unit: 49, type: 'fill-in-blank', q: 'Who ___ (want) some coffee? (who = subject)', opts: null, a: 'wants', expl: 'Who as subject: no auxiliary needed.' },
  { unit: 49, type: 'true-false', q: '"Who does want coffee?" — This is correct.', opts: ['True', 'False'], a: 'False', expl: 'When "who" is subject, don\'t use do/does.' },
  { unit: 49, type: 'multiple-choice', q: 'What ___ yesterday?', opts: ['happened', 'did happen', 'was happen', 'happens'], a: 'happened', expl: '"What" as subject → no auxiliary.' },

  { unit: 50, type: 'multiple-choice', q: 'Do you know where Tom ___?', opts: ['is', 'is he', 'he is', 'does he'], a: 'is', expl: 'Indirect question: statement word order.' },
  { unit: 50, type: 'true-false', q: '"Do you know where is Tom?" — This is correct.', opts: ['True', 'False'], a: 'False', expl: 'Indirect questions use statement order: "where Tom is".' },
  { unit: 50, type: 'fill-in-blank', q: 'I wonder why she ___ (not/come) to the party.', opts: null, a: "didn't come", expl: 'Indirect question with past simple.' },

  { unit: 51, type: 'multiple-choice', q: '"I\'m tired." "___ am I."', opts: ['So', 'Neither', 'Too', 'Either'], a: 'So', expl: '"So am I" = me too (agreement with positive).' },
  { unit: 51, type: 'multiple-choice', q: '"I don\'t like spiders." "___ do I."', opts: ['So', 'Neither', 'Too', 'Either'], a: 'Neither', expl: '"Neither do I" = me neither (agreement with negative).' },
  { unit: 51, type: 'fill-in-blank', q: '"Will it rain?" "I ___ so." (= I don\'t think it will)', opts: null, a: "don't think", expl: '"I don\'t think so" = probably not.' },

  { unit: 52, type: 'multiple-choice', q: 'You\'re from Poland, ___ you?', opts: ['are', 'aren\'t', 'do', 'don\'t'], a: 'aren\'t', expl: 'Positive sentence → negative tag.' },
  { unit: 52, type: 'fill-in-blank', q: 'She doesn\'t speak French, ___ she?', opts: null, a: 'does', expl: 'Negative sentence → positive tag.' },
  { unit: 52, type: 'multiple-choice', q: 'Let\'s go out, ___ we?', opts: ['shall', 'will', 'do', 'can'], a: 'shall', expl: 'After "Let\'s" → "shall we?"' },

  // ===== VERB PATTERNS (53-60) =====
  { unit: 53, type: 'multiple-choice', q: 'I enjoy ___ books.', opts: ['read', 'reading', 'to read', 'reads'], a: 'reading', expl: '"Enjoy" is followed by -ing.' },
  { unit: 53, type: 'true-false', q: '"I enjoy to read books." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"Enjoy" + -ing, not to-infinitive.' },
  { unit: 53, type: 'fill-in-blank', q: 'She suggested ___ (go) to a restaurant.', opts: null, a: 'going', expl: '"Suggest" + -ing.' },
  { unit: 53, type: 'multiple-choice', q: 'He denied ___ the money.', opts: ['steal', 'to steal', 'stealing', 'stole'], a: 'stealing', expl: '"Deny" + -ing.' },

  { unit: 54, type: 'multiple-choice', q: 'I decided ___ early.', opts: ['leave', 'leaving', 'to leave', 'left'], a: 'to leave', expl: '"Decide" + to-infinitive.' },
  { unit: 54, type: 'fill-in-blank', q: 'She wants ___ (buy) a new car.', opts: null, a: 'to buy', expl: '"Want" + to-infinitive.' },
  { unit: 54, type: 'multiple-choice', q: 'I can\'t afford ___ on holiday.', opts: ['go', 'going', 'to go', 'gone'], a: 'to go', expl: '"Afford" + to-infinitive.' },
  { unit: 54, type: 'true-false', q: '"He promised calling me." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"Promise" + to-infinitive: "promised to call".' },

  { unit: 55, type: 'multiple-choice', q: 'I want you ___ happy.', opts: ['be', 'to be', 'being', 'been'], a: 'to be', expl: '"Want" + object + to-infinitive.' },
  { unit: 55, type: 'true-false', q: '"I want that you help me." — This is correct.', opts: ['True', 'False'], a: 'False', expl: 'Correct: "I want you to help me."' },
  { unit: 55, type: 'fill-in-blank', q: 'She asked me ___ (help) her.', opts: null, a: 'to help', expl: '"Ask" + object + to-infinitive.' },

  { unit: 56, type: 'multiple-choice', q: 'I remember ___ the door. (= I did it, I remember)', opts: ['lock', 'to lock', 'locking', 'locked'], a: 'locking', expl: '"Remember" + -ing = memory of a past action.' },
  { unit: 56, type: 'multiple-choice', q: 'Remember ___ the door! (= don\'t forget)', opts: ['lock', 'to lock', 'locking', 'locked'], a: 'to lock', expl: '"Remember" + to = don\'t forget to do it.' },
  { unit: 56, type: 'fill-in-blank', q: 'He stopped ___ (smoke). (= quit the habit)', opts: null, a: 'smoking', expl: '"Stop" + -ing = quit doing something.' },
  { unit: 56, type: 'fill-in-blank', q: 'He stopped ___ (smoke). (= paused to have a cigarette)', opts: null, a: 'to smoke', expl: '"Stop" + to = pause in order to do something.' },

  { unit: 58, type: 'multiple-choice', q: 'She left without ___ goodbye.', opts: ['say', 'to say', 'saying', 'said'], a: 'saying', expl: 'Preposition + -ing.' },
  { unit: 58, type: 'fill-in-blank', q: 'I\'m thinking about ___ (change) my job.', opts: null, a: 'changing', expl: '"About" (preposition) + -ing.' },
  { unit: 58, type: 'true-false', q: '"I\'m looking forward to see you." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"Looking forward to" + -ing: "to seeing you".' },

  // ===== ARTICLES (61-64) =====
  { unit: 61, type: 'multiple-choice', q: 'Can I have a piece of ___?', opts: ['an advice', 'advice', 'advices', 'the advices'], a: 'advice', expl: '"Advice" is uncountable. Use "a piece of advice".' },
  { unit: 61, type: 'true-false', q: '"The news are good." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"News" is uncountable singular: "The news IS good."' },
  { unit: 61, type: 'fill-in-blank', q: 'I need some ___. (= facts/details)', opts: null, a: 'information', expl: '"Information" is uncountable (no "informations").' },

  { unit: 62, type: 'multiple-choice', q: 'I saw ___ dog in the park. ___ dog was very friendly.', opts: ['a / The', 'the / The', 'a / A', '- / The'], a: 'a / The', expl: 'First mention = "a". Known/specific = "the".' },
  { unit: 62, type: 'fill-in-blank', q: 'I love ___. (music in general)', opts: null, a: 'music', expl: 'General/uncountable = no article.' },
  { unit: 62, type: 'multiple-choice', q: '___ sun rises in ___ east.', opts: ['A / an', 'The / the', 'A / the', '- / -'], a: 'The / the', expl: 'Unique things: the sun, the east.' },

  { unit: 63, type: 'true-false', q: '"She lives in the France." — This is correct.', opts: ['True', 'False'], a: 'False', expl: 'Most countries: no "the". "She lives in France."' },
  { unit: 63, type: 'multiple-choice', q: 'I had ___ breakfast at 8.', opts: ['a', 'the', 'an', '(no article)'], a: '(no article)', expl: 'Meals: no article. "I had breakfast."' },
  { unit: 63, type: 'fill-in-blank', q: 'He plays ___. (football)', opts: null, a: 'football', expl: 'Sports: no article.' },

  // ===== QUANTIFIERS (65-70) =====
  { unit: 65, type: 'multiple-choice', q: 'Would you like ___ coffee?', opts: ['some', 'any', 'no', 'a'], a: 'some', expl: '"Some" in offers/requests.' },
  { unit: 65, type: 'fill-in-blank', q: 'I didn\'t buy ___ bananas.', opts: null, a: 'any', expl: '"Any" in negative sentences.' },

  { unit: 67, type: 'multiple-choice', q: 'I don\'t have ___ time.', opts: ['many', 'much', 'a lot', 'few'], a: 'much', expl: '"Much" + uncountable in negatives.' },
  { unit: 67, type: 'true-false', q: '"I\'ve got much money." — This sounds natural.', opts: ['True', 'False'], a: 'False', expl: 'In positive sentences, use "a lot of money".' },

  { unit: 68, type: 'multiple-choice', q: 'I have ___ friends in London. (= some, positive)', opts: ['few', 'a few', 'little', 'a little'], a: 'a few', expl: '"A few" = some (positive).' },
  { unit: 68, type: 'multiple-choice', q: 'We have ___ time. Hurry up! (= not enough)', opts: ['few', 'a few', 'little', 'a little'], a: 'little', expl: '"Little" = not much (negative meaning).' },

  { unit: 70, type: 'multiple-choice', q: '___ restaurants are good. (= the two)', opts: ['Both', 'Either', 'Neither', 'All'], a: 'Both', expl: '"Both" = two things together.' },
  { unit: 70, type: 'fill-in-blank', q: '___ answer is correct. (= not this one, not that one)', opts: null, a: 'Neither', expl: '"Neither" = not one and not the other.' },

  // ===== RELATIVE CLAUSES (71-75) =====
  { unit: 71, type: 'multiple-choice', q: 'The woman ___ lives next door is a doctor.', opts: ['which', 'who', 'what', 'whose'], a: 'who', expl: '"Who" for people in relative clauses.' },
  { unit: 71, type: 'fill-in-blank', q: 'That\'s the man ___ car was stolen.', opts: null, a: 'whose', expl: '"Whose" for possession.' },
  { unit: 71, type: 'multiple-choice', q: 'The hotel ___ we stayed was very nice.', opts: ['who', 'which', 'where', 'whose'], a: 'where', expl: '"Where" for places.' },

  { unit: 74, type: 'true-false', q: '"My brother, that lives in London, is a doctor." — This is correct.', opts: ['True', 'False'], a: 'False', expl: 'Non-defining clauses cannot use "that". Use "who".' },
  { unit: 74, type: 'multiple-choice', q: 'Paris, ___ is the capital of France, is beautiful.', opts: ['that', 'which', 'where', 'what'], a: 'which', expl: 'Non-defining clause: commas + "which".' },

  // ===== ADJECTIVES & COMPARISON (76-80) =====
  { unit: 76, type: 'true-false', q: '"She plays the piano good." — This is correct.', opts: ['True', 'False'], a: 'False', expl: 'Need adverb: "She plays the piano well."' },
  { unit: 76, type: 'fill-in-blank', q: 'He speaks English very ___. (good → ?)', opts: null, a: 'well', expl: '"Good" → "well" (irregular adverb).' },

  { unit: 77, type: 'multiple-choice', q: 'She\'s ___ than her sister.', opts: ['tall', 'taller', 'tallest', 'more tall'], a: 'taller', expl: 'Short adjective: -er for comparative.' },
  { unit: 77, type: 'fill-in-blank', q: 'This is the ___ (expensive) restaurant in town.', opts: null, a: 'most expensive', expl: 'Long adjective: "most" for superlative.' },
  { unit: 77, type: 'multiple-choice', q: 'My English is getting ___.', opts: ['good', 'better', 'best', 'more good'], a: 'better', expl: 'Irregular: good → better → best.' },

  { unit: 78, type: 'fill-in-blank', q: 'Tom is ___ tall ___ his brother. (= equal)', opts: null, a: 'as, as', expl: '"As … as" for equality.' },

  { unit: 79, type: 'multiple-choice', q: 'The coffee isn\'t hot ___.', opts: ['too', 'enough', 'very', 'so'], a: 'enough', expl: '"Enough" goes AFTER the adjective.' },
  { unit: 79, type: 'true-false', q: '"I don\'t have enough hot money." — The word order is correct.', opts: ['True', 'False'], a: 'False', expl: '"Enough" before nouns: "enough money".' },

  // ===== CONJUNCTIONS (81-85) =====
  { unit: 81, type: 'multiple-choice', q: '___ it rained, we enjoyed the trip.', opts: ['Although', 'Despite', 'In spite', 'However'], a: 'Although', expl: '"Although" + clause (subject + verb).' },
  { unit: 81, type: 'fill-in-blank', q: 'In spite of ___ rain, we enjoyed the trip.', opts: null, a: 'the', expl: '"In spite of" + noun: "in spite of the rain".' },
  { unit: 81, type: 'true-false', q: '"In spite of it rained, we went out." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"In spite of" + noun, NOT clause. Use "although" for clauses.' },

  { unit: 82, type: 'multiple-choice', q: 'Take an umbrella ___ it rains.', opts: ['if', 'in case', 'unless', 'when'], a: 'in case', expl: '"In case" = as a precaution (might happen).' },
  { unit: 82, type: 'fill-in-blank', q: 'I won\'t go ___ you come with me. (= if you don\'t come)', opts: null, a: 'unless', expl: '"Unless" = except if / if not.' },

  { unit: 83, type: 'multiple-choice', q: 'The weather was ___ nice that we went to the beach.', opts: ['so', 'such', 'too', 'very'], a: 'so', expl: '"So" + adjective.' },
  { unit: 83, type: 'multiple-choice', q: 'It was ___ a nice day that we went to the beach.', opts: ['so', 'such', 'too', 'very'], a: 'such', expl: '"Such" + (a/an) + noun.' },

  { unit: 84, type: 'multiple-choice', q: 'I fell asleep ___ the film.', opts: ['for', 'during', 'while', 'since'], a: 'during', expl: '"During" + noun.' },
  { unit: 84, type: 'true-false', q: '"During I was on holiday, it rained." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"During" + noun. Use "while" for clauses.' },

  { unit: 85, type: 'multiple-choice', q: 'I\'ll be home ___ 6 o\'clock. (= not later than)', opts: ['by', 'until', 'at', 'since'], a: 'by', expl: '"By" = not later than (deadline).' },
  { unit: 85, type: 'fill-in-blank', q: 'I\'ll be at work ___ 6 o\'clock. (= from now to 6)', opts: null, a: 'until', expl: '"Until" = up to that time (continuous).' },

  // ===== PREPOSITIONS (86-96) =====
  { unit: 86, type: 'multiple-choice', q: 'I start work ___ 9 o\'clock.', opts: ['at', 'on', 'in', 'by'], a: 'at', expl: '"At" + exact time.' },
  { unit: 86, type: 'fill-in-blank', q: 'She was born ___ June.', opts: null, a: 'in', expl: '"In" + month/year/season.' },
  { unit: 86, type: 'multiple-choice', q: 'The meeting is ___ Monday.', opts: ['at', 'on', 'in', 'by'], a: 'on', expl: '"On" + day/date.' },

  { unit: 87, type: 'multiple-choice', q: 'She\'s ___ the kitchen.', opts: ['at', 'in', 'on', 'to'], a: 'in', expl: '"In" for enclosed spaces.' },
  { unit: 87, type: 'fill-in-blank', q: 'I\'ll meet you ___ the station.', opts: null, a: 'at', expl: '"At" for a point/location.' },

  { unit: 92, type: 'multiple-choice', q: 'I\'m interested ___ history.', opts: ['in', 'at', 'about', 'for'], a: 'in', expl: '"Interested in".' },
  { unit: 92, type: 'fill-in-blank', q: 'She\'s afraid ___ dogs.', opts: null, a: 'of', expl: '"Afraid of".' },
  { unit: 92, type: 'multiple-choice', q: 'He\'s very good ___ maths.', opts: ['in', 'at', 'for', 'with'], a: 'at', expl: '"Good at".' },

  { unit: 93, type: 'multiple-choice', q: 'It depends ___ the weather.', opts: ['on', 'of', 'in', 'at'], a: 'on', expl: '"Depend on".' },
  { unit: 93, type: 'fill-in-blank', q: 'I\'m looking ___ my keys. (= searching)', opts: null, a: 'for', expl: '"Look for" = search.' },

  // ===== PHRASAL VERBS (97-115) =====
  { unit: 97, type: 'multiple-choice', q: 'Can you turn ___ the music? It\'s too loud.', opts: ['up', 'down', 'on', 'off'], a: 'down', expl: '"Turn down" = make quieter.' },
  { unit: 97, type: 'fill-in-blank', q: 'She takes ___ her mother. (= resembles)', opts: null, a: 'after', expl: '"Take after" = look/act like.' },
  { unit: 97, type: 'multiple-choice', q: 'We\'ve run ___ of milk.', opts: ['out', 'off', 'up', 'down'], a: 'out', expl: '"Run out of" = use all supply.' },

  { unit: 99, type: 'multiple-choice', q: 'I\'ve given ___ smoking.', opts: ['up', 'out', 'in', 'off'], a: 'up', expl: '"Give up" = quit.' },
  { unit: 99, type: 'fill-in-blank', q: 'The car broke ___ on the motorway.', opts: null, a: 'down', expl: '"Break down" = stop working.' },

  { unit: 100, type: 'multiple-choice', q: 'Put ___ your coat. It\'s cold.', opts: ['on', 'off', 'up', 'out'], a: 'on', expl: '"Put on" = wear.' },
  { unit: 100, type: 'fill-in-blank', q: 'The meeting has been put ___ until next week.', opts: null, a: 'off', expl: '"Put off" = postpone.' },

  { unit: 111, type: 'multiple-choice', q: 'I\'m looking ___ to the party.', opts: ['forward', 'up', 'after', 'for'], a: 'forward', expl: '"Look forward to" = anticipate.' },
  { unit: 111, type: 'fill-in-blank', q: 'Can you look ___ the baby? (= take care)', opts: null, a: 'after', expl: '"Look after" = take care of.' },

  { unit: 112, type: 'multiple-choice', q: 'It took her a long time to get ___ the illness.', opts: ['over', 'up', 'on', 'off'], a: 'over', expl: '"Get over" = recover.' },
  { unit: 112, type: 'fill-in-blank', q: 'I want to get ___ of these old magazines.', opts: null, a: 'rid', expl: '"Get rid of" = remove/discard.' },

  { unit: 116, type: 'multiple-choice', q: 'She ___ a mistake. (make/do)', opts: ['made', 'did', 'done', 'make'], a: 'made', expl: '"Make a mistake" (not "do").' },
  { unit: 116, type: 'fill-in-blank', q: 'I need to ___ my homework. (make/do)', opts: null, a: 'do', expl: '"Do homework" (not "make").' },
  { unit: 116, type: 'true-false', q: '"Can you make me a favour?" — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"Do a favour" (not "make").' },

  { unit: 118, type: 'multiple-choice', q: 'It\'s ___ dark. (= becoming)', opts: ['getting', 'doing', 'making', 'having'], a: 'getting', expl: '"Get" + adjective = become.' },
  { unit: 118, type: 'fill-in-blank', q: 'What time did you ___ home? (= arrive)', opts: null, a: 'get', expl: '"Get home" = arrive home.' },

  { unit: 120, type: 'multiple-choice', q: 'Can you ___ me some water? (= to me)', opts: ['bring', 'take', 'carry', 'get'], a: 'bring', expl: '"Bring" = towards the speaker.' },
  { unit: 120, type: 'fill-in-blank', q: 'Don\'t forget to ___ your umbrella. (= with you, away)', opts: null, a: 'take', expl: '"Take" = away from the speaker.' },
]
