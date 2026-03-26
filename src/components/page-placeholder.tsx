import { Badge } from "@/components/ui/badge"

interface PagePlaceholderProps {
  title: string
  description: string
  prd: string
}

export function PagePlaceholder({
  title,
  description,
  prd,
}: PagePlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <Badge variant="outline" className="text-xs">
        {prd}
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="max-w-md text-muted-foreground">{description}</p>
      <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/50 px-8 py-12 text-sm text-muted-foreground">
        Page content coming soon
      </div>
    </div>
  )
}
