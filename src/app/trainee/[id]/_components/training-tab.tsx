import { StatusBadge } from '@/components/shared'
import { ModuleStatus } from '@/types'
import type { ModuleProgress } from '@/types'

interface TrainingTabProps {
  modules: ModuleProgress[]
}

export function TrainingTab({ modules }: TrainingTabProps) {
  const completed = modules.filter((m) => m.status === ModuleStatus.Completed)
  const avgScore = completed.length > 0
    ? Math.round(completed.reduce((sum, m) => sum + (m.score ?? 0), 0) / completed.length)
    : 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modules Completed</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{completed.length}/{modules.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average Score</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{avgScore}%</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance</p>
          <p className="text-2xl font-black text-slate-900 mt-1">92%</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <th className="px-6 py-4">Module</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Score</th>
                <th className="px-6 py-4">Completed</th>
                <th className="px-6 py-4">Instructor</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {modules.map((mod) => (
                <tr key={mod.moduleId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{mod.moduleName}</td>
                  <td className="px-6 py-4"><StatusBadge status={mod.status} /></td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">{mod.score != null ? `${mod.score}%` : '-'}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{mod.completedDate ?? '-'}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{mod.instructor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
