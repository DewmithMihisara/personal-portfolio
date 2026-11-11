import { PageHeader } from '../components/PageHeader'
import { AboutSection } from '../sections/AboutSection'
import { AcademicSection } from '../sections/AcademicSection'
import { TrustedVoicesSection } from '../sections/TrustedVoicesSection'

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="About me"
        description="Engineer, learner and collaborator — the story so far, the schools that shaped it, and the people I've built with."
        illustration="about.png"
      />
      <AboutSection />
      <AcademicSection />
      <TrustedVoicesSection />
    </>
  )
}
