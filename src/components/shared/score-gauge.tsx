import { cn } from '@/lib/utils'
import { scoreColour } from '@/lib/colours'

const sizeConfig = {
  sm: { size: 40, strokeWidth: 4, radius: 16, fontSize: 'text-xs', labelSize: 'text-[8px]' },
  md: { size: 96, strokeWidth: 8, radius: 38, fontSize: 'text-xl', labelSize: 'text-[9px]' },
  lg: { size: 160, strokeWidth: 12, radius: 70, fontSize: 'text-3xl', labelSize: 'text-[10px]' },
} as const

type GaugeSize = keyof typeof sizeConfig

interface ScoreGaugeProps {
  score: number
  size?: GaugeSize
  label?: string
  showPercentage?: boolean
  className?: string
}

export function ScoreGauge({
  score,
  size = 'md',
  label,
  showPercentage = true,
  className,
}: ScoreGaugeProps) {
  const config = sizeConfig[size]
  const colour = scoreColour(score)
  const circumference = 2 * Math.PI * config.radius
  const offset = circumference * (1 - Math.min(score, 100) / 100)
  const centre = config.size / 2

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={config.size}
        height={config.size}
        className="-rotate-90"
      >
        <circle
          cx={centre}
          cy={centre}
          r={config.radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          className="text-slate-100"
        />
        <circle
          cx={centre}
          cy={centre}
          r={config.radius}
          fill="transparent"
          stroke={colour.stroke}
          strokeWidth={config.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-black leading-none', config.fontSize, colour.text)}>
            {Math.round(score)}%
          </span>
          {label && (
            <span
              className={cn(
                'font-bold text-slate-400 uppercase tracking-widest mt-0.5',
                config.labelSize,
              )}
            >
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
