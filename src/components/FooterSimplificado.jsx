import { useState, useContext } from 'react'
import { NavigationContext } from '../App'
import ContactPopup from './ContactPopup'
import FAQPopup from './FAQPopup'
import GlossarioSection from './GlossarioSection'
import './FooterSection.css'

function FooterSimplificado() {
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
    <>
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
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
      />
      <FAQPopup 
        isOpen={isFAQPopupOpen} 
        onClose={() => setIsFAQPopupOpen(false)} 
      />
    </>
  )
}

export default FooterSimplificado

