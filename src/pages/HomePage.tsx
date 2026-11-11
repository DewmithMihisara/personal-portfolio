import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { HomeSection } from '../sections/HomeSection'
import { ProjectCard } from '../sections/ProjectsSection'
import { PostCard } from '../components/PostCard'
import { projects } from '../data/projects'
import { posts } from '../lib/blog'

function StripHeader({ eyebrow, title, to, cta }: { eyebrow: string; title: string; to: string; cta: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">{title}</h2>
      </div>
      <Link to={to} className="group inline-flex items-center gap-1.5 text-sm font-medium">
        {cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

export function HomePage() {
  const featured = projects.slice(0, 3)
  const latest = posts.slice(0, 3)

  return (
    <>
      <HomeSection />

      <section className="px-4 pt-12 sm:px-6 md:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <StripHeader eyebrow="Featured Work" title="Selected projects" to="/projects" cta="All projects" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.name} project={project} index={projects.indexOf(project)} />
            ))}
          </div>
        </div>
      </section>

      {latest.length > 0 && (
        <section className="px-4 pt-24 sm:px-6 md:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <StripHeader eyebrow="Blog" title="Latest writing" to="/blog" cta="All posts" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
