export type ProjectCategory = 'Backend' | 'Full Stack' | 'Cloud'

export type Project = {
  name: string
  description: string
  tech: string[]
  category: ProjectCategory
  /** e.g. "Sep 2026 – Present" */
  period?: string
  /** Award or recognition shown as a badge */
  award?: string
  /** External link (repo / live site) */
  link?: string
  /** Slug of a blog post about this project */
  article?: string
}

export const PROJECT_CATEGORIES: Array<'All' | ProjectCategory> = [
  'All',
  'Backend',
  'Full Stack',
  'Cloud',
]

export const projects: Project[] = [
  {
    name: 'Marketplace',
    description:
      'Multi-vendor marketplace platform enabling seamless product discovery, secure payments, and automated vendor onboarding.',
    tech: ['Java', 'Spring Boot','Spring Security', 'MySQL', 'AWS S3', 'React'],
    category: 'Full Stack',
  },
  {
    name: 'ProveIt',
    description:
      'Digital evidence management system with secure file ingestion, validation workflows, and real-time audit trails.',
    tech: ['Java', 'Spring Boot','Spring Security', 'MySQL', 'AWS S3', 'Docker'],
    category: 'Backend',
  },
  {
    name: 'Swarnavahini Election 2025',
    description:
      'High-traffic election coverage experience with live results, analytics dashboards, and resilient cloud infrastructure.',
    tech: ['Java', 'Spring Boot', 'WebSockets', 'GCP', 'MySQL'],
    category: 'Backend',
  },
  {
    name: 'PetMedi.lk',
    description:
      'Telehealth platform connecting pet owners with vets, featuring appointment scheduling, video consults, and prescriptions.',
    tech: ['Java', 'Spring Boot','Spring Security', 'MySQL', 'GCP', 'Angular'],
    category: 'Full Stack',
  },
]
