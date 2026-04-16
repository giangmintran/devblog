export function getPostPath(post) {
  if (post?.source === 'dev-life') {
    return `/dev-life/${post.slug}`
  }

  if (post?.source === 'posts') {
    return `/posts/${post.slug}`
  }

  return `/blog/${post?.slug ?? ''}`
}

export default getPostPath
