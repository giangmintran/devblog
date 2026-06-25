import { PostRepository } from '../../domain/posts/postRepository'
import postsData from '../../content/posts/data.json'

const postsMetaByFile = new Map(postsData.posts.map((entry) => [entry.file, entry]))
const DEFAULT_LOCALE = 'en'
const SUPPORTED_LOCALES = new Set(['en', 'vi'])

const markdownFiles = import.meta.glob(['../../content/blog/*.md', '../../content/dev-life/*.md', '../../content/posts/*.md'], {
  eager: true,
  query: '?raw',
  import: 'default',
})

const postImageFiles = import.meta.glob(
  [
    '../../content/blog/*.{png,jpg,jpeg,webp,avif,svg}',
    '../../content/dev-life/*.{png,jpg,jpeg,webp,avif,svg}',
    '../../content/posts/*.{png,jpg,jpeg,webp,avif,svg}',
  ],
  {
    eager: true,
    import: 'default',
  },
)

const postImageByBasePath = Object.entries(postImageFiles).reduce((accumulator, [filePath, imageUrl]) => {
  const basePath = filePath.replace(/\.[^.]+$/, '')
  accumulator.set(basePath, imageUrl)
  return accumulator
}, new Map())

const fallbackDate = '1970-01-01'

function normalizeLocale(locale) {
  const normalized = String(locale ?? '').trim().toLowerCase()
  return SUPPORTED_LOCALES.has(normalized) ? normalized : DEFAULT_LOCALE
}

function parseLocalizedStem(fileStem) {
  const match = String(fileStem).match(/^(.*)\.(en|vi)$/i)

  if (!match) {
    return {
      canonicalStem: String(fileStem),
      locale: DEFAULT_LOCALE,
    }
  }

  return {
    canonicalStem: match[1],
    locale: normalizeLocale(match[2]),
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function estimateReadingTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 220)
  return Math.max(minutes, 1)
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')   // fenced code blocks
    .replace(/`[^`]*`/g, ' ')           // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ') // links
    .replace(/^#{1,6}\s+/gm, '')        // headings
    .replace(/^[-*+]\s+/gm, '')         // unordered list bullets
    .replace(/^\d+\.\s+/gm, '')         // ordered list numbers
    .replace(/^>\s?/gm, '')             // blockquotes
    .replace(/^-{3,}$/gm, '')           // horizontal rules
    .replace(/[*_~|]/g, '')             // bold/italic/strikethrough/table
    .replace(/\p{Emoji_Presentation}/gu, '') // emoji
    .replace(/\s+/g, ' ')
    .trim()
}

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

  if (!match) {
    return { attributes: {}, body: raw }
  }

  const header = match[1]
  const body = match[2]
  const attributes = {}
  const lines = header.split(/\r?\n/)

  for (const line of lines) {
    const separatorIndex = line.indexOf(':')

    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const rawValue = line.slice(separatorIndex + 1).trim()

    if (!key) {
      continue
    }

    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      const values = rawValue
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)

      attributes[key] = values
      continue
    }

    attributes[key] = rawValue.replace(/^['"]|['"]$/g, '')
  }

  return { attributes, body }
}

function extractTitleAndSummary(content) {
  const lines = content.split(/\r?\n/).map((line) => line.trim())

  let derivedTitle = ''
  for (const line of lines) {
    const match = line.match(/^#\s+(.+)$/)
    if (match) {
      derivedTitle = stripMarkdown(match[1].trim())
      break
    }
  }

  const paragraphLines = lines.filter((line) => {
    const trimmed = line.trim()
    return (
      trimmed &&
      !trimmed.startsWith('#') &&
      !trimmed.startsWith('---') &&
      !trimmed.startsWith('```')
    )
  })
  const derivedSummary = stripMarkdown(paragraphLines.join(' ')).slice(0, 300)

  return {
    derivedTitle,
    derivedSummary,
  }
}

function toDateString(value, fallback = fallbackDate) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return fallback
  }

  return date.toISOString().slice(0, 10)
}

function resolvePublishedDate(data) {
  return data.publishedAt ?? data.date ?? data.published_at ?? data.publishDate ?? fallbackDate
}

