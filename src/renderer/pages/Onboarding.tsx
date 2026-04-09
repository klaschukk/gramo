import { useState } from 'react'
import PlacementTest from './PlacementTest'

type Step = 'welcome' | 'placement' | 'import'

interface Props {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState<Step>('welcome')

  if (step === 'placement') {
    return <PlacementTest onComplete={() => setStep('import')} />
  }

  if (step === 'import') {
    return <ImportBook onComplete={onComplete} />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[--color-bg] px-8">
      <h1 className="font-heading text-4xl font-bold text-[--color-primary] mb-2">Gramo</h1>
      <p className="text-[--color-text-muted] text-lg mb-12">Learn English. Step by step.</p>

      <div className="max-w-md text-center space-y-4">
        <p className="text-[--color-text]">
          We'll start with a short placement test to find your current level,
          then import your grammar textbook to build your personal curriculum.
        </p>

        <button
          onClick={() => setStep('placement')}
          className="mt-8 w-full bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                     hover:bg-[--color-primary-light] transition-colors cursor-pointer"
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
      <div className="flex h-screen flex-col items-center justify-center bg-[--color-bg] px-8">
        <div className="max-w-md text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[--color-success-bg] flex items-center justify-center">
            <svg className="w-8 h-8 text-[--color-success]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-heading font-bold text-[--color-text]">
            {result.chaptersCount} units imported!
          </h2>
          <p className="text-[--color-text-muted]">Your curriculum is ready.</p>
          <button
            onClick={onComplete}
            className="mt-6 w-full bg-[--color-accent] text-white py-3 px-6 rounded-lg font-heading font-semibold
                       hover:bg-[--color-accent-light] transition-colors cursor-pointer"
          >
            Start Learning
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[--color-bg] px-8">
      <div className="max-w-md text-center space-y-4">
        <h2 className="text-2xl font-heading font-bold text-[--color-text]">Import your textbook</h2>
        <p className="text-[--color-text-muted]">
          Select your PDF copy of English Grammar in Use (Murphy, 5th edition).
        </p>

        {error && (
          <p className="text-[--color-error] text-sm bg-[--color-error-bg] p-3 rounded-lg">{error}</p>
        )}

        <button
          onClick={handleImport}
          disabled={loading}
          className="mt-6 w-full bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                     hover:bg-[--color-primary-light] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Importing...' : 'Select PDF'}
        </button>
      </div>
    </div>
  )
}
