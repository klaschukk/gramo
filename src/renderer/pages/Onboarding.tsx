import React, { useState } from 'react'
import PlacementTest from './PlacementTest'

type Step = 'welcome' | 'placement' | 'import'

interface Props {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState<Step>('welcome')

  if (step === 'placement') {
    return (
      <PlacementTest
        onComplete={() => setStep('import')}
      />
    )
  }

  if (step === 'import') {
    return <ImportBook onComplete={onComplete} />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Gramo</h1>
      <p className="text-gray-500 text-lg mb-12">Learn English. Step by step.</p>

      <div className="max-w-md text-center space-y-4">
        <p className="text-gray-700">
          We'll start with a short placement test to find your current level,
          then import your grammar textbook to build your personal curriculum.
        </p>

        <button
          onClick={() => setStep('placement')}
          className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
                     hover:bg-blue-700 transition-colors"
        >
          Take Placement Test
        </button>
      </div>
    </div>
  )
}

function ImportBook({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ chaptersCount: number } | null>(null)

  async function handleImport() {
    setLoading(true)
    setError(null)
    try {
      const filePath = await window.api.selectPdfFile()
      if (!filePath) {
        setLoading(false)
        return
      }
      const res = await window.api.importPdf(filePath)
      setResult({ chaptersCount: res.chaptersCount })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-white px-8">
        <div className="max-w-md text-center space-y-4">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900">
            {result.chaptersCount} units imported!
          </h2>
          <p className="text-gray-500">Your curriculum is ready.</p>
          <button
            onClick={onComplete}
            className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
                       hover:bg-blue-700 transition-colors"
          >
            Start Learning
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white px-8">
      <div className="max-w-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Import your textbook</h2>
        <p className="text-gray-500">
          Select your PDF copy of English Grammar in Use (Murphy, 5th edition).
        </p>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-3 rounded">{error}</p>
        )}

        <button
          onClick={handleImport}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
                     hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Importing...' : 'Select PDF'}
        </button>
      </div>
    </div>
  )
}
