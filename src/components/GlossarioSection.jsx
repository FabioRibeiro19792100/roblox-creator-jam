import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import './GlossarioSection.css'

function GlossarioSection() {
  const config = useSiteConfig()
  const [isOpen, setIsOpen] = useState(false)

  const contentId = 'glossario-accordion-content'

  const termos = config?.glossario?.termos || []

  return (
    <section
      className={`glossario-section sweep-fill ${isOpen ? 'glossario-open sweep-fill-active' : ''}`}
      role="region"
      aria-labelledby="glossario-accordion-header"
    >
      <div className="glossario-container">
        <div className={`glossario-accordion-item ${isOpen ? 'glossario-accordion-open' : ''}`}>
          <button
            className="glossario-accordion-header"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls={contentId}
            id="glossario-accordion-header"
          >
            <div className="glossario-title-wrapper">
              <span className="glossario-accordion-title">{config?.glossario?.title || 'Glossário'}</span>
              <span className="glossario-accordion-subtitle">{config?.glossario?.subtitle || 'Dicionário das expressões da Expedição Roblox'}</span>
            </div>
            <span className="glossario-accordion-arrow">{isOpen ? '−' : '+'}</span>
          </button>
          <div className="glossario-accordion-content" id={contentId}>
            <div className="glossario-list">
              {termos.map((item, index) => (
                <div key={index} className="glossario-item">
                  <dt className="glossario-termo">{item.termo}</dt>
                  <dd className="glossario-descricao">{item.descricao}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlossarioSection
