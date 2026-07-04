import { useEffect, useState } from 'react'
import { Eye, X, Phone, Mail, MapPin, Briefcase, Clock } from 'lucide-react'
import './Contacts.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const STATUS = {
  new:       { label: 'جديد',        cls: 'badge-gold',  nextLabel: 'تم التواصل', nextVal: 'contacted' },
  contacted: { label: 'تم التواصل',  cls: 'badge-blue',  nextLabel: 'أغلق',       nextVal: 'closed' },
  closed:    { label: 'مغلق',        cls: 'badge-gray',  nextLabel: 'إعادة فتح',  nextVal: 'new' },
}

function ContactDrawer({ contact, onClose, onUpdate }) {
  const [status,  setStatus]  = useState(contact.status)
  const [loading, setLoading] = useState(false)

  const save = async () => {
    if (status === contact.status) return onClose()
    setLoading(true)
    const res  = await fetch(`${API}/contact/${contact._id}/status`, {
      method: 'PATCH', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const data = await res.json()
    if (data.success) { onUpdate(data.data); onClose() }
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal contact-modal" role="dialog" aria-modal="true">
        <div className="modal__header">
          <h2 className="modal__title">تفاصيل الطلب</h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="إغلاق"><X size={18} /></button>
        </div>

        <div className="modal__body">
          {/* Client info */}
          <div className="contact-drawer-client">
            <div className="contact-drawer-avatar">{contact.name.slice(0, 1)}</div>
            <div>
              <div className="contact-drawer-name">{contact.name}</div>
              {contact.company && <div className="contact-drawer-co">{contact.company}</div>}
            </div>
            <span className={`badge ${STATUS[contact.status]?.cls} contact-drawer-badge`}>
              {STATUS[contact.status]?.label}
            </span>
          </div>

          {/* Contact details */}
          <div className="contact-info-grid">
            {[
              { icon: Phone,    label: 'الهاتف',  val: contact.phone,   dir: 'ltr' },
              { icon: Mail,     label: 'البريد',  val: contact.email || '—', dir: 'ltr' },
              { icon: Briefcase,label: 'الخدمة',  val: contact.service },
              { icon: MapPin,   label: 'الموقع',  val: contact.location || '—' },
            ].map(({ icon: Icon, label, val, dir }) => (
              <div key={label} className="contact-info-item">
                <div className="contact-info-label">
                  <Icon size={12} aria-hidden="true" />
                  {label}
                </div>
                <div className="contact-info-val" dir={dir}>{val}</div>
              </div>
            ))}
          </div>

          {/* Request details */}
          {(contact.equipment || contact.purpose || contact.message) && (
            <div className="contact-details-box">
              {contact.equipment && (
                <div className="field">
                  <label>المعدة المطلوبة</label>
                  <div className="contact-detail-text">{contact.equipment}</div>
                </div>
              )}
              {contact.purpose && (
                <div className="field">
                  <label>الغرض</label>
                  <div className="contact-detail-text">{contact.purpose}</div>
                </div>
              )}
              {contact.message && (
                <div className="field">
                  <label>الرسالة</label>
                  <div className="contact-detail-text">{contact.message}</div>
                </div>
              )}
            </div>
          )}

          {/* Date */}
          <div className="contact-date">
            <Clock size={13} aria-hidden="true" />
            {new Date(contact.createdAt).toLocaleString('ar-EG')}
          </div>

          {/* Status change */}
          <div className="field">
            <label>تغيير حالة الطلب</label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="new">جديد</option>
              <option value="contacted">تم التواصل</option>
              <option value="closed">مغلق</option>
            </select>
          </div>
        </div>

        <div className="modal__footer">
          <a href={`tel:${contact.phone}`} className="btn btn-outline">
            <Phone size={14} /> اتصال
          </a>
          <a href={`https://wa.me/2${contact.phone.replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ color: '#16A34A', borderColor: '#16A34A' }}>
            واتساب
          </a>
          <button className="btn btn-primary" onClick={save} disabled={loading}>
            {loading ? 'جاري الحفظ...' : 'حفظ الحالة'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter,   setFilter]   = useState('all')

  const load = (f = filter) => {
    setLoading(true)
    const url = f === 'all' ? `${API}/contact` : `${API}/contact?status=${f}`
    fetch(url, { credentials: 'include' })
      .then(r => r.json())
      .then(d => { if (d.success) setContacts(d.data) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filter])

  const handleUpdate = updated => setContacts(p => p.map(c => c._id === updated._id ? updated : c))

  const counts = {
    all:       contacts.length,
    new:       contacts.filter(c => c.status === 'new').length,
    contacted: contacts.filter(c => c.status === 'contacted').length,
    closed:    contacts.filter(c => c.status === 'closed').length,
  }

  return (
    <div>
      <div className="page-hd">
        <div>
          <div className="page-hd__title">الطلبات</div>
          <div className="page-hd__sub">{contacts.length} طلب</div>
        </div>
      </div>

      {/* Filters */}
      <div className="contacts-tabs">
        {[
          { val: 'all',       label: 'الكل' },
          { val: 'new',       label: 'جديد' },
          { val: 'contacted', label: 'تم التواصل' },
          { val: 'closed',    label: 'مغلق' },
        ].map(f => (
          <button
            key={f.val}
            className={`contacts-tab ${filter === f.val ? 'contacts-tab--active' : ''}`}
            onClick={() => setFilter(f.val)}
            aria-pressed={filter === f.val}
          >
            {f.label}
            <span className="contacts-tab-count">{counts[f.val]}</span>
          </button>
        ))}
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div className="loading-row">جاري التحميل...</div>
        ) : contacts.length === 0 ? (
          <div className="empty">
            <p>لا توجد طلبات</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>العميل</th>
                  <th>الهاتف</th>
                  <th>الخدمة</th>
                  <th>المعدة</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="contact-avatar">{c.name.slice(0, 1)}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                          {c.company && <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{c.company}</div>}
                        </div>
                      </div>
                    </td>
                    <td dir="ltr" style={{ textAlign: 'right', color: 'var(--gray-600)', fontSize: 13 }}>{c.phone}</td>
                    <td style={{ fontSize: 13 }}>{c.service}</td>
                    <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{c.equipment || '—'}</td>
                    <td><span className={`badge ${STATUS[c.status]?.cls}`}>{STATUS[c.status]?.label}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--gray-400)', whiteSpace: 'nowrap' }}>
                      {new Date(c.createdAt).toLocaleDateString('ar-EG')}
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setSelected(c)} aria-label="عرض التفاصيل">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <ContactDrawer contact={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} />}
    </div>
  )
}
