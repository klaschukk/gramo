import { useEffect, useState } from 'react'
import type { StudyStats } from '@shared/types'

interface Props {
  onBack: () => void
}

export default function Stats({ onBack }: Props) {
  const [stats, setStats] = useState<StudyStats | null>(null)

  useEffect(() => {
    window.api.getStudyStats().then(setStats)
  }, [])

  if (!stats) {
    return (
      <div className="flex h-screen items-center justify-center bg-[--color-bg]">
        <p className="text-[--color-text-muted] text-sm">Loading...</p>
      </div>
    )
  }

  // Generate last 35 days for calendar grid (5 weeks)
  const calendarDays: { date: string; minutes: number; exercises: number }[] = []
  const today = new Date()
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    const data = stats.calendar[dateStr]
    calendarDays.push({
      date: dateStr,
      minutes: data?.minutes ?? 0,
      exercises: data?.exercises ?? 0,
    })
  }

  function getHeatColor(minutes: number): string {
    if (minutes === 0) return 'bg-[--color-muted] border border-[--color-border]'
    if (minutes < 10) return 'bg-[--color-primary]/20'
    if (minutes < 20) return 'bg-[--color-primary]/40'
    if (minutes < 40) return 'bg-[--color-primary]/70'
    return 'bg-[--color-primary]'
  }

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card] flex items-center gap-3">
        <button type="button" title="Back" onClick={onBack} className="text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="font-heading font-semibold text-[--color-text]">Study Progress</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-4 text-center">
              <p className="text-3xl font-heading font-bold text-[--color-primary]">{stats.streak}</p>
              <p className="text-xs text-[--color-text-muted] mt-1">Day Streak</p>
            </div>
            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-4 text-center">
              <p className="text-3xl font-heading font-bold text-[--color-accent]">{stats.todayMinutes}</p>
              <p className="text-xs text-[--color-text-muted] mt-1">Minutes Today</p>
            </div>
            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-4 text-center">
              <p className="text-3xl font-heading font-bold text-[--color-text]">{stats.totalMinutes}</p>
              <p className="text-xs text-[--color-text-muted] mt-1">Total Minutes</p>
            </div>
          </div>

          {/* Calendar heatmap */}
          <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
            <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-4">Last 5 Weeks</h2>
            <div className="grid grid-cols-7 gap-1.5">
              {weekDays.map((d) => (
                <div key={d} className="text-[10px] text-[--color-text-faint] text-center pb-1">{d}</div>
              ))}
              {/* Pad to start on correct day */}
              {(() => {
                const firstDay = new Date(calendarDays[0].date)
                const dayOfWeek = (firstDay.getDay() + 6) % 7 // Monday = 0
                const padding = []
                for (let i = 0; i < dayOfWeek; i++) {
                  padding.push(<div key={`pad-${i}`} />)
                }
                return padding
              })()}
              {calendarDays.map((day) => (
                <div
                  key={day.date}
                  className={`aspect-square rounded-md ${getHeatColor(day.minutes)} cursor-default`}
                  title={`${day.date}: ${day.minutes}min, ${day.exercises} exercises`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 justify-end">
              <span className="text-[10px] text-[--color-text-faint]">Less</span>
              <div className="w-3 h-3 rounded-sm bg-[--color-muted] border border-[--color-border]" />
              <div className="w-3 h-3 rounded-sm bg-[--color-primary]/20" />
              <div className="w-3 h-3 rounded-sm bg-[--color-primary]/40" />
              <div className="w-3 h-3 rounded-sm bg-[--color-primary]/70" />
              <div className="w-3 h-3 rounded-sm bg-[--color-primary]" />
              <span className="text-[10px] text-[--color-text-faint]">More</span>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
            <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Recent Activity</h2>
            <div className="space-y-2">
              {calendarDays.filter(d => d.minutes > 0).reverse().slice(0, 10).map((day) => (
                <div key={day.date} className="flex justify-between items-center text-sm">
                  <span className="text-[--color-text]">{formatDate(day.date)}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[--color-text-muted]">{day.exercises} exercises</span>
                    <span className="text-[--color-primary] font-medium">{day.minutes} min</span>
                  </div>
                </div>
              ))}
              {calendarDays.every(d => d.minutes === 0) && (
                <p className="text-sm text-[--color-text-faint] text-center py-4">No study sessions yet. Start learning!</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (dateStr === today.toISOString().slice(0, 10)) return 'Today'
  if (dateStr === yesterday.toISOString().slice(0, 10)) return 'Yesterday'

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
