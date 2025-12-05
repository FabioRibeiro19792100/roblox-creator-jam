import { useState, useEffect } from 'react'
import './EmailGatePopup.css'

function EmailGatePopup({ onEmailSubmitted, onClose }) {
  const [hasExistingEmail, setHasExistingEmail] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Verificar se já tem email salvo (indicando que já se cadastrou)
    const savedEmail = localStorage.getItem('expedicao_email')
    const savedNome = localStorage.getItem('expedicao_nome')
    
    if (savedEmail) {
      // Se tem email salvo, significa que já se cadastrou
      setHasExistingEmail(true)
      setEmail(savedEmail)
      if (savedNome) {
        setNome(savedNome)
      }
    } else {
      // Se não tem email, precisa fazer cadastro completo
      setHasExistingEmail(false)
    }
  }, [])

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Se não tem email cadastrado, precisa de nome também
    if (!hasExistingEmail) {
      if (!nome.trim()) {
        setError('Por favor, insira seu nome')
        return
      }
    }
    
    if (!email.trim()) {
      setError('Por favor, insira seu email')
      return
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido')
      return
    }

    setIsSubmitting(true)
    
    // Aqui você pode fazer uma chamada à API para verificar se o email já está cadastrado
    // Por enquanto, vamos simular a verificação
    setTimeout(() => {
      // Se não tinha email salvo, está fazendo cadastro novo
      if (!hasExistingEmail) {
        // Salvar dados no localStorage (cadastro completo)
        localStorage.setItem('expedicao_email', email)
        localStorage.setItem('expedicao_nome', nome)
        localStorage.setItem('expedicao_cadastrado', 'true')
      } else {
        // Se já tinha email, apenas confirma e atualiza se necessário
        localStorage.setItem('expedicao_email', email)
        if (nome) {
          localStorage.setItem('expedicao_nome', nome)
        }
      }
      
      setIsSubmitting(false)
      onEmailSubmitted(email)
    }, 500)
  }

  return (
    <div className="email-gate-overlay" onClick={onClose}>
      <div className="email-gate-popup" onClick={(e) => e.stopPropagation()}>
        <button 
          className="email-gate-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="email-gate-content">
          {hasExistingEmail ? (
            <>
              <h2 className="email-gate-title">Área Especial para Membros</h2>
              <p className="email-gate-description">
                Você está entrando em uma área especial para membros da Expedição Roblox.
                <br />
                Confirme seu email para continuar.
              </p>
            </>
          ) : (
            <>
              <h2 className="email-gate-title">Ainda não faz parte da Expedição?</h2>
              <p className="email-gate-description">
                Faça seu cadastro para acessar nossa biblioteca completa de conteúdos.
              </p>
            </>
          )}
          <form className="email-gate-form" onSubmit={handleSubmit}>
            {!hasExistingEmail && (
              <div className="email-gate-input-wrapper">
                <input
                  type="text"
                  className="email-gate-input"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value)
                    setError('')
                  }}
                  required
                  autoFocus
                />
              </div>
            )}
            <div className="email-gate-input-wrapper">
              <input
                type="email"
                className="email-gate-input"
                placeholder="Seu email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                required
                autoFocus={hasExistingEmail}
              />
              {error && <span className="email-gate-error">{error}</span>}
            </div>
            <button 
              type="submit" 
              className="email-gate-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : hasExistingEmail ? 'Confirmar e Acessar' : 'Cadastrar e Acessar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmailGatePopup

