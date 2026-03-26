'use client'

import { useState } from 'react'
import { Building2, Mail, Phone, MapPin, Calendar, Plus, Edit } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge, AppLineChart } from '@/components/shared'
import type { Employer, Vacancy, Placement, Communication, Trainee } from '@/types'
import { cn } from '@/lib/utils'

interface EmployerProfileProps {
  employer: Employer
  vacancies: Vacancy[]
  placements: Placement[]
  communications: Communication[]
  trainees: Trainee[]
}

const engagementData = [
  { month: 'Oct', score: 65 }, { month: 'Nov', score: 70 }, { month: 'Dec', score: 72 },
  { month: 'Jan', score: 78 }, { month: 'Feb', score: 82 }, { month: 'Mar', score: 85 },
]

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'vacancies', label: 'Vacancies' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'placements', label: 'Placements' },
  { id: 'communications', label: 'Communications' },
] as const

export function EmployerProfile({ employer, vacancies, placements, communications, trainees }: EmployerProfileProps) {
  const [toast, setToast] = useState<string | null>(null)
  const traineeMap = Object.fromEntries(trainees.map((t) => [t.id, t]))
  const contact = employer.contacts.find((c) => c.isPrimary) ?? employer.contacts[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-slate-900">{employer.name}</h1>
              <StatusBadge status={employer.engagementLevel} />
              <StatusBadge status={employer.pipelineHealth} label={`Pipeline: ${employer.pipelineHealth}`} />
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-500">
              <span>{employer.sector}</span><span>-</span>
              <span>{employer.size}</span><span>-</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{employer.location}</span><span>-</span>
              <span>UEN: {employer.uen}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"><Mail className="h-3.5 w-3.5" /> Contact</button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"><Plus className="h-3.5 w-3.5" /> Add Vacancy</button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Relationship Summary</h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Partner Since</dt><dd className="font-semibold text-slate-800">{employer.partnerSince}</dd></div>
                <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Total Placements</dt><dd className="font-semibold text-slate-800">{employer.totalPlacements}</dd></div>
                <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Primary Contact</dt><dd className="font-semibold text-slate-800">{contact?.name ?? 'N/A'}</dd></div>
                <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Last Contact</dt><dd className="font-semibold text-slate-800">{employer.lastContactDate}</dd></div>
              </dl>
              {employer.notes && <p className="text-xs text-slate-600 mt-4 italic border-t border-slate-100 pt-3">{employer.notes}</p>}
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Engagement Trend</h3>
              <AppLineChart data={engagementData} lines={[{ key: 'score', label: 'Engagement Score', colour: '#2563eb' }]} xKey="month" height={200} />
            </div>
          </div>
          {contact && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
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
        </TabsContent>

        {/* Vacancies Tab */}
        <TabsContent value="vacancies" className="mt-6 space-y-3">
          {vacancies.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No vacancies</p>}
          {vacancies.map((v) => (
            <div key={v.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">{v.title}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span>${v.salaryMin.toLocaleString()}-${v.salaryMax.toLocaleString()}</span><span>-</span>
                  <span>{v.location}</span><span>-</span>
                  <span>{v.candidatesSubmitted} candidates</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={v.status} />
                <span className="text-[10px] text-slate-400">{v.postedDate}</span>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="mt-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Hiring Preferences</h3>
              <button onClick={() => { setToast('Preferences updated'); setTimeout(() => setToast(null), 2000) }} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"><Edit className="h-3 w-3" /> Edit</button>
            </div>
            <dl className="space-y-4 text-sm">
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Preferred Backgrounds</dt><dd className="flex flex-wrap gap-1.5 mt-1">{employer.hiringPreferences.preferredBackgrounds.map((b) => <span key={b} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-semibold">{b}</span>)}</dd></div>
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Technical Skills</dt><dd className="flex flex-wrap gap-1.5 mt-1">{employer.hiringPreferences.technicalSkills.map((s) => <span key={s} className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded text-[10px] font-semibold">{s}</span>)}</dd></div>
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Soft Skills</dt><dd className="flex flex-wrap gap-1.5 mt-1">{employer.hiringPreferences.softSkills.map((s) => <span key={s} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-semibold">{s}</span>)}</dd></div>
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Cultural Fit</dt><dd className="text-slate-700 mt-1">{employer.hiringPreferences.culturalFit}</dd></div>
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Salary Range</dt><dd className="font-semibold text-slate-800 mt-1">${employer.hiringPreferences.salaryRange.min.toLocaleString()} - ${employer.hiringPreferences.salaryRange.max.toLocaleString()}</dd></div>
              {employer.hiringPreferences.dealBreakers.length > 0 && (
                <div><dt className="text-[10px] font-bold text-red-500 uppercase">Deal Breakers</dt><dd className="flex flex-wrap gap-1.5 mt-1">{employer.hiringPreferences.dealBreakers.map((d) => <span key={d} className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-[10px] font-semibold">{d}</span>)}</dd></div>
              )}
            </dl>
          </div>
        </TabsContent>

        {/* Placements Tab */}
        <TabsContent value="placements" className="mt-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead><tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <th className="px-5 py-3">Trainee</th><th className="px-5 py-3 text-center">Score</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Retention</th><th className="px-5 py-3 text-center">Rating</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {placements.length === 0 && <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-400">No placements</td></tr>}
                {placements.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-bold text-slate-900">{traineeMap[p.traineeId]?.name ?? p.traineeId}</td>
                    <td className="px-5 py-3 text-center font-bold">{p.matchScore}%</td>
                    <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-5 py-3 text-slate-500">{p.retentionMonths ? `${p.retentionMonths} months` : '-'}</td>
                    <td className="px-5 py-3 text-center">{p.satisfactionRating ? `${p.satisfactionRating}/5` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Communications Tab */}
        <TabsContent value="communications" className="mt-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100">
            {communications.length === 0 && <p className="px-5 py-8 text-sm text-slate-400 text-center">No communications</p>}
            {communications.map((comm) => (
              <div key={comm.id} className="px-5 py-3 flex items-start gap-3 hover:bg-slate-50">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', comm.channel === 'email' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600')}>
                  {comm.channel === 'email' ? <Mail className="h-3.5 w-3.5" /> : <Phone className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-900 truncate">{comm.subject}</p>
                    <StatusBadge status={comm.status} />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 truncate">{comm.preview}</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase mt-1"><Calendar className="h-2.5 w-2.5 inline mr-1" />{comm.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-bold">{toast}</div>}
    </div>
  )
}
