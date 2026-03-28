'use client'

import { useState, useMemo } from 'react'
import { Eye, EyeOff, Pencil, Plus } from 'lucide-react'
import { FilterBar, useActionToast, ActionToast } from '@/components/shared'
import { getChannelIcon } from '@/lib/channel-icons'
import { templateSampleData } from '@/data'
import type { MessageTemplate, TemplateCategory } from '@/types'
import { TemplateEditorModal } from './template-editor-modal'

const categoryLabels: Record<TemplateCategory, string> = {
  enrolment: 'Enrolment',
  training: 'Training',
  post_training: 'Post-Training',
  employer: 'Employer',
  administrative: 'Administrative',
}

function renderMerged(text: string) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => templateSampleData[key] ?? `{{${key}}}`)
}

interface TemplatesTabProps {
  templates: MessageTemplate[]
}

export function TemplatesTab({ templates }: TemplatesTabProps) {
  const [categoryFilter, setCategoryFilter] = useState('__all__')
  const [preview, setPreview] = useState<string | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null)
  const [toast, showToast] = useActionToast()

  const filtered = useMemo(() => {
    if (categoryFilter === '__all__') return templates
    return templates.filter((t) => t.category === categoryFilter)
  }, [templates, categoryFilter])

  const previewTemplate = preview ? templates.find((t) => t.id === preview) : null

  const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({ value, label }))

  const handleEditTemplate = (t: MessageTemplate) => {
    setEditingTemplate(t)
    setEditorOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FilterBar
          filters={[{ id: 'category', label: 'All Categories', options: categoryOptions, value: categoryFilter, onChange: setCategoryFilter }]}
        />
        <button
          onClick={() => { setEditingTemplate(null); setEditorOpen(true) }}
          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Create Template
        </button>
      </div>

      <div className="grid gap-3">
        {filtered.map((t) => (
          <div key={t.id} className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                  {getChannelIcon(t.channel)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-[10px] text-slate-500">
                    {categoryLabels[t.category]}
                    <span className="mx-1 text-slate-300">|</span>
                    {t.channel}
                    <span className="mx-1 text-slate-300">|</span>
                    Used {t.usageCount} times
                    <span className="mx-1 text-slate-300">|</span>
                    Last used {t.lastUsed}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditTemplate(t)}
                  className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <button
                  onClick={() => setPreview(preview === t.id ? null : t.id)}
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  {preview === t.id ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  {preview === t.id ? 'Close' : 'Preview'}
                </button>
              </div>
            </div>

            {/* Merge fields */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {t.mergeFields.map((field) => (
                <span key={field} className="text-[9px] font-mono bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                  {`{{${field}}}`}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Preview panel */}
      {previewTemplate && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Template Preview (with sample data)</p>
            <span className="text-[10px] text-slate-400">{previewTemplate.channel === 'email' ? 'Rich text' : 'Plain text'}</span>
          </div>
          {previewTemplate.channel === 'email' && (
            <div className="mb-2">
              <p className="text-[10px] text-slate-500 mb-1">Subject</p>
              <p className="text-sm font-bold text-slate-800">{renderMerged(previewTemplate.subject)}</p>
            </div>
          )}
          <div className="bg-white rounded-lg border border-slate-200 p-4 text-sm text-slate-700 whitespace-pre-line">
            {renderMerged(previewTemplate.body)}
          </div>
        </div>
      )}

      <TemplateEditorModal
        key={editingTemplate?.id ?? 'new'}
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        template={editingTemplate}
        onSave={() => showToast('Template saved successfully')}
      />
      <ActionToast message={toast} />
    </div>
  )
}
