'use client'

import { Edit } from 'lucide-react'
import type { Employer } from '@/types'

interface PreferencesTabProps {
  employer: Employer
  showToast: (msg: string) => void
}

export function PreferencesTab({ employer, showToast }: PreferencesTabProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Hiring Preferences</h3>
        <button onClick={() => showToast('Preferences updated')} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"><Edit className="h-3 w-3" /> Edit</button>
      </div>
      <dl className="space-y-4 text-sm">
        <div>
          <dt className="text-[10px] font-bold text-slate-400 uppercase">Preferred Backgrounds</dt>
          <dd className="flex flex-wrap gap-1.5 mt-1">{employer.hiringPreferences.preferredBackgrounds.map((b) => <span key={b} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-semibold">{b}</span>)}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold text-slate-400 uppercase">Technical Skills</dt>
          <dd className="flex flex-wrap gap-1.5 mt-1">{employer.hiringPreferences.technicalSkills.map((s) => <span key={s} className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded text-[10px] font-semibold">{s}</span>)}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold text-slate-400 uppercase">Soft Skills</dt>
          <dd className="flex flex-wrap gap-1.5 mt-1">{employer.hiringPreferences.softSkills.map((s) => <span key={s} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-semibold">{s}</span>)}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold text-slate-400 uppercase">Cultural Fit</dt>
          <dd className="text-slate-700 mt-1">{employer.hiringPreferences.culturalFit || '-'}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold text-slate-400 uppercase">Salary Range</dt>
          <dd className="font-semibold text-slate-800 mt-1">${employer.hiringPreferences.salaryRange.min.toLocaleString()} - ${employer.hiringPreferences.salaryRange.max.toLocaleString()}</dd>
        </div>
        {employer.hiringPreferences.dealBreakers.length > 0 && (
          <div>
            <dt className="text-[10px] font-bold text-red-500 uppercase">Deal Breakers</dt>
            <dd className="flex flex-wrap gap-1.5 mt-1">{employer.hiringPreferences.dealBreakers.map((d) => <span key={d} className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-[10px] font-semibold">{d}</span>)}</dd>
          </div>
        )}
      </dl>
    </div>
  )
}
