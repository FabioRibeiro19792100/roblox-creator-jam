import { useEffect, useState } from 'react'
import ExpedicaoInscricaoForm from './ExpedicaoInscricaoForm'

function EmailGatePopup({ onEmailSubmitted, onClose }) {
  const [hasExistingEmail, setHasExistingEmail] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Verificar se já tem email salvo (indicando que já se cadastrou)
    const savedEmail = localStorage.getItem('expedicao_email')
    if (savedEmail) {
      setHasExistingEmail(true)
    }
  }, [])

  const handleSuccess = (formData) => {
    // Formulário enviado com sucesso
    if (onEmailSubmitted) {
      onEmailSubmitted(formData.email)
    }
    setIsOpen(false)
    if (onClose) {
      onClose()
    }
  }

  return (
    <ExpedicaoInscricaoForm
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={handleSuccess}
      title={hasExistingEmail ? 'Área Especial para Membros' : 'Ainda não faz parte da Expedição?'}
      description={
        hasExistingEmail
          ? 'Você está entrando em uma área especial para membros da Expedição Roblox. Confirme seus dados para continuar.'
          : 'Faça seu cadastro para acessar nossa biblioteca completa de conteúdos.'
      }
    />
  )
}

export default EmailGatePopup

