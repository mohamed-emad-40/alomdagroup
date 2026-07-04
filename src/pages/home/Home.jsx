import { Link } from 'react-router-dom'
import { ArrowLeft, Play, CheckCircle2, Star, Zap, Wrench, Ship, ShoppingCart, Truck, ClipboardList, ShieldCheck } from 'lucide-react'
import { STATS, SERVICES, TESTIMONIALS, PARTNERS, PROJECTS } from '../../data/content'
import { useReveal, useCounter } from '../../hooks'
import './Home.css'

const SVC_ICONS = {
  import:      Ship,
  sales:       ShoppingCart,
  maintenance: Wrench,
  transport:   Truck,
  consulting:  ClipboardList,
  insurance:   ShieldCheck,
}
function SvcIcon({ slug }) {
  const Icon = SVC_ICONS[slug] || Wrench
  return <Icon size={22} aria-hidden="true" />
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero" aria-label="القسم الرئيسي">
      <div className="container hero__inner">

        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            الشريك الموثوق لاستيراد وبيع المعدات الثقيلة
          </div>

          <h1 className="hero__title">
            استيراد وبيع<br />
            معدات ثقيلة{' '}
            <em className="hero__em">
              بجودة عالمية
              <svg className="hero__underline" viewBox="0 0 220 12" aria-hidden="true" preserveAspectRatio="none">
                <path d="M2 9 Q55 2 110 8 Q165 14 218 7" stroke="var(--gold)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              </svg>
            </em>
          </h1>

          <p className="hero__desc">
            نستورد ونبيع أحدث المعدات الثقيلة من أفضل الماركات العالمية لكل أنواع المشاريع الإنشائية والبنية التحتية في مصر. كتالوج يتجاوز 200 معدة.
          </p>

          <ul className="hero__checks" aria-label="مميزاتنا">
            {['ضمان على جميع المعدات', 'استيراد من 10+ دول', 'تسليم لموقعك مباشرة'].map(item => (
              <li key={item} className="hero__check">
                <CheckCircle2 size={16} className="hero__check-icon" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              احصل على عرض سعر مجاني
              <ArrowLeft size={18} aria-hidden="true" />
            </Link>
            <Link to="/fleet" className="btn btn-outline btn-lg">
              تصفح المعدات
            </Link>
          </div>

          <div className="hero__stats" role="list" aria-label="إحصائيات">
            {[{ num: '500+', label: 'صفقة ناجحة' }, { num: '200+', label: 'معدة' }, { num: '15+', label: 'سنة خبرة' }].map(s => (
              <div key={s.label} className="hero__stat" role="listitem">
                <div className="hero__stat-num">{s.num}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__card anim-float">
            <svg viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero__svg">
              <rect width="460" height="280" rx="16" fill="#EEF1F5"/>
              <circle cx="390" cy="55" r="40" fill="#FFF3DC" opacity=".7"/>
              <circle cx="390" cy="55" r="26" fill="#FFDFA0" opacity=".5"/>
              <rect x="0" y="240" width="460" height="60" fill="#DED6C8"/>
              <rect x="0" y="238" width="460" height="6" rx="2" fill="#C8BC9F"/>
              <rect x="370" y="50" width="14" height="190" rx="4" fill="#C8CDD4"/>
              <line x1="377" y1="50" x2="440" y2="24" stroke="#B8BEC8" strokeWidth="5" strokeLinecap="round"/>
              <line x1="440" y1="24" x2="440" y2="240" stroke="#C4CAD4" strokeWidth="2.5" strokeDasharray="5 4"/>
              <rect x="433" y="214" width="14" height="14" rx="3" fill="#A8B2BC"/>
              <rect x="90" y="170" width="165" height="70" rx="10" fill="#E8971A"/>
              <rect x="90" y="182" width="165" height="5" fill="rgba(0,0,0,.08)"/>
              <rect x="106" y="130" width="68" height="46" rx="8" fill="#1A1A1A"/>
              <rect x="112" y="136" width="56" height="30" rx="4" fill="#AACDE0"/>
              <rect x="115" y="139" width="18" height="11" rx="2" fill="rgba(255,255,255,.4)"/>
              <text x="198" y="200" fontSize="9" fill="rgba(255,255,255,.9)" fontWeight="800" fontFamily="Cairo,sans-serif">ALOMDA</text>
              <line x1="226" y1="154" x2="315" y2="94" stroke="#555" strokeWidth="17" strokeLinecap="round"/>
              <line x1="315" y1="94" x2="352" y2="140" stroke="#444" strokeWidth="13" strokeLinecap="round"/>
              <line x1="244" y1="150" x2="294" y2="112" stroke="#888" strokeWidth="6" strokeLinecap="round"/>
              <path d="M348 136 L370 144 L364 170 L342 162Z" fill="#2C2C2C"/>
              <path d="M364 168 L370 178 L360 182 L354 172Z" fill="#222"/>
              <rect x="78" y="232" width="190" height="16" rx="8" fill="#2C2C2C"/>
              {[92,112,134,156,178,200,222,246,264].map((x,i) => <circle key={i} cx={x} cy="240" r="7" fill="#3C3C3C"/>)}
              <rect x="86" y="225" width="174" height="10" rx="4" fill="#383838"/>
              <circle cx="110" cy="129" r="5" fill="#FF4444"/>
              <ellipse cx="173" cy="245" rx="95" ry="8" fill="rgba(0,0,0,.08)"/>
            </svg>

            <div className="hero__tag hero__tag--1">
              <div className="hero__tag-icon"><CheckCircle2 size={18} aria-hidden="true" /></div>
              <div>
                <div className="hero__tag-title">جودة مضمونة</div>
                <div className="hero__tag-sub">فحص شامل قبل التسليم</div>
              </div>
            </div>

            <div className="hero__tag hero__tag--2">
              <div className="hero__tag-icon"><Zap size={18} aria-hidden="true" /></div>
              <div>
                <div className="hero__tag-title">استيراد سريع</div>
                <div className="hero__tag-sub">4-8 أسابيع فقط</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners marquee */}
      <div className="hero__partners" aria-label="شركاؤنا">
        <div className="container">
          <div className="hero__partners-inner">
            <span className="hero__partners-label">شركاؤنا الدوليون</span>
            <div className="hero__marquee" aria-hidden="true">
              <div className="hero__marquee-track">
                {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
                  <span key={i} className="hero__partner">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Stats ─── */
function StatCard({ value, suffix, label, active }) {
  const count = useCounter(value, 1800, active)
  return (
    <div className="stat-card">
      <div className="stat-card__num">{count}{suffix}</div>
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__bar">
        <div className="stat-card__fill" style={{ width: active ? '80%' : '0%' }} />
      </div>
    </div>
  )
}

function Stats() {
  const [ref, visible] = useReveal()
  return (
    <section className="stats" aria-label="إحصائيات الشركة" ref={ref}>
      <div className="container">
        <div className="stats__grid" role="list">
          {STATS.map(s => (
            <div key={s.label} role="listitem">
              <StatCard {...s} active={visible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Services preview ─── */
function ServicesPreview() {
  const [ref, visible] = useReveal()
  return (
    <section className="services-preview section" ref={ref}>
      <div className="container">
        <div className={`section-header section-header-center reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">ما نقدمه</div>
          <h2 className="section-title">خدمات متكاملة للمعدات الثقيلة</h2>
          <p className="section-desc">من الاستيراد إلى الصيانة الشاملة، كل ما يحتاجه مشروعك</p>
        </div>

        <div className="svc-grid">
          {SERVICES.map((svc, i) => (
            <Link
              to="/services"
              key={svc.id}
              className={`svc-card card reveal ${visible ? 'visible' : ''}`}
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              <div className="svc-card__icon" style={{ '--svc-color': svc.color }}>
                <SvcIcon slug={svc.slug} />
              </div>
              <h3 className="svc-card__title">{svc.title}</h3>
              <p className="svc-card__desc">{svc.shortDesc}</p>
              <div className="svc-card__link">
                اعرف أكثر <ArrowLeft size={14} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        <div className="services-preview__cta">
          <Link to="/services" className="btn btn-outline btn-lg">عرض جميع الخدمات</Link>
        </div>
      </div>
    </section>
  )
}

/* ─── Projects preview ─── */
function ProjectsPreview() {
  const [ref, visible] = useReveal()
  return (
    <section className="projects-preview section" ref={ref}>
      <div className="container">
        <div className="projects-preview__header">
          <div>
            <div className="section-eyebrow">صفقاتنا</div>
            <h2 className="section-title">توريدات نفخر بها</h2>
          </div>
          <Link to="/projects" className="btn btn-outline">عرض الكل</Link>
        </div>

        <div className="proj-grid">
          {PROJECTS.slice(0, 4).map((p, i) => (
            <div
              key={p.id}
              className={`proj-card card reveal ${visible ? 'visible' : ''}`}
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="proj-card__thumb">
                <span className="proj-card__num" aria-hidden="true">0{p.id}</span>
                <span className="badge badge-gold">{p.category}</span>
              </div>
              <div className="proj-card__body">
                <h3 className="proj-card__title">{p.title}</h3>
                <p className="proj-card__desc">{p.desc}</p>
                <div className="proj-card__meta">
                  <span>{p.year}</span>
                  <span className="proj-card__dot" aria-hidden="true">·</span>
                  <span>{p.equipment}</span>
                  <span className="proj-card__dot" aria-hidden="true">·</span>
                  <span>{p.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─── */
function Testimonials() {
  const [ref, visible] = useReveal()
  return (
    <section className="testimonials section" ref={ref} aria-label="آراء العملاء">
      <div className="container">
        <div className={`section-header section-header-center reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">آراء العملاء</div>
          <h2 className="section-title">ماذا يقول شركاؤنا</h2>
        </div>
        <div className="test-grid">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={t.id}
              className={`test-card card reveal ${visible ? 'visible' : ''}`}
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="test-card__stars" aria-label={`تقييم ${t.rating} من 5`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="var(--gold)" color="var(--gold)" aria-hidden="true" />
                ))}
              </div>
              <p className="test-card__text">{t.text}</p>
              <footer className="test-card__author">
                <div className="test-card__avatar" aria-hidden="true">
                  {t.name.split(' ').slice(-1)[0].slice(0, 2)}
                </div>
                <div>
                  <cite className="test-card__name">{t.name}</cite>
                  <div className="test-card__role">{t.role}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Band ─── */
function CTABand() {
  return (
    <section className="cta-band section-sm" aria-label="دعوة للتواصل">
      <div className="container">
        <div className="cta-band__inner">
          <div className="cta-band__text">
            <h2 className="cta-band__title">ابدأ صفقتك معنا اليوم</h2>
            <p className="cta-band__desc">تواصل معنا اليوم واحصل على عرض سعر مجاني خلال ساعة</p>
          </div>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              احصل على عرض سعر
              <ArrowLeft size={18} aria-hidden="true" />
            </Link>
            <a href="https://wa.me/201000000000" className="btn btn-dark btn-lg" target="_blank" rel="noopener noreferrer">
              واتساب مباشر
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ─── */
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Stats />
      <ServicesPreview />
      <ProjectsPreview />
      <Testimonials />
      <CTABand />
    </main>
  )
}