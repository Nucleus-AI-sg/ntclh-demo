import Link from 'next/link'
import { AppFunnelChart, StatusBadge } from '@/components/shared'
import type { Trainee } from '@/types'
import { LifecycleStage } from '@/types'

interface EnrolmentPipelineTabProps {
  programmeId: string
  trainees: Trainee[]
}

const pipelineData: Record<string, { name: string; value: number }[]> = {
  ict: [
    { name: 'Enquiries', value: 45 },
    { name: 'Applications', value: 32 },
    { name: 'AI Assessed', value: 32 },
    { name: 'Approved', value: 18 },
    { name: 'Enrolled', value: 8 },
  ],
  ba: [
    { name: 'Enquiries', value: 35 },
    { name: 'Applications', value: 28 },
    { name: 'AI Assessed', value: 28 },
    { name: 'Approved', value: 15 },
    { name: 'Enrolled', value: 6 },
  ],
  dm: [
    { name: 'Enquiries', value: 30 },
    { name: 'Applications', value: 22 },
    { name: 'AI Assessed', value: 22 },
    { name: 'Approved', value: 18 },
    { name: 'Enrolled', value: 18 },
  ],
}

const earlyStages = new Set([
  LifecycleStage.Applied,
])

export function EnrolmentPipelineTab({ programmeId, trainees }: EnrolmentPipelineTabProps) {
  const funnelData = pipelineData[programmeId] ?? pipelineData.ict
  const queueTrainees = trainees.filter((t) => earlyStages.has(t.lifecycleStage)).slice(0, 8)

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Enrolment Funnel</h3>
        <AppFunnelChart data={funnelData} height={250} />
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Application Queue</h3>
          <Link href="/enrolment" className="text-xs text-blue-600 hover:underline font-bold">
            View in Enrolment &rarr;
          </Link>
        </div>

        {queueTrainees.length === 0 ? (
          <p className="text-sm text-slate-500">No pending applications for this programme.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Applied</th>
                <th className="text-left py-2">Stage</th>
                <th className="text-left py-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {queueTrainees.map((t) => (
                <tr key={t.id} className="border-b border-slate-50">
                  <td className="py-2">
                    <Link href={`/trainee/${t.id}`} className="text-blue-600 hover:underline font-medium">
                      {t.name}
                    </Link>
                  </td>
                  <td className="py-2 text-slate-500">{t.applicationDate}</td>
                  <td className="py-2"><StatusBadge status={t.lifecycleStage} /></td>
                  <td className="py-2"><StatusBadge status={t.riskLevel} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
