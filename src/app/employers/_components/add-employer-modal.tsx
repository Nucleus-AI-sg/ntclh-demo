'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AddEmployerModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
}

export function AddEmployerModal({ open, onClose, onSave }: AddEmployerModalProps) {
  const [name, setName] = useState('')
  const [sector, setSector] = useState('')
  const [uen, setUen] = useState('')
  const [location, setLocation] = useState('')

  const handleSave = () => {
    setName('')
    setSector('')
    setUen('')
    setLocation('')
    onSave()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Employer</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Company Name *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. TechCorp Pte Ltd" className="mt-1 text-sm" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">UEN</label>
            <Input value={uen} onChange={(e) => setUen(e.target.value)} placeholder="e.g. 201512345A" className="mt-1 text-sm" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Sector</label>
            <Input value={sector} onChange={(e) => setSector(e.target.value)} placeholder="e.g. Technology" className="mt-1 text-sm" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Tanjong Pagar" className="mt-1 text-sm" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSave} disabled={!name.trim()}>Add Employer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
