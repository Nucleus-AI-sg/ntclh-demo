'use client'

import { Eye, EyeOff, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import { scoreColour } from '@/lib/colours'
import { cn } from '@/lib/utils'
import type { Document } from '@/types'

interface OcrField {
  fieldName: string
  extractedValue: string
  confidence: number
  crossReferenceResult?: string
  crossReferenceNote?: string
}

interface DocumentViewerPanelProps {
  document: Document
  fields: OcrField[]
  ocrOverlay: boolean
  onToggleOverlay: () => void
  highlightedField: string | null
  onHighlight: (field: string) => void
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  rotation: number
  onRotate: () => void
}

export function DocumentViewerPanel({
  document,
  fields,
  ocrOverlay,
  onToggleOverlay,
  highlightedField,
  onHighlight,
  zoom,
  onZoomIn,
  onZoomOut,
  rotation,
  onRotate,
}: DocumentViewerPanelProps) {
  return (
    <div className="bg-slate-100 rounded-xl border border-slate-200 p-4 min-h-[400px] relative">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Preview</span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-slate-200 rounded-lg px-1.5 py-0.5 bg-white">
            <button onClick={onZoomOut} className="p-0.5 text-slate-500 hover:text-slate-700" title="Zoom out">
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="text-[10px] font-bold text-slate-500 min-w-[36px] text-center">{zoom}%</span>
            <button onClick={onZoomIn} className="p-0.5 text-slate-500 hover:text-slate-700" title="Zoom in">
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button onClick={onRotate} className="p-0.5 text-slate-500 hover:text-slate-700" title="Rotate">
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>
          <button onClick={onToggleOverlay} className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline">
            {ocrOverlay ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {ocrOverlay ? 'Hide' : 'Show'} OCR
          </button>
        </div>
      </div>

      <div
        className="bg-white rounded-lg border border-slate-200 p-4 min-h-[340px] flex flex-col items-center justify-center relative overflow-auto"
        style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)`, transformOrigin: 'top left' }}
      >
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
                onClick={() => onHighlight(field.fieldName)}
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
  )
}
