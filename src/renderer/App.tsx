import { useEffect, useState, createContext, useContext } from 'react'
import type { UserSettings } from '@shared/types'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'

type AppView = 'loading' | 'onboarding' | 'dashboard'
type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

export default function App() {
  const [view, setView] = useState<AppView>('loading')
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    window.api.getSettings().then((s) => {
      setSettings(s)
      setTheme(s.theme || 'light')
      if (s.currentLevel && s.activeBookId) {
        setView('dashboard')
      } else {
        setView('onboarding')
      }
    })
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    window.api.saveSettings({ theme: next })
  }

  if (view === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-[--color-bg]">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-[--color-primary]">Gramo</h1>
          <p className="mt-2 text-sm text-[--color-text-muted]">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {view === 'onboarding' ? (
        <Onboarding
          onComplete={() => {
            window.api.getSettings().then((s) => {
              setSettings(s)
              setView('dashboard')
            })
          }}
        />
      ) : (
        <Dashboard settings={settings!} />
      )}
    </ThemeContext.Provider>
  )
}
