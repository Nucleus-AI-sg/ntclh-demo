import { AppLineChart, AppBarChart } from '@/components/shared'

const accuracyData = [
  { month: 'Oct 2025', paySlip: 89, cpfStatement: 91, empLetter: 85 },
  { month: 'Nov 2025', paySlip: 91, cpfStatement: 92, empLetter: 87 },
  { month: 'Dec 2025', paySlip: 92, cpfStatement: 93, empLetter: 89 },
  { month: 'Jan 2026', paySlip: 93, cpfStatement: 94, empLetter: 90 },
  { month: 'Feb 2026', paySlip: 94, cpfStatement: 95, empLetter: 92 },
  { month: 'Mar 2026', paySlip: 95, cpfStatement: 96, empLetter: 93 },
]

const fieldAccuracy = [
  { field: 'Employer Name', accuracy: '96%', commonError: 'Abbreviations and Pte/Ltd variations' },
  { field: 'Employee Name', accuracy: '99%', commonError: 'Rare - usually name order differences' },
  { field: 'Salary Amount', accuracy: '93%', commonError: 'Decimal point misread on poor scans' },
  { field: 'Pay Period', accuracy: '91%', commonError: 'Date format variations' },
  { field: 'CPF Amounts', accuracy: '94%', commonError: 'Handwritten annotations cause misreads' },
]

const processingTimeData = [
  { range: '< 1 min', autoVerified: 18, manualReview: 0 },
  { range: '1-2 min', autoVerified: 13, manualReview: 1 },
  { range: '2-5 min', autoVerified: 0, manualReview: 3 },
  { range: '5-10 min', autoVerified: 0, manualReview: 6 },
  { range: '10-15 min', autoVerified: 0, manualReview: 4 },
  { range: '> 15 min', autoVerified: 0, manualReview: 2 },
]

export function OcrPerformance() {
  return (
    <div className="space-y-4">
      {/* Accuracy Trend Chart */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">OCR Accuracy Over Time</h3>
        <AppLineChart
          data={accuracyData}
          lines={[
            { key: 'paySlip', label: 'Pay Slips', colour: '#2563eb' },
            { key: 'cpfStatement', label: 'CPF Statements', colour: '#0d9488' },
            { key: 'empLetter', label: 'Employment Letters', colour: '#6366f1' },
          ]}
          xKey="month"
          height={280}
          showLegend
        />
      </div>

      {/* Processing Time Distribution */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Processing Time Distribution</h3>
        <AppBarChart
          data={processingTimeData}
          bars={[
            { key: 'autoVerified', label: 'Auto-Verified', colour: '#22c55e' },
            { key: 'manualReview', label: 'Manual Review', colour: '#f59e0b' },
          ]}
          xKey="range"
          height={260}
          showLegend
        />
      </div>

      {/* Field-Level Accuracy */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Field-Level Accuracy</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <th className="px-4 py-4">Field</th>
                <th className="px-4 py-4 text-center">Accuracy</th>
                <th className="px-4 py-4">Most Common Error</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {fieldAccuracy.map((row) => (
                <tr key={row.field} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-bold text-slate-900">{row.field}</td>
                  <td className="px-4 py-4 text-center font-bold text-green-600">{row.accuracy}</td>
                  <td className="px-4 py-4 text-xs text-slate-500">{row.commonError}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Issues */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h3 className="text-xs font-black text-amber-700 uppercase tracking-widest mb-3">Common Issues & Recommendations</h3>
        <ul className="space-y-2 text-xs text-amber-800">
          <li>Poor scan quality accounts for 60% of low-confidence extractions</li>
          <li>Recommendation: Add upload guidelines for trainees (min 300 DPI, no photos of screens)</li>
          <li>Handwritten annotations on CPF statements reduce accuracy by ~8%</li>
        </ul>
      </div>
    </div>
  )
}
