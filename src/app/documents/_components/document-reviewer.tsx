'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, Clock, Eye, EyeOff } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { scoreColour } from '@/lib/colours'
import { cn } from '@/lib/utils'
import type { Document } from '@/types'

interface DocumentReviewerProps {
  document: Document | null
  documents: Document[]
  onNavigate: (doc: Document) => void
  onVerify: () => void
}

export function DocumentReviewer({ document, documents, onNavigate, onVerify }: DocumentReviewerProps) {
  const [ocrOverlay, setOcrOverlay] = useState(true)
  const [highlightedField, setHighlightedField] = useState<string | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)

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
        {/* Left: Document Viewer (simulated) */}
        <div className="bg-slate-100 rounded-xl border border-slate-200 p-4 min-h-[400px] relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Preview</span>
            <button onClick={() => setOcrOverlay(!ocrOverlay)} className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline">
              {ocrOverlay ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              {ocrOverlay ? 'Hide' : 'Show'} OCR Overlay
            </button>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6 min-h-[340px] flex flex-col items-center justify-center relative">
            <p className="text-xs text-slate-400 mb-4">{document.type.replace(/_/g, ' ')} - {document.traineeName}</p>
            <div className="w-full space-y-3">
              {ocrOverlay && fields.map((field) => {
                const isHighlighted = highlightedField === field.fieldName
                const colour = scoreColour(field.confidence)
                return (
                  <div
                    key={field.fieldName}
                    className={cn(
                      'p-2 rounded border-2 border-dashed transition-all cursor-pointer',
                      isHighlighted ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50',
                    )}
                    onClick={() => setHighlightedField(field.fieldName)}
                  >
                    <span className="text-[9px] text-slate-400 uppercase">{field.fieldName}</span>
                    <p className={cn('text-sm font-bold', colour.text)}>{field.extractedValue}</p>
                  </div>
                )
              })}
              {!ocrOverlay && <p className="text-slate-300 text-center py-16">Document content (simulated)</p>}
            </div>
          </div>
        </div>

        {/* Right: Extraction Results */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">OCR Extraction Results</h3>
            <div className="space-y-2">
              {fields.map((field) => {
                const colour = scoreColour(field.confidence)
                const isEditing = editingField === field.fieldName
                return (
                  <div
                    key={field.fieldName}
                    className={cn('p-2.5 rounded-lg border transition-all cursor-pointer', highlightedField === field.fieldName ? 'border-blue-300 bg-blue-50' : 'border-slate-100 bg-slate-50')}
                    onClick={() => setHighlightedField(field.fieldName)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500">{field.fieldName}</span>
                      <div className="flex items-center gap-2">
                        <span className={cn('text-[10px] font-bold', colour.text)}>{field.confidence}%</span>
                        {field.crossReferenceResult === 'match' ? <CheckCircle className="h-3 w-3 text-green-500" /> : field.crossReferenceResult === 'mismatch' ? <AlertTriangle className="h-3 w-3 text-red-500" /> : <Clock className="h-3 w-3 text-amber-500" />}
                      </div>
                    </div>
                    {isEditing ? (
                      <input defaultValue={field.extractedValue} className="mt-1 w-full text-xs border border-blue-300 rounded px-2 py-1" onBlur={() => setEditingField(null)} autoFocus />
                    ) : (
                      <p className="text-xs font-semibold text-slate-800 mt-0.5" onDoubleClick={() => setEditingField(field.fieldName)}>{field.extractedValue}</p>
                    )}
                    {field.crossReferenceNote && <p className="text-[9px] text-slate-400 mt-0.5">{field.crossReferenceNote}</p>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Discrepancy Panel */}
          {document.discrepancies && document.discrepancies.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-[10px] font-bold text-red-700 uppercase mb-2">Discrepancies Found</p>
              {document.discrepancies.map((d, i) => <p key={i} className="text-xs text-red-600 mb-1">{d}</p>)}
              {document.suggestedResolution && <p className="text-xs text-slate-600 mt-2 italic">{document.suggestedResolution}</p>}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={onVerify} className="flex-1 py-2.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700">Verify</button>
            <button className="flex-1 py-2.5 border border-blue-200 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50">Edit & Verify</button>
            <button className="flex-1 py-2.5 border border-red-200 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50">Reject</button>
          </div>
        </div>
      </div>
    </div>
  )
}
