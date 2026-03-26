'use client'

import { useState, useCallback } from 'react'
import type { Assessment, Trainee, Programme } from '@/types'
import { ApplicationStatus } from '@/types'
import { ApplicationQueue } from './application-queue'
import { AssessmentDetail } from './assessment-detail'

interface EnrolmentPageProps {
  assessments: Assessment[]
  trainees: Trainee[]
  programmes: Programme[]
}

export function EnrolmentPage({ assessments: initial, trainees, programmes }: EnrolmentPageProps) {
  const [assessments, setAssessments] = useState(initial)
  const [selectedId, setSelectedId] = useState<string | null>(initial[0]?.id ?? null)
  const [toast, setToast] = useState<string | null>(null)

  const selected = assessments.find((a) => a.id === selectedId)
  const trainee = selected ? trainees.find((t) => t.id === selected.traineeId) : null

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleApprove = useCallback(() => {
    if (!selected) return
    setAssessments((prev) =>
      prev.map((a) => a.id === selected.id ? { ...a, status: ApplicationStatus.Approved, processedBy: 'sarah-tan' } : a),
    )
    const name = trainee?.name ?? 'Applicant'
    const prog = programmes.find((p) => p.id === selected.recommendedProgrammeId)
    showToast(`${name} approved for ${prog?.shortName ?? 'programme'}`)
  }, [selected, trainee, programmes, showToast])

  const handleOverride = useCallback(() => {
    if (!selected) return
    const alternatives = selected.alternatives.filter((a) => a.programmeId !== selected.recommendedProgrammeId)
    if (alternatives.length === 0) { showToast('No alternative courses available'); return }
    const alt = alternatives[0]
    setAssessments((prev) =>
      prev.map((a) => a.id === selected.id
        ? { ...a, recommendedProgrammeId: alt.programmeId, status: ApplicationStatus.Approved, processedBy: 'sarah-tan' }
        : a,
      ),
    )
    showToast(`${trainee?.name ?? 'Applicant'} approved for ${alt.programmeName} (override)`)
  }, [selected, trainee, showToast])

  return (
    <div className="flex h-[calc(100vh-8rem)] -mx-8 -mt-2">
      {/* Left Panel: Queue */}
      <div className="w-1/3 flex flex-col border-r border-slate-200 bg-slate-50/50 overflow-y-auto">
        <ApplicationQueue
          assessments={assessments}
          trainees={trainees}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Right Panel: Detail */}
      <div className="flex-1 overflow-y-auto bg-white">
        {selected && trainee ? (
          <AssessmentDetail
            assessment={selected}
            trainee={trainee}
            programmes={programmes}
            onApprove={handleApprove}
            onOverride={handleOverride}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            Select an application to view details
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-bold animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}
    </div>
  )
}
