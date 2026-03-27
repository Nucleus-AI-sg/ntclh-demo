'use client'

import { useState } from 'react'
import { X, ChevronRight, ChevronLeft, Check, Users, FileText, Mail, Clock, Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { templateSampleData } from '@/data'

const steps = [
  { id: 'audience', label: 'Audience', icon: Users },
  { id: 'template', label: 'Template', icon: FileText },
  { id: 'channel', label: 'Channel', icon: Mail },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'confirm', label: 'Confirm', icon: Eye },
] as const

const audienceOptions = [
  { id: 'ba-jan', label: 'BA Certification - Jan 2026', count: 18 },
  { id: 'ict-jan', label: 'ICT Career Conversion - Jan 2026', count: 22 },
  { id: 'dm-jan', label: 'Digital Marketing - Jan 2026', count: 16 },
  { id: 'pending-docs', label: 'Pending document submission', count: 8 },
  { id: 'employers-active', label: 'Active employers', count: 12 },
]

const templateOptions = [
  { id: 'tpl-007', name: 'Document Request', category: 'Post-Training' },
  { id: 'tpl-001', name: 'Welcome Email', category: 'Enrolment' },
  { id: 'tpl-010', name: 'Candidate Submission', category: 'Employer' },
  { id: 'tpl-004', name: 'Schedule Update', category: 'Training' },
  { id: 'tpl-013', name: 'Status Change Notification', category: 'Administrative' },
]

const channelOptions = [
  { id: 'email', label: 'Email', description: 'Rich text with attachments' },
  { id: 'sms', label: 'SMS', description: 'Plain text, 160 characters' },
  { id: 'whatsapp', label: 'WhatsApp', description: 'Rich text with media' },
]

interface CampaignWizardProps {
  onClose: () => void
}

