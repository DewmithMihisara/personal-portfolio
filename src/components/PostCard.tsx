import { Link } from 'react-router-dom'
import { Illustration } from './Illustration'
import { formatDate, type BlogPost } from '../lib/blog'

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="card group flex h-full flex-col overflow-hidden !p-0 hover:text-foreground"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-border bg-background">
        <Illustration
          src={post.cover ?? 'blog-default-cover.png'}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min
        </p>
        <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-indigo-accent">{post.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
