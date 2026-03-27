'use client'

import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { StatusBadge } from '@/components/shared'
import type { Trainee } from '@/types'
import { programmeNames } from '@/data'

interface FunnelDrillDownModalProps {
  open: boolean
  onClose: () => void
  stageName: string
  trainees: Trainee[]
}

export function FunnelDrillDownModal({ open, onClose, stageName, trainees }: FunnelDrillDownModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold">{stageName}</DialogTitle>
          <p className="text-xs text-slate-500">{trainees.length} trainee{trainees.length !== 1 ? 's' : ''} at this stage</p>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 -mx-6 px-6">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="pb-2">Name</th>
                <th className="pb-2">Programme</th>
                <th className="pb-2">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {trainees.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="py-2">
                    <Link href={`/trainee/${t.id}`} className="text-blue-600 hover:underline font-medium text-xs">
                      {t.name}
                    </Link>
                  </td>
                  <td className="py-2 text-xs text-slate-500">{programmeNames[t.programmeId] ?? t.programmeId}</td>
                  <td className="py-2">
                    <StatusBadge
                      status={t.riskLevel === 'on_track' ? 'active' : t.riskLevel === 'at_risk' ? 'flagged' : 'pending'}
                      label={t.riskLevel.replace(/_/g, ' ')}
                    />
                  </td>
                </tr>
              ))}
              {trainees.length === 0 && (
                <tr><td colSpan={3} className="py-6 text-center text-xs text-slate-400">No trainees at this stage</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </DialogContent>
    </Dialog>
  )
}
