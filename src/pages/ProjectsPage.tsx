import { useSeo } from '../seo/useSeo'
import { pageMeta } from '../seo/site'
import { PageHeader } from '../components/PageHeader'
import { ProjectsSection } from '../sections/ProjectsSection'

export function ProjectsPage() {
  useSeo(pageMeta('projects'))
  return (
    <>
      <PageHeader
        eyebrow="Featured Work"
        title="A curated selection of projects."
        description="Experience across backend systems, end-to-end product development, and scalable cloud architectures."
        illustration="projects.png"
      />
      <ProjectsSection />
    </>
  )
}
