import { cn } from '@/lib/utils'
import { getStatusColour } from '@/lib/colours'

interface StatusBadgeProps {
  status: string
  label?: string
  className?: string
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const colour = getStatusColour(status)
  const displayLabel = label ?? status.replace(/_/g, ' ')

  return (
    <span
      className={cn(
        'inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider',
        colour.bg,
        colour.text,
        className,
      )}
    >
      {displayLabel}
    </span>
  )
}
