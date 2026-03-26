import Link from 'next/link'
import { UserPlus, Building2, Mail, BarChart3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const actions: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: UserPlus, label: 'Process\nEnrolments', href: '/enrolment' },
  { icon: Building2, label: 'View\nEmployers', href: '/employers' },
  { icon: Mail, label: 'Review\nDocuments', href: '/documents' },
  { icon: BarChart3, label: 'Generate\nReport', href: '/analytics' },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map(({ icon: Icon, label, href }) => (
        <Link
          key={href}
          href={href}
          className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-50 transition-all group"
        >
          <Icon className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center leading-tight whitespace-pre-line">
            {label}
          </span>
        </Link>
      ))}
    </div>
  )
}
