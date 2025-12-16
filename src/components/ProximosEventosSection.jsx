import { useState, useEffect, useId, useRef } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import './ProximosEventosSection.css'

const formatDateISO = (dateString) => {
  const [day, month, year] = dateString.split('/').map(Number)
  if (!day || !month || !year) return dateString
  return new Date(year, month - 1, day).toISOString().split('T')[0]
}

function ProximosEventosSection() {
  const config = useSiteConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const toggleCalendar = () => setIsOpen((prev) => !prev)
  const componentId = useId()
  const calendarId = `${componentId}-calendar`
  const stateDescriptionId = `${componentId}-state`
  const title = config?.proximosEventos?.title || 'Próximos eventos'
  const calendarTitle = config?.proximosEventos?.calendarTitle || 'Próximos Eventos'
  const sectionHeadingId = `${componentId}-section-heading`
  const calendarHeadingId = `${componentId}-calendar-heading`
  const eventosBarHeight = 'var(--events-height, 48px)'
  const sectionStyle = {
    position: 'sticky',
    top: 'var(--header-height, 60px)',
    height: eventosBarHeight
  }
  const containerStyle = {
    minHeight: eventosBarHeight,
    display: 'flex',
    alignItems: 'center'
  }
  const triggerStyle = {
    minHeight: eventosBarHeight,
    alignItems: 'center'
  }
  const toggleButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const wasOpenRef = useRef(false)

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

  // Dados dos próximos eventos (do siteConfig ou padrão)
  const eventos = config?.proximosEventos?.eventos || [
    { data: '15/01/2026', titulo: 'Abertura das Inscrições', local: 'Online' },
    { data: '22/01/2026', titulo: 'Workshop: Primeiros Passos', local: 'São Paulo' },
    { data: '05/02/2026', titulo: 'Game Jam #1', local: 'Online' },
    { data: '12/02/2026', titulo: 'Encontro Presencial - Rio', local: 'Rio de Janeiro' },
    { data: '20/02/2026', titulo: 'Workshop: Criação Avançada', local: 'Brasília' }
  ]

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden'
      }
    } else if (wasOpenRef.current) {
      toggleButtonRef.current?.focus()
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }
    wasOpenRef.current = isOpen

    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  return (
    <>
      <section 
        className={`proximos-eventos-section sweep-fill ${!isVisible ? 'hidden' : ''}`}
        style={sectionStyle}
        aria-labelledby={sectionHeadingId}
      >
        <h2 className="sr-only" id={sectionHeadingId}>
          {title}
        </h2>
        <div className="proximos-eventos-container" style={containerStyle}>
          <button
            type="button"
            className="proximos-eventos-header plus-indicator-trigger"
            onClick={toggleCalendar}
            aria-expanded={isOpen}
            aria-controls={calendarId}
            aria-haspopup="dialog"
            aria-label={title}
            aria-describedby={stateDescriptionId}
            ref={toggleButtonRef}
            style={triggerStyle}
          >
            <span className="proximos-eventos-title">{title}</span>
            <span 
              className={`proximos-eventos-arrow plus-indicator ${isOpen ? 'plus-indicator-open' : ''}`}
              aria-hidden="true"
            />
            <span className="sr-only" id={stateDescriptionId}>
              {isOpen ? 'Lista de próximos eventos aberta' : 'Lista de próximos eventos fechada'}
            </span>
          </button>
        </div>
      </section>

      {isOpen && (
        <div 
          className="proximos-eventos-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="proximos-eventos-calendar"
            id={calendarId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={calendarHeadingId}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="proximos-eventos-close modal-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar"
              ref={closeButtonRef}
            >
              ×
            </button>
            <h3 className="proximos-eventos-calendar-title" id={calendarHeadingId}>
              {calendarTitle}
            </h3>
            <ul className="proximos-eventos-list" aria-label="Lista de próximos eventos">
              {eventos.map((evento, index) => (
                <li key={index} className="proximos-eventos-item">
                  <time className="proximos-eventos-date" dateTime={formatDateISO(evento.data)}>
                    {evento.data}
                  </time>
                  <div className="proximos-eventos-content">
                    <p className="proximos-eventos-event-title">{evento.titulo}</p>
                    <p className="proximos-eventos-location">{evento.local}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default ProximosEventosSection
