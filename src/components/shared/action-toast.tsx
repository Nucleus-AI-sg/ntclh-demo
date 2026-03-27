'use client'

import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastVariant = 'success' | 'warning' | 'info'

interface ActionToastProps {
  message: string | null
  variant?: ToastVariant
  duration?: number
  onDismiss?: () => void
}

const variantStyles: Record<ToastVariant, { bg: string; icon: React.ReactNode }> = {
  success: {
    bg: 'bg-green-600',
    icon: <CheckCircle2 className="h-4 w-4 shrink-0" />,
  },
  warning: {
    bg: 'bg-amber-600',
    icon: <AlertTriangle className="h-4 w-4 shrink-0" />,
  },
  info: {
    bg: 'bg-blue-600',
    icon: <Info className="h-4 w-4 shrink-0" />,
  },
}

export function ActionToast({ message, variant = 'success', duration = 3000, onDismiss }: ActionToastProps) {
  const [visible, setVisible] = useState(false)

  const dismiss = useCallback(() => {
    setVisible(false)
    onDismiss?.()
  }, [onDismiss])

  useEffect(() => {
    if (!message) { setVisible(false); return }
    setVisible(true)
    const timer = setTimeout(dismiss, duration)
    return () => clearTimeout(timer)
  }, [message, duration, dismiss])

  if (!visible || !message) return null

  const { bg, icon } = variantStyles[variant]

  return (
    <div className={cn('fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium', bg)}>
      {icon}
      <span>{message}</span>
      <button onClick={dismiss} className="ml-2 hover:opacity-80">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

/** Hook to manage toast state. Returns [toastMessage, showToast, clearToast]. */
export function useActionToast() {
  const [toast, setToast] = useState<string | null>(null)
  const show = useCallback((msg: string) => setToast(msg), [])
  const clear = useCallback(() => setToast(null), [])
  return [toast, show, clear] as const
}
