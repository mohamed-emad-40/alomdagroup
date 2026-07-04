import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, MapPin, DollarSign, Wrench, ArrowLeft } from 'lucide-react'
import { PROJECTS, PROJECT_CATEGORIES, STATS } from '../../data/content'
import { useReveal } from '../../hooks'
import PageHero from '../../components/ui/PageHero'
import './Projects.css'

function ProjectCard({ p, visible, index }) {
  return (
    <article
      className={`proj-detail-card card reveal ${visible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.07}s` }}
      aria-labelledby={`proj-title-${p.id}`}
    >
      <div className="proj-detail-card__thumb">
        <span className="proj-detail-card__num" aria-hidden="true">
          {String(p.id).padStart(2, '0')}
        </span>
        <div className="proj-detail-card__badges">
          <span className="badge badge-gold">{p.category}</span>
          <span className="badge badge-dark">{p.year}</span>
        </div>
      </div>

      <div className="proj-detail-card__body">
        <h3 className="proj-detail-card__title" id={`proj-title-${p.id}`}>{p.title}</h3>
        <p className="proj-detail-card__desc">{p.desc}</p>

        <dl className="proj-detail-card__meta">
          <div className="proj-meta-item">
            <dt><MapPin size={13} aria-hidden="true" /> الموقع</dt>
            <dd>{p.location}</dd>
          </div>
          <div className="proj-meta-item">
            <dt><Calendar size={13} aria-hidden="true" /> المدة</dt>
            <dd>{p.duration}</dd>
          </div>
          <div className="proj-meta-item">
            <dt><Wrench size={13} aria-hidden="true" /> المعدات</dt>
            <dd>{p.equipment}</dd>
          </div>
          <div className="proj-meta-item">
            <dt><DollarSign size={13} aria-hidden="true" /> القيمة</dt>
            <dd>{p.value}</dd>
          </div>
        </dl>

        <div className="proj-detail-card__highlights" aria-label="أبرز الإنجازات">
          {p.highlights.map(h => (
            <span key={h} className="proj-highlight">{h}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

function ClientsSection() {
  const [ref, visible] = useReveal()
  const clients = [
    'وزارة النقل', 'هيئة ميناء الإسكندرية', 'شركة مصر الجديدة للإسكان',
    'الشركة القابضة للمياه', 'محافظة الجيزة', 'شركة إسمنت بني سويف',
    'المقاولون العرب', 'حسن علام', 'الوطنية للإنشاءات',
  ]
  return (
    <section className="clients-section section-sm" ref={ref} aria-label="عملاؤنا">
      <div className="container">
        <div className={`section-header section-header-center reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">عملاؤنا</div>
          <h2 className="section-title">شركاء النجاح</h2>
        </div>
        <div className="clients-grid">
          {clients.map((c, i) => (
            <div
              key={c}
              className={`client-pill reveal ${visible ? 'visible' : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Projects() {
  const [ref, visible] = useReveal()
  const [active, setActive] = useState('الكل')

  const filtered = active === 'الكل'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active)

  return (
    <main id="main-content">
      <PageHero
        eyebrow="مشاريعنا"
        title="500+ مشروع ناجح في مصر"
        desc="سجل حافل من المشاريع الكبرى في قطاعات البنية التحتية والإنشاءات والصناعة."
        breadcrumbs={[{ label: 'مشاريعنا' }]}
      />

      <section className="projects-section section" ref={ref}>
        <div className="container">
          <div className={`projects-filters reveal ${visible ? 'visible' : ''}`} role="group" aria-label="تصفية المشاريع">
            {PROJECT_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`proj-filter-btn ${active === cat ? 'proj-filter-btn--active' : ''}`}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} p={p} visible={visible} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ClientsSection />

      {/* CTA */}
      <section className="projects-cta section-sm" aria-label="دعوة للتواصل">
        <div className="container">
          <div className="projects-cta__inner">
            <div>
              <h2 className="projects-cta__title">مشروعك التالي يبدأ معنا</h2>
              <p className="projects-cta__desc">انضم لقائمة عملائنا الناجحين واحصل على عرض سعر مجاني</p>
            </div>
            <Link to="/contact" className="btn btn-primary btn-lg">
              ابدأ مشروعك <ArrowLeft size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
