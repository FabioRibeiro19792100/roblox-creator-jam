import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Jam from './pages/Jam'
import ContactModal from './components/ContactModal'
import MaterialModal from './components/MaterialModal'
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
    return (hash === '#jam' || hash === '#/jam') ? 'jam' : 'home'
  })

  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false)
  const [materialModalType, setMaterialModalType] = useState('download')

  useEffect(() => {
    // Escuta mudanças no hash
    const handleHashChange = () => {
      const newHash = window.location.hash
      if (newHash === '#jam' || newHash === '#/jam') {
        setCurrentPage('jam')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (page) => {
    if (page === 'jam') {
      window.location.hash = '#jam'
      setCurrentPage('jam')
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

  return (
    <NavigationContext.Provider value={{ navigateTo, currentPage }}>
      <ContactModalContext.Provider value={{ openContactModal }}>
        <MaterialModalContext.Provider value={{ openMaterialModal }}>
          {currentPage === 'jam' ? <Jam /> : <Home />}
          <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
          <MaterialModal 
            isOpen={isMaterialModalOpen} 
            onClose={closeMaterialModal}
            type={materialModalType}
            onSuccess={handleMaterialSuccess}
          />
        </MaterialModalContext.Provider>
      </ContactModalContext.Provider>
    </NavigationContext.Provider>
  )
}

export default App
