import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TopBar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
      <div />

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            ST
          </div>
          <div className="text-sm">
            <p className="font-medium leading-none">Sarah Tan</p>
            <p className="text-xs text-muted-foreground">
              Programme Coordinator
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
