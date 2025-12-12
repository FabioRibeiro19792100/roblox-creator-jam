import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import './GlossarioSection.css'

function GlossarioSection() {
  const config = useSiteConfig()
  const [isOpen, setIsOpen] = useState(false)

  const termos = config?.glossario?.termos || []

  return (
    <section className="glossario-section">
      <div className="glossario-container">
        <div className={`glossario-accordion-item ${isOpen ? 'glossario-accordion-open' : ''}`}>
          <button
            className="glossario-accordion-header"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="glossario-title-wrapper">
              <span className="glossario-accordion-title">{config?.glossario?.title || 'Glossário'}</span>
              <span className="glossario-accordion-subtitle">{config?.glossario?.subtitle || 'Dicionário das expressões da Expedição Roblox'}</span>
            </div>
            <span className="glossario-accordion-arrow">{isOpen ? '−' : '+'}</span>
          </button>
          {isOpen && (
            <div className="glossario-accordion-content">
              <div className="glossario-list">
                {termos.map((item, index) => (
                  <div key={index} className="glossario-item">
                    <dt className="glossario-termo">{item.termo}</dt>
                    <dd className="glossario-descricao">{item.descricao}</dd>
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

export default GlossarioSection

