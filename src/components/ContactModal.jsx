import { useState } from 'react'
import ExpedicaoInscricaoForm from './ExpedicaoInscricaoForm'
import './ContactModal.css'

function ContactModal({ isOpen, onClose, tipoInscricao, eventoSelecionado, eventosDisponiveis }) {
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteError, setInviteError] = useState('')
  const [inviteSuccess, setInviteSuccess] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleFormSuccess = (formData) => {
    // Formulário foi enviado com sucesso
    setIsFormSubmitted(true)
    setShowInvite(true)
  }

  const handleInviteChange = (e) => {
    setInviteEmail(e.target.value)
    setInviteError('')
  }

  const handleInviteSubmit = (e) => {
    e.preventDefault()
    
    if (!inviteEmail.trim()) {
      setInviteError('Campo obrigatório')
      return
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) {
      setInviteError('Email inválido')
      return
    }
    
    // Aqui você pode adicionar a lógica para enviar o convite para um backend
    setInviteSuccess(true)
    setInviteEmail('')
    
    // Resetar tudo após 3 segundos
    setTimeout(() => {
      setIsFormSubmitted(false)
      setShowInvite(false)
      setInviteSuccess(false)
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <>
      {!isFormSubmitted ? (
        <ExpedicaoInscricaoForm
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={handleFormSuccess}
          title="Inscreva-se na Expedição Roblox"
          description="Preencha o formulário para participar da Expedição Roblox."
          tipoInscricao={tipoInscricao}
          eventoSelecionado={eventoSelecionado}
          eventosDisponiveis={eventosDisponiveis}
        />
      ) : (
        <div className="contact-modal-overlay" onClick={onClose}>
          <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="contact-modal-close" onClick={onClose}>×</button>
            <div className="contact-form-success">
              <h2 className="contact-form-title">Obrigado!</h2>
              <p className="contact-form-success-message">
                Consulte seu email para acessar informações.
              </p>
              
              {showInvite && !inviteSuccess && (
                <div className="contact-invite-section">
                  <h3 className="contact-invite-title">Convide seus amigos!</h3>
                  <p className="contact-invite-description">
                    A cada 3 amigos indicados que se inscrevam em alguma ação da expedição, você ganha acesso a eventos exclusivos como mentoria com especialistas sobre criação no Roblox.
                  </p>
                  <form className="contact-invite-form" onSubmit={handleInviteSubmit}>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={handleInviteChange}
                      className={`contact-invite-input ${inviteError ? 'error' : ''}`}
                      placeholder="Email do amigo"
                    />
                    {inviteError && <span className="contact-form-error">{inviteError}</span>}
                    <button type="submit" className="contact-invite-submit">
                      Enviar convite
                    </button>
                  </form>
                </div>
              )}
              
              {inviteSuccess && (
                <div className="contact-invite-success">
                  <p className="contact-invite-success-message">
                    Convite enviado com sucesso!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ContactModal

