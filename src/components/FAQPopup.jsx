import './FAQPopup.css'

function FAQPopup({ isOpen, onClose }) {
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
        <p className="faq-popup-message">Em breve</p>
      </div>
    </div>
  )
}

export default FAQPopup






