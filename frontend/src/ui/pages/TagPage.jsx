import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { markdownPostRepository } from '../../infra/content-markdown/markdownPostRepository'
import { getPostsByTag } from '../../domain/posts/useCases'
import { PostCard } from '../components/PostCard'
import { Breadcrumb } from '../components/Breadcrumb'

export function TagPage() {
  const { tag = '' } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function load() {
      const results = await getPostsByTag(markdownPostRepository, decodeURIComponent(tag))
      setPosts(results)
    }

    load()
  }, [tag])

  return (
    <section>
      <Breadcrumb crumbs={[
        { label: 'Home', to: '/' },
        { label: 'Blog', to: '/blog' },
        { label: `#${decodeURIComponent(tag)}` },
      ]} />
      <div className="section-head">
        <h1 className="page-title">Tag: #{decodeURIComponent(tag)}</h1>
        <Link to="/blog">Back to blog</Link>
      </div>

      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
