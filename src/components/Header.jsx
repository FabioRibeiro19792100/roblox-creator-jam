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
      } else if (page === 'biblioteca') {
        window.location.hash = '#biblioteca'
        window.location.reload()
      } else {
        window.location.hash = ''
        window.location.reload()
      }
    },
    currentPage: window.location.hash === '#jam' ? 'jam' : window.location.hash === '#biblioteca' ? 'biblioteca' : 'home'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = document.querySelector('.header-nav')?.offsetHeight || 60
      const proximosEventosSection = document.querySelector('.proximos-eventos-section')
      // Na página Biblioteca não há seção de próximos eventos
      const isBibliotecaPage = currentPage === 'biblioteca' || window.location.hash === '#biblioteca'
      const proximosEventosHeight = (!isBibliotecaPage && proximosEventosSection && !proximosEventosSection.classList.contains('hidden')) 
        ? proximosEventosSection.offsetHeight 
        : 0
      const extraOffset = -20 // Espaço de um dedo abaixo do início da layer
      const totalOffset = headerHeight + proximosEventosHeight + extraOffset
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - totalOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
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

  const isHomePage = currentPage === 'home' || (!currentPage && window.location.hash !== '#jam' && window.location.hash !== '#biblioteca')
  const isBibliotecaPage = currentPage === 'biblioteca' || window.location.hash === '#biblioteca'
  const { openContactModal } = useContext(ContactModalContext) || { openContactModal: () => {} }

  const handleBibliotecaScroll = (id, e) => {
    e.preventDefault()
    scrollToSection(id)
  }

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
                  <a href="#biblioteca" onClick={(e) => handleNavClick('biblioteca', e)}>
                    Biblioteca
                  </a>
                </li>
                <li>
                  <a href="#footer-container-wrapper" onClick={(e) => handleHomeScroll('footer-container-wrapper', e)}>
                    Contato
                  </a>
                </li>
              </>
            ) : isBibliotecaPage ? (
              <>
                <li>
                  <a href="/" onClick={(e) => handleNavClick('home', e)}>
                    Início
                  </a>
                </li>
                <li>
                  <a href="#biblioteca-tutorial" onClick={(e) => handleBibliotecaScroll('biblioteca-tutorial', e)}>
                    Tutorial Roblox Studios
                  </a>
                </li>
                <li>
                  <a href="#biblioteca-mochilao" onClick={(e) => handleBibliotecaScroll('biblioteca-mochilao', e)}>
                    Mochilão
                  </a>
                </li>
                <li>
                  <a href="#biblioteca-acampamento" onClick={(e) => handleBibliotecaScroll('biblioteca-acampamento', e)}>
                    Acampamento
                  </a>
                </li>
                <li>
                  <a href="#biblioteca-sobrevivencia" onClick={(e) => handleBibliotecaScroll('biblioteca-sobrevivencia', e)}>
                    Sobrevivência
                  </a>
                </li>
                <li>
                  <a href="#footer-container-wrapper" onClick={(e) => handleBibliotecaScroll('footer-container-wrapper', e)}>
                    Central da Expedição
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

