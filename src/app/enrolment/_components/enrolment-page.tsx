'use client'

import { useState, useCallback } from 'react'
import type { Assessment, Trainee, Programme } from '@/types'
import { ApplicationStatus } from '@/types'
import { ActionToast, useActionToast, ConfirmationModal, ComposeMessageModal } from '@/components/shared'
import { ApplicationQueue } from './application-queue'
import { AssessmentDetail } from './assessment-detail'
import { RejectModal } from './reject-modal'

interface EnrolmentPageProps {
  assessments: Assessment[]
  trainees: Trainee[]
  programmes: Programme[]
}

type ModalState =
  | { type: 'none' }
  | { type: 'approve' }
  | { type: 'override' }
  | { type: 'reject' }
  | { type: 'requestInfo' }

export function EnrolmentPage({ assessments: initial, trainees, programmes }: EnrolmentPageProps) {
  const [assessments, setAssessments] = useState(initial)
  const [selectedId, setSelectedId] = useState<string | null>(initial[0]?.id ?? null)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [toast, showToast, clearToast] = useActionToast()

  const selected = assessments.find((a) => a.id === selectedId)
  const trainee = selected ? trainees.find((t) => t.id === selected.traineeId) : null

  const closeModal = useCallback(() => setModal({ type: 'none' }), [])

  const handleApproveConfirm = useCallback(() => {
    if (!selected) return
    setAssessments((prev) =>
      prev.map((a) => a.id === selected.id ? { ...a, status: ApplicationStatus.Approved, processedBy: 'sarah-tan' } : a),
    )
    const name = trainee?.name ?? 'Applicant'
    const prog = programmes.find((p) => p.id === selected.recommendedProgrammeId)
    showToast(`${name} approved for ${prog?.shortName ?? 'programme'}`)
    closeModal()
  }, [selected, trainee, programmes, showToast, closeModal])

  const handleOverrideConfirm = useCallback(() => {
    if (!selected) return
    const alternatives = selected.alternatives.filter((a) => a.programmeId !== selected.recommendedProgrammeId)
    if (alternatives.length === 0) { showToast('No alternative courses available'); closeModal(); return }
    const alt = alternatives[0]
    setAssessments((prev) =>
      prev.map((a) => a.id === selected.id
        ? { ...a, recommendedProgrammeId: alt.programmeId, status: ApplicationStatus.Approved, processedBy: 'sarah-tan' }
        : a,
      ),
    )
    showToast(`${trainee?.name ?? 'Applicant'} approved for ${alt.programmeName} (override)`)
    closeModal()
  }, [selected, trainee, showToast, closeModal])

  const handleRejectConfirm = useCallback((reason: string) => {
    if (!selected) return
    setAssessments((prev) =>
      prev.map((a) => a.id === selected.id ? { ...a, status: ApplicationStatus.Rejected, processedBy: 'sarah-tan' } : a),
    )
    showToast(`${trainee?.name ?? 'Applicant'} rejected: ${reason}`)
    closeModal()
  }, [selected, trainee, showToast, closeModal])

  const handleMessageSent = useCallback(() => {
    showToast(`Information request sent to ${trainee?.name ?? 'applicant'}`)
    closeModal()
  }, [trainee, showToast, closeModal])

  const recProg = selected ? programmes.find((p) => p.id === selected.recommendedProgrammeId) : null

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
            onApprove={() => setModal({ type: 'approve' })}
            onOverride={() => setModal({ type: 'override' })}
            onReject={() => setModal({ type: 'reject' })}
            onRequestInfo={() => setModal({ type: 'requestInfo' })}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            Select an application to view details
          </div>
        )}
      </div>

      {/* Approve Confirmation */}
      <ConfirmationModal
        open={modal.type === 'approve'}
        onConfirm={handleApproveConfirm}
        onCancel={closeModal}
        title="Confirm Enrolment Approval"
        description={`Approve ${trainee?.name ?? 'applicant'} for ${recProg?.name ?? 'the recommended programme'}?`}
        confirmLabel="Approve"
      />

      {/* Override Confirmation */}
      <ConfirmationModal
        open={modal.type === 'override'}
        onConfirm={handleOverrideConfirm}
        onCancel={closeModal}
        title="Approve with Override"
        description={`Override AI recommendation and approve ${trainee?.name ?? 'applicant'} for an alternative programme?`}
        confirmLabel="Approve Override"
      />

      {/* Reject Modal */}
      <RejectModal
        open={modal.type === 'reject'}
        applicantName={trainee?.name ?? 'Applicant'}
        onConfirm={handleRejectConfirm}
        onCancel={closeModal}
      />

      {/* Request More Info */}
      <ComposeMessageModal
        open={modal.type === 'requestInfo'}
        onClose={closeModal}
        recipient={trainee?.name ?? ''}
        onSend={handleMessageSent}
      />

      <ActionToast message={toast} onDismiss={clearToast} />
    </div>
  )
}
