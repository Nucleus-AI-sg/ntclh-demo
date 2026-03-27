'use client'

import { useState, useMemo } from 'react'
import { Mail, MessageSquare, Smartphone, Eye, EyeOff } from 'lucide-react'
import { FilterBar } from '@/components/shared'
import type { MessageTemplate, TemplateCategory } from '@/types'

const channelIcon: Record<string, React.ReactNode> = {
  email: <Mail className="h-3.5 w-3.5" />,
  sms: <MessageSquare className="h-3.5 w-3.5" />,
  whatsapp: <Smartphone className="h-3.5 w-3.5" />,
}

const categoryLabels: Record<TemplateCategory, string> = {
  enrolment: 'Enrolment',
  training: 'Training',
  post_training: 'Post-Training',
  employer: 'Employer',
  administrative: 'Administrative',
}

const sampleData: Record<string, string> = {
  trainee_name: 'Marcus Lee',
  programme_name: 'Business Analyst Certification',
  start_date: '3 Mar 2026',
  venue: 'NTUC LearningHub, Level 5',
  coordinator_name: 'Sarah Tan',
  application_ref: 'APP-2026-0142',
  module_name: 'Module 1: Business Fundamentals',
  new_date: '10 Mar 2026',
  score: '82',
  grade: 'Merit',
  additional_feedback: 'Strong analytical skills demonstrated in case study.',
  document_deadline: '31 Mar 2026',
  employer_name: 'TechCorp Pte Ltd',
  contact_name: 'Jennifer Loh',
  role_title: 'Junior Business Analyst',
  match_score: '87',
  available_date: '1 Apr 2026',
  submission_date: '10 Mar 2026',
  additional_count: '3',
  interview_date: '18 Mar 2026',
  status_change: 'Placed',
  new_status: 'Placed - Verified',
  reason: 'Employment verification documents confirmed.',
  deadline_description: 'Employment document submission',
  deadline_date: '31 Mar 2026',
  pending_item: 'employment documents',
  cohort_date: 'January 2026',
}

function renderMerged(text: string) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => sampleData[key] ?? `{{${key}}}`)
}

interface TemplatesTabProps {
  templates: MessageTemplate[]
}

export function TemplatesTab({ templates }: TemplatesTabProps) {
  const [categoryFilter, setCategoryFilter] = useState('__all__')
  const [preview, setPreview] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (categoryFilter === '__all__') return templates
    return templates.filter((t) => t.category === categoryFilter)
  }, [templates, categoryFilter])

  const previewTemplate = preview ? templates.find((t) => t.id === preview) : null

  const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({ value, label }))

  return (
    <div className="space-y-4">
      <FilterBar
        filters={[{ id: 'category', label: 'All Categories', options: categoryOptions, value: categoryFilter, onChange: setCategoryFilter }]}
      />

      <div className="grid gap-3">
        {filtered.map((t) => (
          <div key={t.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                  {channelIcon[t.channel]}
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
              <button
                onClick={() => setPreview(preview === t.id ? null : t.id)}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                {preview === t.id ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                {preview === t.id ? 'Close' : 'Preview'}
              </button>
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
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
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
    </div>
  )
}
