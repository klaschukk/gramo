import { useEffect, useState } from 'react'
import type { CurriculumEntry, UserSettings } from '@shared/types'
import { useTheme } from '../App'
import Chapter from './Chapter'
import PlacementTest from './PlacementTest'

interface Props {
  settings: UserSettings
}

type View = 'list' | 'chapter' | 'test'

export default function Dashboard({ settings }: Props) {
  const [curriculum, setCurriculum] = useState<CurriculumEntry[]>([])
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null)
  const [view, setView] = useState<View>('list')
  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState(settings.currentLevel)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (!settings.activeBookId) return
    window.api.getCurriculum(settings.activeBookId).then((c) => {
      setCurriculum(c)
      setLoading(false)
    })
  }, [settings.activeBookId])

  if (view === 'test') {
    return (
      <PlacementTest
        onComplete={(newLevel) => {
          setLevel(newLevel)
          setView('list')
        }}
      />
    )
  }

  if (view === 'chapter' && activeChapterId !== null) {
    return (
      <Chapter
        chapterId={activeChapterId}
        onBack={() => { setActiveChapterId(null); setView('list') }}
      />
    )
  }

  const completed = curriculum.filter((c) => c.completed).length
  const total = curriculum.length

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[--color-border] bg-[--color-card]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-bold text-[--color-primary]">Gramo</h1>
            <p className="text-sm text-[--color-text-muted]">English Grammar in Use</p>
          </div>
          <div className="flex items-center gap-3">
            {level && (
              <span className="text-xs font-medium bg-[--color-level-bg] text-[--color-level-text] px-2 py-1 rounded">
                {level}
              </span>
            )}
            <span className="text-xs text-[--color-text-muted]">
              {completed}/{total}
            </span>
            {/* Level test button */}
            <button
              type="button"
              onClick={() => setView('test')}
              className="w-8 h-8 rounded-lg border border-[--color-border] bg-[--color-muted]
                         flex items-center justify-center cursor-pointer
                         hover:border-[--color-border-hover] transition-colors"
              title="Take level test"
            >
              <svg className="w-4 h-4 text-[--color-text-muted]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg border border-[--color-border] bg-[--color-muted]
                         flex items-center justify-center cursor-pointer
                         hover:border-[--color-border-hover] transition-colors"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4 text-[--color-text-muted]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[--color-text-muted]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      {total > 0 && (
        <div className="h-1 bg-[--color-progress-bg]">
          <div
            className="h-full bg-[--color-accent] transition-all"
            style={{ width: `${Math.round((completed / total) * 100)}%` }}
          />
        </div>
      )}

      {/* Curriculum list */}
      <main className="flex-1 overflow-y-auto px-6 py-4">
        {loading ? (
          <p className="text-[--color-text-muted] text-sm text-center mt-8">Loading...</p>
        ) : (
          <div className="space-y-1.5 max-w-2xl mx-auto">
            {curriculum.map((entry) => (
              <button
                type="button"
                key={entry.chapterId}
                onClick={() => { setActiveChapterId(entry.chapterId); setView('chapter') }}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors cursor-pointer
                  ${entry.completed
                    ? 'border-[--color-accent] bg-[--color-success-bg]'
                    : 'border-[--color-border] bg-[--color-card] hover:border-[--color-border-hover] hover:bg-[--color-muted]'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono text-[--color-text-faint] shrink-0 w-8">
                      {entry.unitNumber}
                    </span>
                    <span className="text-sm font-medium text-[--color-text] truncate">{entry.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] text-[--color-level-text] bg-[--color-level-bg] px-1.5 py-0.5 rounded">
                      {entry.cefrLevel}
                    </span>
                    {entry.completed && (
                      <svg className="w-4 h-4 text-[--color-success]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                {entry.score !== null && (
                  <p className="text-xs text-[--color-text-muted] mt-1 ml-11">Score: {entry.score}%</p>
                )}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
