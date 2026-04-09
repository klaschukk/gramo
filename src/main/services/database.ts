import Database from 'better-sqlite3'
import path from 'path'
import { app } from 'electron'

let db: Database.Database

export function getDb(): Database.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.')
  }
  return db
}

export function initDatabase(): void {
  const dbPath = path.join(app.getPath('userData'), 'gramo.db')
  db = new Database(dbPath)

  // Enable WAL mode for better performance
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  runMigrations(db)
}

function runMigrations(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      file_path TEXT NOT NULL,
      total_units INTEGER NOT NULL DEFAULT 0,
      imported_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER NOT NULL REFERENCES books(id),
      unit_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      topic TEXT NOT NULL DEFAULT '',
      cefr_level TEXT NOT NULL DEFAULT 'B1',
      raw_text TEXT NOT NULL,
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL REFERENCES chapters(id),
      type TEXT NOT NULL,
      question TEXT NOT NULL,
      options TEXT,
      answer TEXT NOT NULL,
      explanation TEXT,
      source TEXT NOT NULL DEFAULT 'static',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL REFERENCES chapters(id),
      exercise_id INTEGER REFERENCES exercises(id),
      score INTEGER NOT NULL DEFAULT 0,
      attempts INTEGER NOT NULL DEFAULT 1,
      completed_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS placement_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      breakdown TEXT NOT NULL,
      taken_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS placement_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cefr_level TEXT NOT NULL,
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      answer TEXT NOT NULL,
      topic TEXT NOT NULL DEFAULT ''
    );
  `)

  seedPlacementQuestions(db)
  seedStaticExercises(db)
}

function seedPlacementQuestions(db: Database.Database): void {
  const count = (db.prepare('SELECT COUNT(*) as c FROM placement_questions').get() as { c: number }).c
  if (count > 0) return

  // Minimal seed — 5 questions per level (30 total)
  // Full set goes in docs/features/placement-test.md
  const questions = [
    // A1
    { level: 'A1', q: 'She ___ a teacher.', opts: ['am', 'is', 'are', 'be'], a: 'is', topic: 'to be' },
    { level: 'A1', q: 'I have ___ apple.', opts: ['a', 'an', 'the', '-'], a: 'an', topic: 'articles' },
    { level: 'A1', q: 'They ___ students.', opts: ['am', 'is', 'are', 'be'], a: 'are', topic: 'to be' },
    { level: 'A1', q: '___ you speak English?', opts: ['Do', 'Does', 'Are', 'Is'], a: 'Do', topic: 'questions' },
    { level: 'A1', q: 'I ___ coffee every morning.', opts: ['drink', 'drinks', 'drinking', 'drank'], a: 'drink', topic: 'present simple' },
    // A2
    { level: 'A2', q: 'She ___ TV when I called.', opts: ['watches', 'was watching', 'watched', 'watch'], a: 'was watching', topic: 'past continuous' },
    { level: 'A2', q: 'I have lived here ___ five years.', opts: ['since', 'for', 'ago', 'before'], a: 'for', topic: 'present perfect' },
    { level: 'A2', q: 'He ___ to the gym yesterday.', opts: ['go', 'goes', 'went', 'going'], a: 'went', topic: 'past simple' },
    { level: 'A2', q: 'There ___ some milk in the fridge.', opts: ['are', 'is', 'have', 'has'], a: 'is', topic: 'there is/are' },
    { level: 'A2', q: 'She is ___ than her sister.', opts: ['tall', 'taller', 'tallest', 'more tall'], a: 'taller', topic: 'comparatives' },
    // B1
    { level: 'B1', q: 'If I ___ rich, I would travel the world.', opts: ['am', 'was', 'were', 'be'], a: 'were', topic: 'second conditional' },
    { level: 'B1', q: 'She suggested ___ to the cinema.', opts: ['go', 'to go', 'going', 'goes'], a: 'going', topic: 'gerunds' },
    { level: 'B1', q: 'The letter ___ yesterday.', opts: ['sent', 'was sent', 'has sent', 'send'], a: 'was sent', topic: 'passive voice' },
    { level: 'B1', q: 'I wish I ___ speak French.', opts: ['can', 'could', 'would', 'should'], a: 'could', topic: 'wish + past simple' },
    { level: 'B1', q: 'He ___ finished his homework by 8pm.', opts: ['has', 'had', 'have', 'having'], a: 'had', topic: 'past perfect' },
    // B2
    { level: 'B2', q: 'He denied ___ the money.', opts: ['steal', 'to steal', 'stealing', 'stolen'], a: 'stealing', topic: 'verb patterns' },
    { level: 'B2', q: 'Had she studied harder, she ___ passed.', opts: ['would', 'would have', 'will', 'had'], a: 'would have', topic: 'third conditional' },
    { level: 'B2', q: '___ time I see him, he looks tired.', opts: ['Every', 'Whenever', 'Each', 'All'], a: 'Every', topic: 'frequency expressions' },
    { level: 'B2', q: 'The project ___ completed by next Friday.', opts: ['will', 'will be', 'is being', 'has been'], a: 'will be', topic: 'future passive' },
    { level: 'B2', q: 'She spoke so quietly that I could ___ hear her.', opts: ['barely', 'nearly', 'almost', 'hardly ever'], a: 'barely', topic: 'adverbs of degree' },
    // C1
    { level: 'C1', q: 'No sooner ___ he arrived than it started raining.', opts: ['had', 'has', 'did', 'was'], a: 'had', topic: 'inversion' },
    { level: 'C1', q: 'She is ___ to have been the first woman in this role.', opts: ['said', 'told', 'spoken', 'mentioned'], a: 'said', topic: 'reporting structures' },
    { level: 'C1', q: 'The proposal was turned ___ by the committee.', opts: ['down', 'away', 'off', 'out'], a: 'down', topic: 'phrasal verbs' },
    { level: 'C1', q: 'He talks as ___ he knew everything.', opts: ['if', 'though', 'whether', 'when'], a: 'if', topic: 'as if / as though' },
    { level: 'C1', q: '___ be the solution, it must be tested first.', opts: ['Whatever may', 'However may', 'Whatever', 'However'], a: 'Whatever may', topic: 'concession clauses' },
    // C2
    { level: 'C2', q: 'The findings are ___ to shed light on the issue.', opts: ['liable', 'apt', 'bound', 'likely'], a: 'bound', topic: 'near-synonyms' },
    { level: 'C2', q: 'He is not ___ to make such a basic error.', opts: ['one', 'someone', 'anyone', 'a person'], a: 'one', topic: 'formal register' },
    { level: 'C2', q: 'Scarcely had they left ___ the alarm went off.', opts: ['when', 'than', 'before', 'after'], a: 'when', topic: 'inversion with scarcely' },
    { level: 'C2', q: 'The legislation was ___ through parliament quickly.', opts: ['rushed', 'pushed', 'forced', 'passed'], a: 'pushed', topic: 'collocations' },
    { level: 'C2', q: 'Her argument does not ___ scrutiny.', opts: ['bear', 'hold', 'stand', 'pass'], a: 'bear', topic: 'collocations' },
  ]

  const insert = db.prepare(
    'INSERT INTO placement_questions (cefr_level, question, options, answer, topic) VALUES (?, ?, ?, ?, ?)'
  )
  const insertMany = db.transaction((qs: typeof questions) => {
    for (const q of qs) {
      insert.run(q.level, q.q, JSON.stringify(q.opts), q.a, q.topic)
    }
  })
  insertMany(questions)
}

// Murphy Blue 5th Ed. — units 1–20 static exercises
// Seeded only when a book has chapters but 0 exercises
function seedStaticExercises(db: Database.Database): void {
  const hasChapters = (db.prepare('SELECT COUNT(*) as c FROM chapters').get() as { c: number }).c
  if (hasChapters === 0) return // no imported book yet

  const hasExercises = (db.prepare('SELECT COUNT(*) as c FROM exercises').get() as { c: number }).c
  if (hasExercises > 0) return // already seeded

  // Map unit_number → chapter.id
  const chapters = db
    .prepare('SELECT id, unit_number FROM chapters WHERE unit_number BETWEEN 1 AND 20 ORDER BY unit_number')
    .all() as { id: number; unit_number: number }[]
  if (chapters.length === 0) return

  const chapterMap = new Map(chapters.map((c) => [c.unit_number, c.id]))

  type Ex = {
    unit: number
    type: string
    q: string
    opts: string[] | null
    a: string
    expl: string
  }

  const exercises: Ex[] = [
    // Unit 1 — Present continuous (I am doing)
    { unit: 1, type: 'multiple-choice', q: 'Please be quiet. I ___ to concentrate.', opts: ['try', 'am trying', 'tried', 'tries'], a: 'am trying', expl: 'Present continuous for actions happening now.' },
    { unit: 1, type: 'multiple-choice', q: 'Look! Somebody ___ in the river.', opts: ['swims', 'is swimming', 'swim', 'was swimming'], a: 'is swimming', expl: 'Use present continuous for something happening at the moment of speaking.' },
    { unit: 1, type: 'fill-in-blank', q: '"Where is Tom?" "He ___ (have) a shower."', opts: null, a: 'is having', expl: 'Present continuous: subject + am/is/are + -ing form.' },
    { unit: 1, type: 'true-false', q: '"I am believing you." — This sentence is correct.', opts: ['True', 'False'], a: 'False', expl: '"Believe" is a state verb — not used in continuous form. Correct: "I believe you."' },

    // Unit 2 — Present simple (I do)
    { unit: 2, type: 'multiple-choice', q: 'Water ___ at 100 degrees Celsius.', opts: ['is boiling', 'boils', 'boil', 'was boiling'], a: 'boils', expl: 'Present simple for permanent facts and general truths.' },
    { unit: 2, type: 'multiple-choice', q: 'The shop ___ at 9 o\'clock every morning.', opts: ['is opening', 'opens', 'open', 'opened'], a: 'opens', expl: 'Present simple for regular/repeated actions and timetables.' },
    { unit: 2, type: 'fill-in-blank', q: 'She ___ (not/eat) meat. She is vegetarian.', opts: null, a: "doesn't eat", expl: 'Present simple negative: subject + doesn\'t + base verb.' },
    { unit: 2, type: 'true-false', q: '"I am usually getting up at 7." — This sentence is correct.', opts: ['True', 'False'], a: 'False', expl: 'Habits/routines use present simple: "I usually get up at 7."' },

    // Unit 3 — Present continuous and present simple 1
    { unit: 3, type: 'multiple-choice', q: 'I ___ English at the moment, but I usually ___ French.', opts: ['speak / am speaking', 'am speaking / speak', 'speak / speak', 'am speaking / am speaking'], a: 'am speaking / speak', expl: 'Now = continuous; habitual = simple.' },
    { unit: 3, type: 'multiple-choice', q: 'The water ___. Can you turn it off?', opts: ['boils', 'is boiling', 'boil', 'boiled'], a: 'is boiling', expl: 'Something happening right now = present continuous.' },
    { unit: 3, type: 'fill-in-blank', q: 'He ___ (work) in a bank. He has been there for five years.', opts: null, a: 'works', expl: 'A permanent/long-term situation = present simple.' },
    { unit: 3, type: 'multiple-choice', q: 'Why ___ you ___ at me like that? Stop it!', opts: ['do / look', 'are / looking', 'did / look', 'were / looking'], a: 'are / looking', expl: 'Happening now, possibly annoying = present continuous.' },

    // Unit 4 — Present continuous and present simple 2
    { unit: 4, type: 'multiple-choice', q: 'I ___ what you mean. (understand)', opts: ['am understanding', 'understand', 'understands', 'understood'], a: 'understand', expl: '"Understand" is a state verb — not normally used in continuous.' },
    { unit: 4, type: 'multiple-choice', q: 'This food ___ delicious.', opts: ['is tasting', 'tastes', 'taste', 'tasted'], a: 'tastes', expl: '"Taste" as a state (= has a flavour) uses simple, not continuous.' },
    { unit: 4, type: 'fill-in-blank', q: 'I ___ (think) about selling my car. What do you think?', opts: null, a: 'am thinking', expl: '"Think about" = consider (action) → continuous. "Think" = believe → simple.' },
    { unit: 4, type: 'true-false', q: '"I\'m seeing the doctor tomorrow." — This use of present continuous is correct.', opts: ['True', 'False'], a: 'True', expl: 'Present continuous for planned future arrangements.' },

    // Unit 5 — Past simple (I did)
    { unit: 5, type: 'multiple-choice', q: 'Mozart ___ more than 600 pieces of music.', opts: ['writes', 'has written', 'wrote', 'was writing'], a: 'wrote', expl: 'Completed action in the past (historical) = past simple.' },
    { unit: 5, type: 'multiple-choice', q: '"How ___ your holiday?" "Great, thanks."', opts: ['is', 'was', 'has been', 'were'], a: 'was', expl: 'Asking about a past event = past simple.' },
    { unit: 5, type: 'fill-in-blank', q: 'We ___ (not/go) out last night. We stayed at home.', opts: null, a: "didn't go", expl: 'Past simple negative: didn\'t + base verb.' },
    { unit: 5, type: 'fill-in-blank', q: 'She ___ (get) up early this morning and ___ (catch) the 7:30 train.', opts: null, a: 'got, caught', expl: 'Irregular verbs: get → got, catch → caught.' },

    // Unit 6 — Past continuous (I was doing)
    { unit: 6, type: 'multiple-choice', q: 'I ___ TV when the phone rang.', opts: ['watched', 'was watching', 'watch', 'am watching'], a: 'was watching', expl: 'Past continuous for an action in progress when another event happened.' },
    { unit: 6, type: 'multiple-choice', q: 'It ___ when we went out.', opts: ['snowed', 'was snowing', 'snows', 'has snowed'], a: 'was snowing', expl: 'Past continuous for describing the scene/background.' },
    { unit: 6, type: 'fill-in-blank', q: 'What ___ you ___ (do) at 10 o\'clock last night?', opts: null, a: 'were, doing', expl: 'Past continuous question: was/were + subject + -ing.' },
    { unit: 6, type: 'true-false', q: '"When I arrived, they were having dinner." — Past continuous is used correctly here.', opts: ['True', 'False'], a: 'True', expl: 'An action in progress (having dinner) interrupted by another event (arrived).' },

    // Unit 7 — Present perfect 1 (I have done)
    { unit: 7, type: 'multiple-choice', q: 'I ___ my keys. I can\'t find them anywhere.', opts: ['lost', 'have lost', 'am losing', 'lose'], a: 'have lost', expl: 'Present perfect for past action with a present result.' },
    { unit: 7, type: 'multiple-choice', q: '"Is Tom here?" "No, he ___ ."', opts: ['went', 'has gone', 'goes', 'is going'], a: 'has gone', expl: '"Has gone" = he went and hasn\'t come back. Present result matters.' },
    { unit: 7, type: 'fill-in-blank', q: 'Oh no! I ___ (forget) her name.', opts: null, a: 'have forgotten', expl: 'Present perfect: the result (I can\'t remember now) is what matters.' },
    { unit: 7, type: 'fill-in-blank', q: 'She ___ (buy) a new car. It\'s beautiful.', opts: null, a: 'has bought', expl: 'Present perfect for recently completed action with visible result.' },

    // Unit 8 — Present perfect 2 (I have done)
    { unit: 8, type: 'multiple-choice', q: 'Have you ever ___ to Australia?', opts: ['go', 'went', 'been', 'going'], a: 'been', expl: '"Have you ever been to…?" is a fixed pattern for life experience.' },
    { unit: 8, type: 'multiple-choice', q: 'She is the most interesting person I ___ .', opts: ['ever met', 'have ever met', 'ever meet', 'was meeting'], a: 'have ever met', expl: 'Superlative + present perfect for life experience up to now.' },
    { unit: 8, type: 'fill-in-blank', q: 'This is the first time I ___ (drive) a car.', opts: null, a: 'have driven', expl: '"This is the first time…" takes present perfect.' },
    { unit: 8, type: 'true-false', q: '"I have read that book last week." — This sentence is correct.', opts: ['True', 'False'], a: 'False', expl: '"Last week" = specific past time → use past simple: "I read that book last week."' },

    // Unit 9 — Present perfect continuous (I have been doing)
    { unit: 9, type: 'multiple-choice', q: 'You\'re out of breath. ___ you ___ ?', opts: ['Did / run', 'Have / been running', 'Are / running', 'Were / running'], a: 'Have / been running', expl: 'Present perfect continuous: emphasis on recent activity with visible result.' },
    { unit: 9, type: 'multiple-choice', q: 'It ___ all day. The ground is wet.', opts: ['rained', 'has been raining', 'rains', 'was raining'], a: 'has been raining', expl: 'Activity that has recently stopped with a present result.' },
    { unit: 9, type: 'fill-in-blank', q: 'How long ___ you ___ (wait) here?', opts: null, a: 'have, been waiting', expl: 'Present perfect continuous for duration of ongoing action.' },
    { unit: 9, type: 'fill-in-blank', q: 'She ___ (learn) English for three years.', opts: null, a: 'has been learning', expl: 'Focus on the duration of an activity that is still continuing.' },

    // Unit 10 — Present perfect continuous and simple
    { unit: 10, type: 'multiple-choice', q: 'I ___ the book you lent me, so you can have it back.', opts: ['have been reading', 'have read', 'read', 'was reading'], a: 'have read', expl: 'Present perfect simple: the action is complete (finished the book).' },
    { unit: 10, type: 'multiple-choice', q: 'Sorry I\'m late. ___ you ___ long?', opts: ['Did / wait', 'Have / waited', 'Have / been waiting', 'Are / waiting'], a: 'Have / been waiting', expl: 'Continuous emphasizes the duration of waiting.' },
    { unit: 10, type: 'fill-in-blank', q: 'She ___ (write) ten emails today. (= finished 10)', opts: null, a: 'has written', expl: 'Simple for completed quantity ("ten emails" = a countable result).' },
    { unit: 10, type: 'true-false', q: '"I have been knowing her for years." — This sentence is correct.', opts: ['True', 'False'], a: 'False', expl: '"Know" is a state verb — use present perfect simple: "I have known her for years."' },

    // Unit 11 — How long have you (been)…?
    { unit: 11, type: 'multiple-choice', q: 'How long ___ they ___ married?', opts: ['are / being', 'have / been', 'were / being', 'did / be'], a: 'have / been', expl: '"How long" + present perfect for a situation that started in the past and continues.' },
    { unit: 11, type: 'multiple-choice', q: 'I ___ Bob since we were at school together.', opts: ['know', 'have known', 'knew', 'am knowing'], a: 'have known', expl: 'State verbs (know) use present perfect simple, not continuous.' },
    { unit: 11, type: 'fill-in-blank', q: 'She ___ (live) in London since 2018.', opts: null, a: 'has lived', expl: '"Since 2018" = starting point. Present perfect for duration up to now.' },
    { unit: 11, type: 'fill-in-blank', q: 'How long ___ you ___ (have) that jacket?', opts: null, a: 'have, had', expl: '"Have" = possess, a state verb → present perfect simple, not continuous.' },

    // Unit 12 — For and since; When…? and How long…?
    { unit: 12, type: 'multiple-choice', q: 'I\'ve been waiting ___ 20 minutes.', opts: ['since', 'for', 'from', 'during'], a: 'for', expl: '"For" + a period of time (20 minutes, three years, a long time).' },
    { unit: 12, type: 'multiple-choice', q: 'She has worked here ___ April.', opts: ['for', 'since', 'from', 'at'], a: 'since', expl: '"Since" + a point in time (April, 2020, Monday, I was a child).' },
    { unit: 12, type: 'fill-in-blank', q: 'They have known each other ___ they were children.', opts: null, a: 'since', expl: '"Since they were children" = a point in time (clause).' },
    { unit: 12, type: 'true-false', q: '"I have this car since three years." — This sentence is correct.', opts: ['True', 'False'], a: 'False', expl: 'Two errors: "since three years" → "for three years"; "have" → "have had".' },

    // Unit 13 — Present perfect and past simple 1
    { unit: 13, type: 'multiple-choice', q: '"___ you ever ___ to Japan?" "Yes, I ___ there last year."', opts: ['Did/go/went', 'Have/been/went', 'Have/been/have been', 'Did/go/have been'], a: 'Have/been/went', expl: 'Have you ever been = experience (perfect). Last year = specific time (simple).' },
    { unit: 13, type: 'multiple-choice', q: 'I ___ my glasses. ___ you ___ them?', opts: ['lost / Did / see', 'have lost / Have / seen', 'lost / Have / seen', 'have lost / Did / see'], a: 'have lost / Have / seen', expl: 'Both actions relate to the present (glasses still missing).' },
    { unit: 13, type: 'fill-in-blank', q: 'Tom ___ (just/arrive). He ___ (arrive) five minutes ago.', opts: null, a: 'has just arrived, arrived', expl: '"Just" = present perfect. "Five minutes ago" = past simple.' },
    { unit: 13, type: 'fill-in-blank', q: 'We ___ (not/see) each other since Christmas.', opts: null, a: "haven't seen", expl: '"Since Christmas" = duration up to now → present perfect.' },

    // Unit 14 — Present perfect and past simple 2
    { unit: 14, type: 'multiple-choice', q: 'The weather ___ good since Sunday.', opts: ['has been', 'was', 'is', 'had been'], a: 'has been', expl: '"Since Sunday" + still going = present perfect.' },
    { unit: 14, type: 'multiple-choice', q: 'When ___ your course ___ ?', opts: ['has / started', 'did / start', 'does / start', 'is / starting'], a: 'did / start', expl: '"When did…?" asks about a specific past time → past simple.' },
    { unit: 14, type: 'fill-in-blank', q: 'I ___ (read) four books this month.', opts: null, a: 'have read', expl: '"This month" (not finished) → present perfect.' },
    { unit: 14, type: 'true-false', q: '"I have seen him yesterday." — This sentence is correct.', opts: ['True', 'False'], a: 'False', expl: '"Yesterday" = specific past time → past simple: "I saw him yesterday."' },

    // Unit 15 — Past perfect (I had done)
    { unit: 15, type: 'multiple-choice', q: 'When I arrived at the party, Tom ___ already ___ home.', opts: ['has / gone', 'had / gone', 'was / going', 'went / to'], a: 'had / gone', expl: 'Past perfect for an earlier past event viewed from another past moment.' },
    { unit: 15, type: 'multiple-choice', q: 'I ___ the film before, so I didn\'t want to see it again.', opts: ['saw', 'have seen', 'had seen', 'see'], a: 'had seen', expl: 'Past perfect for something that happened before another past event.' },
    { unit: 15, type: 'fill-in-blank', q: 'The house was dirty. They ___ (not/clean) it for weeks.', opts: null, a: "hadn't cleaned", expl: 'Past perfect negative for an action not done before a past moment.' },
    { unit: 15, type: 'fill-in-blank', q: 'After she ___ (finish) her work, she went home.', opts: null, a: 'had finished', expl: '"After she had finished" = the earlier action.' },

    // Unit 16 — Past perfect continuous (I had been doing)
    { unit: 16, type: 'multiple-choice', q: 'I ___ for two hours when the bus finally came.', opts: ['waited', 'have waited', 'had been waiting', 'was waiting'], a: 'had been waiting', expl: 'Past perfect continuous: duration of activity before a past event.' },
    { unit: 16, type: 'multiple-choice', q: 'He was very tired. He ___ all day.', opts: ['works', 'has been working', 'had been working', 'worked'], a: 'had been working', expl: 'Past perfect continuous explains a past result (he was tired).' },
    { unit: 16, type: 'fill-in-blank', q: 'Her eyes were red. She ___ (cry).', opts: null, a: 'had been crying', expl: 'Visible past result of a recently stopped activity → past perfect continuous.' },
    { unit: 16, type: 'true-false', q: '"I had been knowing him for years before we became friends." — This is correct.', opts: ['True', 'False'], a: 'False', expl: '"Know" is a state verb. Use past perfect simple: "I had known him for years."' },

    // Unit 17 — Have and have got
    { unit: 17, type: 'multiple-choice', q: '___ you ___ a car?', opts: ['Have / got', 'Do / have', 'Both are correct', 'Neither is correct'], a: 'Both are correct', expl: '"Have you got…?" and "Do you have…?" are both correct for possession.' },
    { unit: 17, type: 'multiple-choice', q: 'I ___ breakfast at 8 o\'clock every morning.', opts: ['have', 'have got', 'am having', 'had got'], a: 'have', expl: '"Have breakfast" (action) — you cannot use "have got" here.' },
    { unit: 17, type: 'fill-in-blank', q: 'She ___ (not/have) any brothers or sisters.', opts: null, a: "doesn't have", expl: '"Doesn\'t have" or "hasn\'t got" — both correct for possession.' },
    { unit: 17, type: 'true-false', q: '"I have got a shower every morning." — This sentence is correct.', opts: ['True', 'False'], a: 'False', expl: '"Have a shower" is an action → use "have", not "have got".' },

    // Unit 18 — Used to (do)
    { unit: 18, type: 'multiple-choice', q: 'I ___ a lot of coffee, but now I prefer tea.', opts: ['used to drink', 'use to drink', 'was used to drink', 'am used to drink'], a: 'used to drink', expl: '"Used to + infinitive" for past habits that are no longer true.' },
    { unit: 18, type: 'multiple-choice', q: '___ you ___ near the sea when you were a child?', opts: ['Used / to live', 'Did / used to live', 'Did / use to live', 'Were / used to live'], a: 'Did / use to live', expl: 'In questions: Did + subject + use to (without "d").' },
    { unit: 18, type: 'fill-in-blank', q: 'There ___ (used to/be) a cinema here, but it was knocked down.', opts: null, a: 'used to be', expl: '"Used to be" for a past state that no longer exists.' },
    { unit: 18, type: 'true-false', q: '"I used to going to school by bus." — This sentence is correct.', opts: ['True', 'False'], a: 'False', expl: '"Used to" + base verb (infinitive without "to"): "I used to go to school by bus."' },

    // Unit 19 — Present tenses for the future (I am doing / I do)
    { unit: 19, type: 'multiple-choice', q: 'I ___ tennis with Tom tomorrow. (= already arranged)', opts: ['play', 'am playing', 'will play', 'played'], a: 'am playing', expl: 'Present continuous for definite future arrangements.' },
    { unit: 19, type: 'multiple-choice', q: 'The train ___ at 6:15 tomorrow morning.', opts: ['is leaving', 'leaves', 'will leave', 'left'], a: 'leaves', expl: 'Present simple for timetables and schedules.' },
    { unit: 19, type: 'fill-in-blank', q: 'What time ___ the film ___ (start) tonight?', opts: null, a: 'does, start', expl: 'Timetabled event = present simple.' },
    { unit: 19, type: 'true-false', q: '"I\'m going to the dentist on Tuesday." — Present continuous is used correctly for a future arrangement.', opts: ['True', 'False'], a: 'True', expl: 'Present continuous for a personal arrangement already made.' },

    // Unit 20 — (I'm) going to (do)
    { unit: 20, type: 'multiple-choice', q: 'Look at those clouds. It ___ rain.', opts: ['will', 'is going to', 'is', 'does'], a: 'is going to', expl: '"Going to" for a prediction based on present evidence.' },
    { unit: 20, type: 'multiple-choice', q: 'I ___ buy a new laptop. I\'ve already saved the money.', opts: ['will', 'am going to', 'am', 'would'], a: 'am going to', expl: '"Going to" for a plan/intention already decided.' },
    { unit: 20, type: 'fill-in-blank', q: 'She ___ (not/going to/pass) the exam. She hasn\'t studied.', opts: null, a: "isn't going to pass", expl: '"Going to" negative for prediction based on evidence.' },
    { unit: 20, type: 'true-false', q: '"I\'m going to visit my parents next weekend." — This expresses a plan/intention.', opts: ['True', 'False'], a: 'True', expl: '"Going to" for something you have already decided to do.' },
  ]

  const insert = db.prepare(
    'INSERT INTO exercises (chapter_id, type, question, options, answer, explanation, source) VALUES (?, ?, ?, ?, ?, ?, ?)'
  )

  const insertAll = db.transaction((exs: typeof exercises) => {
    for (const ex of exs) {
      const chapterId = chapterMap.get(ex.unit)
      if (!chapterId) continue
      insert.run(
        chapterId,
        ex.type,
        ex.q,
        ex.opts ? JSON.stringify(ex.opts) : null,
        ex.a,
        ex.expl,
        'static'
      )
    }
  })

  insertAll(exercises)
}
