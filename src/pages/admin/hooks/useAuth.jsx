import { createContext, useContext, useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const AuthCtx = createContext(null)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/admin/me`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => { if (d.success) setUser(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

const login = async (username, password) => {
  // مؤقت للتجربة بدون باك
  if (username === 'admin' && password === 'admin123') {
    setUser({ name: 'Admin', username: 'admin' })
    return
  }
  throw new Error('اسم المستخدم أو كلمة السر غلط')
}

  const logout = async () => {
    await fetch(`${API}/admin/logout`, { method: 'POST', credentials: 'include' })
    setUser(null)
  }

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{ height:'100vh', display:'grid', placeItems:'center', fontFamily:'Cairo,sans-serif', color:'#9CA3AF', fontSize:'14px' }}>
      جاري التحقق...
    </div>
  )
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}
