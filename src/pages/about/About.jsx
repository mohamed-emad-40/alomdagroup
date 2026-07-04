import { Link } from 'react-router-dom'
import { CheckCircle2, Award, ArrowLeft, Target, Eye, Heart } from 'lucide-react'
import { TEAM, CERTIFICATIONS, STATS, TESTIMONIALS } from '../../data/content'
import { useReveal, useCounter } from '../../hooks'
import PageHero from '../../components/ui/PageHero'
import './About.css'

function StatCounter({ value, suffix, label, active }) {
  const count = useCounter(value, 1800, active)
  return (
    <div className="about-stat">
      <div className="about-stat__num">{count}{suffix}</div>
      <div className="about-stat__label">{label}</div>
    </div>
  )
}

function StatsBar() {
  const [ref, visible] = useReveal()
  return (
    <div className="about-stats-bar" ref={ref} aria-label="إحصائيات الشركة">
      {STATS.map(s => (
        <StatCounter key={s.label} {...s} active={visible} />
      ))}
    </div>
  )
}

function Timeline() {
  const [ref, visible] = useReveal()
  const milestones = [
    { year: '2009', title: 'تأسيس الشركة', desc: 'بدأنا بأسطول صغير من 10 معدات في القاهرة.' },
    { year: '2012', title: 'التوسع الأول', desc: 'وصلنا لـ 50 معدة وبدأنا العمل في محافظات جديدة.' },
    { year: '2016', title: 'شراكات دولية', desc: 'حصلنا على تفويض رسمي من Caterpillar و Komatsu.' },
    { year: '2019', title: 'شهادة ISO', desc: 'حصلنا على ISO 9001 و ISO 45001 للجودة والسلامة.' },
    { year: '2022', title: '200+ معدة', desc: 'تجاوزنا 200 معدة وأصبحنا الأكبر في مصر.' },
    { year: '2024', title: 'التطوير الرقمي', desc: 'أطلقنا منظومة متكاملة لإدارة الأسطول رقمياً.' },
  ]
  return (
    <section className="timeline-section section" ref={ref} aria-labelledby="timeline-heading">
      <div className="container">
        <div className={`section-header section-header-center reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">مسيرتنا</div>
          <h2 className="section-title" id="timeline-heading">15 سنة من النمو المستمر</h2>
        </div>
        <div className="timeline" role="list">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={`timeline-item reveal ${visible ? 'visible' : ''} ${i % 2 === 0 ? 'timeline-item--right' : 'timeline-item--left'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
              role="listitem"
            >
              <div className="timeline-item__year" aria-label={`عام ${m.year}`}>{m.year}</div>
              <div className="timeline-item__dot" aria-hidden="true" />
              <div className="timeline-item__content">
                <h3 className="timeline-item__title">{m.title}</h3>
                <p className="timeline-item__desc">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="team-section section" ref={ref} aria-labelledby="team-heading">
      <div className="container">
        <div className={`section-header section-header-center reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">فريقنا</div>
          <h2 className="section-title" id="team-heading">القيادة والخبرة</h2>
          <p className="section-desc">فريق من المهندسين والمتخصصين بخبرة عملية تتجاوز عقداً في قطاع المعدات</p>
        </div>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className={`team-card card reveal ${visible ? 'visible' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="team-card__avatar" aria-hidden="true">
                {m.name.split(' ').slice(-1)[0].slice(0, 2)}
              </div>
              <h3 className="team-card__name">{m.name}</h3>
              <p className="team-card__role">{m.role}</p>
              <span className="badge badge-gold team-card__exp">{m.exp}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CertsSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="certs-section section-sm" ref={ref} aria-labelledby="certs-heading">
      <div className="container">
        <div className={`section-header section-header-center reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">اعتمادياتنا</div>
          <h2 className="section-title" id="certs-heading">شهادات دولية معتمدة</h2>
        </div>
        <div className="certs-grid">
          {CERTIFICATIONS.map((c, i) => (
            <div
              key={c.name}
              className={`cert-card card reveal ${visible ? 'visible' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="cert-card__icon" aria-hidden="true">
                <Award size={28} />
              </div>
              <h3 className="cert-card__name">{c.name}</h3>
              <p className="cert-card__desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const [ref, visible] = useReveal()
  const values = [
    { icon: Target, title: 'الجودة أولاً', desc: 'نلتزم بأعلى معايير الجودة في كل معدة وكل خدمة نقدمها.' },
    { icon: Heart, title: 'الموثوقية', desc: 'عملاؤنا يعتمدون علينا في أهم لحظات مشاريعهم.' },
    { icon: Eye, title: 'الشفافية', desc: 'نتعامل بشفافية تامة في التسعير والعقود والتقارير.' },
  ]
  return (
    <section className="values-section section" ref={ref} aria-labelledby="values-heading">
      <div className="container">
        <div className={`section-header section-header-center reveal ${visible ? 'visible' : ''}`}>
          <div className="section-eyebrow">قيمنا</div>
          <h2 className="section-title" id="values-heading">ما يحركنا كل يوم</h2>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`value-card card reveal ${visible ? 'visible' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="value-card__icon" aria-hidden="true">
                <v.icon size={26} />
              </div>
              <h3 className="value-card__title">{v.title}</h3>
              <p className="value-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function About() {
  const [heroRef, heroVisible] = useReveal()

  return (
    <main id="main-content">
      <PageHero
        eyebrow="عن الشركة"
        title="Alomda Group — قصة نجاح مصرية"
        desc="منذ 2009 ونحن نبني مصر معدة تلو الأخرى. تعرف على قصتنا وفريقنا وقيمنا."
        breadcrumbs={[{ label: 'عن الشركة' }]}
      />

      {/* Intro + Stats */}
      <section className="about-intro section" ref={heroRef}>
        <div className="container">
          <div className="about-intro__grid">
            <div className={`about-intro__text reveal ${heroVisible ? 'visible' : ''}`}>
              <div className="section-eyebrow">من نحن</div>
              <h2 className="section-title" style={{ textAlign: 'right' }}>
                الشريك الموثوق<br />لكبرى المشاريع المصرية
              </h2>
              <p className="about-intro__desc">
                Alomda Group واحدة من أكبر شركات تأجير وتشغيل المعدات الثقيلة في مصر. تأسست عام 2009 برؤية واضحة: توفير معدات بجودة عالمية وخدمة محلية متميزة.
              </p>
              <p className="about-intro__desc">
                اليوم، نمتلك أسطولاً يتجاوز 200 معدة من أفضل الماركات العالمية، ونخدم محافظات مصر الـ 27 بفريق من أكثر من 300 موظف متخصص.
              </p>
              <ul className="about-intro__points">
                {[
                  'أسطول متجدد من أحدث الماركات العالمية',
                  'فريق هندسي وفني متخصص يعمل 24/7',
                  'ورش صيانة معتمدة في 5 محافظات',
                  'نخدم جميع محافظات مصر الـ 27',
                ].map(p => (
                  <li key={p} className="about-intro__point">
                    <CheckCircle2 size={16} aria-hidden="true" className="feature-check" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary btn-lg about-intro__cta">
                تواصل معنا <ArrowLeft size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className={`about-intro__cards reveal ${heroVisible ? 'visible' : ''}`} style={{ animationDelay: '0.15s' }}>
              <StatsBar />
              <div className="about-coverage card">
                <div className="about-coverage__num">27</div>
                <div className="about-coverage__label">محافظة نخدمها في مصر</div>
                <div className="about-coverage__bar">
                  {Array.from({ length: 27 }).map((_, i) => (
                    <div key={i} className="about-coverage__dot" style={{ animationDelay: `${i * 0.05}s` }} aria-hidden="true" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ValuesSection />
      <Timeline />
      <TeamSection />
      <CertsSection />

      {/* CTA */}
      <section className="about-cta section-sm" aria-label="دعوة للتواصل">
        <div className="container">
          <div className="about-cta__inner">
            <div>
              <h2 className="about-cta__title">جاهز تبدأ معنا؟</h2>
              <p className="about-cta__desc">انضم لأكثر من 50 عميل يثقون بنا في مشاريعهم الكبرى</p>
            </div>
            <div className="about-cta__actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                تواصل معنا <ArrowLeft size={18} aria-hidden="true" />
              </Link>
              <Link to="/projects" className="btn btn-outline-white btn-lg">
                شوف أعمالنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
