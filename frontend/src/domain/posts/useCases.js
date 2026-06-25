export async function getPublishedPosts(postRepository, options = {}) {
  const posts = await postRepository.getAllPosts(options)

  return posts
    .filter((post) => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
}

export async function getPublishedPostsBySource(postRepository, source, options = {}) {
  const posts = await getPublishedPosts(postRepository, options)
  return posts.filter((post) => post.source === source)
}

export async function getPostBySlug(postRepository, slug, options = {}) {
  const post = await postRepository.getPostBySlug(slug, options)

  if (!post || post.status !== 'published') {
    return null
  }

  return post
}

export async function searchPosts(postRepository, query, options = {}) {
  const normalizedQuery = query.trim().toLowerCase()
  const posts = await getPublishedPosts(postRepository, options)

  if (!normalizedQuery) {
    return posts
  }

  return posts.filter((post) => {
    const haystack = [post.title, post.summary, post.tags.join(' ')].join(' ').toLowerCase()
    return haystack.includes(normalizedQuery)
  })
}

export async function getPostsByTag(postRepository, tag, options = {}) {
  const normalizedTag = tag.trim().toLowerCase()
  const posts = await getPublishedPosts(postRepository, options)

  return posts.filter((post) => post.tags.some((item) => item.toLowerCase() === normalizedTag))
}

export async function getPopularTags(postRepository, options = {}) {
  const posts = await getPublishedPosts(postRepository, options)
  const counts = new Map()

  for (const post of posts) {
    for (const tag of post.tags) {
      const key = tag.toLowerCase()
      const current = counts.get(key)

      if (current) {
        current.count += 1
      } else {
        counts.set(key, { tag, count: 1 })
      }
    }
  }

  return [...counts.values()].sort((a, b) => b.count - a.count)
}
