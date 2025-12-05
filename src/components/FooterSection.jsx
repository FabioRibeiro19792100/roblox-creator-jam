import { useState, useContext } from 'react'
import { MaterialModalContext, NavigationContext } from '../App'
import ConvideSeusAmigosSection from './ConvideSeusAmigosSection'
import ContactPopup from './ContactPopup'
import FAQPopup from './FAQPopup'
import GlossarioSection from './GlossarioSection'
import './FooterSection.css'

function FooterSection() {
  const { openMaterialModal } = useContext(MaterialModalContext) || { openMaterialModal: () => {} }
  const { navigateTo } = useContext(NavigationContext) || { navigateTo: () => {} }
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [isFAQPopupOpen, setIsFAQPopupOpen] = useState(false)
  
  const handleTrilha01Click = (e) => {
    e.preventDefault()
    setIsContactPopupOpen(true)
  }
  
  const handleTrilha02Click = (e) => {
    e.preventDefault()
    navigateTo('jam')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }
  
  const handleTrilha03Click = (e) => {
    e.preventDefault()
    navigateTo('expedicao-na-estrada')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }
  
  const links = [
    {
      text: 'Converse com a Mastertech',
      href: '#',
      onClick: (e) => {
        e.preventDefault()
        setIsContactPopupOpen(true)
      }
    },
    {
      text: 'Perguntas frequentes',
      href: '#',
      onClick: (e) => {
        e.preventDefault()
        setIsFAQPopupOpen(true)
      }
    }
  ]

  return (
    <section id="footer" className="footer-section">
      <div className="footer-cta">
        <div className="footer-cta-container">
          <div className="footer-title">
            <h1 className="footer-title-roblox">É pai, tutor ou responsável?</h1>
          </div>
          <div className="footer-cta-content">
            <p className="footer-cta-text">
              Temos um material pra você. <br />
              Clique para <button className="footer-link-button" onClick={() => openMaterialModal('download')}>baixar</button> ou <button className="footer-link-button" onClick={() => openMaterialModal('video')}>assista o vídeo</button>
            </p>
          </div>
        </div>
      </div>
      <ConvideSeusAmigosSection />
      <div id="footer-container-wrapper" className="footer-container-wrapper">
        <div className="footer-container">
          <h2 className="footer-links-title">Central da Expedição</h2>
          <ul className="footer-links">
          {links.map((link, index) => (
            <li key={index}>
              <a 
                href={link.href} 
                className="footer-link"
                onClick={link.onClick || (() => {})}
              >
                <span className="footer-arrow">→</span>
                <span className="footer-link-text">{link.text}</span>
              </a>
            </li>
          ))}
          </ul>
          
          <div className="footer-separator"></div>
          
          <h3 className="footer-calls-title">Escolha uma das trilhas</h3>
          
          <div className="footer-cards">
            <div className="footer-card" onClick={handleTrilha01Click} style={{ cursor: 'pointer' }}>
              <div className="footer-card-label-wrapper">
                <span className="footer-card-label">TRILHA 01</span>
              </div>
              <div className="footer-card-content">
                <h4 className="footer-card-title">Aprenda Roblox Studio do zero em nossas trilhas de conteúdos</h4>
                <p className="footer-card-description">As trilhas misturam curso online, desafios mensais e eventos ao vivo pra transformar tempo de tela em portfólio, segurança digital e histórias que você assina com seu nome.</p>
              </div>
            </div>
            <div className="footer-card" onClick={handleTrilha02Click} style={{ cursor: 'pointer' }}>
              <div className="footer-card-label-wrapper">
                <span className="footer-card-label">TRILHA 02</span>
              </div>
              <div className="footer-card-content">
                <h4 className="footer-card-title">Inscreva-se numa jam e crie experiências jogáveis de verdade;</h4>
                <p className="footer-card-description">Participe de Game Jams onde você desenvolve experiências completas em 72 horas, trabalhando em equipe e criando projetos reais para o Roblox.</p>
              </div>
            </div>
            <div className="footer-card" onClick={handleTrilha03Click} style={{ cursor: 'pointer' }}>
              <div className="footer-card-label-wrapper">
                <span className="footer-card-label">TRILHA 03</span>
              </div>
              <div className="footer-card-content">
                <h4 className="footer-card-title">Participe da imersão presencial em um evento na sua capital.</h4>
                <p className="footer-card-description">Consulte em breve o calendário do Expedição Roblox na Estrada para eventos presenciais na sua cidade.</p>
              </div>
            </div>
          </div>
          
          <div className="footer-separator"></div>
          
          <GlossarioSection />
        </div>
      </div>
      <div className="footer-final">
        <div className="footer-final-container">
          <p className="footer-final-text">
            Expedição Roblox é um projeto da Mastertech junto com o Roblox
          </p>
          <div className="footer-final-social">
            <a href="#" className="footer-social-link" aria-label="Instagram">Instagram</a>
            <a href="#" className="footer-social-link" aria-label="WhatsApp">WhatsApp</a>
            <a href="#" className="footer-social-link" aria-label="TikTok">TikTok</a>
          </div>
        </div>
      </div>
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
      />
      <FAQPopup 
        isOpen={isFAQPopupOpen} 
        onClose={() => setIsFAQPopupOpen(false)} 
      />
    </section>
  )
}

export default FooterSection

