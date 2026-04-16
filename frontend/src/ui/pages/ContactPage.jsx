export function ContactPage() {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'hello@devblog.local'
  const githubUrl = import.meta.env.VITE_CONTACT_GITHUB || 'https://github.com/'
  const linkedinUrl = import.meta.env.VITE_CONTACT_LINKEDIN || 'https://www.linkedin.com/'

  return (
    <section>
      <div className="hero-banner">
        <p className="eyebrow">Let's Connect</p>
        <h1>Contact Me</h1>
        <p>
          If you want to discuss software engineering, collaboration opportunities, or
          technical writing, feel free to reach out.
        </p>
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <h2>Email</h2>
          <ul className="dashboard-list">
            <li>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <span>Primary</span>
            </li>
          </ul>
        </article>

        <article className="panel">
          <h2>Social</h2>
          <ul className="dashboard-list">
            <li>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <span>Code</span>
            </li>
            <li>
              <a href={linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <span>Career</span>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}
