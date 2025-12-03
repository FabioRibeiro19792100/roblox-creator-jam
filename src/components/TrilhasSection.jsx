import { useState } from 'react'
import './TrilhasSection.css'

function TrilhasSection() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section id="trilhas" className="trilhas-section">
      <div className="trilhas-container">
        <div className={`trilhas-accordion-item ${isOpen ? 'trilhas-open' : ''}`}>
          <button
            className="trilhas-header"
            onClick={toggleAccordion}
            aria-expanded={isOpen}
          >
            <p className="trilhas-header-text">Aprender Roblox Studio do zero em nossas trilhas de conteúdos</p>
            <span className="trilhas-arrow">{isOpen ? '−' : '+'}</span>
          </button>
          {isOpen && (
            <div className="trilhas-content">
              <p className="trilhas-text">
                As trilhas misturam curso online, desafios mensais e eventos ao vivo pra transformar tempo de tela em portfólio, segurança digital e histórias que você assina com seu nome.
              </p>
              <div className="trilhas-cta">
                <button className="trilhas-cta-button">
                  Quero começar a criar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TrilhasSection

