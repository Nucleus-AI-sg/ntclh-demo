import { AppPieChart, AppLineChart } from '@/components/shared'
import { feedbackImpactTimeline, overrideAnalysis } from '@/data'
import type { OverridePattern, AiPerformanceSnapshot } from '@/types'

interface FeedbackOverridesProps {
  overridePatterns: OverridePattern[]
  history: AiPerformanceSnapshot[]
}

export function FeedbackOverrides({ overridePatterns, history }: FeedbackOverridesProps) {
  const totalOverrides = overridePatterns.reduce((s, p) => s + p.count, 0)
  const aiCorrect = overridePatterns.reduce((s, p) => s + p.aiWasRight, 0)
  const pieData = overridePatterns.map((p) => ({ name: p.type, value: p.count }))

  return (
    <div className="space-y-6">
      {/* Override Rate Trend */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Override Rate Trend</h3>
        <AppLineChart
          data={history}
          lines={[{ key: 'overrideRate', label: 'Override Rate (%)', colour: '#ef4444' }]}
          xKey="month"
          height={220}
        />
        <p className="text-xs text-slate-500 mt-2">Override rate decreased from 31% to 18% as model accuracy improved</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Override Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Override Breakdown</h3>
          <AppPieChart data={pieData} innerRadius={60} height={250} />
          <p className="text-xs text-slate-500 mt-2 text-center">{totalOverrides} total overrides, AI was correct in {aiCorrect} cases ({totalOverrides > 0 ? Math.round((aiCorrect / totalOverrides) * 100) : 0}%)</p>
        </div>

        {/* Override Patterns Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Override Patterns</h3>
          </div>
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <th className="px-5 py-3">Pattern</th><th className="px-5 py-3 text-center">Count</th><th className="px-5 py-3 text-center">AI Right</th><th className="px-5 py-3 text-center">AI Wrong</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {overridePatterns.map((p) => (
                <tr key={p.type} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-bold text-slate-900">{p.type}</td>
                  <td className="px-5 py-3 text-center font-bold">{p.count}</td>
                  <td className="px-5 py-3 text-center text-green-600 font-bold">{p.aiWasRight}</td>
                  <td className="px-5 py-3 text-center text-red-600 font-bold">{p.aiWasWrong}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Coordinator Contributors */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Top Coordinator Contributors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {overrideAnalysis.topContributors.map((c) => (
            <div key={c.name} className="border border-slate-200 rounded-lg p-4">
              <p className="text-sm font-bold text-slate-900">{c.name}</p>
              <p className="text-xs text-slate-500 mt-1">{c.feedbackSignals} feedback signals</p>
              <div className="flex gap-4 mt-3">
                <div>
                  <p className="text-lg font-black text-amber-600">{c.overrides}</p>
                  <p className="text-[10px] text-slate-400">Overrides</p>
                </div>
                <div>
                  <p className="text-lg font-black text-green-600">{c.confirmations}</p>
                  <p className="text-[10px] text-slate-400">Confirmations</p>
                </div>
                <div>
                  <p className="text-lg font-black text-blue-600">{c.feedbackSignals ? Math.round((c.overrides / c.feedbackSignals) * 100) : 0}%</p>
                  <p className="text-[10px] text-slate-400">Override Rate</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Impact Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Feedback Impact Timeline</h3>
        <div className="space-y-3">
          {feedbackImpactTimeline.map((item, i) => (
            <div key={i} className="flex gap-4 p-3 bg-slate-50 rounded-lg">
              <span className="text-[10px] font-bold text-blue-600 flex-shrink-0 w-16">{item.date}</span>
              <div>
                <p className="text-xs font-bold text-slate-900">{item.event}</p>
                <p className="text-[10px] text-green-600 font-bold mt-0.5">{item.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
