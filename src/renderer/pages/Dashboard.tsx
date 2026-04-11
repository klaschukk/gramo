import { useEffect, useState } from 'react'
import type { CurriculumEntry, UserSettings, StudyStats } from '@shared/types'
import { useTheme, useTimer } from '../App'
import Chapter from './Chapter'
import PlacementTest from './PlacementTest'
import Chat from './Chat'
import Stats from './Stats'
import Settings from './Settings'

interface Props {
  settings: UserSettings
}

type Tab = 'units' | 'chat' | 'stats' | 'settings' | 'test'
type View = 'tabs' | 'chapter' | 'test'

export default function Dashboard({ settings }: Props) {
  const [curriculum, setCurriculum] = useState<CurriculumEntry[]>([])
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null)
  const [view, setView] = useState<View>('tabs')
  const [tab, setTab] = useState<Tab>('units')
  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState(settings.currentLevel)
  const [stats, setStats] = useState<StudyStats | null>(null)
  const { theme, toggleTheme } = useTheme()
  const { sessionSeconds } = useTimer()

  useEffect(() => {
    if (!settings.activeBookId) return
    window.api.getCurriculum(settings.activeBookId).then((c) => {
      setCurriculum(c)
      setLoading(false)
    })
    window.api.getStudyStats().then(setStats)
  }, [settings.activeBookId])

  if (view === 'test') {
    return <PlacementTest onComplete={(lv) => { setLevel(lv); setView('tabs') }} />
  }

  if (view === 'chapter' && activeChapterId !== null) {
    return <Chapter chapterId={activeChapterId} onBack={() => { setActiveChapterId(null); setView('tabs') }} />
  }

  // Tab content
  if (tab === 'chat') return <Chat onBack={() => setTab('units')} />
  if (tab === 'stats') return <Stats onBack={() => setTab('units')} />
  if (tab === 'settings') return <Settings onBack={() => setTab('units')} />

  const completed = curriculum.filter((c) => c.completed).length
  const total = curriculum.length
  const sessionMin = Math.floor(sessionSeconds / 60)

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      {/* Header */}
      <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-heading font-bold text-[--color-primary]">Gramo</h1>
            <p className="text-xs text-[--color-text-faint]">English Grammar in Use</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Streak */}
            {stats && stats.streak > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-orange-500 bg-orange-500 bg-opacity-10 px-2 py-1 rounded-lg">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-4.5-3-7.5-4.5-9-1 2-2 3-3.5 3C10 9.5 9 7 8 4.5 6.5 7 4.5 10.5 4.5 15.5A7.5 7.5 0 0 0 12 23z"/></svg>
                {stats.streak}
              </span>
            )}
            {/* Timer */}
            {sessionMin > 0 && (
              <span className="text-xs text-[--color-text-faint]">{sessionMin}m</span>
            )}
            {/* Level */}
            {level && (
              <span className="text-[10px] font-medium bg-[--color-level-bg] text-[--color-level-text] px-1.5 py-0.5 rounded">
                {level}
              </span>
            )}
            {/* Progress */}
            <span className="text-xs text-[--color-text-faint]">{completed}/{total}</span>
            {/* Theme */}
            <button type="button" onClick={toggleTheme}
              className="w-7 h-7 rounded-lg border border-[--color-border] bg-[--color-muted]
                         flex items-center justify-center cursor-pointer hover:border-[--color-border-hover] transition-colors"
            >
              {theme === 'light' ? (
                <svg className="w-3.5 h-3.5 text-[--color-text-muted]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-[--color-text-muted]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      {total > 0 && (
        <div className="h-0.5 bg-[--color-progress-bg]">
          <div className="h-full bg-[--color-accent] transition-all" style={{ width: `${Math.round((completed / total) * 100)}%` }} />
        </div>
      )}

      {/* Unit list */}
      <main className="flex-1 overflow-y-auto px-6 py-3">
        {loading ? (
          <p className="text-[--color-text-muted] text-sm text-center mt-8">Loading...</p>
        ) : (
          <div className="space-y-1 max-w-2xl mx-auto">
            {curriculum.map((entry) => (
              <button
                type="button"
                key={entry.chapterId}
                onClick={() => { setActiveChapterId(entry.chapterId); setView('chapter') }}
                className={`w-full text-left px-4 py-2.5 rounded-lg border transition-colors cursor-pointer
                  ${entry.completed
                    ? 'border-[--color-accent] border-opacity-40 bg-[--color-success-bg]'
                    : 'border-[--color-border] bg-[--color-card] hover:border-[--color-border-hover] hover:bg-[--color-muted]'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[11px] font-mono text-[--color-text-faint] shrink-0 w-7">{entry.unitNumber}</span>
                    <span className="text-[13px] font-medium text-[--color-text] truncate">{entry.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[9px] text-[--color-level-text] bg-[--color-level-bg] px-1.5 py-0.5 rounded">{entry.cefrLevel}</span>
                    {entry.completed && (
                      <svg className="w-3.5 h-3.5 text-[--color-success]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Bottom navigation */}
      <nav className="border-t border-[--color-border] bg-[--color-card] px-6 py-2">
        <div className="max-w-2xl mx-auto flex justify-around">
          {[
            { id: 'units' as Tab, label: 'Units', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            { id: 'chat' as Tab, label: 'Chat', icon: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z' },
            { id: 'stats' as Tab, label: 'Progress', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
            { id: 'test' as Tab, label: 'Test', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { id: 'settings' as Tab, label: 'Settings', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => item.id === 'test' ? setView('test') : setTab(item.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg cursor-pointer transition-colors
                ${tab === item.id ? 'text-[--color-primary]' : 'text-[--color-text-faint] hover:text-[--color-text-muted]'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
