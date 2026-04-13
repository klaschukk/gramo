// SM-2 spaced repetition algorithm (simplified Anki-style)
// Quality: 0 = Again (forgot), 2 = Hard, 4 = Good, 5 = Easy

export interface SRState {
  ease: number
  interval: number // days
  repetitions: number
}

export function sm2(quality: 0 | 2 | 4 | 5, prev: SRState): SRState {
  let { ease, interval, repetitions } = prev

  if (quality >= 3) {
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.max(1, Math.round(interval * ease))
    repetitions++
  } else {
    repetitions = 0
    interval = 1
  }

  ease = Math.max(1.3, ease + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

  return { ease, interval, repetitions }
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export function today(): string {
  return new Date().toISOString().slice(0, 10)
}
