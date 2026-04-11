import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  onBack: () => void
}

export default function Chat({ onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [noKey, setNoKey] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.api.getSettings().then((s) => {
      if (!s.claudeApiKey) setNoKey(true)
    })
    window.api.getChatHistory().then((history) => {
      setMessages(history.map((h) => ({ role: h.role as 'user' | 'assistant', content: h.content })))
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const history = newMessages.slice(-20).map((m) => ({ role: m.role, content: m.content }))
      const response = await window.api.sendChatMessage(userMsg, history.slice(0, -1))
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Failed to get response'
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${errMsg}` }])
    } finally {
      setLoading(false)
    }
  }

  async function handleClear() {
    await window.api.clearChatHistory()
    setMessages([])
  }

  return (
    <div className="flex h-screen flex-col bg-[--color-bg]">
      {/* Header */}
      <header className="px-6 py-3 border-b border-[--color-border] bg-[--color-card] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} className="text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="font-heading font-semibold text-[--color-text]">English Chat</h1>
            <p className="text-xs text-[--color-text-faint]">Practice conversation with AI</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button type="button" onClick={handleClear} className="text-xs text-[--color-text-faint] hover:text-[--color-error] cursor-pointer">
            Clear
          </button>
        )}
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {noKey && (
            <div className="bg-[--color-error-bg] border border-[--color-error] border-opacity-20 rounded-lg p-4 text-center">
              <p className="text-sm text-[--color-error]">Add your Claude API key in Settings to use the chat.</p>
              <p className="text-xs text-[--color-text-faint] mt-1">Settings → Claude API Key</p>
            </div>
          )}

          {messages.length === 0 && !noKey && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[--color-primary] bg-opacity-10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[--color-primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <h2 className="font-heading font-semibold text-[--color-text] mb-2">Start a Conversation</h2>
              <p className="text-sm text-[--color-text-muted] max-w-xs mx-auto">
                Practice your English! The AI will correct your mistakes and help you improve.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                {['Hi, how are you?', 'Tell me about yourself', 'What\'s the weather like?', 'Can you help me practice?'].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => { setInput(q); }}
                    className="text-xs px-3 py-1.5 rounded-full border border-[--color-border] text-[--color-text-muted]
                               hover:bg-[--color-muted] cursor-pointer transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-6 ${
                msg.role === 'user'
                  ? 'bg-[--color-primary] text-white rounded-br-md'
                  : 'bg-[--color-card] border border-[--color-border] text-[--color-text] rounded-bl-md'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-[--color-card] border border-[--color-border] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[--color-text-faint] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[--color-text-faint] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[--color-text-faint] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="px-6 py-4 border-t border-[--color-border] bg-[--color-card]">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
            placeholder="Type in English..."
            disabled={noKey || loading}
            className="flex-1 bg-[--color-bg] border border-[--color-border] rounded-xl px-4 py-3 text-sm
                       text-[--color-text] placeholder:text-[--color-text-faint]
                       focus:outline-none focus:border-[--color-primary] disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || loading || noKey}
            className="bg-[--color-primary] text-white px-4 py-3 rounded-xl cursor-pointer
                       hover:bg-[--color-primary-light] transition-colors disabled:opacity-40"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  )
}
