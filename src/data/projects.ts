export type ProjectCategory = 'Backend' | 'Full Stack' | 'Cloud' | 'Desktop' | 'Tools'

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
  'Desktop',
  'Tools',
]

export const projects: Project[] = [
  {
    name: 'ResumeLog',
    description:
      'Job-search tracker: a Chrome extension saves postings from LinkedIn and Indeed in one click, a dashboard tracks every application with a tailored CV, and an ATS checker scores résumés against job descriptions.',
    tech: ['NestJS', 'PostgreSQL', 'TypeORM', 'React', 'TypeScript', 'Plasmo', 'GCP', 'Paddle'],
    category: 'Full Stack',
    period: 'Sep 2026 – Present',
    article: 'resumelog',
  },
  {
    name: 'womm',
    description:
      'A courtroom for "works on my machine" bugs. Compares two machine setups, checks what the project requires against 94 known-issue rules, and gives each difference a verdict: guilty, suspicious or acquitted.',
    tech: ['TypeScript', 'Node.js', 'YAML rules', 'GitHub Actions'],
    category: 'Tools',
    period: 'Nov 2026',
    link: 'https://github.com/DewmithMihisara/womm',
    article: 'womm',
  },
  {
    name: 'bin2',
    description:
      'Files that never die. Seals any file together with its own viewer as a self-contained HTML page, so it opens anywhere, offline, even without bin2 installed.',
    tech: ['Rust', 'HTML', 'JavaScript', 'Windows shell'],
    category: 'Tools',
    period: 'Oct 2026 – Present',
    link: 'https://github.com/DewmithMihisara/bin2',
    article: 'bin2',
  },
  {
    name: 'DotSpy',
    description:
      'Email open tracker built on the classic 1×1 pixel, first as a full "spy" proof-of-concept, then rewritten into an honest tool that only answers "was this email opened?"',
    tech: ['Node.js', 'Vercel', 'PostgreSQL', 'Supabase', 'Nodemailer', 'Chart.js'],
    category: 'Backend',
    link: 'https://github.com/DewmithMihisara/dot-spy',
    article: 'dotspy-email-tracker',
  },
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
  {
    name: 'Pilisaru',
    description:
      'Waste management system that optimises waste collection, processing and recycling operations, named after the Pilisaru organic fertilizer complex in Sri Lanka. Built by Team Zyko.',
    tech: ['Java', 'JavaFX', 'MySQL', 'CSS'],
    category: 'Desktop',
    period: 'Jan 2023 – Feb 2023',
    award: 'Best Teamwork Trophy · Innovesta 2023 (IJSE)',
  },
]
