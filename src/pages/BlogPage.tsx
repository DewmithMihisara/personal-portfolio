import { PageHeader } from '../components/PageHeader'
import { PostRow } from '../components/PostRow'
import { posts } from '../lib/blog'

export function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the build."
        description="Writing on backend engineering, cloud infrastructure, and growing as a developer."
        illustration="blog.png"
      />
      <section className="px-4 pt-14 sm:px-6 md:px-16">
        <div className="mx-auto w-full max-w-5xl">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet — check back soon.</p>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {posts.map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
