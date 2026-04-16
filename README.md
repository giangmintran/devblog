# DevBlog

ReactJS Dev Blog workspace with Markdown-first content strategy.

Current scope:
- Frontend app in `frontend` (React + Vite)
- No backend
- No database
- Content from Markdown files

Future scope:
- Can migrate to backend + database without rewriting the full UI

## 1. Project Goals
- Publish technical blog posts from `.md` files.
- Keep deployment simple with static hosting.
- Design architecture that is ready for future API/DB migration.

Reference spec: [specs/SPEC.md](specs/SPEC.md)

## 0. Quick Start
1. Open terminal in `frontend`.
2. Install dependencies: `npm install`.
3. Run dev server: `npm run dev`.
4. Build production bundle: `npm run build`.

## 2. Suggested Stack
You can choose one static-first framework:
- Astro (recommended for content-heavy sites)
- Hugo (very fast static generator)
- Next.js with static export

## 3. Content Model
Store posts in:
- `frontend/src/content/blog/*.md`
- `frontend/src/content/dev-life/*.md`

Each post should include frontmatter:

```yaml
title: "Post title"
slug: "post-slug"
id: "stable-id"
summary: "Short summary"
tags: ["backend", "system-design"]
category: "software-engineering"
authorId: "admin"
seriesId: ""
status: "published" # draft | published | archived
publishedAt: "2026-04-09"
updatedAt: "2026-04-09"
coverImage: "/images/example.jpg"
canonicalUrl: ""
```

## 4. Recommended Folder Structure
```text
frontend/
  src/
    content/
      blog/
      dev-life/
    domain/
      posts/
    infra/
      content-markdown/
      content-api/          # future provider placeholder
    ui/
  public/
    images/
```

## 5. Functional Requirements (MVP)
- Home page with latest and featured posts.
- Blog listing page with filter by tag/category.
- Post detail page with:
  - Markdown rendering
  - Syntax highlighting
  - Table of contents (TOC)
- Client-side search by title/summary/tags.
- SEO basics:
  - Clean slug route `/blog/[slug]`
  - Meta tags and Open Graph
  - `sitemap.xml`
  - RSS feed
- Responsive layout for desktop/mobile.

## 6. Architecture Rules (Important)
- UI must not read Markdown files directly.
- Use a repository interface, for example: `PostRepository`.
- Current provider: `MarkdownPostRepository`.
- Future providers: `ApiPostRepository`, `DbPostRepository`.
- Switch provider with config (example: `CONTENT_PROVIDER=markdown|api`).

This keeps business logic stable while data source changes.

## 7. Publishing Workflow (No Backend)
1. Create a new Markdown file in `frontend/src/content/blog` or `frontend/src/content/dev-life`.
2. Fill frontmatter and content.
3. Commit and push to Git.
4. CI/CD builds static site.
5. Deploy to Vercel/Netlify/Cloudflare Pages/GitHub Pages.

## 8. Future Expansion Plan
- Phase 1: Markdown-only static blog.
- Phase 2: Add read-only backend API and switch provider.
- Phase 3: Add DB + CMS + review workflow.
- Phase 4: Add auth, roles, comments, bookmarks, newsletter.

## 9. Acceptance Checklist
- Adding one `.md` file creates a new visible post after deploy.
- Tag filtering and search work correctly.
- RSS and sitemap are generated.
- Public URL format remains stable.
- Architecture already includes repository abstraction.

## 10. Next Step
Start by scaffolding your chosen framework and implement:
1. Post schema + repository interface.
2. Markdown provider.
3. Blog list and post detail pages.
4. SEO, RSS, and sitemap.
