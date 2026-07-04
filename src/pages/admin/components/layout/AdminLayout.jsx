import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Truck, FolderKanban,
  MessageSquare, Wrench, Building2,
  X, LogOut, ExternalLink, Menu,
  ChevronLeft
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import '../../admin.css'

const NAV = [
  { label: 'الرئيسية',  path: '/admin',          icon: LayoutDashboard, end: true },
  { label: 'المعدات',   path: '/admin/fleet',     icon: Truck },
  { label: 'الصفقات',   path: '/admin/projects',  icon: FolderKanban },
  { label: 'الخدمات',   path: '/admin/services',  icon: Wrench },
  { label: 'الطلبات',   path: '/admin/contacts',  icon: MessageSquare },
  { label: 'الشركة',    path: '/admin/company',   icon: Building2 },
]

const TITLES = {
  '/admin':          { title: 'الرئيسية',  sub: 'نظرة عامة على النشاط' },
  '/admin/fleet':    { title: 'المعدات',   sub: 'إدارة كتالوج المعدات' },
  '/admin/projects': { title: 'الصفقات',   sub: 'إدارة الصفقات والتوريدات' },
  '/admin/services': { title: 'الخدمات',   sub: 'إدارة خدمات الشركة' },
  '/admin/contacts': { title: 'الطلبات',   sub: 'طلبات التواصل والعروض' },
  '/admin/company':  { title: 'الشركة',    sub: 'بيانات الشركة والتواصل' },
}

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const { logout } = useAuth()
  const { pathname } = useLocation()
  const page = TITLES[pathname] || { title: 'الأدمن', sub: '' }
  const close = () => setOpen(false)

  return (
    <div className="adm-root">
    <div className="adm">
      {/* Overlay */}
      {open && <div className="adm-overlay" onClick={close} aria-hidden="true" />}

      {/* Sidebar */}
      <aside className={`adm-sidebar ${open ? 'adm-sidebar--open' : ''}`}>
        <div className="adm-sidebar__logo">
          <div className="adm-logo-mark">AG</div>
          <div className="adm-logo-text">
            <div className="adm-logo-name">Alomda</div>
            <div className="adm-logo-sub">لوحة التحكم</div>
          </div>
          <button className="adm-sidebar__close" onClick={close} aria-label="إغلاق">
            <X size={18} />
          </button>
        </div>

        <nav className="adm-sidebar__nav" aria-label="قائمة الأدمن">
          <div className="adm-nav-section">القائمة الرئيسية</div>
          {NAV.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={close}
              className={({ isActive }) => `adm-nav-link ${isActive ? 'active' : ''}`}
            >
              <item.icon size={17} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="adm-sidebar__footer">
          <button className="adm-logout-btn" onClick={logout}>
            <LogOut size={16} aria-hidden="true" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="adm-main">
        {/* Header */}
        <header className="adm-header">
          <div className="adm-header__start">
            <button className="adm-menu-btn" onClick={() => setOpen(v => !v)} aria-label="القائمة">
              <Menu size={20} />
            </button>
            <div className="adm-breadcrumb">
              <div>
                <div className="adm-breadcrumb__page">{page.title}</div>
                {page.sub && <div className="adm-breadcrumb__sub">{page.sub}</div>}
              </div>
            </div>
          </div>

          <div className="adm-header__end">
            <a href="/" target="_blank" rel="noopener noreferrer" className="adm-view-site">
              <ExternalLink size={13} aria-hidden="true" />
              عرض الموقع
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
    </div>
  )
}
