import type { Lesson } from './lessons'

export const lessons91to145: Record<number, Lesson> = {
  // ===== PREPOSITIONS (Units 91-100) =====
  91: {
    rule: 'Noun + preposition: reason for, cause of, advantage/disadvantage of, damage to, increase/decrease in, need for.',
    formula: 'noun + specific preposition',
    examples: [
      { sentence: 'What\'s the reason for the delay?', correct: true },
      { sentence: 'There\'s been an increase in crime.', correct: true },
      { sentence: 'What are the advantages of living in a city?', correct: true },
      { sentence: 'The fire caused a lot of damage to the building.', correct: true },
      { sentence: 'There\'s a need for more teachers.', correct: true },
      { sentence: 'Is there a solution to this problem?', correct: true },
    ],
  },
  92: {
    rule: 'Adjective + preposition: afraid of, interested in, good at, sorry for/about, different from, similar to, responsible for.',
    formula: 'adjective + specific preposition',
    examples: [
      { sentence: 'I\'m interested in history.', correct: true },
      { sentence: 'She\'s afraid of dogs.', correct: true },
      { sentence: 'He\'s very good at maths.', correct: true },
      { sentence: 'I\'m sorry for being late. / I\'m sorry about the noise.', correct: true },
      { sentence: 'This is different from what I expected.', correct: true },
      { sentence: 'She\'s responsible for the marketing department.', correct: true },
    ],
    notes: [
      '"Married to" (NOT "with"): "She\'s married to a doctor."',
      '"Nice/kind/good OF someone to do something" vs "nice/kind TO someone".',
    ],
  },
  93: {
    rule: 'Verb + preposition: depend on, belong to, listen to, look at, wait for, ask for, pay for, thank for, look for.',
    formula: 'verb + specific preposition',
    examples: [
      { sentence: 'It depends on the weather.', correct: true },
      { sentence: 'This book belongs to me.', correct: true },
      { sentence: 'I\'m looking for my keys.', correct: true },
      { sentence: 'Can you look after the children? (= take care of)', correct: true },
      { sentence: 'I\'m waiting for the bus.', correct: true },
      { sentence: 'He apologised for being late.', correct: true },
    ],
  },
  94: {
    rule: 'Verb + object + preposition: remind sb of, blame sb for, congratulate sb on, accuse sb of, thank sb for, warn sb about.',
    formula: 'verb + object + preposition',
    examples: [
      { sentence: 'She reminded me of my mother.', correct: true },
      { sentence: 'They blamed me for the mistake.', correct: true },
      { sentence: 'I congratulated her on passing the exam.', correct: true },
      { sentence: 'He accused me of lying.', correct: true },
      { sentence: 'I thanked them for their help.', correct: true },
      { sentence: 'She warned me about the traffic.', correct: true },
    ],
  },
  95: {
    rule: 'Verb + preposition: believe in, consist of, belong to, succeed in, insist on, concentrate on, complain about, deal with.',
    formula: 'verb + preposition (+ -ing if followed by a verb)',
    examples: [
      { sentence: 'Do you believe in ghosts?', correct: true },
      { sentence: 'She succeeded in passing the exam.', correct: true },
      { sentence: 'He insisted on paying for dinner.', correct: true },
      { sentence: 'I can\'t concentrate on my work.', correct: true },
      { sentence: 'Don\'t worry about the exam.', correct: true },
      { sentence: 'How do you deal with stress?', correct: true },
    ],
  },
  96: {
    rule: 'Verb + for/from/on: care for, apply for, search for, suffer from, recover from, protect from, rely on, spend on.',
    formula: 'verb + for/from/on',
    examples: [
      { sentence: 'She applied for the job.', correct: true },
      { sentence: 'He\'s recovering from an operation.', correct: true },
      { sentence: 'You can rely on me.', correct: true },
      { sentence: 'How much did you spend on the holiday?', correct: true },
      { sentence: 'I don\'t care for that kind of music. (= don\'t like)', correct: true },
      { sentence: 'This cream protects your skin from the sun.', correct: true },
    ],
  },

  // ===== PHRASAL VERBS (Units 97-110) =====
  97: {
    rule: 'Phrasal verbs combine a verb with a particle (adverb/preposition) to create a new meaning. "Look up" ≠ "look" + "up".',
    formula: 'verb + particle = new meaning',
    examples: [
      { sentence: 'Can you turn down the music? (= make it quieter)', correct: true },
      { sentence: 'I need to look up this word. (= search in a dictionary)', correct: true },
      { sentence: 'She takes after her mother. (= looks/acts like)', correct: true },
      { sentence: 'The plane took off on time. (= left the ground)', correct: true },
      { sentence: 'I can\'t put up with this noise! (= tolerate)', correct: true },
      { sentence: 'We\'ve run out of milk. (= used all of it)', correct: true },
    ],
    notes: [
      'Separable: object can go between verb and particle: "turn the music down" / "turn down the music".',
      'With pronouns, always separate: "turn it down" (NOT "turn down it").',
      'Inseparable: "I\'m looking for my keys" (NOT "looking my keys for").',
    ],
  },
  98: {
    rule: 'Phrasal verbs with "in" and "out": come in / go out, fill in / find out, give in / carry out, check in / check out.',
    formula: 'verb + in (enter/complete) | verb + out (leave/discover)',
    examples: [
      { sentence: 'Please fill in this form. (= complete)', correct: true },
      { sentence: 'I need to find out the truth. (= discover)', correct: true },
      { sentence: 'Don\'t give in! Keep trying! (= surrender)', correct: true },
      { sentence: 'We need to carry out more research. (= do/perform)', correct: true },
      { sentence: 'Can you work out the answer? (= calculate)', correct: true },
      { sentence: 'It turned out that she was right. (= the result was)', correct: true },
    ],
  },
  99: {
    rule: 'Phrasal verbs with "up" and "down": pick up, give up, set up, slow down, break down, turn up/down.',
    formula: 'verb + up (increase/complete) | verb + down (decrease/stop)',
    examples: [
      { sentence: 'I\'ve given up smoking. (= quit)', correct: true },
      { sentence: 'Can you pick me up at the station? (= collect)', correct: true },
      { sentence: 'They\'re setting up a new company. (= establishing)', correct: true },
      { sentence: 'The car broke down on the motorway. (= stopped working)', correct: true },
      { sentence: 'Please slow down! You\'re driving too fast.', correct: true },
      { sentence: 'I\'ll look it up in the dictionary. (= search for)', correct: true },
    ],
  },
  100: {
    rule: 'Phrasal verbs with "on" and "off": put on / take off, get on / get off, carry on, go off, set off, put off.',
    formula: 'verb + on (continue/wear) | verb + off (remove/leave/cancel)',
    examples: [
      { sentence: 'Put on your coat. It\'s cold. (= wear)', correct: true },
      { sentence: 'Take off your shoes. (= remove)', correct: true },
      { sentence: 'Carry on working. Don\'t stop. (= continue)', correct: true },
      { sentence: 'The alarm went off at 6 a.m. (= started ringing)', correct: true },
      { sentence: 'We set off early in the morning. (= began a journey)', correct: true },
      { sentence: 'The meeting has been put off until next week. (= postponed)', correct: true },
    ],
  },
  101: {
    rule: 'Phrasal verbs with "away" and "back": go away, give away, throw away, come back, get back, pay back.',
    formula: 'verb + away (depart/remove) | verb + back (return)',
    examples: [
      { sentence: 'Go away! Leave me alone!', correct: true },
      { sentence: 'I gave away all my old clothes. (= gave to others)', correct: true },
      { sentence: 'Don\'t throw away those boxes. (= discard)', correct: true },
      { sentence: 'When did you get back from holiday? (= return)', correct: true },
      { sentence: 'I\'ll pay you back tomorrow. (= repay)', correct: true },
      { sentence: 'She\'s moved away from the city. (= left)', correct: true },
    ],
  },

  // ===== PRONOUNS, THERE/IT (Units 102-115) =====
  102: {
    rule: 'Reflexive pronouns (myself, yourself, himself etc.) — when subject and object are the same person.',
    formula: 'subject + verb + myself/yourself/himself/herself/itself/ourselves/themselves',
    examples: [
      { sentence: 'I cut myself while I was cooking.', correct: true },
      { sentence: 'She taught herself to play the guitar.', correct: true },
      { sentence: 'Help yourself to some food.', correct: true },
      { sentence: 'The door opened by itself. (= nobody opened it)', correct: true },
      { sentence: 'I enjoyed myself at the party. (= had a good time)', correct: true },
      { sentence: 'Make yourself comfortable.', correct: true },
    ],
    notes: [
      '"By myself" = alone, without help: "I live by myself."',
      'Don\'t use reflexive with: feel, relax, concentrate, meet, wash, dress (usually).',
    ],
  },
  103: {
    rule: '"There" + be says something exists. "It" is used for time, weather, distance, and as an empty subject.',
    formula: 'There is/are + noun (existence) | It is + adjective/time/weather',
    examples: [
      { sentence: 'There\'s a good restaurant near here.', correct: true },
      { sentence: 'It\'s raining. (= weather)', correct: true },
      { sentence: 'It\'s 10 o\'clock. (= time)', correct: true },
      { sentence: 'It\'s easy to make mistakes. (= it + adj + to-inf)', correct: true },
      { sentence: 'There were a lot of people at the party.', correct: true },
      { sentence: 'Is there a bank near here?', correct: true },
    ],
  },
  104: {
    rule: '"Some-" (someone, something) for positive. "Any-" (anyone, anything) for negative/questions. "No-" (nobody, nothing) = not any.',
    formula: 'some- (positive) | any- (negative/question) | no- (= not any)',
    examples: [
      { sentence: 'Someone called you. (= positive)', correct: true },
      { sentence: 'Is there anything I can do?', correct: true },
      { sentence: 'Nobody told me about it. (= not anybody)', correct: true },
      { sentence: 'I went somewhere nice last weekend.', correct: true },
      { sentence: 'There\'s nothing to worry about.', correct: true },
      { sentence: 'You can sit anywhere. (= it doesn\'t matter where)', correct: true },
    ],
  },
  105: {
    rule: '"Each other" / "one another" = mutual action. "Themselves" = each person independently.',
    formula: 'each other / one another = mutual | themselves = independently',
    examples: [
      { sentence: 'They love each other. (= A loves B, B loves A)', correct: true },
      { sentence: 'They love themselves. (= A loves A, B loves B)', correct: true },
      { sentence: 'We write to each other every week.', correct: true },
      { sentence: 'The two teams played against each other.', correct: true },
      { sentence: 'We looked at each other and laughed.', correct: true },
      { sentence: 'They often argue with each other.', correct: true },
    ],
  },

  // ===== MORE GRAMMAR (Units 106-130) =====
  106: {
    rule: '"One" and "ones" replace a countable noun to avoid repetition. "One" = singular, "ones" = plural.',
    formula: 'which one? | the … one(s) | this/that one | these/those ones',
    examples: [
      { sentence: '"Which jacket do you prefer?" — "The black one."', correct: true },
      { sentence: 'These shoes are too small. I need bigger ones.', correct: true },
      { sentence: '"Which flowers shall I buy?" — "Those ones."', correct: true },
      { sentence: 'I need a pen. Have you got one?', correct: true },
      { sentence: 'The new phones are better than the old ones.', correct: true },
      { sentence: 'This cake is delicious. Would you like one?', correct: true },
    ],
  },
  107: {
    rule: '"Own" and "on my own / by myself" — possessive emphasis and independence.',
    formula: 'my/your/his own + noun = belongs to me | on my own / by myself = alone',
    examples: [
      { sentence: 'I have my own room. (= it belongs to me, not shared)', correct: true },
      { sentence: 'I live on my own. (= alone)', correct: true },
      { sentence: 'She made the dress herself. (= nobody helped)', correct: true },
      { sentence: 'I prefer to work on my own.', correct: true },
      { sentence: 'He has his own business.', correct: true },
      { sentence: 'Did you build that by yourself? Impressive!', correct: true },
    ],
  },

  // ===== LINKING WORDS & SENTENCE STRUCTURE (Units 108-120) =====
  108: {
    rule: '"Even" adds emphasis = surprising or extreme. "Even though" = despite the fact that. "Even if" = whether or not.',
    formula: 'even + surprising fact | even though + clause | even if + clause',
    examples: [
      { sentence: 'Even the children understood it. (= it was so easy)', correct: true },
      { sentence: 'Even though she was tired, she kept working.', correct: true },
      { sentence: 'I wouldn\'t buy that car even if I had the money.', correct: true },
      { sentence: 'He didn\'t even say goodbye.', correct: true },
      { sentence: 'I can\'t even swim! (= you\'d expect me to)', correct: true },
      { sentence: 'Even I knew the answer. (= and I\'m not clever)', correct: true },
    ],
  },
  109: {
    rule: '"Still", "yet", "already" — "still" = continuing, "yet" = up to now (negative/question), "already" = sooner than expected.',
    formula: 'still (before verb) = continues | yet (end, neg/Q) = until now | already (mid) = done',
    examples: [
      { sentence: 'She still lives with her parents. (= continues)', correct: true },
      { sentence: 'Have you finished yet? (= up to now)', correct: true },
      { sentence: 'I\'ve already eaten. (= sooner than expected)', correct: true },
      { sentence: 'It\'s 10 o\'clock and he still hasn\'t arrived.', correct: true },
      { sentence: 'I haven\'t decided yet.', correct: true },
      { sentence: '"Do you want something to eat?" — "No, I\'ve already had lunch."', correct: true },
    ],
  },
  110: {
    rule: '"Also", "too", "as well", "either" — all mean "in addition". Position differs. "Either" in negatives.',
    formula: 'also (mid-sentence) | too/as well (end) | either (end, negative)',
    examples: [
      { sentence: 'She speaks French. She also speaks German.', correct: true },
      { sentence: 'I love pizza, and I love pasta too.', correct: true },
      { sentence: 'I like tennis as well.', correct: true },
      { sentence: 'I don\'t like spiders, and I don\'t like snakes either.', correct: true },
      { sentence: '"I\'m tired." — "Me too." / "So am I."', correct: true },
      { sentence: '"I can\'t swim." — "Neither can I." / "Me neither."', correct: true },
    ],
  },

  // ===== PHRASAL VERBS continued (Units 111-145) =====
  111: {
    rule: '"Look" phrasal verbs: look at (observe), look for (search), look after (care), look up (find info), look forward to (anticipate), look out (be careful).',
    formula: 'look + particle = different meanings',
    examples: [
      { sentence: 'Look at this photo! (= observe)', correct: true },
      { sentence: 'I\'m looking for my wallet. (= searching)', correct: true },
      { sentence: 'Can you look after the baby? (= take care of)', correct: true },
      { sentence: 'I\'ll look it up online. (= search for information)', correct: true },
      { sentence: 'I\'m looking forward to the party. (= excited about)', correct: true },
      { sentence: 'Look out! There\'s a car coming! (= be careful)', correct: true },
    ],
  },
  112: {
    rule: '"Get" phrasal verbs: get up (rise), get on/off (enter/leave transport), get over (recover), get along with (have good relationship), get rid of (remove).',
    formula: 'get + particle = different meanings',
    examples: [
      { sentence: 'I get up at 7 every morning.', correct: true },
      { sentence: 'She got on the bus. (= entered)', correct: true },
      { sentence: 'It took her a long time to get over the illness. (= recover)', correct: true },
      { sentence: 'Do you get along with your neighbours? (= have good relationship)', correct: true },
      { sentence: 'I want to get rid of these old magazines.', correct: true },
      { sentence: 'I can\'t get through to the office. The line is busy. (= contact)', correct: true },
    ],
  },
  113: {
    rule: '"Take" phrasal verbs: take off (remove/depart), take up (start hobby), take after (resemble), take over (assume control), take care of (look after).',
    formula: 'take + particle = different meanings',
    examples: [
      { sentence: 'Take off your shoes before entering.', correct: true },
      { sentence: 'She\'s taken up yoga recently. (= started as a hobby)', correct: true },
      { sentence: 'She takes after her mother. (= resembles)', correct: true },
      { sentence: 'The company was taken over by a bigger firm.', correct: true },
      { sentence: 'Can you take care of the dog while I\'m away?', correct: true },
      { sentence: 'The plane takes off at 3 pm. (= departs)', correct: true },
    ],
  },
  114: {
    rule: '"Turn" phrasal verbs: turn on/off (switch), turn up/down (volume/appear), turn out (result), turn into (become).',
    formula: 'turn + particle = different meanings',
    examples: [
      { sentence: 'Turn on the light, please.', correct: true },
      { sentence: 'Can you turn down the TV? (= make quieter)', correct: true },
      { sentence: 'He turned up late as usual. (= arrived)', correct: true },
      { sentence: 'It turned out to be a great day. (= the result was)', correct: true },
      { sentence: 'The caterpillar turned into a butterfly. (= became)', correct: true },
      { sentence: 'She turned down the job offer. (= rejected)', correct: true },
    ],
  },
  115: {
    rule: '"Put" phrasal verbs: put on (wear), put off (postpone/discourage), put out (extinguish), put up with (tolerate), put away (tidy).',
    formula: 'put + particle = different meanings',
    examples: [
      { sentence: 'Put on a jacket — it\'s cold.', correct: true },
      { sentence: 'The meeting was put off until next week. (= postponed)', correct: true },
      { sentence: 'Please put out your cigarette. (= extinguish)', correct: true },
      { sentence: 'I can\'t put up with the noise anymore! (= tolerate)', correct: true },
      { sentence: 'Put your toys away, please. (= tidy up)', correct: true },
      { sentence: 'Don\'t be put off by the price. (= discouraged)', correct: true },
    ],
  },

  // ===== MORE PREPOSITIONS & PHRASES (Units 116-130) =====
  116: {
    rule: '"Make" vs "do": "make" = create/produce something. "do" = perform an activity/task.',
    formula: 'make + product/result | do + activity/task',
    examples: [
      { sentence: 'I made a cake for her birthday.', correct: true },
      { sentence: 'I need to do my homework.', correct: true },
      { sentence: 'She made a mistake.', correct: true },
      { sentence: 'He does a lot of exercise.', correct: true },
      { sentence: 'Let me do the washing-up.', correct: true },
      { sentence: 'Can you make me a favour?', correct: false },
    ],
    notes: [
      'Make: make a mistake, make money, make a decision, make a noise, make progress, make friends.',
      'Do: do homework, do housework, do business, do a favour, do exercise, do your best.',
    ],
  },
  117: {
    rule: 'Common expressions with "have": have a rest, have a look, have a chat, have a go, have fun, have a bath/shower/swim.',
    formula: 'have + a + noun (for actions)',
    examples: [
      { sentence: 'Let\'s have a break. (= take a break)', correct: true },
      { sentence: 'Can I have a look at your book?', correct: true },
      { sentence: 'We had a great time at the party.', correct: true },
      { sentence: 'I\'m going to have a swim.', correct: true },
      { sentence: 'Let me have a go. (= try)', correct: true },
      { sentence: 'They had an argument about money.', correct: true },
    ],
  },
  118: {
    rule: '"Get" has many meanings: obtain, become, arrive, receive, bring, catch.',
    formula: 'get = obtain/become/arrive/receive',
    examples: [
      { sentence: 'I got a new phone. (= bought/received)', correct: true },
      { sentence: 'It\'s getting dark. (= becoming)', correct: true },
      { sentence: 'What time did you get home? (= arrive)', correct: true },
      { sentence: 'I got a letter from my bank. (= received)', correct: true },
      { sentence: 'I\'ll get you a coffee. (= bring)', correct: true },
      { sentence: 'We got lost in the city. (= became lost)', correct: true },
    ],
  },

  // ===== FINAL UNITS: WORD FORMATION & REVIEW (Units 119-145) =====
  119: {
    rule: '"Go" and "come" phrasal verbs: go on (continue), go out (leave house), come back (return), come up with (invent), come across (find by chance).',
    formula: 'go/come + particle',
    examples: [
      { sentence: 'Go on, I\'m listening. (= continue)', correct: true },
      { sentence: 'Do you want to go out tonight? (= leave the house)', correct: true },
      { sentence: 'When will she come back? (= return)', correct: true },
      { sentence: 'She came up with a brilliant idea. (= invented)', correct: true },
      { sentence: 'I came across an old photo in a drawer. (= found by chance)', correct: true },
      { sentence: 'What\'s going on? (= happening)', correct: true },
    ],
  },
  120: {
    rule: '"Bring" and "take": "bring" = towards the speaker. "Take" = away from the speaker.',
    formula: 'bring (to here) | take (to there)',
    examples: [
      { sentence: 'Can you bring me some water? (= to me)', correct: true },
      { sentence: 'Don\'t forget to take your umbrella. (= with you, away)', correct: true },
      { sentence: 'I brought you a present. (= I came here with it)', correct: true },
      { sentence: 'Take these letters to the post office.', correct: true },
      { sentence: '"Are you going to the party?" "Yes, I\'m taking a cake."', correct: true },
      { sentence: '"Are you coming to the party?" "Yes, I\'m bringing a cake."', correct: true },
    ],
  },
}

