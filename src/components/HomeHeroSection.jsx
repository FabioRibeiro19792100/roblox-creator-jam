import { useState, useEffect, useContext } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import { InscricaoModalContext } from '../App'
import HeroTitle from './HeroTitle'
import './HomeHeroSection.css'

function HomeHeroSection() {
  const config = useSiteConfig()
  const { openInscricaoModal } = useContext(InscricaoModalContext) || { openInscricaoModal: () => {} }
  const imageUrl = `/images/hero.png`
  const logoUrl = `/images/hero-logo.png`
  const siteHorizontalPadding = 'var(--site-horizontal-padding, 1.5rem)'
  const heroHorizontalPadding = 'var(--hero-horizontal-padding, 2rem)'
  const heroVerticalPadding = 'var(--hero-vertical-padding, var(--hero-horizontal-padding, 2rem))'

  // Estados para dimensões dinâmicas
  const [paddingTop, setPaddingTop] = useState('108px') // Fallback inicial
  const [logoScale, setLogoScale] = useState(1) // Escala do logo (1 = 100%, 0.5 = 50%)
  const [contentTranslateY, setContentTranslateY] = useState(0) // Translação do conteúdo para cima

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

  // Efeito para animação de scroll
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('home-hero')
      if (!hero) return

      const rect = hero.getBoundingClientRect()
      const heroHeight = hero.offsetHeight || window.innerHeight
      const windowHeight = window.innerHeight
      
      // Calcula o progresso do scroll dentro da seção hero
      // Quando a seção está totalmente visível: rect.top = 0, scrollProgress = 0
      // Quando a seção sai da tela: rect.top = -heroHeight, scrollProgress = 1
      const scrollProgress = Math.max(0, Math.min(1, (-rect.top) / heroHeight))
      
      // Logo reduz de 100% até 50% (0.5)
      // scrollProgress vai de 0 (topo) até 1 (fim da seção)
      const newLogoScale = 1 - (scrollProgress * 0.5) // De 1.0 até 0.5
      setLogoScale(Math.max(0.5, Math.min(1, newLogoScale)))
      
      // Conteúdo sobe progressivamente (até -80px no máximo para não subir demais)
      const maxTranslateY = -80
      const newTranslateY = scrollProgress * maxTranslateY
      setContentTranslateY(Math.max(maxTranslateY, Math.min(0, newTranslateY)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll() // Executa inicialmente

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Efeito de Scale-to-fit removido para evitar problemas de bounding box
  // A adaptação agora é feita puramente via CSS (media queries)
  
  const sectionStyle = {
    // Altura controlada pelo CSS (100vh/100dvh)
    marginTop: 0
  }

  const handleCadastrarRoblox = () => {
    // Abre o modal de inscrição
    openInscricaoModal()
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
        <div className="home-hero-inner" style={{ paddingTop: '0' }}>
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
                style={{ 
                  transform: `scale(${logoScale})`,
                  transformOrigin: 'top left',
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>
            <div 
              style={{
                transform: `translateY(${contentTranslateY}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
            <HeroTitle 
              line1={config?.hero?.home?.title?.line1} 
              line2={config?.hero?.home?.title?.line2} 
            />
            <div className="home-hero-description" data-animate-id="hero-description">
              <p className="home-hero-description-paragraph">
                {config?.hero?.home?.description?.[0] || "Ao longo de 2026, 10 mil jovens vão transformar sua paixão por jogar em criação, publicando seus próprios jogos no Roblox."}
              </p>
              <div className="home-hero-cta">
                <button 
                  className="home-hero-roblox-button"
                  onClick={handleCadastrarRoblox}
                >
                  Quero saber mais
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection