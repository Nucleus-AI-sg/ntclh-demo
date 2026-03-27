'use client'

import { useState } from 'react'
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const statusOptions = [
  { value: 'verified', label: 'Verified & Complete' },
  { value: 'placed', label: 'Placed' },
  { value: 'completed', label: 'Completed' },
  { value: 'non_responsive', label: 'Non-Responsive' },
]

interface BulkStatusModalProps {
  open: boolean
  onClose: () => void
  selectedCount: number
  onConfirm: (status: string) => void
}

export function BulkStatusModal({ open, onClose, selectedCount, onConfirm }: BulkStatusModalProps) {
  const [targetStatus, setTargetStatus] = useState('')

  const handleConfirm = () => {
    onConfirm(targetStatus)
    setTargetStatus('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Bulk Status Update</DialogTitle>
          <DialogDescription>
            Update status for {selectedCount} selected trainee{selectedCount !== 1 ? 's' : ''}.
          </DialogDescription>
        </DialogHeader>
        <Select value={targetStatus} onValueChange={setTargetStatus}>
          <SelectTrigger className="text-xs"><SelectValue placeholder="Select target status..." /></SelectTrigger>
          <SelectContent>
            {statusOptions.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleConfirm} disabled={!targetStatus}>
            Update {selectedCount} Trainee{selectedCount !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