export function CampaignWizard({ onClose }: CampaignWizardProps) {
  const [step, setStep] = useState(0)
  const [audience, setAudience] = useState<string | null>(null)
  const [template, setTemplate] = useState<string | null>(null)
  const [channel, setChannel] = useState<string | null>(null)
  const [schedule, setSchedule] = useState<'now' | 'later'>('now')
  const [sent, setSent] = useState(false)

  const canNext = step === 0 ? !!audience
    : step === 1 ? !!template
    : step === 2 ? !!channel
    : step === 3 ? true
    : false

  const selectedAudience = audienceOptions.find((a) => a.id === audience)
  const selectedTemplate = templateOptions.find((t) => t.id === template)
  const selectedChannel = channelOptions.find((c) => c.id === channel)

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">Create Campaign</DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-4">
          {steps.map((s, i) => {
            const Icon = s.icon
            const isActive = i === step
            const isDone = i < step || sent
            return (
              <div key={s.id} className="flex items-center gap-1 flex-1">
                <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-bold w-full justify-center transition-colors ${isDone ? 'bg-green-50 text-green-700' : isActive ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-400'}`}>
                  {isDone ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && <ChevronRight className="h-3 w-3 text-slate-300 flex-shrink-0" />}
              </div>
            )
          })}
        </div>

        {/* Step content */}
        <div className="min-h-[200px]">
          {sent ? (
            <SuccessPanel audience={selectedAudience} />
          ) : step === 0 ? (
            <AudienceStep audience={audience} onSelect={setAudience} />
          ) : step === 1 ? (
            <TemplateStep template={template} onSelect={setTemplate} />
          ) : step === 2 ? (
            <ChannelStep channel={channel} onSelect={setChannel} />
          ) : step === 3 ? (
            <ScheduleStep schedule={schedule} onSelect={setSchedule} />
          ) : (
            <ConfirmStep audience={selectedAudience} template={selectedTemplate} channel={selectedChannel} schedule={schedule} />
          )}
        </div>

        {/* Footer */}
        {!sent && (
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button onClick={step === 0 ? onClose : () => setStep(step - 1)} className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700">
              {step === 0 ? <X className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
              {step === 0 ? 'Cancel' : 'Back'}
            </button>
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canNext}
                className="flex items-center gap-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 px-4 py-2 rounded-lg transition-colors"
              >
                Next <ChevronRight className="h-3 w-3" />
              </button>
            ) : (
              <button
                onClick={() => setSent(true)}
                className="flex items-center gap-1 text-xs font-bold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Check className="h-3 w-3" /> Send Campaign
              </button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function AudienceStep({ audience, onSelect }: { audience: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 mb-3">Select the target audience for this campaign.</p>
      {audienceOptions.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${audience === opt.id ? 'border-blue-300 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}
        >
          <p className="text-xs font-bold text-slate-900">{opt.label}</p>
          <p className="text-[10px] text-slate-500">{opt.count} recipients</p>
        </button>
      ))}
    </div>
  )
}

function TemplateStep({ template, onSelect }: { template: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 mb-3">Choose a message template or compose a new one.</p>
      {templateOptions.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${template === opt.id ? 'border-blue-300 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}
        >
          <p className="text-xs font-bold text-slate-900">{opt.name}</p>
          <p className="text-[10px] text-slate-500">{opt.category}</p>
        </button>
      ))}
    </div>
  )
}

function ChannelStep({ channel, onSelect }: { channel: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 mb-3">Select the delivery channel.</p>
      {channelOptions.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${channel === opt.id ? 'border-blue-300 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}
        >
          <p className="text-xs font-bold text-slate-900">{opt.label}</p>
          <p className="text-[10px] text-slate-500">{opt.description}</p>
        </button>
      ))}
    </div>
  )
}

function ScheduleStep({ schedule, onSelect }: { schedule: 'now' | 'later'; onSelect: (v: 'now' | 'later') => void }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 mb-3">When should this campaign be sent?</p>
      <button
        onClick={() => onSelect('now')}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${schedule === 'now' ? 'border-blue-300 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}
      >
        <p className="text-xs font-bold text-slate-900">Send now</p>
        <p className="text-[10px] text-slate-500">Campaign will be dispatched immediately</p>
      </button>
      <button
        onClick={() => onSelect('later')}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${schedule === 'later' ? 'border-blue-300 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}
      >
        <p className="text-xs font-bold text-slate-900">Schedule for later</p>
        <p className="text-[10px] text-slate-500">Tuesday 10:00 (recommended best time)</p>
      </button>
    </div>
  )
}

function ConfirmStep({
  audience,
  template,
  channel,
  schedule,
}: {
  audience?: { label: string; count: number } | null
  template?: { name: string; category: string } | null
  channel?: { label: string } | null
  schedule: 'now' | 'later'
}) {
  const previewBody = 'Dear {{trainee_name}},\n\nPlease upload your employment documents by {{document_deadline}}.'
  const rendered = previewBody.replace(/\{\{(\w+)\}\}/g, (_, key) => templateSampleData[key] ?? `{{${key}}}`)

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">Review your campaign before sending.</p>
      <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 space-y-3">
        <Row label="Audience" value={`${audience?.label ?? '-'} (${audience?.count ?? 0} recipients)`} />
        <Row label="Template" value={template?.name ?? '-'} />
        <Row label="Channel" value={channel?.label ?? '-'} />
        <Row label="Schedule" value={schedule === 'now' ? 'Send immediately' : 'Tuesday 10:00'} />
      </div>

      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Message preview (first recipient)</p>
        <div className="bg-white rounded-lg border border-slate-200 p-4 text-sm text-slate-700 whitespace-pre-line">
          {rendered}
        </div>
      </div>
    </div>
  )
}

function SuccessPanel({ audience }: { audience?: { label: string; count: number } | null }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
        <Check className="h-6 w-6 text-green-600" />
      </div>
      <p className="text-sm font-bold text-slate-900 mb-1">Campaign sent successfully</p>
      <p className="text-xs text-slate-500">
        {audience?.count ?? 0} recipients will receive the message shortly.
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-xs text-slate-700 text-right">{value}</p>
    </div>
  )
}
