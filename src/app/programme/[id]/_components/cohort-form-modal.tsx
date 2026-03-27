'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Programme, Cohort } from '@/types'

interface CohortFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (name: string) => void
  programme: Programme
  cohort: Cohort | null
}

function addWeeks(date: string, weeks: number): string {
  const d = new Date(date)
  d.setDate(d.getDate() + weeks * 7)
  return d.toISOString().split('T')[0]
}

export function CohortFormModal({ open, onClose, onSave, programme, cohort }: CohortFormModalProps) {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [capacity, setCapacity] = useState(programme.cohortCapacity)
  const [instructor, setInstructor] = useState('')

  useEffect(() => {
    if (cohort) {
      setName(cohort.name)
      setStartDate(cohort.startDate)
      setEndDate(cohort.endDate)
      setCapacity(cohort.capacity)
      setInstructor('')
    } else {
      setName('')
      setStartDate('')
      setEndDate('')
      setCapacity(programme.cohortCapacity)
      setInstructor('')
    }
  }, [open, cohort, programme.cohortCapacity])

  useEffect(() => {
    if (startDate && !cohort) {
      setEndDate(addWeeks(startDate, programme.durationWeeks))
    }
  }, [startDate, programme.durationWeeks, cohort])

  const handleSubmit = () => {
    if (!name.trim() || !startDate) return
    onSave(name.trim())
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{cohort ? 'Edit Cohort' : 'Create New Cohort'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Cohort Name</label>
            <Input
              placeholder="e.g. Jun 2026"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-8 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Capacity</label>
              <Input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Lead Instructor</label>
              <Input
                placeholder="e.g. Dr. Tan"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSubmit} disabled={!name.trim() || !startDate}>
            {cohort ? 'Save Changes' : 'Create Cohort'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
