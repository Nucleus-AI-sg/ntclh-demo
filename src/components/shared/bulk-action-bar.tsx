'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BulkAction {
  label: string
  variant?: 'default' | 'destructive' | 'outline'
  onClick: () => void
}

interface BulkActionBarProps {
  selectedCount: number
  actions: BulkAction[]
  onClear: () => void
  className?: string
}

export function BulkActionBar({ selectedCount, actions, onClear, className }: BulkActionBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className={cn(
      'flex items-center gap-3 rounded-lg bg-blue-50 border border-blue-200 px-4 py-2',
      className,
    )}>
      <span className="text-sm font-medium text-blue-700">
        {selectedCount} selected
      </span>
      <div className="flex items-center gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant ?? 'default'}
            size="sm"
            onClick={action.onClick}
            className="text-xs"
          >
            {action.label}
          </Button>
        ))}
      </div>
      <button
        onClick={onClear}
        className="ml-auto text-blue-500 hover:text-blue-700 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
