import { Link, useLocation } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { useSeo } from '../seo/useSeo'

export function NotFoundPage() {
  const { pathname } = useLocation()
  useSeo({
    path: pathname,
    title: 'Page not found',
    description: 'This page could not be found. Head back to the homepage, projects or blog.',
    noindex: true,
  })
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
