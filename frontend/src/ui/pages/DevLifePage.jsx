import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { markdownPostRepository } from '../../infra/content-markdown/markdownPostRepository'
import { getPublishedPostsBySource } from '../../domain/posts/useCases'
import { PostCard } from '../components/PostCard'
import { Breadcrumb } from '../components/Breadcrumb'

export function DevLifePage() {
  const [posts, setPosts] = useState([])
  const [activeTag, setActiveTag] = useState('all')

  useEffect(() => {
    async function load() {
      const allPosts = await getPublishedPostsBySource(markdownPostRepository, 'dev-life')
      setPosts(allPosts)
    }

    load()
  }, [])

  const tagCounts = useMemo(() => {
    const counts = new Map()

    for (const post of posts) {
      for (const tag of post.tags) {
        const key = tag.toLowerCase()
        const current = counts.get(key)

        if (current) {
          current.count += 1
        } else {
          counts.set(key, { key, label: tag, count: 1 })
        }
      }
    }

    return [...counts.values()].sort((a, b) => b.count - a.count)
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (activeTag === 'all') {
      return posts
    }

    return posts.filter((post) => post.tags.some((tag) => tag.toLowerCase() === activeTag))
  }, [posts, activeTag])

  return (
    <section>
      <Breadcrumb crumbs={[
        { label: 'Home', to: '/' },
        { label: "Dev's Life" },
      ]} />
      <div className="hero-banner">
        <p className="eyebrow">Beyond Code</p>
        <h1>Dev's Life</h1>
        <p>
          Stories, habits, and lessons around teamwork, career growth, and sustainable
          engineering life.
        </p>
        <img
          className="hero-illustration hero-illustration-small"
          src="/images/dev-life-balance.jpg"
          alt="Illustration representing work life balance for developers"
          loading="lazy"
        />
      </div>

      <div className="section-head">
        <h2>Articles</h2>
        <Link to="/blog">View all posts</Link>
      </div>

      {posts.length ? (
        <div className="blog-layout">
          <aside className="blog-sidebar" aria-label="DevLife tag menu">
            <h2>Tags</h2>
            <ul>
              <li>
                <button
                  type="button"
                  className={activeTag === 'all' ? 'active' : ''}
                  onClick={() => setActiveTag('all')}
                >
                  All ({posts.length})
                </button>
              </li>
              {tagCounts.map((tag) => (
                <li key={tag.key}>
                  <button
                    type="button"
                    className={activeTag === tag.key ? 'active' : ''}
                    onClick={() => setActiveTag(tag.key)}
                  >
                    #{tag.label} ({tag.count})
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="blog-content">
            <p className="results-count">{filteredPosts.length} post(s)</p>
            <div className="blog-post-list">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No Dev's Life posts yet. Add Markdown files inside src/content/dev-life.</p>
      )}
    </section>
  )
}
