import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SiteLayout } from './ui/components/SiteLayout'
import { BlogPage } from './ui/pages/BlogPage'
import { ContactPage } from './ui/pages/ContactPage'
import { DevLifePage } from './ui/pages/DevLifePage'
import { HomePage } from './ui/pages/HomePage'
import { NotFoundPage } from './ui/pages/NotFoundPage'
import { PostPage } from './ui/pages/PostPage'
import { TagPage } from './ui/pages/TagPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<PostPage />} />
        <Route path="posts/:slug" element={<PostPage />} />
        <Route path="dev-life/:slug" element={<PostPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="dev-life" element={<DevLifePage />} />
        <Route path="tags/:tag" element={<TagPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
