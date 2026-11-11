// Site-wide SEO data. Shared by the app (client-side head updates) and by
// vite.config.ts (build-time per-route HTML, sitemap.xml, robots.txt).
// Keep this file free of DOM and Vite-only APIs.

import type { SeoMeta } from './head.ts'

export const SITE = {
  url: 'https://dewmithmihisara.vercel.app',
  name: 'Dewmith Mihisara',
  jobTitle: 'Software Engineer',
  locale: 'en_US',
  defaultImage: '/og-image.png',
  email: 'mihisaralokuhewage@gmail.com',
  github: 'https://github.com/DewmithMihisara',
  linkedin: 'https://www.linkedin.com/in/dewmith-mihisara',
} as const

export const absoluteUrl = (path: string) => (path.startsWith('http') ? path : `${SITE.url}${path}`)

export const PERSON_LD = {
  '@type': 'Person',
  '@id': `${SITE.url}/#person`,
  name: SITE.name,
  url: SITE.url,
  image: absoluteUrl('/profile-ink.jpg'),
  jobTitle: SITE.jobTitle,
  email: `mailto:${SITE.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Wrexham University' },
    { '@type': 'EducationalOrganization', name: 'IJSE - Institute of Software Engineering' },
  ],
  knowsAbout: [
    'Backend engineering',
    'Full-stack development',
    'Cloud infrastructure',
    'APIs',
    'Developer tools',
    'TypeScript',
    'Java',
  ],
  sameAs: [SITE.github, SITE.linkedin],
}

export type PageKey = 'home' | 'projects' | 'about' | 'blog' | 'contact'

const PAGES: Record<PageKey, Omit<SeoMeta, 'jsonLd'> & { heading: string }> = {
  home: {
    path: '/',
    title: 'Dewmith Mihisara — Software Engineer',
    heading: 'Dewmith Mihisara, Software Engineer',
    description:
      'Software engineer in Colombo, Sri Lanka, building reliable backends, full-stack products and scalable cloud solutions. Projects, writing and contact.',
    type: 'profile',
  },
  projects: {
    path: '/projects',
    title: 'Projects',
    heading: 'Projects',
    description:
      'Selected work by Dewmith Mihisara: ResumeLog, womm, bin2, DotSpy, election coverage, telehealth and more across backend, full-stack, cloud and developer tools.',
  },
  about: {
    path: '/about',
    title: 'About',
    heading: 'About Dewmith Mihisara',
    description:
      'About Dewmith Mihisara: software engineer, studies at Wrexham University and IJSE, and testimonials from managers, mentors and colleagues.',
  },
  blog: {
    path: '/blog',
    title: 'Blog',
    heading: 'Blog: notes from the build',
    description:
      'Articles by Dewmith Mihisara on building software: developer tools, backend engineering, cloud infrastructure and side projects.',
  },
  contact: {
    path: '/contact',
    title: 'Contact',
    heading: 'Contact Dewmith Mihisara',
    description:
      'Get in touch with Dewmith Mihisara about roles, projects or collaboration, by email, LinkedIn, GitHub or the contact form.',
  },
}

export const PAGE_KEYS = Object.keys(PAGES) as PageKey[]

export function pageMeta(key: PageKey): SeoMeta & { heading: string } {
  const page = PAGES[key]
  const webPage = {
    '@type': key === 'about' ? 'ProfilePage' : key === 'contact' ? 'ContactPage' : key === 'blog' ? 'Blog' : 'WebPage',
    '@id': `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    isPartOf: { '@id': `${SITE.url}/#website` },
    ...(key === 'about' || key === 'home' ? { mainEntity: { '@id': `${SITE.url}/#person` } } : {}),
  }
  const jsonLd: object[] = [webPage]
  if (key === 'home') {
    jsonLd.unshift(PERSON_LD, {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: 'en',
      publisher: { '@id': `${SITE.url}/#person` },
    })
  }
  return { ...page, jsonLd }
}

export type PostMetaInput = {
  slug: string
  title: string
  excerpt: string
  date: string
  cover?: string
  tags: string[]
}

export function postMeta(post: PostMetaInput): SeoMeta & { heading: string } {
  const path = `/blog/${post.slug}`
  const image = `/illustrations/${post.cover ?? 'blog-default-cover.png'}`
  return {
    path,
    title: post.title,
    heading: post.title,
    description: post.excerpt,
    image,
    type: 'article',
    publishedTime: post.date,
    tags: post.tags,
    jsonLd: [
      {
        '@type': 'BlogPosting',
        '@id': `${absoluteUrl(path)}#article`,
        headline: post.title,
        description: post.excerpt,
        image: absoluteUrl(image),
        datePublished: post.date,
        dateModified: post.date,
        keywords: post.tags.join(', '),
        url: absoluteUrl(path),
        mainEntityOfPage: absoluteUrl(path),
        author: { '@type': 'Person', name: SITE.name, url: SITE.url },
        publisher: { '@type': 'Person', name: SITE.name, url: SITE.url },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
          { '@type': 'ListItem', position: 3, name: post.title, item: absoluteUrl(path) },
        ],
      },
    ],
  }
}
