import { useState, useEffect } from 'react'
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
  const eventos = [
    { data: '15/01/2026', titulo: 'Abertura das Inscrições', local: 'Online' },
    { data: '22/01/2026', titulo: 'Workshop: Primeiros Passos', local: 'São Paulo' },
    { data: '05/02/2026', titulo: 'Game Jam #1', local: 'Online' },
    { data: '12/02/2026', titulo: 'Encontro Presencial - Rio', local: 'Rio de Janeiro' },
    { data: '20/02/2026', titulo: 'Workshop: Criação Avançada', local: 'Brasília' }
  ]

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
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="proximos-eventos-calendar"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="proximos-eventos-close"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h3 className="proximos-eventos-calendar-title">Próximos Eventos</h3>
            <div className="proximos-eventos-list">
              {eventos.map((evento, index) => (
                <div key={index} className="proximos-eventos-item">
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

