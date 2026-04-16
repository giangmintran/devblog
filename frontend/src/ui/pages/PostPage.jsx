import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Link, useParams } from 'react-router-dom'
import { markdownPostRepository } from '../../infra/content-markdown/markdownPostRepository'
import { getPostBySlug, getPublishedPosts } from '../../domain/posts/useCases'
import { getPostPath } from '../utils/postPath'
import { Breadcrumb } from '../components/Breadcrumb'

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function PostPage() {
  const { slug = '' } = useParams()
  const [post, setPost] = useState(null)
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    async function load() {
      const [data, publishedPosts] = await Promise.all([
        getPostBySlug(markdownPostRepository, decodeURIComponent(slug)),
        getPublishedPosts(markdownPostRepository),
      ])

      setPost(data)
      setAllPosts(publishedPosts)
    }

    load()
  }, [slug])

  const relatedPosts = useMemo(() => {
    if (!post) {
      return []
    }

    const currentTags = new Set(post.tags.map((tag) => tag.toLowerCase()))
    const scoredCandidates = allPosts
      .filter((candidate) => candidate.slug !== post.slug)
      .map((candidate) => {
        const sharedTags = candidate.tags.filter((tag) => currentTags.has(tag.toLowerCase())).length
        const score = sharedTags * 10 + (candidate.source === post.source ? 3 : 0)

        return {
          candidate,
          score,
        }
      })
      .sort((a, b) => b.score - a.score || new Date(b.candidate.publishedAt) - new Date(a.candidate.publishedAt))

    const matched = scoredCandidates.filter((item) => item.score > 0).map((item) => item.candidate)

    if (matched.length >= 5) {
      return matched.slice(0, 5)
    }

    const fallback = scoredCandidates
      .filter((item) => item.score === 0 && item.candidate.source === post.source)
      .map((item) => item.candidate)

    return [...matched, ...fallback].slice(0, 5)
  }, [post, allPosts])

  if (!post) {
    return (
      <section>
        <h1 className="page-title">Post not found</h1>
        <p>This article does not exist or is not published.</p>
        <Link to="/blog">Back to blog</Link>
      </section>
    )
  }

  return (
    <article className="post-layout">
      <div className="post-main">
        <Breadcrumb crumbs={[
          { label: 'Home', to: '/' },
          post.source === 'dev-life'
            ? { label: "Dev's Life", to: '/dev-life' }
            : { label: 'Blog', to: '/blog' },
          { label: post.title },
        ]} />
        <p className="eyebrow">{post.category}</p>
        <h1 className="page-title">{post.title}</h1>
        <p className="post-meta">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </p>

        {post.coverImage ? (
          <img className="post-cover" src={post.coverImage} alt={`Cover for ${post.title}`} loading="lazy" />
        ) : null}

        <div className="post-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h2: ({ children }) => {
                const text = children?.toString() ?? ''
                const id = slugify(text)
                return <h2 id={id}>{children}</h2>
              },
              h3: ({ children }) => {
                const text = children?.toString() ?? ''
                const id = slugify(text)
                return <h3 id={id}>{children}</h3>
              },
              table: ({ children }) => (
                <div className="post-content-table-wrap">
                  <table>{children}</table>
                </div>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      <aside className="post-toc" aria-label="Related posts">
        <h2>Related posts</h2>
        {relatedPosts.length ? (
          <ul>
            {relatedPosts.map((item) => (
              <li key={item.id}>
                <Link to={getPostPath(item)}>{item.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="related-empty">No related posts yet.</p>
        )}
      </aside>
    </article>
  )
}
