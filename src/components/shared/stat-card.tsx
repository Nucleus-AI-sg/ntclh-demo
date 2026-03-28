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
  const TrendIcon = trend?.direction === 'down' ? TrendingDown : TrendingUp
  const trendColour = trend?.direction === 'up' ? 'text-green-600' : 'text-red-600'

  return (
    <div
      className={cn(
        'bg-white p-3.5 rounded-xl flex items-center gap-3',
        className,
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
          colour.bg,
          colour.text,
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <div className="flex items-end gap-1.5">
          <span
            className={cn(
              'text-xl font-extrabold text-slate-900 leading-none',
              valueClassName,
            )}
          >
            {value}
          </span>
          {trend && trend.direction !== 'flat' && (
            <span className={cn('text-[11px] font-bold flex items-center', trendColour)}>
              {trend.value}
              <TrendIcon className="h-3 w-3 ml-0.5" />
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-slate-400 text-[11px] font-medium truncate mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
