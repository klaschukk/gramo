import type { IpcMain } from 'electron'
import { getDb } from '../services/database'
import { buildCurriculum } from '../services/curriculum'
import { scorePlacement } from '../services/placement'
import type {
  Book,
  Chapter,
  Exercise,
  UserProgress,
  UserSettings,
  PlacementQuestion,
  PlacementResult,
  StudyStats,
  CEFRLevel,
} from '../../shared/types'

// SQL column aliases to map snake_case → camelCase
const CHAPTER_COLS = `id, book_id as bookId, unit_number as unitNumber, title, topic,
  cefr_level as cefrLevel, raw_text as rawText, notes, created_at as createdAt`
const EXERCISE_COLS = `id, chapter_id as chapterId, type, question, options, answer,
  explanation, source, created_at as createdAt`
const PROGRESS_COLS = `id, chapter_id as chapterId, exercise_id as exerciseId,
  score, attempts, completed_at as completedAt`

export function registerDatabaseHandlers(ipcMain: IpcMain): void {
  ipcMain.handle('db:getBooks', (): Book[] => {
    const db = getDb()
    return db.prepare(
      `SELECT id, title, author, file_path as filePath, total_units as totalUnits,
       imported_at as importedAt FROM books ORDER BY imported_at DESC`
    ).all() as Book[]
  })

  ipcMain.handle('db:getChapters', (_e, bookId: number): Chapter[] => {
    const db = getDb()
    return db
      .prepare(`SELECT ${CHAPTER_COLS} FROM chapters WHERE book_id = ? ORDER BY unit_number`)
      .all(bookId) as Chapter[]
  })

  ipcMain.handle('db:getChapter', (_e, chapterId: number): Chapter => {
    const db = getDb()
    return db.prepare(`SELECT ${CHAPTER_COLS} FROM chapters WHERE id = ?`).get(chapterId) as Chapter
  })

  ipcMain.handle('db:getExercises', (_e, chapterId: number): Exercise[] => {
    const db = getDb()
    const rows = db
      .prepare(`SELECT ${EXERCISE_COLS} FROM exercises WHERE chapter_id = ? ORDER BY created_at`)
      .all(chapterId) as (Omit<Exercise, 'options'> & { options: string | null })[]
    return rows.map((r) => ({
      ...r,
      options: r.options ? JSON.parse(r.options) : null,
    }))
  })

  ipcMain.handle('db:getCurriculum', (_e, bookId: number) => {
    const db = getDb()
    const settings = db
      .prepare('SELECT value FROM settings WHERE key = ?')
      .get('current_level') as { value: string } | undefined
    const userLevel: CEFRLevel = (settings?.value as CEFRLevel) ?? 'A2'
    return buildCurriculum(bookId, userLevel)
  })

  ipcMain.handle('db:getPlacementQuestions', (): PlacementQuestion[] => {
    const db = getDb()
    const rows = db
      .prepare('SELECT id, cefr_level as cefrLevel, question, options, answer, topic FROM placement_questions ORDER BY cefr_level, id')
      .all() as (Omit<PlacementQuestion, 'options'> & { options: string })[]
    return rows.map((r) => ({ ...r, options: JSON.parse(r.options) }))
  })

  ipcMain.handle(
    'db:savePlacementResult',
    (_e, answers: Record<number, string>): PlacementResult => {
      const db = getDb()
      const questions = db
        .prepare('SELECT id, cefr_level as cefrLevel, answer FROM placement_questions')
        .all() as { id: number; cefrLevel: CEFRLevel; answer: string }[]

      const result = scorePlacement(answers, questions)

      db.prepare(
        'INSERT INTO placement_results (level, score, total_questions, breakdown) VALUES (?, ?, ?, ?)'
      ).run(result.level, result.score, result.totalQuestions, JSON.stringify(result.breakdown))

      db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run('current_level', result.level)

      return result
    }
  )

  ipcMain.handle(
    'db:saveProgress',
    (_e, entry: Omit<UserProgress, 'id' | 'completedAt'>): void => {
      const db = getDb()
      db.prepare(
        'INSERT INTO user_progress (chapter_id, exercise_id, score, attempts) VALUES (?, ?, ?, ?)'
      ).run(entry.chapterId, entry.exerciseId ?? null, entry.score, entry.attempts)
    }
  )

  ipcMain.handle('db:getProgress', (_e, chapterId: number): UserProgress[] => {
    const db = getDb()
    return db
      .prepare(`SELECT ${PROGRESS_COLS} FROM user_progress WHERE chapter_id = ? ORDER BY completed_at DESC`)
      .all(chapterId) as UserProgress[]
  })

  ipcMain.handle('db:getSettings', (): UserSettings => {
    const db = getDb()
    const rows = db.prepare('SELECT key, value FROM settings').all() as {
      key: string
      value: string
    }[]
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]))
    return {
      currentLevel: (map['current_level'] as CEFRLevel) ?? null,
      activeBookId: map['active_book_id'] ? parseInt(map['active_book_id']) : null,
      theme: (map['theme'] as 'light' | 'dark') ?? 'light',
      dailyGoalMinutes: map['daily_goal_minutes'] ? parseInt(map['daily_goal_minutes']) : 30,
    }
  })

  ipcMain.handle(
    'db:saveSettings',
    (_e, settings: Partial<UserSettings>): void => {
      const db = getDb()
      const insert = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)')
      const saveMany = db.transaction((s: Partial<UserSettings>) => {
        if (s.currentLevel !== undefined) insert.run('current_level', s.currentLevel ?? '')
        if (s.activeBookId !== undefined) insert.run('active_book_id', String(s.activeBookId ?? ''))
        if (s.theme !== undefined) insert.run('theme', s.theme)
        if (s.dailyGoalMinutes !== undefined)
          insert.run('daily_goal_minutes', String(s.dailyGoalMinutes))
      })
      saveMany(settings)
    }
  )

  // Study tracking
  ipcMain.handle('db:logStudyTime', (_e, seconds: number, exercisesDone: number): void => {
    const db = getDb()
    const today = new Date().toISOString().slice(0, 10)
    const existing = db.prepare('SELECT id, duration_seconds, exercises_done FROM study_sessions WHERE date = ?').get(today) as { id: number; duration_seconds: number; exercises_done: number } | undefined
    if (existing) {
      db.prepare('UPDATE study_sessions SET duration_seconds = ?, exercises_done = ? WHERE id = ?')
        .run(existing.duration_seconds + seconds, existing.exercises_done + exercisesDone, existing.id)
    } else {
      db.prepare('INSERT INTO study_sessions (date, duration_seconds, exercises_done) VALUES (?, ?, ?)')
        .run(today, seconds, exercisesDone)
    }
  })

  ipcMain.handle('db:getStudyStats', (): StudyStats => {
    const db = getDb()
    const today = new Date().toISOString().slice(0, 10)

    const sessions = db.prepare('SELECT date, duration_seconds, exercises_done FROM study_sessions ORDER BY date DESC').all() as { date: string; duration_seconds: number; exercises_done: number }[]

    // Calculate streak
    let streak = 0
    const dateSet = new Set(sessions.map(s => s.date))
    const d = new Date()
    if (!dateSet.has(d.toISOString().slice(0, 10))) {
      d.setDate(d.getDate() - 1)
    }
    while (dateSet.has(d.toISOString().slice(0, 10))) {
      streak++
      d.setDate(d.getDate() - 1)
    }

    const todaySession = sessions.find(s => s.date === today)
    const todayMinutes = Math.round((todaySession?.duration_seconds ?? 0) / 60)
    const totalMinutes = Math.round(sessions.reduce((sum, s) => sum + s.duration_seconds, 0) / 60)

    const calendar: Record<string, { minutes: number; exercises: number }> = {}
    for (const s of sessions) {
      calendar[s.date] = { minutes: Math.round(s.duration_seconds / 60), exercises: s.exercises_done }
    }

    return { streak, todayMinutes, totalMinutes, calendar }
  })

  // Writing essays
  ipcMain.handle('db:saveEssay', (_e, chapterId: number, text: string): void => {
    const db = getDb()
    db.prepare('INSERT OR REPLACE INTO essays (chapter_id, text) VALUES (?, ?)').run(chapterId, text)
  })

  ipcMain.handle('db:getEssay', (_e, chapterId: number): string | null => {
    const db = getDb()
    const row = db.prepare('SELECT text FROM essays WHERE chapter_id = ?').get(chapterId) as { text: string } | undefined
    return row?.text ?? null
  })
}
