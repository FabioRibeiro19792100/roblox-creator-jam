import { useState } from 'react'
import './InscricaoModal.css'

function InscricaoModal({ isOpen, onClose }) {
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
    e.stopPropagation()
    
    if (validate()) {
      // Aqui você pode adicionar a lógica para enviar os dados para um backend
      setIsSubmitted(true)
      
      // Resetar formulário após 3 segundos
      setTimeout(() => {
        setFormData({
          nome: '',
          email: ''
        })
        setIsSubmitted(false)
        onClose()
      }, 3000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="inscricao-modal-overlay" onClick={onClose}>
      <div className="inscricao-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="inscricao-modal-close" onClick={onClose}>×</button>
        
        {!isSubmitted ? (
          <form className="inscricao-form" onSubmit={handleSubmit}>
            <h2 className="inscricao-form-title">
              Deixe o seu nome na lista
            </h2>
            
            <div className="inscricao-form-field">
              <label htmlFor="nome" className="inscricao-form-label">
                Nome <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`inscricao-form-input ${errors.nome ? 'error' : ''}`}
                placeholder="Seu nome completo"
              />
              {errors.nome && <span className="inscricao-form-error">{errors.nome}</span>}
            </div>

            <div className="inscricao-form-field">
              <label htmlFor="email" className="inscricao-form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`inscricao-form-input ${errors.email ? 'error' : ''}`}
                placeholder="seu@email.com"
              />
              {errors.email && <span className="inscricao-form-error">{errors.email}</span>}
            </div>

            <button type="submit" className="inscricao-form-submit">
              Enviar
            </button>
          </form>
        ) : (
          <div className="inscricao-form-success">
            <h3>Obrigado!</h3>
            <p>Seu nome foi adicionado à lista com sucesso.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InscricaoModal

