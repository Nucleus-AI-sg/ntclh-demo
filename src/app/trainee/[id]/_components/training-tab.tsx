import { StatusBadge } from '@/components/shared'
import { ModuleStatus } from '@/types'
import type { ModuleProgress } from '@/types'

interface TrainingTabProps {
  modules: ModuleProgress[]
}

function formatDate(date: string | undefined): string {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function TrainingTab({ modules }: TrainingTabProps) {
  const completed = modules.filter((m) => m.status === ModuleStatus.Completed)
  const avgScore = completed.length > 0
    ? Math.round(completed.reduce((sum, m) => sum + (m.score ?? 0), 0) / completed.length)
    : 0
  // Derive attendance: completed + in-progress modules count as attended
  const attendedCount = modules.filter((m) => m.status === ModuleStatus.Completed || m.status === ModuleStatus.InProgress).length
  const attendance = modules.length > 0 ? Math.round((attendedCount / modules.length) * 100) : 0

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
          <p className="text-2xl font-black text-slate-900 mt-1">{attendance}%</p>
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
                  <td className="px-6 py-4 text-xs text-slate-500">{formatDate(mod.completedDate)}</td>
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
