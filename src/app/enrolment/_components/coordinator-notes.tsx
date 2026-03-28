'use client'

import { useState } from 'react'
import { StickyNote, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface Note {
  id: string
  text: string
  author: string
  date: string
}

interface CoordinatorNotesProps {
  assessmentId: string
}

export function CoordinatorNotes({ assessmentId }: CoordinatorNotesProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [draft, setDraft] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    if (!draft.trim()) return
    const note: Note = {
      id: `note-${assessmentId}-${Date.now()}`,
      text: draft.trim(),
      author: 'Sarah Tan',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
    setNotes((prev) => [note, ...prev])
    setDraft('')
    setIsAdding(false)
  }

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
          <StickyNote className="h-4 w-4 mr-2 text-amber-600" />
          Coordinator Notes
        </h3>
        {!isAdding && (
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setIsAdding(true)}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Note
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="mb-4 space-y-2">
          <Textarea
            placeholder="Add an internal note about this application..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            className="text-sm resize-none"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => { setIsAdding(false); setDraft('') }}>
              Cancel
            </Button>
            <Button size="sm" className="text-xs h-7" onClick={handleAdd} disabled={!draft.trim()}>
              Save Note
            </Button>
          </div>
        </div>
      )}

      {notes.length === 0 && !isAdding && (
        <p className="text-xs text-slate-400 italic">No notes yet. Click &quot;Add Note&quot; to add one.</p>
      )}

      {notes.length > 0 && (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-amber-50/50 border border-amber-100 rounded-lg p-3">
              <p className="text-sm text-slate-700 leading-relaxed">{note.text}</p>
              <p className="text-[10px] text-slate-400 mt-2 font-medium">
                {note.author} - {note.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
