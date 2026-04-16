import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { markdownPostRepository } from '../../infra/content-markdown/markdownPostRepository'
import { getPopularTags, getPublishedPosts } from '../../domain/posts/useCases'
import { PostCard } from '../components/PostCard'
import { getPostPath } from '../utils/postPath'

export function HomePage() {
  const [latestPosts, setLatestPosts] = useState([])
  const [popularTags, setPopularTags] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)

  useEffect(() => {
    async function load() {
      const [posts, tags] = await Promise.all([
        getPublishedPosts(markdownPostRepository),
        getPopularTags(markdownPostRepository),
      ])

      setTotalPosts(posts.length)
      setLatestPosts(posts.slice(0, 3))
      setPopularTags(tags.slice(0, 8))
    }

    load()
  }, [])

  const featuredPost = latestPosts[0] ?? null
  const sidePosts = latestPosts.slice(1)

  return (
    <>
      <section className="home-hero">
        <div className="hero-banner">
          <img
            className="hero-illustration hero-illustration-top"
            src="/images/background.png"
            alt="Background artwork for the main hero section"
            loading="lazy"
          />
          <p className="eyebrow">Software Engineering Notes</p>
          <h1>Build better products and a better dev life.</h1>
          <p>
            Real-world engineering articles, architecture ideas, and workflow habits from
            practical projects.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" to="/blog">
              Explore articles
            </Link>
            <Link className="button-secondary" to="/dev-life">
              Read Dev's Life
            </Link>
          </div>
          <div className="hero-stats" aria-label="Website highlights">
            <div>
              <p>{totalPosts}</p>
              <span>Total Posts</span>
            </div>
            <div>
              <p>{popularTags.length}</p>
              <span>Active Tags</span>
            </div>
            <div>
              <p>2</p>
              <span>Content Tracks</span>
            </div>
          </div>
        </div>

        <aside className="home-quick-panel">
          <h2>Start Here</h2>
          <ul>
            <li>
              <Link to="/dashboard">Check writing dashboard</Link>
            </li>
            <li>
              <Link to="/blog">Browse technical posts</Link>
            </li>
            <li>
              <Link to="/dev-life">Read career and productivity notes</Link>
            </li>
            <li>
              <Link to="/contact">Contact me</Link>
            </li>
          </ul>
        </aside>
      </section>

      <section>
        <div className="section-head">
          <h2>Latest posts</h2>
          <Link to="/blog">View all</Link>
        </div>

        {featuredPost ? (
          <div className="featured-wrap">
            <article className="featured-main">
              <p className="eyebrow">Featured Article</p>
              <h3>
                <Link to={getPostPath(featuredPost)}>{featuredPost.title}</Link>
              </h3>
              <p>{featuredPost.summary}</p>
              <div className="featured-meta">
                <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
              </div>
            </article>

            <aside className="featured-side" aria-label="More latest posts">
              <img
                className="featured-side-image"
                src="/images/dashboard-analytics.svg"
                alt="Analytics dashboard illustration"
                loading="lazy"
              />
              {sidePosts.map((post) => (
                <article key={post.id} className="compact-post">
                  <h4>
                    <Link to={getPostPath(post)}>{post.title}</Link>
                  </h4>
                  <p>{post.summary}</p>
                </article>
              ))}
            </aside>
          </div>
        ) : null}
      </section>

      <section>
        <div className="section-head">
          <h2>More from the Blog</h2>
        </div>
        <div className="card-grid">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} layout="vertical" />
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2>Popular tags</h2>
        </div>
        <ul className="tag-cloud">
          {popularTags.map((tag) => (
            <li key={tag.tag}>
              <Link to={`/tags/${encodeURIComponent(tag.tag.toLowerCase())}`}>
                #{tag.tag} ({tag.count})
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
