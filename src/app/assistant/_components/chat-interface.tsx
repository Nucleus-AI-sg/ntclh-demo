'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Send, Plus, Sparkles } from 'lucide-react'
import type { ChatScript, ChatMessage, ChatContext, ChatAction } from '@/types'
import { MessageBubble } from './message-bubble'
import { ContextPanel } from './context-panel'

function TypingIndicator() {
  return (
    <div className="flex justify-start gap-3">
      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
        <Sparkles className="h-3.5 w-3.5 text-blue-600" />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 150, 300].map((d) => (
            <span key={d} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
          ))}
        </div>
        <span className="text-xs text-slate-400">Nucleus AI is thinking...</span>
      </div>
    </div>
  )
}

interface ChatInterfaceProps {
  scripts: ChatScript[]
  fallback: string
}

export function ChatInterface({ scripts, fallback }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [activeScript, setActiveScript] = useState<ChatScript | null>(null)
  const [followUpIndex, setFollowUpIndex] = useState(0)
  const [panelCollapsed, setPanelCollapsed] = useState(false)
  const [activeContext, setActiveContext] = useState<ChatContext | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = useCallback(
    (text: string) => {
      setMessages((prev) => [...prev, { role: 'user', content: text }])
      setInput('')
      setTyping(true)

      const script = scripts.find(
        (s) => s.prompt.toLowerCase() === text.toLowerCase()
      )
      let response: string
      let context: ChatContext | undefined
      let actions: ChatAction[] | undefined

      if (script) {
        setActiveScript(script)
        setFollowUpIndex(0)
        response = script.response
        context = script.context
        actions = script.actions
      } else if (activeScript && followUpIndex < activeScript.followUps.length) {
        const followUp = activeScript.followUps[followUpIndex]
        if (text.toLowerCase() === followUp.prompt.toLowerCase()) {
          response = followUp.response
          context = followUp.context
          actions = followUp.actions
          setFollowUpIndex((i) => i + 1)
        } else {
          response = fallback
        }
      } else {
        response = fallback
      }

      setTimeout(() => {
        setTyping(false)
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: response, context, actions },
        ])
        if (context) setActiveContext(context)
      }, 1500)
    },
    [scripts, fallback, activeScript, followUpIndex]
  )

  const handleNew = () => {
    setMessages([])
    setActiveScript(null)
    setFollowUpIndex(0)
    setActiveContext(null)
  }

  const suggestedPrompts = scripts.map((s) => s.prompt)
  const showSuggestions = messages.length === 0
  const followUpPrompts =
    activeScript && followUpIndex < activeScript.followUps.length
      ? [activeScript.followUps[followUpIndex].prompt]
      : []

  return (
    <div className="flex h-[calc(100vh-8rem)] -mx-8 -mt-2">
      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Nucleus AI Assistant</h2>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Online</span>
          </div>
          <button onClick={handleNew} className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600">
            <Plus className="h-3.5 w-3.5" /> New Conversation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50">
          {showSuggestions && (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">How can I help you today?</h3>
              <p className="text-xs text-slate-500 mb-6">Ask me about trainees, programmes, placements, or any operational query.</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                {suggestedPrompts.map((prompt) => (
                  <button key={prompt} onClick={() => sendMessage(prompt)} className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors text-left">
                    {prompt.length > 60 ? prompt.slice(0, 60) + '...' : prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble key={`${msg.role}-${i}`} role={msg.role} content={msg.content} actions={msg.actions} />
          ))}

          {typing && <TypingIndicator />}

          {followUpPrompts.length > 0 && !typing && messages.length > 0 && (
            <div className="flex flex-wrap gap-2 pl-10">
              {followUpPrompts.map((p) => (
                <button key={p} onClick={() => sendMessage(p)} className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-medium text-blue-600 hover:bg-blue-50">
                  {p}
                </button>
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="px-4 py-3 border-t border-slate-200 bg-white">
          <form onSubmit={(e) => { e.preventDefault(); if (input.trim() && !typing) sendMessage(input.trim()) }} className="flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about your programmes, trainees, or placements..." disabled={typing} className="flex-1 px-4 py-2.5 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
            <button type="submit" disabled={!input.trim() || typing} className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-30">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <ContextPanel context={activeContext} collapsed={panelCollapsed} onToggle={() => setPanelCollapsed((v) => !v)} />
    </div>
  )
}
