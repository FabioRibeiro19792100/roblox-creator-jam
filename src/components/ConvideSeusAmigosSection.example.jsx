// EXEMPLO: Como usar siteConfig em um componente
// Este é um exemplo de como refatorar ConvideSeusAmigosSection.jsx para usar siteConfig

import { useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import './ConvideSeusAmigosSection.css'

function ConvideSeusAmigosSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [showThankYouModal, setShowThankYouModal] = useState(false)

  // Usando configuração do siteConfig
  const config = siteConfig.convideAmigos

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!email.trim()) {
      setError('Campo obrigatório')
      return
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email inválido')
      return
    }
    
    setError('')
    setEmail('')
    setShowThankYouModal(true)
    
    setTimeout(() => {
      setShowThankYouModal(false)
    }, 3000)
  }

  return (
    <section className={`convide-seus-amigos-section ${isOpen ? 'convide-open' : ''}`}>
      <div className="convide-seus-amigos-container">
        <div className={`convide-seus-amigos-accordion-item ${isOpen ? 'convide-open' : ''}`}>
          <button
            className="convide-seus-amigos-header"
            onClick={toggleAccordion}
            aria-expanded={isOpen}
          >
            {/* Usando título do siteConfig */}
            <span className="convide-seus-amigos-title-text">{config.title}</span>
            <span className="convide-seus-amigos-arrow">{isOpen ? '−' : '+'}</span>
          </button>
          {isOpen && (
            <div className="convide-seus-amigos-content">
              <p className="convide-seus-amigos-description">
                {/* Usando descrição do siteConfig */}
                <span className="convide-line-1">{config.description[0]}</span>
                <br />
                <span className="convide-line-2">{config.description[1]}</span>
              </p>
              <form className="convide-seus-amigos-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                <div className="convide-seus-amigos-form-row">
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    className={`convide-seus-amigos-input ${error ? 'error' : ''}`}
                    placeholder={config.form.emailLabel}
                  />
                  {/* Usando texto do botão do siteConfig */}
                  <button type="submit" className="convide-seus-amigos-submit" onClick={(e) => e.stopPropagation()}>
                    {config.form.button}
                  </button>
                </div>
                {error && <span className="convide-seus-amigos-error">{error}</span>}
              </form>
            </div>
          )}
        </div>
      </div>
      
      {showThankYouModal && (
        <div 
          className="convide-thank-you-overlay"
          onClick={() => setShowThankYouModal(false)}
        >
          <div 
            className="convide-thank-you-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="convide-thank-you-close"
              onClick={() => setShowThankYouModal(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            {/* Usando mensagens do siteConfig */}
            <h3 className="convide-thank-you-title">{config.form.thankYou.title}</h3>
            <p className="convide-thank-you-message">
              {config.form.thankYou.message}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ConvideSeusAmigosSection



