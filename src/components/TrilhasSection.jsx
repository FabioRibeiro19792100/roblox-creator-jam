import { useState, useContext } from 'react'
import BubbleButton from './utilitarios/BubbleButton'
import { NavigationContext } from '../App'
import { useSiteConfig } from '../config/useSiteConfig'
import './TrilhasSection.css'

function TrilhasSection() {
  const config = useSiteConfig()
  const { navigateTo } = useContext(NavigationContext) || { navigateTo: () => {} }
  const [isOpen, setIsOpen] = useState(false)
  
  const trilha01 = config?.expedicaoRoblox?.trilhas?.find(t => t.id === 'trilha-01') || {}

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  const handleQueroComecar = () => {
    navigateTo('biblioteca')
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
                {trilha01.description || 'Baixe o plugin exclusivo da Mastertech para fazer suas primeiras criações e aprender de um jeito diferente. Além disso consuma conteúdos conceituais e práticos para que você possa compreender mais sobre o universo de criações digitais e Roblox'}
              </p>
              <div className="trilhas-cta">
                <BubbleButton 
                  color="#000" 
                  style={{ '--button-action-color': '#14ffec', '--button-text-color': '#fff' }}
                  onClick={handleQueroComecar}
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

