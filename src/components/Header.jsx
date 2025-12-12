import { useState, useContext } from 'react'
import { NavigationContext, ContactModalContext } from '../App'
import { useSiteConfig } from '../config/useSiteConfig'
import './Header.css'

function Header() {
  const config = useSiteConfig()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMissoesOpen, setIsMissoesOpen] = useState(false)
  const { navigateTo, currentPage } = useContext(NavigationContext) || { 
    navigateTo: (page) => {
      if (page === 'jam') {
        window.location.hash = '#jam'
        window.location.reload()
      } else if (page === 'biblioteca') {
        window.location.hash = '#biblioteca'
        window.location.reload()
      } else if (page === 'expedicao-na-estrada') {
        window.location.hash = '#expedicao-na-estrada'
        window.location.reload()
      } else {
        window.location.hash = ''
        window.location.reload()
      }
    },
    currentPage: window.location.hash === '#jam' ? 'jam' : window.location.hash === '#biblioteca' ? 'biblioteca' : window.location.hash === '#expedicao-na-estrada' ? 'expedicao-na-estrada' : 'home'
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

  const isHomePage = currentPage === 'home' || (!currentPage && window.location.hash !== '#jam' && window.location.hash !== '#biblioteca' && window.location.hash !== '#expedicao-na-estrada')
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
                {config?.menu?.home?.items?.map((item, index) => {
                  if (item.isLink) {
                    return (
                      <li key={index}>
                        <a href={item.link === 'home' ? '/' : `#${item.link}`} onClick={(e) => {
                          e.preventDefault()
                          if (item.link === 'home') {
                            scrollToTop(e)
                          } else {
                            handleNavClick(item.link, e)
                          }
                        }}>
                          {item.label}
                        </a>
                      </li>
                    )
                  }
                  return (
                    <li key={index}>
                      <a href={item.anchor || '#'} onClick={(e) => {
                        if (item.anchor) {
                          handleHomeScroll(item.anchor.replace('#', ''), e)
                        }
                      }}>
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </>
            ) : isBibliotecaPage ? (
              <>
                {config?.menu?.biblioteca?.items?.map((item, index) => {
                  if (item.isLink) {
                    return (
                      <li key={index}>
                        <a href={item.link === 'home' ? '/' : `#${item.link}`} onClick={(e) => {
                          e.preventDefault()
                          if (item.link === 'home') {
                            handleNavClick('home', e)
                          } else {
                            handleNavClick(item.link, e)
                          }
                        }}>
                          {item.label}
                        </a>
                      </li>
                    )
                  }
                  return (
                    <li key={index}>
                      <a href={item.anchor || '#'} onClick={(e) => {
                        if (item.anchor) {
                          handleBibliotecaScroll(item.anchor.replace('#', ''), e)
                        }
                      }}>
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </>
            ) : (
              <>
                {config?.menu?.jam?.items?.map((item, index) => {
                  if (item.isLink) {
                    return (
                      <li key={index}>
                        <a href={item.link === 'home' ? '/' : `#${item.link}`} onClick={(e) => {
                          e.preventDefault()
                          if (item.link === 'home') {
                            handleNavClick('home', e)
                          } else {
                            handleNavClick(item.link, e)
                          }
                        }}>
                          {item.label}
                        </a>
                      </li>
                    )
                  }
                  return (
                    <li key={index}>
                      <a href={item.anchor || '#'} onClick={(e) => {
                        e.preventDefault()
                        if (item.anchor) {
                          scrollToSection(item.anchor.replace('#', ''))
                        }
                      }}>
                        {item.label}
                      </a>
                    </li>
                  )
                })}
                <li 
                  className="nav-item-with-dropdown"
                  onMouseEnter={() => setIsMissoesOpen(true)}
                  onMouseLeave={(e) => {
                    const relatedTarget = e.relatedTarget
                    if (!relatedTarget || (!e.currentTarget.contains(relatedTarget))) {
                      setIsMissoesOpen(false)
                    }
                  }}
                >
                  <a 
                    href="#missoes" 
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMissoesOpen(!isMissoesOpen)
                    }}
                  >
                    Missões
                  </a>
                  <ul 
                    className={`nav-dropdown ${isMissoesOpen ? 'nav-dropdown-open' : ''}`}
                  >
                    <li>
                      <a href="#biblioteca" onClick={(e) => {
                        e.preventDefault()
                        handleNavClick('biblioteca', e)
                        setIsMissoesOpen(false)
                      }}>
                        Trilhas de conteúdo
                      </a>
                    </li>
                    <li>
                      <a href="#jam" onClick={(e) => {
                        e.preventDefault()
                        handleNavClick('jam', e)
                        setIsMissoesOpen(false)
                      }}>
                        Jam
                      </a>
                    </li>
                    <li>
                      <a href="#expedicao-na-estrada" onClick={(e) => {
                        e.preventDefault()
                        handleNavClick('expedicao-na-estrada', e)
                        setIsMissoesOpen(false)
                      }}>
                        Estrada
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>

        {isHomePage && config?.menu?.home?.cta && (
          <div className="header-cta-wrapper">
            <div className="header-cta-button">
              <span className="header-cta-line-1">{config.menu.home.cta.line1 || 'Quer criar?'}</span>
              <a 
                href={config.menu.home.cta.anchor || '#expedicao-roblox'} 
                className="header-cta-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection((config.menu.home.cta.anchor || '#expedicao-roblox').replace('#', ''))
                }}
              >
                {config.menu.home.cta.line2 || 'Desce pro play.'}
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

