import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { NAV_LINKS, COMPANY } from '../../data/content'
import { useScrollY, useLockScroll } from '../../hooks'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrollY = useScrollY()
  const { pathname } = useLocation()

  useLockScroll(open)

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const close = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  const scrolled = scrollY > 20

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="Alomda Group - الرئيسية">
            <div className="navbar__logo-mark" aria-hidden="true">AG</div>
            <div className="navbar__logo-text">
              <span>Alomda</span>
              <b> Group</b>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar__nav" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="navbar__actions">
            <a href={`tel:${COMPANY.phone}`} className="navbar__phone" aria-label="اتصل بنا">
              <Phone size={14} aria-hidden="true" />
              <span>{COMPANY.phone}</span>
            </a>
            <Link to="/contact" className="btn btn-primary btn-sm navbar__cta">
              عرض سعر
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="navbar__burger"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`navbar__overlay ${open ? 'navbar__overlay--open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`navbar__drawer ${open ? 'navbar__drawer--open' : ''}`}
        role="dialog"
        aria-label="قائمة التنقل"
        aria-modal="true"
      >
        <div className="drawer__header">
          <Link to="/" className="navbar__logo" onClick={() => setOpen(false)}>
            <div className="navbar__logo-mark" aria-hidden="true">AG</div>
            <div className="navbar__logo-text"><span>Alomda</span><b> Group</b></div>
          </Link>
          <button className="navbar__burger" onClick={() => setOpen(false)} aria-label="إغلاق القائمة">
            <X size={22} />
          </button>
        </div>

        <nav className="drawer__nav" aria-label="قائمة الموبايل">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `drawer__link ${isActive ? 'drawer__link--active' : ''}`}
              end={link.path === '/'}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="drawer__footer">
          <a href={`tel:${COMPANY.phone}`} className="btn btn-outline btn-full">
            <Phone size={15} /> {COMPANY.phone}
          </a>
          <Link to="/contact" className="btn btn-primary btn-full" onClick={() => setOpen(false)}>
            احصل على عرض سعر مجاني
          </Link>
        </div>
      </div>
    </>
  )
}
