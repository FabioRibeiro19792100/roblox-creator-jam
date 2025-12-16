import { useState, useEffect } from 'react'
import './ExpedicaoInscricaoForm.css'

function ExpedicaoInscricaoForm({ isOpen, onClose, onSuccess, title, description, tipoInscricao, eventoSelecionado, eventosDisponiveis }) {
  const [step, setStep] = useState(1) // 1: Pergunta conta Roblox, 2: Alias + Idade, 3: Formulário completo
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    robloxAlias: '',
    isPaiResponsavel: false,
    isEducador: false,
    ageChecked: false,
    eventoId: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasRobloxAccount, setHasRobloxAccount] = useState(false)

  useEffect(() => {
    // Sempre começar no passo 1 (pergunta se tem conta)
    setStep(1)

    // Carregar dados salvos se existirem
    const savedEmail = localStorage.getItem('expedicao_email')
    const savedNome = localStorage.getItem('expedicao_nome')
    const savedRobloxAlias = localStorage.getItem('expedicao_roblox_id')
    const savedIsPaiResponsavel = localStorage.getItem('expedicao_is_pai_responsavel') === 'true'
    const savedIsEducador = localStorage.getItem('expedicao_is_educador') === 'true'
    const savedAgeChecked = localStorage.getItem('expedicao_age_checked') === 'true'
    
    // Carregar dados básicos sempre
    setFormData(prev => ({
      ...prev,
      email: savedEmail || '',
      nome: savedNome || '',
      robloxAlias: savedRobloxAlias || '',
      isPaiResponsavel: savedIsPaiResponsavel,
      isEducador: savedIsEducador,
      ageChecked: savedAgeChecked
    }))

    // Se tem evento pré-selecionado (Estrada), usar ele
    if (eventoSelecionado) {
      setFormData(prev => ({
        ...prev,
        eventoId: eventoSelecionado.id || eventoSelecionado
      }))
    }
  }, [isOpen, eventoSelecionado])

  const handleRobloxAccountCheck = (hasAccount) => {
    if (hasAccount) {
      localStorage.setItem('roblox_cadastrado', 'true')
      setHasRobloxAccount(true)
      setStep(2) // Ir para passo 2: pedir alias + checar idade
    } else {
      // Abrir cadastro do Roblox em nova aba
      window.open('https://www.roblox.com/signup', '_blank')
      // Não avança, espera usuário criar conta e clicar novamente em "Sim, já tenho conta"
    }
  }

  const validateRobloxAliasStep = () => {
    const newErrors = {}
    
    if (!formData.robloxAlias.trim()) {
      newErrors.robloxAlias = 'Campo obrigatório'
    } else if (!validateRobloxAlias(formData.robloxAlias)) {
      newErrors.robloxAlias = 'Alias inválido. Use apenas letras, números e underscore (3-20 caracteres)'
    }

    // Se não é pai/responsável nem educador (é jovem), precisa fazer age checking
    if (!formData.isPaiResponsavel && !formData.isEducador && !formData.ageChecked) {
      newErrors.ageChecked = 'É necessário verificar a idade no Roblox'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAliasAndAgeSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (validateRobloxAliasStep()) {
      // Salvar alias e age check
      localStorage.setItem('expedicao_roblox_id', formData.robloxAlias)
      localStorage.setItem('expedicao_age_checked', formData.ageChecked ? 'true' : 'false')
      localStorage.setItem('expedicao_is_pai_responsavel', formData.isPaiResponsavel ? 'true' : 'false')
      localStorage.setItem('expedicao_is_educador', formData.isEducador ? 'true' : 'false')
      
      // Avançar para formulário completo (passo 3)
      setStep(3)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }
      
      // Se desmarcar pai/responsável ou educador, resetar age checking se ambos estiverem desmarcados
      if ((name === 'isPaiResponsavel' || name === 'isEducador') && type === 'checkbox') {
        const newIsPaiResponsavel = name === 'isPaiResponsavel' ? checked : prev.isPaiResponsavel
        const newIsEducador = name === 'isEducador' ? checked : prev.isEducador
        
        if (!newIsPaiResponsavel && !newIsEducador) {
          newData.ageChecked = false
        }
      }
      
      return newData
    })
    
    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateRobloxAlias = (alias) => {
    // Roblox username: 3-20 caracteres, letras, números e underscore
    const robloxIdRegex = /^[a-zA-Z0-9_]{3,20}$/
    return robloxIdRegex.test(alias)
  }

  const handleChangeAliasStep = (e) => {
    const { name, value, type, checked } = e.target
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }
      
      // Se desmarcar pai/responsável ou educador, resetar age checking se ambos estiverem desmarcados
      if ((name === 'isPaiResponsavel' || name === 'isEducador') && type === 'checkbox') {
        const newIsPaiResponsavel = name === 'isPaiResponsavel' ? checked : prev.isPaiResponsavel
        const newIsEducador = name === 'isEducador' ? checked : prev.isEducador
        
        if (!newIsPaiResponsavel && !newIsEducador) {
          newData.ageChecked = false
        }
      }
      
      return newData
    })
    
    // Limpar erro do campo
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

    if (!formData.robloxAlias.trim()) {
      newErrors.robloxAlias = 'Campo obrigatório'
    } else if (!validateRobloxAlias(formData.robloxAlias)) {
      newErrors.robloxAlias = 'Alias inválido. Use apenas letras, números e underscore (3-20 caracteres)'
    }

    // Se é Jam ou Estrada, evento é obrigatório
    if ((tipoInscricao === 'jam' || tipoInscricao === 'estrada') && !formData.eventoId) {
      newErrors.eventoId = 'É necessário selecionar um evento'
    }

    // No passo 3 (formulário completo), age checking já foi validado no passo 2
    // Não precisa validar novamente aqui
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAgeCheck = () => {
    // Abrir página de verificação de idade do Roblox
    window.open('https://www.roblox.com/my/account#!/info', '_blank')
    // Marcar como verificado (em produção, você pode querer validar isso de verdade)
    setFormData(prev => ({
      ...prev,
      ageChecked: true
    }))
    setErrors(prev => ({
      ...prev,
      ageChecked: ''
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (validate()) {
      setIsSubmitting(true)
      
      // Salvar dados no localStorage
      localStorage.setItem('expedicao_email', formData.email)
      localStorage.setItem('expedicao_nome', formData.nome)
      localStorage.setItem('expedicao_roblox_id', formData.robloxAlias)
      localStorage.setItem('expedicao_is_pai_responsavel', formData.isPaiResponsavel ? 'true' : 'false')
      localStorage.setItem('expedicao_is_educador', formData.isEducador ? 'true' : 'false')
      localStorage.setItem('expedicao_age_checked', formData.ageChecked ? 'true' : 'false')
      if (formData.eventoId) {
        localStorage.setItem('expedicao_evento_id', formData.eventoId)
      }
      
      // Simular envio (em produção, enviar para API)
      setTimeout(() => {
        setIsSubmitting(false)
        if (onSuccess) {
          onSuccess(formData)
        }
        // Resetar formulário
        setFormData({
          nome: '',
          email: '',
          robloxAlias: '',
          isPaiResponsavel: false,
          isEducador: false,
          ageChecked: false,
          eventoId: eventoSelecionado ? (eventoSelecionado.id || eventoSelecionado) : ''
        })
        onClose()
      }, 500)
    }
  }

  if (!isOpen) return null

  return (
    <div className="expedicao-inscricao-overlay" onClick={onClose}>
      <div className="expedicao-inscricao-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          className="expedicao-inscricao-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        {step === 1 ? (
          // PASSO 1: Pergunta se tem conta Roblox
          <div className="expedicao-inscricao-step">
            <h2 className="expedicao-inscricao-title">
              Você tem conta no Roblox?
            </h2>
            <p className="expedicao-inscricao-description">
              Para participar da Expedição Roblox, você precisa ter uma conta no Roblox.
              <br />
              <br />
              Se ainda não tem, clique em "Criar conta" para abrir o cadastro em uma nova aba. Depois de criar, volte aqui e clique em "Sim, já tenho conta".
            </p>
            
            <div className="expedicao-inscricao-buttons">
              <button 
                className="expedicao-inscricao-btn-primary"
                onClick={() => handleRobloxAccountCheck(true)}
              >
                Sim, já tenho conta
              </button>
              
              <button 
                className="expedicao-inscricao-btn-secondary"
                onClick={() => handleRobloxAccountCheck(false)}
              >
                Criar conta no Roblox
              </button>
            </div>
          </div>
        ) : step === 2 ? (
          // PASSO 2: Alias + Checar Idade
          <div className="expedicao-inscricao-step">
            <h2 className="expedicao-inscricao-title">
              Informe seu username e verifique sua idade
            </h2>
            <p className="expedicao-inscricao-description">
              Precisamos do seu username do Roblox e verificação de idade para continuar.
            </p>

            <form className="expedicao-inscricao-form" onSubmit={handleAliasAndAgeSubmit}>
              <div className="expedicao-inscricao-field">
                <label htmlFor="robloxAlias" className="expedicao-inscricao-label">
                  @ no Roblox <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="robloxAlias"
                  name="robloxAlias"
                  value={formData.robloxAlias}
                  onChange={handleChangeAliasStep}
                  className={`expedicao-inscricao-input ${errors.robloxAlias ? 'error' : ''}`}
                  placeholder="Seu username do Roblox"
                  pattern="[a-zA-Z0-9_]{3,20}"
                  required
                  autoFocus
                />
                {errors.robloxAlias && <span className="expedicao-inscricao-error">{errors.robloxAlias}</span>}
                <small className="expedicao-inscricao-hint">
                  Use apenas letras, números e underscore (3-20 caracteres)
                </small>
              </div>

              <div className="expedicao-inscricao-field">
                <label className="expedicao-inscricao-checkbox-label">
                  <input
                    type="checkbox"
                    name="isPaiResponsavel"
                    checked={formData.isPaiResponsavel}
                    onChange={handleChangeAliasStep}
                    className="expedicao-inscricao-checkbox"
                  />
                  <span>Sou pai/mãe/responsável</span>
                </label>
              </div>

              <div className="expedicao-inscricao-field">
                <label className="expedicao-inscricao-checkbox-label">
                  <input
                    type="checkbox"
                    name="isEducador"
                    checked={formData.isEducador}
                    onChange={handleChangeAliasStep}
                    className="expedicao-inscricao-checkbox"
                  />
                  <span>Sou educador</span>
                </label>
              </div>

              {!formData.isPaiResponsavel && !formData.isEducador && (
                <div className="expedicao-inscricao-field">
                  <label className="expedicao-inscricao-label">
                    Verificação de Idade no Roblox <span className="required">*</span>
                  </label>
                  <div className="expedicao-inscricao-age-check">
                    {!formData.ageChecked ? (
                      <>
                        <p className="expedicao-inscricao-age-text">
                          É necessário verificar sua idade no Roblox. Clique no botão abaixo para abrir a página de verificação.
                        </p>
                        <button
                          type="button"
                          className="expedicao-inscricao-age-btn"
                          onClick={handleAgeCheck}
                        >
                          Verificar idade no Roblox
                        </button>
                      </>
                    ) : (
                      <div className="expedicao-inscricao-age-verified">
                        <span className="expedicao-inscricao-check-icon">✓</span>
                        <span>Idade verificada no Roblox</span>
                      </div>
                    )}
                  </div>
                  {errors.ageChecked && (
                    <span className="expedicao-inscricao-error">{errors.ageChecked}</span>
                  )}
                </div>
              )}

              <div className="expedicao-inscricao-submit-wrapper">
                <button 
                  type="submit" 
                  className="expedicao-inscricao-submit"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        ) : (
          // PASSO 3: Formulário completo de inscrição
          <div className="expedicao-inscricao-step">
            <h2 className="expedicao-inscricao-title">
              {title || 'Inscreva-se na Expedição Roblox'}
            </h2>
            {description && (
              <p className="expedicao-inscricao-description">
                {description}
              </p>
            )}

            <form className="expedicao-inscricao-form" onSubmit={handleSubmit}>
              <div className="expedicao-inscricao-field">
                <label htmlFor="nome" className="expedicao-inscricao-label">
                  Nome <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`expedicao-inscricao-input ${errors.nome ? 'error' : ''}`}
                  placeholder="Seu nome completo"
                  required
                />
                {errors.nome && <span className="expedicao-inscricao-error">{errors.nome}</span>}
              </div>

              <div className="expedicao-inscricao-field">
                <label htmlFor="email" className="expedicao-inscricao-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`expedicao-inscricao-input ${errors.email ? 'error' : ''}`}
                  placeholder="seu@email.com"
                  required
                />
                {errors.email && <span className="expedicao-inscricao-error">{errors.email}</span>}
              </div>

              <div className="expedicao-inscricao-field">
                <label htmlFor="robloxAlias" className="expedicao-inscricao-label">
                  Alias do Roblox (username) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="robloxAlias"
                  name="robloxAlias"
                  value={formData.robloxAlias}
                  onChange={handleChange}
                  className={`expedicao-inscricao-input ${errors.robloxAlias ? 'error' : ''}`}
                  placeholder="Seu username do Roblox"
                  pattern="[a-zA-Z0-9_]{3,20}"
                  required
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                />
                <small className="expedicao-inscricao-hint">
                  Já informado anteriormente
                </small>
              </div>

              {(tipoInscricao === 'jam' || tipoInscricao === 'estrada') && (
                <div className="expedicao-inscricao-field">
                  <label htmlFor="eventoId" className="expedicao-inscricao-label">
                    {tipoInscricao === 'jam' ? 'Selecione a Jam' : 'Selecione o evento'} <span className="required">*</span>
                  </label>
                  {eventoSelecionado && tipoInscricao === 'estrada' ? (
                    // Para Estrada, mostrar evento pré-selecionado (readonly)
                    <div className="expedicao-inscricao-evento-selecionado">
                      <div className="expedicao-inscricao-evento-info">
                        {eventoSelecionado.cidade && (
                          <p className="expedicao-inscricao-evento-cidade">
                            <strong>{eventoSelecionado.cidade}</strong>
                          </p>
                        )}
                        {eventoSelecionado.data && (
                          <p className="expedicao-inscricao-evento-data">{eventoSelecionado.data}</p>
                        )}
                        {eventoSelecionado.local && (
                          <p className="expedicao-inscricao-evento-local">{eventoSelecionado.local.nome}</p>
                        )}
                        {eventoSelecionado.sessaoNome && (
                          <p className="expedicao-inscricao-evento-sessao">
                            <strong>{eventoSelecionado.sessaoNome}</strong> - {eventoSelecionado.sessaoHorario}
                          </p>
                        )}
                      </div>
                      <input
                        type="hidden"
                        name="eventoId"
                        value={formData.eventoId}
                      />
                    </div>
                  ) : (
                    // Para Jam ou Estrada sem pré-seleção, mostrar select
                    <select
                      id="eventoId"
                      name="eventoId"
                      value={formData.eventoId}
                      onChange={handleChange}
                      className={`expedicao-inscricao-select ${errors.eventoId ? 'error' : ''}`}
                      required
                    >
                      <option value="">Selecione um evento</option>
                      {eventosDisponiveis && eventosDisponiveis.length > 0 ? (
                        eventosDisponiveis.map((evento) => (
                          <option key={evento.id} value={evento.id}>
                            {evento.cidade ? `${evento.cidade} - ${evento.data}` : evento.nome || evento.titulo || evento.id}
                            {evento.local?.nome && ` (${evento.local.nome})`}
                          </option>
                        ))
                      ) : tipoInscricao === 'jam' ? (
                        <option value="jam-2025-01">Roblox Creator Jam - Janeiro 2025</option>
                      ) : null}
                    </select>
                  )}
                  {errors.eventoId && <span className="expedicao-inscricao-error">{errors.eventoId}</span>}
                </div>
              )}

              <div className="expedicao-inscricao-field">
                <label className="expedicao-inscricao-checkbox-label">
                  <input
                    type="checkbox"
                    name="isPaiResponsavel"
                    checked={formData.isPaiResponsavel}
                    onChange={handleChange}
                    className="expedicao-inscricao-checkbox"
                    disabled
                  />
                  <span>Sou pai/mãe/responsável {formData.isPaiResponsavel ? '(já informado)' : ''}</span>
                </label>
              </div>

              <div className="expedicao-inscricao-field">
                <label className="expedicao-inscricao-checkbox-label">
                  <input
                    type="checkbox"
                    name="isEducador"
                    checked={formData.isEducador}
                    onChange={handleChange}
                    className="expedicao-inscricao-checkbox"
                    disabled
                  />
                  <span>Sou educador {formData.isEducador ? '(já informado)' : ''}</span>
                </label>
              </div>

              {!formData.isPaiResponsavel && !formData.isEducador && formData.ageChecked && (
                <div className="expedicao-inscricao-field">
                  <div className="expedicao-inscricao-age-verified">
                    <span className="expedicao-inscricao-check-icon">✓</span>
                    <span>Idade verificada no Roblox</span>
                  </div>
                </div>
              )}

              <div className="expedicao-inscricao-submit-wrapper">
                <button 
                  type="submit" 
                  className="expedicao-inscricao-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpedicaoInscricaoForm

