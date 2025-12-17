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
  const [heroDimensions, setHeroDimensions] = useState({
    minHeight: 'calc(100vh - 108px)', // Fallback inicial
    paddingTop: '108px' // Fallback inicial
  })

  useEffect(() => {
    const updateDimensions = () => {
      const hero = document.getElementById('home-hero')
      const header = document.querySelector('.header-nav')
      const eventos = document.querySelector('.proximos-eventos-section')
      
      if (hero) {
        // Calcula a posição do topo do hero em relação ao documento
        // Isso considera automaticamente header fixo, barra de eventos, margins, etc.
        const rect = hero.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const heroTopPosition = rect.top + scrollTop
        
        // Detecta altura do header para compensar sobreposição
        const headerHeight = header ? header.offsetHeight : 0
        const eventosHeight = eventos ? eventos.offsetHeight : 0
        const totalTopOffset = headerHeight + eventosHeight

        // Calcula padding necessário para o conteúdo não ficar atrás do header e eventos
        // Se o hero começa antes do fim do header+eventos (ex: Y=0 vs Offset=108), adiciona padding
        const extraPadding = Math.max(0, totalTopOffset - heroTopPosition)
        
        // Se estivermos no topo (ou próximo), calculamos o espaço restante
        // Para garantir que funcione mesmo se recarregado com scroll, usamos heroTopPosition
        // assumindo que no design o hero deve preencher o resto da "primeira tela".
        
        // Porém, se o usuário quer que Nav + Eventos + Hero = 100vh SEMPRE que scroll=0:
        // Hero Height = 100vh - (Altura de tudo antes do Hero)
        
        const availableHeight = window.innerHeight - heroTopPosition
        
        // Segurança: minHeight não deve ser negativo
        const safeHeight = Math.max(availableHeight, 400)

        // Pega o padding-inline calculado do elemento para usar como referência
        const computedStyle = window.getComputedStyle(hero)
        // padding-left geralmente corresponde ao padding-inline-start em LTR
        const paddingSideValue = parseFloat(computedStyle.paddingLeft) || 0
        
        // Adicionamos o padding lateral ao padding top base (que compensa o header)
        // Isso cria um espaçamento vertical visualmente consistente com o horizontal
        const totalPaddingTop = extraPadding + paddingSideValue
        
        setHeroDimensions({
          minHeight: `${safeHeight}px`,
          paddingTop: `${totalPaddingTop}px`
        })
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

  // Efeito de Scale-to-fit para garantir visibilidade sem scroll
  useEffect(() => {
    const adjustScale = () => {
      const hero = document.getElementById('home-hero')
      const content = hero?.querySelector('.home-hero-content')
      
      if (!hero || !content) return
      
      // 1. Reseta para medir natural
      content.style.transform = 'none'
      
      // 2. Mede altura disponível
      const viewportHeight = window.innerHeight
      // Pega a altura do header + eventos dinamicamente
      const header = document.querySelector('.header-nav')
      const eventos = document.querySelector('.proximos-eventos-section')
      const topOffset = (header?.offsetHeight || 60) + (eventos?.offsetHeight || 48)
      const bottomPadding = 32 // 2rem de segurança
      
      const availableHeight = viewportHeight - topOffset - bottomPadding
      const contentHeight = content.scrollHeight
      
      // 3. Aplica escala se necessário
      if (contentHeight > availableHeight) {
        const scale = availableHeight / contentHeight
        const safeScale = Math.max(scale, 0.70)
        
        content.style.transformOrigin = 'center left'
        content.style.transform = `scale(${safeScale})`
      }
    }

    const timeoutId = setTimeout(adjustScale, 250)
    window.addEventListener('resize', adjustScale)
    
    return () => {
      window.removeEventListener('resize', adjustScale)
      clearTimeout(timeoutId)
    }
  }, [])

  const sectionStyle = {
    marginBottom: 0, /* Margem removida para colar na próxima seção se necessário, ou controlada pelo minHeight */
    paddingTop: heroDimensions.paddingTop,
    paddingBottom: heroVerticalPadding,
    paddingInline: siteHorizontalPadding,
    minHeight: heroDimensions.minHeight, /* Altura dinâmica exata */
    overflow: 'hidden', /* Alterado para hidden para evitar vazar se scale falhar por pouco */
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    zIndex: 'var(--layer-hero, 0)',
    backgroundColor: '#000',
    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.1) 100%), url(${imageUrl})`,
    backgroundSize: 'cover', /* Garante cobertura total */
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    marginTop: 0 /* Garante gap zero acima */
  }

  const handleCadastrarRoblox = () => {
    // Abrir página de cadastro do Roblox em nova aba
    window.open('https://www.roblox.com/signup', '_blank')
  }

  return (
    <section
      id="home-hero"
      className="home-hero-section"
      style={sectionStyle}
      data-prevent-overlap="true"
      data-testid="home-hero-section"
      role="region"
      aria-label="Hero principal"
    >
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
            {config?.hero?.home?.title?.full || 'Criar é o novo jogar'}
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
    </section>
  )
}

export default HomeHeroSection
