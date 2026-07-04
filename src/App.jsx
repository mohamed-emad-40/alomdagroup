import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/home/Home'
import Services from './pages/services/Services'
import Fleet from './pages/fleet/Fleet'
import FleetDetail from './pages/fleet details/FleetDetail'
import Projects from './pages/projects/Projects'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import NotFound from './pages/not found/NotFound'
import AdminApp from './pages/admin/AdminApp'


function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/services"   element={<Services />} />
        <Route path="/fleet"      element={<Fleet />} />
        <Route path="/fleet/:id"  element={<FleetDetail />} />
        <Route path="/projects"   element={<Projects />} />
        <Route path="/about"      element={<About />} />
        <Route path="/contact"    element={<Contact />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  )
}









