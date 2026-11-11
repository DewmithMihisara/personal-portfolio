import { useEffect } from 'react'
import { seoTags, type SeoMeta } from './head'

/**
 * Keeps <head> in sync with the current page: title, description, canonical,
 * Open Graph / Twitter tags and JSON-LD. The same tags are pre-rendered into
 * each route's HTML at build time, so crawlers that don't run JS see them too.
 */
export function useSeo(meta: SeoMeta) {
  const key = JSON.stringify(meta)

  useEffect(() => {
    const tags = seoTags(JSON.parse(key) as SeoMeta)
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
    // Drop any un-managed <title> so there is exactly one.
    document.head.querySelectorAll('title').forEach((el) => el.remove())

    const fragment = document.createDocumentFragment()
    for (const { tag, attrs, text } of tags) {
      const el = document.createElement(tag)
      for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
      if (text !== undefined) el.textContent = text
      fragment.appendChild(el)
    }
    document.head.appendChild(fragment)
  }, [key])
}
