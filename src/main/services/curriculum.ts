import type { CEFRLevel, CurriculumEntry } from '../../shared/types'
import { getDb } from './database'

// All units are unlocked. Progress tracking shows completed units.
export function buildCurriculum(bookId: number, _userLevel: CEFRLevel): CurriculumEntry[] {
  const db = getDb()

  const chapters = db
    .prepare(
      `SELECT c.id, c.unit_number, c.title, c.cefr_level,
              MAX(p.score) as best_score,
              (SELECT COUNT(*) FROM exercises e WHERE e.chapter_id = c.id) as exercise_count
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
    exercise_count: number
  }[]

  return chapters.map((chapter) => ({
    chapterId: chapter.id,
    unitNumber: chapter.unit_number,
    title: chapter.title,
    cefrLevel: chapter.cefr_level,
    completed: (chapter.best_score ?? 0) >= 70,
    score: chapter.best_score,
    unlocked: true,
    exerciseCount: chapter.exercise_count,
  }))
}
