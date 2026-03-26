import { PagePlaceholder } from "@/components/page-placeholder"

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <PagePlaceholder
      title={`Programme Detail: ${id}`}
      description="Individual programme with cohorts, modules, trainee roster, and outcome metrics."
      prd="PRD-10"
    />
  )
}
