import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section>
      <h1 className="page-title">404</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Back home</Link>
    </section>
  )
}
