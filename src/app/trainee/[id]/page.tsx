import { PagePlaceholder } from "@/components/page-placeholder"

export default async function TraineeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <PagePlaceholder
      title={`Trainee Profile: ${id}`}
      description="360-degree view of an individual trainee's complete record, timeline, and placement status."
      prd="PRD-08"
    />
  )
}
