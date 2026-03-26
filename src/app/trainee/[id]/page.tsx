import { notFound } from 'next/navigation'
import {
  trainees, programmes, cohorts, assessments, activityEvents,
  moduleProgress, documents, communications, placements,
  matchResults, employers, vacancies, auditEntries, coordinatorNotes,
} from '@/data'
import { TraineeProfile } from './_components/trainee-profile'

export default async function TraineeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const trainee = trainees.find((t) => t.id === id)
  if (!trainee) notFound()

  const programme = programmes.find((p) => p.id === trainee.programmeId)
  const cohort = cohorts.find((c) => c.id === trainee.cohortId)
  const assessment = assessments.find((a) => a.traineeId === trainee.id)
  const events = activityEvents.filter((e) => e.traineeId === trainee.id || !e.traineeId)
  const modules = moduleProgress[trainee.id] ?? []
  const docs = documents.filter((d) => d.traineeId === trainee.id)
  const comms = communications.filter((c) => c.recipientId === trainee.id)
  const trainPlacements = placements.filter((p) => p.traineeId === trainee.id)
  const matches = matchResults.filter((m) => m.traineeId === trainee.id)
  const audit = auditEntries[trainee.id] ?? []
  const notes = coordinatorNotes[trainee.id] ?? []

  const employerNames = Object.fromEntries(employers.map((e) => [e.id, e.name]))
  const vacancyTitles = Object.fromEntries(vacancies.map((v) => [v.id, v.title]))

  return (
    <TraineeProfile
      trainee={trainee}
      programme={programme}
      cohort={cohort}
      programmes={programmes}
      assessment={assessment}
      events={events}
      modules={modules}
      documents={docs}
      communications={comms}
      placements={trainPlacements}
      matches={matches}
      auditEntries={audit}
      notes={notes}
      employerNames={employerNames}
      vacancyTitles={vacancyTitles}
    />
  )
}
