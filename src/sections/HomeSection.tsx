import { motion } from 'framer-motion'
import { ArrowDownRight, Github, Linkedin } from 'lucide-react'
import { ImageCompareSlider } from '../components/ImageCompareSlider'
import type { SectionId } from '../constants/sections'

type HomeSectionProps = {
  onNavigate: (section: SectionId) => void
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  return (
    <section className="relative flex h-full flex-col justify-center bg-background px-6 pb-20 pt-28 text-foreground md:px-16">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 text-center md:flex-row md:items-center md:gap-16 md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="order-2 flex-1 md:order-1"
        >
          <motion.span
            className="border-foreground/25 text-foreground/75 mb-6 inline-flex items-center rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Software Engineer
          </motion.span>

          <motion.h1
            className="font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Dewmith Mihisara
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            I’m an enthusiastic and detail-oriented software engineer specializing in Java,
            Spring Boot, and scalable cloud solutions. Passionate about crafting clean,
            efficient code and collaborating in agile environments.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button onClick={() => onNavigate('projects')} className="btn-solid group">
              View Projects
              <ArrowDownRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/dewmith-mihisara"
                target="_blank"
                rel="noreferrer"
                className="btn-outline gap-2"
              >
                <Linkedin className="size-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/dewmithmihisara"
                target="_blank"
                rel="noreferrer"
                className="btn-outline gap-2"
              >
                <Github className="size-4" />
                GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 flex flex-1 justify-center md:order-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="card h-64 w-64 overflow-hidden !p-1 md:h-80 md:w-80">
            <ImageCompareSlider
              beforeSrc="/base.png"
              afterSrc="/scratch.jpg"
              beforeAlt="Dewmith Mihisara"
              afterAlt="Dewmith Mihisara, animated version"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
