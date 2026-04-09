import React, { useEffect, useState } from 'react'
import type { CurriculumEntry, UserSettings } from '@shared/types'
import Chapter from './Chapter'

interface Props {
  settings: UserSettings
}

export default function Dashboard({ settings }: Props) {
  const [curriculum, setCurriculum] = useState<CurriculumEntry[]>([])
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

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
    <div className="flex h-screen flex-col bg-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Gramo</h1>
          <p className="text-sm text-gray-400">Level: {settings.currentLevel}</p>
        </div>
        <div className="text-sm text-gray-500">
          {completed}/{total} units
        </div>
      </header>

      {/* Progress bar */}
      {total > 0 && (
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${Math.round((completed / total) * 100)}%` }}
          />
        </div>
      )}

      {/* Curriculum list */}
      <main className="flex-1 overflow-y-auto px-6 py-4">
        {loading ? (
          <p className="text-gray-400 text-sm text-center mt-8">Loading curriculum...</p>
        ) : (
          <div className="space-y-2 max-w-2xl mx-auto">
            {curriculum.map((entry) => (
              <button
                key={entry.chapterId}
                disabled={!entry.unlocked}
                onClick={() => setActiveChapterId(entry.chapterId)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors
                  ${entry.completed
                    ? 'border-green-200 bg-green-50 hover:bg-green-100'
                    : entry.unlocked
                    ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-gray-400 mr-2">
                      Unit {entry.unitNumber}
                    </span>
                    <span className="text-sm font-medium text-gray-800">{entry.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {entry.cefrLevel}
                    </span>
                    {entry.completed && (
                      <span className="text-green-500 text-sm">✓</span>
                    )}
                    {!entry.unlocked && (
                      <span className="text-gray-300 text-sm">🔒</span>
                    )}
                  </div>
                </div>
                {entry.score !== null && (
                  <p className="text-xs text-gray-400 mt-1">Score: {entry.score}%</p>
                )}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
