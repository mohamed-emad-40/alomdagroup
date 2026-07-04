import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import './PageHero.css'

export default function PageHero({ eyebrow, title, desc, breadcrumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="container">
        {breadcrumbs.length > 0 && (
          <nav className="page-hero__breadcrumb" aria-label="مسار التنقل">
            <Link to="/" className="bc-link">الرئيسية</Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="bc-item">
                <ChevronLeft size={14} aria-hidden="true" />
                {b.path
                  ? <Link to={b.path} className="bc-link">{b.label}</Link>
                  : <span className="bc-current">{b.label}</span>
                }
              </span>
            ))}
          </nav>
        )}
        <div className="page-hero__eyebrow">{eyebrow}</div>
        <h1 className="page-hero__title">{title}</h1>
        {desc && <p className="page-hero__desc">{desc}</p>}
      </div>
      <div className="page-hero__bg" aria-hidden="true">
        <div className="page-hero__blob page-hero__blob--1" />
        <div className="page-hero__blob page-hero__blob--2" />
      </div>
    </section>
  )
}
