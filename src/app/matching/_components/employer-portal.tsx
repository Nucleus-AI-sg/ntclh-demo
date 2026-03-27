'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PartyPopper } from 'lucide-react'
import { ConfirmationModal } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { Employer, Vacancy, Placement, Trainee } from '@/types'
import { PlacementStatus } from '@/types'
import { InterviewFeedbackForm } from './interview-feedback-form'
import { HiringHistoryTable } from './hiring-history-table'

interface EmployerPortalProps {
  employer: Employer | undefined
  vacancies: Vacancy[]
  placements: Placement[]
  trainees: Trainee[]
  onAction: (msg: string) => void
}

const kanbanCols = [
  { key: PlacementStatus.Submitted, label: 'Submitted' },
  { key: PlacementStatus.Shortlisted, label: 'Shortlisted' },
  { key: PlacementStatus.Interviewed, label: 'Interviewed' },
  { key: PlacementStatus.Offered, label: 'Offered' },
  { key: PlacementStatus.Hired, label: 'Hired' },
] as const

interface OfferDetails { placementId: string; salary: string; startDate: string; role: string }

export function EmployerPortal({ employer, vacancies, placements: initialPlacements, trainees, onAction }: EmployerPortalProps) {
  const [placementState, setPlacementState] = useState(initialPlacements)
  const [feedbackOpen, setFeedbackOpen] = useState<string | null>(null)
  const [offerModal, setOfferModal] = useState<OfferDetails | null>(null)
  const [hireConfirm, setHireConfirm] = useState<string | null>(null)
  const [celebrated, setCelebrated] = useState<Set<string>>(new Set())

  if (!employer) return <p className="text-sm text-slate-400 text-center py-8">Select an employer from the By Employer tab first</p>

  const traineeMap = Object.fromEntries(trainees.map((t) => [t.id, t]))
  const empPlacements = placementState.filter((p) => p.employerId === employer.id)
  const hiredPlacements = empPlacements.filter((p) => p.status === PlacementStatus.Hired)

  const updateStatus = (placementId: string, status: PlacementStatus) => {
    setPlacementState((prev) => prev.map((p) => p.id === placementId ? { ...p, status } : p))
  }

  const moveTo = (placementId: string, status: PlacementStatus, label: string) => {
    updateStatus(placementId, status)
    onAction(`Candidate moved to ${label}`)
  }

  const handleMakeOffer = (placementId: string) => {
    const p = placementState.find((pl) => pl.id === placementId)
    const trainee = p ? traineeMap[p.traineeId] : undefined
    setOfferModal({ placementId, salary: '', startDate: '2026-05-01', role: trainee?.placedRole ?? '' })
  }

  const confirmOffer = () => {
    if (!offerModal) return
    updateStatus(offerModal.placementId, PlacementStatus.Offered)
    onAction(`Offer extended: $${offerModal.salary}/month, starting ${offerModal.startDate}`)
    setOfferModal(null)
  }

  const confirmHire = () => {
    if (!hireConfirm) return
    updateStatus(hireConfirm, PlacementStatus.Hired)
    setCelebrated((prev) => new Set(prev).add(hireConfirm))
    onAction('Candidate hired! Placement confirmed.')
    setHireConfirm(null)
    setTimeout(() => setCelebrated((prev) => { const next = new Set(prev); next.delete(hireConfirm); return next }), 3000)
  }

  const renderActions = (col: typeof kanbanCols[number], pId: string) => {
    if (col.key === PlacementStatus.Submitted) return (
      <>
        <button onClick={() => moveTo(pId, PlacementStatus.Shortlisted, 'Shortlisted')} className="px-2 py-1 text-[9px] font-bold text-blue-600 border border-blue-200 rounded hover:bg-blue-50">Shortlist</button>
        <button onClick={() => moveTo(pId, PlacementStatus.Passed, 'Passed')} className="px-2 py-1 text-[9px] font-bold text-slate-500 border border-slate-200 rounded hover:bg-slate-50">Pass</button>
      </>
    )
    if (col.key === PlacementStatus.Shortlisted) return (
      <button onClick={() => { moveTo(pId, PlacementStatus.Interviewed, 'Interviewed'); setFeedbackOpen(pId) }} className="px-2 py-1 text-[9px] font-bold text-teal-600 border border-teal-200 rounded hover:bg-teal-50">Schedule Interview</button>
    )
    if (col.key === PlacementStatus.Interviewed) return (
      <>
        <button onClick={() => handleMakeOffer(pId)} className="px-2 py-1 text-[9px] font-bold text-green-600 border border-green-200 rounded hover:bg-green-50">Make Offer</button>
        <button onClick={() => moveTo(pId, PlacementStatus.Passed, 'Passed')} className="px-2 py-1 text-[9px] font-bold text-slate-500 border border-slate-200 rounded hover:bg-slate-50">Decline</button>
      </>
    )
    if (col.key === PlacementStatus.Offered) return (
      <>
        <button onClick={() => setHireConfirm(pId)} className="px-2 py-1 text-[9px] font-bold text-green-600 border border-green-200 rounded hover:bg-green-50">Accept Offer</button>
        <button onClick={() => moveTo(pId, PlacementStatus.Passed, 'Passed')} className="px-2 py-1 text-[9px] font-bold text-red-500 border border-red-200 rounded hover:bg-red-50">Decline</button>
      </>
    )
    return null
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-blue-900">{employer.name}</p>
          <p className="text-xs text-blue-600">{vacancies.length} active vacancies - {employer.totalPlacements} total placements</p>
        </div>
        <span className="text-[10px] font-bold text-blue-600 uppercase">Employer Portal Preview</span>
      </div>

      {/* Kanban Pipeline */}
      <div className="overflow-x-auto">
        <div className="flex gap-3 min-w-[800px]">
          {kanbanCols.map((col) => {
            const items = empPlacements.filter((p) => p.status === col.key)
            return (
              <div key={col.key} className="flex-1 bg-slate-50 rounded-xl border border-slate-100 p-3 min-w-[150px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{col.label}</span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-1.5 rounded">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((p) => {
                    const trainee = traineeMap[p.traineeId]
                    if (!trainee) return null
                    const isCelebrating = celebrated.has(p.id)
                    return (
                      <div key={p.id} className={cn('bg-white rounded-lg border p-3 shadow-sm transition-all', isCelebrating ? 'border-green-400 ring-2 ring-green-100' : 'border-slate-200')}>
                        {isCelebrating && <div className="flex items-center gap-1 mb-1 text-green-600"><PartyPopper className="h-3.5 w-3.5" /><span className="text-[10px] font-bold">Placement confirmed!</span></div>}
                        <Link href={`/trainee/${trainee.id}`} className="text-xs font-bold text-slate-900 hover:text-blue-600">{trainee.name}</Link>
                        <p className="text-[10px] text-slate-500">{trainee.programmeId.toUpperCase()}</p>
                        <span className="text-[10px] font-bold text-green-600">{p.matchScore}% match</span>
                        <div className="flex gap-1 mt-2 flex-wrap">{renderActions(col, p.id)}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {feedbackOpen && <InterviewFeedbackForm onSubmit={() => { setFeedbackOpen(null); onAction('Feedback submitted') }} onCancel={() => setFeedbackOpen(null)} />}

      <HiringHistoryTable placements={hiredPlacements} traineeMap={traineeMap} />

      {/* Offer Modal */}
      <ConfirmationModal open={!!offerModal} onConfirm={confirmOffer} onCancel={() => setOfferModal(null)} title="Extend Offer" description="Complete the offer details below." confirmLabel="Send Offer">
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase">Role Title</label>
            <input type="text" value={offerModal?.role ?? ''} onChange={(e) => setOfferModal((prev) => prev ? { ...prev, role: e.target.value } : null)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase">Monthly Salary ($)</label>
            <input type="text" value={offerModal?.salary ?? ''} onChange={(e) => setOfferModal((prev) => prev ? { ...prev, salary: e.target.value } : null)} placeholder="e.g. 4500" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase">Start Date</label>
            <input type="date" value={offerModal?.startDate ?? ''} onChange={(e) => setOfferModal((prev) => prev ? { ...prev, startDate: e.target.value } : null)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </ConfirmationModal>

      <ConfirmationModal open={!!hireConfirm} onConfirm={confirmHire} onCancel={() => setHireConfirm(null)} title="Confirm Hire" description="Confirm this candidate has accepted the offer and will be hired." confirmLabel="Confirm Hire" />
    </div>
  )
}
