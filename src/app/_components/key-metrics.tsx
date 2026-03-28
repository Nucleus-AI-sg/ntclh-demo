import { dashboardKpis } from '@/data'

const kpis = dashboardKpis

export function KeyMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Trainees */}
      <div className="bg-white p-3.5 rounded-xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
          <span className="material-symbols-outlined text-xl">person_search</span>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Trainees</p>
          <div className="flex items-end gap-1.5">
            <span className="text-xl font-extrabold text-slate-900 leading-none">{kpis.totalActiveTrainees.value}</span>
            <span className="text-green-600 text-[11px] font-bold flex items-center">
              +{kpis.totalActiveTrainees.trend}
              <span className="material-symbols-outlined text-xs">trending_up</span>
            </span>
          </div>
        </div>
      </div>

      {/* Placement Rate */}
      <div className="bg-white p-3.5 rounded-xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
          <span className="material-symbols-outlined text-xl">handshake</span>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Placement Rate</p>
          <div className="flex items-end gap-1.5">
            <span className="text-xl font-extrabold text-slate-900 leading-none">{kpis.overallPlacementRate.value}%</span>
            <span className="text-slate-400 text-[11px] font-medium">Global Avg</span>
          </div>
        </div>
      </div>

      {/* Pending Verification */}
      <div className="bg-white p-3.5 rounded-xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
          <span className="material-symbols-outlined text-xl">pending_actions</span>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pending Verification</p>
          <div className="flex items-end gap-1.5">
            <span className="text-xl font-extrabold text-slate-900 leading-none">{kpis.pendingVerifications.value}</span>
            <span className="text-amber-600 text-[9px] font-bold uppercase tracking-wider">Review Required</span>
          </div>
        </div>
      </div>

      {/* At-Risk Placements */}
      <div className="bg-white p-3.5 rounded-xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
          <span className="material-symbols-outlined text-xl">error_outline</span>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">At-Risk Placements</p>
          <div className="flex items-end gap-1.5">
            <span className="text-xl font-extrabold text-red-600 leading-none">{kpis.atRiskPlacements.value}</span>
            <span className="text-red-500 text-[9px] font-bold uppercase tracking-wider">Immediate Action</span>
          </div>
        </div>
      </div>
    </div>
  )
}
