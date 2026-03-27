'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const channels = ['Email', 'SMS', 'WhatsApp'] as const
const templates = [
  { label: 'Document Reminder', body: 'Please upload your employment verification documents at your earliest convenience.' },
  { label: 'Status Update Request', body: 'We would like to check in on your employment status. Please update your profile.' },
  { label: 'Final Reminder', body: 'This is a final reminder to submit your outstanding documents before escalation.' },
]

interface BulkReminderModalProps {
  open: boolean
  onClose: () => void
  selectedCount: number
  onSend: (data: { channel: string; template: string; body: string }) => void
}

export function BulkReminderModal({ open, onClose, selectedCount, onSend }: BulkReminderModalProps) {
  const [channel, setChannel] = useState('Email')
  const [body, setBody] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value)
    const tpl = templates.find((t) => t.label === value)
    if (tpl) setBody(tpl.body)
  }

  const handleSend = () => {
    onSend({ channel, template: selectedTemplate, body })
    setChannel('Email')
    setBody('')
    setSelectedTemplate('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Bulk Reminder</DialogTitle>
        </DialogHeader>
        <p className="text-xs text-slate-500">Sending to <span className="font-bold text-slate-700">{selectedCount} trainee{selectedCount !== 1 ? 's' : ''}</span></p>
        <div className="space-y-3">
          <div className="flex gap-3">
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger className="w-28 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {channels.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
              <SelectTrigger className="flex-1 text-xs"><SelectValue placeholder="Select template..." /></SelectTrigger>
              <SelectContent>
                {templates.map((t) => <SelectItem key={t.label} value={t.label}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            placeholder="Message body..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className="text-sm resize-none"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSend} disabled={!body.trim()}>
            <Send className="h-3.5 w-3.5 mr-1.5" />
            Send to {selectedCount}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
