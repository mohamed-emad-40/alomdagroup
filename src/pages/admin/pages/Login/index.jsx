import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import './Login.css'
import '../../admin.css'

export default function Login() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [form, setForm]       = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.username.trim() || !form.password.trim()) return setError('ادخل اسم المستخدم وكلمة السر')
    setLoading(true); setError('')
    try {
      await login(form.username, form.password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'اسم المستخدم أو كلمة السر غلط')
    } finally { setLoading(false) }
  }

  return (
    <div className="login-root">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-mark">AG</div>
          <div>
            <div className="login-name">Alomda Group</div>
            <div className="login-sub">لوحة التحكم</div>
          </div>
        </div>

        <h1 className="login-title">مرحباً بعودتك</h1>
        <p className="login-desc">سجل دخولك للوصول للوحة التحكم</p>

        {error && (
          <div className="login-error" role="alert">
            <AlertCircle size={15} aria-hidden="true" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="login-form">
          <div className="field">
            <label htmlFor="username">اسم المستخدم</label>
            <div className="login-input-wrap">
              <User size={15} className="login-icon" aria-hidden="true" />
              <input
                id="username" type="text"
                placeholder="admin"
                value={form.username}
                onChange={e => set('username', e.target.value)}
                autoComplete="username"
                dir="ltr"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">كلمة السر</label>
            <div className="login-input-wrap">
              <Lock size={15} className="login-icon" aria-hidden="true" />
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => set('password', e.target.value)}
                autoComplete="current-password"
                dir="ltr"
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'إخفاء' : 'إظهار'}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  )
}
