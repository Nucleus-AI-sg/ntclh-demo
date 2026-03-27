'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared'

interface ImportPreviewModalProps {
  open: boolean
  fileName: string
  onImport: () => void
  onCancel: () => void
}

const previewRows = [
  { name: 'Marcus Lee', email: 'marcus.lee@email.com', programme: 'Professional Conversion Programme - ICT', status: 'Enrolled' },
  { name: 'Amy Chen', email: 'amy.chen@email.com', programme: 'Career Transition Programme', status: 'Completed' },
  { name: 'David Ng', email: 'david.ng@email.com', programme: 'Professional Conversion Programme - ICT', status: 'Placed' },
]

const columnMappings = [
  { excel: 'Column A: Full Name', nucleus: 'Trainee Name' },
  { excel: 'Column B: Email Address', nucleus: 'Email' },
  { excel: 'Column C: Course Name', nucleus: 'Programme' },
  { excel: 'Column D: Current Status', nucleus: 'Status' },
]

export function ImportPreviewModal({ open, fileName, onImport, onCancel }: ImportPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import Preview - {fileName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-4 text-sm">
            <StatusBadge status="verified" label="847 rows parsed" />
            <StatusBadge status="pending" label="3 duplicates detected" />
            <StatusBadge status="flagged" label="2 missing required fields" />
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Column Mapping</h4>
            <div className="grid grid-cols-2 gap-2">
              {columnMappings.map((cm) => (
                <div key={cm.excel} className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">{cm.excel}</span>
                  <span className="text-slate-300">&rarr;</span>
                  <span className="font-bold text-slate-700">{cm.nucleus}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Data Preview</h4>
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-3 py-2">Name</th><th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Programme</th><th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {previewRows.map((r) => (
                  <tr key={r.name}>
                    <td className="px-3 py-2 font-bold text-slate-900">{r.name}</td>
                    <td className="px-3 py-2 text-slate-600">{r.email}</td>
                    <td className="px-3 py-2 text-slate-600">{r.programme}</td>
                    <td className="px-3 py-2">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={onImport}>Import 847 Records</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
