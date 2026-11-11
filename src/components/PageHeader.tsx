import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Illustration } from './Illustration'

type PageHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  illustration?: string
}

/** Top-of-page banner: text on the left, ink & watercolor artwork on the right. */
export function PageHeader({ eyebrow, title, description, illustration }: PageHeaderProps) {
  return (
    <header className="relative px-4 pt-28 sm:px-6 md:px-16">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-12">
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">{title}</h1>
          {description && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
          )}
        </motion.div>
        {illustration && (
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <Illustration
              src={illustration}
              eager
              width={1280}
              height={853}
              className="mx-auto aspect-[3/2] w-full max-w-sm object-contain md:max-w-none"
            />
          </motion.div>
        )}
      </div>
    </header>
  )
}
