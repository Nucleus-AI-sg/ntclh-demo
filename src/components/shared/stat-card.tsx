import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconColourMap = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
} as const

type IconColour = keyof typeof iconColourMap

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  iconColour?: IconColour
  trend?: { value: string; direction: 'up' | 'down' | 'flat' }
  subtitle?: string
  valueClassName?: string
  className?: string
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconColour = 'blue',
  trend,
  subtitle,
  valueClassName,
  className,
}: StatCardProps) {
  const colour = iconColourMap[iconColour]
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown
  const trendColour = trend?.direction === 'up' ? 'text-green-600' : 'text-red-600'

  return (
    <div
      className={cn(
        'bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4',
        className,
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
          colour.bg,
          colour.text,
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <div className="flex items-end gap-2">
          <span
            className={cn(
              'text-2xl font-black text-slate-900 leading-none',
              valueClassName,
            )}
          >
            {value}
          </span>
          {trend && trend.direction !== 'flat' && (
            <span className={cn('text-xs font-bold flex items-center', trendColour)}>
              {trend.value}
              <TrendIcon className="h-3.5 w-3.5 ml-0.5" />
            </span>
          )}
          {subtitle && (
            <span className="text-slate-400 text-xs font-medium truncate">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
