"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  UserPlus,
  ClipboardCheck,
  Handshake,
  GraduationCap,
  Building2,
  MessageSquare,
  FileText,
  BarChart3,
  BrainCircuit,
  Bot,
  Settings,
} from "lucide-react"

const navGroups = [
  {
    label: "Operations",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/enrolment", label: "Enrolment", icon: UserPlus },
      { href: "/tracking", label: "Tracking", icon: ClipboardCheck },
      { href: "/matching", label: "Matching", icon: Handshake },
    ],
  },
  {
    label: "Management",
    items: [
      { href: "/programmes", label: "Programmes", icon: GraduationCap },
      { href: "/employers", label: "Employers", icon: Building2 },
      { href: "/communications", label: "Communications", icon: MessageSquare },
      { href: "/documents", label: "Documents", icon: FileText },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/ai-insights", label: "AI Insights", icon: BrainCircuit },
      { href: "/assistant", label: "Assistant", icon: Bot },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/settings", label: "Integrations & Settings", icon: Settings },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-border bg-sidebar-background">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <BrainCircuit className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">Nucleus AI</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
