import { Routes, Route } from 'react-router-dom'
import { AuthProvider, ProtectedRoute } from './hooks/useAuth'
import AdminLayout from './components/layout/AdminLayout'
import Login    from './pages/Login'
import Dashboard from './pages/Dashboard'
import Fleet    from './pages/Fleet'
import Contacts from './pages/Contacts'
import Company  from './pages/Company'
import './admin.css'
import './pages/Login/Login.css'
import './pages/Dashboard/Dashboard.css'
import './pages/Fleet/Fleet.css'
import './pages/Contacts/Contacts.css'
import './pages/Company/Company.css'

const Soon = ({ title }) => (
  <div>
    <div className="page-hd">
      <div>
        <div className="page-hd__title">{title}</div>
        <div className="page-hd__sub">هذه الصفحة قيد التطوير</div>
      </div>
    </div>
    <div className="card empty" style={{ padding: '64px 24px' }}>
      <p style={{ fontSize: 16, color: 'var(--gray-400)' }}>قريباً...</p>
    </div>
  </div>
)

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="login" element={<Login />} />

        {/* Protected */}
        <Route path="/*" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index          element={<Dashboard />} />
          <Route path="fleet"    element={<Fleet />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="company"  element={<Company />} />
          <Route path="projects" element={<Soon title="الصفقات" />} />
          <Route path="services" element={<Soon title="الخدمات" />} />
          <Route path="*"        element={<Soon title="الصفحة غير موجودة" />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
