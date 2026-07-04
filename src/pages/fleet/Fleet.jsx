import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ShoppingCart, ArrowLeft, Search } from 'lucide-react'
import { FLEET, FLEET_CATEGORIES } from '../../data/content'
import { useReveal } from '../../hooks'
import PageHero from '../../components/ui/PageHero'
import { getFleetIcon } from '../../components/ui/EquipmentIcons'
import './Fleet.css'

function FleetCard({ item, visible, index }) {
  const EquipIcon = getFleetIcon(item.category)
  return (
    <Link
      to={`/fleet/${item.id}`}
      className={`fleet-card card reveal ${visible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.06}s` }}
      aria-label={`عرض تفاصيل ${item.name}`}
    >
      <div className="fleet-card__thumb" role="img" aria-label={item.name}>
        <div className="fleet-card__icon-wrap">
          <EquipIcon size={52} />
        </div>
        <div className="fleet-card__badges">
          {item.forSale && (
            <div className="fleet-card__badge badge--avail">
              <CheckCircle2 size={12} aria-hidden="true" /> للبيع
            </div>
          )}
          {item.importable && (
            <div className="fleet-card__badge badge--order">
              <ShoppingCart size={12} aria-hidden="true" /> استيراد بالطلب
            </div>
          )}
        </div>
      </div>
      <div className="fleet-card__body">
        <div className="fleet-card__cat badge badge-dark">{item.category}</div>
        <h3 className="fleet-card__name" id={`fleet-name-${item.id}`}>{item.name}</h3>
        <p className="fleet-card__brand">{item.brand}</p>
        <p className="fleet-card__desc">{item.desc}</p>
        <div className="fleet-card__capacity">
          <span className="fleet-card__cap-label">الطاقة / السعة</span>
          <span className="fleet-card__cap-val">{item.capacity}</span>
        </div>
        <div className="fleet-card__cta">
          عرض التفاصيل <ArrowLeft size={13} aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}

export default function Fleet() {
  const [ref, visible] = useReveal()
  const [active, setActive] = useState('الكل')
  const [search, setSearch] = useState('')

  const filtered = FLEET.filter(item => {
    const matchCat =
      active === 'الكل' ||
      (active === 'للبيع' && item.forSale) ||
      (active === 'استيراد بالطلب' && item.importable) ||
      item.category === active
    const matchSearch = !search || item.name.includes(search) || item.brand.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main id="main-content">
      <PageHero
        eyebrow="معداتنا"
        title="200+ معدة للبيع والاستيراد"
        desc="تشكيلة شاملة من أحدث المعدات الثقيلة من أفضل الماركات العالمية — للبيع الفوري أو الاستيراد بالطلب."
        breadcrumbs={[{ label: 'معداتنا' }]}
      />

      <section className="fleet-section section" ref={ref}>
        <div className="container">

          {/* Controls */}
          <div className={`fleet-controls reveal ${visible ? 'visible' : ''}`}>
            <div className="fleet-filters" role="group" aria-label="تصفية المعدات">
              {FLEET_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`fleet-filter-btn ${active === cat ? 'fleet-filter-btn--active' : ''}`}
                  onClick={() => setActive(cat)}
                  aria-pressed={active === cat}
                >
                  {cat}
                  <span className="fleet-filter-count">
                    {cat === 'الكل' ? FLEET.length
                      : cat === 'للبيع' ? FLEET.filter(i => i.forSale).length
                      : cat === 'استيراد بالطلب' ? FLEET.filter(i => i.importable).length
                      : FLEET.filter(i => i.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="fleet-search">
              <Search size={16} className="fleet-search__icon" aria-hidden="true" />
              <input
                type="search"
                placeholder="ابحث عن معدة..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="fleet-search__input"
                aria-label="البحث في المعدات"
              />
            </div>
          </div>

          <p className="fleet-results-count" aria-live="polite">
            {filtered.length} معدة
          </p>

          {filtered.length > 0 ? (
            <div className="fleet-grid">
              {filtered.map((item, i) => (
                <FleetCard key={item.id} item={item} visible={visible} index={i} />
              ))}
            </div>
          ) : (
            <div className="fleet-empty" role="status">
              <Search size={40} className="fleet-empty__icon" aria-hidden="true" />
              <p>لا توجد نتائج. جرب كلمة بحث مختلفة.</p>
            </div>
          )}
        </div>
      </section>

      <section className="fleet-cta section-sm" aria-label="طلب معدة">
        <div className="container">
          <div className="fleet-cta__inner">
            <div>
              <h2 className="fleet-cta__title">مش لاقي المعدة اللي محتاجها؟</h2>
              <p className="fleet-cta__desc">تواصل معنا ونستوردها لك — كتالوجنا أكبر من اللي في الموقع</p>
            </div>
            <Link to="/contact" className="btn btn-primary btn-lg">
              طلب استيراد خاص <ArrowLeft size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}