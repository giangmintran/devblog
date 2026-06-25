import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function SiteLayout() {
  const [theme, setTheme] = useState('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, setLanguage, supportedLanguages } = useLanguage()

  const languageLabels = {
    en: 'EN',
    vi: 'VI',
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('devblog-theme')

    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
      document.documentElement.setAttribute('data-theme', storedTheme)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = prefersDark ? 'dark' : 'light'
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('devblog-theme', nextTheme)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="shell">
      <header className="site-header">
        <Link to="/" className="brand">
          DevBlog
        </Link>
        <div className="header-actions">
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            Menu
          </button>

          <nav
            id="main-navigation"
            className={menuOpen ? 'open' : ''}
            aria-label="Main navigation"
          >
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/blog" onClick={closeMenu}>
              Blog
            </NavLink>
            <NavLink to="/dev-life" onClick={closeMenu}>
              Dev's Life
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact Me
            </NavLink>
          </nav>
          <button className="theme-switch" type="button" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light' : 'Dark'} mode
          </button>
          <div className="language-toggle" role="group" aria-label="Select content language">
            {supportedLanguages.map((code) => {
              const isActive = language === code

              return (
                <button
                  key={code}
                  type="button"
                  className={`language-toggle-btn${isActive ? ' is-active' : ''}`}
                  onClick={() => setLanguage(code)}
                  aria-pressed={isActive}
                >
                  {languageLabels[code] ?? code.toUpperCase()}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Develop by <b>Giangmintran</b>.</p>
      </footer>
    </div>
  )
}
