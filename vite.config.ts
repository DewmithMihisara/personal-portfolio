import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { PAGE_KEYS, pageMeta, postMeta, SITE, type PostMetaInput } from './src/seo/site.ts'
import { renderTags, seoTags } from './src/seo/head.ts'
import { parseFrontmatter, parseTags } from './src/lib/frontmatter.ts'

function readPosts(root: string): PostMetaInput[] {
  const dir = path.join(root, 'src/content/blog')
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { data } = parseFrontmatter(readFileSync(path.join(dir, file), 'utf8'))
      const slug = file.replace(/\.md$/, '')
      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? '',
        date: data.date ?? '',
        cover: data.cover || undefined,
        tags: parseTags(data.tags),
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * SPA SEO at build time: writes dist/<route>/index.html for every page and blog
 * post with that route's title, description, canonical, Open Graph/Twitter tags,
 * JSON-LD and a <noscript> summary, then generates sitemap.xml and robots.txt.
 * Link-preview bots (LinkedIn, X, Slack…) don't run JS, so they need this.
 */
function seoPrerender(): Plugin {
  let root = ''
  let outDir = ''
  return {
    name: 'seo-prerender',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const template = readFileSync(path.join(outDir, 'index.html'), 'utf8')
      const posts = readPosts(root)
      const routes = [...PAGE_KEYS.map(pageMeta), ...posts.map(postMeta)]

      const navLinks = [
        ...PAGE_KEYS.map((key) => pageMeta(key)).map((p) => `<a href="${p.path}">${esc(p.title)}</a>`),
        ...posts.map((p) => `<a href="/blog/${p.slug}">${esc(p.title)}</a>`),
      ].join(' · ')

      for (const route of routes) {
        const head = `<!-- seo:head -->\n    ${renderTags(seoTags(route))}\n    <!-- /seo:head -->`
        const noscript =
          `<!-- seo:noscript --><noscript><main><h1>${esc(route.heading)}</h1>` +
          `<p>${esc(route.description)}</p><nav>${navLinks}</nav></main></noscript><!-- /seo:noscript -->`
        const html = template
          .replace(/<!-- seo:head -->[\s\S]*?<!-- \/seo:head -->/, head)
          .replace(/<!-- seo:noscript -->[\s\S]*?<!-- \/seo:noscript -->/, noscript)

        const file = route.path === '/' ? 'index.html' : path.join(route.path.slice(1), 'index.html')
        mkdirSync(path.dirname(path.join(outDir, file)), { recursive: true })
        writeFileSync(path.join(outDir, file), html)
      }

      const latest = posts[0]?.date
      const urls = routes.map((route) => {
        const lastmod = route.publishedTime ?? (route.path === '/blog' || route.path === '/' ? latest : undefined)
        const priority = route.path === '/' ? '1.0' : route.path.startsWith('/blog/') ? '0.7' : '0.8'
        return [
          '  <url>',
          `    <loc>${SITE.url}${route.path === '/' ? '/' : route.path}</loc>`,
          lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
          `    <priority>${priority}</priority>`,
          '  </url>',
        ]
          .filter(Boolean)
          .join('\n')
      })
      writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
      )
      writeFileSync(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPrerender()],
})
