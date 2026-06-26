import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { markdownPostRepository } from '../../infra/content-markdown/markdownPostRepository'
import { getPostsByTag } from '../../domain/posts/useCases'
import { PostCard } from '../components/PostCard'
import { Breadcrumb } from '../components/Breadcrumb'
import { useLanguage } from '../context/LanguageContext'
import { isVietnamese } from '../utils/locale'

export function TagPage() {
  const { tag = '' } = useParams()
  const { language } = useLanguage()
  const vi = isVietnamese(language)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function load() {
      const results = await getPostsByTag(markdownPostRepository, decodeURIComponent(tag), { locale: language })
      setPosts(results)
    }

    load()
  }, [tag, language])

  return (
    <section>
      <Breadcrumb crumbs={[
        { label: vi ? 'Trang chủ' : 'Home', to: '/' },
        { label: 'Blog', to: '/blog' },
        { label: `#${decodeURIComponent(tag)}` },
      ]} />
      <div className="section-head">
        <h1 className="page-title">{vi ? `The: #${decodeURIComponent(tag)}` : `Tag: #${decodeURIComponent(tag)}`}</h1>
        <Link to="/blog">{vi ? 'Quay lai blog' : 'Back to blog'}</Link>
      </div>

      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
