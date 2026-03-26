import { documents } from '@/data'
import { DocumentsPage } from './_components/documents-page'

export default function DocumentsRoute() {
  return <DocumentsPage documents={documents} />
}
