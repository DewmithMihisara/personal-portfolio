import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { contactRoute, navRoutes } from '../constants/routes'

const HEADER_HEIGHT = 56 // h-14

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the mobile menu is open: lock page scroll and let Escape close it.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  const solid = scrolled || isOpen

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
          solid ? 'border-border bg-background/90 backdrop-blur' : 'border-transparent bg-background/0',
        ].join(' ')}
      >
        <nav className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-4 sm:px-6">
          <Link
            to="/"
            className="font-mono text-base font-semibold tracking-tight text-foreground hover:text-foreground"
          >
            Dewmith<span className="text-indigo-accent">.dev</span>
          </Link>

          <div className="ml-auto hidden items-center gap-6 text-sm md:flex">
            {navRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                end={route.path === '/'}
                className={({ isActive }) =>
                  [
                    'border-b pb-0.5 transition-colors duration-200',
                    isActive
                      ? 'border-indigo-accent text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground',
                  ].join(' ')
                }
              >
                {route.label}
              </NavLink>
            ))}
          </div>

          <Link
            to={contactRoute.path}
            className="hidden rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:text-primary-foreground hover:opacity-85 md:inline-flex"
          >
            {contactRoute.label}
          </Link>

          <button
            type="button"
            className="ml-auto flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-indigo-line hover:text-foreground md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X className="size-4" strokeWidth={1.5} /> : <Menu className="size-4" strokeWidth={1.5} />}
          </button>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border bg-background md:hidden"
            >
              <div className="mx-auto flex w-full max-w-5xl flex-col divide-y divide-border px-4 sm:px-6">
                {navRoutes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    end={route.path === '/'}
                    className={({ isActive }) =>
                      [
                        'flex items-center justify-between py-3 text-sm font-medium transition-colors duration-150',
                        isActive ? 'text-foreground' : 'text-muted-foreground',
                      ].join(' ')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {route.label}
                        {isActive && <span className="size-1.5 rounded-full bg-indigo-accent" />}
                      </>
                    )}
                  </NavLink>
                ))}
                <Link
                  to={contactRoute.path}
                  className="my-3 rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground transition-opacity hover:text-primary-foreground hover:opacity-85"
                >
                  {contactRoute.label}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Shade everything under the nav bar while the mobile menu is open. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-x-0 bottom-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            style={{ top: HEADER_HEIGHT }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
