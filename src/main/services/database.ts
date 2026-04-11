import Database from 'better-sqlite3'
import path from 'path'
import { app } from 'electron'
import { exercises as exercisesData } from './exercises-data'

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

    CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
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
