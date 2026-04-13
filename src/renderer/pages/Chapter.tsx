import { useEffect, useState } from 'react'
import type { Chapter as ChapterType, Exercise, WritingPrompt } from '@shared/types'
import ExercisePage from './Exercise'
import SpeakButton from '../components/SpeakButton'

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

type View = 'content' | 'exercises' | 'writing'

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

  if (view === 'writing') {
    return (
      <WritingSection
        chapterId={chapterId}
        unitNumber={chapter.unitNumber}
        unitTitle={chapter.title}
        onBack={() => setView('content')}
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
            title="Back"
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
            <>
              {/* Rule */}
              <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
                <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Rule</h2>
                <p className="text-[15px] leading-7 text-[--color-text]">{lesson.rule}</p>
              </div>

              {/* Formula */}
              <div className="bg-[--color-primary-soft] border border-[--color-primary]/30 rounded-xl p-5">
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
                          ? 'border-[--color-error]/40 bg-[--color-error-bg]'
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
                      <p className={`text-sm leading-6 flex-1 ${
                        ex.correct === false
                          ? 'text-[--color-error] line-through'
                          : 'text-[--color-text]'
                      }`}>
                        {ex.sentence}
                      </p>
                      {ex.correct !== false && <SpeakButton text={ex.sentence} />}
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

      {/* Footer with action buttons */}
      <footer className="px-6 py-4 border-t border-[--color-border] bg-[--color-card]">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            type="button"
            onClick={() => setView('exercises')}
            disabled={exercises.length === 0}
            className="flex-1 bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                       hover:bg-[--color-primary-light] transition-colors disabled:opacity-40 cursor-pointer"
          >
            {exercises.length > 0
              ? `Practice (${exercises.length} exercises)`
              : 'No exercises yet'}
          </button>
          <button
            type="button"
            onClick={() => setView('writing')}
            className="bg-[--color-muted] border border-[--color-border] text-[--color-text] py-3 px-5 rounded-lg font-heading font-semibold
                       hover:border-[--color-border-hover] transition-colors cursor-pointer flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Write
          </button>
        </div>
      </footer>
    </div>
  )
}

// ===== Writing Section =====
function WritingSection({ chapterId, unitNumber, unitTitle, onBack }: { chapterId: number; unitNumber: number; unitTitle: string; onBack: () => void }) {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [prompt, setPrompt] = useState<WritingPrompt | null>(null)

  useEffect(() => {
    Promise.all([
      window.api.getEssay(chapterId),
      window.api.getWritingPrompt(unitNumber),
    ]).then(([essay, p]) => {
      if (essay) setText(essay)
      setPrompt(p)
      setLoading(false)
    })
  }, [chapterId, unitNumber])

  async function handleSave() {
    await window.api.saveEssay(chapterId, text)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      <header className="px-6 py-4 border-b border-[--color-border] bg-[--color-card]">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            title="Back to lesson"
            onClick={onBack}
            className="text-sm text-[--color-text-muted] hover:text-[--color-text] mb-3 flex items-center gap-1 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to lesson
          </button>
          <h1 className="text-xl font-heading font-bold text-[--color-text]">Writing Practice</h1>
          <p className="text-sm text-[--color-text-muted] mt-1">
            <span className="text-[--color-primary] font-medium">Unit {unitNumber}: {unitTitle}</span>
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Task prompt */}
          {prompt && (
            <div className="bg-[--color-primary-soft] border border-[--color-primary]/20 rounded-xl p-5">
              <p className="text-xs text-[--color-primary] font-heading font-semibold uppercase tracking-wider mb-2">Your task</p>
              <p className="text-[15px] leading-6 text-[--color-text] mb-4">{prompt.prompt}</p>
              <div className="pt-3 border-t border-[--color-primary]/20">
                <p className="text-[10px] text-[--color-primary] font-heading font-semibold uppercase tracking-wider mb-2">Must include</p>
                <ul className="space-y-1.5">
                  {prompt.checklist.map((item, i) => (
                    <li key={i} className="text-xs text-[--color-text-muted] flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-[--color-primary] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-[--color-text-faint] mt-3">Aim for at least {prompt.minWords} words</p>
              </div>
            </div>
          )}

          {/* Text area */}
          {!loading && (
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setSaved(false) }}
              placeholder="Write your text here in English..."
              rows={12}
              className="w-full bg-[--color-card] border border-[--color-border] rounded-xl px-5 py-4 text-[15px] leading-7
                         text-[--color-text] placeholder:text-[--color-text-faint] resize-none
                         focus:outline-none focus:border-[--color-primary]"
            />
          )}
        </div>
      </main>

      <footer className="px-6 py-4 border-t border-[--color-border] bg-[--color-card]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className={`text-xs ${prompt && wordCount >= prompt.minWords ? 'text-[--color-success] font-semibold' : 'text-[--color-text-faint]'}`}>
            {wordCount} words{prompt && ` / ${prompt.minWords} min`}
            {prompt && wordCount >= prompt.minWords && ' ✓'}
          </span>
          <button
            type="button"
            onClick={handleSave}
            disabled={!text.trim()}
            className="bg-[--color-primary] text-white py-2.5 px-6 rounded-lg font-heading text-sm font-semibold
                       hover:bg-[--color-primary-light] transition-colors disabled:opacity-40 cursor-pointer"
          >
            {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </footer>
    </div>
  )
}
