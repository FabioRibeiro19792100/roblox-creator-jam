import { useState } from 'react'
import BubbleButton from './utilitarios/BubbleButton'
import { useSiteConfig } from '../config/useSiteConfig'
import './TrilhasSection.css'

function TrilhasSection() {
  const config = useSiteConfig()
  const [isOpen, setIsOpen] = useState(false)
  
  const trilha01 = config?.expedicaoRoblox?.trilhas?.find(t => t.id === 'trilha-01') || {}

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section id="trilhas" className="trilhas-section">
      <div className="trilhas-container">
        <div className={`trilhas-accordion-item ${isOpen ? 'trilhas-open' : ''}`}>
          <button
            className="trilhas-header hover-fill"
            onClick={toggleAccordion}
            aria-expanded={isOpen}
            style={{ '--fill-color': '#14ffec' }} /* Ciano neon análogo ao fundo cinza/branco */
          >
            <p className="trilhas-header-text">{trilha01.title || 'Aprender Roblox Studio do zero em nossas trilhas de conteúdos'}</p>
            <span className="trilhas-arrow">{isOpen ? '−' : '+'}</span>
          </button>
          {isOpen && (
            <div className="trilhas-content">
              <p className="trilhas-text">
                {trilha01.description || 'As trilhas misturam curso online, desafios mensais e eventos ao vivo pra transformar tempo de tela em portfólio, segurança digital e histórias que você assina com seu nome.'}
              </p>
              <div className="trilhas-cta">
                <BubbleButton 
                  color="#000" 
                  style={{ '--button-action-color': '#14ffec', '--button-text-color': '#fff' }}
                >
                  {trilha01.cta || 'Quero começar a criar'}
                </BubbleButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TrilhasSection

