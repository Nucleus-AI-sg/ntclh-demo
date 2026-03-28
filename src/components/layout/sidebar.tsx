"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navGroups = [
  {
    label: "Operations",
    items: [
      { href: "/", label: "Overview", icon: "dashboard" },
      { href: "/enrolment", label: "Enrolment", icon: "person_add" },
      { href: "/tracking", label: "Tracking", icon: "fact_check" },
      { href: "/matching", label: "Matching", icon: "alt_route" },
    ],
  },
  {
    label: "Management",
    items: [
      { href: "/programmes", label: "Programmes", icon: "school" },
      { href: "/employers", label: "Employers", icon: "apartment" },
      { href: "/communications", label: "Communications", icon: "mail" },
      { href: "/documents", label: "Documents", icon: "description" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/analytics", label: "Analytics", icon: "insights" },
      { href: "/ai-insights", label: "AI Insights", icon: "query_stats" },
      { href: "/assistant", label: "Assistant", icon: "smart_toy" },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/settings", label: "Settings", icon: "settings" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-slate-50 border-r border-slate-200 flex flex-col pt-3 pb-4 z-50 overflow-hidden">
      {/* Logo */}
      <div className="px-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-white">
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              hub
            </span>
          </div>
          <h1 className="text-base font-bold text-blue-700 tracking-tight">
            Nucleus AI
          </h1>
        </div>
        <p className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 mt-0.5">
          Coordinator Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 sidebar-scroll">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="px-2.5 mb-1 text-[9px] font-semibold text-slate-500 uppercase tracking-wider">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-[3px] border-blue-600"
                        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600 rounded"
                    )}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={
                        isActive
                          ? { fontVariationSettings: "'FILL' 1" }
                          : undefined
                      }
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 pt-3 border-t border-slate-200">
        <div className="flex items-center gap-2.5 px-2.5 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm">
            ST
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-bold text-slate-900 truncate">Sarah Tan</p>
            <p className="text-[9px] text-slate-500 truncate">Programme Coordinator</p>
          </div>
        </div>
        <div className="space-y-0.5">
          <a
            href="#"
            className="flex items-center gap-2.5 px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded text-[11px] font-semibold uppercase tracking-wider transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">contact_support</span>
            <span>Support</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2.5 px-2.5 py-1.5 text-red-600 hover:bg-red-50 rounded text-[11px] font-semibold uppercase tracking-wider transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </aside>
  )
}
