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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm">
      <div className="flex flex-col">
        {/* Breadcrumbs */}
        <nav className="flex text-[10px] font-medium text-slate-400 uppercase tracking-widest gap-2 items-center">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors"
          >
            Portal
          </Link>
          {segments.length === 0 ? (
            <>
              <span className="material-symbols-outlined text-[12px]">
                chevron_right
              </span>
              <span className="text-slate-900">Dashboard</span>
            </>
          ) : (
            segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/")
              const isLast = index === segments.length - 1
              const label =
                breadcrumbLabels[segment] ?? decodeURIComponent(segment)
              return (
                <span key={href} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[12px]">
                    chevron_right
                  </span>
                  {isLast ? (
                    <span className="text-slate-900">{label}</span>
                  ) : (
                    <Link
                      href={href}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {label}
                    </Link>
                  )}
                </span>
              )
            })
          )}
        </nav>
        {/* Page Title */}
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            placeholder="Search trainees, employers..."
            type="text"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1" />

        {/* Export Report */}
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-50 transition-all">
          <span className="material-symbols-outlined text-lg">download</span>
          <span>Export Report</span>
        </button>

        {/* New Alert */}
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 shadow-sm transition-all active:opacity-70">
          <span className="material-symbols-outlined text-lg">add_alert</span>
          <span>New Alert</span>
        </button>
      </div>
    </header>
  )
}
