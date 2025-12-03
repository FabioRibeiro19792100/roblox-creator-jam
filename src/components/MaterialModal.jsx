import { useState } from 'react'
import './MaterialModal.css'

function MaterialModal({ isOpen, onClose, type, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      // Chama a função de sucesso passada como prop
      if (onSuccess) {
        onSuccess(formData)
      }
      
      // Fecha o modal após 1 segundo
      setTimeout(() => {
        setFormData({ nome: '', email: '' })
        setIsSubmitted(false)
        onClose()
      }, 1000)
    }
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
          </div>
        )}
      </div>
    </div>
  )
}

export default MaterialModal

