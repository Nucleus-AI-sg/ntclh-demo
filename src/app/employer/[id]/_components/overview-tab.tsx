import { Mail, Phone, Building2, MapPin, Hash, Users } from 'lucide-react'
import { AppLineChart } from '@/components/shared'
import type { Employer } from '@/types'

interface OverviewTabProps {
  employer: Employer
}

const trendByLevel: Record<string, number[]> = {
  high: [65, 70, 72, 78, 82, 85],
  medium: [55, 52, 58, 60, 62, 65],
  low: [58, 55, 50, 48, 45, 40],
}

const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']

export function OverviewTab({ employer }: OverviewTabProps) {
  const scores = trendByLevel[employer.engagementLevel] ?? trendByLevel.medium
  const engagementData = months.map((month, i) => ({ month, score: scores[i] }))
  const contact = employer.contacts.find((c) => c.isPrimary) ?? employer.contacts[0]

  return (
    <div className="space-y-4">
      {/* Company Details Card */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Company Details</h3>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <Hash className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
            <div><dt className="text-[10px] font-bold text-slate-400 uppercase">UEN</dt><dd className="font-semibold text-slate-800">{employer.uen}</dd></div>
          </div>
          <div className="flex items-start gap-2">
            <Building2 className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
            <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Industry</dt><dd className="font-semibold text-slate-800">{employer.sector}</dd></div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
            <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Employees</dt><dd className="font-semibold text-slate-800">{employer.size}</dd></div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
            <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Location</dt><dd className="font-semibold text-slate-800">{employer.location}</dd></div>
          </div>
        </dl>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Relationship Summary</h3>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Partner Since</dt><dd className="font-semibold text-slate-800">{employer.partnerSince}</dd></div>
            <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Total Placements</dt><dd className="font-semibold text-slate-800">{employer.totalPlacements}</dd></div>
            <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Primary Contact</dt><dd className="font-semibold text-slate-800">{contact?.name ?? 'N/A'}</dd></div>
            <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Last Contact</dt><dd className="font-semibold text-slate-800">{employer.lastContactDate}</dd></div>
          </dl>
          {employer.notes && <p className="text-xs text-slate-600 mt-4 italic border-t border-slate-100 pt-3">{employer.notes}</p>}
        </div>
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Engagement Trend</h3>
          <AppLineChart data={engagementData} lines={[{ key: 'score', label: 'Engagement Score', colour: '#2563eb' }]} xKey="month" height={200} />
        </div>
      </div>

      {contact && (
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Contacts</h3>
          <div className="space-y-2">
            {employer.contacts.map((c) => (
              <div key={c.email} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm font-bold text-slate-900">{c.name} {c.isPrimary && <span className="text-[9px] text-blue-600 ml-1">PRIMARY</span>}</p>
                  <p className="text-xs text-slate-500">{c.role}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{c.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{c.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
