import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle, ChevronLeft, Zap } from 'lucide-react'
import { COMPANY, SERVICES } from '../../data/content'
import { useReveal } from '../../hooks'
import PageHero from '../../components/ui/PageHero'
import './Contact.css'

const STEPS = ['بيانات التواصل', 'تفاصيل الطلب', 'الإرسال']

function ContactInfo() {
  const items = [
    { Icon: Phone,  label: 'الهاتف الأول',       val: COMPANY.phone,  href: `tel:${COMPANY.phone}` },
    { Icon: Phone,  label: 'الهاتف الثاني',       val: COMPANY.phone2, href: `tel:${COMPANY.phone2}` },
    { Icon: Mail,   label: 'البريد الإلكتروني',   val: COMPANY.email,  href: `mailto:${COMPANY.email}` },
    { Icon: MapPin, label: 'العنوان',              val: COMPANY.address, href: null },
    { Icon: Clock,  label: 'ساعات العمل',          val: 'طوال أيام الأسبوع 8ص–8م', href: null },
  ]
  return (
    <div className="contact-info">
      <div className="contact-info__card">
        <h2 className="contact-info__title">معلومات التواصل</h2>
        <div className="contact-info__items">
          {items.map(({ Icon, label, val, href }) => (
            <div key={label} className="contact-info__item">
              <div className="contact-info__icon" aria-hidden="true">
                <Icon size={17} />
              </div>
              <div>
                <div className="contact-info__label">{label}</div>
                {href
                  ? <a href={href} className="contact-info__val contact-info__val--link">{val}</a>
                  : <div className="contact-info__val">{val}</div>
                }
              </div>
            </div>
          ))}
        </div>

        <a
          href={`https://wa.me/${COMPANY.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
          aria-label="تواصل عبر واتساب"
        >
          <MessageCircle size={18} aria-hidden="true" />
          تواصل عبر واتساب الآن
        </a>
      </div>

      <div className="contact-promise card">
      <div className="contact-promise__icon" aria-hidden="true">
        <Zap size={24} />
      </div>
        <h3 className="contact-promise__title">وعدنا لك</h3>
        <ul className="contact-promise__list">
          {['رد خلال ساعة واحدة', 'عرض سعر مجاني بدون التزام', 'استشارة هندسية مجانية', 'خدمة 24/7 للحالات الطارئة'].map(p => (
            <li key={p} className="contact-promise__item">
              <CheckCircle2 size={14} aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MultiStepForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', phone: '', company: '', email: '',
    service: '', equipment: '', duration: '', location: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }))

  const step1Valid = form.name.trim() && form.phone.trim()
  const step2Valid = form.service

  const handleSubmit = async () => {
    setLoading(true)
    // await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <CheckCircle2 size={60} className="form-success__icon" aria-hidden="true" />
        <h3 className="form-success__title">تم إرسال طلبك بنجاح!</h3>
        <p className="form-success__desc">
          فريقنا سيتواصل معك على الرقم <strong>{form.phone}</strong> خلال ساعة واحدة بإذن الله.
        </p>
        <button className="btn btn-outline" onClick={() => { setSubmitted(false); setStep(0); setForm({ name:'',phone:'',company:'',email:'',service:'',equipment:'',duration:'',location:'',message:'' }) }}>
          إرسال طلب جديد
        </button>
      </div>
    )
  }

  return (
    <div className="multi-form">
      {/* Progress */}
      <div className="form-steps" role="list" aria-label="خطوات النموذج">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`form-step ${i === step ? 'form-step--active' : ''} ${i < step ? 'form-step--done' : ''}`}
            role="listitem"
            aria-current={i === step ? 'step' : undefined}
          >
            <div className="form-step__num" aria-hidden="true">
              {i < step ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className="form-step__label">{s}</span>
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 0 && (
        <fieldset className="form-fieldset" aria-label="بيانات التواصل">
          <legend className="form-legend">بياناتك الأساسية</legend>
          <div className="form-row">
            <Field label="الاسم الكامل *" required>
              <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="اسمك الكريم" autoComplete="name" />
            </Field>
            <Field label="رقم الهاتف *" required>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="01XXXXXXXXX" dir="ltr" autoComplete="tel" />
            </Field>
          </div>
          <div className="form-row">
            <Field label="اسم الشركة">
              <input type="text" value={form.company} onChange={e => set('company', e.target.value)} placeholder="اختياري" autoComplete="organization" />
            </Field>
            <Field label="البريد الإلكتروني">
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" dir="ltr" autoComplete="email" />
            </Field>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary btn-lg" onClick={() => setStep(1)} disabled={!step1Valid}>
              التالي <ChevronLeft size={18} aria-hidden="true" />
            </button>
          </div>
        </fieldset>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <fieldset className="form-fieldset" aria-label="تفاصيل الطلب">
          <legend className="form-legend">تفاصيل مشروعك</legend>

          <Field label="نوع الخدمة *" required>
            <div className="service-chips" role="group" aria-label="اختر الخدمة">
              {SERVICES.map(s => (
                <button
                  key={s.id}
                  type="button"
                  className={`chip ${form.service === s.title ? 'chip--active' : ''}`}
                  onClick={() => set('service', s.title)}
                  aria-pressed={form.service === s.title}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </Field>

          <div className="form-row">
            <Field label="المعدة المطلوبة">
              <input type="text" value={form.equipment} onChange={e => set('equipment', e.target.value)} placeholder="مثال: حفارة 30 طن" />
            </Field>
            <Field label="الغرض من الشراء">
              <input type="text" value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="مثال: مشروع طرق، إنشاءات..." />
            </Field>
          </div>

          <Field label="موقع المشروع">
            <input type="text" value={form.location} onChange={e => set('location', e.target.value)} placeholder="المحافظة / المدينة" />
          </Field>

          <Field label="تفاصيل إضافية">
            <textarea rows={4} value={form.message} onChange={e => set('message', e.target.value)} placeholder="أي تفاصيل أخرى تود إضافتها..." />
          </Field>

          <div className="form-actions">
            <button className="btn btn-outline btn-lg" onClick={() => setStep(0)}>
              رجوع
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(2)} disabled={!step2Valid}>
              مراجعة الطلب <ChevronLeft size={18} aria-hidden="true" />
            </button>
          </div>
        </fieldset>
      )}

      {/* Step 3 — Review */}
      {step === 2 && (
        <div className="form-review">
          <h3 className="form-review__title">مراجعة طلبك</h3>
          <dl className="form-review__dl">
            {[
              { t: 'الاسم', v: form.name },
              { t: 'الهاتف', v: form.phone },
              { t: 'الشركة', v: form.company || '—' },
              { t: 'الخدمة', v: form.service },
              { t: 'المعدة', v: form.equipment || '—' },
              { t: 'المدة', v: form.duration || '—' },
              { t: 'الموقع', v: form.location || '—' },
            ].map(({ t, v }) => (
              <div key={t} className="form-review__row">
                <dt>{t}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="form-actions">
            <button className="btn btn-outline btn-lg" onClick={() => setStep(1)}>تعديل</button>
            <button
              className="btn btn-primary btn-lg"
              onClick={handleSubmit}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span className="loading-dots" aria-label="جاري الإرسال">إرسال<span>.</span><span>.</span><span>.</span></span>
              ) : (
                <><Send size={17} aria-hidden="true" /> إرسال الطلب</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div className="form-field">
      <label className="form-field__label">
        {label}
        {required && <span className="form-field__req" aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [ref, visible] = useReveal()

  return (
    <main id="main-content">
      <PageHero
        eyebrow="تواصل معنا"
        title="احصل على عرض سعر مجاني"
        desc="فريقنا جاهز للرد على استفساراتك وتقديم أفضل حل لمشروعك خلال ساعة واحدة."
        breadcrumbs={[{ label: 'تواصل معنا' }]}
      />

      <section className="contact-section section" ref={ref}>
        <div className="container">
          <div className={`contact-layout reveal ${visible ? 'visible' : ''}`}>
            <ContactInfo />
            <div className="contact-form-wrap card">
              <MultiStepForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}