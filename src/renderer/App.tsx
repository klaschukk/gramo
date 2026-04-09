import React, { useEffect, useState } from 'react'
import type { UserSettings } from '@shared/types'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'

type AppView = 'loading' | 'onboarding' | 'dashboard'

export default function App() {
  const [view, setView] = useState<AppView>('loading')
  const [settings, setSettings] = useState<UserSettings | null>(null)

  useEffect(() => {
    window.api.getSettings().then((s) => {
      setSettings(s)
      if (s.currentLevel && s.activeBookId) {
        setView('dashboard')
      } else {
        setView('onboarding')
      }
    })
  }, [])

  if (view === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    )
  }

  if (view === 'onboarding') {
    return (
      <Onboarding
        onComplete={() => {
          window.api.getSettings().then((s) => {
            setSettings(s)
            setView('dashboard')
          })
        }}
      />
    )
  }

  return <Dashboard settings={settings!} />
}
