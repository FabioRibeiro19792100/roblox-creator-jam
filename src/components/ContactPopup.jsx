import { useState } from 'react'
import './ContactPopup.css'

function ContactPopup({ isOpen, onClose }) {
  const [contactMethod, setContactMethod] = useState(null) // 'whatsapp' ou 'form'
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleMethodSelect = (method) => {
    setContactMethod(method)
    if (method === 'whatsapp') {
      window.open('https://wa.me/5511998901551', '_blank')
    }
  }

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
    
    if (!formData.assunto.trim()) {
      newErrors.assunto = 'Campo obrigatório'
    }
    
    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Campo obrigatório'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      // Aqui você pode adicionar a lógica para enviar os dados para um backend
      setIsSubmitted(true)
      
      // Resetar formulário após 3 segundos
      setTimeout(() => {
        setFormData({
          nome: '',
          email: '',
          assunto: '',
          mensagem: ''
        })
        setIsSubmitted(false)
        setContactMethod(null)
        onClose()
      }, 3000)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="contact-popup-overlay"
      onClick={onClose}
    >
      <div 
        className="contact-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="contact-popup-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        
        {!contactMethod ? (
          <div className="contact-popup-options">
            <h3 className="contact-popup-title">Contato</h3>
            <div className="contact-popup-buttons">
              <button 
                className="contact-popup-option-button"
                onClick={() => handleMethodSelect('whatsapp')}
              >
                Contato por WhatsApp
              </button>
              <button 
                className="contact-popup-option-button"
                onClick={() => handleMethodSelect('form')}
              >
                Fale com a Mastertech
              </button>
            </div>
          </div>
        ) : contactMethod === 'form' ? (
          <div className="contact-popup-form-container">
            <h3 className="contact-popup-title">Fale com a Mastertech</h3>
            {!isSubmitted ? (
              <form className="contact-popup-form" onSubmit={handleSubmit}>
                <div className="contact-popup-field">
                  <label htmlFor="nome" className="contact-popup-label">
                    Nome <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={`contact-popup-input ${errors.nome ? 'error' : ''}`}
                    placeholder="Seu nome completo"
                  />
                  {errors.nome && <span className="contact-popup-error">{errors.nome}</span>}
                </div>

                <div className="contact-popup-field">
                  <label htmlFor="email" className="contact-popup-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`contact-popup-input ${errors.email ? 'error' : ''}`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <span className="contact-popup-error">{errors.email}</span>}
                </div>

                <div className="contact-popup-field">
                  <label htmlFor="assunto" className="contact-popup-label">
                    Assunto <span className="required">*</span>
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    className={`contact-popup-select ${errors.assunto ? 'error' : ''}`}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="trilha-01">Trilha 01</option>
                    <option value="trilha-02">Trilha 02</option>
                    <option value="trilha-03">Trilha 03</option>
                    <option value="outros">Outros</option>
                  </select>
                  {errors.assunto && <span className="contact-popup-error">{errors.assunto}</span>}
                </div>

                <div className="contact-popup-field">
                  <label htmlFor="mensagem" className="contact-popup-label">
                    Mensagem <span className="required">*</span>
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    className={`contact-popup-textarea ${errors.mensagem ? 'error' : ''}`}
                    placeholder="Sua mensagem"
                    rows="5"
                  />
                  {errors.mensagem && <span className="contact-popup-error">{errors.mensagem}</span>}
                </div>

                <div className="contact-popup-form-actions">
                  <button 
                    type="button" 
                    className="contact-popup-back-button"
                    onClick={() => setContactMethod(null)}
                  >
                    Voltar
                  </button>
                  <button type="submit" className="contact-popup-submit">
                    Enviar
                  </button>
                </div>
              </form>
            ) : (
              <div className="contact-popup-success">
                <p className="contact-popup-success-message">
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ContactPopup

