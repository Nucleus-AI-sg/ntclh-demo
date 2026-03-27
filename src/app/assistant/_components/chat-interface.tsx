'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Send, Plus, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChatScript, ChatMessage } from '@/types'

interface ChatInterfaceProps {
  scripts: ChatScript[]
  fallback: string
}

// Safe: content is from static mock data fixtures only, never from user input
function formatMarkdown(text: string): string {
  return text
    .replace(/### (.*)/g, '<h4 class="font-bold text-slate-900 mt-3 mb-1">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n---\n\n/g, '<hr class="my-3 border-slate-200" />')
    .replace(/^> (.*)/gm, '<blockquote class="text-xs border-blue-200 bg-blue-50 px-3 py-2 rounded">$1</blockquote>')
    .replace(/^- (.*)/gm, '<li>$1</li>')
    .replace(/\n\n/g, '<br/><br/>')
}

export function ChatInterface({ scripts, fallback }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [activeScript, setActiveScript] = useState<ChatScript | null>(null)
  const [followUpIndex, setFollowUpIndex] = useState(0)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const sendMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    setTyping(true)

    const script = scripts.find((s) => s.prompt.toLowerCase() === text.toLowerCase())
    let response: string

    if (script) {
      setActiveScript(script)
      setFollowUpIndex(0)
      response = script.response
    } else if (activeScript && followUpIndex < activeScript.followUps.length) {
      const followUp = activeScript.followUps[followUpIndex]
      if (text.toLowerCase().includes(followUp.prompt.toLowerCase().slice(0, 10))) {
        response = followUp.response
        setFollowUpIndex((i) => i + 1)
      } else {
        response = fallback
      }
    } else {
      response = fallback
    }

    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    }, 1500)
  }, [scripts, fallback, activeScript, followUpIndex])

  const handleNew = () => { setMessages([]); setActiveScript(null); setFollowUpIndex(0) }

  const suggestedPrompts = scripts.map((s) => s.prompt)
  const showSuggestions = messages.length === 0
  const followUpPrompts = activeScript && followUpIndex < activeScript.followUps.length
    ? [activeScript.followUps[followUpIndex].prompt] : []

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] -mx-8 -mt-2">
      <div className="px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900">Nucleus AI Assistant</h2>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Online</span>
        </div>
        <button onClick={handleNew} className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600">
          <Plus className="h-3.5 w-3.5" /> New Conversation
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-50">
        {showSuggestions && (
          <div className="text-center py-12">
            <Sparkles className="h-10 w-10 text-blue-200 mx-auto mb-4" />
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
          <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[70%] rounded-xl px-4 py-3', msg.role === 'user' ? 'bg-blue-600 text-white text-sm' : 'bg-white border border-slate-200 shadow-sm text-sm text-slate-700')}>
              {msg.role === 'assistant' ? (
                // Content is from static mock data only (pre-scripted responses), not user input
                <div className="prose prose-sm prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }} />
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {followUpPrompts.length > 0 && !typing && messages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {followUpPrompts.map((p) => (
              <button key={p} onClick={() => sendMessage(p)} className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-medium text-blue-600 hover:bg-blue-50">{p}</button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="px-6 py-3 border-t border-slate-200 bg-white">
        <form onSubmit={(e) => { e.preventDefault(); if (input.trim() && !typing) sendMessage(input.trim()) }} className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Nucleus AI..." disabled={typing} className="flex-1 px-4 py-2.5 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
          <button type="submit" disabled={!input.trim() || typing} className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-30">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
