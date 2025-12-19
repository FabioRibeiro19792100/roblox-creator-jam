import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import '../components/utilitarios/AnimationBase.css'
import './EscolhaTemaSection.css'

function EscolhaTemaSection() {
  const config = useSiteConfig()
  const temas = config.jam?.escolhaTema?.temas || []
  const intro = config.jam?.escolhaTema?.intro || []
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section 
      id="escolha-tema" 
      className={`escolha-tema-section sweep-fill ${isOpen ? 'escolha-tema-open sweep-fill-active' : ''}`}
      role="region"
      aria-labelledby="escolha-tema-title"
      onClick={toggleAccordion}
    >
      <div className="escolha-tema-container">
        <div className={`escolha-tema-accordion-item ${isOpen ? 'escolha-tema-open' : ''}`}>
          <h2 id="escolha-tema-title" className="escolha-tema-heading">
            <button
              className="escolha-tema-header plus-indicator-trigger"
              onClick={(e) => {
                e.stopPropagation()
                toggleAccordion()
              }}
              aria-expanded={isOpen}
              aria-controls="escolha-tema-content"
            >
              <span className="escolha-tema-title-text">
                Quais serão os possíveis<br />temas das experiências?
              </span>
              <span className={`escolha-tema-arrow plus-indicator ${isOpen ? 'plus-indicator-open' : ''}`} aria-hidden="true" />
              <span className="sr-only">
                {isOpen ? 'Ocultar temas' : 'Mostrar temas'}
              </span>
            </button>
          </h2>
          {isOpen && (
            <div 
              className="escolha-tema-content" 
              id="escolha-tema-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="escolha-tema-intro">
                {intro.map((text, index) => (
                  <p key={index} className="escolha-tema-intro-text">
                    {text}
                  </p>
                ))}
              </div>

              <div className="temas-grid">
                {temas.map((item, index) => (
                  <div key={index} className="tema-card">
                    <h3 className="tema-nome">{item.tema}</h3>
                    <p className="tema-descricao">{item.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default EscolhaTemaSection

