import { cn } from '@/lib/utils'
import { LifecycleStage } from '@/types'

const stages: { key: LifecycleStage; label: string }[] = [
  { key: LifecycleStage.Applied, label: 'Applied' },
  { key: LifecycleStage.Enrolled, label: 'Enrolled' },
  { key: LifecycleStage.Training, label: 'Training' },
  { key: LifecycleStage.Completed, label: 'Completed' },
  { key: LifecycleStage.Placed, label: 'Placed' },
  { key: LifecycleStage.Verified, label: 'Verified' },
]

const stageColours: Record<LifecycleStage, { bar: string; badge: string; badgeText: string }> = {
  [LifecycleStage.Applied]: { bar: 'bg-slate-300', badge: 'bg-slate-200', badgeText: 'text-slate-600' },
  [LifecycleStage.Enrolled]: { bar: 'bg-blue-300', badge: 'bg-blue-100', badgeText: 'text-blue-700' },
  [LifecycleStage.Training]: { bar: 'bg-blue-400', badge: 'bg-blue-100', badgeText: 'text-blue-700' },
  [LifecycleStage.Completed]: { bar: 'bg-teal-400', badge: 'bg-teal-100', badgeText: 'text-teal-700' },
  [LifecycleStage.Placed]: { bar: 'bg-teal-500', badge: 'bg-teal-200', badgeText: 'text-teal-800' },
  [LifecycleStage.Verified]: { bar: 'bg-blue-600', badge: 'bg-blue-600', badgeText: 'text-white' },
}

interface PipelineProps {
  counts: Partial<Record<LifecycleStage, number>>
  className?: string
}

export function PipelineBar({ counts, className }: PipelineProps) {
  const maxCount = Math.max(1, ...stages.map(({ key }) => counts[key] ?? 0))

  return (
    <div className={cn('flex gap-4 min-w-[700px]', className)}>
      {stages.map(({ key, label }) => {
        const colours = stageColours[key]
        const count = counts[key] ?? 0
        const isVerified = key === LifecycleStage.Verified
        const pct = Math.round((count / maxCount) * 100)
        return (
          <div
            key={key}
            className={cn(
              'flex-1 p-3 rounded-lg border',
              isVerified
                ? 'bg-blue-50 border-blue-100 ring-1 ring-blue-200'
                : 'bg-slate-50 border-slate-100',
            )}
          >
            <div className="flex justify-between items-center mb-3">
              <span
                className={cn(
                  'text-[10px] font-black uppercase tracking-widest',
                  isVerified ? 'text-blue-700' : 'text-slate-500',
                )}
              >
                {label}
              </span>
              <span
                className={cn(
                  'text-[10px] font-bold px-1.5 rounded',
                  colours.badge,
                  colours.badgeText,
                )}
              >
                {String(count).padStart(2, '0')}
              </span>
            </div>
            <div className="h-1 bg-slate-200 w-full rounded-full">
              <div className={cn('h-full rounded-full', colours.bar)} style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface StepperProps {
  currentStage: LifecycleStage
  className?: string
}

export function LifecycleStepper({ currentStage, className }: StepperProps) {
  const currentIndex = stages.findIndex((s) => s.key === currentStage)

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {stages.map(({ key, label }, index) => {
        const isComplete = index <= currentIndex
        const isCurrent = index === currentIndex
        return (
          <div key={key} className="flex items-center gap-1">
            {index > 0 && (
              <div
                className={cn(
                  'w-6 h-0.5 rounded-full',
                  index <= currentIndex ? 'bg-blue-500' : 'bg-slate-200',
                )}
              />
            )}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold',
                  isCurrent
                    ? 'bg-blue-600 text-white ring-2 ring-blue-200'
                    : isComplete
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 text-slate-400',
                )}
              >
                {index + 1}
              </div>
              <span
                className={cn(
                  'text-[8px] font-bold uppercase tracking-widest mt-1',
                  isCurrent ? 'text-blue-700' : isComplete ? 'text-slate-600' : 'text-slate-400',
                )}
              >
                {label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
