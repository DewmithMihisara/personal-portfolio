import { useState } from 'react'

type IllustrationProps = {
  /** File name in /public/illustrations (e.g. "home-hero.png") or an absolute URL/path. */
  src: string
  alt?: string
  className?: string
  width?: number
  height?: number
  eager?: boolean
}

/**
 * Ink & watercolor artwork. Blends into the page in light mode and sits on a paper
 * card in dark mode (see `.ink-art` in index.css). Renders nothing if the file is missing.
 */
export function Illustration({ src, alt = '', className = '', width = 1024, height = 1024, eager }: IllustrationProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  const url = src.startsWith('/') || src.startsWith('http') ? src : `/illustrations/${src}`

  return (
    <img
      src={url}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={`ink-art select-none ${className}`}
    />
  )
}
