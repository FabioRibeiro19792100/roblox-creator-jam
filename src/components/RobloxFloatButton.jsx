import { useState, useEffect } from 'react'
import './RobloxCadastroPopup.css'

function RobloxFloatButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar se já se cadastrou no Roblox
    const cadastradoRoblox = localStorage.getItem('roblox_cadastrado')
    // Só mostrar se não cadastrou
    if (cadastradoRoblox !== 'true') {
      setIsVisible(true)
    }
  }, [])

  const handleCadastrarRoblox = () => {
    // Abrir página de cadastro do Roblox em nova aba
    window.open('https://www.roblox.com/signup', '_blank')
  }

  if (!isVisible) {
    return null
  }

  return (
    <button 
      className="roblox-float-button"
      onClick={handleCadastrarRoblox}
      aria-label="Criar conta no Roblox"
    >
      Crie sua conta no Roblox
    </button>
  )
}

export default RobloxFloatButton

