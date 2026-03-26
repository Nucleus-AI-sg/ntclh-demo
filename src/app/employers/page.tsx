import { employers, vacancies } from '@/data'
import { EmployerList } from './_components/employer-list'

export default function EmployersRoute() {
  return <EmployerList employers={employers} vacancies={vacancies} />
}
