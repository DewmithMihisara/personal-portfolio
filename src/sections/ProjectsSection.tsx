import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROJECT_CATEGORIES, projects, type Project } from '../data/projects'

type Filter = (typeof PROJECT_CATEGORIES)[number]

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('All')
  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  return (
    <section className="px-4 pt-14 sm:px-6 md:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
            {PROJECT_CATEGORIES.map((category) => {
              const active = category === filter
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(category)}
                  className={[
                    'rounded-md border px-3 py-1.5 font-mono text-xs transition-colors',
                    active
                      ? 'border-indigo-line bg-indigo-soft text-indigo-accent'
                      : 'border-border text-muted-foreground hover:text-foreground',
                  ].join(' ')}
                >
                  {category}
                </button>
              )
            })}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {String(visible.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} index={projects.indexOf(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center pt-4">
          <Link to="/contact" className="btn-outline group gap-2">
            Start a project together
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="card flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="tag">{String(index + 1).padStart(2, '0')}</span>
        <span className="eyebrow">{project.category}</span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-tight text-foreground">
        {project.link ? (
          <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5">
            {project.name}
            <ArrowUpRight className="size-4 text-indigo-accent" />
          </a>
        ) : (
          project.name
        )}
      </h3>
      {project.period && <p className="mt-1 font-mono text-xs text-faint">{project.period}</p>}

      {project.award && (
        <p className="mt-3 inline-flex items-start gap-1.5 self-start rounded-md border border-indigo-line bg-indigo-soft px-2 py-1 text-xs text-indigo-accent">
          <Trophy className="mt-px size-3.5 shrink-0" />
          {project.award}
        </p>
      )}

      <p className="mb-4 mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      {project.article && (
        <Link
          to={`/blog/${project.article}`}
          className="group mb-4 inline-flex items-center gap-1 self-start text-sm font-medium text-indigo-accent"
        >
          Read the story
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}

      <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
        {project.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  )
}
