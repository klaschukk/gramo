import { useEffect, useState, useMemo } from 'react'
import type { CEFRLevel } from '@shared/types'

interface PlacementQuestion {
  id: number
  cefrLevel: CEFRLevel
  section: 'grammar' | 'reading' | 'error' | 'cloze'
  passage: string | null
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

const SECTION_INFO: Record<string, { label: string; description: string; color: string }> = {
  grammar: { label: 'Grammar', description: 'Multiple choice on grammar usage', color: 'text-[--color-primary]' },
  reading: { label: 'Reading Comprehension', description: 'Read the passage and answer', color: 'text-[--color-accent]' },
  error: { label: 'Error Correction', description: 'Pick the grammatically correct sentence', color: 'text-orange-500' },
  cloze: { label: 'Cloze Test', description: 'Fill in the blanks in context', color: 'text-purple-500' },
}

type Phase = 'intro' | 'section-intro' | 'question' | 'result'

export default function PlacementTest({ onComplete }: Props) {
  const [questions, setQuestions] = useState<PlacementQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<{ level: CEFRLevel; score: number; breakdown: Record<CEFRLevel, { correct: number; total: number }>; sectionScores: Record<string, { correct: number; total: number }> } | null>(null)
  const [loading, setLoading] = useState(true)
  const [phase, setPhase] = useState<Phase>('intro')
  const [lastSeenSection, setLastSeenSection] = useState<string | null>(null)

  useEffect(() => {
    window.api.getPlacementQuestions().then((qs) => {
      setQuestions(qs)
      setLoading(false)
    })
  }, [])

  const sectionCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const q of questions) counts[q.section] = (counts[q.section] ?? 0) + 1
    return counts
  }, [questions])

  const q = questions[current]
  const progress = questions.length > 0 ? Math.round(((current + 1) / questions.length) * 100) : 0

  async function handleAnswer(option: string) {
    const newAnswers = { ...answers, [q.id]: option }
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      const next = questions[current + 1]
      setCurrent(current + 1)
      // Show section transition if entering a new section
      if (next.section !== q.section) {
        setLastSeenSection(q.section)
        setPhase('section-intro')
      }
    } else {
      const res = await window.api.savePlacementResult(newAnswers)
      // Compute section scores locally
      const sectionScores: Record<string, { correct: number; total: number }> = {}
      for (const qq of questions) {
        if (!sectionScores[qq.section]) sectionScores[qq.section] = { correct: 0, total: 0 }
        sectionScores[qq.section].total++
        if (newAnswers[qq.id] === qq.answer) sectionScores[qq.section].correct++
      }
      setResult({ level: res.level, score: res.score, breakdown: res.breakdown, sectionScores })
      setPhase('result')
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[--color-bg]">
        <p className="text-[--color-text-muted]">Loading test...</p>
      </div>
    )
  }

  // ===== INTRO SCREEN =====
  if (phase === 'intro') {
    return (
      <div className="flex h-screen flex-col bg-[--color-bg]">
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-lg w-full space-y-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[--color-primary] bg-opacity-10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[--color-primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-[--color-text] mb-2">English Level Test</h1>
              <p className="text-[--color-text-muted]">
                This test measures your real ability across 4 sections. It takes 20-30 minutes.
              </p>
            </div>

            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5 text-left space-y-3">
              {(['grammar', 'reading', 'error', 'cloze'] as const).map((s, i) => {
                const info = SECTION_INFO[s]
                const count = sectionCounts[s] ?? 0
                return (
                  <div key={s} className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full border-2 border-current ${info.color} flex items-center justify-center text-[11px] font-heading font-bold shrink-0`}>
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className={`text-sm font-heading font-semibold ${info.color}`}>
                        {info.label} <span className="text-[--color-text-faint] font-normal">· {count} questions</span>
                      </p>
                      <p className="text-xs text-[--color-text-muted]">{info.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-xs text-[--color-text-faint]">
              Total: {questions.length} questions · Answer honestly for an accurate level
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onComplete('A2')}
                className="flex-1 bg-[--color-muted] border border-[--color-border] text-[--color-text] py-3 px-6 rounded-lg font-heading font-semibold
                           hover:border-[--color-border-hover] transition-colors cursor-pointer"
              >
                Skip for now
              </button>
              <button
                type="button"
                onClick={() => setPhase('section-intro')}
                className="flex-1 bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                           hover:bg-[--color-primary-light] transition-colors cursor-pointer"
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ===== SECTION INTRO =====
  if (phase === 'section-intro' && q) {
    const info = SECTION_INFO[q.section]
    const sectionQs = questions.filter((x) => x.section === q.section).length
    const sectionIdx = (['grammar', 'reading', 'error', 'cloze'] as const).indexOf(q.section) + 1
    return (
      <div className="flex h-screen flex-col bg-[--color-bg]">
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-md w-full text-center space-y-6">
            {lastSeenSection && (
              <p className="text-sm text-[--color-success]">✓ {SECTION_INFO[lastSeenSection].label} complete</p>
            )}
            <div>
              <p className="text-xs text-[--color-text-faint] mb-1">Section {sectionIdx} of 4</p>
              <h2 className={`text-2xl font-heading font-bold ${info.color}`}>{info.label}</h2>
              <p className="text-[--color-text-muted] mt-2">{info.description}</p>
              <p className="text-xs text-[--color-text-faint] mt-3">{sectionQs} questions</p>
            </div>
            <button
              type="button"
              onClick={() => setPhase('question')}
              className="w-full bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                         hover:bg-[--color-primary-light] transition-colors cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ===== RESULT =====
  if (phase === 'result' && result) {
    const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    return (
      <div className="flex h-screen flex-col bg-[--color-bg] overflow-y-auto">
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="max-w-md w-full space-y-6">
            <div className="text-center">
              <p className="text-sm text-[--color-text-muted] mb-2">Your English level is</p>
              <h2 className="text-6xl font-heading font-bold text-[--color-primary]">{result.level}</h2>
              <p className="text-lg text-[--color-text-muted] mt-2">Overall: {result.score}%</p>
            </div>

            {/* Level breakdown */}
            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
              <h3 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">By CEFR level</h3>
              <div className="space-y-2">
                {levels.map((lv) => {
                  const b = result.breakdown[lv]
                  if (!b || b.total === 0) return null
                  const pct = Math.round((b.correct / b.total) * 100)
                  return (
                    <div key={lv} className="flex items-center gap-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${LEVEL_COLORS[lv] || ''}`}>{lv}</span>
                      <div className="flex-1 h-2 bg-[--color-muted] rounded-full overflow-hidden">
                        <div className="h-full bg-[--color-primary] rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-[--color-text-muted] w-16 text-right">{b.correct}/{b.total}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Section breakdown */}
            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
              <h3 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">By section</h3>
              <div className="space-y-2">
                {(['grammar', 'reading', 'error', 'cloze'] as const).map((s) => {
                  const b = result.sectionScores[s]
                  if (!b || b.total === 0) return null
                  const pct = Math.round((b.correct / b.total) * 100)
                  const info = SECTION_INFO[s]
                  return (
                    <div key={s} className="flex items-center gap-3">
                      <span className={`text-xs font-medium w-16 ${info.color}`}>{info.label.split(' ')[0]}</span>
                      <div className="flex-1 h-2 bg-[--color-muted] rounded-full overflow-hidden">
                        <div className="h-full bg-[--color-primary] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-[--color-text-muted] w-12 text-right">{pct}%</span>
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
      </div>
    )
  }

  // ===== QUESTION =====
  if (!q) return null
  const info = SECTION_INFO[q.section]

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      <div className="h-1 bg-[--color-progress-bg]">
        <div className="h-full bg-[--color-primary] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className={`text-xs font-heading font-semibold ${info.color}`}>{info.label}</p>
            <p className="text-[10px] text-[--color-text-faint]">{current + 1} / {questions.length}</p>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${LEVEL_COLORS[q.cefrLevel] || ''}`}>
            {q.cefrLevel}
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl w-full mx-auto space-y-6">
          {/* Passage (reading/cloze) */}
          {q.passage && (
            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
              <p className="text-[15px] leading-7 text-[--color-text] whitespace-pre-wrap">{q.passage}</p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-heading font-semibold text-[--color-text] leading-relaxed mb-4">
              {q.question}
            </h2>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <button
                  type="button"
                  key={opt + i}
                  onClick={() => handleAnswer(opt)}
                  className="w-full text-left px-4 py-3 rounded-lg border border-[--color-border]
                             bg-[--color-card] text-[--color-text]
                             hover:border-[--color-primary] hover:bg-[--color-muted]
                             transition-colors cursor-pointer flex items-center gap-3"
                >
                  <span className="text-[10px] font-mono text-[--color-text-faint] border border-[--color-border] rounded w-5 h-5 flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
