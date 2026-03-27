'use client'

import { useState, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ActionToast, useActionToast, ConfirmationModal } from '@/components/shared'
import type { Document } from '@/types'
import { ProcessingMetrics } from './processing-metrics'
import { VerificationQueue } from './verification-queue'
import { DocumentReviewer } from './document-reviewer'
import { DocumentArchive } from './document-archive'
import { OcrPerformance } from './ocr-performance'

interface DocumentsPageProps {
  documents: Document[]
}

const tabs = [
  { id: 'queue', label: 'Verification Queue' },
  { id: 'reviewer', label: 'Document Reviewer' },
  { id: 'archive', label: 'Archive' },
  { id: 'performance', label: 'OCR Performance' },
] as const

type ConfirmAction = 'flag' | 'resubmit' | 'reject' | 'escalate' | null

export function DocumentsPage({ documents: initial }: DocumentsPageProps) {
  const [documents, setDocuments] = useState(initial)
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('queue')
  const [toast, showToast, clearToast] = useActionToast()
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null)

  const handleSelectDoc = useCallback((doc: Document) => {
    setSelectedDoc(doc)
    setActiveTab('reviewer')
  }, [])

  const handleVerify = useCallback(() => {
    if (!selectedDoc) return
    setDocuments((prev) => prev.map((d) => d.id === selectedDoc.id ? { ...d, status: 'manually_verified' as Document['status'] } : d))
    showToast(`${selectedDoc.traineeName} - ${selectedDoc.type.replace(/_/g, ' ')} verified`)
  }, [selectedDoc, showToast])

  const handleReject = useCallback(() => {
    if (!selectedDoc) return
    setDocuments((prev) => prev.map((d) => d.id === selectedDoc.id ? { ...d, status: 'rejected' as Document['status'] } : d))
    showToast(`${selectedDoc.traineeName} - document rejected, resubmission requested`)
  }, [selectedDoc, showToast])

  const handleEscalate = useCallback(() => {
    if (!selectedDoc) return
    showToast(`${selectedDoc.traineeName} - escalated to supervisor`)
  }, [selectedDoc, showToast])

  const handleBatchApprove = useCallback(() => {
    setDocuments((prev) => prev.map((d) => selectedIds.includes(d.id) ? { ...d, status: 'manually_verified' as Document['status'] } : d))
    showToast(`${selectedIds.length} documents approved`)
    setSelectedIds([])
  }, [selectedIds, showToast])

  const handleBatchFlag = useCallback(() => {
    setDocuments((prev) => prev.map((d) => selectedIds.includes(d.id) ? { ...d, status: 'flagged' as Document['status'] } : d))
    showToast(`${selectedIds.length} documents flagged for review`)
    setSelectedIds([])
  }, [selectedIds, showToast])

  const handleBatchResubmit = useCallback(() => {
    setDocuments((prev) => prev.map((d) => selectedIds.includes(d.id) ? { ...d, status: 'rejected' as Document['status'] } : d))
    showToast(`Resubmission requested for ${selectedIds.length} documents`)
    setSelectedIds([])
  }, [selectedIds, showToast])

  const confirmLabels: Record<string, { title: string; desc: string; label: string; variant: 'default' | 'destructive' }> = {
    flag: { title: 'Flag Selected Documents', desc: `Flag ${selectedIds.length} document(s) for manual review?`, label: 'Flag', variant: 'default' },
    resubmit: { title: 'Request Resubmission', desc: `Request resubmission for ${selectedIds.length} document(s)? Trainees will be notified.`, label: 'Request Resubmission', variant: 'destructive' },
    reject: { title: 'Reject Document', desc: `Reject this document and request resubmission from ${selectedDoc?.traineeName}?`, label: 'Reject', variant: 'destructive' },
    escalate: { title: 'Escalate to Supervisor', desc: `Escalate ${selectedDoc?.traineeName}'s document for supervisor review?`, label: 'Escalate', variant: 'default' },
  }

  const onConfirm = () => {
    if (confirmAction === 'flag') handleBatchFlag()
    else if (confirmAction === 'resubmit') handleBatchResubmit()
    else if (confirmAction === 'reject') handleReject()
    else if (confirmAction === 'escalate') handleEscalate()
    setConfirmAction(null)
  }

  const active = documents.filter((d) => ['submitted', 'auto_verified', 'flagged'].includes(d.status))

  const current = confirmAction ? confirmLabels[confirmAction] : null

  return (
    <div className="space-y-6">
      <ProcessingMetrics />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="queue" className="mt-6">
          <VerificationQueue
            documents={active}
            onSelectDocument={handleSelectDoc}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onBatchApprove={handleBatchApprove}
            onBatchFlag={() => setConfirmAction('flag')}
            onBatchResubmit={() => setConfirmAction('resubmit')}
          />
        </TabsContent>
        <TabsContent value="reviewer" className="mt-6">
          <DocumentReviewer
            document={selectedDoc}
            documents={active}
            onNavigate={setSelectedDoc}
            onVerify={handleVerify}
            onReject={() => setConfirmAction('reject')}
            onEscalate={() => setConfirmAction('escalate')}
          />
        </TabsContent>
        <TabsContent value="archive" className="mt-6">
          <DocumentArchive documents={documents} />
        </TabsContent>
        <TabsContent value="performance" className="mt-6">
          <OcrPerformance />
        </TabsContent>
      </Tabs>

      {current && (
        <ConfirmationModal
          open={!!confirmAction}
          title={current.title}
          description={current.desc}
          confirmLabel={current.label}
          variant={current.variant}
          onConfirm={onConfirm}
          onCancel={() => setConfirmAction(null)}
        />
      )}

      <ActionToast message={toast} onDismiss={clearToast} />
    </div>
  )
}
