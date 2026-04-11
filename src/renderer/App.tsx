import { useEffect, useState, createContext, useContext, useRef, useCallback } from 'react'
import type { UserSettings } from '@shared/types'
import Dashboard from './pages/Dashboard'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

// Study timer context — tracks time spent in the app
const TimerContext = createContext<{
  sessionSeconds: number
}>({ sessionSeconds: 0 })

export function useTimer() {
  return useContext(TimerContext)
}

export default function App() {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [theme, setTheme] = useState<Theme>('light')
  const [sessionSeconds, setSessionSeconds] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    window.api.getSettings().then((s) => {
      setSettings(s)
      setTheme(s.theme || 'light')
    }).catch(() => {
      setSettings({
        claudeApiKey: null, currentLevel: 'A2', activeBookId: 1,
        theme: 'light', dailyGoalMinutes: 30,
      })
    })
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Study timer — tick every second, save every 60 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSessionSeconds((prev) => {
        const next = prev + 1
        if (next % 60 === 0) {
          window.api.logStudyTime(60, 0)
        }
        return next
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    window.api.saveSettings({ theme: next })
  }, [theme])

  if (!settings) {
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
      <TimerContext.Provider value={{ sessionSeconds }}>
        <Dashboard settings={settings} />
      </TimerContext.Provider>
    </ThemeContext.Provider>
  )
}
