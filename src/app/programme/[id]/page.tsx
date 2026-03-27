import { notFound } from 'next/navigation'
import { programmes, cohorts, programmeMetrics, trainees, employers } from '@/data'
import { ProgrammeDetail } from './_components/programme-detail'

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const programme = programmes.find((p) => p.id === id)
  if (!programme) notFound()

  const progCohorts = cohorts.filter((c) => c.programmeId === programme.id)
  const metrics = programmeMetrics.find((m) => m.programmeId === programme.id)
  const progTrainees = trainees.filter((t) => t.programmeId === programme.id)

  return (
    <ProgrammeDetail
      programme={programme}
      cohorts={progCohorts}
      metrics={metrics}
      trainees={progTrainees}
      employers={employers}
    />
  )
}
