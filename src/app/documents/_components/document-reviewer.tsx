'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import type { Document } from '@/types'
import { DocumentViewerPanel } from './document-viewer-panel'
import { ExtractionPanel } from './extraction-panel'

interface DocumentReviewerProps {
  document: Document | null
  documents: Document[]
  onNavigate: (doc: Document) => void
  onVerify: () => void
  onReject: () => void
  onEscalate: () => void
}

export function DocumentReviewer({ document, documents, onNavigate, onVerify, onReject, onEscalate }: DocumentReviewerProps) {
  const [ocrOverlay, setOcrOverlay] = useState(true)
  const [highlightedField, setHighlightedField] = useState<string | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)

  if (!document) {
    return <div className="flex items-center justify-center py-20 text-sm text-slate-400">Select a document from the queue to review</div>
  }

  const currentIdx = documents.findIndex((d) => d.id === document.id)
  const prev = currentIdx > 0 ? documents[currentIdx - 1] : null
  const next = currentIdx < documents.length - 1 ? documents[currentIdx + 1] : null
  const fields = document.ocrExtraction?.fields ?? []

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => prev && onNavigate(prev)} disabled={!prev} className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-30">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs text-slate-500">{currentIdx + 1} of {documents.length}</span>
          <button onClick={() => next && onNavigate(next)} disabled={!next} className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-30">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">{document.traineeName}</span>
          <StatusBadge status={document.status} />
        </div>
      </div>

      {/* Split Panel */}
      <div className="grid grid-cols-2 gap-4">
        <DocumentViewerPanel
          document={document}
          fields={fields}
          ocrOverlay={ocrOverlay}
          onToggleOverlay={() => setOcrOverlay(!ocrOverlay)}
          highlightedField={highlightedField}
          onHighlight={setHighlightedField}
          zoom={zoom}
          onZoomIn={() => setZoom((z) => Math.min(z + 25, 200))}
          onZoomOut={() => setZoom((z) => Math.max(z - 25, 50))}
          rotation={rotation}
          onRotate={() => setRotation((r) => (r + 90) % 360)}
        />

        <ExtractionPanel
          fields={fields}
          highlightedField={highlightedField}
          onHighlight={setHighlightedField}
          editingField={editingField}
          onEditField={setEditingField}
          document={document}
          onVerify={onVerify}
          onReject={onReject}
          onEscalate={onEscalate}
        />
      </div>
    </div>
  )
}
