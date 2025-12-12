import { useState, useContext } from 'react'
import { MaterialModalContext, NavigationContext } from '../App'
import { useSiteConfig } from '../config/useSiteConfig'
import ConvideSeusAmigosSection from './ConvideSeusAmigosSection'
import ContactPopup from './ContactPopup'
import FAQPopup from './FAQPopup'
import GlossarioSection from './GlossarioSection'
import './FooterSection.css'

function FooterSection() {
  const config = useSiteConfig()
  const { openMaterialModal } = useContext(MaterialModalContext) || { openMaterialModal: () => {} }
  const { navigateTo } = useContext(NavigationContext) || { navigateTo: () => {} }
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [isFAQPopupOpen, setIsFAQPopupOpen] = useState(false)
  
  const handleTrilhaClick = (trilha, e) => {
    e.preventDefault()
    if (trilha.action === 'contact') {
      setIsContactPopupOpen(true)
    } else if (trilha.action === 'jam') {
      navigateTo('jam')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    } else if (trilha.action === 'expedicao-na-estrada') {
      navigateTo('expedicao-na-estrada')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }
  
  const links = config?.footer?.centralExpedicao?.links?.map(link => ({
    text: link.text,
    href: '#',
    onClick: (e) => {
      e.preventDefault()
      if (link.action === 'contact') {
        setIsContactPopupOpen(true)
      } else if (link.action === 'faq') {
        setIsFAQPopupOpen(true)
      }
    }
  })) || []
  
  const trilhas = config?.footer?.centralExpedicao?.trilhas || []

  return (
    <section id="footer" className="footer-section">
      <div className="footer-cta">
        <div className="footer-cta-container">
          <div className="footer-title">
            <h1 className="footer-title-roblox">{config?.footer?.cta?.title || 'É pai, tutor ou responsável?'}</h1>
          </div>
          <div className="footer-cta-content">
            <p className="footer-cta-text">
              {config?.footer?.cta?.text || 'Temos um material pra você.'} <br />
              Clique para <button className="footer-link-button" onClick={() => openMaterialModal('download')}>{config?.footer?.cta?.links?.download || 'baixar'}</button> ou <button className="footer-link-button" onClick={() => openMaterialModal('video')}>{config?.footer?.cta?.links?.video || 'assista o vídeo'}</button>
            </p>
          </div>
        </div>
      </div>
      <ConvideSeusAmigosSection />
      <div id="footer-container-wrapper" className="footer-container-wrapper">
        <div className="footer-container">
          <h2 className="footer-links-title">{config?.footer?.centralExpedicao?.title || 'Central da Expedição'}</h2>
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
          
          {config?.footer?.centralExpedicao?.separator && <div className="footer-separator"></div>}
          
          {config?.footer?.centralExpedicao?.callsTitle && (
            <h3 className="footer-calls-title">{config.footer.centralExpedicao.callsTitle}</h3>
          )}
          
          <div className="footer-cards">
            {trilhas.map((trilha, index) => (
              <div key={trilha.id || index} className="footer-card" onClick={(e) => handleTrilhaClick(trilha, e)} style={{ cursor: 'pointer' }}>
                <div className="footer-card-label-wrapper">
                  <span className="footer-card-label">{trilha.label || `TRILHA ${index + 1}`}</span>
                </div>
                <div className="footer-card-content">
                  <h4 className="footer-card-title">{trilha.title || ''}</h4>
                  <p className="footer-card-description">{trilha.description || ''}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="footer-separator"></div>
          
          <GlossarioSection />
        </div>
      </div>
      <div className="footer-final">
        <div className="footer-final-container">
          <p className="footer-final-text">
            {config?.footer?.final?.text || 'Expedição Roblox é um projeto da Mastertech junto com o Roblox'}
          </p>
          <div className="footer-final-social">
            {config?.footer?.final?.social?.map((social, index) => (
              <a key={index} href={social.url || '#'} className="footer-social-link" aria-label={social.name}>
                {social.name}
              </a>
            ))}
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

