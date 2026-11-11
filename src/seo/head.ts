// Turns page metadata into <head> tags. Pure functions: used by the browser
// (useSeo) and at build time (vite.config.ts) so both produce identical tags.

export type SeoMeta = {
  /** Route path, e.g. "/blog/womm" */
  path: string
  /** Page title without the site name (the home title is used as-is) */
  title: string
  description: string
  /** Absolute URL or site-relative path to a social preview image */
  image?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  tags?: string[]
  noindex?: boolean
  jsonLd?: object[]
}

export type HeadTag = {
  tag: 'title' | 'meta' | 'link' | 'script'
  attrs: Record<string, string>
  text?: string
}

const SITE_URL = 'https://dewmithmihisara.vercel.app'
const SITE_NAME = 'Dewmith Mihisara'
const DEFAULT_IMAGE = '/og-image.png'

const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`)

export function fullTitle(meta: SeoMeta): string {
  return meta.path === '/' || meta.title.includes(SITE_NAME) ? meta.title : `${meta.title} | ${SITE_NAME}`
}

export function seoTags(meta: SeoMeta): HeadTag[] {
  const title = fullTitle(meta)
  const url = abs(meta.path === '/' ? '/' : meta.path)
  const image = abs(meta.image ?? DEFAULT_IMAGE)
  const type = meta.type ?? 'website'

  const m = (attrs: Record<string, string>): HeadTag => ({ tag: 'meta', attrs })
  const tags: HeadTag[] = [
    { tag: 'title', attrs: {}, text: title },
    m({ name: 'description', content: meta.description }),
    m({ name: 'robots', content: meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' }),
    { tag: 'link', attrs: { rel: 'canonical', href: url } },
    m({ property: 'og:site_name', content: SITE_NAME }),
    m({ property: 'og:locale', content: 'en_US' }),
    m({ property: 'og:type', content: type }),
    m({ property: 'og:title', content: title }),
    m({ property: 'og:description', content: meta.description }),
    m({ property: 'og:url', content: url }),
    m({ property: 'og:image', content: image }),
    m({ property: 'og:image:alt', content: title }),
    m({ name: 'twitter:card', content: 'summary_large_image' }),
    m({ name: 'twitter:title', content: title }),
    m({ name: 'twitter:description', content: meta.description }),
    m({ name: 'twitter:image', content: image }),
  ]

  if (type === 'article') {
    tags.push(m({ property: 'article:author', content: SITE_NAME }))
    if (meta.publishedTime) tags.push(m({ property: 'article:published_time', content: meta.publishedTime }))
    for (const tag of meta.tags ?? []) tags.push(m({ property: 'article:tag', content: tag }))
  }
  if (type === 'profile') {
    tags.push(m({ property: 'profile:first_name', content: 'Dewmith' }))
    tags.push(m({ property: 'profile:last_name', content: 'Mihisara' }))
  }

  if (meta.jsonLd?.length) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify({ '@context': 'https://schema.org', '@graph': meta.jsonLd }),
    })
  }

  // Mark every tag so the client can replace them on navigation.
  return tags.map((t) => ({ ...t, attrs: { ...t.attrs, 'data-seo': '' } }))
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeText = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Serialises tags to an HTML string (build time). */
export function renderTags(tags: HeadTag[]): string {
  return tags
    .map(({ tag, attrs, text }) => {
      const attrString = Object.entries(attrs)
        .map(([key, value]) => (value === '' ? ` ${key}` : ` ${key}="${escapeAttr(value)}"`))
        .join('')
      if (tag === 'meta' || tag === 'link') return `<${tag}${attrString} />`
      const body = tag === 'script' ? (text ?? '').replace(/</g, '\\u003c') : escapeText(text ?? '')
      return `<${tag}${attrString}>${body}</${tag}>`
    })
    .join('\n    ')
}
