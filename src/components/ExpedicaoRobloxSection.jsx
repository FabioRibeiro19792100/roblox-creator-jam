import { useState, useContext } from 'react'
import { NavigationContext, ContactModalContext } from '../App'
import BubbleButton from './utilitarios/BubbleButton'
import './ExpedicaoRobloxSection.css'

function ExpedicaoRobloxSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [isTrilhasOpen, setIsTrilhasOpen] = useState(false)
  const [isImersaoOpen, setIsImersaoOpen] = useState(false)
  const { navigateTo } = useContext(NavigationContext) || { navigateTo: (page) => {
    if (page === 'jam') {
      window.location.hash = '#jam'
    } else {
      window.location.hash = ''
    }
  }}
  const { openContactModal } = useContext(ContactModalContext) || { openContactModal: () => {} }

  const handleJamClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigateTo('jam')
      setIsLoading(false)
      // Scroll para o topo da página JAM
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }, 800)
  }

  const toggleTrilhas = () => {
    setIsTrilhasOpen(!isTrilhasOpen)
  }

  const toggleImersao = () => {
    setIsImersaoOpen(!isImersaoOpen)
  }

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="arcade-loader">
            <div className="arcade-screen">
              <div className="arcade-scanlines"></div>
              <div className="arcade-text">LOADING...</div>
              <div className="arcade-grid"></div>
              <div className="arcade-glow"></div>
            </div>
          </div>
        </div>
      )}
      <section id="expedicao-roblox" className="expedicao-roblox-section">
        <div className="expedicao-roblox-container">
          <h2 className="expedicao-roblox-title">
            <span className="expedicao-title-line-1">Gratuito, online</span>
            <span className="expedicao-title-line-2">e sem pré-requisitos.</span>
          </h2>

          <p className="expedicao-roblox-subtitle">As trilhas da expedição</p>
          <div className="expedicao-features">
            <div className={`expedicao-accordion-item ${isTrilhasOpen ? 'expedicao-accordion-open' : ''}`}>
              <button
                className="expedicao-feature-box expedicao-feature-box-1 hover-fill"
                onClick={toggleTrilhas}
                style={{ '--fill-color': '#00ff9d' }} /* Verde menta neon */
              >
                <div className="expedicao-feature-content">
                  <span className="expedicao-feature-label">TRILHA 01</span>
                  <p className="expedicao-feature-text">Aprenda Roblox Studio do zero em nossas trilhas de conteúdos</p>
                </div>
                <span className="expedicao-arrow">{isTrilhasOpen ? '−' : '+'}</span>
              </button>
              {isTrilhasOpen && (
                <div className="expedicao-accordion-content">
                  <p className="expedicao-accordion-text">
                    As trilhas misturam curso online, desafios mensais e eventos ao vivo pra transformar tempo de tela em portfólio, segurança digital e histórias que você assina com seu nome.
                  </p>
                  <div className="expedicao-accordion-cta">
                    <BubbleButton 
                      onClick={openContactModal}
                      color="#000"
                      style={{ '--button-action-color': '#00ff9d' }}
                    >
                      Quero começar a criar
                    </BubbleButton>
                  </div>
                </div>
              )}
            </div>
            <button 
              className="expedicao-feature-box expedicao-feature-box-2 hover-fill"
              onClick={handleJamClick}
              style={{ '--fill-color': '#ff0055' }} /* Vermelho/Rosa neon vibrante para JAM */
            >
              <div className="expedicao-feature-content">
                <span className="expedicao-feature-label">TRILHA 02</span>
                <p className="expedicao-feature-text">Inscreva-se numa jam e crie experiências jogáveis de verdade;</p>
              </div>
            </button>
            <div className={`expedicao-accordion-item ${isImersaoOpen ? 'expedicao-accordion-open' : ''}`}>
              <button
                className="expedicao-feature-box expedicao-feature-box-3 hover-fill"
                onClick={toggleImersao}
                style={{ '--fill-color': '#ffee00' }} /* Amarelo neon para evento presencial */
              >
                <div className="expedicao-feature-content">
                  <span className="expedicao-feature-label">TRILHA 03</span>
                  <p className="expedicao-feature-text">Participe da imersão presencial em um evento na sua capital.</p>
                </div>
                <span className="expedicao-arrow">{isImersaoOpen ? '−' : '+'}</span>
              </button>
              {isImersaoOpen && (
                <div 
                  className="expedicao-accordion-content"
                  style={{
                    backgroundImage: `url('/images/5.webp?t=${Date.now()}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <p className="expedicao-accordion-text">
                    Consulte em breve o calendário do Expedição Roblox na Estrada
                  </p>
                  <div className="expedicao-accordion-cta">
                    <BubbleButton 
                      onClick={openContactModal}
                      color="#000"
                      style={{ '--button-action-color': '#ffee00', '--button-text-color': '#fff' }}
                    >
                      Quero saber mais
                    </BubbleButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ExpedicaoRobloxSection

