import { useEffect, useState, useCallback } from 'react'
import type { VocabCard, VocabStats } from '@shared/types'
import SpeakButton from '../components/SpeakButton'
import { useTTS } from '../hooks/useTTS'

interface Props {
  onBack: () => void
}

type Quality = 0 | 2 | 4 | 5

const QUALITY_BUTTONS: { q: Quality; label: string; hint: string; color: string; key: string }[] = [
  { q: 0, label: 'Again', hint: '< 1 min', color: 'bg-red-500 hover:bg-red-600', key: '1' },
  { q: 2, label: 'Hard', hint: '1 day', color: 'bg-orange-500 hover:bg-orange-600', key: '2' },
  { q: 4, label: 'Good', hint: '3-7 days', color: 'bg-green-600 hover:bg-green-700', key: '3' },
  { q: 5, label: 'Easy', hint: '1 week+', color: 'bg-blue-600 hover:bg-blue-700', key: '4' },
]

export default function Vocabulary({ onBack }: Props) {
  const [cards, setCards] = useState<VocabCard[]>([])
  const [stats, setStats] = useState<VocabStats | null>(null)
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sessionReviewed, setSessionReviewed] = useState(0)
  const { speak } = useTTS()

  const loadCards = useCallback(() => {
    setLoading(true)
    Promise.all([
      window.api.getVocabDue(20),
      window.api.getVocabStats(),
    ]).then(([c, s]) => {
      setCards(c)
      setStats(s)
      setCurrent(0)
      setFlipped(false)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    loadCards()
  }, [loadCards])

  const card = cards[current]

  // Auto-play word when a new card appears
  useEffect(() => {
    if (card && !flipped) {
      const t = setTimeout(() => speak(card.word), 200)
      return () => clearTimeout(t)
    }
  }, [card, flipped, speak])

  const handleReview = useCallback(async (quality: Quality) => {
    if (!card) return
    await window.api.reviewVocab(card.id, quality)
    setSessionReviewed((n) => n + 1)

    if (current + 1 < cards.length) {
      setCurrent(current + 1)
      setFlipped(false)
    } else {
      // Session done — reload
      loadCards()
    }
  }, [card, current, cards.length, loadCards])

  // Keyboard shortcuts: Space = flip, 1-4 = review quality
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { onBack(); return }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (!flipped) setFlipped(true)
        return
      }
      if (flipped) {
        const btn = QUALITY_BUTTONS.find((b) => b.key === e.key)
        if (btn) handleReview(btn.q)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [flipped, handleReview, onBack])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[--color-bg]">
        <p className="text-[--color-text-muted] text-sm">Loading...</p>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="flex h-screen flex-col bg-[--color-bg]">
        <Header stats={stats} onBack={onBack} />
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-md text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[--color-success-bg] flex items-center justify-center">
              <svg className="w-8 h-8 text-[--color-success]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-heading font-bold text-[--color-text]">All done for today!</h2>
            <p className="text-[--color-text-muted]">
              {sessionReviewed > 0
                ? `You reviewed ${sessionReviewed} words. Come back tomorrow for more.`
                : 'No cards due right now. Great job!'}
            </p>
            <button
              type="button"
              onClick={onBack}
              className="mt-4 bg-[--color-primary] text-white py-2.5 px-6 rounded-lg font-heading text-sm font-semibold
                         hover:bg-[--color-primary-light] transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isNew = card.progress === null

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      <Header stats={stats} onBack={onBack} sessionReviewed={sessionReviewed} total={cards.length} current={current + 1} />

      {/* Card */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-lg w-full">
          <button
            type="button"
            onClick={() => !flipped && setFlipped(true)}
            disabled={flipped}
            className={`w-full bg-[--color-card] border-2 rounded-2xl p-8 text-center min-h-[320px]
                        flex flex-col items-center justify-center gap-4 transition-all
                        ${flipped
                          ? 'border-[--color-primary] cursor-default'
                          : 'border-[--color-border] hover:border-[--color-primary] cursor-pointer'}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold bg-[--color-level-bg] text-[--color-level-text] px-2 py-0.5 rounded">
                {card.cefrLevel}
              </span>
              <span className="text-[10px] text-[--color-text-faint]">{card.topic}</span>
              {isNew && (
                <span className="text-[10px] font-semibold bg-[--color-primary] text-white px-2 py-0.5 rounded">NEW</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-heading font-bold text-[--color-text]">{card.word}</h2>
              <SpeakButton text={card.word} size="md" />
            </div>

            {flipped ? (
              <div className="space-y-4 pt-2 animate-fade-in">
                <p className="text-xl text-[--color-primary] font-medium">{card.translation}</p>
                <div className="pt-4 border-t border-[--color-border] flex items-start gap-2 max-w-md">
                  <p className="text-sm italic text-[--color-text-muted] leading-relaxed flex-1">
                    {card.example}
                  </p>
                  <SpeakButton text={card.example} />
                </div>
              </div>
            ) : (
              <p className="text-xs text-[--color-text-faint] mt-4">
                Click to reveal translation <span className="ml-1 px-1.5 py-0.5 border border-[--color-border] rounded text-[10px] font-mono">Space</span>
              </p>
            )}
          </button>
        </div>
      </main>

      {/* Review buttons */}
      <footer className="px-6 py-4 border-t border-[--color-border] bg-[--color-card]">
        <div className="max-w-2xl mx-auto">
          {flipped ? (
            <div className="grid grid-cols-4 gap-2">
              {QUALITY_BUTTONS.map((btn) => (
                <button
                  key={btn.q}
                  type="button"
                  onClick={() => handleReview(btn.q)}
                  className={`${btn.color} text-white py-3 px-2 rounded-lg font-heading font-semibold text-sm
                             transition-colors cursor-pointer flex flex-col items-center gap-0.5`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono opacity-70">{btn.key}</span>
                    {btn.label}
                  </span>
                  <span className="text-[9px] opacity-80 font-normal">{btn.hint}</span>
                </button>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="w-full bg-[--color-primary] text-white py-3 px-6 rounded-lg font-heading font-semibold
                         hover:bg-[--color-primary-light] transition-colors cursor-pointer"
            >
              Show Answer
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}

function Header({ stats, onBack, sessionReviewed = 0, total, current }: { stats: VocabStats | null; onBack: () => void; sessionReviewed?: number; total?: number; current?: number }) {
  return (
    <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card]">
      <div className="max-w-2xl mx-auto flex items-center gap-4">
        <button type="button" title="Back" onClick={onBack} className="text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="font-heading font-semibold text-[--color-text]">Vocabulary</h1>
          <p className="text-xs text-[--color-text-faint]">
            {total && current ? `Card ${current} / ${total}` : stats ? `${stats.learned} / ${stats.total} learned` : ''}
            {sessionReviewed > 0 && <span> · {sessionReviewed} done this session</span>}
          </p>
        </div>
        {stats && (
          <div className="flex items-center gap-3 text-xs text-[--color-text-muted]">
            <span>
              <span className="text-[--color-primary] font-semibold">{stats.due}</span> due
            </span>
          </div>
        )}
      </div>
    </header>
  )
}
