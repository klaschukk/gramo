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

export default function PlacementTest({ onComplete }: Props) {
  const [questions, setQuestions] = useState<PlacementQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<{ level: CEFRLevel; score: number } | null>(null)
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
      setResult({ level: res.level, score: res.score })
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
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[--color-bg] px-8">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-3xl font-heading font-bold text-[--color-text]">
            Your level: <span className="text-[--color-primary]">{result.level}</span>
          </h2>
          <p className="text-[--color-text-muted]">Score: {result.score}%</p>
          <button
            type="button"
            onClick={() => onComplete(result.level)}
            className="mt-4 w-full bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                       hover:bg-[--color-primary-light] transition-colors cursor-pointer"
          >
            Back to Units
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
        <p className="text-sm font-heading font-semibold text-[--color-text]">Level Test</p>
        <p className="text-xs text-[--color-text-faint]">{current + 1} / {questions.length}</p>
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
                           hover:border-[--color-border-hover] hover:bg-[--color-muted]
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
