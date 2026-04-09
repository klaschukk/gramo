import { useEffect, useState } from 'react'
import type { CurriculumEntry, UserSettings } from '@shared/types'
import { useTheme } from '../App'
import Chapter from './Chapter'

interface Props {
  settings: UserSettings
}

export default function Dashboard({ settings }: Props) {
  const [curriculum, setCurriculum] = useState<CurriculumEntry[]>([])
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (!settings.activeBookId) return
    window.api.getCurriculum(settings.activeBookId).then((c) => {
      setCurriculum(c)
      setLoading(false)
    })
  }, [settings.activeBookId])

  if (activeChapterId !== null) {
    return (
      <Chapter
        chapterId={activeChapterId}
        onBack={() => setActiveChapterId(null)}
      />
    )
  }

  const completed = curriculum.filter((c) => c.completed).length
  const total = curriculum.length

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[--color-border] flex items-center justify-between bg-[--color-card]">
        <div>
          <h1 className="text-xl font-heading font-bold text-[--color-primary]">Gramo</h1>
          <p className="text-sm text-[--color-text-muted]">Level: {settings.currentLevel}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[--color-text-muted]">
            {completed}/{total} units
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg border border-[--color-border] bg-[--color-muted]
                       flex items-center justify-center cursor-pointer
                       hover:border-[--color-border-hover] transition-colors"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
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
          <p className="text-[--color-text-muted] text-sm text-center mt-8">Loading curriculum...</p>
        ) : (
          <div className="space-y-2 max-w-2xl mx-auto">
            {curriculum.map((entry) => (
              <button
                type="button"
                key={entry.chapterId}
                disabled={!entry.unlocked}
                onClick={() => setActiveChapterId(entry.chapterId)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors cursor-pointer
                  ${entry.completed
                    ? 'border-[--color-accent] bg-[--color-success-bg]'
                    : entry.unlocked
                    ? 'border-[--color-border] bg-[--color-card] hover:border-[--color-border-hover] hover:bg-[--color-muted]'
                    : 'border-[--color-border] bg-[--color-muted] opacity-50 cursor-not-allowed'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-[--color-text-faint] mr-2">
                      Unit {entry.unitNumber}
                    </span>
                    <span className="text-sm font-medium text-[--color-text]">{entry.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[--color-level-text] bg-[--color-level-bg] px-2 py-0.5 rounded">
                      {entry.cefrLevel}
                    </span>
                    {entry.completed && (
                      <svg className="w-4 h-4 text-[--color-success]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {!entry.unlocked && (
                      <svg className="w-4 h-4 text-[--color-text-faint]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                </div>
                {entry.score !== null && (
                  <p className="text-xs text-[--color-text-muted] mt-1">Score: {entry.score}%</p>
                )}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
