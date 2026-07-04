import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Share2, ArrowUp } from 'lucide-react'
import { COMPANY, NAV_LINKS, SERVICES } from '../../data/content'
import './Footer.css'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-mark">AG</div>
              <div>
                <div className="footer__logo-name">Alomda <span>Group</span></div>
                <div className="footer__logo-sub">للمعدات الثقيلة</div>
              </div>
            </Link>
            <p className="footer__about">
              الشريك الموثوق لاستيراد وبيع المعدات الثقيلة في مصر منذ {COMPANY.founded}. كتالوج يتجاوز 200 معدة ونخدم جميع محافظات مصر.
            </p>
            <div className="footer__social">
              {[
                { href: COMPANY.facebook,  Icon: Share2, label: 'فيسبوك' },
                { href: COMPANY.instagram, Icon: Share2, label: 'إنستجرام' },
                { href: COMPANY.linkedin,  Icon: Share2, label: 'لينكدإن' },
                { href: COMPANY.youtube,   Icon: Share2, label: 'يوتيوب' },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} className="footer__social-btn" aria-label={label} target="_blank" rel="noopener noreferrer">
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="footer__col">
            <h3 className="footer__col-title">روابط سريعة</h3>
            <ul>
              {NAV_LINKS.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="footer__link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h3 className="footer__col-title">خدماتنا</h3>
            <ul>
              {SERVICES.map(s => (
                <li key={s.id}>
                  <Link to="/services" className="footer__link">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h3 className="footer__col-title">تواصل معنا</h3>
            <ul className="footer__contact">
              <li>
                <a href={`tel:${COMPANY.phone}`} className="footer__contact-item">
                  <Phone size={14} aria-hidden="true" />
                  <span>{COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone2}`} className="footer__contact-item">
                  <Phone size={14} aria-hidden="true" />
                  <span>{COMPANY.phone2}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="footer__contact-item">
                  <Mail size={14} aria-hidden="true" />
                  <span>{COMPANY.email}</span>
                </a>
              </li>
              <li>
                <div className="footer__contact-item">
                  <MapPin size={14} aria-hidden="true" />
                  <span>{COMPANY.address}</span>
                </div>
              </li>
            </ul>

            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              className="footer__whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تواصل عبر واتساب"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.11.554 4.09 1.521 5.813L.057 23.995l6.335-1.44A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.373l-.359-.213-3.714.844.88-3.617-.234-.37A9.818 9.818 0 1112 21.818z"/>
              </svg>
              واتساب
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} Alomda Group — جميع الحقوق محفوظة</p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__link">سياسة الخصوصية</a>
            <a href="#" className="footer__link">الشروط والأحكام</a>
          </div>
          <button className="footer__scroll-top" onClick={scrollTop} aria-label="العودة لأعلى">
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}