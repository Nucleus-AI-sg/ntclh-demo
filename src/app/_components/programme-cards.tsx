import Link from 'next/link'
import { cn } from '@/lib/utils'
import { programmes, trainees } from '@/data'
import { LifecycleStage } from '@/types'

const programmeColours: Record<string, { badge: string; bar: string; placed: string }> = {
  ict: { badge: 'bg-blue-50 text-blue-600', bar: 'bg-blue-500', placed: 'text-blue-600' },
  ba: { badge: 'bg-teal-50 text-teal-600', bar: 'bg-teal-500', placed: 'text-teal-600' },
  dm: { badge: 'bg-indigo-50 text-indigo-600', bar: 'bg-indigo-500', placed: 'text-indigo-600' },
}

const countStages = [
  { key: LifecycleStage.Enrolled, label: 'Enrolled' },
  { key: LifecycleStage.Training, label: 'Training' },
  { key: LifecycleStage.Completed, label: 'Completed' },
  { key: LifecycleStage.Placed, label: 'Placed' },
] as const

function getCounts(programmeId: string) {
  const programmeTrainees = trainees.filter((t) => t.programmeId === programmeId)
  const counts: Record<string, number> = {}
  for (const stage of Object.values(LifecycleStage)) {
    counts[stage] = programmeTrainees.filter((t) => t.lifecycleStage === stage).length
  }
  return counts
}

export function ProgrammeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {programmes.map((prog) => {
        const counts = getCounts(prog.id)
        const colours = programmeColours[prog.id] ?? programmeColours.ict
        return (
          <Link
            key={prog.id}
            href={`/programme/${prog.id}`}
            className="bg-white p-4 rounded-xl"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{prog.shortName}</h3>
                <p className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">
                  In-Progress Cohort
                </p>
              </div>
              <div className={cn('font-bold px-1.5 py-0.5 rounded text-[11px]', colours.badge)}>
                {prog.placementRate}% Rate
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {countStages.map(({ key, label }) => (
                <div key={key}>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                    {label}
                  </p>
                  <p
                    className={cn(
                      'text-xl font-black',
                      key === LifecycleStage.Placed ? colours.placed : 'text-slate-900',
                    )}
                  >
                    {String(counts[key] ?? 0).padStart(2, '0')}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full', colours.bar)}
                style={{ width: `${prog.placementRate}%` }}
              />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
