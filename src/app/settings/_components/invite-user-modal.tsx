'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface InviteUserModalProps {
  open: boolean
  onInvite: (user: { name: string; email: string; role: string }) => void
  onCancel: () => void
}

const roles = ['Programme Coordinator', 'Account Manager', 'Programme Lead']

export function InviteUserModal({ open, onInvite, onCancel }: InviteUserModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = () => {
    if (!name || !email || !role) return
    onInvite({ name, email, role })
    setName('')
    setEmail('')
    setRole('')
  }

  const handleClose = () => {
    setName('')
    setEmail('')
    setRole('')
    onCancel()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jane Lim" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Email Address</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. jane.lim@ntuc-lhub.sg" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Role</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
              <SelectContent>
                {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button disabled={!name || !email || !role} onClick={handleSubmit}>Send Invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
