import { useSeo } from '../seo/useSeo'
import { pageMeta } from '../seo/site'
import { PageHeader } from '../components/PageHeader'
import { ContactSection } from '../sections/ContactSection'

export function ContactPage() {
  useSeo(pageMeta('contact'))
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s build something together."
        description="Have a role, a project or just a question? Send a message — I usually reply within a day or two."
        illustration="contact.png"
      />
      <ContactSection />
    </>
  )
}
