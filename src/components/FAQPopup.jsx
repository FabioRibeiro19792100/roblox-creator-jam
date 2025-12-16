import { useSiteConfig } from '../config/useSiteConfig'
import './FAQPopup.css'

function FAQPopup({ isOpen, onClose }) {
  const config = useSiteConfig()
  
  if (!isOpen) return null

  return (
    <div 
      className="faq-popup-overlay"
      onClick={onClose}
    >
      <div 
        className="faq-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="faq-popup-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="faq-popup-title">{config?.faq?.title || 'Perguntas frequentes'}</h2>
        <p className="faq-popup-message">{config?.faq?.message || 'Em breve'}</p>
      </div>
    </div>
  )
}

export default FAQPopup






