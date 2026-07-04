import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import './NotFound.css'

export default function NotFound() {
  return (
    <main id="main-content" className="notfound">
      <div className="notfound__inner">
        <div className="notfound__num" aria-hidden="true">404</div>
        <h1 className="notfound__title">الصفحة مش موجودة!</h1>
        <p className="notfound__desc">
          يبدو إن الصفحة اللي بتدور عليها اتنقلت أو اتحذفت. ارجع للرئيسية وابدأ من الأول.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} aria-hidden="true" /> الرئيسية
          </Link>
          <Link to="/contact" className="btn btn-outline btn-lg">
            تواصل معنا
          </Link>
        </div>
      </div>
    </main>
  )
}
