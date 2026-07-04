import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, ShoppingCart, Phone, MessageCircle, Weight, Zap, Calendar, Globe, Shield, Package, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { FLEET, FLEET_SPECS } from '../../data/content'
import { getFleetIcon } from '../../components/ui/EquipmentIcons'
import Lightbox from '../../components/ui/Lightbox'
import './FleetDetail.css'

function ImageGallery({ images, name, FallbackIcon }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)

  if (!images || images.length === 0) {
    return (
      <div className="gallery__placeholder">
        <FallbackIcon size={120} />
      </div>
    )
  }

  return (
    <>
      <div className="gallery">
        {/* Main image */}
        <div className="gallery__main" onClick={() => setLightboxOpen(true)}>
          <img
            src={images[active]}
            alt={`${name} — صورة ${active + 1}`}
            className="gallery__main-img"
          />
          <div className="gallery__zoom-hint" aria-hidden="true">
            <ZoomIn size={18} />
            <span>اضغط للتكبير</span>
          </div>
          {images.length > 1 && (
            <>
              <button className="gallery__arrow gallery__arrow--prev" onClick={e => { e.stopPropagation(); prev() }} aria-label="الصورة السابقة">
                <ChevronRight size={20} />
              </button>
              <button className="gallery__arrow gallery__arrow--next" onClick={e => { e.stopPropagation(); next() }} aria-label="الصورة التالية">
                <ChevronLeft size={20} />
              </button>
              <div className="gallery__counter">{active + 1} / {images.length}</div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="gallery__thumbs" role="list">
            {images.map((img, i) => (
              <button
                key={i}
                className={`gallery__thumb ${i === active ? 'gallery__thumb--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`صورة ${i + 1}`}
                aria-pressed={i === active}
                role="listitem"
              >
                <img src={img} alt={`${name} ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          activeIndex={active}
          onClose={() => setLightboxOpen(false)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  )
}

export default function FleetDetail() {
  const { id } = useParams()
  const item = FLEET.find(f => f.id === Number(id))

  if (!item) {
    return (
      <main className="fleet-detail-notfound">
        <h2>المعدة مش موجودة</h2>
        <Link to="/fleet" className="btn btn-primary">رجوع للمعدات</Link>
      </main>
    )
  }

  const specs = FLEET_SPECS[item.id] || {}
  const EquipIcon = getFleetIcon(item.category)
  const related = FLEET.filter(f => f.category === item.category && f.id !== item.id).slice(0, 3)

  // images: array من الباك — لو مش موجود يبقى placeholder
  const images = item.images || (item.imageUrl ? [item.imageUrl] : [])

  const specsList = [
    { icon: Weight,  label: 'الوزن التشغيلي', val: specs.weight },
    { icon: Zap,     label: 'قوة المحرك',      val: specs.power },
    { icon: Package, label: 'الطاقة / السعة',  val: item.capacity },
    { icon: Calendar,label: 'سنة الإنتاج',     val: specs.year },
    { icon: Globe,   label: 'بلد المنشأ',       val: specs.origin },
    { icon: Shield,  label: 'الضمان',           val: specs.warranty },
  ]

  return (
    <main id="main-content" className="fleet-detail-page">

      {/* Breadcrumb */}
      <div className="fleet-detail__breadcrumb">
        <div className="container">
          <nav aria-label="مسار التنقل">
            <Link to="/" className="bc-link">الرئيسية</Link>
            <ChevronLeft size={14} aria-hidden="true" />
            <Link to="/fleet" className="bc-link">معداتنا</Link>
            <ChevronLeft size={14} aria-hidden="true" />
            <span className="bc-current">{item.name}</span>
          </nav>
        </div>
      </div>

      {/* Main */}
      <section className="fleet-detail__main section">
        <div className="container">
          <div className="fleet-detail__grid">

            {/* Gallery */}
            <div className="fleet-detail__visual">
              <ImageGallery images={images} name={item.name} FallbackIcon={EquipIcon} />

              {/* Condition */}
              <div className="fleet-detail__condition card">
                <span className="fleet-detail__condition-label">الحالة المتاحة</span>
                <span className="fleet-detail__condition-val">{specs.condition}</span>
              </div>
            </div>

            {/* Info */}
            <div className="fleet-detail__info">
              <span className="badge badge-dark fleet-detail__cat">{item.category}</span>
              <h1 className="fleet-detail__title">{item.name}</h1>
              <p className="fleet-detail__brand">{item.brand}</p>
              <p className="fleet-detail__desc">{item.desc}</p>

              {/* Badges */}
              <div className="fleet-detail__status">
                {item.forSale && (
                  <span className="status-badge status-badge--sale">
                    <CheckCircle2 size={14} aria-hidden="true" /> للبيع
                  </span>
                )}
                {item.importable && (
                  <span className="status-badge status-badge--import">
                    <ShoppingCart size={14} aria-hidden="true" /> استيراد بالطلب
                  </span>
                )}
              </div>

              {/* Specs */}
              <div className="fleet-detail__specs">
                <h2 className="fleet-detail__specs-title">المواصفات التقنية</h2>
                <div className="fleet-detail__specs-grid">
                  {specsList.map(({ icon: Icon, label, val }) => val && (
                    <div key={label} className="spec-item">
                      <div className="spec-item__icon" aria-hidden="true">
                        <Icon size={15} />
                      </div>
                      <div>
                        <div className="spec-item__label">{label}</div>
                        <div className="spec-item__val">{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="fleet-detail__cta">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  استفسر عن السعر <ArrowLeft size={18} aria-hidden="true" />
                </Link>
                <a
                  href="https://wa.me/201000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn fleet-detail__whatsapp"
                >
                  <MessageCircle size={18} aria-hidden="true" /> واتساب
                </a>
                <a href="tel:01000000000" className="btn btn-outline btn-lg">
                  <Phone size={16} aria-hidden="true" /> اتصل
                </a>
              </div>

              {/* Guarantees */}
              <div className="fleet-detail__guarantees">
                {['فحص شامل قبل التسليم', 'ضمان الجودة', 'دعم ما بعد البيع', 'توصيل للموقع'].map(g => (
                  <div key={g} className="guarantee-item">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="fleet-detail__related section-sm">
          <div className="container">
            <h2 className="fleet-detail__related-title">معدات مشابهة</h2>
            <div className="fleet-detail__related-grid">
              {related.map(r => {
                const RIcon = getFleetIcon(r.category)
                const rImages = r.images || (r.imageUrl ? [r.imageUrl] : [])
                return (
                  <Link key={r.id} to={`/fleet/${r.id}`} className="related-card card">
                    <div className="related-card__thumb">
                      {rImages.length > 0
                        ? <img src={rImages[0]} alt={r.name} className="related-card__img" />
                        : <div className="related-card__placeholder"><RIcon size={48} /></div>
                      }
                    </div>
                    <div className="related-card__body">
                      <h3 className="related-card__name">{r.name}</h3>
                      <p className="related-card__brand">{r.brand}</p>
                      <span className="related-card__cta">
                        عرض التفاصيل <ArrowLeft size={13} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}