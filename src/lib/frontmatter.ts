// Minimal frontmatter parser shared by the app (src/lib/blog.ts) and the
// build (vite.config.ts). Supports `key: value`, quoted values and [a, b] lists.

export function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
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

export function parseTags(value?: string): string[] {
  if (!value) return []
  return value
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((tag) => tag.trim().replace(/^(['"])(.*)\1$/, '$2'))
    .filter(Boolean)
}
