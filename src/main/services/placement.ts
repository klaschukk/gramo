import type { CEFRLevel, PlacementResult } from '../../shared/types'

const LEVEL_ORDER: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

// Scoring: 5 questions per level, correct answers determine final level
// Final level = highest level where user scored >= 60% (3/5 correct)
export function scorePlacement(
  answers: Record<number, string>,
  questions: Array<{ id: number; cefrLevel: CEFRLevel; answer: string }>
): PlacementResult {
  const breakdown: Record<CEFRLevel, { correct: number; total: number }> = {
    A1: { correct: 0, total: 0 },
    A2: { correct: 0, total: 0 },
    B1: { correct: 0, total: 0 },
    B2: { correct: 0, total: 0 },
    C1: { correct: 0, total: 0 },
    C2: { correct: 0, total: 0 },
  }

  for (const q of questions) {
    breakdown[q.cefrLevel].total++
    if (answers[q.id] === q.answer) {
      breakdown[q.cefrLevel].correct++
    }
  }

  // Find highest level with >= 60% correct
  let finalLevel: CEFRLevel = 'A1'
  for (const level of LEVEL_ORDER) {
    const { correct, total } = breakdown[level]
    if (total > 0 && correct / total >= 0.6) {
      finalLevel = level
    }
  }

  const totalCorrect = Object.values(breakdown).reduce((sum, b) => sum + b.correct, 0)
  const totalQuestions = questions.length
  const score = Math.round((totalCorrect / totalQuestions) * 100)

  return {
    level: finalLevel,
    score,
    totalQuestions,
    breakdown,
  }
}
