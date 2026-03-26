'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface SlideOverPanelProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  avatarInitials?: string
  children: React.ReactNode
  className?: string
}

export function SlideOverPanel({
  open,
  onClose,
  title,
  subtitle,
  avatarInitials,
  children,
  className,
}: SlideOverPanelProps) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className={cn('w-[450px] sm:max-w-[450px] p-0', className)}
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {avatarInitials && (
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm flex-shrink-0">
                {avatarInitials}
              </div>
            )}
            <div>
              <SheetTitle className="text-sm font-bold text-slate-900">
                {title}
              </SheetTitle>
              {subtitle && (
                <SheetDescription className="text-[10px] text-slate-400 mt-0.5">
                  {subtitle}
                </SheetDescription>
              )}
            </div>
          </div>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="px-6 py-4">{children}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
