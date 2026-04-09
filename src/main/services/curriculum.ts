import type { CEFRLevel, CurriculumEntry } from '../../shared/types'
import { getDb } from './database'

const LEVEL_ORDER: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

// Returns curriculum entries sorted by unit number, with unlock logic:
// unit N is unlocked when unit N-1 is completed with score >= 70
export function buildCurriculum(bookId: number, userLevel: CEFRLevel): CurriculumEntry[] {
  const db = getDb()

  const chapters = db
    .prepare(
      `SELECT c.id, c.unit_number, c.title, c.cefr_level,
              MAX(p.score) as best_score, COUNT(p.id) as attempts
       FROM chapters c
       LEFT JOIN user_progress p ON p.chapter_id = c.id AND p.exercise_id IS NULL
       WHERE c.book_id = ?
       GROUP BY c.id
       ORDER BY c.unit_number`
    )
    .all(bookId) as {
    id: number
    unit_number: number
    title: string
    cefr_level: CEFRLevel
    best_score: number | null
    attempts: number
  }[]

  const startingLevelIdx = LEVEL_ORDER.indexOf(userLevel)

  return chapters.map((chapter, idx) => {
    const chapterLevelIdx = LEVEL_ORDER.indexOf(chapter.cefr_level)
    const completed = (chapter.best_score ?? 0) >= 70
    const prevCompleted = idx === 0 ? true : (chapters[idx - 1] ? isChapterDone(bookId, chapters[idx - 1].id) : true)

    // Unlock rule: first chapter always unlocked if at/below user level
    // Otherwise: unlock when previous chapter is done
    const unlocked =
      chapterLevelIdx >= startingLevelIdx
        ? idx === 0 || prevCompleted
        : true // chapters below user level are always unlocked

    return {
      chapterId: chapter.id,
      unitNumber: chapter.unit_number,
      title: chapter.title,
      cefrLevel: chapter.cefr_level,
      completed,
      score: chapter.best_score,
      unlocked,
    }
  })
}

function isChapterDone(bookId: number, chapterId: number): boolean {
  const db = getDb()
  const row = db
    .prepare(
      `SELECT MAX(score) as best_score FROM user_progress
       WHERE chapter_id = ? AND exercise_id IS NULL`
    )
    .get(chapterId) as { best_score: number | null }
  return (row.best_score ?? 0) >= 70
}
