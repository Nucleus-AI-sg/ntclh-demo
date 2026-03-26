'use client'

import { useState, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

export function DocumentsPage({ documents: initial }: DocumentsPageProps) {
  const [documents, setDocuments] = useState(initial)
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('queue')
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleSelectDoc = useCallback((doc: Document) => {
    setSelectedDoc(doc)
    setActiveTab('reviewer')
  }, [])

  const handleVerify = useCallback(() => {
    if (!selectedDoc) return
    setDocuments((prev) => prev.map((d) => d.id === selectedDoc.id ? { ...d, status: 'manually_verified' as Document['status'] } : d))
    showToast(`${selectedDoc.traineeName} - ${selectedDoc.type.replace(/_/g, ' ')} verified`)
  }, [selectedDoc, showToast])

  const handleBatchApprove = useCallback(() => {
    setDocuments((prev) => prev.map((d) => selectedIds.includes(d.id) ? { ...d, status: 'manually_verified' as Document['status'] } : d))
    showToast(`${selectedIds.length} documents approved`)
    setSelectedIds([])
  }, [selectedIds, showToast])

  const active = documents.filter((d) => ['submitted', 'auto_verified', 'flagged'].includes(d.status))

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
          <VerificationQueue documents={active} onSelectDocument={handleSelectDoc} selectedIds={selectedIds} onSelectionChange={setSelectedIds} onBatchApprove={handleBatchApprove} />
        </TabsContent>
        <TabsContent value="reviewer" className="mt-6">
          <DocumentReviewer document={selectedDoc} documents={active} onNavigate={setSelectedDoc} onVerify={handleVerify} />
        </TabsContent>
        <TabsContent value="archive" className="mt-6">
          <DocumentArchive documents={documents} />
        </TabsContent>
        <TabsContent value="performance" className="mt-6">
          <OcrPerformance />
        </TabsContent>
      </Tabs>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-bold">
          {toast}
        </div>
      )}
    </div>
  )
}
