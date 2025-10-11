
import React, { useEffect, useRef, useState, type JSX } from 'react'
import { answerQuestion } from '../assistant/engine'

type ChatMessage = {
  id: number
  text: string
  ok: boolean
}

export default function AskSupport(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const nextId = useRef(1)

  useEffect(() => {
    if (open) {
      
      setTimeout(() => inputRef.current?.focus(), 0)
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pushMessage = (text: string, ok = true) => {
    setMessages((m) => [...m, { id: nextId.current++, text, ok }])
  }

  const handleSend = async () => {
    const q = input.trim()
    if (!q) {
      pushMessage('Please type a question before sending.', false)
      return
    }

    
    pushMessage(`You: ${q}`, true)
    setInput('')
    setLoading(true)
    try {
      const res = await answerQuestion(q)
      if (res.ok) {
        pushMessage(res.answer, true)
      } else {
        pushMessage(`Sorry — ${res.reason}`, false)
      }
    } catch (err) {
      console.error('AskSupport engine error', err)
      pushMessage('An unexpected error occurred. Please try again.', false)
    } finally {
      setLoading(false)
      
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  return (
    <>
     
      <button
        aria-expanded={open}
        aria-controls="ask-support-panel"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-indigo-600 text-white p-3 shadow-lg focus:outline-none focus:ring"
        title="Ask Support"
      >
        Support
      </button>

      
      <div
        id="ask-support-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Ask support panel"
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-md transform bg-white shadow-xl transition-transform duration-200 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-medium">Ask Support</h2>
          <div>
            <button
              onClick={() => setOpen(false)}
              className="px-2 py-1 rounded hover:bg-gray-100"
              aria-label="Close panel"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col h-full">
          <div className="flex gap-2 mb-3">
            <input
              ref={inputRef}
              id="ask-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Ask a question (e.g. 'What is your returns policy?' or 'What's status of ORDERABC1234')"
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
              aria-label="Ask support"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              aria-label="Send question"
            >
              {loading ? 'Thinking...' : 'Send'}
            </button>
          </div>

          <div className="overflow-auto mb-3" style={{ maxHeight: '60vh' }}>
            {messages.length === 0 ? (
              <div className="text-sm text-gray-500">Answers come only from our ground-truth Q&A and order status. Ask a question to begin.</div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`mb-3 p-3 rounded ${m.ok ? 'bg-gray-50' : 'bg-red-50'}`}>
                  <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                </div>
              ))
            )}
          </div>

          <div className="mt-auto text-xs text-gray-400">
            <div>Note: I will only answer from the provided Q&A and order status. I will not search the web.</div>
          </div>
        </div>
      </div>
    </>
  )
}
