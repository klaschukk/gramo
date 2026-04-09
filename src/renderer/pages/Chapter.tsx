import { useEffect, useState } from 'react'
import type { Chapter as ChapterType, Exercise } from '@shared/types'
import ExercisePage from './Exercise'

interface Props {
  chapterId: number
  onBack: () => void
}

type View = 'content' | 'exercises'

export default function Chapter({ chapterId, onBack }: Props) {
  const [chapter, setChapter] = useState<ChapterType | null>(null)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [view, setView] = useState<View>('content')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      window.api.getChapter(chapterId),
      window.api.getExercises(chapterId),
    ]).then(([ch, ex]) => {
      setChapter(ch)
      setExercises(ex)
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

  // Split raw text into paragraphs for nicer rendering
  const paragraphs = chapter.rawText
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[--color-border] bg-[--color-card]">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-[--color-text-muted] hover:text-[--color-text] mb-2 flex items-center gap-1 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[--color-text-faint]">Unit {chapter.unitNumber}</span>
          <span className="text-xs bg-[--color-level-bg] text-[--color-level-text] px-2 py-0.5 rounded">
            {chapter.cefrLevel}
          </span>
        </div>
        <h1 className="text-xl font-heading font-bold text-[--color-text] mt-1">{chapter.title}</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-[15px] leading-7 text-[--color-text] font-body"
            >
              {para}
            </p>
          ))}

          {chapter.notes && (
            <div className="mt-8 p-4 bg-[--color-success-bg] border border-[--color-accent] rounded-lg">
              <h3 className="text-sm font-heading font-semibold text-[--color-accent] mb-2">Notes</h3>
              <p className="text-sm text-[--color-text]">{chapter.notes}</p>
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
