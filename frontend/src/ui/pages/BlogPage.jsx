import { useEffect, useMemo, useState } from 'react'
import { markdownPostRepository } from '../../infra/content-markdown/markdownPostRepository'
import { getPublishedPostsBySource } from '../../domain/posts/useCases'
import { PostCard } from '../components/PostCard'
import { Breadcrumb } from '../components/Breadcrumb'
import { useLanguage } from '../context/LanguageContext'
import { isVietnamese } from '../utils/locale'
import { BLOG_POSTS_PER_PAGE } from '../config/pagination'

function ChevronLeftIcon() {
  return (
    <svg className="pagination-btn-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg className="pagination-btn-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const CATEGORIES = [
  {
    id: 'programming-fundamentals',
    label: 'Programming Fundamentals',
    tags: ['programming', 'fundamentals', 'algorithms', 'data structures', 'oop', 'functional', 'computer science', 'concurrency', 'async', 'memory', 'clean code', 'refactoring', 'design patterns', 'error handling', 'debugging'],
    children: [
      {
        id: 'dsa',
        label: 'Data Structures & Algorithms (DSA)',
        tags: ['algorithms', 'data structures', 'dsa', 'sorting', 'graph', 'tree', 'complexity'],
      },
      {
        id: 'oop-design',
        label: 'OOP & Design Principles',
        tags: ['oop', 'object oriented', 'solid', 'design principles', 'inheritance', 'polymorphism'],
      },
      {
        id: 'concurrency',
        label: 'Concurrency & Async',
        tags: ['concurrency', 'async', 'multithreading', 'parallel', 'coroutine', 'event loop', 'promise'],
      },
      {
        id: 'memory',
        label: 'Memory Management',
        tags: ['memory', 'memory management', 'garbage collection', 'heap', 'stack', 'pointers'],
      },
      {
        id: 'clean-code',
        label: 'Clean Code & Refactoring',
        tags: ['clean code', 'refactoring', 'code quality', 'readability', 'technical debt'],
      },
      {
        id: 'design-patterns',
        label: 'Design Patterns',
        tags: ['design patterns', 'patterns', 'creational', 'structural', 'behavioral', 'singleton', 'factory', 'observer'],
      },
      {
        id: 'error-handling',
        label: 'Error Handling & Debugging',
        tags: ['error handling', 'debugging', 'exceptions', 'logging', 'tracing', 'error'],
      },
    ],
  },
  {
    id: 'backend-frontend',
    label: 'Development',
    tags: ['backend', 'frontend', 'api', 'rest', 'graphql', 'nodejs', 'react', 'vue', 'angular', 'css', 'html', 'javascript', 'ui', 'server'],
    children: [
      {
        id: 'backend',
        label: 'Backend',
        tags: ['backend', 'api', 'rest', 'graphql', 'nodejs', 'python', 'java', 'server'],
      },
      {
        id: 'frontend',
        label: 'Frontend',
        tags: ['frontend', 'react', 'vue', 'angular', 'css', 'html', 'javascript', 'ui'],
      },
    ],
  },
  {
    id: 'system-design',
    label: 'System Design & Architecture',
    tags: ['system design', 'architecture', 'microservices', 'distributed', 'scalability', 'design patterns'],
  },
  {
    id: 'database',
    label: 'Database & Data Engineering',
    tags: ['database', 'sql', 'nosql', 'data engineering', 'etl', 'postgresql', 'mongodb', 'redis'],
  },
  {
    id: 'security',
    label: 'Security',
    tags: ['security', 'auth', 'authentication', 'authorization', 'oauth', 'jwt', 'owasp', 'encryption'],
  },
  {
    id: 'devops',
    label: 'DevOps & Deployment',
    tags: ['devops', 'docker', 'kubernetes', 'ci/cd', 'deployment', 'aws', 'cloud', 'infrastructure'],
  },
  {
    id: 'testing',
    label: 'Testing',
    tags: ['testing', 'unit test', 'integration test', 'tdd', 'jest', 'cypress', 'qa'],
  },
]

function getCategoryById(id) {
  for (const cat of CATEGORIES) {
    if (cat.id === id) return cat
    if (cat.children) {
      const child = cat.children.find((c) => c.id === id)
      if (child) return child
    }
  }
  return null
}

function getParentCategoryId(id) {
  for (const cat of CATEGORIES) {
    if (cat.children) {
      const child = cat.children.find((c) => c.id === id)
      if (child) return cat.id
    }
  }
  return null
}

export function BlogPage() {
  const { language } = useLanguage()
  const vi = isVietnamese(language)
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('all')
  const [activeCategory, setActiveCategory] = useState(null)
  const [expandedCategories, setExpandedCategories] = useState(new Set())
  const [closingCategories, setClosingCategories] = useState(new Set())
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function load() {
      const publishedPosts = await getPublishedPostsBySource(markdownPostRepository, 'posts', { locale: language })
      setPosts(publishedPosts)
    }

    load()
  }, [language])

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
    const normalizedQuery = query.trim().toLowerCase()

    let basePosts = posts

    if (activeCategory) {
      const cat = getCategoryById(activeCategory)
      if (cat) {
        basePosts = posts.filter((post) =>
          post.tags.some((tag) => cat.tags.includes(tag.toLowerCase()))
        )
      }
    }

    const tagFilteredPosts =
      activeTag === 'all'
        ? basePosts
        : basePosts.filter((post) => post.tags.some((tag) => tag.toLowerCase() === activeTag))

    if (!normalizedQuery) {
      return tagFilteredPosts
    }

    return tagFilteredPosts.filter((post) => {
      const haystack = [post.title, post.summary, post.tags.join(' ')].join(' ').toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [posts, query, activeTag, activeCategory])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / BLOG_POSTS_PER_PAGE))
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * BLOG_POSTS_PER_PAGE
    return filteredPosts.slice(start, start + BLOG_POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [query, activeTag, activeCategory, language])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const CLOSE_DURATION = 220

  function toggleCategory(id) {
    if (expandedCategories.has(id)) {
      setClosingCategories((prev) => new Set(prev).add(id))
      setTimeout(() => {
        setExpandedCategories((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
        setClosingCategories((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      }, CLOSE_DURATION)
    } else {
      setExpandedCategories((prev) => new Set(prev).add(id))
    }
  }

  function selectCategory(id) {
    if (id === 'all') {
      setExpandedCategories(new Set())
      setClosingCategories(new Set())
      setActiveCategory(null)
      setActiveTag('all')
      setMobileSidebarOpen(false)
      return
    }

    const parentId = getParentCategoryId(id)

    if (parentId) {
      setExpandedCategories(new Set([parentId]))
      setClosingCategories(new Set())
    } else {
      setExpandedCategories(new Set())
      setClosingCategories(new Set())
    }

    setActiveCategory((prev) => (prev === id ? null : id))
    setActiveTag('all')
    setMobileSidebarOpen(false)
  }

  return (
    <section>
      <Breadcrumb crumbs={[
        { label: vi ? 'Trang chủ' : 'Home', to: '/' },
        { label: 'Blog' },
      ]} />
      <div className="section-head">
        <h1 className="page-title">Blog</h1>
      </div>

      <div className="blog-layout">
        <button
          type="button"
          className={`sidebar-mobile-toggle${mobileSidebarOpen ? ' is-open' : ''}`}
          onClick={() => setMobileSidebarOpen((v) => !v)}
          aria-expanded={mobileSidebarOpen}
        >
          <span>{vi ? 'Bộ lọc &amp; Danh mục' : 'Filters & Categories'}</span>
          <span className="sidebar-mobile-toggle-icon">▸</span>
        </button>

        <aside className={`blog-sidebar${mobileSidebarOpen ? ' mobile-open' : ''}`} aria-label="Tag menu">
          <div className="sidebar-section">
            <h2>{vi ? 'Danh mục' : 'Categories'}</h2>
            <ul className="category-list">
              <li className="category-item">
                <div className="category-row">
                  <button
                    type="button"
                    className={`category-btn${activeCategory === null ? ' active' : ''}`}
                    onClick={() => selectCategory('all')}
                  >
                    <span>{vi ? `Tất cả danh mục (${posts.length})` : `All Categories (${posts.length})`}</span>
                  </button>
                </div>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id} className={`category-item${cat.children && expandedCategories.has(cat.id) && !closingCategories.has(cat.id) ? ' is-open' : ''}`}>
                  <div className="category-row">
                    <button
                      type="button"
                      className={`category-btn${activeCategory === cat.id ? ' active' : ''}`}
                      onClick={() => {
                        if (cat.children) {
                          toggleCategory(cat.id)
                        } else {
                          selectCategory(cat.id)
                        }
                      }}
                    >
                      <span>{cat.label}</span>
                      {cat.children && (
                        <span className="category-expand-icon">▸</span>
                      )}
                    </button>
                  </div>
                  {cat.children && expandedCategories.has(cat.id) && (
                    <ul className={`category-children${closingCategories.has(cat.id) ? ' is-closing' : ''}`}>
                      {cat.children.map((child) => (
                        <li key={child.id}>
                          <button
                            type="button"
                            className={`category-btn category-child-btn${activeCategory === child.id ? ' active' : ''}`}
                            onClick={() => selectCategory(child.id)}
                          >
                            {child.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h2>Tags</h2>
            <ul>
              <li>
                <button
                  type="button"
                  className={activeTag === 'all' ? 'active' : ''}
                  onClick={() => { setActiveTag('all'); setMobileSidebarOpen(false) }}
                >
                  {vi ? `Tất cả (${posts.length})` : `All (${posts.length})`}
                </button>
              </li>
              {tagCounts.map((tag) => (
                <li key={tag.key}>
                  <button
                    type="button"
                    className={activeTag === tag.key ? 'active' : ''}
                    onClick={() => { setActiveTag(tag.key); setMobileSidebarOpen(false) }}
                  >
                    #{tag.label} ({tag.count})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="blog-content">
          <label htmlFor="search" className="search-label">
            {vi ? 'Tìm kiếm' : 'Search posts'}
          </label>
          <input
            id="search"
            className="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={vi ? 'Tìm theo tiêu đề, tóm tắt, thẻ' : 'Search by title, summary, tags'}
          />

          <p className="results-count">{vi ? `${filteredPosts.length} bài viết` : `${filteredPosts.length} post(s)`}</p>

          <div className="blog-post-list">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 ? (
            <nav className="pagination" aria-label={vi ? 'Phân trang bài viết' : 'Post pagination'}>
              <button
                type="button"
                className="pagination-btn"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon /> {vi ? 'Trước' : 'Previous'}
              </button>

              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1

                  return (
                    <button
                      key={page}
                      type="button"
                      className={`pagination-page${currentPage === page ? ' active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                className="pagination-btn"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
              >
                {vi ? 'Sau' : 'Next'} <ChevronRightIcon />
              </button>
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  )
}
