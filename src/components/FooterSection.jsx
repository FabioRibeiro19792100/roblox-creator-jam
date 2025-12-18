import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import ConvideSeusAmigosSection from './ConvideSeusAmigosSection'
import ContactPopup from './ContactPopup'
import FAQPopup from './FAQPopup'
import GlossarioSection from './GlossarioSection'
import './FooterSection.css'

function FooterSection() {
  const config = useSiteConfig()
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [isFAQPopupOpen, setIsFAQPopupOpen] = useState(false)

  const links = [
    {
      text: 'Converse com a Mastertech',
      href: '#',
      onClick: (event) => {
        event.preventDefault()
        setIsContactPopupOpen(true)
      }
    },
    {
      text: 'Perguntas frequentes',
      href: '#',
      onClick: (event) => {
        event.preventDefault()
        setIsFAQPopupOpen(true)
      }
    }
  ]

  return (
    <section id="footer" className="footer-section">
      <ConvideSeusAmigosSection />
      <div id="footer-container-wrapper" className="footer-container-wrapper">
        <div className="footer-container">
          <h2 className="footer-links-title">{config?.footer?.centralExpedicao?.title || 'Contato'}</h2>
          <ul className="footer-links">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="footer-link" onClick={link.onClick || (() => {})}>
                  <span className="footer-arrow">→</span>
                  <span className="footer-link-text">{link.text}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="footer-separator" />

          <GlossarioSection />
        </div>
      </div>
      <div className="footer-final">
        <div className="footer-final-container">
          <p className="footer-final-text">Expedição Roblox é um projeto da Mastertech junto com o Roblox</p>
          <div className="footer-final-social">
            <a href="https://www.instagram.com/mastertech.tech/" className="footer-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://wa.me/5511919522455" className="footer-social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <ContactPopup isOpen={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />
      <FAQPopup isOpen={isFAQPopupOpen} onClose={() => setIsFAQPopupOpen(false)} />
    </section>
  )
}

export default FooterSection
