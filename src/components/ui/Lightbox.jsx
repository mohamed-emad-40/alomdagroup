import { useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './Lightbox.css'

export default function Lightbox({ images, activeIndex, onClose, onPrev, onNext }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onNext()
    if (e.key === 'ArrowRight') onPrev()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (activeIndex === null) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="عرض الصورة">
      {/* Backdrop */}
      <div className="lightbox__backdrop" onClick={onClose} />

      {/* Close */}
      <button className="lightbox__close" onClick={onClose} aria-label="إغلاق">
        <X size={24} />
      </button>

      {/* Counter */}
      <div className="lightbox__counter" aria-live="polite">
        {activeIndex + 1} / {images.length}
      </div>

      {/* Image */}
      <div className="lightbox__img-wrap">
        <img
          src={images[activeIndex]}
          alt={`صورة ${activeIndex + 1}`}
          className="lightbox__img"
          draggable={false}
        />
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button className="lightbox__arrow lightbox__arrow--prev" onClick={onPrev} aria-label="الصورة السابقة">
            <ChevronRight size={28} />
          </button>
          <button className="lightbox__arrow lightbox__arrow--next" onClick={onNext} aria-label="الصورة التالية">
            <ChevronLeft size={28} />
          </button>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="lightbox__thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`lightbox__thumb ${i === activeIndex ? 'lightbox__thumb--active' : ''}`}
              onClick={() => { if (i !== activeIndex) i > activeIndex ? onNext() : onPrev() }}
              aria-label={`صورة ${i + 1}`}
              aria-pressed={i === activeIndex}
            >
              <img src={img} alt={`صورة ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}