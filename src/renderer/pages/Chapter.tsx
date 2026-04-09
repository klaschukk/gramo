import React, { useEffect, useState } from 'react'
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
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
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
    <div className="flex h-screen flex-col bg-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-100">
        <button
          onClick={onBack}
          className="text-sm text-gray-400 hover:text-gray-600 mb-2 flex items-center gap-1"
        >
          ← Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-400">Unit {chapter.unitNumber}</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            {chapter.cefrLevel}
          </span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mt-1">{chapter.title}</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-2xl mx-auto">
          {/* Grammar explanation (raw text from PDF) */}
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
              {chapter.rawText}
            </pre>
          </div>

          {/* Notes (if any) */}
          {chapter.notes && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-sm font-semibold text-yellow-800 mb-2">Notes</h3>
              <p className="text-sm text-yellow-700">{chapter.notes}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setView('exercises')}
            disabled={exercises.length === 0}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
                       hover:bg-blue-700 transition-colors disabled:opacity-40"
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
