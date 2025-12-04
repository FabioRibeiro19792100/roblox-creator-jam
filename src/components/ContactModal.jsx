import { useState } from 'react'
import './ContactModal.css'

function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    idade: '',
    emailResponsavel: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteError, setInviteError] = useState('')
  const [inviteSuccess, setInviteSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Campo obrigatório'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Campo obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!formData.idade.trim()) {
      newErrors.idade = 'Campo obrigatório'
    } else if (isNaN(formData.idade) || parseInt(formData.idade) < 1) {
      newErrors.idade = 'Idade inválida'
    }
    
    if (!formData.emailResponsavel.trim()) {
      newErrors.emailResponsavel = 'Campo obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailResponsavel)) {
      newErrors.emailResponsavel = 'Email inválido'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      // Aqui você pode adicionar a lógica para enviar os dados para um backend
      // Por enquanto, apenas mostra a mensagem de sucesso
      setIsSubmitted(true)
      setShowInvite(true)
    }
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
      setFormData({
        nome: '',
        email: '',
        idade: '',
        emailResponsavel: ''
      })
      setIsSubmitted(false)
      setShowInvite(false)
      setInviteSuccess(false)
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="contact-modal-close" onClick={onClose}>×</button>
        
        {!isSubmitted ? (
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="contact-form-title">
              Receba as novidades<br />em primeira mão
            </h2>
            
            <div className="contact-form-field">
              <label htmlFor="nome" className="contact-form-label">
                Nome <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`contact-form-input ${errors.nome ? 'error' : ''}`}
                placeholder="Seu nome completo"
              />
              {errors.nome && <span className="contact-form-error">{errors.nome}</span>}
            </div>

            <div className="contact-form-field">
              <label htmlFor="email" className="contact-form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`contact-form-input ${errors.email ? 'error' : ''}`}
                placeholder="seu@email.com"
              />
              {errors.email && <span className="contact-form-error">{errors.email}</span>}
            </div>

            <div className="contact-form-field">
              <label htmlFor="idade" className="contact-form-label">
                Idade <span className="required">*</span>
              </label>
              <input
                type="number"
                id="idade"
                name="idade"
                value={formData.idade}
                onChange={handleChange}
                className={`contact-form-input ${errors.idade ? 'error' : ''}`}
                placeholder="Sua idade"
                min="1"
              />
              {errors.idade && <span className="contact-form-error">{errors.idade}</span>}
            </div>

            <div className="contact-form-field">
              <label htmlFor="emailResponsavel" className="contact-form-label">
                Email do responsável <span className="required">*</span>
              </label>
              <input
                type="email"
                id="emailResponsavel"
                name="emailResponsavel"
                value={formData.emailResponsavel}
                onChange={handleChange}
                className={`contact-form-input ${errors.emailResponsavel ? 'error' : ''}`}
                placeholder="responsavel@email.com"
              />
              {errors.emailResponsavel && <span className="contact-form-error">{errors.emailResponsavel}</span>}
            </div>

            <button type="submit" className="contact-form-submit">
              Enviar
            </button>
          </form>
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default ContactModal

