import { useEffect, useState } from 'react'
import type { Chapter as ChapterType, Exercise } from '@shared/types'
import ExercisePage from './Exercise'

interface Props {
  chapterId: number
  onBack: () => void
}

interface Lesson {
  rule: string
  formula: string
  examples: { sentence: string; correct?: boolean }[]
  notes?: string[]
}

type View = 'content' | 'exercises'

export default function Chapter({ chapterId, onBack }: Props) {
  const [chapter, setChapter] = useState<ChapterType | null>(null)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [view, setView] = useState<View>('content')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      window.api.getChapter(chapterId),
      window.api.getExercises(chapterId),
    ]).then(([ch, ex]) => {
      setChapter(ch)
      setExercises(ex)
      // Try to parse lesson from notes field (JSON)
      if (ch.notes) {
        try { setLesson(JSON.parse(ch.notes)) } catch { /* ignore */ }
      }
      setLoading(false)
    })
  }, [chapterId])

  if (loading || !chapter) {
    return (
      <div className="flex h-screen items-center justify-center bg-[--color-bg]">
        <p className="text-[--color-text-muted] text-sm">Loading...</p>
      </div>
    )
  }

  if (view === 'exercises') {
    return (
      <ExercisePage
        chapterId={chapterId}
        exercises={exercises}
        onBack={() => setView('content')}
        onComplete={() => onBack()}
      />
    )
  }

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[--color-border] bg-[--color-card]">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-[--color-text-muted] hover:text-[--color-text] mb-3 flex items-center gap-1 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono text-[--color-text-faint]">Unit {chapter.unitNumber}</span>
            <span className="text-xs bg-[--color-level-bg] text-[--color-level-text] px-2 py-0.5 rounded">
              {chapter.cefrLevel}
            </span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-[--color-text]">{chapter.title}</h1>
        </div>
      </header>

      {/* Lesson content */}
      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto space-y-6">

          {lesson ? (
            // Structured lesson
            <>
              {/* Rule */}
              <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
                <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Rule</h2>
                <p className="text-[15px] leading-7 text-[--color-text]">{lesson.rule}</p>
              </div>

              {/* Formula */}
              <div className="bg-[--color-primary] bg-opacity-10 border border-[--color-primary] border-opacity-20 rounded-xl p-5">
                <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Formula</h2>
                <p className="text-lg font-heading font-semibold text-[--color-text] text-center py-2">
                  {lesson.formula}
                </p>
              </div>

              {/* Examples */}
              <div>
                <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Examples</h2>
                <div className="space-y-2">
                  {lesson.examples.map((ex, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 px-4 py-3 rounded-lg border ${
                        ex.correct === false
                          ? 'border-[--color-error] bg-[--color-error-bg] border-opacity-30'
                          : 'border-[--color-border] bg-[--color-card]'
                      }`}
                    >
                      <span className="shrink-0 mt-0.5">
                        {ex.correct === false ? (
                          <svg className="w-4 h-4 text-[--color-error]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-[--color-success]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <p className={`text-sm leading-6 ${
                        ex.correct === false
                          ? 'text-[--color-error] line-through'
                          : 'text-[--color-text]'
                      }`}>
                        {ex.sentence}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {lesson.notes && lesson.notes.length > 0 && (
                <div className="bg-[--color-muted] border border-[--color-border] rounded-xl p-5">
                  <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Notes</h2>
                  <ul className="space-y-2">
                    {lesson.notes.map((note, i) => (
                      <li key={i} className="text-sm leading-6 text-[--color-text] flex gap-2">
                        <span className="text-[--color-primary] shrink-0">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            // Fallback: raw text as paragraphs
            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
              {chapter.rawText.split(/\n\n+/).filter(Boolean).map((para, i) => (
                <p key={i} className="text-[15px] leading-7 text-[--color-text] mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-[--color-border] bg-[--color-card]">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => setView('exercises')}
            disabled={exercises.length === 0}
            className="w-full bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                       hover:bg-[--color-primary-light] transition-colors disabled:opacity-40 cursor-pointer"
          >
            {exercises.length > 0
              ? `Practice (${exercises.length} exercises)`
              : 'No exercises yet'}
          </button>
        </div>
      </footer>
    </div>
  )
}
