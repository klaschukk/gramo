import { useState, useEffect } from 'react'
import type { UserSettings } from '@shared/types'

interface Props {
  onBack: () => void
}

const GOAL_OPTIONS = [10, 15, 20, 30, 45, 60]

export default function Settings({ onBack }: Props) {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [goal, setGoal] = useState(30)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    window.api.getSettings().then((s) => {
      setSettings(s)
      setGoal(s.dailyGoalMinutes)
    })
  }, [])

  async function handleSaveGoal(minutes: number) {
    setGoal(minutes)
    await window.api.saveSettings({ dailyGoalMinutes: minutes })
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  if (!settings) return null

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card] flex items-center gap-3">
        <button type="button" onClick={onBack} title="Back" className="text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="font-heading font-semibold text-[--color-text]">Settings</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Daily goal */}
          <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
            <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Daily Goal</h2>
            <p className="text-xs text-[--color-text-muted] mb-4">
              Set how many minutes you want to study each day.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {GOAL_OPTIONS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleSaveGoal(m)}
                  className={`py-2.5 rounded-lg text-sm font-heading font-semibold transition-colors cursor-pointer
                    ${goal === m
                      ? 'bg-[--color-primary] text-white'
                      : 'bg-[--color-muted] border border-[--color-border] text-[--color-text] hover:border-[--color-border-hover]'
                    }`}
                >
                  {m} min
                </button>
              ))}
            </div>
            {saved && (
              <p className="text-xs text-[--color-success] text-center mt-3">Saved!</p>
            )}
          </div>

          {/* Current level */}
          {settings.currentLevel && (
            <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
              <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Your Level</h2>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-heading font-bold text-[--color-primary]">{settings.currentLevel}</span>
                <p className="text-xs text-[--color-text-muted]">Take the placement test to update</p>
              </div>
            </div>
          )}

          {/* App info */}
          <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
            <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">About</h2>
            <div className="space-y-2 text-sm text-[--color-text-muted]">
              <p>Gramo v1.0.0</p>
              <p>Based on English Grammar in Use by Raymond Murphy (5th edition)</p>
              <p>145 units with structured lessons and exercises</p>
              <p>All data stored locally on your computer</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
