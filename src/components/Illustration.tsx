import { useState } from 'react'

type IllustrationProps = {
  /** File name in /public/illustrations (e.g. "home-hero.png") or a site path like "/profile-ink.jpg". */
  src: string
  alt?: string
  className?: string
  width?: number
  height?: number
  eager?: boolean
}

/**
 * Ink & watercolor artwork. Serves the lighter .webp sibling of every local
 * .png/.jpg (with the original as fallback), blends the white paper into the
 * page (see `.ink-art` in index.css), and renders nothing if the file is missing.
 */
export function Illustration({ src, alt = '', className = '', width = 1024, height = 1024, eager }: IllustrationProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  const url = src.startsWith('/') || src.startsWith('http') ? src : `/illustrations/${src}`
  const webp = !url.startsWith('http') && /\.(png|jpe?g)$/i.test(url) ? url.replace(/\.(png|jpe?g)$/i, '.webp') : null

  const img = (
    <img
      src={url}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={`ink-art select-none ${className}`}
    />
  )

  return webp ? (
    <picture className="contents">
      <source srcSet={webp} type="image/webp" />
      {img}
    </picture>
  ) : (
    img
  )
}
