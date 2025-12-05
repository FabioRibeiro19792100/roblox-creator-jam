import { useState, useEffect, useMemo } from 'react'
import AnimatorManager from '../managers/AnimatorManager'
import './ProximosEventosSection.css'

function ProximosEventosSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Get the second layer (HomeHeroSection) position
      const heroSection = document.getElementById('home-hero')
      if (heroSection) {
        const heroTop = heroSection.getBoundingClientRect().top
        // Hide when scrolled past the hero section
        setIsVisible(heroTop > -100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dados de exemplo dos próximos 5 eventos
  const eventos = useMemo(() => ([
    { data: '15/01/2026', titulo: 'Abertura das Inscrições', local: 'Online' },
    { data: '22/01/2026', titulo: 'Workshop: Primeiros Passos', local: 'São Paulo' },
    { data: '05/02/2026', titulo: 'Game Jam #1', local: 'Online' },
    { data: '12/02/2026', titulo: 'Encontro Presencial - Rio', local: 'Rio de Janeiro' },
    { data: '20/02/2026', titulo: 'Workshop: Criação Avançada', local: 'Brasília' }
  ]), [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const manager = AnimatorManager.getInstance()

    const raf = requestAnimationFrame(() => {
      const animateElement = (id, keyframes, options = {}) => {
        if (manager.getElement(id)) {
          manager.animate(id, keyframes, {
            duration: 600,
            easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
            fill: 'forwards',
            ...options
          })
        }
      }

      animateElement('proximos-eventos-overlay', [
        { opacity: 0 },
        { opacity: 1 }
      ], { duration: 400, easing: 'linear', delay: 0 })

      animateElement('proximos-eventos-calendar', [
        { opacity: 0, transform: 'translateY(40px) scale(0.96)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 700, delay: 80 })

      animateElement('proximos-eventos-header', [
        { opacity: 0, transform: 'translateY(40px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { delay: 140 })

      animateElement('proximos-eventos-title', [
        { opacity: 0, transform: 'translateY(40px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { delay: 160 })

      animateElement('proximos-eventos-close', [
        { opacity: 0, transform: 'translateY(20px) scale(0.8)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { delay: 220 })

      animateElement('proximos-eventos-list', [
        { opacity: 0, transform: 'translateY(40px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { delay: 240 })

      eventos.forEach((_, index) => {
        animateElement(`proximos-eventos-item-${index}`, [
          { opacity: 0, transform: 'translateY(40px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { delay: 260 + index * 90 })
      })
    })

    return () => cancelAnimationFrame(raf)
  }, [isOpen, eventos])

  return (
    <>
      <section 
        className={`proximos-eventos-section ${!isVisible ? 'hidden' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="proximos-eventos-container">
          <div className="proximos-eventos-header">
            <span className="proximos-eventos-title">Próximos eventos</span>
            <span className="proximos-eventos-arrow">{isOpen ? '−' : '+'}</span>
          </div>
        </div>
      </section>

      {isOpen && (
        <div 
          className="proximos-eventos-overlay"
          data-animate-id="proximos-eventos-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="proximos-eventos-calendar"
            data-animate-id="proximos-eventos-calendar"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="proximos-eventos-calendar-header"
              data-animate-id="proximos-eventos-header"
            >
              <h3 
                className="proximos-eventos-calendar-title"
                data-animate-id="proximos-eventos-title"
              >
                Próximos Eventos
              </h3>
              <button 
                type="button"
                className="proximos-eventos-close"
                data-animate-id="proximos-eventos-close"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar popup"
              >
                X
              </button>
            </div>
            <div 
              className="proximos-eventos-list"
              data-animate-id="proximos-eventos-list"
            >
              {eventos.map((evento, index) => (
                <div 
                  key={index} 
                  className="proximos-eventos-item"
                  data-animate-id={`proximos-eventos-item-${index}`}
                >
                  <div className="proximos-eventos-date">{evento.data}</div>
                  <div className="proximos-eventos-content">
                    <div className="proximos-eventos-event-title">{evento.titulo}</div>
                    <div className="proximos-eventos-location">{evento.local}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProximosEventosSection
