"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

const labelMap: Record<string, string> = {
  "": "Dashboard",
  enrolment: "Enrolment & AI Assessment",
  tracking: "Trainee Tracking & Verification",
  matching: "Placement Matching",
  analytics: "Analytics & Reporting",
  assistant: "AI Chat Assistant",
  trainee: "Trainee Profile",
  employers: "Employers",
  employer: "Employer Profile",
  programmes: "Programmes",
  programme: "Programme Detail",
  communications: "Communications Hub",
  documents: "Document Centre",
  "ai-insights": "AI Insights & Model Performance",
  settings: "Integrations & Settings",
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) {
    return (
      <nav className="flex items-center gap-1 px-6 py-3 text-sm text-muted-foreground">
        <span className="text-foreground font-medium">Dashboard</span>
      </nav>
    )
  }

  return (
    <nav className="flex items-center gap-1 px-6 py-3 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground transition-colors">
        Dashboard
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const isLast = index === segments.length - 1
        const label = labelMap[segment] ?? decodeURIComponent(segment)

        return (
          <span key={href} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link
                href={href}
                className="hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
