'use client'

import Link from 'next/link'
import { StatusBadge } from '@/components/shared'
import type { Placement, Trainee } from '@/types'

interface HiringHistoryTableProps {
  placements: Placement[]
  traineeMap: Record<string, Trainee>
}

export function HiringHistoryTable({ placements, traineeMap }: HiringHistoryTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Hiring History</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <th className="px-5 py-3">Candidate</th>
            <th className="px-5 py-3">Role</th>
            <th className="px-5 py-3 text-center">Score</th>
            <th className="px-5 py-3">Retention</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {placements.length === 0 && <tr><td colSpan={5} className="px-5 py-4 text-center text-slate-400">No hiring history</td></tr>}
          {placements.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50">
              <td className="px-5 py-3 font-bold"><Link href={`/trainee/${p.traineeId}`} className="text-slate-900 hover:text-blue-600">{traineeMap[p.traineeId]?.name ?? p.traineeId}</Link></td>
              <td className="px-5 py-3 text-slate-600">{traineeMap[p.traineeId]?.placedRole ?? '-'}</td>
              <td className="px-5 py-3 text-center font-bold">{p.matchScore}%</td>
              <td className="px-5 py-3 text-slate-500">{p.retentionMonths ? `${p.retentionMonths} months` : '-'}</td>
              <td className="px-5 py-3"><StatusBadge status="hired" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
