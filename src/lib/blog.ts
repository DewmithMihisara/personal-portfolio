import { parseFrontmatter, parseTags } from './frontmatter'

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
