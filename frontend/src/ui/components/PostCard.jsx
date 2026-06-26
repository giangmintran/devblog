import { Link } from 'react-router-dom'
import { getPostPath } from '../utils/postPath'
import { useLanguage } from '../context/LanguageContext'
import { formatDateByLanguage, isVietnamese } from '../utils/locale'

const MAX_TAGS = 3

export function PostCard({ post, layout = 'horizontal' }) {
  const { language } = useLanguage()
  const vi = isVietnamese(language)
  const isHorizontal = layout === 'horizontal' && post.coverImage
  const visibleTags = post.tags.slice(0, MAX_TAGS)
  const extraCount = post.tags.length - MAX_TAGS

  return (
    <article className={`card${isHorizontal ? ' card-horizontal' : ''}`}>
      {post.coverImage ? (
        isHorizontal ? (
          <Link to={getPostPath(post)} className="card-cover-link" tabIndex={-1} aria-hidden="true">
            <img className="card-cover" src={post.coverImage} alt={vi ? `Anh bia cho ${post.title}` : `Cover for ${post.title}`} loading="lazy" />
          </Link>
        ) : (
          <img className="card-cover card-cover-full" src={post.coverImage} alt={vi ? `Anh bia cho ${post.title}` : `Cover for ${post.title}`} loading="lazy" />
        )
      ) : null}
      <div className="card-body">
        <p className="card-meta">
          <span>{formatDateByLanguage(post.publishedAt, language)}</span>
        </p>
        <h3 className="card-title">
          <Link to={getPostPath(post)}>{post.title}</Link>
        </h3>
        <p className="card-summary">{post.summary}</p>
        <div className="card-footer">
          <ul className="tag-list" aria-label={vi ? 'The bai viet' : 'Post tags'}>
            {visibleTags.map((tag) => (
              <li key={tag}>
                <Link to={`/tags/${encodeURIComponent(tag.toLowerCase())}`}>#{tag}</Link>
              </li>
            ))}
            {extraCount > 0 && (
              <li className="tag-extra">+{extraCount}</li>
            )}
          </ul>
        </div>
      </div>
    </article>
  )
}
