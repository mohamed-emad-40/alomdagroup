import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, FolderKanban, MessageSquare, TrendingUp, ArrowLeft, Clock } from 'lucide-react'
import './Dashboard.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const STATUS_MAP = {
  new:       { label: 'جديد',        cls: 'badge-gold' },
  contacted: { label: 'تم التواصل',  cls: 'badge-blue' },
  closed:    { label: 'مغلق',        cls: 'badge-gray' },
}

function KpiCard({ icon: Icon, label, value, sub, color, href }) {
  const card = (
    <div className="kpi-card card">
      <div className="kpi-card__top">
        <div className="kpi-card__icon" style={{ background: color + '18', color }}>
          <Icon size={20} aria-hidden="true" />
        </div>
        <div className="kpi-card__value">{value}</div>
      </div>
      <div className="kpi-card__label">{label}</div>
      {sub && <div className="kpi-card__sub">{sub}</div>}
    </div>
  )
  return href ? <Link to={href} className="kpi-link">{card}</Link> : card
}

export default function Dashboard() {
  const [stats, setStats]     = useState(null)
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API}/stats`,          { credentials: 'include' }).then(r => r.json()),
      fetch(`${API}/contact?limit=6`, { credentials: 'include' }).then(r => r.json()),
    ]).then(([s, c]) => {
      if (s.success) setStats(s.data)
      if (c.success) setContacts(c.data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const newCount = contacts.filter(c => c.status === 'new').length

  return (
    <div className="dashboard">

      {/* KPIs */}
      <div className="kpi-grid">
        <KpiCard icon={Truck}        label="إجمالي المعدات"   value={loading ? '—' : (stats?.[1]?.value ?? '—')} sub="في الكتالوج"   color="#E8971A" href="/admin/fleet" />
        <KpiCard icon={FolderKanban} label="الصفقات الناجحة"  value={loading ? '—' : (stats?.[0]?.value ?? '—')} sub="صفقة موثقة"    color="#2563EB" href="/admin/projects" />
        <KpiCard icon={MessageSquare} label="طلبات جديدة"     value={loading ? '—' : newCount}                    sub="تحتاج رد"      color="#16A34A" href="/admin/contacts" />
        <KpiCard icon={TrendingUp}   label="سنوات الخبرة"     value={loading ? '—' : (stats?.[2]?.value ?? '—')} sub="في السوق"      color="#7C3AED" />
      </div>

      {/* Latest contacts */}
      <div className="dash-section card">
        <div className="dash-section__header">
          <div>
            <h2 className="dash-section__title">آخر الطلبات</h2>
            <p className="dash-section__sub">أحدث طلبات التواصل والعروض</p>
          </div>
          <Link to="/admin/contacts" className="btn btn-ghost btn-sm">
            عرض الكل <ArrowLeft size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="loading-row">جاري التحميل...</div>
        ) : contacts.length === 0 ? (
          <div className="empty">
            <MessageSquare size={40} />
            <p>لا توجد طلبات بعد</p>
          </div>
        ) : (
          <div className="dash-table-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>العميل</th>
                  <th>الهاتف</th>
                  <th>الخدمة</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c._id}>
                    <td>
                      <div className="dash-client">
                        <div className="dash-client__avatar">
                          {c.name.slice(0, 1)}
                        </div>
                        <div>
                          <div className="dash-client__name">{c.name}</div>
                          {c.company && <div className="dash-client__co">{c.company}</div>}
                        </div>
                      </div>
                    </td>
                    <td dir="ltr" style={{ textAlign: 'right', color: 'var(--gray-600)' }}>{c.phone}</td>
                    <td>{c.service}</td>
                    <td>
                      <span className={`badge ${STATUS_MAP[c.status]?.cls}`}>
                        {STATUS_MAP[c.status]?.label}
                      </span>
                    </td>
                    <td>
                      <div className="dash-date">
                        <Clock size={12} aria-hidden="true" />
                        {new Date(c.createdAt).toLocaleDateString('ar-EG')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="quick-grid">
        {[
          { label: 'إضافة معدة جديدة',  sub: 'أضف معدة للكتالوج',      href: '/admin/fleet',    icon: Truck,         color: '#E8971A' },
          { label: 'إضافة صفقة جديدة',  sub: 'وثق صفقة ناجحة',          href: '/admin/projects', icon: FolderKanban,  color: '#2563EB' },
          { label: 'مراجعة الطلبات',    sub: `${newCount} طلب جديد`,    href: '/admin/contacts', icon: MessageSquare, color: '#16A34A' },
        ].map(item => (
          <Link key={item.href} to={item.href} className="quick-card card">
            <div className="quick-card__icon" style={{ background: item.color + '15', color: item.color }}>
              <item.icon size={22} />
            </div>
            <div>
              <div className="quick-card__label">{item.label}</div>
              <div className="quick-card__sub">{item.sub}</div>
            </div>
            <ArrowLeft size={16} className="quick-card__arrow" />
          </Link>
        ))}
      </div>
    </div>
  )
}
