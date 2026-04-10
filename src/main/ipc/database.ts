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
      claudeApiKey: map['claude_api_key'] ?? null,
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
        if (s.claudeApiKey !== undefined) insert.run('claude_api_key', s.claudeApiKey ?? '')
        if (s.currentLevel !== undefined) insert.run('current_level', s.currentLevel ?? '')
        if (s.activeBookId !== undefined) insert.run('active_book_id', String(s.activeBookId ?? ''))
        if (s.theme !== undefined) insert.run('theme', s.theme)
        if (s.dailyGoalMinutes !== undefined)
          insert.run('daily_goal_minutes', String(s.dailyGoalMinutes))
      })
      saveMany(settings)
    }
  )
}
