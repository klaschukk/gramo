import { useEffect, useState } from 'react'
import type { ReadingPassage, ReadingPassageWithProgress } from '@shared/types'

interface Props {
  onBack: () => void
}

type View = 'list' | 'reading' | 'questions' | 'results'

export default function Reading({ onBack }: Props) {
  const [passages, setPassages] = useState<ReadingPassageWithProgress[]>([])
  const [active, setActive] = useState<ReadingPassage | null>(null)
  const [view, setView] = useState<View>('list')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [results, setResults] = useState<{ score: number; total: number } | null>(null)

  useEffect(() => {
    window.api.getReadingPassages().then(setPassages)
  }, [])

  function openPassage(p: ReadingPassageWithProgress) {
    setActive(p)
    setAnswers({})
    setResults(null)
    setView('reading')
  }

  function startQuestions() {
    setView('questions')
  }

  async function submitAnswers() {
    if (!active) return
    let score = 0
    active.questions.forEach((q, i) => {
      const userAns = (answers[i] ?? '').trim().toLowerCase()
      const correct = q.answer.trim().toLowerCase()
      if (userAns === correct) score++
    })
    const total = active.questions.length
    setResults({ score, total })
    setView('results')
    await window.api.saveReadingProgress(active.id, score, total)
    // Log time + as 1 "exercise" per question for stats
    await window.api.logStudyTime(active.estimatedMinutes * 60, total)
    // Refresh passages list
    window.api.getReadingPassages().then(setPassages)
  }

  function backToList() {
    setActive(null)
    setView('list')
    setResults(null)
    setAnswers({})
  }

  // ===== LIST VIEW =====
  if (view === 'list' || !active) {
    return (
      <div className="flex h-screen flex-col bg-[--color-bg]">
        <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card] flex items-center gap-3">
          <button type="button" onClick={onBack} title="Back" className="text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="font-heading font-semibold text-[--color-text]">Reading Practice</h1>
            <p className="text-[11px] text-[--color-text-faint]">IELTS-style passages with comprehension questions</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-2xl mx-auto space-y-3">
            {passages.length === 0 && (
              <p className="text-sm text-[--color-text-muted] text-center py-8">Loading passages...</p>
            )}
            {passages.map((p) => {
              const done = p.score !== null
              const percentage = done ? Math.round((p.score! / p.total!) * 100) : 0
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => openPassage(p)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-colors cursor-pointer
                    ${done && percentage >= 70
                      ? 'border-[--color-accent]/50 bg-[--color-success-bg]'
                      : 'border-[--color-border] bg-[--color-card] hover:border-[--color-primary]'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-medium bg-[--color-level-bg] text-[--color-level-text] px-1.5 py-0.5 rounded">
                          {p.cefrLevel}
                        </span>
                        <span className="text-[11px] text-[--color-text-faint]">{p.topic}</span>
                        <span className="text-[11px] text-[--color-text-faint]">· {p.estimatedMinutes} min</span>
                      </div>
                      <h3 className="font-heading font-semibold text-[--color-text]">{p.title}</h3>
                      <p className="text-[11px] text-[--color-text-faint] mt-1">{p.questions.length} comprehension questions</p>
                    </div>
                    {done && (
                      <div className="text-right shrink-0">
                        <div className={`text-sm font-mono font-semibold
                          ${percentage >= 70 ? 'text-[--color-success]' : 'text-[--color-focus]'}`}>
                          {p.score}/{p.total}
                        </div>
                        <div className="text-[10px] text-[--color-text-faint]">{percentage}%</div>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </main>
      </div>
    )
  }

  // ===== READING VIEW =====
  if (view === 'reading') {
    return (
      <div className="flex h-screen flex-col bg-[--color-bg]">
        <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card] flex items-center gap-3">
          <button type="button" onClick={backToList} title="Back" className="text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium bg-[--color-level-bg] text-[--color-level-text] px-1.5 py-0.5 rounded">{active.cefrLevel}</span>
              <span className="text-[11px] text-[--color-text-faint] truncate">{active.topic}</span>
            </div>
            <h1 className="font-heading font-bold text-[--color-text] truncate">{active.title}</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-6 space-y-4">
              {active.text.split(/\n\n+/).map((para, i) => (
                <p key={i} className="text-[15px] leading-7 text-[--color-text]">{para}</p>
              ))}
            </div>
          </div>
        </main>

        <footer className="px-6 py-4 border-t border-[--color-border] bg-[--color-card]">
          <div className="max-w-2xl mx-auto">
            <button
              type="button"
              onClick={startQuestions}
              className="w-full bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                         hover:bg-[--color-primary-light] transition-colors cursor-pointer"
            >
              Answer {active.questions.length} questions →
            </button>
          </div>
        </footer>
      </div>
    )
  }

  // ===== QUESTIONS VIEW =====
  if (view === 'questions') {
    const allAnswered = active.questions.every((_, i) => answers[i]?.trim())
    return (
      <div className="flex h-screen flex-col bg-[--color-bg]">
        <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card] flex items-center gap-3">
          <button type="button" onClick={() => setView('reading')} title="Back to text" className="text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="font-heading font-semibold text-[--color-text]">Questions</h1>
            <p className="text-[11px] text-[--color-text-faint]">{active.title}</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-2xl mx-auto space-y-5">
            {active.questions.map((q, i) => (
              <div key={i} className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
                <p className="text-sm font-heading font-semibold text-[--color-text] mb-3">
                  <span className="text-[--color-primary] mr-2">{i + 1}.</span>
                  {q.question}
                </p>
                {q.options ? (
                  <div className="space-y-2">
                    {q.options.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setAnswers({ ...answers, [i]: opt })}
                        className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors cursor-pointer
                          ${answers[i] === opt
                            ? 'border-[--color-primary] bg-[--color-primary-soft] text-[--color-text]'
                            : 'border-[--color-border] bg-[--color-bg] text-[--color-text] hover:border-[--color-border-hover]'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={answers[i] ?? ''}
                    onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                    placeholder="Type your answer..."
                    className="w-full bg-[--color-bg] border border-[--color-border] rounded-lg px-4 py-2.5 text-sm
                               text-[--color-text] placeholder:text-[--color-text-faint]
                               focus:outline-none focus:border-[--color-primary]"
                  />
                )}
              </div>
            ))}
          </div>
        </main>

        <footer className="px-6 py-4 border-t border-[--color-border] bg-[--color-card]">
          <div className="max-w-2xl mx-auto">
            <button
              type="button"
              onClick={submitAnswers}
              disabled={!allAnswered}
              className="w-full bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                         hover:bg-[--color-primary-light] transition-colors disabled:opacity-40 cursor-pointer"
            >
              {allAnswered ? 'Submit answers' : `Answer all ${active.questions.length} questions to submit`}
            </button>
          </div>
        </footer>
      </div>
    )
  }

  // ===== RESULTS VIEW =====
  if (view === 'results' && results) {
    const percentage = Math.round((results.score / results.total) * 100)
    const passed = percentage >= 70
    return (
      <div className="flex h-screen flex-col bg-[--color-bg]">
        <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card] flex items-center gap-3">
          <button type="button" onClick={backToList} title="Back" className="text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-heading font-semibold text-[--color-text]">Results</h1>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-2xl mx-auto space-y-5">
            <div className={`rounded-xl p-6 border text-center
              ${passed ? 'border-[--color-success] bg-[--color-success-bg]' : 'border-[--color-focus] bg-[--color-focus-bg]'}`}>
              <p className="text-5xl font-heading font-bold mb-1
                  ${passed ? 'text-[--color-success]' : 'text-[--color-focus]'}">
                {results.score}<span className="text-2xl text-[--color-text-faint]">/{results.total}</span>
              </p>
              <p className={`text-2xl font-heading font-bold ${passed ? 'text-[--color-success]' : 'text-[--color-focus]'}`}>
                {percentage}%
              </p>
              <p className="text-sm text-[--color-text-muted] mt-2">
                {passed ? 'Well done! You understand the passage.' : 'Re-read the passage and try again.'}
              </p>
            </div>

            <div className="space-y-3">
              {active.questions.map((q, i) => {
                const userAns = (answers[i] ?? '').trim()
                const correct = userAns.toLowerCase() === q.answer.trim().toLowerCase()
                return (
                  <div key={i} className={`rounded-xl border p-4
                    ${correct ? 'border-[--color-success]/40 bg-[--color-success-bg]' : 'border-[--color-error]/40 bg-[--color-error-bg]'}`}>
                    <p className="text-sm font-medium text-[--color-text]">
                      <span className="text-[--color-text-faint] mr-2">{i + 1}.</span>
                      {q.question}
                    </p>
                    <div className="mt-2 space-y-1 text-[13px]">
                      <p>
                        <span className="text-[--color-text-faint]">Your answer:</span>{' '}
                        <span className={correct ? 'text-[--color-success] font-medium' : 'text-[--color-error] font-medium'}>
                          {userAns || '(empty)'}
                        </span>
                      </p>
                      {!correct && (
                        <p>
                          <span className="text-[--color-text-faint]">Correct:</span>{' '}
                          <span className="text-[--color-success] font-medium">{q.answer}</span>
                        </p>
                      )}
                      <p className="text-[12px] text-[--color-text-muted] italic mt-1">{q.explanation}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setView('reading'); setAnswers({}); setResults(null); }}
                className="bg-[--color-muted] border border-[--color-border] text-[--color-text] py-3 rounded-lg font-heading text-sm
                           hover:border-[--color-border-hover] cursor-pointer"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={backToList}
                className="bg-[--color-primary] text-white py-3 rounded-lg font-heading text-sm
                           hover:bg-[--color-primary-light] cursor-pointer"
              >
                More passages
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}
