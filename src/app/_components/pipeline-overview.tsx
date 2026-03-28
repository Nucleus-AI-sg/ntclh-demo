import { pipelineCounts } from '@/data'

const stages = [
  { key: 'applied' as const, label: 'Applied', bar: 'bg-slate-200', badge: 'bg-slate-200', badgeText: 'text-slate-600' },
  { key: 'enrolled' as const, label: 'Enrolled', bar: 'bg-blue-200', badge: 'bg-blue-100', badgeText: 'text-blue-700' },
  { key: 'training' as const, label: 'Training', bar: 'bg-blue-400', badge: 'bg-blue-100', badgeText: 'text-blue-700' },
  { key: 'completed' as const, label: 'Completed', bar: 'bg-teal-400', badge: 'bg-teal-100', badgeText: 'text-teal-700' },
  { key: 'placed' as const, label: 'Placed', bar: 'bg-teal-600', badge: 'bg-teal-200', badgeText: 'text-teal-800' },
  { key: 'verified' as const, label: 'Verified', bar: 'bg-blue-600', badge: 'bg-blue-600', badgeText: 'text-white' },
]

export function PipelineOverview() {
  return (
    <div className="bg-white p-4 rounded-xl overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Placement Pipeline Overview
        </h3>
        <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
          View All Stages
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
      <div className="flex gap-3 min-w-[900px]">
        {stages.map((stage) => {
          const count = pipelineCounts[stage.key]
          const isVerified = stage.key === 'verified'
          return (
            <div
              key={stage.key}
              className={
                isVerified
                  ? 'flex-1 bg-blue-50 p-2.5 rounded-lg border border-blue-100 ring-1 ring-blue-200'
                  : 'flex-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100'
              }
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[9px] font-extrabold uppercase tracking-widest ${isVerified ? 'text-blue-700' : 'text-slate-500'}`}>
                  {stage.label}
                </span>
                <span className={`${stage.badge} ${stage.badgeText} text-[9px] font-bold px-1.5 rounded`}>
                  {String(count).padStart(2, '0')}
                </span>
              </div>
              <div className={`h-1 ${stage.bar} w-full rounded-full`} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
