import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import ContactPopup from './ContactPopup'
import FAQPopup from './FAQPopup'
import GlossarioSection from './GlossarioSection'
import './FooterSection.css'

function FooterSimplificado() {
  const config = useSiteConfig()
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [isFAQPopupOpen, setIsFAQPopupOpen] = useState(false)

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

  return (
    <>
      <div id="footer-container-wrapper" className="footer-container-wrapper">
        <div className="footer-container">
          <h2 className="footer-links-title">{config?.footer?.centralExpedicao?.title || 'Contato'}</h2>
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

