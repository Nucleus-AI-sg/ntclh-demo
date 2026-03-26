import { integrations, users } from '@/data'
import { SettingsPage } from './_components/settings-page'

export default function SettingsRoute() {
  return <SettingsPage integrations={integrations} users={users} />
}
