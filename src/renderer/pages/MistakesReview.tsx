import { useEffect, useState } from 'react'
import type { Exercise } from '@shared/types'

interface Props {
  onBack: () => void
}

type AnswerState = 'idle' | 'correct' | 'wrong'

export default function MistakesReview({ onBack }: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [fillValue, setFillValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [resolved, setResolved] = useState(0)

  useEffect(() => {
    window.api.getMistakes(50).then((ex) => {
      setExercises(ex)
      setLoading(false)
    })
  }, [])

  const ex = exercises[current]

  function handleSelect(opt: string) {
    if (answerState !== 'idle') return
    setSelected(opt)
    const correct = opt.trim().toLowerCase() === ex.answer.trim().toLowerCase()
    setAnswerState(correct ? 'correct' : 'wrong')
  }

  async function handleNext() {
    if (answerState === 'correct') {
      await window.api.resolveMistake(ex.id)
      setResolved((n) => n + 1)
    }
    if (current < exercises.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
      setFillValue('')
      setAnswerState('idle')
    } else {
      onBack()
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[--color-bg]">
        <p className="text-[--color-text-muted] text-sm">Loading...</p>
      </div>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="flex h-screen flex-col bg-[--color-bg]">
        <header className="px-6 py-4 border-b border-[--color-border] bg-[--color-card]">
          <button type="button" onClick={onBack} title="Back" className="text-sm text-[--color-text-muted] hover:text-[--color-text] flex items-center gap-1 cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[--color-success-bg] flex items-center justify-center">
              <svg className="w-8 h-8 text-[--color-success]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-heading font-bold text-[--color-text]">No mistakes to review</h2>
            <p className="text-[--color-text-muted]">You've mastered all your previous errors.</p>
          </div>
        </div>
      </div>
    )
  }

  const progress = Math.round(((current + 1) / exercises.length) * 100)

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      <div className="h-1 bg-[--color-progress-bg]">
        <div className="h-full bg-[--color-error] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <header className="px-6 py-4 border-b border-[--color-border] bg-[--color-card]">
        <div className="flex items-center justify-between">
          <button type="button" onClick={onBack} title="Back" className="text-sm text-[--color-text-muted] hover:text-[--color-text] flex items-center gap-1 cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <span className="text-[10px] text-[--color-text-faint]">Mistake {current + 1} / {exercises.length} · {resolved} resolved</span>
        </div>
        <p className="text-xs font-heading font-semibold text-[--color-error] mt-1">Mistakes Review</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="max-w-lg w-full space-y-6">
          <h2 className="text-xl font-heading font-semibold text-[--color-text]">{ex.question}</h2>

          {ex.options ? (
            <div className="space-y-3">
              {ex.options.map((opt, i) => {
                let cls = 'w-full text-left px-4 py-3 rounded-lg border transition-colors cursor-pointer '
                if (answerState !== 'idle') {
                  if (opt === ex.answer) cls += 'border-[--color-success] bg-[--color-success-bg] text-[--color-success]'
                  else if (opt === selected) cls += 'border-[--color-error] bg-[--color-error-bg] text-[--color-error]'
                  else cls += 'border-[--color-border] bg-[--color-card] text-[--color-text] opacity-60'
                } else {
                  cls += 'border-[--color-border] bg-[--color-card] text-[--color-text] hover:border-[--color-border-hover] hover:bg-[--color-muted]'
                }
                return (
                  <button type="button" key={opt + i} onClick={() => handleSelect(opt)} className={cls}>
                    <span className="inline-flex items-center gap-2.5">
                      <span className="text-[10px] font-mono text-[--color-text-faint] border border-[--color-border] rounded w-5 h-5 flex items-center justify-center shrink-0">{i + 1}</span>
                      {opt}
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex gap-3">
              <input
                type="text"
                value={fillValue}
                onChange={(e) => setFillValue(e.target.value)}
                disabled={answerState !== 'idle'}
                placeholder="Type your answer..."
                className="flex-1 border border-[--color-border] bg-[--color-card] text-[--color-text] rounded-lg px-4 py-3
                           focus:outline-none focus:border-[--color-primary] placeholder:text-[--color-text-faint]"
                onKeyDown={(e) => { if (e.key === 'Enter' && fillValue.trim()) handleSelect(fillValue.trim()) }}
              />
              <button
                type="button"
                onClick={() => { if (fillValue.trim()) handleSelect(fillValue.trim()) }}
                disabled={answerState !== 'idle' || !fillValue.trim()}
                className="bg-[--color-primary] text-white px-4 py-3 rounded-lg font-heading font-semibold
                           hover:bg-[--color-primary-light] transition-colors disabled:opacity-50 cursor-pointer"
              >
                Check
              </button>
            </div>
          )}

          {answerState !== 'idle' && ex.explanation && (
            <div className={`p-3 rounded-lg text-sm ${
              answerState === 'correct'
                ? 'bg-[--color-success-bg] text-[--color-success]'
                : 'bg-[--color-error-bg] text-[--color-error]'
            }`}>
              {answerState === 'correct' && <p className="font-semibold mb-1">✓ Correct — removed from your mistakes</p>}
              {answerState === 'wrong' && <p className="font-semibold mb-1">✗ Still wrong — answer: {ex.answer}</p>}
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
              {current === exercises.length - 1 ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
