import { Link } from 'react-router-dom'

/**
 * @param {{ crumbs: Array<{ label: string, to?: string }> }} props
 */
export function Breadcrumb({ crumbs }) {
  if (!crumbs || crumbs.length <= 1) return null

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <li key={index}>
              {!isLast && crumb.to ? (
                <Link to={crumb.to}>{crumb.label}</Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{crumb.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
