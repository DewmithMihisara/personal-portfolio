import { useCallback, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { HandGestureProvider } from './HandGestureProvider'
import { WelcomeGesturePopup } from './WelcomeGesturePopup'

/** Scroll to top (or to the #hash target) on every route change. */
function useScrollRestoration() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Wait a frame so the new page has rendered.
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
}

function ScrollTopButton() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.8 })
  const ring = useTransform(progress, (value) => {
    const degrees = Math.min(Math.max(value, 0), 1) * 360
    return `conic-gradient(from 0deg at 50% 50%, var(--indigo) ${degrees}deg, var(--border) ${degrees}deg)`
  })
  const opacity = useTransform(scrollYProgress, [0, 0.04], [0, 1])

  return (
    <motion.button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group fixed bottom-6 right-4 z-30 flex size-12 items-center justify-center rounded-full md:bottom-8 md:size-14"
      style={{ backgroundImage: ring, opacity }}
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-background text-foreground transition group-hover:text-indigo-accent md:size-12">
        <ArrowUp className="size-4 md:size-5" strokeWidth={1.5} />
      </span>
    </motion.button>
  )
}

export function Layout() {
  useScrollRestoration()

  // Hand-gesture swipes now scroll the current page.
  const handleSwipeUp = useCallback(() => window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' }), [])
  const handleSwipeDown = useCallback(() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' }), [])

  return (
    <HandGestureProvider onSwipeUp={handleSwipeUp} onSwipeDown={handleSwipeDown}>
      <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ScrollTopButton />
      </div>
      <WelcomeGesturePopup />
    </HandGestureProvider>
  )
}
