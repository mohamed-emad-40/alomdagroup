import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, CheckCircle2, ShoppingCart, Search, Upload } from 'lucide-react'
import './Fleet.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const CATS = ['حفارات', 'رافعات', 'تسوية', 'لودر', 'شاحنات', 'خرسانة']
const EMPTY = {
  name: '', brand: '', capacity: '', category: 'حفارات', desc: '',
  forSale: false, importable: true,
  specs: { weight: '', power: '', year: '', origin: '', warranty: '', condition: '' }
}

// ── Modal ──────────────────────────────────
function FleetModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item ? { ...EMPTY, ...item, specs: { ...EMPTY.specs, ...(item.specs || {}) } } : EMPTY)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  const set     = (k, v)    => setForm(p => ({ ...p, [k]: v }))
  const setSpec = (k, v)    => setForm(p => ({ ...p, specs: { ...p.specs, [k]: v } }))

  const save = async () => {
    if (!form.name.trim() || !form.brand.trim() || !form.capacity.trim()) return setErr('الاسم والماركة والسعة مطلوبين')
    setLoading(true); setErr('')
    try {
      const url    = item ? `${API}/fleet/${item._id}` : `${API}/fleet`
      const method = item ? 'PUT' : 'POST'
      const res    = await fetch(url, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data   = await res.json()
      if (data.success) onSave(data.data)
      else setErr(data.message)
    } catch { setErr('خطأ في السيرفر') }
    finally { setLoading(false) }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="fleet-modal-title">
        <div className="modal__header">
          <h2 className="modal__title" id="fleet-modal-title">{item ? 'تعديل المعدة' : 'إضافة معدة جديدة'}</h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="إغلاق"><X size={18} /></button>
        </div>

        <div className="modal__body">
          {err && <div className="alert alert-error">{err}</div>}

          {/* Basic info */}
          <div className="form-grid">
            <div className="field">
              <label>اسم المعدة *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="حفارة هيدروليكية كبيرة" />
            </div>
            <div className="field">
              <label>الماركة والموديل *</label>
              <input value={form.brand} onChange={e => set('brand', e.target.value)} placeholder="Caterpillar 390F" dir="ltr" />
            </div>
            <div className="field">
              <label>الفئة</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label>الطاقة / السعة *</label>
              <input value={form.capacity} onChange={e => set('capacity', e.target.value)} placeholder="90 طن" />
            </div>
            <div className="field col-span-2">
              <label>الوصف</label>
              <textarea rows={2} value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="وصف مختصر للمعدة وتطبيقاتها..." />
            </div>
          </div>

          {/* Status */}
          <div className="fleet-status-row">
            <label className="check-label">
              <input type="checkbox" checked={form.forSale} onChange={e => set('forSale', e.target.checked)} />
              <CheckCircle2 size={14} style={{ color: 'var(--green)' }} aria-hidden="true" />
              متاح للبيع
            </label>
            <label className="check-label">
              <input type="checkbox" checked={form.importable} onChange={e => set('importable', e.target.checked)} />
              <ShoppingCart size={14} style={{ color: 'var(--gold)' }} aria-hidden="true" />
              استيراد بالطلب
            </label>
          </div>

          <div className="divider-label">المواصفات التقنية</div>

          {/* Specs */}
          <div className="form-grid-3">
            {[
              { k: 'weight',    l: 'الوزن التشغيلي', ph: '90,000 كجم' },
              { k: 'power',     l: 'قوة المحرك',     ph: '390 حصان' },
              { k: 'year',      l: 'سنة الإنتاج',    ph: '2020-2023' },
              { k: 'origin',    l: 'بلد المنشأ',      ph: 'أمريكا' },
              { k: 'warranty',  l: 'الضمان',          ph: 'سنة' },
              { k: 'condition', l: 'الحالة المتاحة',  ph: 'جديد ومستعمل' },
            ].map(f => (
              <div key={f.k} className="field">
                <label>{f.l}</label>
                <input value={form.specs[f.k] || ''} onChange={e => setSpec(f.k, e.target.value)} placeholder={f.ph} />
              </div>
            ))}
          </div>
        </div>

        <div className="modal__footer">
          <button className="btn btn-outline" onClick={onClose}>إلغاء</button>
          <button className="btn btn-primary" onClick={save} disabled={loading}>
            {loading ? 'جاري الحفظ...' : item ? 'حفظ التعديلات' : 'إضافة المعدة'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Delete confirm ─────────────────────────
function DeleteModal({ item, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false)
  const confirm = async () => {
    setLoading(true)
    await onConfirm()
    setLoading(false)
    onClose()
  }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 400 }} role="dialog" aria-modal="true">
        <div className="modal__header">
          <h2 className="modal__title">تأكيد الحذف</h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal__body">
          <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.6 }}>
            هتمسح <strong>{item.name}</strong> من الكتالوج. مش هتقدر تتراجع.
          </p>
        </div>
        <div className="modal__footer">
          <button className="btn btn-outline" onClick={onClose}>إلغاء</button>
          <button className="btn btn-danger" onClick={confirm} disabled={loading}>
            {loading ? 'جاري الحذف...' : 'نعم، احذف'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────
export default function FleetAdmin() {
  const [fleet,   setFleet]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)   // null | 'add' | item
  const [delItem, setDelItem] = useState(null)
  const [search,  setSearch]  = useState('')
  const [cat,     setCat]     = useState('الكل')

  useEffect(() => {
    fetch(`${API}/fleet`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => { if (d.success) setFleet(d.data) })
      .finally(() => setLoading(false))
  }, [])

  const filtered = fleet.filter(i => {
    const matchCat  = cat === 'الكل' || i.category === cat
    const matchSearch = !search || i.name.includes(search) || i.brand.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleSave = saved => {
    setFleet(p => {
      const idx = p.findIndex(i => i._id === saved._id)
      return idx >= 0 ? p.map((i, x) => x === idx ? saved : i) : [saved, ...p]
    })
    setModal(null)
  }

  const handleDelete = async () => {
    if (!delItem) return
    const res  = await fetch(`${API}/fleet/${delItem._id}`, { method: 'DELETE', credentials: 'include' })
    const data = await res.json()
    if (data.success) setFleet(p => p.filter(i => i._id !== delItem._id))
  }

  return (
    <div className="fleet-page">
      <div className="page-hd">
        <div>
          <div className="page-hd__title">المعدات</div>
          <div className="page-hd__sub">{fleet.length} معدة في الكتالوج</div>
        </div>
        <div className="page-hd__actions">
          <button className="btn btn-primary" onClick={() => setModal('add')}>
            <Plus size={16} /> إضافة معدة
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="fleet-filters card">
        <div className="fleet-search-wrap">
          <Search size={15} className="fleet-search-icon" aria-hidden="true" />
          <input
            className="fleet-search"
            type="search"
            placeholder="ابحث باسم المعدة أو الماركة..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="البحث في المعدات"
          />
        </div>
        <div className="fleet-cats" role="group" aria-label="تصفية بالفئة">
          {['الكل', ...CATS].map(c => (
            <button
              key={c}
              className={`btn btn-sm ${cat === c ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div className="loading-row">جاري التحميل...</div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <Truck size={40} />
            <p>{search || cat !== 'الكل' ? 'لا توجد نتائج' : 'لا توجد معدات بعد'}</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>المعدة</th>
                  <th>الفئة</th>
                  <th>الطاقة</th>
                  <th>الحالة</th>
                  <th>الصور</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item._id}>
                    <td>
                      <div className="fleet-item-name">{item.name}</div>
                      <div className="fleet-item-brand">{item.brand}</div>
                    </td>
                    <td><span className="badge badge-gray">{item.category}</span></td>
                    <td style={{ color: 'var(--gray-600)' }}>{item.capacity}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {item.forSale    && <span className="badge badge-green">للبيع</span>}
                        {item.importable && <span className="badge badge-gold">استيراد</span>}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>
                        {item.images?.length || 0} صورة
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setModal(item)} aria-label="تعديل">
                          <Pencil size={14} />
                        </button>
                        <button className="btn btn-danger btn-icon btn-sm" onClick={() => setDelItem(item)} aria-label="حذف">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && <FleetModal item={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      {delItem && <DeleteModal item={delItem} onClose={() => setDelItem(null)} onConfirm={handleDelete} />}
    </div>
  )
}
