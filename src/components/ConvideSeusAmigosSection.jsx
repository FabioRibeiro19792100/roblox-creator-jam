import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import { enviarConviteAmigo } from '../services/emailService'
import './ConvideSeusAmigosSection.css'

function ConvideSeusAmigosSection() {
  const config = useSiteConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showThankYouModal, setShowThankYouModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleSubmit = async (e) => {
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

    setIsSubmitting(true)
    setError('')

    try {
      const result = await enviarConviteAmigo(email)

      if (result.success) {
        setEmail('')
        setShowThankYouModal(true)

        // Fechar o modal após 3 segundos
        setTimeout(() => {
          setShowThankYouModal(false)
        }, 3000)
      } else {
        setError('Erro ao enviar convite. Tente novamente.')
      }
    } catch (err) {
      console.error('Erro ao enviar convite:', err)
      setError('Erro ao enviar convite. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={`convide-seus-amigos-section sweep-fill ${isOpen ? 'convide-open sweep-fill-active' : ''}`}>
      <div className="convide-seus-amigos-container">
        <div className={`convide-seus-amigos-accordion-item ${isOpen ? 'convide-open' : ''}`}>
          <button
            className="convide-seus-amigos-header plus-indicator-trigger"
            onClick={toggleAccordion}
            aria-expanded={isOpen}
            aria-controls="convide-amigos-content"
          >
            <span className="convide-seus-amigos-title-text">{config?.convideAmigos?.title || 'Convide seus amigos'}</span>
            <span className={`convide-seus-amigos-arrow plus-indicator ${isOpen ? 'plus-indicator-open' : ''}`} aria-hidden="true" />
            <span className="sr-only">
              {isOpen ? 'Ocultar formulário de convite' : 'Mostrar formulário de convite'}
            </span>
          </button>
          {isOpen && (
            <div className="convide-seus-amigos-content" id="convide-amigos-content">
              <p className="convide-seus-amigos-description">
                <span className="convide-line-1">{config?.convideAmigos?.description?.[0] || 'A cada 3 amigos indicados que se inscrevam em alguma ação da expedição,'}</span>
                <br />
                <span className="convide-line-2">{config?.convideAmigos?.description?.[1] || 'você ganha acesso a eventos exclusivos como mentoria com especialistas sobre criação no Roblox.'}</span>
              </p>
              <form className="convide-seus-amigos-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                <div className="convide-seus-amigos-form-row">
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    className={`convide-seus-amigos-input ${error ? 'error' : ''}`}
                    placeholder={config?.convideAmigos?.form?.emailLabel || 'Email do amigo'}
                  />
                  <button
                    type="submit"
                    className="convide-seus-amigos-submit"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : (config?.convideAmigos?.form?.button || 'Enviar convite')}
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
            <h3 className="convide-thank-you-title">{config?.convideAmigos?.form?.thankYou?.title || 'Obrigado!'}</h3>
            <p className="convide-thank-you-message">
              {config?.convideAmigos?.form?.thankYou?.message || 'Seu convite foi enviado com sucesso.'}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ConvideSeusAmigosSection
