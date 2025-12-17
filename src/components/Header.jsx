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
  const [isMoreOpen, setIsMoreOpen] = useState(false) // Novo estado para o menu "Mais"
  const navigationContext = useContext(NavigationContext)
  const fallbackCurrentPage = useMemo(() => getFallbackCurrentPage(), [])
  const navigateTo = navigationContext?.navigateTo ?? noopNavigate
  const currentPage = navigationContext?.currentPage ?? fallbackCurrentPage

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev
      if (!next) {
        setIsMissoesOpen(false)
        setIsMoreOpen(false)
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
    setIsMoreOpen(false)
  }

  const handleNavClick = (page, e) => {
    e.preventDefault()
    navigateTo(page)
    // Force scroll to top when navigating to a new page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
    setIsMenuOpen(false)
    setIsMoreOpen(false)
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
    setIsMoreOpen(false)
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
    setIsMoreOpen(false)
  }

  const isHomePage = currentPage === 'home' || (!currentPage && window.location.hash !== '#jam' && window.location.hash !== '#biblioteca' && window.location.hash !== '#expedicao-na-estrada')
  const isBibliotecaPage = currentPage === 'biblioteca' || window.location.hash === '#biblioteca'
  const isExpedicaoNaEstradaPage = currentPage === 'expedicao-na-estrada' || window.location.hash === '#expedicao-na-estrada'
  const { openContactModal } = useContext(ContactModalContext) || { openContactModal: () => {} }
  const { openInscricaoModal } = useContext(InscricaoModalContext) || { openInscricaoModal: () => {} }
  const hasHeaderAnimated =
    typeof window !== 'undefined' ? Boolean(window[HEADER_ANIMATION_FLAG]) : false
  const isFirstHeaderInstanceRef = useRef(!hasHeaderAnimated)
  const isMobileViewport = useMediaQuery(MOBILE_QUERY)
  const isLaptop = useMediaQuery('(min-width: 768px) and (max-width: 1280px)')

  useEffect(() => {
    setIsMenuOpen(false)
    setIsMissoesOpen(false)
    setIsMoreOpen(false)
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

  const handleExpedicaoNaEstradaScroll = (id, e) => {
    e.preventDefault()
    scrollToSection(id)
  }

  const renderNavLinks = () => {
    // Usando config da Main para gerar links dinamicamente
    if (isHomePage) {
      let items = config?.menu?.home?.items || []
      
      // Filtrar "Contato" da lista do JSON se ele já for renderizado hardcoded abaixo
      // O código original tinha um link "Contato" hardcoded no final. 
      // Se quisermos manter o hardcoded, removemos do JSON para evitar duplicação.
      items = items.filter(item => item.label !== 'Contato')

      let visibleItems = items
      let hiddenItems = []

      // Lógica de Prioridade para Laptop/Tablet
      if (isLaptop) {
        const MAX_VISIBLE = 3 // Mostra os 3 primeiros, esconde o resto
        visibleItems = items.slice(0, MAX_VISIBLE)
        hiddenItems = items.slice(MAX_VISIBLE)
      }

      return (
        <>
          {visibleItems.map((item, index) => {
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

          {/* Menu "Mais" para itens escondidos */}
          {hiddenItems.length > 0 && (
            <li 
              className="nav-item-with-dropdown"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={(e) => {
                const relatedTarget = e.relatedTarget
                if (!relatedTarget || (!e.currentTarget.contains(relatedTarget))) {
                  setIsMoreOpen(false)
                }
              }}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMoreOpen(!isMoreOpen)
                }}
              >
                Mais ▾
              </a>
              <ul
                className={`nav-dropdown ${isMoreOpen ? 'nav-dropdown-open' : ''}`}
              >
                {hiddenItems.map((item, index) => (
                  <li key={`more-${index}`}>
                    {item.isLink ? (
                      <a href={item.link === 'home' ? '/' : `#${item.link}`} onClick={(e) => {
                        e.preventDefault()
                        if (item.link === 'home') {
                          scrollToTop(e)
                        } else {
                          handleNavClick(item.link, e)
                        }
                        setIsMoreOpen(false)
                      }}>
                        {item.label}
                      </a>
                    ) : (
                      <a href={item.anchor || '#'} onClick={(e) => {
                        if (item.anchor) {
                          handleHomeScroll(item.anchor.replace('#', ''), e)
                        }
                        setIsMoreOpen(false)
                      }}>
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          )}
          
          {/* Item Missoes Fixo/Hardcoded ou via Config? A main tem Missoes hardcoded no final da lista home */}
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

          <li>
            <a href="#footer-container-wrapper" onClick={(e) => handleHomeScroll('footer-container-wrapper', e)}>
              Contato
            </a>
          </li>

          {config?.menu?.home?.cta && (
            <li className="header-nav-cta-item">
              <button
                type="button"
                className="header-cta-button"
                onClick={(e) => {
                  e.preventDefault()
                  openInscricaoModal()
                }}
              >
                <span className="header-cta-inner">
                  <span className="header-cta-label" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                     {config.menu.home.cta.line1 && <span style={{ fontSize: '0.8em', opacity: 0.9 }}>{config.menu.home.cta.line1}</span>}
                     <span>{config.menu.home.cta.line2 || 'Desce pro play.'}</span>
                  </span>
                </span>
              </button>
            </li>
          )}
        </>
      )
    }

    if (isBibliotecaPage) {
      return (
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
      )
    }

    if (isExpedicaoNaEstradaPage) {
       // A main tem config para jam mas não vi para expedicao-na-estrada explicitamente no diff, vou manter hardcoded da HEAD ou adaptar
       // O diff da main tinha: {config?.menu?.jam?.items?.map...} mas estava num bloco else que parecia ser genérico.
       // Vou manter o hardcoded da HEAD para Expedição na Estrada pois parece seguro e específico.
      return (
        <>
          <li>
            <a href="/" onClick={(e) => handleNavClick('home', e)}>
              Início
            </a>
          </li>
          <li>
            <a href="#expedicao-na-estrada-content" onClick={(e) => handleExpedicaoNaEstradaScroll('expedicao-na-estrada-content', e)}>
              Atividades
            </a>
          </li>
          <li>
            <a href="#eventos-na-estrada" onClick={(e) => handleExpedicaoNaEstradaScroll('eventos-na-estrada', e)}>
              Eventos
            </a>
          </li>
          <li>
            <a href="#footer-container-wrapper" onClick={(e) => handleExpedicaoNaEstradaScroll('footer-container-wrapper', e)}>
              Contato
            </a>
          </li>
        </>
      )
    }

    // Default / Jam Page (que usa config.menu.jam na main)
    let jamItems = config?.menu?.jam?.items || []
    let visibleJamItems = jamItems
    let hiddenJamItems = []

    if (isLaptop) {
      const MAX_VISIBLE = 3
      visibleJamItems = jamItems.slice(0, MAX_VISIBLE)
      hiddenJamItems = jamItems.slice(MAX_VISIBLE)
    }

    return (
      <>
        {visibleJamItems.map((item, index) => {
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

        {/* Menu "Mais" para itens escondidos na Jam */}
        {hiddenJamItems.length > 0 && (
            <li 
              className="nav-item-with-dropdown"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={(e) => {
                const relatedTarget = e.relatedTarget
                if (!relatedTarget || (!e.currentTarget.contains(relatedTarget))) {
                  setIsMoreOpen(false)
                }
              }}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMoreOpen(!isMoreOpen)
                }}
              >
                Mais ▾
              </a>
              <ul
                className={`nav-dropdown ${isMoreOpen ? 'nav-dropdown-open' : ''}`}
              >
                {hiddenJamItems.map((item, index) => (
                  <li key={`more-jam-${index}`}>
                    {item.isLink ? (
                      <a href={item.link === 'home' ? '/' : `#${item.link}`} onClick={(e) => {
                        e.preventDefault()
                        if (item.link === 'home') {
                            handleNavClick('home', e)
                        } else {
                            handleNavClick(item.link, e)
                        }
                        setIsMoreOpen(false)
                      }}>
                        {item.label}
                      </a>
                    ) : (
                      <a href={item.anchor || '#'} onClick={(e) => {
                        e.preventDefault()
                        if (item.anchor) {
                           scrollToSection(item.anchor.replace('#', ''))
                        }
                        setIsMoreOpen(false)
                      }}>
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </li>
        )}
        
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
        <div className="logo" onClick={(e) => handleNavClick('home', e)}>
          <span className="logo-roblox">Roblox</span>
          <span className="logo-creator-jam">Creator Jam</span>
        </div>

        <nav
          id="header-mobile-nav"
          className={`nav ${isMobileViewport ? 'nav-mobile' : 'nav-desktop'}${isMobileViewport && isMenuOpen ? ' nav-open' : ''}`}
          aria-label="Menu principal"
          aria-hidden={isMobileViewport ? !isMenuOpen : false}
        >
          <ul className="nav-list">{renderNavLinks()}</ul>
        </nav>
        <span id="missoes" className="sr-only" aria-hidden="true">
          Missões
        </span>

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
