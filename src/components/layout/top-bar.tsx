"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
  "/": "Programme Command Centre",
  "/enrolment": "Enrolment & AI Assessment",
  "/tracking": "Trainee Tracking & Verification",
  "/matching": "Placement Matching Engine",
  "/analytics": "Analytics & Reporting",
  "/assistant": "AI Chat Assistant",
  "/employers": "Employer Directory",
  "/programmes": "Programme Management",
  "/communications": "Communications Hub",
  "/documents": "Document Centre",
  "/ai-insights": "AI Insights & Model Performance",
  "/settings": "Integrations & Settings",
}

const breadcrumbLabels: Record<string, string> = {
  "": "Portal",
  enrolment: "Enrolment",
  tracking: "Tracking",
  matching: "Matching",
  analytics: "Analytics",
  assistant: "Assistant",
  trainee: "Trainee",
  employers: "Employers",
  employer: "Employer",
  programmes: "Programmes",
  programme: "Programme",
  communications: "Communications",
  documents: "Documents",
  "ai-insights": "AI Insights",
  settings: "Settings",
}

export function TopBar() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const baseRoute = "/" + (segments[0] ?? "")
  const title = pageTitles[baseRoute] ?? pageTitles[pathname] ?? "Dashboard"

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      {/* Breadcrumb row */}
      <div className="flex items-center justify-between px-6 pt-2.5 pb-1">
        <nav className="flex text-[9px] font-medium text-slate-400 uppercase tracking-widest gap-1.5 items-center">
          <Link href="/" className="hover:text-blue-600 transition-colors">Portal</Link>
          {segments.length === 0 ? (
            <>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="text-slate-600">Dashboard</span>
            </>
          ) : (
            segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/")
              const isLast = index === segments.length - 1
              const label = breadcrumbLabels[segment] ?? decodeURIComponent(segment)
              return (
                <span key={href} className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                  {isLast ? (
                    <span className="text-slate-600">{label}</span>
                  ) : (
                    <Link href={href} className="hover:text-blue-600 transition-colors">{label}</Link>
                  )}
                </span>
              )
            })
          )}
        </nav>

        {/* Actions - top-right */}
        <div className="flex items-center gap-2.5">
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]">search</span>
            <input
              className="pl-7 pr-3 py-1 bg-slate-50 border border-slate-100 rounded-md text-[11px] w-48 focus:ring-1 focus:ring-blue-500 focus:border-blue-300 transition-all outline-none placeholder:text-slate-400"
              placeholder="Search..."
              type="text"
            />
          </div>

          <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-md relative transition-colors">
            <span className="material-symbols-outlined text-[18px]">notifications</span>
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>

          <div className="h-4 w-px bg-slate-150" />

          <button className="flex items-center gap-1 px-2.5 py-1 text-slate-500 font-medium text-[11px] rounded-md hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export</span>
          </button>

          <button className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 text-white font-semibold text-[11px] rounded-md hover:bg-blue-700 transition-all">
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Alert</span>
          </button>
        </div>
      </div>

      {/* Title row */}
      <div className="px-6 pb-2.5">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
          {title}
        </h2>
      </div>
    </header>
  )
}