function resolveUpdatedDate(data, publishedDate) {
  return data.updatedAt ?? data.updated_at ?? data.lastModified ?? publishedDate
}

function parsePost(filePath, raw) {
  const { attributes, body } = parseFrontMatter(raw)
  const data = attributes ?? {}
  const content = body ?? ''
  const fileName = filePath.split('/').pop()?.replace(/\.md$/, '') ?? ''
  const { canonicalStem, locale } = parseLocalizedStem(fileName)
  const canonicalFileName = `${canonicalStem}.md`
  const source = filePath.includes('/content/dev-life/') ? 'dev-life' : filePath.includes('/content/posts/') ? 'posts' : 'blog'

  // Merge metadata from data.json for posts source
  const jsonMeta = source === 'posts'
    ? (postsMetaByFile.get(canonicalFileName) ?? postsMetaByFile.get(`${fileName}.md`) ?? {})
    : {}

  const { derivedTitle, derivedSummary } = extractTitleAndSummary(content)
  const title = String(jsonMeta.title ?? data.title ?? derivedTitle ?? canonicalStem ?? 'Untitled')
  const slug = String(jsonMeta.slug ?? data.slug ?? slugify(title || canonicalStem))
  const rawSummary = String(data.summary ?? derivedSummary ?? stripMarkdown(content).slice(0, 100))
  const summary = rawSummary.length > 100 ? rawSummary.slice(0, 100).trimEnd() + '…' : rawSummary
  const basePath = filePath.replace(/\.md$/, '')
  const dirPath = filePath.substring(0, filePath.lastIndexOf('/'))
  const jsonCoverImage = jsonMeta.coverImage
    ? postImageByBasePath.get(`${dirPath}/${jsonMeta.coverImage.replace(/\.[^.]+$/, '')}`) ?? ''
    : ''
  const autoCoverImage = jsonCoverImage || postImageByBasePath.get(basePath) || ''
  const publishedDate = jsonMeta.publishedAt ?? resolvePublishedDate(data)
  const updatedDate = resolveUpdatedDate(data, publishedDate)
  const tags = jsonMeta.tags ?? (Array.isArray(data.tags) ? data.tags.map(String) : [])
  const rawStatus = jsonMeta.status ?? data.status
  const status = rawStatus === 'draft' || rawStatus === 'archived' ? rawStatus : 'published'

  return {
    id: String(jsonMeta.slug ?? data.id ?? slug),
    translationKey: `${source}:${canonicalStem}`,
    locale,
    slug,
    title,
    summary,
    tags,
    category: String(jsonMeta.category ?? data.category ?? 'software-engineering'),
    authorId: String(data.authorId ?? 'admin'),
    seriesId: data.seriesId ? String(data.seriesId) : '',
    status,
    publishedAt: toDateString(publishedDate, fallbackDate),
    updatedAt: toDateString(updatedDate, fallbackDate),
    coverImage: data.coverImage ? String(data.coverImage) : autoCoverImage,
    canonicalUrl: data.canonicalUrl ? String(data.canonicalUrl) : '',
    source,
    content,
    readingTimeMinutes: estimateReadingTime(content),
  }
}

function selectLocalizedPosts(posts, preferredLocale) {
  const groupedByTranslation = new Map()

  for (const post of posts) {
    const key = post.translationKey || `${post.source}:${post.slug}`

    if (!groupedByTranslation.has(key)) {
      groupedByTranslation.set(key, new Map())
    }

    groupedByTranslation.get(key).set(post.locale || DEFAULT_LOCALE, post)
  }

  return [...groupedByTranslation.values()].map((group) => {
    return group.get(preferredLocale) || group.get(DEFAULT_LOCALE) || group.values().next().value
  })
}

export class MarkdownPostRepository extends PostRepository {
  async getAllPosts(options = {}) {
    const preferredLocale = normalizeLocale(options.locale)
    const parsedPosts = Object.entries(markdownFiles).map(([filePath, raw]) => parsePost(filePath, raw))
    return selectLocalizedPosts(parsedPosts, preferredLocale)
  }

  async getPostBySlug(slug, options = {}) {
    const posts = await this.getAllPosts(options)
    return posts.find((post) => post.slug === slug) ?? null
  }
}

export const markdownPostRepository = new MarkdownPostRepository()
