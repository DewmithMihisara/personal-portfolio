export type BlogPost = {
  slug: string
  title: string
  date: string // ISO yyyy-mm-dd
  excerpt: string
  cover?: string
  tags: string[]
  body: string
  readingMinutes: number
}

// Every Markdown file in src/content/blog becomes a post. File name = URL slug.
const files = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) return { data: {}, body: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1)
    if (key) data[key] = value
  }
  return { data, body: match[2] }
}

function parseTags(value?: string): string[] {
  if (!value) return []
  return value
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((tag) => tag.trim().replace(/^(['"])(.*)\1$/, '$2'))
    .filter(Boolean)
}

export const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, body } = parseFrontmatter(raw)
    const words = body.trim().split(/\s+/).length
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      cover: data.cover || undefined,
      tags: parseTags(data.tags),
      body,
      readingMinutes: Math.max(1, Math.round(words / 220)),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function formatDate(iso: string): string {
  if (!iso) return ''
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
