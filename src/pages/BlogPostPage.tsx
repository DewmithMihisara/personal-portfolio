import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'
import { Illustration } from '../components/Illustration'
import { formatDate, getPost, type BlogPost } from '../lib/blog'
import { useSeo } from '../seo/useSeo'
import { postMeta } from '../seo/site'
import { NotFoundPage } from './NotFoundPage'

export function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFoundPage />
  return <BlogPostView post={post} />
}

function BlogPostView({ post }: { post: BlogPost }) {
  useSeo(postMeta(post))

  return (
    <article className="px-4 pt-28 sm:px-6 md:px-16">
      <div className="mx-auto w-full max-w-2xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft className="size-4" /> All posts
        </Link>

        <header className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">{post.title}</h1>
          {post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <Illustration
          src={post.cover ?? 'blog-default-cover.png'}
          eager
          className="mt-10 aspect-[16/9] w-full rounded-lg object-cover"
        />

        <div className="prose-post mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
      </div>
    </article>
  )
}
