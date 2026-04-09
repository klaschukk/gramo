import React, { useState } from 'react'
import type { Exercise } from '@shared/types'

interface Props {
  chapterId: number
  exercises: Exercise[]
  onBack: () => void
  onComplete: () => void
}

type AnswerState = 'idle' | 'correct' | 'wrong'

export default function ExercisePage({ chapterId, exercises, onBack, onComplete }: Props) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [correctCount, setCorrectCount] = useState(0)

  const ex = exercises[current]
  const isLast = current === exercises.length - 1

  function handleSelect(opt: string) {
    if (answerState !== 'idle') return
    setSelected(opt)
    const correct = opt === ex.answer
    setAnswerState(correct ? 'correct' : 'wrong')
    if (correct) setCorrectCount((c) => c + 1)
  }

  async function handleNext() {
    if (isLast) {
      const score = Math.round((correctCount / exercises.length) * 100)
      await window.api.saveProgress({
        chapterId,
        exerciseId: null,
        score,
        attempts: 1,
      })
      onComplete()
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswerState('idle')
    }
  }

  const progress = Math.round(((current + 1) / exercises.length) * 100)

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="px-6 py-4 border-b border-gray-100">
        <button
          onClick={onBack}
          className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1"
        >
          ← Back to lesson
        </button>
        <p className="text-xs text-gray-400 mt-1">
          Exercise {current + 1} of {exercises.length}
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="max-w-lg w-full space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">{ex.question}</h2>

          {ex.options ? (
            <div className="space-y-3">
              {ex.options.map((opt) => {
                let cls =
                  'w-full text-left px-4 py-3 rounded-lg border transition-colors text-gray-800 '
                if (answerState !== 'idle') {
                  if (opt === ex.answer) {
                    cls += 'border-green-400 bg-green-50 text-green-800'
                  } else if (opt === selected) {
                    cls += 'border-red-400 bg-red-50 text-red-800'
                  } else {
                    cls += 'border-gray-200 opacity-60'
                  }
                } else {
                  cls += 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                }
                return (
                  <button key={opt} onClick={() => handleSelect(opt)} className={cls}>
                    {opt}
                  </button>
                )
              })}
            </div>
          ) : (
            // Fill-in-blank — simple text input
            <FillInBlank
              answer={ex.answer}
              onSubmit={(val) => handleSelect(val)}
              answerState={answerState}
            />
          )}

          {answerState !== 'idle' && ex.explanation && (
            <div
              className={`p-3 rounded-lg text-sm ${
                answerState === 'correct'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {ex.explanation}
            </div>
          )}
        </div>
      </main>

      <footer className="px-8 py-4 border-t border-gray-100">
        <div className="max-w-lg mx-auto">
          {answerState !== 'idle' && (
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
                         hover:bg-blue-700 transition-colors"
            >
              {isLast ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}

function FillInBlank({
  answer,
  onSubmit,
  answerState,
}: {
  answer: string
  onSubmit: (val: string) => void
  answerState: AnswerState
}) {
  const [value, setValue] = useState('')

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={answerState !== 'idle'}
        placeholder="Type your answer..."
        className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-800
                   focus:outline-none focus:border-blue-400"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value.trim()) onSubmit(value.trim())
        }}
      />
      <button
        onClick={() => { if (value.trim()) onSubmit(value.trim()) }}
        disabled={answerState !== 'idle' || !value.trim()}
        className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700
                   transition-colors disabled:opacity-50"
      >
        Check
      </button>
    </div>
  )
}
