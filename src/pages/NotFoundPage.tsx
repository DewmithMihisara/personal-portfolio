import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

export function NotFoundPage() {
  return (
    <>
      <PageHeader eyebrow="404" title="This page wandered off." description="The link may be broken, or the page may have moved." />
      <div className="mx-auto mt-10 w-full max-w-5xl px-4 sm:px-6">
        <Link to="/" className="btn-solid hover:text-primary-foreground">
          Back home
        </Link>
      </div>
    </>
  )
}
