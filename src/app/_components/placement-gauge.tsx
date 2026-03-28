import { dashboardKpis, pipelineCounts } from '@/data'

const rate = dashboardKpis.overallPlacementRate.value
const successful = pipelineCounts.placed + pipelineCounts.verified
const targetGap = dashboardKpis.overallPlacementRate.target - rate

const circumference = 2 * Math.PI * 56
const offset = circumference * (1 - rate / 100)

export function PlacementGauge() {
  return (
    <div className="bg-white p-4 rounded-xl">
      <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-4">
        Placement Target Goal
      </h3>
      <div className="relative flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            className="text-slate-100"
            cx="64" cy="64" r="56"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
          />
          <circle
            className="text-blue-600"
            cx="64" cy="64" r="56"
            fill="transparent"
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeWidth="10"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-slate-900 leading-none">{rate}%</span>
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            Efficiency
          </span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Successful
          </span>
          <span className="font-bold text-slate-900">{successful}</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" /> Target Gap
          </span>
          <span className="font-bold text-slate-900">{targetGap}</span>
        </div>
      </div>
    </div>
  )
}
