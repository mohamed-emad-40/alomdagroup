import { useEffect, useState } from 'react'
import { Save, Phone, Mail, MapPin, Globe, Clock } from 'lucide-react'
import './Company.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function Section({ title, children }) {
  return (
    <div className="company-section card">
      <div className="company-section__title">{title}</div>
      <div className="company-section__body">{children}</div>
    </div>
  )
}

export default function CompanyAdmin() {
  const [form,   setForm]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [alert,   setAlert]   = useState(null) // { type, msg }

  useEffect(() => {
    fetch(`${API}/company`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => { if (d.success && d.data) setForm(d.data) })
      .finally(() => setLoading(false))
  }, [])

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const save = async () => {
    setSaving(true); setAlert(null)
    try {
      const res  = await fetch(`${API}/company`, {
        method: 'PUT', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setForm(data.data)
        setAlert({ type: 'success', msg: 'تم حفظ البيانات بنجاح' })
        setTimeout(() => setAlert(null), 4000)
      } else {
        setAlert({ type: 'error', msg: data.message })
      }
    } catch {
      setAlert({ type: 'error', msg: 'خطأ في الاتصال بالسيرفر' })
    } finally { setSaving(false) }
  }

  if (loading) return <div className="loading-row">جاري التحميل...</div>
  if (!form)   return <div className="empty"><p>لا توجد بيانات — شغّل الـ seed أولاً</p></div>

  return (
    <div className="company-page">
      <div className="page-hd">
        <div>
          <div className="page-hd__title">بيانات الشركة</div>
          <div className="page-hd__sub">معلومات التواصل والبيانات الأساسية</div>
        </div>
        <div className="page-hd__actions">
          <button className="btn btn-primary btn-lg" onClick={save} disabled={saving}>
            <Save size={16} />
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>{alert.msg}</div>
      )}

      <div className="company-grid">
        {/* Basic */}
        <Section title="البيانات الأساسية">
          <div className="form-grid">
            <div className="field">
              <label>اسم الشركة (عربي)</label>
              <input value={form.nameAr || ''} onChange={e => set('nameAr', e.target.value)} />
            </div>
            <div className="field">
              <label>اسم الشركة (إنجليزي)</label>
              <input value={form.name || ''} onChange={e => set('name', e.target.value)} dir="ltr" />
            </div>
            <div className="field col-span-2">
              <label>الشعار / Tagline</label>
              <input value={form.tagline || ''} onChange={e => set('tagline', e.target.value)} />
            </div>
            <div className="field">
              <label>سنة التأسيس</label>
              <input type="number" value={form.founded || ''} onChange={e => set('founded', e.target.value)} dir="ltr" />
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section title="معلومات التواصل">
          <div className="form-grid">
            <div className="field">
              <label><Phone size={13} style={{ display: 'inline', marginLeft: 5 }} />الهاتف الأول</label>
              <input value={form.phone || ''} onChange={e => set('phone', e.target.value)} dir="ltr" />
            </div>
            <div className="field">
              <label><Phone size={13} style={{ display: 'inline', marginLeft: 5 }} />الهاتف الثاني</label>
              <input value={form.phone2 || ''} onChange={e => set('phone2', e.target.value)} dir="ltr" />
            </div>
            <div className="field">
              <label>واتساب (كود الدولة + الرقم)</label>
              <input value={form.whatsapp || ''} onChange={e => set('whatsapp', e.target.value)} dir="ltr" placeholder="201000000000" />
            </div>
            <div className="field">
              <label><Mail size={13} style={{ display: 'inline', marginLeft: 5 }} />البريد الإلكتروني</label>
              <input type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} dir="ltr" />
            </div>
            <div className="field col-span-2">
              <label><MapPin size={13} style={{ display: 'inline', marginLeft: 5 }} />العنوان</label>
              <input value={form.address || ''} onChange={e => set('address', e.target.value)} />
            </div>
          </div>
        </Section>

        {/* Social */}
        <Section title="السوشيال ميديا">
          <div className="form-grid">
            {[
              { key: 'facebook',  label: 'Facebook',  ph: 'https://facebook.com/...' },
              { key: 'instagram', label: 'Instagram', ph: 'https://instagram.com/...' },
              { key: 'linkedin',  label: 'LinkedIn',  ph: 'https://linkedin.com/...' },
              { key: 'youtube',   label: 'YouTube',   ph: 'https://youtube.com/...' },
            ].map(s => (
              <div key={s.key} className="field">
                <label><Globe size={13} style={{ display: 'inline', marginLeft: 5 }} />{s.label}</label>
                <input value={form[s.key] || ''} onChange={e => set(s.key, e.target.value)} dir="ltr" placeholder={s.ph} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}
