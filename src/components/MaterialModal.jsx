import { useState } from 'react'
import './MaterialModal.css'

function MaterialModal({ isOpen, onClose, type, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: ''
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
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      setIsSubmitted(true)
      setShowInvite(true)
      // Chama a função de sucesso passada como prop
      if (onSuccess) {
        onSuccess(formData)
      }
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
      setFormData({ nome: '', email: '' })
      setIsSubmitted(false)
      setShowInvite(false)
      setInviteSuccess(false)
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  const isDownload = type === 'download'
  const isVideo = type === 'video'

  return (
    <div className="material-modal-overlay" onClick={onClose}>
      <div className="material-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="material-modal-close" onClick={onClose}>×</button>
        
        {!isSubmitted ? (
          <form className="material-form" onSubmit={handleSubmit}>
            <h2 className="material-form-title">
              {isDownload ? 'Baixar material' : 'Assistir vídeo'}
            </h2>
            <p className="material-form-subtitle">
              Preencha seus dados para {isDownload ? 'baixar' : 'assistir'}
            </p>
            
            <div className="material-form-field">
              <label htmlFor="nome" className="material-form-label">
                Nome <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`material-form-input ${errors.nome ? 'error' : ''}`}
                placeholder="Seu nome completo"
              />
              {errors.nome && <span className="material-form-error">{errors.nome}</span>}
            </div>

            <div className="material-form-field">
              <label htmlFor="email" className="material-form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`material-form-input ${errors.email ? 'error' : ''}`}
                placeholder="seu@email.com"
              />
              {errors.email && <span className="material-form-error">{errors.email}</span>}
            </div>

            <button type="submit" className="material-form-submit">
              {isDownload ? 'Baixar PDF' : 'Assistir vídeo'}
            </button>
          </form>
        ) : (
          <div className="material-form-success">
            <h2 className="material-form-title">Sucesso!</h2>
            <p className="material-form-success-message">
              {isDownload ? 'O download começará em instantes...' : 'Redirecionando para o vídeo...'}
            </p>
            
            {showInvite && !inviteSuccess && (
              <div className="material-invite-section">
                <h3 className="material-invite-title">Convide seus amigos!</h3>
                <p className="material-invite-description">
                  A cada 3 amigos indicados que se inscrevam em alguma ação da expedição, você ganha acesso a eventos exclusivos como mentoria com especialistas sobre criação no Roblox.
                </p>
                <form className="material-invite-form" onSubmit={handleInviteSubmit}>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={handleInviteChange}
                    className={`material-invite-input ${inviteError ? 'error' : ''}`}
                    placeholder="Email do amigo"
                  />
                  {inviteError && <span className="material-form-error">{inviteError}</span>}
                  <button type="submit" className="material-invite-submit">
                    Enviar convite
                  </button>
                </form>
              </div>
            )}
            
            {inviteSuccess && (
              <div className="material-invite-success">
                <p className="material-invite-success-message">
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

export default MaterialModal


