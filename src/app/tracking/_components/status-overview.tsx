'use client'

import { Clock, FileText, CheckCircle, AlertTriangle, PhoneOff, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatusCategory {
  key: string
  label: string
  count: number
  icon: LucideIcon
  colour: { bg: string; text: string; iconBg: string }
}

const categories: StatusCategory[] = [
  { key: 'awaiting', label: 'Awaiting Documents', count: 14, icon: Clock, colour: { bg: 'hover:bg-amber-50', text: 'text-amber-600', iconBg: 'bg-amber-100' } },
  { key: 'submitted', label: 'Documents Submitted', count: 8, icon: FileText, colour: { bg: 'hover:bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' } },
  { key: 'auto_verified', label: 'Auto-Verified', count: 5, icon: CheckCircle, colour: { bg: 'hover:bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100' } },
  { key: 'flagged', label: 'Flagged for Review', count: 3, icon: AlertTriangle, colour: { bg: 'hover:bg-red-50', text: 'text-red-600', iconBg: 'bg-red-100' } },
  { key: 'non_responsive', label: 'Non-Responsive', count: 4, icon: PhoneOff, colour: { bg: 'hover:bg-slate-50', text: 'text-slate-600', iconBg: 'bg-slate-100' } },
  { key: 'verified', label: 'Verified & Complete', count: 14, icon: ShieldCheck, colour: { bg: 'hover:bg-teal-50', text: 'text-teal-600', iconBg: 'bg-teal-100' } },
]

interface StatusOverviewProps {
  activeFilter: string | null
  onFilter: (key: string | null) => void
}

export function StatusOverview({ activeFilter, onFilter }: StatusOverviewProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat) => {
        const Icon = cat.icon
        const isActive = activeFilter === cat.key
        return (
          <button
            key={cat.key}
            onClick={() => onFilter(isActive ? null : cat.key)}
            className={cn(
              'bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3 transition-all text-left',
              isActive ? 'border-blue-500 ring-1 ring-blue-200' : 'border-slate-100',
              cat.colour.bg,
            )}
          >
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', cat.colour.iconBg, cat.colour.text)}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 leading-none">{cat.count}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{cat.label}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
