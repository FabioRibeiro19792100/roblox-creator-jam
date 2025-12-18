import React, { useState, useEffect } from 'react'
import { setSiteLanguage } from '../../config/useSiteConfig'
import './LanguageToggle.css'

function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState('pt')

  useEffect(() => {
    // Ler estado inicial
    const saved = localStorage.getItem('siteLanguage') || 'pt'
    setCurrentLang(saved)

    // Polling para sincronizar se mudar em outro lugar
    const interval = setInterval(() => {
      const stored = localStorage.getItem('siteLanguage') || 'pt'
      if (stored !== currentLang) {
        setCurrentLang(stored)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [currentLang])

  const toggleLanguage = () => {
    const newLang = currentLang === 'pt' ? 'en' : 'pt'
    setSiteLanguage(newLang)
    setCurrentLang(newLang)
  }

  return (
    <button 
      className="language-toggle" 
      onClick={toggleLanguage}
      aria-label="Toggle Language"
    >
      <span className={currentLang === 'pt' ? 'active' : ''}>PT</span>
      {' | '}
      <span className={currentLang === 'en' ? 'active' : ''}>EN</span>
    </button>
  )
}

export default LanguageToggle

