import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Jam from './pages/Jam'
import Biblioteca from './pages/Biblioteca'
import ExpedicaoNaEstrada from './pages/ExpedicaoNaEstrada'
import Admin from './pages/Admin'
import ContactModal from './components/ContactModal'
import MaterialModal from './components/MaterialModal'
import RobloxCadastroPopup from './components/RobloxCadastroPopup'
import './App.css'

// Contexto para compartilhar estado de navegação
export const NavigationContext = React.createContext()
// Contexto para compartilhar estado do modal de contato
export const ContactModalContext = React.createContext()
// Contexto para compartilhar estado do modal de material
export const MaterialModalContext = React.createContext()

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Verifica hash inicial
    const hash = window.location.hash
    if (hash === '#admin' || hash === '#/admin') return 'admin'
    if (hash === '#jam' || hash === '#/jam') return 'jam'
    if (hash === '#biblioteca' || hash === '#/biblioteca') return 'biblioteca'
    if (hash === '#expedicao-na-estrada' || hash === '#/expedicao-na-estrada') return 'expedicao-na-estrada'
    return 'home'
  })

  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false)
  const [materialModalType, setMaterialModalType] = useState('download')
  const [showRobloxCadastro, setShowRobloxCadastro] = useState(false)

  useEffect(() => {
    // Escuta mudanças no hash
    const handleHashChange = () => {
      const newHash = window.location.hash
      if (newHash === '#admin' || newHash === '#/admin') {
        setCurrentPage('admin')
      } else if (newHash === '#jam' || newHash === '#/jam') {
        setCurrentPage('jam')
      } else if (newHash === '#biblioteca' || newHash === '#/biblioteca') {
        setCurrentPage('biblioteca')
      } else if (newHash === '#expedicao-na-estrada' || newHash === '#/expedicao-na-estrada') {
        setCurrentPage('expedicao-na-estrada')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    // Verificar se já viu o popup hoje ou se já se cadastrou
    const cadastradoRoblox = localStorage.getItem('roblox_cadastrado')
    const popupVistoHoje = localStorage.getItem('roblox_popup_visto')
    const hoje = new Date().toDateString()
    
    // Se não cadastrou e não viu o popup hoje, mostrar
    if (cadastradoRoblox !== 'true' && popupVistoHoje !== hoje) {
      // Pequeno delay para melhor UX
      setTimeout(() => {
        setShowRobloxCadastro(true)
      }, 1000)
    }
  }, [])

  const handleRobloxCadastroClose = () => {
    // Marcar que viu o popup hoje
    localStorage.setItem('roblox_popup_visto', new Date().toDateString())
    setShowRobloxCadastro(false)
  }

  const handleRobloxCadastroConfirmado = () => {
    setShowRobloxCadastro(false)
  }

  const navigateTo = (page) => {
    if (page === 'jam') {
      window.location.hash = '#jam'
      setCurrentPage('jam')
    } else if (page === 'biblioteca') {
      window.location.hash = '#biblioteca'
      setCurrentPage('biblioteca')
    } else if (page === 'expedicao-na-estrada') {
      window.location.hash = '#expedicao-na-estrada'
      setCurrentPage('expedicao-na-estrada')
    } else {
      window.location.hash = ''
      setCurrentPage('home')
    }
  }

  const openContactModal = () => {
    setIsContactModalOpen(true)
  }

  const closeContactModal = () => {
    setIsContactModalOpen(false)
  }

  const openMaterialModal = (type) => {
    setMaterialModalType(type)
    setIsMaterialModalOpen(true)
  }

  const closeMaterialModal = () => {
    setIsMaterialModalOpen(false)
  }

  const handleMaterialSuccess = (formData) => {
    // Aqui você pode enviar os dados para um backend
    console.log('Dados coletados:', formData)
    
    if (materialModalType === 'download') {
      // Criar link de download do PDF
      const link = document.createElement('a')
      link.href = '/material.pdf' // Substitua pelo caminho real do PDF
      link.download = 'material-roblox.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else if (materialModalType === 'video') {
      // Abrir vídeo (pode ser um modal de vídeo ou redirecionar)
      window.open('https://www.youtube.com/watch?v=VIDEO_ID', '_blank') // Substitua pela URL do vídeo
    }
  }

  // Renderizar Admin sem modais
  if (currentPage === 'admin') {
    return <Admin />
  }

  return (
    <NavigationContext.Provider value={{ navigateTo, currentPage }}>
      <ContactModalContext.Provider value={{ openContactModal }}>
        <MaterialModalContext.Provider value={{ openMaterialModal }}>
          {currentPage === 'jam' ? <Jam /> : currentPage === 'biblioteca' ? <Biblioteca /> : currentPage === 'expedicao-na-estrada' ? <ExpedicaoNaEstrada /> : <Home />}
          <ContactModal 
            isOpen={isContactModalOpen} 
            onClose={closeContactModal}
            tipoInscricao={currentPage === 'jam' ? 'jam' : currentPage === 'expedicao-na-estrada' ? 'estrada' : null}
          />
          <MaterialModal 
            isOpen={isMaterialModalOpen} 
            onClose={closeMaterialModal}
            type={materialModalType}
            onSuccess={handleMaterialSuccess}
          />
          {showRobloxCadastro && (
            <RobloxCadastroPopup 
              onClose={handleRobloxCadastroClose}
              onCadastroConfirmado={handleRobloxCadastroConfirmado}
            />
          )}
        </MaterialModalContext.Provider>
      </ContactModalContext.Provider>
    </NavigationContext.Provider>
  )
}

export default App
