import { useSiteConfig } from '../config/useSiteConfig'
import './HomeHeroSection.css'

// ⚠️ Manter sempre essa distância para que o hero jamais suba por cima do header ou da barra de eventos.
export const HERO_TOP_SPACING = 'calc(var(--header-height, 60px) + var(--events-height, 48px))'

function HomeHeroSection() {
  const config = useSiteConfig()
  const imageUrl = `/images/build-masp.png`
  const logoUrl = `/images/logo.png`
  const siteHorizontalPadding = 'var(--site-horizontal-padding, 1.5rem)'
  const heroHorizontalPadding = 'var(--hero-horizontal-padding, 2rem)'
  const heroVerticalPadding = 'var(--hero-vertical-padding, var(--hero-horizontal-padding, 2rem))'
  const sectionStyle = {
    marginBottom: heroVerticalPadding,
    paddingTop: HERO_TOP_SPACING,
    paddingBottom: heroVerticalPadding,
    paddingInline: siteHorizontalPadding,
    minHeight: 'var(--hero-min-height, 70vh)',
    overflow: 'visible',
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    zIndex: 'var(--layer-hero, 0)'
  }
  const innerStyle = {
    width: '100%',
    maxWidth: '1200px',
    marginInline: 'auto',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat'
  }
  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 'clamp(0.4rem, 0.85vw, 1rem)'
  }
  const descriptionStyle = {
    paddingInlineEnd: heroHorizontalPadding,
    paddingBottom: heroVerticalPadding,
    marginBottom: heroVerticalPadding
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
      <img
        src={logoUrl}
        alt="Logo"
        style={{
          position: 'fixed',
          top: '180px',
          left: '50px',
          width: '100px',
          height: '100px',
          objectFit: 'contain',
          zIndex: 99999
        }}
      />
      <div className="home-hero-inner" style={innerStyle}>
        <div className="home-hero-content" style={contentStyle}>
          <h1 className="home-hero-title" style={{ marginBottom: heroVerticalPadding }} data-align="content">
            <span className="title-line-1">{config?.hero?.home?.title?.line1 || 'Criar é'}</span>
            <span className="title-line-2">{config?.hero?.home?.title?.line2 || 'o novo jogar'}</span>
          </h1>
          <div className="home-hero-description" style={descriptionStyle}>
            <p className="home-hero-description-paragraph">
              {config?.hero?.home?.description?.[0] || "Ao longo de 2026, 10 mil jovens vão sair do 'só jogar' pra publicar seus próprios mundos no Roblox."}
            </p>
            <p className="home-hero-description-paragraph">
              {config?.hero?.home?.description?.[1] || 'Passo a passo, do primeiro clique no Studio até ver amigos jogando algo que você criou.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection
