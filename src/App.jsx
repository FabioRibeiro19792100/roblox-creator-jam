import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Jam from './pages/Jam'
import Biblioteca from './pages/Biblioteca'
import ExpedicaoNaEstrada from './pages/ExpedicaoNaEstrada'
import Admin from './pages/Admin'
import ContactModal from './components/ContactModal'
import MaterialModal from './components/MaterialModal'
import InscricaoModal from './components/InscricaoModal'
import { DebugKit } from './components/utilitarios/DebugKit'
import { BoundingBoxKit } from './components/utilitarios/BoundingBoxKit'
import { CoordinateGridKit } from './components/utilitarios/CoordinateGridKit'
import AnimatorDemo from './components/utilitarios/AnimatorDemo'
import AutoAnimatorObserver from './components/utilitarios/AutoAnimatorObserver'
import ScrollRevealController from './components/utilitarios/ScrollRevealController'
import IntroController from './components/utilitarios/IntroController'
import './components/utilitarios/AnimationBase.css'
import './App.css'

const normalizeHash = (hash = '') => {
  if (!hash) return ''
  return hash.startsWith('#/') ? `#${hash.slice(2)}` : hash
}

export const resolvePageFromHash = (hashValue = '') => {
  const hash = normalizeHash(hashValue)
  if (hash === '#admin') return 'admin'
  if (hash === '#jam') return 'jam'
  if (hash.startsWith('#biblioteca')) return 'biblioteca'
  if (hash === '#expedicao-na-estrada') return 'expedicao-na-estrada'
  return 'home'
}

// Contexto para compartilhar estado de navegação
export const NavigationContext = React.createContext()
// Contexto para compartilhar estado do modal de contato
export const ContactModalContext = React.createContext()
// Contexto para compartilhar estado do modal de material
export const MaterialModalContext = React.createContext()
// Contexto para compartilhar estado do modal de inscrição
export const InscricaoModalContext = React.createContext()

function App() {
  const [currentPage, setCurrentPage] = useState(() => resolvePageFromHash(window.location.hash))

  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false)
  const [materialModalType, setMaterialModalType] = useState('download')
  const [isInscricaoModalOpen, setIsInscricaoModalOpen] = useState(false)
  const [showRobloxCadastro, setShowRobloxCadastro] = useState(false)

  useEffect(() => {
    // Escuta mudanças no hash
    const handleHashChange = () => {
      const newHash = window.location.hash
      setCurrentPage(resolvePageFromHash(newHash))
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

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

  const openInscricaoModal = () => {
    setIsInscricaoModalOpen(true)
  }

  const closeInscricaoModal = () => {
    setIsInscricaoModalOpen(false)
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
      <AutoAnimatorObserver>
        <ContactModalContext.Provider value={{ openContactModal }}>
        <MaterialModalContext.Provider value={{ openMaterialModal }}>
        <InscricaoModalContext.Provider value={{ openInscricaoModal }}>
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
          <DebugKit />
          <BoundingBoxKit />
          <CoordinateGridKit />
          {/* <AnimatorDemo /> */}
          <InscricaoModal
            isOpen={isInscricaoModalOpen}
            onClose={closeInscricaoModal}
            tipoInscricao="geral"
          />
          <IntroController key={currentPage} />
          <ScrollRevealController />
        </InscricaoModalContext.Provider>
        </MaterialModalContext.Provider>
        </ContactModalContext.Provider>
      </AutoAnimatorObserver>
    </NavigationContext.Provider>
  )
}

export default App
