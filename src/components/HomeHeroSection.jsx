import { useState, useEffect } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import './HomeHeroSection.css'

function HomeHeroSection() {
  const config = useSiteConfig()
  const imageUrl = `/images/hero.png`
  const logoUrl = `/images/logo.png`
  const siteHorizontalPadding = 'var(--site-horizontal-padding, 1.5rem)'
  const heroHorizontalPadding = 'var(--hero-horizontal-padding, 2rem)'
  const heroVerticalPadding = 'var(--hero-vertical-padding, var(--hero-horizontal-padding, 2rem))'

  // Estados para dimensões dinâmicas
  const [paddingTop, setPaddingTop] = useState('108px') // Fallback inicial

  useEffect(() => {
    const updateDimensions = () => {
      const hero = document.getElementById('home-hero')
      const header = document.querySelector('.header-nav')
      const eventos = document.querySelector('.proximos-eventos-section')
      
      if (hero) {
        // Calcula a posição do topo do hero em relação ao documento
        const rect = hero.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const heroTopPosition = rect.top + scrollTop
        
        // Detecta altura do header e eventos para compensar
        const headerHeight = header ? header.offsetHeight : 0
        const eventosHeight = eventos ? eventos.offsetHeight : 0
        const totalTopOffset = headerHeight + eventosHeight

        // Calcula padding necessário
        // Adicionando um "respiro" extra de segurança (ex: 24px) para não colar no topo
        // const safetyMargin = 24
        // const extraPadding = Math.max(0, totalTopOffset - heroTopPosition) + safetyMargin
        
        // Pega o padding-inline calculado do elemento
        const computedStyle = window.getComputedStyle(hero)
        const paddingSideValue = parseFloat(computedStyle.paddingLeft) || 0
        
        // Padding total fixo + lateral para alinhar visualmente
        // Ignoramos a posição de scroll para layout estático, usamos header height como base
        const totalPaddingTop = headerHeight + paddingSideValue
        
        setPaddingTop(`${totalPaddingTop}px`)
      }
    }

    // Executa inicialmente
    updateDimensions()
    
    // Executa no resize
    window.addEventListener('resize', updateDimensions)
    
    // Polling inicial para garantir estabilidade do layout (corrige race conditions de sticky/fonts)
    // Verifica a cada 50ms durante os primeiros 2 segundos
    const intervalId = setInterval(updateDimensions, 50)
    const timeoutId = setTimeout(() => clearInterval(intervalId), 2000)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [])

  // Efeito de Scale-to-fit removido para evitar problemas de bounding box
  // A adaptação agora é feita puramente via CSS (media queries)
  
  const sectionStyle = {
    // Altura controlada pelo CSS (100vh/100dvh)
    marginTop: 0
  }

  const handleCadastrarRoblox = () => {
    window.open('https://www.roblox.com/', '_blank')
  }

  return (
    <section
      id="home-hero"
      className="home-hero-section"
      style={{ 
        ...sectionStyle, 
        paddingTop: paddingTop,
        paddingBottom: heroVerticalPadding,
        paddingInline: siteHorizontalPadding,
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.1) 100%), url(${imageUrl})`
      }}
      data-prevent-overlap="true"
      data-testid="home-hero-section"
      role="region"
      aria-label="Hero principal"
    >
      <div className="home-hero-container">
        <div className="home-hero-inner">
          <div className="home-hero-content">
            <div className="home-hero-header">
              <span className="home-hero-expedicao-roblox">
                {config?.hero?.home?.label || 'EXPEDIÇÃO ROBLOX'}
              </span>
              <img 
                src={logoUrl} 
                alt="Logo Expedição Roblox" 
                className="home-hero-logo"
                data-animate-id="hero-logo"
              />
            </div>
            <h1 className="home-hero-title" data-align="content" data-animate-id="hero-title">
              <span className="title-line-1">{config?.hero?.home?.title?.line1 || 'Criar é'}</span>
              <br className="mobile-only" />
              <span className="title-line-2">{config?.hero?.home?.title?.line2 || 'o novo jogar'}</span>
            </h1>
            <div className="home-hero-description" data-animate-id="hero-description">
              <p className="home-hero-description-paragraph">
                {config?.hero?.home?.description?.[0] || "Ao longo de 2026, 10 mil jovens vão sair do 'só jogar' pra publicar seus próprios mundos no Roblox."}
              </p>
              <p className="home-hero-description-paragraph">
                {config?.hero?.home?.description?.[1] || 'Passo a passo, do primeiro clique no Studio até ver amigos jogando algo que você criou.'}
              </p>
              <div className="home-hero-cta">
                <button 
                  className="home-hero-roblox-button"
                  onClick={handleCadastrarRoblox}
                >
                  Crie sua conta no Roblox
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection