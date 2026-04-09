import { useEffect, useState } from 'react'
import type { PlacementQuestion, PlacementResult } from '@shared/types'

interface Props {
  onComplete: () => void
}

export default function PlacementTest({ onComplete }: Props) {
  const [questions, setQuestions] = useState<PlacementQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<PlacementResult | null>(null)
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
      setResult(res)
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
          <p className="text-[--color-text-muted]">
            Score: {result.score}% ({result.totalQuestions} questions)
          </p>
          <div className="bg-[--color-card] border border-[--color-border] rounded-lg p-4 text-left space-y-1">
            {Object.entries(result.breakdown).map(([level, { correct, total }]) => (
              <div key={level} className="flex justify-between text-sm">
                <span className="font-medium text-[--color-text]">{level}</span>
                <span className="text-[--color-text-muted]">{correct}/{total}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={onComplete}
            className="mt-4 w-full bg-[--color-accent] text-white py-3 px-6 rounded-lg font-heading font-semibold
                       hover:bg-[--color-accent-light] transition-colors cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const progress = Math.round(((current + 1) / questions.length) * 100)

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      {/* Progress bar */}
      <div className="h-1 bg-[--color-progress-bg]">
        <div
          className="h-full bg-[--color-primary] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="max-w-lg w-full space-y-6">
          <p className="text-sm text-[--color-text-faint] text-right">
            {current + 1} / {questions.length}
          </p>

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
