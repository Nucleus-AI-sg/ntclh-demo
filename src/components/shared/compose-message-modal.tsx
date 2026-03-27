'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const channels = ['Email', 'SMS', 'WhatsApp'] as const
type Channel = (typeof channels)[number]

const templates = [
  'Follow-up Reminder',
  'Document Request',
  'Interview Invitation',
  'Placement Confirmation',
  'Programme Update',
] as const

interface ComposeMessageModalProps {
  open: boolean
  onClose: () => void
  onSend?: (data: { channel: Channel; recipient: string; subject: string; body: string }) => void
  recipient?: string
}

export function ComposeMessageModal({ open, onClose, onSend, recipient = '' }: ComposeMessageModalProps) {
  const [channel, setChannel] = useState<Channel>('Email')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const handleSend = () => {
    onSend?.({ channel, recipient, subject, body })
    setChannel('Email')
    setSubject('')
    setBody('')
    onClose()
  }

  const handleTemplateSelect = (template: string) => {
    setSubject(template)
    setBody(`Dear ${recipient || 'Recipient'},\n\nThis is regarding: ${template}.\n\nBest regards,\nSarah Tan\nProgramme Coordinator`)
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Compose Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex gap-3">
            <Select value={channel} onValueChange={(v) => setChannel(v as Channel)}>
              <SelectTrigger className="w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {channels.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleTemplateSelect}>
              <SelectTrigger className="flex-1 text-xs">
                <SelectValue placeholder="Select template..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {recipient && (
            <div className="text-xs text-slate-500">
              To: <span className="font-medium text-slate-700">{recipient}</span>
            </div>
          )}
          {channel === 'Email' && (
            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-sm"
            />
          )}
          <Textarea
            placeholder="Write your message..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="text-sm resize-none"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSend} disabled={!body.trim()}>
            <Send className="h-3.5 w-3.5 mr-1.5" />
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
