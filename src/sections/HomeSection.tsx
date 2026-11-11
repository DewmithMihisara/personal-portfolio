import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { Illustration } from '../components/Illustration'

export function HomeSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 text-foreground sm:px-6 md:px-16 md:pt-32">
      {/* Faint ink & watercolor scaffolding in the corner */}
      <div className="pointer-events-none absolute -right-32 -top-24 hidden w-[520px] opacity-30 lg:block">
        <Illustration src="home-hero.png" eager alt="" className="w-full" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 text-center md:flex-row md:items-center md:gap-16 md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="order-2 flex-1 md:order-1"
        >
          <motion.span
            className="chip mb-6 !px-3 !py-1 tracking-[0.14em] uppercase"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Software Engineer
          </motion.span>

          <motion.h1
            className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
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
            I’m an enthusiastic and detail-oriented software engineer who builds reliable
            backends, full-stack products and scalable cloud solutions. Passionate about
            crafting clean, efficient code and collaborating in agile environments.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/projects" className="btn-solid group hover:text-primary-foreground">
              View Projects
              <ArrowUpRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
              <a
                href="https://www.linkedin.com/in/dewmith-mihisara"
                target="_blank"
                rel="noreferrer"
                className="btn-outline w-full gap-2 bg-background sm:w-auto"
              >
                <Linkedin className="size-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/dewmithmihisara"
                target="_blank"
                rel="noreferrer"
                className="btn-outline w-full gap-2 bg-background sm:w-auto"
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
          <Illustration
            src="/profile-ink.jpg"
            alt="Ink and watercolor portrait of Dewmith Mihisara"
            eager
            width={800}
            height={800}
            className="h-72 w-72 object-contain sm:h-80 sm:w-80 md:h-[26rem] md:w-[26rem]"
          />
        </motion.div>
      </div>
    </section>
  )
}
