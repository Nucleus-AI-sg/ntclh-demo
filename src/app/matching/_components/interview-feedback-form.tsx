'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InterviewFeedbackFormProps {
  onSubmit: () => void
  onCancel: () => void
}

export function InterviewFeedbackForm({ onSubmit, onCancel }: InterviewFeedbackFormProps) {
  const [ratings, setRatings] = useState({ technical: 0, communication: 0, cultural: 0 })
  const [comment, setComment] = useState('')

  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Interview Feedback</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {(['technical', 'communication', 'cultural'] as const).map((key) => (
          <div key={key}>
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1 capitalize">{key} Skills</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRatings((r) => ({ ...r, [key]: n }))} className={cn('p-1', n <= ratings[key] ? 'text-amber-400' : 'text-slate-200')}>
                  <Star className="h-5 w-5" fill={n <= ratings[key] ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Additional comments..."
        className="w-full border border-slate-200 rounded-lg p-3 text-xs mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
      />
      <div className="flex gap-2">
        <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">
          Submit Feedback
        </button>
        <button onClick={onCancel} className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50">
          Cancel
        </button>
      </div>
    </div>
  )
}
