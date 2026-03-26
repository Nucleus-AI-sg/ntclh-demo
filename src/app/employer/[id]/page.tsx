import { notFound } from 'next/navigation'
import { employers, vacancies, placements, communications, trainees, employerAuditEntries } from '@/data'
import { EmployerProfile } from './_components/employer-profile'

export default async function EmployerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const employer = employers.find((e) => e.id === id)
  if (!employer) notFound()

  const empVacancies = vacancies.filter((v) => v.employerId === employer.id)
  const empPlacements = placements.filter((p) => p.employerId === employer.id)
  const empComms = communications.filter((c) => c.recipientId === employer.id)

  return (
    <EmployerProfile
      employer={employer}
      vacancies={empVacancies}
      placements={empPlacements}
      communications={empComms}
      trainees={trainees}
      auditEntries={employerAuditEntries[employer.id] ?? []}
    />
  )
}
