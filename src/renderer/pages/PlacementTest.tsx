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
      // Submit
      const res = await window.api.savePlacementResult(newAnswers)
      setResult(res)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-400">Loading test...</p>
      </div>
    )
  }

  if (result) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-white px-8">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Your level: {result.level}</h2>
          <p className="text-gray-500">
            Score: {result.score}% ({result.totalQuestions} questions)
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left space-y-1">
            {Object.entries(result.breakdown).map(([level, { correct, total }]) => (
              <div key={level} className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{level}</span>
                <span className="text-gray-500">{correct}/{total}</span>
              </div>
            ))}
          </div>
          <button
            onClick={onComplete}
            className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
                       hover:bg-blue-700 transition-colors"
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
    <div className="flex h-screen flex-col bg-white">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="max-w-lg w-full space-y-6">
          <p className="text-sm text-gray-400 text-right">
            {current + 1} / {questions.length}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
            {q.question}
          </h2>

          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-200
                           hover:border-blue-400 hover:bg-blue-50 transition-colors
                           text-gray-800"
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
