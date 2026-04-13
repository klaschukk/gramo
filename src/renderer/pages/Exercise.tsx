import { useState, useEffect } from 'react'
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
      await window.api.logStudyTime(0, exercises.length)
      onComplete()
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswerState('idle')
    }
  }

  // Keyboard shortcuts: 1-4 select options, Enter goes next, Escape exits
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { onBack(); return }
      if (e.key === 'Enter' && answerState !== 'idle') { handleNext(); return }
      if (answerState !== 'idle' || !ex.options) return
      const num = parseInt(e.key)
      if (num >= 1 && num <= ex.options.length) {
        handleSelect(ex.options[num - 1])
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const progress = Math.round(((current + 1) / exercises.length) * 100)

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      {/* Progress bar */}
      <div className="h-1 bg-[--color-progress-bg]">
        <div
          className="h-full bg-[--color-primary] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="px-6 py-4 border-b border-[--color-border] bg-[--color-card]">
        <div className="flex items-center justify-between">
          <button
            type="button"
            title="Back to lesson (Esc)"
            onClick={onBack}
            className="text-sm text-[--color-text-muted] hover:text-[--color-text] flex items-center gap-1 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to lesson
          </button>
          <span className="text-[10px] text-[--color-text-faint]">Press 1-4 to answer, Enter to continue</span>
        </div>
        <p className="text-xs text-[--color-text-faint] mt-1">
          Exercise {current + 1} of {exercises.length}
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="max-w-lg w-full space-y-6">
          <h2 className="text-xl font-heading font-semibold text-[--color-text]">{ex.question}</h2>

          {ex.options ? (
            <div className="space-y-3">
              {ex.options.map((opt) => {
                let cls =
                  'w-full text-left px-4 py-3 rounded-lg border transition-colors cursor-pointer '
                if (answerState !== 'idle') {
                  if (opt === ex.answer) {
                    cls += 'border-[--color-success] bg-[--color-success-bg] text-[--color-success]'
                  } else if (opt === selected) {
                    cls += 'border-[--color-error] bg-[--color-error-bg] text-[--color-error]'
                  } else {
                    cls += 'border-[--color-border] bg-[--color-card] text-[--color-text] opacity-60'
                  }
                } else {
                  cls += 'border-[--color-border] bg-[--color-card] text-[--color-text] hover:border-[--color-border-hover] hover:bg-[--color-muted]'
                }
                const idx = ex.options!.indexOf(opt) + 1
                return (
                  <button type="button" key={opt} onClick={() => handleSelect(opt)} className={cls}>
                    <span className="inline-flex items-center gap-2.5">
                      <span className="text-[10px] font-mono text-[--color-text-faint] border border-[--color-border] rounded w-5 h-5 flex items-center justify-center shrink-0">{idx}</span>
                      {opt}
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
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
                  ? 'bg-[--color-success-bg] text-[--color-success]'
                  : 'bg-[--color-error-bg] text-[--color-error]'
              }`}
            >
              {ex.explanation}
            </div>
          )}
        </div>
      </main>

      <footer className="px-8 py-4 border-t border-[--color-border] bg-[--color-card]">
        <div className="max-w-lg mx-auto">
          {answerState !== 'idle' && (
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                         hover:bg-[--color-primary-light] transition-colors cursor-pointer"
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
        className="flex-1 border border-[--color-border] bg-[--color-card] text-[--color-text] rounded-lg px-4 py-3
                   focus:outline-none focus:border-[--color-primary] placeholder:text-[--color-text-faint]"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value.trim()) onSubmit(value.trim())
        }}
      />
      <button
        type="button"
        onClick={() => { if (value.trim()) onSubmit(value.trim()) }}
        disabled={answerState !== 'idle' || !value.trim()}
        className="bg-[--color-primary] text-white px-4 py-3 rounded-lg font-heading font-semibold
                   hover:bg-[--color-primary-light] transition-colors disabled:opacity-50 cursor-pointer"
      >
        Check
      </button>
    </div>
  )
}
