import Database from 'better-sqlite3'
import path from 'path'
import { app } from 'electron'
import { exercises as exercisesData } from './exercises-data'
import { vocabularySeed } from './vocabulary-data'

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

    CREATE TABLE IF NOT EXISTS study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      duration_seconds INTEGER NOT NULL DEFAULT 0,
      exercises_done INTEGER NOT NULL DEFAULT 0,
      started_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS essays (
      chapter_id INTEGER PRIMARY KEY REFERENCES chapters(id),
      text TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS vocabulary_words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL,
      translation TEXT NOT NULL,
      example TEXT NOT NULL,
      cefr_level TEXT NOT NULL,
      topic TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS vocab_progress (
      word_id INTEGER PRIMARY KEY REFERENCES vocabulary_words(id),
      ease REAL NOT NULL DEFAULT 2.5,
      interval INTEGER NOT NULL DEFAULT 0,
      repetitions INTEGER NOT NULL DEFAULT 0,
      next_review TEXT NOT NULL DEFAULT (date('now')),
      last_review TEXT,
      lapses INTEGER NOT NULL DEFAULT 0
    );
  `)

  // Placement test sections — migration for existing DBs
  try { db.exec("ALTER TABLE placement_questions ADD COLUMN section TEXT NOT NULL DEFAULT 'grammar'") } catch { /* column exists */ }
  try { db.exec("ALTER TABLE placement_questions ADD COLUMN passage TEXT") } catch { /* column exists */ }

  // Force re-seed placement if old v1.0 schema (no 'reading' section)
  const hasReading = (db.prepare("SELECT COUNT(*) as c FROM placement_questions WHERE section = 'reading'").get() as { c: number }).c
  if (hasReading === 0) {
    db.exec('DELETE FROM placement_questions')
  }

  seedPlacementQuestions(db)
  seedStaticExercises(db)
  seedVocabulary(db)
}

function seedPlacementQuestions(db: Database.Database): void {
  const count = (db.prepare('SELECT COUNT(*) as c FROM placement_questions').get() as { c: number }).c
  if (count > 0) return

  // 15 questions per level (90 total) — comprehensive CEFR placement
  const questions = [
    // ===== A1 (15 questions) =====
    { level: 'A1', q: 'She ___ a teacher.', opts: ['am', 'is', 'are', 'be'], a: 'is', topic: 'to be' },
    { level: 'A1', q: 'I have ___ apple.', opts: ['a', 'an', 'the', '-'], a: 'an', topic: 'articles' },
    { level: 'A1', q: 'They ___ students.', opts: ['am', 'is', 'are', 'be'], a: 'are', topic: 'to be' },
    { level: 'A1', q: '___ you speak English?', opts: ['Do', 'Does', 'Are', 'Is'], a: 'Do', topic: 'questions' },
    { level: 'A1', q: 'I ___ coffee every morning.', opts: ['drink', 'drinks', 'drinking', 'drank'], a: 'drink', topic: 'present simple' },
    { level: 'A1', q: 'He ___ from Italy.', opts: ['come', 'comes', 'coming', 'is come'], a: 'comes', topic: 'present simple 3rd person' },
    { level: 'A1', q: 'Where ___ you live?', opts: ['do', 'does', 'are', 'is'], a: 'do', topic: 'wh-questions' },
    { level: 'A1', q: 'I ___ like fish.', opts: ["don't", "doesn't", "am not", "isn't"], a: "don't", topic: 'negatives' },
    { level: 'A1', q: 'This is ___ book.', opts: ['my', 'me', 'I', 'mine'], a: 'my', topic: 'possessive adjectives' },
    { level: 'A1', q: '___ are three cats in the garden.', opts: ['There', 'They', 'Their', 'It'], a: 'There', topic: 'there is/are' },
    { level: 'A1', q: 'She ___ got two brothers.', opts: ['has', 'have', 'is', 'are'], a: 'has', topic: 'have got' },
    { level: 'A1', q: 'I can ___ English.', opts: ['speak', 'speaks', 'speaking', 'to speak'], a: 'speak', topic: 'can + infinitive' },
    { level: 'A1', q: 'The children ___ playing in the park.', opts: ['are', 'is', 'am', 'be'], a: 'are', topic: 'present continuous' },
    { level: 'A1', q: 'How ___ does this cost?', opts: ['much', 'many', 'long', 'old'], a: 'much', topic: 'how much/many' },
    { level: 'A1', q: 'We go to school ___ Monday.', opts: ['on', 'in', 'at', 'to'], a: 'on', topic: 'prepositions of time' },

    // ===== A2 (15 questions) =====
    { level: 'A2', q: 'She ___ TV when I called.', opts: ['watches', 'was watching', 'watched', 'watch'], a: 'was watching', topic: 'past continuous' },
    { level: 'A2', q: 'I have lived here ___ five years.', opts: ['since', 'for', 'ago', 'before'], a: 'for', topic: 'present perfect' },
    { level: 'A2', q: 'He ___ to the gym yesterday.', opts: ['go', 'goes', 'went', 'going'], a: 'went', topic: 'past simple' },
    { level: 'A2', q: 'There ___ some milk in the fridge.', opts: ['are', 'is', 'have', 'has'], a: 'is', topic: 'there is/are' },
    { level: 'A2', q: 'She is ___ than her sister.', opts: ['tall', 'taller', 'tallest', 'more tall'], a: 'taller', topic: 'comparatives' },
    { level: 'A2', q: 'You ___ eat so much sugar. It\'s bad for you.', opts: ["shouldn't", "mustn't", "don't have to", "can't"], a: "shouldn't", topic: 'advice modals' },
    { level: 'A2', q: 'I ___ never been to Japan.', opts: ['have', 'has', 'am', 'was'], a: 'have', topic: 'present perfect' },
    { level: 'A2', q: 'This is the ___ restaurant in town.', opts: ['best', 'better', 'good', 'most good'], a: 'best', topic: 'superlatives' },
    { level: 'A2', q: 'I\'m going ___ buy a new phone.', opts: ['to', 'for', '-', 'at'], a: 'to', topic: 'going to future' },
    { level: 'A2', q: 'She ___ her homework yet.', opts: ["hasn't finished", "didn't finish", "doesn't finish", "isn't finishing"], a: "hasn't finished", topic: 'present perfect + yet' },
    { level: 'A2', q: 'We arrived ___ the airport at 6am.', opts: ['at', 'to', 'in', 'on'], a: 'at', topic: 'prepositions of place' },
    { level: 'A2', q: 'He ___ to work by bus every day.', opts: ['goes', 'go', 'is going', 'gone'], a: 'goes', topic: 'present simple habits' },
    { level: 'A2', q: 'I ___ my keys. Can you help me find them?', opts: ["have lost", "lost", "am losing", "lose"], a: "have lost", topic: 'present perfect result' },
    { level: 'A2', q: 'You ___ turn off your phone in the cinema.', opts: ['must', 'should', 'can', 'might'], a: 'must', topic: 'obligation' },
    { level: 'A2', q: 'What ___ you doing at 8pm last night?', opts: ['were', 'did', 'are', 'have'], a: 'were', topic: 'past continuous questions' },

    // ===== B1 (15 questions) =====
    { level: 'B1', q: 'If I ___ rich, I would travel the world.', opts: ['am', 'was', 'were', 'be'], a: 'were', topic: 'second conditional' },
    { level: 'B1', q: 'She suggested ___ to the cinema.', opts: ['go', 'to go', 'going', 'goes'], a: 'going', topic: 'gerunds' },
    { level: 'B1', q: 'The letter ___ yesterday.', opts: ['sent', 'was sent', 'has sent', 'send'], a: 'was sent', topic: 'passive voice' },
    { level: 'B1', q: 'I wish I ___ speak French.', opts: ['can', 'could', 'would', 'should'], a: 'could', topic: 'wish + past simple' },
    { level: 'B1', q: 'He ___ finished his homework by 8pm.', opts: ['has', 'had', 'have', 'having'], a: 'had', topic: 'past perfect' },
    { level: 'B1', q: 'She asked me where I ___.', opts: ['live', 'lived', 'do live', 'living'], a: 'lived', topic: 'reported speech' },
    { level: 'B1', q: 'I ___ English for three years now.', opts: ['have been learning', 'am learning', 'learn', 'was learning'], a: 'have been learning', topic: 'present perfect continuous' },
    { level: 'B1', q: 'If it rains tomorrow, we ___ stay home.', opts: ['will', 'would', 'are going to', 'shall'], a: 'will', topic: 'first conditional' },
    { level: 'B1', q: 'He\'s the man ___ car was stolen.', opts: ['whose', 'who', 'which', 'that'], a: 'whose', topic: 'relative clauses' },
    { level: 'B1', q: 'I\'m used ___ getting up early.', opts: ['to', 'for', 'at', 'with'], a: 'to', topic: 'used to + -ing' },
    { level: 'B1', q: '___ the rain, we enjoyed the party.', opts: ['Despite', 'Although', 'However', 'Even'], a: 'Despite', topic: 'despite/although' },
    { level: 'B1', q: 'She\'s been living here ___ 2018.', opts: ['since', 'for', 'from', 'during'], a: 'since', topic: 'since vs for' },
    { level: 'B1', q: 'You\'d better ___ a doctor.', opts: ['see', 'to see', 'seeing', 'saw'], a: 'see', topic: 'had better' },
    { level: 'B1', q: 'I haven\'t seen her ___ last Monday.', opts: ['since', 'for', 'from', 'ago'], a: 'since', topic: 'since + point in time' },
    { level: 'B1', q: 'This time tomorrow I ___ on the beach.', opts: ['will be lying', 'will lie', 'am lying', 'lie'], a: 'will be lying', topic: 'future continuous' },

    // ===== B2 (15 questions) =====
    { level: 'B2', q: 'He denied ___ the money.', opts: ['steal', 'to steal', 'stealing', 'stolen'], a: 'stealing', topic: 'verb patterns' },
    { level: 'B2', q: 'Had she studied harder, she ___ passed.', opts: ['would', 'would have', 'will', 'had'], a: 'would have', topic: 'third conditional' },
    { level: 'B2', q: '___ time I see him, he looks tired.', opts: ['Every', 'Whenever', 'Each', 'All'], a: 'Every', topic: 'frequency expressions' },
    { level: 'B2', q: 'The project ___ completed by next Friday.', opts: ['will', 'will be', 'is being', 'has been'], a: 'will be', topic: 'future passive' },
    { level: 'B2', q: 'She spoke so quietly that I could ___ hear her.', opts: ['barely', 'nearly', 'almost', 'hardly ever'], a: 'barely', topic: 'adverbs of degree' },
    { level: 'B2', q: 'I\'d rather you ___ smoke in here.', opts: ["didn't", "don't", "won't", "wouldn't"], a: "didn't", topic: "would rather" },
    { level: 'B2', q: 'It\'s high time we ___ home.', opts: ['went', 'go', 'going', 'will go'], a: 'went', topic: "it's time + past" },
    { level: 'B2', q: 'Not only ___ he late, but he also forgot the documents.', opts: ['was', 'did', 'is', 'has'], a: 'was', topic: 'inversion with not only' },
    { level: 'B2', q: 'She is believed ___ left the country.', opts: ['to have', 'having', 'she has', 'that she'], a: 'to have', topic: 'passive reporting' },
    { level: 'B2', q: 'He acts as though he ___ the boss.', opts: ['were', 'is', 'was being', 'has been'], a: 'were', topic: 'as though + subjunctive' },
    { level: 'B2', q: 'I can\'t help ___ about the exam.', opts: ['worrying', 'to worry', 'worry', 'worried'], a: 'worrying', topic: "can't help + -ing" },
    { level: 'B2', q: 'The more you practice, the ___ you get.', opts: ['better', 'best', 'good', 'well'], a: 'better', topic: 'the more...the more' },
    { level: 'B2', q: '___ I known about the party, I would have come.', opts: ['Had', 'Have', 'If', 'Should'], a: 'Had', topic: 'inverted conditional' },
    { level: 'B2', q: 'She must ___ left already. Her car is gone.', opts: ['have', 'has', 'had', 'be'], a: 'have', topic: 'modal perfect deduction' },
    { level: 'B2', q: 'By this time next year, I ___ graduated.', opts: ['will have', 'will be', 'am going to', 'have'], a: 'will have', topic: 'future perfect' },

    // ===== C1 (15 questions) =====
    { level: 'C1', q: 'No sooner ___ he arrived than it started raining.', opts: ['had', 'has', 'did', 'was'], a: 'had', topic: 'inversion' },
    { level: 'C1', q: 'She is ___ to have been the first woman in this role.', opts: ['said', 'told', 'spoken', 'mentioned'], a: 'said', topic: 'reporting structures' },
    { level: 'C1', q: 'The proposal was turned ___ by the committee.', opts: ['down', 'away', 'off', 'out'], a: 'down', topic: 'phrasal verbs' },
    { level: 'C1', q: 'He talks as ___ he knew everything.', opts: ['if', 'though', 'whether', 'when'], a: 'if', topic: 'as if / as though' },
    { level: 'C1', q: '___ be the solution, it must be tested first.', opts: ['Whatever may', 'However may', 'Whatever', 'However'], a: 'Whatever may', topic: 'concession clauses' },
    { level: 'C1', q: 'Little ___ she know what was about to happen.', opts: ['did', 'had', 'was', 'does'], a: 'did', topic: 'fronting with negative adverb' },
    { level: 'C1', q: 'I\'d sooner ___ than ask him for help.', opts: ['die', 'to die', 'dying', 'died'], a: 'die', topic: "sooner + bare infinitive" },
    { level: 'C1', q: '___ it not been for your help, I would have failed.', opts: ['Had', 'If', 'Were', 'Should'], a: 'Had', topic: 'formal inversion' },
    { level: 'C1', q: 'The report needs ___ before the meeting.', opts: ['rewriting', 'to rewrite', 'rewrite', 'be rewritten'], a: 'rewriting', topic: 'need + -ing (passive)' },
    { level: 'C1', q: 'She couldn\'t ___ been more helpful if she\'d tried.', opts: ['have', 'has', 'had', 'be'], a: 'have', topic: 'mixed conditional' },
    { level: 'C1', q: 'On no account ___ this door be left unlocked.', opts: ['must', 'should', 'can', 'will'], a: 'must', topic: 'emphatic structures' },
    { level: 'C1', q: 'What with the rain ___ the traffic, we arrived very late.', opts: ['and', 'or', 'but', 'plus'], a: 'and', topic: 'what with' },
    { level: 'C1', q: 'He is the last person I ___ expect to see here.', opts: ['would', 'will', 'should', 'could'], a: 'would', topic: 'emphasis with last' },
    { level: 'C1', q: 'Hardly ___ I sat down when the phone rang.', opts: ['had', 'have', 'did', 'was'], a: 'had', topic: 'hardly + inversion' },
    { level: 'C1', q: 'The suspect is ___ to have fled the country.', opts: ['thought', 'thinking', 'think', 'thinks'], a: 'thought', topic: 'passive reporting verbs' },

    // ===== C2 (15 questions) =====
    { level: 'C2', q: 'The findings are ___ to shed light on the issue.', opts: ['liable', 'apt', 'bound', 'likely'], a: 'bound', topic: 'near-synonyms' },
    { level: 'C2', q: 'He is not ___ to make such a basic error.', opts: ['one', 'someone', 'anyone', 'a person'], a: 'one', topic: 'formal register' },
    { level: 'C2', q: 'Scarcely had they left ___ the alarm went off.', opts: ['when', 'than', 'before', 'after'], a: 'when', topic: 'inversion with scarcely' },
    { level: 'C2', q: 'The legislation was ___ through parliament quickly.', opts: ['rushed', 'pushed', 'forced', 'passed'], a: 'pushed', topic: 'collocations' },
    { level: 'C2', q: 'Her argument does not ___ scrutiny.', opts: ['bear', 'hold', 'stand', 'pass'], a: 'bear', topic: 'collocations' },
    { level: 'C2', q: 'He spoke with such ___ that everyone was convinced.', opts: ['conviction', 'convincement', 'convincing', 'convinced'], a: 'conviction', topic: 'word formation' },
    { level: 'C2', q: 'Try as she ___, she couldn\'t solve the problem.', opts: ['might', 'may', 'could', 'would'], a: 'might', topic: 'concessive clauses' },
    { level: 'C2', q: 'The onus is ___ the defendant to prove innocence.', opts: ['on', 'upon', 'both are correct', 'for'], a: 'both are correct', topic: 'formal prepositions' },
    { level: 'C2', q: 'Not until he arrived ___ we begin the meeting.', opts: ['did', 'had', 'could', 'would'], a: 'did', topic: 'inversion with not until' },
    { level: 'C2', q: 'The decision was tantamount ___ an admission of guilt.', opts: ['to', 'of', 'for', 'with'], a: 'to', topic: 'advanced collocations' },
    { level: 'C2', q: '___ be that as it may, we must proceed.', opts: ['Be', 'Let', 'May', 'As'], a: 'Be', topic: 'formal concession' },
    { level: 'C2', q: 'She was at a ___ to explain the discrepancy.', opts: ['loss', 'lack', 'miss', 'fail'], a: 'loss', topic: 'fixed expressions' },
    { level: 'C2', q: 'The committee\'s decision was ___ with controversy.', opts: ['fraught', 'filled', 'laden', 'loaded'], a: 'fraught', topic: 'advanced collocations' },
    { level: 'C2', q: 'In ___ of the evidence, the case was dismissed.', opts: ['light', 'view', 'both are correct', 'sight'], a: 'both are correct', topic: 'formal linking' },
    { level: 'C2', q: 'Such ___ his reputation that nobody dared question him.', opts: ['was', 'is', 'had', 'being'], a: 'was', topic: 'such + inversion' },
  ]

  const insertGrammar = db.prepare(
    "INSERT INTO placement_questions (cefr_level, section, question, options, answer, topic) VALUES (?, 'grammar', ?, ?, ?, ?)"
  )
  const insertMany = db.transaction((qs: typeof questions) => {
    for (const q of qs) {
      insertGrammar.run(q.level, q.q, JSON.stringify(q.opts), q.a, q.topic)
    }
  })
  insertMany(questions)

  // Insert additional sections: reading, error, cloze
  const insertSection = db.prepare(
    'INSERT INTO placement_questions (cefr_level, section, passage, question, options, answer, topic) VALUES (?, ?, ?, ?, ?, ?, ?)'
  )
  const insertSectionMany = db.transaction((items: SectionQuestion[]) => {
    for (const q of items) {
      insertSection.run(q.level, q.section, q.passage ?? null, q.q, JSON.stringify(q.opts), q.a, q.topic)
    }
  })
  insertSectionMany(READING_QUESTIONS)
  insertSectionMany(ERROR_QUESTIONS)
  insertSectionMany(CLOZE_QUESTIONS)
}

interface SectionQuestion {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  section: 'reading' | 'error' | 'cloze'
  passage?: string
  q: string
  opts: string[]
  a: string
  topic: string
}

// ===== READING COMPREHENSION (3 passages × 3 questions = 9) =====
const READING_A2 = `Emma lives in a small town in France with her husband and two children. She works part-time as a nurse at the local hospital. Every morning she takes her kids to school by bicycle before going to work. In the evenings, she enjoys cooking dinner for her family and reading books. On weekends, the whole family usually goes hiking in the nearby mountains. Emma says she loves her quiet life and doesn't want to move to a big city.`

const READING_B1 = `The traditional office is disappearing. Since 2020, more and more companies have adopted remote work as a permanent option, not just a temporary solution. A recent survey showed that 65% of workers in Europe would rather quit their job than return to the office five days a week. Employers have noticed that remote workers are often more productive, although they sometimes feel isolated. To solve this problem, many companies now organize regular in-person meetings and online social events. The challenge is finding the right balance between flexibility and connection.`

const READING_B2 = `The rise of artificial intelligence has sparked heated debates about its impact on employment. While pessimists argue that millions of jobs will be lost to automation, optimists point out that previous technological revolutions have ultimately created more jobs than they destroyed. The truth, as usual, probably lies somewhere in between. Routine tasks are indeed vanishing, but the demand for creative, emotional, and interpersonal skills is growing. What is certain is that the workforce of the future will need to continuously adapt and learn new skills. Those who resist change may find themselves left behind, while those who embrace it will discover unprecedented opportunities.`

const READING_QUESTIONS: SectionQuestion[] = [
  // A2 passage
  { level: 'A2', section: 'reading', passage: READING_A2, q: 'How does Emma travel to work?', opts: ['By car', 'By bicycle', 'On foot', 'By bus'], a: 'By bicycle', topic: 'reading detail' },
  { level: 'A2', section: 'reading', passage: READING_A2, q: 'What does Emma do on weekends?', opts: ['She works at the hospital', 'She reads books alone', 'She goes hiking with her family', 'She visits the city'], a: 'She goes hiking with her family', topic: 'reading detail' },
  { level: 'A2', section: 'reading', passage: READING_A2, q: 'How does Emma feel about her life?', opts: ['She wants to move to a city', 'She is happy and satisfied', 'She is bored', 'She is tired of her job'], a: 'She is happy and satisfied', topic: 'reading inference' },

  // B1 passage
  { level: 'B1', section: 'reading', passage: READING_B1, q: 'According to the text, when did remote work become more common?', opts: ['Before 2020', 'Since 2020', 'Only in 2023', 'It has always been common'], a: 'Since 2020', topic: 'reading detail' },
  { level: 'B1', section: 'reading', passage: READING_B1, q: 'What is the main problem for remote workers mentioned in the text?', opts: ['Lower productivity', 'Feeling isolated', 'Too many meetings', 'Technical issues'], a: 'Feeling isolated', topic: 'reading detail' },
  { level: 'B1', section: 'reading', passage: READING_B1, q: 'What is the author\'s overall attitude towards remote work?', opts: ['Strongly against it', 'Balanced — sees benefits and challenges', 'Enthusiastically in favour', 'Indifferent'], a: 'Balanced — sees benefits and challenges', topic: 'reading inference' },

  // B2 passage
  { level: 'B2', section: 'reading', passage: READING_B2, q: 'What do optimists say about AI and jobs?', opts: ['Most jobs will be lost', 'New technology usually creates more jobs than it destroys', 'AI will not affect jobs', 'Workers should not worry'], a: 'New technology usually creates more jobs than it destroys', topic: 'reading detail' },
  { level: 'B2', section: 'reading', passage: READING_B2, q: 'Which type of skills are growing in demand?', opts: ['Routine manual skills', 'Creative and interpersonal skills', 'Data-entry skills', 'Repetitive task skills'], a: 'Creative and interpersonal skills', topic: 'reading detail' },
  { level: 'B2', section: 'reading', passage: READING_B2, q: 'What does the author imply about workers who "resist change"?', opts: ['They will succeed', 'They risk being left behind', 'They will earn more', 'They are making a wise choice'], a: 'They risk being left behind', topic: 'reading inference' },
]

// ===== ERROR CORRECTION (12 — pick the correct version) =====
const ERROR_QUESTIONS: SectionQuestion[] = [
  { level: 'A1', section: 'error', q: 'Choose the correct sentence:', opts: [
    'She don\'t like fish.',
    'She doesn\'t likes fish.',
    'She doesn\'t like fish.',
    'She not like fish.',
  ], a: 'She doesn\'t like fish.', topic: 'present simple negative' },
  { level: 'A1', section: 'error', q: 'Choose the correct sentence:', opts: [
    'There is three cats in the garden.',
    'There are three cats in the garden.',
    'It are three cats in the garden.',
    'There have three cats in the garden.',
  ], a: 'There are three cats in the garden.', topic: 'there is/are' },
  { level: 'A2', section: 'error', q: 'Choose the correct sentence:', opts: [
    'I am living here since 2018.',
    'I live here since 2018.',
    'I have lived here since 2018.',
    'I lived here since 2018.',
  ], a: 'I have lived here since 2018.', topic: 'present perfect + since' },
  { level: 'A2', section: 'error', q: 'Choose the correct sentence:', opts: [
    'She is more taller than me.',
    'She is tallest than me.',
    'She is taller than me.',
    'She is more tall than me.',
  ], a: 'She is taller than me.', topic: 'comparatives' },
  { level: 'B1', section: 'error', q: 'Choose the correct sentence:', opts: [
    'If I would have money, I would travel.',
    'If I had money, I would travel.',
    'If I have money, I would travel.',
    'If I will have money, I travel.',
  ], a: 'If I had money, I would travel.', topic: 'second conditional' },
  { level: 'B1', section: 'error', q: 'Choose the correct sentence:', opts: [
    'He suggested to go to the cinema.',
    'He suggested going to the cinema.',
    'He suggested that go to the cinema.',
    'He suggested we going to the cinema.',
  ], a: 'He suggested going to the cinema.', topic: 'suggest + -ing' },
  { level: 'B1', section: 'error', q: 'Choose the correct sentence:', opts: [
    'Despite of the rain, we went out.',
    'Despite the rain, we went out.',
    'Although the rain, we went out.',
    'In spite the rain, we went out.',
  ], a: 'Despite the rain, we went out.', topic: 'despite / in spite of' },
  { level: 'B2', section: 'error', q: 'Choose the correct sentence:', opts: [
    'If I had known, I would tell you.',
    'If I would have known, I had told you.',
    'If I had known, I would have told you.',
    'If I knew, I would told you.',
  ], a: 'If I had known, I would have told you.', topic: 'third conditional' },
  { level: 'B2', section: 'error', q: 'Choose the correct sentence:', opts: [
    'She denied to steal the money.',
    'She denied stealing the money.',
    'She denied for stealing the money.',
    'She denied that steal the money.',
  ], a: 'She denied stealing the money.', topic: 'verb patterns' },
  { level: 'B2', section: 'error', q: 'Choose the correct sentence:', opts: [
    'I\'m looking forward to see you.',
    'I\'m looking forward seeing you.',
    'I\'m looking forward to seeing you.',
    'I\'m look forward to see you.',
  ], a: 'I\'m looking forward to seeing you.', topic: 'look forward to + -ing' },
  { level: 'C1', section: 'error', q: 'Choose the correct sentence:', opts: [
    'No sooner he arrived than it started raining.',
    'No sooner did he arrived than it started raining.',
    'No sooner had he arrived than it started raining.',
    'No sooner he had arrived than it started raining.',
  ], a: 'No sooner had he arrived than it started raining.', topic: 'inversion' },
  { level: 'C1', section: 'error', q: 'Choose the correct sentence:', opts: [
    'Hardly had I sat down when the phone rang.',
    'Hardly I had sat down when the phone rang.',
    'Hardly did I sit down when the phone rang.',
    'Hardly I sat down when the phone rang.',
  ], a: 'Hardly had I sat down when the phone rang.', topic: 'inversion with hardly' },
]

// ===== CLOZE (2 passages × 5 blanks = 10) =====
const CLOZE_B1 = `Last summer, I went on holiday (1) ___ Italy with my family. We stayed (2) ___ a small hotel near the beach. The weather was fantastic, and we spent most of our time (3) ___ swimming and sunbathing. One day, we decided to visit a nearby town that was famous (4) ___ its ancient ruins. We hired a local guide who told us many interesting stories. By the end of the trip, I had taken over 500 photos and made many new friends. I'm really looking forward (5) ___ going back next year.`

const CLOZE_B2 = `Artificial intelligence is transforming the way we work. Many routine tasks, which (1) ___ to take hours, can now be completed in minutes. However, this rapid progress (2) ___ raised concerns about job security. Some workers fear that their skills will become obsolete, while others are (3) ___ confident that new opportunities will emerge. The key, experts say, is adaptability. Those who are willing (4) ___ learn continuously will thrive, (5) ___ those who resist change may struggle to keep up.`

const CLOZE_QUESTIONS: SectionQuestion[] = [
  // B1 passage, 5 blanks
  { level: 'B1', section: 'cloze', passage: CLOZE_B1, q: 'Blank (1): I went on holiday ___ Italy.', opts: ['to', 'in', 'at', 'on'], a: 'to', topic: 'prepositions of direction' },
  { level: 'B1', section: 'cloze', passage: CLOZE_B1, q: 'Blank (2): We stayed ___ a small hotel.', opts: ['on', 'in', 'to', 'at'], a: 'in', topic: 'prepositions of place' },
  { level: 'B1', section: 'cloze', passage: CLOZE_B1, q: 'Blank (3): We spent most of our time ___ swimming.', opts: ['to', 'for', '-', 'in'], a: '-', topic: 'spend time + -ing' },
  { level: 'B1', section: 'cloze', passage: CLOZE_B1, q: 'Blank (4): famous ___ its ancient ruins.', opts: ['of', 'for', 'by', 'with'], a: 'for', topic: 'famous for' },
  { level: 'B1', section: 'cloze', passage: CLOZE_B1, q: 'Blank (5): looking forward ___ going back.', opts: ['for', 'to', 'at', 'on'], a: 'to', topic: 'look forward to' },

  // B2 passage, 5 blanks
  { level: 'B2', section: 'cloze', passage: CLOZE_B2, q: 'Blank (1): tasks which ___ to take hours.', opts: ['used', 'use', 'using', 'are used'], a: 'used', topic: 'used to' },
  { level: 'B2', section: 'cloze', passage: CLOZE_B2, q: 'Blank (2): this rapid progress ___ raised concerns.', opts: ['have', 'has', 'had', 'having'], a: 'has', topic: 'present perfect' },
  { level: 'B2', section: 'cloze', passage: CLOZE_B2, q: 'Blank (3): others are ___ confident that new opportunities...', opts: ['more', 'most', 'much', 'very'], a: 'more', topic: 'comparative adverbs' },
  { level: 'B2', section: 'cloze', passage: CLOZE_B2, q: 'Blank (4): those who are willing ___ learn continuously.', opts: ['for', 'on', 'to', 'in'], a: 'to', topic: 'willing to + infinitive' },
  { level: 'B2', section: 'cloze', passage: CLOZE_B2, q: 'Blank (5): will thrive, ___ those who resist change.', opts: ['while', 'during', 'because', 'unless'], a: 'while', topic: 'linking words' },
]

function seedVocabulary(db: Database.Database): void {
  const count = (db.prepare('SELECT COUNT(*) as c FROM vocabulary_words').get() as { c: number }).c
  if (count > 0) return

  const insert = db.prepare(
    'INSERT INTO vocabulary_words (word, translation, example, cefr_level, topic) VALUES (?, ?, ?, ?, ?)'
  )
  const insertMany = db.transaction((words: typeof vocabularySeed) => {
    for (const w of words) {
      insert.run(w.word, w.translation, w.example, w.cefrLevel, w.topic)
    }
  })
  insertMany(vocabularySeed)
}

// Seed exercises from exercises-data.ts
function seedStaticExercises(db: Database.Database): void {
  const hasChapters = (db.prepare('SELECT COUNT(*) as c FROM chapters').get() as { c: number }).c
  if (hasChapters === 0) return

  const hasExercises = (db.prepare('SELECT COUNT(*) as c FROM exercises').get() as { c: number }).c
  if (hasExercises > 0) return

  const chapters = db
    .prepare('SELECT id, unit_number FROM chapters ORDER BY unit_number')
    .all() as { id: number; unit_number: number }[]
  if (chapters.length === 0) return

  const chapterMap = new Map(chapters.map((c) => [c.unit_number, c.id]))

  const exercises = exercisesData

  const insert = db.prepare(
    'INSERT INTO exercises (chapter_id, type, question, options, answer, explanation, source) VALUES (?, ?, ?, ?, ?, ?, ?)'
  )

  const insertAll = db.transaction(() => {
    for (const ex of exercises) {
      const chapterId = chapterMap.get(ex.unit)
      if (!chapterId) continue
      insert.run(chapterId, ex.type, ex.q, ex.opts ? JSON.stringify(ex.opts) : null, ex.a, ex.expl, 'static')
    }
  })

  insertAll()
}
