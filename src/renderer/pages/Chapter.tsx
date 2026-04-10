import { useEffect, useState } from 'react'
import type { Chapter as ChapterType, Exercise } from '@shared/types'
import ExercisePage from './Exercise'

interface Props {
  chapterId: number
  onBack: () => void
}

type View = 'content' | 'exercises'

// Parse structured lesson from rawText
// Format: sections separated by \n\n, first line = section header if starts with ##
interface LessonSection {
  heading: string | null
  content: string
  examples: string[]
}

function parseLessonSections(rawText: string): LessonSection[] {
  const blocks = rawText.split(/\n\n+/).filter(Boolean)
  const sections: LessonSection[] = []

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean)
    if (lines.length === 0) continue

    // Detect examples (lines starting with • or - or containing → or "not")
    const heading = lines[0].startsWith('##') ? lines[0].replace(/^#+\s*/, '') : null
    const contentLines: string[] = []
    const examples: string[] = []

    const startIdx = heading ? 1 : 0
    for (let i = startIdx; i < lines.length; i++) {
      const line = lines[i]
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('✓') || line.startsWith('✗')) {
        examples.push(line)
      } else {
        contentLines.push(line)
      }
    }

    sections.push({
      heading,
      content: contentLines.join(' '),
      examples,
    })
  }

  // If no structure detected, just split into readable paragraphs
  if (sections.length <= 1 && rawText.length > 100) {
    const text = rawText.replace(/\n/g, ' ').replace(/\s+/g, ' ')
    // Split on sentence boundaries roughly every 200 chars
    const chunks: string[] = []
    let current = ''
    for (const word of text.split(' ')) {
      current += (current ? ' ' : '') + word
      if (current.length > 150 && /[.!?)]$/.test(word)) {
        chunks.push(current)
        current = ''
      }
    }
    if (current) chunks.push(current)

    return chunks.map(c => ({ heading: null, content: c, examples: [] }))
  }

  return sections
}

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

  const sections = parseLessonSections(chapter.rawText)

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
            <span className="text-xs font-medium text-[--color-text-faint]">Unit {chapter.unitNumber}</span>
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
          {sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-heading font-semibold text-lg text-[--color-primary] mb-3">
                  {section.heading}
                </h2>
              )}

              {section.content && (
                <p className="text-[15px] leading-7 text-[--color-text]">
                  {section.content}
                </p>
              )}

              {section.examples.length > 0 && (
                <div className="mt-3 bg-[--color-card] border border-[--color-border] rounded-lg p-4 space-y-2">
                  {section.examples.map((ex, j) => (
                    <p key={j} className="text-sm text-[--color-text] leading-6 pl-4 border-l-2 border-[--color-primary]">
                      {ex.replace(/^[•\-✓✗]\s*/, '')}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
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
