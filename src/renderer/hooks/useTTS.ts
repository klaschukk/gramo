// Text-to-speech hook using Web Speech API (free, offline on macOS)
export function useTTS() {
  function speak(text: string, rate = 0.9) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'
    u.rate = rate
    u.pitch = 1
    // Prefer a high-quality en voice if available
    const voices = window.speechSynthesis.getVoices()
    const pref = voices.find((v) => v.lang.startsWith('en') && /Samantha|Daniel|Karen|Alex/i.test(v.name))
      || voices.find((v) => v.lang === 'en-US')
      || voices.find((v) => v.lang.startsWith('en'))
    if (pref) u.voice = pref
    window.speechSynthesis.speak(u)
  }

  function stop() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  return { speak, stop }
}
