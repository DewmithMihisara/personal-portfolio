import { useCallback, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, Hand, X } from 'lucide-react'
import { useGesture } from './HandGestureProvider'

// ── Constants ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'gestureIntroSeen'

// ── Gesture illustration SVGs ─────────────────────────────────────────────────

function SwipeUpIllustration() {
  return (
    <svg width="48" height="56" viewBox="0 0 48 56" fill="none" aria-hidden="true">
      {/* Palm */}
      <rect x="16" y="28" width="16" height="18" rx="4" fill="#cbd5e1" />
      {/* Fingers */}
      <rect x="10" y="20" width="6" height="14" rx="3" fill="#cbd5e1" />
      <rect x="17" y="16" width="6" height="16" rx="3" fill="#cbd5e1" />
      <rect x="24" y="16" width="6" height="16" rx="3" fill="#cbd5e1" />
      <rect x="31" y="18" width="6" height="14" rx="3" fill="#cbd5e1" />
      {/* Thumb */}
      <rect x="8" y="30" width="8" height="6" rx="3" fill="#cbd5e1" transform="rotate(-20 8 30)" />
      {/* Animated upward arrow */}
      <motion.g
        animate={{ y: [-2, -8, -2] }}
        transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
      >
        <path d="M24 14 L24 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 8 L24 4 L28 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
    </svg>
  )
}

function SwipeDownIllustration() {
  return (
    <svg width="48" height="56" viewBox="0 0 48 56" fill="none" aria-hidden="true">
      {/* Palm */}
      <rect x="16" y="10" width="16" height="18" rx="4" fill="#cbd5e1" />
      {/* Fingers */}
      <rect x="10" y="10" width="6" height="14" rx="3" fill="#cbd5e1" />
      <rect x="17" y="8" width="6" height="16" rx="3" fill="#cbd5e1" />
      <rect x="24" y="8" width="6" height="16" rx="3" fill="#cbd5e1" />
      <rect x="31" y="10" width="6" height="14" rx="3" fill="#cbd5e1" />
      {/* Thumb */}
      <rect x="8" y="14" width="8" height="6" rx="3" fill="#cbd5e1" transform="rotate(20 8 14)" />
      {/* Animated downward arrow */}
      <motion.g
        animate={{ y: [2, 8, 2] }}
        transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
      >
        <path d="M24 42 L24 52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 48 L24 52 L28 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
    </svg>
  )
}

function PinchIllustration() {
  return (
    <svg width="48" height="56" viewBox="0 0 48 56" fill="none" aria-hidden="true">
      {/* Thumb */}
      <motion.g
        animate={{ x: [0, 4, 0], y: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
      >
        <rect x="6" y="22" width="8" height="18" rx="4" fill="#cbd5e1" transform="rotate(-30 10 31)" />
      </motion.g>
      {/* Index finger */}
      <motion.g
        animate={{ x: [0, -3, 0], y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
      >
        <rect x="20" y="8" width="8" height="22" rx="4" fill="#cbd5e1" />
      </motion.g>
      {/* Other fingers (folded, static) */}
      <rect x="29" y="18" width="7" height="14" rx="3.5" fill="#e2e8f0" />
      <rect x="35" y="22" width="7" height="12" rx="3.5" fill="#e2e8f0" />
      {/* Palm base */}
      <rect x="14" y="30" width="22" height="14" rx="5" fill="#cbd5e1" />
      {/* Pinch dot indicator */}
      <motion.circle
        cx="24"
        cy="29"
        r="4"
        fill="currentColor"
        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
      />
    </svg>
  )
}

// ── Gesture card data ─────────────────────────────────────────────────────────

const GESTURE_CARDS = [
  {
    id: 'swipe-up' as const,
    label: 'Swipe Up',
    description: 'Scroll up',
    Illustration: SwipeUpIllustration,
  },
  {
    id: 'swipe-down' as const,
    label: 'Swipe Down',
    description: 'Scroll down',
    Illustration: SwipeDownIllustration,
  },
  {
    id: 'pinch' as const,
    label: 'Pinch',
    description: 'Click buttons',
    Illustration: PinchIllustration,
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export function WelcomeGesturePopup() {
  const { enable } = useGesture()

  const [open, setOpen] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem(STORAGE_KEY) !== 'true'
      : false,
  )
  const [isEnabling, setIsEnabling] = useState(false)
  const [enableError, setEnableError] = useState<string | null>(null)

  const handleClose = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setOpen(false)
  }, [])

  const handleEnable = useCallback(async () => {
    setIsEnabling(true)
    setEnableError(null)
    try {
      await enable()
      handleClose()
    } catch (err) {
      const isDomEx = err instanceof DOMException
      if (isDomEx && err.name === 'NotAllowedError') {
        setEnableError('Camera permission denied. Allow access in your browser settings and try again.')
      } else if (isDomEx && err.name === 'NotFoundError') {
        setEnableError('No camera found on this device.')
      } else {
        setEnableError('Could not start camera. Please try again.')
      }
      setIsEnabling(false)
    }
  }, [enable, handleClose])

  return (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) handleClose() }}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </Dialog.Overlay>

            {/* Card wrapper */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            >
              <Dialog.Content className="relative w-full max-w-lg rounded-lg border border-border bg-background p-8 focus:outline-none">

                {/* Close / Skip button */}
                <Dialog.Close asChild>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                    aria-label="Skip gesture tutorial"
                  >
                    <X className="size-4" />
                  </button>
                </Dialog.Close>

                {/* Header */}
                <div className="mb-6 text-center">
                  <motion.div
                    className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-accent"
                    animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', repeatDelay: 1 }}
                  >
                    <Hand className="size-7 text-accent-foreground" />
                  </motion.div>

                  <Dialog.Title className="font-display text-xl font-semibold text-foreground">
                    Navigate with Gestures
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Take your hands off the mouse &amp; keyboard — sit back comfortably and
                    navigate this site using hand gestures in front of your camera.
                  </Dialog.Description>
                </div>

                {/* Gesture cards */}
                <div className="mb-6 grid grid-cols-3 gap-3">
                  {GESTURE_CARDS.map((card, i) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.09, duration: 0.4 }}
                      whileHover={{ scale: 1.04 }}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-secondary/80 px-3 py-4"
                    >
                      <card.Illustration />
                      <span className="text-xs font-semibold text-foreground">{card.label}</span>
                      <span className="text-center text-[11px] leading-tight text-muted-foreground">
                        {card.description}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Error */}
                {enableError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 rounded-xl bg-red-50 px-4 py-2 text-center text-xs text-red-600"
                  >
                    {enableError}
                  </motion.p>
                )}

                {/* CTA buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => { void handleEnable() }}
                    disabled={isEnabling}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-85 active:scale-[0.98] disabled:opacity-60"
                  >
                    {isEnabling ? (
                      <>
                        <motion.span
                          className="inline-block size-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Enabling camera…
                      </>
                    ) : (
                      <>
                        <Camera className="size-4" />
                        Enable Camera &amp; Start
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full rounded-lg py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    Skip for now
                  </button>
                </div>
              </Dialog.Content>
            </motion.div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
