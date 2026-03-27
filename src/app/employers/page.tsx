import { employers, vacancies, placements, staff } from '@/data'
import { EmployerList } from './_components/employer-list'

export default function EmployersRoute() {
  return <EmployerList employers={employers} vacancies={vacancies} placements={placements} staff={staff} />
}
