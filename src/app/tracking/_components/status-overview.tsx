'use client'

import { useMemo } from 'react'
import { Clock, FileText, CheckCircle, AlertTriangle, PhoneOff, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import type { Trainee, Document } from '@/types'
import { LifecycleStage } from '@/types'

const postTrainingStages = new Set([LifecycleStage.Completed, LifecycleStage.Placed, LifecycleStage.Verified])

function getDocStatus(docs: Document[]): string {
  if (docs.length === 0) return 'none'
  if (docs.some((d) => d.status === 'flagged')) return 'flagged'
  if (docs.every((d) => d.status === 'auto_verified' || d.status === 'manually_verified')) return 'verified'
  return 'submitted'
}

interface CategoryDef {
  key: string
  label: string
  icon: LucideIcon
  colour: { bg: string; text: string; iconBg: string }
}

const categoryDefs: CategoryDef[] = [
  { key: 'awaiting', label: 'Awaiting Documents', icon: Clock, colour: { bg: 'hover:bg-amber-50', text: 'text-amber-600', iconBg: 'bg-amber-100' } },
  { key: 'submitted', label: 'Documents Submitted', icon: FileText, colour: { bg: 'hover:bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' } },
  { key: 'auto_verified', label: 'Auto-Verified', icon: CheckCircle, colour: { bg: 'hover:bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100' } },
  { key: 'flagged', label: 'Flagged for Review', icon: AlertTriangle, colour: { bg: 'hover:bg-red-50', text: 'text-red-600', iconBg: 'bg-red-100' } },
  { key: 'non_responsive', label: 'Non-Responsive', icon: PhoneOff, colour: { bg: 'hover:bg-slate-50', text: 'text-slate-600', iconBg: 'bg-slate-100' } },
  { key: 'verified', label: 'Verified & Complete', icon: ShieldCheck, colour: { bg: 'hover:bg-teal-50', text: 'text-teal-600', iconBg: 'bg-teal-100' } },
]

interface StatusOverviewProps {
  trainees: Trainee[]
  documents: Document[]
  activeFilter: string | null
  onFilter: (key: string | null) => void
}

export function StatusOverview({ trainees, documents, activeFilter, onFilter }: StatusOverviewProps) {
  const counts = useMemo(() => {
    const docsByTrainee: Record<string, Document[]> = {}
    for (const d of documents) { (docsByTrainee[d.traineeId] ??= []).push(d) }
    const post = trainees.filter((t) => postTrainingStages.has(t.lifecycleStage))
    const result: Record<string, number> = { awaiting: 0, submitted: 0, auto_verified: 0, flagged: 0, non_responsive: 0, verified: 0 }
    for (const t of post) {
      const docStatus = getDocStatus(docsByTrainee[t.id] ?? [])
      if (t.lifecycleStage === LifecycleStage.Verified) { result.verified++; continue }
      if (t.riskLevel === 'at_risk' && t.daysInStage > 60) { result.non_responsive++; continue }
      if (docStatus === 'flagged') { result.flagged++; continue }
      if (docStatus === 'verified') { result.auto_verified++; continue }
      if (docStatus === 'submitted') { result.submitted++; continue }
      result.awaiting++
    }
    return result
  }, [trainees, documents])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categoryDefs.map((cat) => {
        const Icon = cat.icon
        const isActive = activeFilter === cat.key
        return (
          <button
            key={cat.key}
            onClick={() => onFilter(isActive ? null : cat.key)}
            className={cn(
              'bg-white p-4 rounded-xl flex items-center gap-3 transition-all text-left',
              isActive ? 'ring-1 ring-blue-200' : '',
              cat.colour.bg,
            )}
          >
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', cat.colour.iconBg, cat.colour.text)}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 leading-none">{counts[cat.key]}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{cat.label}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
