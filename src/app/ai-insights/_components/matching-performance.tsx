import { AppScatterChart } from '@/components/shared'
import {
  matchScoreCalibration,
  matchQualityMetrics,
  matchingPatternsDiscovered,
  employerFeedbackRanking,
} from '@/data'

const statusColour: Record<string, string> = {
  established: 'bg-green-50 text-green-700 border-green-200',
  discovered: 'bg-blue-50 text-blue-700 border-blue-200',
  emerging: 'bg-amber-50 text-amber-700 border-amber-200',
}

export function MatchingPerformance() {
  return (
    <div className="space-y-4">
      {/* Match Quality Metrics */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Match Quality Metrics</h3>
          <p className="text-xs text-slate-500 mt-1">Current performance vs 3 months ago</p>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <th className="px-5 py-3">Metric</th>
              <th className="px-5 py-3 text-center">Current</th>
              <th className="px-5 py-3 text-center">3 Months Ago</th>
              <th className="px-5 py-3 text-center">Improvement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {matchQualityMetrics.map((m) => (
              <tr key={m.metric} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-bold text-slate-900">{m.metric}</td>
                <td className="px-5 py-3 text-center font-bold text-blue-600">{m.current}</td>
                <td className="px-5 py-3 text-center text-slate-500">{m.previous}</td>
                <td className="px-5 py-3 text-center text-green-600 font-bold">{m.improvement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scatter Plot */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Match Score Calibration</h3>
        <p className="text-xs text-slate-500 mb-4">
          Correlation between AI match score at submission and employer rating after hire. Strong positive correlation indicates well-calibrated predictions.
        </p>
        <AppScatterChart
          data={matchScoreCalibration}
          xLabel="AI Match Score"
          yLabel="Employer Rating"
          xSuffix="%"
          ySuffix="/5"
          height={300}
          colour="#6366f1"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Matching Patterns */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Matching Patterns Discovered</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {matchingPatternsDiscovered.map((p) => (
              <div key={p.pattern} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{p.pattern}</p>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded border ${statusColour[p.status]}`}>
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-900">{p.successRate}%</p>
                  <p className="text-[10px] text-slate-400">success rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employer Feedback */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Employer Feedback Contribution</h3>
            <p className="text-[10px] text-slate-500 mt-1">
              Employers who provide structured interview feedback see 15% better match quality on subsequent rounds
            </p>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <th className="px-5 py-3">Employer</th>
                <th className="px-5 py-3 text-center">Feedback</th>
                <th className="px-5 py-3 text-center">Match Improvement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employerFeedbackRanking.map((e) => (
                <tr key={e.employer} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-bold text-slate-900">{e.employer}</td>
                  <td className="px-5 py-3 text-center font-bold">{e.feedbackCount}</td>
                  <td className="px-5 py-3 text-center text-green-600 font-bold">{e.matchImprovement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
