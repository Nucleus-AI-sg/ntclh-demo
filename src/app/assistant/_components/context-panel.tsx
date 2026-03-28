'use client'

import { Users, Database, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { ChatContext } from '@/types'

interface ContextPanelProps {
  context: ChatContext | null
  collapsed: boolean
  onToggle: () => void
}

function ConfidenceRing({ level }: { level: 'High' | 'Medium' | 'Low' }) {
  const pct = level === 'High' ? 90 : level === 'Medium' ? 65 : 35
  const colour = level === 'High' ? 'text-green-600' : level === 'Medium' ? 'text-amber-500' : 'text-red-500'
  const offset = 113 - (113 * pct) / 100

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="20" cy="20" r="18" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-slate-100" />
        <circle cx="20" cy="20" r="18" fill="transparent" stroke="currentColor" strokeWidth="3" strokeDasharray="113" strokeDashoffset={offset} className={colour} />
      </svg>
      <span className={`text-[10px] font-bold ${colour}`}>{pct}%</span>
    </div>
  )
}

export function ContextPanel({ context, collapsed, onToggle }: ContextPanelProps) {
  return (
    <aside className={`border-l border-slate-200 bg-slate-50 flex flex-col transition-all duration-200 ${collapsed ? 'w-10' : 'w-[300px]'}`}>
      <button onClick={onToggle} className="p-2 self-start text-slate-400 hover:text-slate-600" aria-label={collapsed ? 'Expand panel' : 'Collapse panel'}>
        {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Referenced Data</h3>

          {!context && (
            <p className="text-xs text-slate-400">Ask a question to see referenced data here.</p>
          )}

          {context?.trainees && context.trainees.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                Trainees Referenced
              </h4>
              <div className="space-y-1.5">
                {context.trainees.map((t) => (
                  <Link key={t.id} href={`/trainee/${t.id}`} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-100 hover:border-blue-300 transition-colors group">
                    <span className="text-xs font-medium text-slate-700">{t.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-300 group-hover:text-blue-500" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {context?.dataSources && context.dataSources.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-600" />
                Data Sources
              </h4>
              <ul className="space-y-1.5">
                {context.dataSources.map((src) => (
                  <li key={src} className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    {src}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {context?.confidence && (
            <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center gap-3">
              <ConfidenceRing level={context.confidence.level} />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Confidence</p>
                <p className="text-xs font-bold text-slate-900">{context.confidence.level} - {context.confidence.label}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  )
}
