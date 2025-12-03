import { useState, useContext } from 'react'
import { NavigationContext, ContactModalContext } from '../App'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { navigateTo, currentPage } = useContext(NavigationContext) || { 
    navigateTo: (page) => {
      if (page === 'jam') {
        window.location.hash = '#jam'
        window.location.reload()
      } else {
        window.location.hash = ''
        window.location.reload()
      }
    },
    currentPage: window.location.hash === '#jam' ? 'jam' : 'home'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleNavClick = (page, e) => {
    e.preventDefault()
    navigateTo(page)
    setIsMenuOpen(false)
  }

  const handleHomeScroll = (id, e) => {
    e.preventDefault()
    if (currentPage !== 'home') {
      navigateTo('home')
      setTimeout(() => {
        scrollToSection(id)
      }, 100)
    } else {
      scrollToSection(id)
    }
  }

  const scrollToTop = (e) => {
    e.preventDefault()
    if (currentPage !== 'home') {
      navigateTo('home')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const isHomePage = currentPage === 'home' || (!currentPage && window.location.hash !== '#jam')
  const { openContactModal } = useContext(ContactModalContext) || { openContactModal: () => {} }

  return (
    <header className="header-nav">
      <div className="header-container">
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {isHomePage ? (
              <>
                <li>
                  <a href="#home-hero" onClick={scrollToTop}>
                    Início
                  </a>
                </li>
                <li>
                  <a href="#placeholder" onClick={(e) => handleHomeScroll('placeholder', e)}>
                    Manifesto
                  </a>
                </li>
                <li>
                  <a href="#expedicao-roblox" onClick={(e) => handleHomeScroll('expedicao-roblox', e)}>
                    A Expedição
                  </a>
                </li>
                <li>
                  <a href="#o-que-e-roblox-studio" onClick={(e) => handleHomeScroll('o-que-e-roblox-studio', e)}>
                    Studios
                  </a>
                </li>
                <li>
                  <a href="#footer" onClick={(e) => handleHomeScroll('footer', e)}>
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#jam" onClick={(e) => handleNavClick('jam', e)}>
                    Creator Jam
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/" onClick={(e) => handleNavClick('home', e)}>
                    Início
                  </a>
                </li>
                <li>
                  <a href="#como-participar" onClick={(e) => { e.preventDefault(); scrollToSection('como-participar') }}>
                    Como Participar
                  </a>
                </li>
                <li>
                  <a href="#escolha-tema" onClick={(e) => { e.preventDefault(); scrollToSection('escolha-tema') }}>
                    Temas
                  </a>
                </li>
                <li>
                  <a href="#desafio-jam" onClick={(e) => { e.preventDefault(); scrollToSection('desafio-jam') }}>
                    Desafio
                  </a>
                </li>
                <li>
                  <a href="#regras-jam" onClick={(e) => { e.preventDefault(); scrollToSection('regras-jam') }}>
                    Regras
                  </a>
                </li>
                <li>
                  <a href="#entrega-desafio" onClick={(e) => { e.preventDefault(); scrollToSection('entrega-desafio') }}>
                    Entrega
                  </a>
                </li>
                <li>
                  <a href="#premiacao" onClick={(e) => { e.preventDefault(); scrollToSection('premiacao') }}>
                    Premiação
                  </a>
                </li>
                <li>
                  <a href="#datas-canais" onClick={(e) => { e.preventDefault(); scrollToSection('datas-canais') }}>
                    Datas e Canais
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>

        {isHomePage && (
          <div className="header-cta-wrapper">
            <div className="header-cta-button">
              <span className="header-cta-line-1">Quer criar?</span>
              <a 
                href="#expedicao-roblox" 
                className="header-cta-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('expedicao-roblox')
                }}
              >
                Desce pro play.
              </a>
            </div>
          </div>
        )}

        <button 
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  )
}

export default Header

