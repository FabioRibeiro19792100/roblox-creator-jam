import { useState, useContext } from 'react'
import { NavigationContext, ContactModalContext } from '../App'
import { useSiteConfig } from '../config/useSiteConfig'
import './ExpedicaoRobloxSection.css'

export const PANEL_IDS = {
  trilhas: 'expedicao-trilha-01-panel',
  jam: 'expedicao-trilha-02-panel',
  imersao: 'expedicao-trilha-03-panel'
}

function ExpedicaoRobloxSection() {
  const config = useSiteConfig()
  const [isTrilhasOpen, setIsTrilhasOpen] = useState(false)
  const [isJamOpen, setIsJamOpen] = useState(false)
  const [isImersaoOpen, setIsImersaoOpen] = useState(false)
  const { navigateTo } = useContext(NavigationContext) || { navigateTo: (page) => {
    if (page === 'jam') {
      window.location.hash = '#jam'
    } else if (page === 'expedicao-na-estrada') {
      window.location.hash = '#expedicao-na-estrada'
    } else {
      window.location.hash = ''
    }
  }}
  const { openContactModal } = useContext(ContactModalContext) || { openContactModal: () => {} }
  
  // Pegar dados do config ou usar valores padrão
  const expedicaoData = config?.expedicaoRoblox || {}
  const trilhas = expedicaoData.trilhas || []
  const trilha01 = trilhas.find(t => t.id === 'trilha-01') || {}
  const trilha02 = trilhas.find(t => t.id === 'trilha-02') || {}
  const trilha03 = trilhas.find(t => t.id === 'trilha-03') || {}

  const handleJamLinkClick = (e) => {
    e.preventDefault()
    navigateTo('jam')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handleExpedicaoNaEstradaClick = (e) => {
    e.preventDefault()
    navigateTo('expedicao-na-estrada')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const toggleTrilhas = () => {
    setIsTrilhasOpen(!isTrilhasOpen)
  }

  const toggleJam = () => {
    setIsJamOpen(!isJamOpen)
  }

  const toggleImersao = () => {
    setIsImersaoOpen(!isImersaoOpen)
  }

  return (
    <section id="expedicao-roblox" className="expedicao-roblox-section">
      <div className="expedicao-roblox-container">
        <h2 className="expedicao-roblox-title">
          <span className="expedicao-title-line-1">{expedicaoData?.title?.line1 || 'Gratuito, online'}</span>
          <span className="expedicao-title-line-2">{expedicaoData?.title?.line2 || 'e sem pré-requisitos.'}</span>
        </h2>

        <p className="expedicao-roblox-subtitle">{expedicaoData?.subtitle || 'As trilhas da expedição'}</p>
        <div className="expedicao-features">
          <div className={`expedicao-accordion-item ${isTrilhasOpen ? 'expedicao-accordion-open' : ''}`}>
            <button
              className="expedicao-feature-box expedicao-feature-box-1"
              onClick={toggleTrilhas}
              aria-expanded={isTrilhasOpen}
              aria-controls={PANEL_IDS.trilhas}
              aria-haspopup="true"
            >
              <div className="expedicao-feature-content">
                <span className="expedicao-feature-label">{trilha01?.label || 'TRILHA 01'}</span>
                <p className="expedicao-feature-text">{trilha01?.title || 'Aprenda Roblox Studio do zero em nossas trilhas de conteúdos'}</p>
              </div>
              <span className="expedicao-arrow">{isTrilhasOpen ? '−' : '+'}</span>
            </button>
            <div
              className="expedicao-accordion-content"
              id={PANEL_IDS.trilhas}
              data-testid={PANEL_IDS.trilhas}
              aria-hidden={!isTrilhasOpen}
            >
              <h3 className="expedicao-accordion-heading">
                {trilha01?.heading || 'O que as trilhas entregam'}
              </h3>
              <p className="expedicao-accordion-text">
                {trilha01?.description || 'As trilhas misturam curso online, desafios mensais e eventos ao vivo pra transformar tempo de tela em portfólio, segurança digital e histórias que você assina com seu nome.'}
              </p>
              <div className="expedicao-accordion-cta">
                <button className="expedicao-accordion-button" onClick={openContactModal}>
                  {trilha01?.cta || 'Quero começar a criar'}
                </button>
              </div>
            </div>
          </div>
          <div className={`expedicao-accordion-item ${isJamOpen ? 'expedicao-accordion-open' : ''}`}>
            <button
              className="expedicao-feature-box expedicao-feature-box-2"
              onClick={toggleJam}
              aria-expanded={isJamOpen}
              aria-controls={PANEL_IDS.jam}
              aria-haspopup="true"
            >
              <div className="expedicao-feature-content">
                <span className="expedicao-feature-label">{trilha02?.label || 'TRILHA 02'}</span>
                <p className="expedicao-feature-text">{trilha02?.title || 'Inscreva-se numa jam e crie experiências jogáveis de verdade;'}</p>
              </div>
              <span className="expedicao-arrow">{isJamOpen ? '−' : '+'}</span>
            </button>
            <div
              className="expedicao-accordion-content"
              id={PANEL_IDS.jam}
              data-testid={PANEL_IDS.jam}
              aria-hidden={!isJamOpen}
            >
              <h3 className="expedicao-accordion-heading">
                {trilha02?.heading || 'Criar durante uma Creator Jam'}
              </h3>
                <p className="expedicao-accordion-text">
                  {trilha02?.description || 'Participe de uma Creator Jam e desenvolva uma experiência jogável em 72 horas, seguindo um tema e regras definidas.'}
                </p>
                <div className="expedicao-accordion-cta">
                  <a 
                    href="#jam" 
                    className="expedicao-accordion-button expedicao-accordion-link"
                    onClick={handleJamLinkClick}
                  >
                    {trilha02?.cta || 'Ir para a JAM'}
                  </a>
                </div>
              </div>
          </div>
          <div className={`expedicao-accordion-item ${isImersaoOpen ? 'expedicao-accordion-open' : ''}`}>
            <button
              className="expedicao-feature-box expedicao-feature-box-3"
              onClick={toggleImersao}
              aria-expanded={isImersaoOpen}
              aria-controls={PANEL_IDS.imersao}
              aria-haspopup="true"
            >
              <div className="expedicao-feature-content">
                <span className="expedicao-feature-label">{trilha03?.label || 'TRILHA 03'}</span>
                <p className="expedicao-feature-text">{trilha03?.title || 'Participe da imersão presencial em um evento na sua capital.'}</p>
              </div>
              <span className="expedicao-arrow">{isImersaoOpen ? '−' : '+'}</span>
            </button>
            <div 
              className="expedicao-accordion-content"
              id={PANEL_IDS.imersao}
              data-testid={PANEL_IDS.imersao}
              aria-hidden={!isImersaoOpen}
              style={{
                backgroundImage: `url('/images/5.webp?t=${Date.now()}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <h3 className="expedicao-accordion-heading">
                {trilha03?.heading || 'Experiências presenciais na estrada'}
              </h3>
                <p className="expedicao-accordion-text">
                  {trilha03?.description || 'Consulte em breve o calendário do Expedição Roblox na Estrada para eventos presenciais na sua cidade.'}
                </p>
                <div className="expedicao-accordion-cta">
                  <a 
                    href="#expedicao-na-estrada" 
                    className="expedicao-accordion-button expedicao-accordion-link"
                    onClick={handleExpedicaoNaEstradaClick}
                  >
                    {trilha03?.cta || 'Ir para Expedição na Estrada'}
                  </a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpedicaoRobloxSection
