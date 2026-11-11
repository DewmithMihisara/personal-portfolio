import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Illustration } from './Illustration'
import { formatDate, type BlogPost } from '../lib/blog'

/** One blog post as a full-width list row: date · title, excerpt, tags · thumbnail. */
export function PostRow({ post }: { post: BlogPost }) {
  return (
    <li>
      <Link
        to={`/blog/${post.slug}`}
        className="group -mx-4 grid grid-cols-1 gap-4 rounded-lg px-4 py-8 transition-colors hover:bg-accent hover:text-foreground sm:-mx-6 sm:grid-cols-[9rem_1fr_11rem] sm:gap-8 sm:px-6"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint sm:pt-1.5">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="sm:hidden"> · </span>
          <span className="sm:mt-2 sm:block">{post.readingMinutes} min read</span>
        </p>

        <div className="min-w-0">
          <h2 className="text-xl font-semibold leading-snug transition-colors group-hover:text-indigo-accent sm:text-2xl">
            {post.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
            <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-indigo-accent opacity-0 transition-opacity group-hover:opacity-100">
              Read <ArrowRight className="size-3.5" />
            </span>
          </div>
        </div>

        <div className="hidden aspect-[3/2] overflow-hidden rounded-md sm:block">
          <Illustration
            src={post.cover ?? 'blog-default-cover.png'}
            width={1280}
            height={853}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </Link>
    </li>
  )
}
