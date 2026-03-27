'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const rejectionReasons = [
  'Not Eligible',
  'Insufficient Documentation',
  'Programme Full',
  'Does Not Meet Prerequisites',
  'Duplicate Application',
  'Other',
] as const

interface RejectModalProps {
  open: boolean
  applicantName: string
  onConfirm: (reason: string, notes: string) => void
  onCancel: () => void
}

export function RejectModal({ open, applicantName, onConfirm, onCancel }: RejectModalProps) {
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')

  const handleConfirm = () => {
    onConfirm(reason, notes)
    setReason('')
    setNotes('')
  }

  const handleCancel = () => {
    setReason('')
    setNotes('')
    onCancel()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleCancel() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reject Application</DialogTitle>
          <DialogDescription>
            Reject the application from <span className="font-semibold">{applicantName}</span>. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
              Rejection Reason
            </label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select a reason..." />
              </SelectTrigger>
              <SelectContent>
                {rejectionReasons.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
              Additional Notes (Optional)
            </label>
            <Textarea
              placeholder="Add any additional context..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="text-sm resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
          <Button variant="destructive" size="sm" onClick={handleConfirm} disabled={!reason}>
            Reject Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
