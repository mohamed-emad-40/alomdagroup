import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowLeft, Wrench, Truck, ClipboardList, ShieldCheck, Ship, ShoppingCart } from 'lucide-react'
import { SERVICES, FAQ } from '../../data/content'
import { useReveal } from '../../hooks'
import PageHero from '../../components/ui/PageHero'
import './Services.css'

const ICONS = {
  import:      Ship,
  sales:       ShoppingCart,
  maintenance: Wrench,
  transport:   Truck,
  consulting:  ClipboardList,
  insurance:   ShieldCheck,
}

function ServiceCard({ svc, index }) {
  const [ref, visible] = useReveal()
  const Icon = ICONS[svc.slug] || Wrench
  return (
    <article
      ref={ref}
      id={svc.slug}
      className={`svc-detail-card card reveal ${visible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
      aria-labelledby={`svc-title-${svc.id}`}
    >
      <div className="svc-detail-card__header">
        <div className="svc-detail-card__icon" style={{ '--c': svc.color }}>
          <Icon size={28} aria-hidden="true" />
        </div>
        <div>
          <h2 className="svc-detail-card__title" id={`svc-title-${svc.id}`}>{svc.title}</h2>
          <p className="svc-detail-card__short">{svc.shortDesc}</p>
        </div>
      </div>

      <p className="svc-detail-card__desc">{svc.desc}</p>

      <div className="svc-detail-card__divider" aria-hidden="true" />

      <h3 className="svc-detail-card__features-heading">ما يشمله هذا الخدمة</h3>
      <ul className="svc-detail-card__features" aria-label={`مميزات ${svc.title}`}>
        {svc.features.map(f => (
          <li key={f} className="svc-detail-card__feature">
            <CheckCircle2 size={16} aria-hidden="true" className="feature-check" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link to="/contact" className="btn btn-primary svc-detail-card__cta">
        استفسر عن هذه الخدمة
        <ArrowLeft size={16} aria-hidden="true" />
      </Link>
    </article>
  )
}

function FAQSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="faq-section section" ref={ref} aria-labelledby="faq-heading">
      <div className="container">
        <div className={`section-header section-header-center reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">الأسئلة الشائعة</div>
          <h2 className="section-title" id="faq-heading">أسئلة يسألها عملاؤنا</h2>
        </div>
        <div className="faq-grid">
          {FAQ.map((item, i) => (
            <FAQItem key={i} item={item} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ item, index, visible }) {
  return (
    <div
      className={`faq-item reveal ${visible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <h3 className="faq-item__q">{item.q}</h3>
      <p className="faq-item__a">{item.a}</p>
    </div>
  )
}

export default function Services() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="خدماتنا"
        title="كل ما تحتاجه لمشروعك في مكان واحد"
        desc="من استيراد وبيع المعدات إلى الصيانة الشاملة والاستشارات الفنية، نوفر حلولاً متكاملة لجميع احتياجاتك."
        breadcrumbs={[{ label: 'خدماتنا' }]}
      />

      <section className="services-list section">
        <div className="container">
          <div className="services-detail-grid">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* CTA */}
      <section className="services-cta section-sm" aria-label="دعوة للتواصل">
        <div className="container">
          <div className="services-cta__inner">
            <div>
              <h2 className="services-cta__title">محتاج استشارة مجانية؟</h2>
              <p className="services-cta__desc">فريقنا جاهز للإجابة على أسئلتك وتقديم أفضل حل لمشروعك</p>
            </div>
            <div className="services-cta__actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                تواصل معنا الآن <ArrowLeft size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}