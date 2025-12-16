import { useState, useContext, useEffect, useRef, useMemo } from 'react'
import { NavigationContext, ContactModalContext, InscricaoModalContext, resolvePageFromHash } from '../App'
import { scrollToElementById, scrollWindowTo, updateHash } from '../utils/scrollHelpers'
import { useSiteConfig } from '../config/useSiteConfig'
import useMediaQuery from '../hooks/useMediaQuery'
import './Header.css'

const HAMBURGER_COLOR = '#fff'
const HEADER_ANIMATION_FLAG = '__headerHasAnimatedOnce__'
const MOBILE_QUERY = '(max-width: 767px)'
const CTA_WRAPPER_PADDING_X = '1rem'

const noopNavigate = () => {}

const getFallbackCurrentPage = () => {
  if (typeof window === 'undefined') return 'home'
  return resolvePageFromHash(window.location.hash)
}

function Header() {
  const config = useSiteConfig()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMissoesOpen, setIsMissoesOpen] = useState(false)
  const navigationContext = useContext(NavigationContext)
  const fallbackCurrentPage = useMemo(() => getFallbackCurrentPage(), [])
  const navigateTo = navigationContext?.navigateTo ?? noopNavigate
  const currentPage = navigationContext?.currentPage ?? fallbackCurrentPage

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev
      if (!next) {
        setIsMissoesOpen(false)
      }
      return next
    })
  }

  const scrollToSection = (id) => {
    if (typeof document === 'undefined') {
      return
    }

    const headerHeight = document.querySelector('.header-nav')?.offsetHeight || 60
    const proximosEventosSection = document.querySelector('.proximos-eventos-section')
    // Na página Biblioteca não há seção de próximos eventos
    const isBibliotecaHash =
      typeof window !== 'undefined' &&
      (currentPage === 'biblioteca' || window.location.hash === '#biblioteca')
    const proximosEventosHeight =
      (!isBibliotecaHash &&
        proximosEventosSection &&
        !proximosEventosSection.classList.contains('hidden')) ?
        proximosEventosSection.offsetHeight :
        0
    const extraOffset = -20 // Espaço de um dedo abaixo do início da layer
    const totalOffset = headerHeight + proximosEventosHeight + extraOffset

    scrollToElementById(id, {
      offset: totalOffset,
      behavior: 'smooth'
    })
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
        scrollWindowTo({ top: 0, behavior: 'smooth' })
      }, 100)
    } else {
      scrollWindowTo({ top: 0, behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const isHomePage = currentPage === 'home' || (!currentPage && window.location.hash !== '#jam' && window.location.hash !== '#biblioteca' && window.location.hash !== '#expedicao-na-estrada')
  const isBibliotecaPage = currentPage === 'biblioteca' || window.location.hash === '#biblioteca'
  const { openContactModal } = useContext(ContactModalContext) || { openContactModal: () => {} }
  const { openInscricaoModal } = useContext(InscricaoModalContext) || { openInscricaoModal: () => {} }
  const hasHeaderAnimated =
    typeof window !== 'undefined' ? Boolean(window[HEADER_ANIMATION_FLAG]) : false
  const isFirstHeaderInstanceRef = useRef(!hasHeaderAnimated)
  const isMobileViewport = useMediaQuery(MOBILE_QUERY)

  useEffect(() => {
    setIsMenuOpen(false)
    setIsMissoesOpen(false)
  }, [currentPage])

  useEffect(() => {
    if (!isMobileViewport) {
      setIsMenuOpen(false)
    }
  }, [isMobileViewport])

  useEffect(() => {
    if (!hasHeaderAnimated && typeof window !== 'undefined') {
      window[HEADER_ANIMATION_FLAG] = true
    }
  }, [hasHeaderAnimated])

  const handleBibliotecaScroll = (id, e) => {
    e.preventDefault()
    updateHash(`#${id}`, { replace: true })
    scrollToSection(id)
  }

  const renderNavLinks = () => {
    if (isHomePage) {
      return (
        <>
          <li>
            <a href="#home-hero" onClick={scrollToTop}>
              Início
            </a>
          </li>
          <li>
            <a href="#expedicao-roblox" onClick={(e) => handleHomeScroll('expedicao-roblox', e)}>
              A Expedição
            </a>
          </li>
          <li
            className="nav-item-with-dropdown"
            onMouseEnter={() => setIsMissoesOpen(true)}
            onMouseLeave={() => setIsMissoesOpen(false)}
          >
            <a
              href="#trilhas"
              onClick={(e) => {
                e.preventDefault()
                setIsMissoesOpen(!isMissoesOpen)
              }}
            >
              Trilhas
            </a>
            <ul
              className={`nav-dropdown ${isMissoesOpen ? 'nav-dropdown-open' : ''}`}
              onMouseEnter={() => setIsMissoesOpen(true)}
              onMouseLeave={() => setIsMissoesOpen(false)}
            >
              <li>
                <a href="#biblioteca" onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('biblioteca', e)
                  setIsMissoesOpen(false)
                }}>
                  Aprendizado
                </a>
              </li>
              <li>
                <a href="#jam" onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('jam', e)
                  setIsMissoesOpen(false)
                }}>
                  Prática
                </a>
              </li>
              <li>
                <a href="#expedicao-na-estrada" onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('expedicao-na-estrada', e)
                  setIsMissoesOpen(false)
                }}>
                  Vivência
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#footer-container-wrapper" onClick={(e) => handleHomeScroll('footer-container-wrapper', e)}>
              Contato
            </a>
          </li>
        </>
      )
    }

    if (isBibliotecaPage) {
      return (
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
      )
    }

    const navItems = (
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
            href="#trilhas"
            onClick={(e) => {
              e.preventDefault()
              setIsMissoesOpen(!isMissoesOpen)
            }}
          >
            Trilhas
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
                Aprendizado
              </a>
            </li>
            <li>
              <a href="#jam" onClick={(e) => {
                e.preventDefault()
                handleNavClick('jam', e)
                setIsMissoesOpen(false)
              }}>
                Prática
              </a>
            </li>
            <li>
              <a href="#expedicao-na-estrada" onClick={(e) => {
                e.preventDefault()
                handleNavClick('expedicao-na-estrada', e)
                setIsMissoesOpen(false)
              }}>
                Vivência
              </a>
            </li>
          </ul>
        </li>
      </>
    )

    return navItems
  }

  return (
    <header className="header-nav">
      <div
        className="header-container"
        data-animate-id="header-nav"
        style={
          !isFirstHeaderInstanceRef.current && hasHeaderAnimated
            ? { opacity: 1 }
            : undefined
        }
      >
        <nav
          id="header-mobile-nav"
          className={`nav ${isMobileViewport ? 'nav-mobile' : 'nav-desktop'}${isMobileViewport && isMenuOpen ? ' nav-open' : ''}`}
          aria-label="Menu principal"
          aria-hidden={isMobileViewport ? !isMenuOpen : false}
        >
          <ul className="nav-list">{renderNavLinks()}</ul>
        </nav>

        {isHomePage && (
          <div
            className="header-cta-wrapper"
            style={{ paddingLeft: CTA_WRAPPER_PADDING_X, paddingRight: CTA_WRAPPER_PADDING_X }}
          >
            <button
              type="button"
              className="header-cta-button"
              onClick={(e) => {
                e.preventDefault()
                openInscricaoModal()
              }}
            >
              <span className="header-cta-inner">
                <span className="header-cta-label">Quer criar? Desce pro play.</span>
              </span>
            </button>
          </div>
        )}

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="header-mobile-nav"
          style={{ '--hamburger-line-color': HAMBURGER_COLOR }}
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
