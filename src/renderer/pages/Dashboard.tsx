import { useEffect, useState } from 'react'
import type { CurriculumEntry, UserSettings, StudyStats, VocabStats } from '@shared/types'
import { useTheme, useTimer } from '../App'
import Chapter from './Chapter'
import PlacementTest from './PlacementTest'
import Stats from './Stats'
import Settings from './Settings'
import Vocabulary from './Vocabulary'
import MistakesReview from './MistakesReview'

interface Props {
  settings: UserSettings
}

type Tab = 'home' | 'units' | 'vocab' | 'stats' | 'settings' | 'test'
type View = 'tabs' | 'chapter' | 'test' | 'mistakes'

// CEFR level groups for the units tab
const LEVEL_GROUPS: { level: string; label: string; range: string }[] = [
  { level: 'A2', label: 'Elementary', range: 'Units 1-20' },
  { level: 'B1', label: 'Intermediate', range: 'Units 21-90' },
  { level: 'B2', label: 'Upper-Intermediate', range: 'Units 91-145' },
]

export default function Dashboard({ settings }: Props) {
  const [curriculum, setCurriculum] = useState<CurriculumEntry[]>([])
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null)
  const [view, setView] = useState<View>('tabs')
  const [tab, setTab] = useState<Tab>('home')
  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState(settings.currentLevel)
  const [stats, setStats] = useState<StudyStats | null>(null)
  const [vocabStats, setVocabStats] = useState<VocabStats | null>(null)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [search, setSearch] = useState('')
  const { theme, toggleTheme } = useTheme()
  const { sessionSeconds } = useTimer()

  useEffect(() => {
    if (!settings.activeBookId) return
    window.api.getCurriculum(settings.activeBookId).then((c) => {
      setCurriculum(c)
      setLoading(false)
    })
    window.api.getStudyStats().then(setStats)
    window.api.getVocabStats().then(setVocabStats)
    window.api.getMistakesCount().then(setMistakesCount)
  }, [settings.activeBookId])

  // Refresh stats when coming back to home
  useEffect(() => {
    if (tab === 'home') {
      window.api.getStudyStats().then(setStats)
      window.api.getVocabStats().then(setVocabStats)
      window.api.getMistakesCount().then(setMistakesCount)
      // Re-fetch settings to pick up any focus-units changes
      window.api.getSettings().then((s) => {
        if (s.activeBookId) {
          window.api.getCurriculum(s.activeBookId).then(setCurriculum)
        }
      })
    }
  }, [tab])

  if (view === 'test') {
    return <PlacementTest onComplete={(lv) => { setLevel(lv); setView('tabs'); setTab('home') }} />
  }

  if (view === 'chapter' && activeChapterId !== null) {
    return <Chapter chapterId={activeChapterId} onBack={() => { setActiveChapterId(null); setView('tabs') }} />
  }

  if (view === 'mistakes') {
    return <MistakesReview onBack={() => { setView('tabs'); window.api.getMistakesCount().then(setMistakesCount) }} />
  }

  if (tab === 'stats') return <Stats onBack={() => setTab('home')} />
  if (tab === 'settings') return <Settings onBack={() => setTab('home')} />
  if (tab === 'vocab') return <Vocabulary onBack={() => setTab('home')} />

  const completed = curriculum.filter((c) => c.completed).length
  const total = curriculum.length
  const sessionMin = Math.floor(sessionSeconds / 60)
  const goalMin = settings.dailyGoalMinutes || 30
  const todayMin = (stats?.todayMinutes ?? 0) + sessionMin
  const goalProgress = Math.min(100, Math.round((todayMin / goalMin) * 100))

  // Focus topics from settings
  const focusSet = new Set(settings.focusUnits ?? [])
  const focusTopics = curriculum.filter((c) => focusSet.has(c.unitNumber))
  // Today's plan: next 3 incomplete units (excluding focus ones to avoid duplication)
  const nextUnits = curriculum.filter((c) => !c.completed && !focusSet.has(c.unitNumber)).slice(0, 3)
  // Recently completed
  const recentDone = curriculum.filter((c) => c.completed).slice(-3).reverse()

  // Filtered units for search
  const filtered = search.trim()
    ? curriculum.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        String(c.unitNumber).includes(search)
      )
    : curriculum

  function openUnit(chapterId: number) {
    setActiveChapterId(chapterId)
    setView('chapter')
  }

  function openMistakesReview() {
    setView('mistakes')
  }

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
            {stats && stats.streak > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-[--color-focus] bg-[--color-focus-bg] px-2 py-1 rounded-lg">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-4.5-3-7.5-4.5-9-1 2-2 3-3.5 3C10 9.5 9 7 8 4.5 6.5 7 4.5 10.5 4.5 15.5A7.5 7.5 0 0 0 12 23z"/></svg>
                {stats.streak}
              </span>
            )}
            {sessionMin > 0 && (
              <span className="text-xs text-[--color-text-faint]">{sessionMin}m</span>
            )}
            {level && (
              <span className="text-[10px] font-medium bg-[--color-level-bg] text-[--color-level-text] px-1.5 py-0.5 rounded">
                {level}
              </span>
            )}
            <button type="button" onClick={toggleTheme} title="Toggle theme"
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

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-6 py-4">
        {loading ? (
          <p className="text-[--color-text-muted] text-sm text-center mt-8">Loading...</p>
        ) : tab === 'home' ? (
          /* ===== HOME: Today's Plan ===== */
          <div className="max-w-2xl mx-auto space-y-5">
            {/* Daily progress ring */}
            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-border)" strokeWidth="6" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-primary)" strokeWidth="6"
                      strokeLinecap="round" strokeDasharray={`${goalProgress * 2.136} 213.6`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-heading font-bold text-[--color-text]">{todayMin}<span className="text-[10px] text-[--color-text-faint]">m</span></span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-heading font-semibold text-[--color-text]">Today's Progress</h2>
                  <p className="text-sm text-[--color-text-muted] mt-0.5">
                    {todayMin >= goalMin
                      ? 'Daily goal reached!'
                      : `${goalMin - todayMin} min left to reach your ${goalMin}min goal`}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-[--color-text-faint]">{completed}/{total} units done</span>
                    <span className="text-xs text-[--color-text-faint]">{Math.round((completed / Math.max(total, 1)) * 100)}% complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Focus Topics (weak areas from assessment) */}
            {focusTopics.length > 0 && (
              <div>
                <h3 className="text-xs font-heading font-semibold text-[--color-focus] uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-4.5-3-7.5-4.5-9-1 2-2 3-3.5 3C10 9.5 9 7 8 4.5 6.5 7 4.5 10.5 4.5 15.5A7.5 7.5 0 0 0 12 23z"/></svg>
                  Focus Topics — your weak spots
                </h3>
                <div className="space-y-2">
                  {focusTopics.map((entry) => (
                    <button
                      type="button"
                      key={entry.chapterId}
                      onClick={() => openUnit(entry.chapterId)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all cursor-pointer
                        ${entry.completed
                          ? 'border-[--color-success]/50 bg-[--color-success-bg]'
                          : 'border-[--color-focus-border] bg-[--color-focus-bg] hover:border-[--color-focus]'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[--color-focus] text-white flex items-center justify-center text-sm font-heading font-bold shrink-0">
                          {entry.unitNumber}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[--color-text] truncate">{entry.title}</p>
                          <p className="text-[11px] text-[--color-text-faint]">
                            {entry.cefrLevel}
                            {entry.score !== null && entry.score >= 70 && <span className="text-[--color-success] ml-2">· mastered {entry.score}%</span>}
                          </p>
                        </div>
                        {!entry.completed && (
                          <span className="text-[10px] font-semibold bg-[--color-focus] text-white px-2 py-1 rounded-md shrink-0">
                            Priority
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mistakes to review */}
            {mistakesCount > 0 && (
              <button
                type="button"
                onClick={() => openMistakesReview()}
                className="w-full bg-[--color-error-bg] border-2 border-[--color-error]/30 rounded-xl p-4 text-left
                           hover:border-[--color-error] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[--color-error-bg] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[--color-error]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-heading font-semibold text-[--color-text]">
                      Review {mistakesCount} mistakes
                    </p>
                    <p className="text-[11px] text-[--color-text-faint] mt-0.5">
                      Exercises you answered incorrectly — drill them to clear the list
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-[--color-error] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            )}

            {/* Next up — study plan */}
            {nextUnits.length > 0 && (
              <div>
                <h3 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3 px-1">
                  Continue Learning
                </h3>
                <div className="space-y-2">
                  {nextUnits.map((entry, i) => (
                    <button
                      type="button"
                      key={entry.chapterId}
                      onClick={() => openUnit(entry.chapterId)}
                      className="w-full text-left px-4 py-3.5 rounded-xl border border-[--color-border] bg-[--color-card]
                                 hover:border-[--color-primary] hover:bg-[--color-muted] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-heading font-bold shrink-0
                          ${i === 0 ? 'bg-[--color-primary] text-white' : 'bg-[--color-muted] text-[--color-text-muted] border border-[--color-border]'}`}>
                          {entry.unitNumber}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[--color-text] truncate group-hover:text-[--color-primary] transition-colors">
                            {entry.title}
                          </p>
                          <p className="text-[11px] text-[--color-text-faint]">{entry.cefrLevel}</p>
                        </div>
                        {i === 0 && (
                          <span className="text-[10px] font-medium bg-[--color-primary-soft] text-[--color-primary] px-2 py-1 rounded-md shrink-0">
                            Next
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Vocabulary quick access */}
            {vocabStats && (
              <button
                type="button"
                onClick={() => setTab('vocab')}
                className="w-full bg-[--color-card] border border-[--color-border] rounded-xl p-4 text-left
                           hover:border-[--color-primary] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[--color-primary-soft] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[--color-primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-heading font-semibold text-[--color-text]">Vocabulary</p>
                      {vocabStats.due > 0 && (
                        <span className="text-[10px] font-semibold bg-[--color-primary] text-white px-1.5 py-0.5 rounded">
                          {vocabStats.due} due
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[--color-text-faint] mt-0.5">
                      {vocabStats.learned} / {vocabStats.total} words learned · {vocabStats.reviewedToday} reviewed today
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-[--color-text-faint] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            )}

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setView('test')}
                className="bg-[--color-card] border border-[--color-border] rounded-xl p-4 text-left
                           hover:border-[--color-primary] transition-colors cursor-pointer group"
              >
                <svg className="w-6 h-6 text-[--color-primary] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-heading font-semibold text-[--color-text]">Level Test</p>
                <p className="text-[11px] text-[--color-text-faint] mt-0.5">Full ability assessment</p>
              </button>
              <button
                type="button"
                onClick={() => setTab('units')}
                className="bg-[--color-card] border border-[--color-border] rounded-xl p-4 text-left
                           hover:border-[--color-primary] transition-colors cursor-pointer group"
              >
                <svg className="w-6 h-6 text-[--color-accent] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-sm font-heading font-semibold text-[--color-text]">All Units</p>
                <p className="text-[11px] text-[--color-text-faint] mt-0.5">Browse 145 grammar topics</p>
              </button>
            </div>

            {/* Recently completed */}
            {recentDone.length > 0 && (
              <div>
                <h3 className="text-xs font-heading font-semibold text-[--color-success] uppercase tracking-wider mb-3 px-1">
                  Recently Completed
                </h3>
                <div className="space-y-1.5">
                  {recentDone.map((entry) => (
                    <button
                      type="button"
                      key={entry.chapterId}
                      onClick={() => openUnit(entry.chapterId)}
                      className="w-full text-left px-4 py-2.5 rounded-lg border border-[--color-accent]/40 bg-[--color-success-bg]
                                 hover:border-[--color-accent] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-[11px] font-mono text-[--color-text-faint] shrink-0 w-7">{entry.unitNumber}</span>
                          <span className="text-[13px] font-medium text-[--color-text] truncate">{entry.title}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {entry.score !== null && (
                            <span className="text-[11px] text-[--color-success] font-medium">{entry.score}%</span>
                          )}
                          <svg className="w-3.5 h-3.5 text-[--color-success]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ===== UNITS: Full list with search ===== */
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Search bar */}
            <div className="relative">
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[--color-text-faint]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search units..."
                className="w-full bg-[--color-card] border border-[--color-border] rounded-xl pl-10 pr-4 py-2.5 text-sm
                           text-[--color-text] placeholder:text-[--color-text-faint]
                           focus:outline-none focus:border-[--color-primary]"
              />
            </div>

            {search.trim() ? (
              /* Search results */
              <div className="space-y-1">
                {filtered.length === 0 && (
                  <p className="text-sm text-[--color-text-faint] text-center py-8">No units found</p>
                )}
                {filtered.map((entry) => (
                  <UnitRow key={entry.chapterId} entry={entry} onClick={() => openUnit(entry.chapterId)} />
                ))}
              </div>
            ) : (
              /* Grouped by level */
              LEVEL_GROUPS.map((group) => {
                const groupUnits = curriculum.filter((c) => c.cefrLevel === group.level)
                if (groupUnits.length === 0) return null
                const groupDone = groupUnits.filter((c) => c.completed).length
                return (
                  <div key={group.level}>
                    <div className="flex items-center justify-between px-1 mb-2">
                      <div>
                        <h3 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider">
                          {group.level} — {group.label}
                        </h3>
                        <p className="text-[10px] text-[--color-text-faint]">{group.range}</p>
                      </div>
                      <span className="text-[11px] text-[--color-text-faint]">{groupDone}/{groupUnits.length}</span>
                    </div>
                    <div className="space-y-1">
                      {groupUnits.map((entry) => (
                        <UnitRow key={entry.chapterId} entry={entry} onClick={() => openUnit(entry.chapterId)} />
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </main>

      {/* Bottom navigation */}
      <nav className="border-t border-[--color-border] bg-[--color-card] px-6 py-2">
        <div className="max-w-2xl mx-auto flex justify-around">
          {[
            { id: 'home' as Tab, label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { id: 'units' as Tab, label: 'Units', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            { id: 'vocab' as Tab, label: 'Vocab', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
            { id: 'stats' as Tab, label: 'Progress', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
            { id: 'settings' as Tab, label: 'Settings', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              title={item.label}
              onClick={() => setTab(item.id)}
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

function UnitRow({ entry, onClick }: { entry: CurriculumEntry; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 rounded-lg border transition-colors cursor-pointer
        ${entry.completed
          ? 'border-[--color-accent]/50 bg-[--color-success-bg]'
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
  )
}
