import { useState, useEffect } from 'react'
import type { UserSettings } from '@shared/types'

interface Props {
  onBack: () => void
}

export default function Settings({ onBack }: Props) {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    window.api.getSettings().then((s) => {
      setSettings(s)
      setApiKey(s.claudeApiKey ?? '')
    })
  }, [])

  async function handleSave() {
    await window.api.saveSettings({ claudeApiKey: apiKey || null })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!settings) return null

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card] flex items-center gap-3">
        <button type="button" onClick={onBack} className="text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="font-heading font-semibold text-[--color-text]">Settings</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Claude API Key */}
          <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
            <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">Claude API Key</h2>
            <p className="text-xs text-[--color-text-muted] mb-3">
              Add your Anthropic API key to enable AI chat and exercise generation.
              Get one at console.anthropic.com
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="w-full bg-[--color-bg] border border-[--color-border] rounded-lg px-4 py-2.5 text-sm
                         text-[--color-text] placeholder:text-[--color-text-faint]
                         focus:outline-none focus:border-[--color-primary]"
            />
            <button
              type="button"
              onClick={handleSave}
              className="mt-3 w-full bg-[--color-primary] text-white py-2.5 rounded-lg font-heading text-sm font-semibold
                         hover:bg-[--color-primary-light] transition-colors cursor-pointer"
            >
              {saved ? 'Saved!' : 'Save'}
            </button>
          </div>

          {/* App info */}
          <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-5">
            <h2 className="text-xs font-heading font-semibold text-[--color-primary] uppercase tracking-wider mb-3">About</h2>
            <div className="space-y-2 text-sm text-[--color-text-muted]">
              <p>Gramo v0.1.0</p>
              <p>Based on English Grammar in Use by Raymond Murphy (5th edition)</p>
              <p>All data stored locally on your computer</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
