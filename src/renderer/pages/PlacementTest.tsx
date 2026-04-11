import { useEffect, useState } from 'react'
import type { CEFRLevel } from '@shared/types'

interface PlacementQuestion {
  id: number
  cefrLevel: CEFRLevel
  question: string
  options: string[]
  answer: string
}

interface Props {
  onComplete: (level: CEFRLevel) => void
}

const LEVEL_COLORS: Record<string, string> = {
  A1: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  A2: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  B1: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  B2: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  C1: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  C2: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
}

export default function PlacementTest({ onComplete }: Props) {
  const [questions, setQuestions] = useState<PlacementQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<{ level: CEFRLevel; score: number; breakdown: Record<CEFRLevel, { correct: number; total: number }> } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.api.getPlacementQuestions().then((qs) => {
      setQuestions(qs)
      setLoading(false)
    })
  }, [])

  async function handleAnswer(option: string) {
    const q = questions[current]
    const newAnswers = { ...answers, [q.id]: option }
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      const res = await window.api.savePlacementResult(newAnswers)
      setResult({ level: res.level, score: res.score, breakdown: res.breakdown })
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[--color-bg]">
        <p className="text-[--color-text-muted]">Loading test...</p>
      </div>
    )
  }

  if (result) {
    const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[--color-bg] px-8">
        <div className="max-w-md w-full text-center space-y-6">
          <div>
            <p className="text-sm text-[--color-text-muted] mb-2">Your English level is</p>
            <h2 className="text-5xl font-heading font-bold text-[--color-primary]">{result.level}</h2>
            <p className="text-lg text-[--color-text-muted] mt-2">Score: {result.score}%</p>
          </div>

          {/* Level breakdown */}
          <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5 text-left">
            <h3 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Breakdown</h3>
            <div className="space-y-2">
              {levels.map((lv) => {
                const b = result.breakdown[lv]
                if (!b || b.total === 0) return null
                const pct = Math.round((b.correct / b.total) * 100)
                return (
                  <div key={lv} className="flex items-center gap-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${LEVEL_COLORS[lv] || ''}`}>{lv}</span>
                    <div className="flex-1 h-2 bg-[--color-muted] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[--color-primary] rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-[--color-text-muted] w-16 text-right">{b.correct}/{b.total} ({pct}%)</span>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onComplete(result.level)}
            className="w-full bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                       hover:bg-[--color-primary-light] transition-colors cursor-pointer"
          >
            Start Learning
          </button>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const progress = Math.round(((current + 1) / questions.length) * 100)

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      <div className="h-1 bg-[--color-progress-bg]">
        <div
          className="h-full bg-[--color-primary] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-heading font-semibold text-[--color-text]">Level Test</p>
            <p className="text-xs text-[--color-text-faint]">{current + 1} / {questions.length}</p>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${LEVEL_COLORS[q.cefrLevel] || ''}`}>
            {q.cefrLevel}
          </span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="max-w-lg w-full space-y-6">
          <h2 className="text-xl font-heading font-semibold text-[--color-text] leading-relaxed">
            {q.question}
          </h2>
          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="w-full text-left px-4 py-3 rounded-lg border border-[--color-border]
                           bg-[--color-card] text-[--color-text]
                           hover:border-[--color-primary] hover:bg-[--color-muted]
                           transition-colors cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
