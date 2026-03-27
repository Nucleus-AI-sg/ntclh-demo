'use client'

import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { templateSampleData } from '@/data'
import type { MessageTemplate, TemplateCategory } from '@/types'

const mergeFieldOptions = [
  'trainee_name', 'programme_name', 'start_date', 'venue', 'coordinator_name',
  'application_ref', 'module_name', 'document_deadline', 'employer_name',
  'cohort_date', 'company_name',
]

const categoryLabels: Record<TemplateCategory, string> = {
  enrolment: 'Enrolment',
  training: 'Training',
  post_training: 'Post-Training',
  employer: 'Employer',
  administrative: 'Administrative',
}

interface TemplateEditorModalProps {
  open: boolean
  onClose: () => void
  template?: MessageTemplate | null
  onSave?: (template: MessageTemplate) => void
}

function renderMerged(text: string) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => templateSampleData[key] ?? `{{${key}}}`)
}

export function TemplateEditorModal({ open, onClose, template, onSave }: TemplateEditorModalProps) {
  const [name, setName] = useState(template?.name ?? '')
  const [subject, setSubject] = useState(template?.subject ?? '')
  const [body, setBody] = useState(template?.body ?? '')
  const [channel, setChannel] = useState(template?.channel ?? 'email')
  const [category, setCategory] = useState<TemplateCategory>(template?.category ?? 'enrolment')
  const [showPreview, setShowPreview] = useState(false)
  const [mergeOpen, setMergeOpen] = useState(false)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const insertMergeField = (field: string) => {
    const tag = `{{${field}}}`
    const el = bodyRef.current
    if (el) {
      const start = el.selectionStart
      const end = el.selectionEnd
      const updated = body.slice(0, start) + tag + body.slice(end)
      setBody(updated)
      setTimeout(() => {
        el.focus()
        el.setSelectionRange(start + tag.length, start + tag.length)
      }, 0)
    } else {
      setBody(body + tag)
    }
    setMergeOpen(false)
  }

  const handleSave = () => {
    const saved: MessageTemplate = {
      id: template?.id ?? `tpl-new-${Date.now()}`,
      name,
      category,
      channel: channel as MessageTemplate['channel'],
      subject,
      body,
      mergeFields: mergeFieldOptions.filter((f) => body.includes(`{{${f}}}`)),
      lastUsed: template?.lastUsed ?? 'Never',
      usageCount: template?.usageCount ?? 0,
    }
    onSave?.(saved)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">
            {template ? 'Edit Template' : 'Create Template'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input placeholder="Template name" value={name} onChange={(e) => setName(e.target.value)} className="text-sm" />

          <div className="flex gap-3">
            <select value={channel} onChange={(e) => setChannel(e.target.value)} className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white">
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value as TemplateCategory)} className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white flex-1">
              {Object.entries(categoryLabels).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {channel === 'email' && (
            <Input placeholder="Subject line" value={subject} onChange={(e) => setSubject(e.target.value)} className="text-sm" />
          )}

          {/* Merge field inserter */}
          <div className="relative">
            <button
              onClick={() => setMergeOpen(!mergeOpen)}
              className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700"
            >
              Insert merge field <ChevronDown className="h-3 w-3" />
            </button>
            {mergeOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 max-h-48 overflow-y-auto">
                {mergeFieldOptions.map((field) => (
                  <button
                    key={field}
                    onClick={() => insertMergeField(field)}
                    className="block w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-mono"
                  >
                    {`{{${field}}}`}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Textarea
            ref={bodyRef}
            placeholder="Message body..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="text-sm resize-none font-mono"
          />

          {/* Preview toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            {showPreview ? 'Hide preview' : 'Show preview with sample data'}
          </button>

          {showPreview && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              {channel === 'email' && subject && (
                <p className="text-sm font-bold text-slate-800 mb-2">{renderMerged(subject)}</p>
              )}
              <p className="text-sm text-slate-700 whitespace-pre-line">{renderMerged(body)}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSave} disabled={!name.trim() || !body.trim()}>
            Save Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
