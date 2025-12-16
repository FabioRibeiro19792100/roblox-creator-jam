import { useState, useEffect } from 'react'
import './RobloxCadastroPopup.css'

function RobloxCadastroPopup({ onClose, onCadastroConfirmado }) {
  const [jaCadastrado, setJaCadastrado] = useState(false)

  useEffect(() => {
    // Verificar se já marcou que se cadastrou no Roblox
    const cadastradoRoblox = localStorage.getItem('roblox_cadastrado')
    if (cadastradoRoblox === 'true') {
      setJaCadastrado(true)
      // Se já cadastrou, não mostra o popup
      if (onClose) onClose()
    }
  }, [onClose])

  const handleCadastrarRoblox = () => {
    // Abrir página de cadastro do Roblox em nova aba
    window.open('https://www.roblox.com/signup', '_blank')
  }

  const handleJaTenhoConta = () => {
    // Marcar que já tem conta no Roblox
    localStorage.setItem('roblox_cadastrado', 'true')
    setJaCadastrado(true)
    if (onCadastroConfirmado) {
      onCadastroConfirmado()
    }
    if (onClose) {
      onClose()
    }
  }

  const handleFechar = () => {
    // Fechar sem marcar como cadastrado (pode aparecer novamente)
    if (onClose) {
      onClose()
    }
  }

  if (jaCadastrado) {
    return null
  }

  return (
    <div className="roblox-cadastro-overlay" onClick={handleFechar}>
      <div className="roblox-cadastro-popup" onClick={(e) => e.stopPropagation()}>
        <button 
          className="roblox-cadastro-close"
          onClick={handleFechar}
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="roblox-cadastro-content">
          <h2 className="roblox-cadastro-title">
            Cadastre-se no Roblox
          </h2>
          <p className="roblox-cadastro-description">
            Para participar da Expedição Roblox, você precisa ter uma conta no Roblox.
            <br />
            <br />
            Clique no botão abaixo para criar sua conta gratuitamente. O cadastro abre em uma nova aba, então você não perderá esta página!
          </p>
          
          <div className="roblox-cadastro-buttons">
            <button 
              className="roblox-cadastro-btn-primary"
              onClick={handleCadastrarRoblox}
            >
              Criar conta no Roblox
            </button>
            
            <button 
              className="roblox-cadastro-btn-secondary"
              onClick={handleJaTenhoConta}
            >
              Já tenho conta no Roblox
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RobloxCadastroPopup




