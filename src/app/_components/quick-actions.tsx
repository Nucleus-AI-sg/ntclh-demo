import Link from 'next/link'

const actions = [
  { icon: 'person_add', label: 'Add\nTrainee', href: '/enrolment' },
  { icon: 'apartment', label: 'Partner\nOnboard', href: '/employers' },
  { icon: 'mail', label: 'Bulk\nEmail', href: '/communications' },
  { icon: 'analytics', label: 'Custom\nReport', href: '/analytics' },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map(({ icon, label, href }) => (
        <Link
          key={href}
          href={href}
          className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-50 transition-all group"
        >
          <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600 transition-colors">
            {icon}
          </span>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center leading-tight whitespace-pre-line">
            {label}
          </span>
        </Link>
      ))}
    </div>
  )
}
