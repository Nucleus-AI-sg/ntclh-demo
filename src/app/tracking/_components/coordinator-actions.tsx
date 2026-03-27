'use client'

import { useState } from 'react'
import { CheckCircle, ShieldCheck, RotateCcw, Flag, PhoneOff, ClipboardCheck } from 'lucide-react'
import { ConfirmationModal } from '@/components/shared'
import { Textarea } from '@/components/ui/textarea'
import type { Trainee } from '@/types'

type ActionType = 'approve' | 'override' | 'resubmit' | 'record' | 'non_responsive' | 'flag' | null

interface CoordinatorActionsProps {
  trainee: Trainee
  onAction: (action: string, detail?: string) => void
}

const actionDefs = [
  { key: 'approve', label: 'Approve Verification', icon: CheckCircle, style: 'bg-green-600 text-white hover:bg-green-700', confirm: 'Approve verification for this trainee?', confirmLabel: 'Approve' },
  { key: 'override', label: 'Override & Approve', icon: ShieldCheck, style: 'border border-blue-200 text-blue-600 hover:bg-blue-50', confirm: 'Override flags and approve? This will bypass automated checks.', confirmLabel: 'Override & Approve' },
  { key: 'resubmit', label: 'Request Resubmission', icon: RotateCcw, style: 'border border-slate-200 text-slate-600 hover:bg-slate-50', confirm: 'Request document resubmission? The trainee will be notified.', confirmLabel: 'Request' },
  { key: 'record', label: 'Record Manual Outcome', icon: ClipboardCheck, style: 'border border-slate-200 text-slate-600 hover:bg-slate-50', confirm: 'Record a manual verification outcome?', confirmLabel: 'Record', hasNotes: true },
  { key: 'non_responsive', label: 'Mark Non-Responsive', icon: PhoneOff, style: 'border border-amber-200 text-amber-600 hover:bg-amber-50', confirm: 'Mark trainee as non-responsive? This flags them for supervisor review.', confirmLabel: 'Mark', variant: 'destructive' as const },
  { key: 'flag', label: 'Flag for Review', icon: Flag, style: 'border border-red-200 text-red-600 hover:bg-red-50', confirm: 'Flag this case for supervisor review?', confirmLabel: 'Flag', variant: 'destructive' as const },
]

export function CoordinatorActions({ trainee, onAction }: CoordinatorActionsProps) {
  const [activeAction, setActiveAction] = useState<ActionType>(null)
  const [notes, setNotes] = useState('')

  const current = activeAction ? actionDefs.find((a) => a.key === activeAction) : null

  const handleConfirm = () => {
    if (activeAction) {
      onAction(activeAction, notes || undefined)
      setActiveAction(null)
      setNotes('')
    }
  }

  return (
    <div>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Coordinator Actions</h4>
      <div className="flex flex-col gap-2">
        {actionDefs.map(({ key, label, icon: Icon, style }) => (
          <button
            key={key}
            onClick={() => setActiveAction(key as ActionType)}
            className={`w-full py-2.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${style}`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {current && (
        <ConfirmationModal
          open={!!activeAction}
          onConfirm={handleConfirm}
          onCancel={() => { setActiveAction(null); setNotes('') }}
          title={current.label}
          description={`${current.confirm} (${trainee.name})`}
          confirmLabel={current.confirmLabel}
          variant={current.variant ?? 'default'}
        >
          {current.hasNotes && (
            <Textarea
              placeholder="Add notes about the outcome..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="text-sm resize-none"
            />
          )}
        </ConfirmationModal>
      )}
    </div>
  )
}
