import PostPreview from './post-preview'

export default function MoreStories({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => {
          const attributes = post.attributes
          const author = attributes.author.data.attributes
          const coverImage = attributes.image.data.attributes

          return (
            <PostPreview
              key={attributes.slug}
              title={attributes.title}
              coverImage={coverImage}
              date={attributes.publishedAt}
              author={author}
              slug={attributes.slug}
              excerpt={attributes.excerpt}
            />
          )
        })}
      </div>
    </section>
  )
}
