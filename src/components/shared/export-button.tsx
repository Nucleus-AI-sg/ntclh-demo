'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type ExportFormat = 'CSV' | 'PDF' | 'Excel'

interface ExportButtonProps {
  label?: string
  formats?: ExportFormat[]
  onExport?: (format: ExportFormat) => void
  showToast?: (msg: string) => void
  className?: string
}

export function ExportButton({
  label = 'Export',
  formats = ['CSV', 'PDF', 'Excel'],
  onExport,
  showToast,
  className,
}: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const handleExport = (format: ExportFormat) => {
    setExporting(true)
    showToast?.(`Exporting as ${format}...`)

    setTimeout(() => {
      // Create a dummy blob download
      const content = `Demo export - ${format} format\nGenerated: ${new Date().toISOString()}`
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `export.${format.toLowerCase()}`
      a.click()
      URL.revokeObjectURL(url)

      setExporting(false)
      showToast?.('Download complete')
      onExport?.(format)
    }, 1000)
  }

  if (formats.length === 1) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled={exporting}
        onClick={() => handleExport(formats[0])}
        className={cn('text-xs', className)}
      >
        <Download className="h-3.5 w-3.5 mr-1.5" />
        {label}
      </Button>
    )
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Select onValueChange={(v) => handleExport(v as ExportFormat)}>
        <SelectTrigger className="h-8 w-auto text-xs border-slate-200" disabled={exporting}>
          <Download className="h-3.5 w-3.5 mr-1.5" />
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {formats.map((f) => (
            <SelectItem key={f} value={f}>{f}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
