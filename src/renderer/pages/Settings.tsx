import { useState, useEffect } from 'react'
import type { UserSettings } from '@shared/types'

interface Props {
  onBack: () => void
}

const GOAL_OPTIONS = [10, 15, 20, 30, 45, 60]

// Default focus units for B1 learners (most common weak spots from assessments)
const DEFAULT_B1_FOCUS = [7, 8, 14, 38, 39, 40, 42, 43, 44, 69, 70, 112]

export default function Settings({ onBack }: Props) {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [goal, setGoal] = useState(30)
  const [focusInput, setFocusInput] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState<string | null>(null)

  useEffect(() => {
    window.api.getSettings().then((s) => {
      setSettings(s)
      setGoal(s.dailyGoalMinutes)
      setFocusInput((s.focusUnits ?? []).join(', '))
      setNotes(s.assessmentNotes ?? '')
    })
  }, [])

  async function handleSaveGoal(minutes: number) {
    setGoal(minutes)
    await window.api.saveSettings({ dailyGoalMinutes: minutes })
    flash('goal')
  }

  async function handleSaveFocus() {
    const units = parseFocusInput(focusInput)
    await window.api.saveSettings({ focusUnits: units })
    setFocusInput(units.join(', '))
    flash('focus')
  }

  async function handleSaveNotes() {
    await window.api.saveSettings({ assessmentNotes: notes })
    flash('notes')
  }

  async function handleUseDefaults() {
    setFocusInput(DEFAULT_B1_FOCUS.join(', '))
    await window.api.saveSettings({ focusUnits: DEFAULT_B1_FOCUS })
    flash('focus')
  }

  async function handleClearFocus() {
    setFocusInput('')
    await window.api.saveSettings({ focusUnits: [] })
    flash('focus')
  }

  function flash(key: string) {
    setSaved(key)
    setTimeout(() => setSaved(null), 1500)
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
          {/* Focus Topics — personalization */}
          <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
            <h2 className="text-xs font-heading font-semibold text-orange-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-4.5-3-7.5-4.5-9-1 2-2 3-3.5 3C10 9.5 9 7 8 4.5 6.5 7 4.5 10.5 4.5 15.5A7.5 7.5 0 0 0 12 23z"/></svg>
              Focus Topics
            </h2>
            <p className="text-xs text-[--color-text-muted] mb-3">
              Your weak Murphy units — they'll appear first on Home.
              Enter unit numbers separated by commas (1-145).
            </p>
            <input
              type="text"
              value={focusInput}
              onChange={(e) => setFocusInput(e.target.value)}
              placeholder="e.g. 7, 8, 38, 39, 40"
              className="w-full bg-[--color-bg] border border-[--color-border] rounded-lg px-4 py-2.5 text-sm font-mono
                         text-[--color-text] placeholder:text-[--color-text-faint]
                         focus:outline-none focus:border-orange-500"
            />
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                type="button"
                onClick={handleSaveFocus}
                className="bg-orange-500 text-white py-2 rounded-lg font-heading text-xs font-semibold
                           hover:bg-orange-600 transition-colors cursor-pointer"
              >
                {saved === 'focus' ? 'Saved!' : 'Save Focus'}
              </button>
              <button
                type="button"
                onClick={handleUseDefaults}
                className="bg-[--color-muted] border border-[--color-border] text-[--color-text] py-2 rounded-lg font-heading text-xs
                           hover:border-orange-500 transition-colors cursor-pointer"
              >
                Use B1 defaults
              </button>
            </div>
            <button
              type="button"
              onClick={handleClearFocus}
              className="mt-2 w-full text-xs text-[--color-text-faint] hover:text-[--color-error] py-1 cursor-pointer"
            >
              Clear all
            </button>
            <div className="mt-4 pt-3 border-t border-[--color-border]">
              <p className="text-[10px] text-[--color-text-faint] leading-relaxed">
                <span className="font-semibold text-[--color-text-muted]">Common B1 weaknesses:</span> Unit 7-8 (Present Perfect vs Past Simple),
                38-40 (Conditionals), 42-44 (Passive voice), 69-70 (Articles), 112 (Despite/Although).
                Take the external CEFR assessment to find yours.
              </p>
            </div>
          </div>

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
            {saved === 'goal' && (
              <p className="text-xs text-[--color-success] text-center mt-3">Saved!</p>
            )}
          </div>

          {/* Assessment notes */}
          <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
            <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Assessment Notes</h2>
            <p className="text-xs text-[--color-text-muted] mb-3">
              Paste notes from your external CEFR assessment (strengths, weaknesses, study plan).
              Only for your reference — stays on your device.
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your assessment results here..."
              rows={6}
              className="w-full bg-[--color-bg] border border-[--color-border] rounded-lg px-4 py-2.5 text-xs
                         text-[--color-text] placeholder:text-[--color-text-faint] resize-none font-mono
                         focus:outline-none focus:border-[--color-primary]"
            />
            <button
              type="button"
              onClick={handleSaveNotes}
              className="mt-3 w-full bg-[--color-primary] text-white py-2 rounded-lg font-heading text-xs font-semibold
                         hover:bg-[--color-primary-light] transition-colors cursor-pointer"
            >
              {saved === 'notes' ? 'Saved!' : 'Save Notes'}
            </button>
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
              <p>Gramo v1.2.0</p>
              <p>Based on English Grammar in Use by Raymond Murphy (5th edition)</p>
              <p>145 units · 1000+ exercises · 430+ vocabulary words</p>
              <p>All data stored locally on your computer</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function parseFocusInput(input: string): number[] {
  return input
    .split(/[\s,;]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n) && n >= 1 && n <= 145)
    .filter((n, i, arr) => arr.indexOf(n) === i) // dedupe
    .sort((a, b) => a - b)
}