// Fill remaining units 121-145 with phrasal verb & advanced grammar summaries
for (let i = 121; i <= 145; i++) {
  if (!lessons91to145[i]) {
    const topics: Record<number, { title: string; rule: string; formula: string; examples: { sentence: string; correct?: boolean }[] }> = {
      121: { title: 'Phrasal verbs: up/down', rule: '"Break up" (end relationship), "bring up" (raise children/mention topic), "cheer up" (become happier), "make up" (invent/reconcile), "give up" (quit), "grow up" (become adult).', formula: 'verb + up/down', examples: [{ sentence: 'She grew up in a small village.', correct: true }, { sentence: 'Don\'t give up! Keep trying!', correct: true }, { sentence: 'He made up the whole story.', correct: true }, { sentence: 'They broke up after 5 years.', correct: true }, { sentence: 'Cheer up! Things will get better.', correct: true }, { sentence: 'She was brought up by her grandparents.', correct: true }] },
      122: { title: 'Phrasal verbs: out', rule: '"Find out" (discover), "work out" (calculate/exercise), "sort out" (organize), "point out" (indicate), "run out of" (exhaust supply), "fall out with" (argue).', formula: 'verb + out', examples: [{ sentence: 'I need to find out the answer.', correct: true }, { sentence: 'Can you work out the total?', correct: true }, { sentence: 'We need to sort out this problem.', correct: true }, { sentence: 'She pointed out a mistake in my essay.', correct: true }, { sentence: 'We\'ve run out of milk.', correct: true }, { sentence: 'He fell out with his best friend.', correct: true }] },
      123: { title: 'Phrasal verbs: on/off', rule: '"Carry on" (continue), "go on" (happen/continue), "hold on" (wait), "take off" (depart/remove), "call off" (cancel), "put off" (postpone).', formula: 'verb + on/off', examples: [{ sentence: 'Carry on! You\'re doing well.', correct: true }, { sentence: 'What\'s going on?', correct: true }, { sentence: 'Hold on a moment, please.', correct: true }, { sentence: 'The match was called off due to rain.', correct: true }, { sentence: 'The plane took off on time.', correct: true }, { sentence: 'Let\'s not put it off any longer.', correct: true }] },
      124: { title: 'Phrasal verbs with "up"', rule: '"Set up" (establish), "pick up" (collect/learn), "end up" (finally be), "show up" (appear), "make up for" (compensate), "come up with" (think of).', formula: 'verb + up', examples: [{ sentence: 'She set up her own business.', correct: true }, { sentence: 'I\'ll pick you up at 8.', correct: true }, { sentence: 'We ended up staying until midnight.', correct: true }, { sentence: 'He never showed up for the meeting.', correct: true }, { sentence: 'I need to make up for lost time.', correct: true }, { sentence: 'Can you come up with a better idea?', correct: true }] },
      125: { title: 'Phrasal verbs: mixed', rule: '"Look into" (investigate), "come across" (find by chance), "deal with" (handle), "get along with" (have good relationship), "keep up with" (maintain pace), "look forward to" (anticipate).', formula: 'verb + preposition', examples: [{ sentence: 'The police are looking into the matter.', correct: true }, { sentence: 'I came across an interesting article.', correct: true }, { sentence: 'She deals with customer complaints.', correct: true }, { sentence: 'Do you get along with your colleagues?', correct: true }, { sentence: 'I can\'t keep up with all the changes.', correct: true }, { sentence: 'I\'m looking forward to seeing you.', correct: true }] },
    }
    const topic = topics[i]
    if (topic) {
      lessons91to145[i] = { rule: topic.rule, formula: topic.formula, examples: topic.examples }
    }
  }
}
