import { useSiteConfig } from '../config/useSiteConfig'
import './HomeHeroSection.css'

function HomeHeroSection() {
  const config = useSiteConfig()
  // Use static image URL - browser will cache it properly
  const imageUrl = `/images/4.webp`

  const handleCadastrarRoblox = () => {
    // Abrir página de cadastro do Roblox em nova aba
    window.open('https://www.roblox.com/signup', '_blank')
  }

  return (
    <section id="home-hero" className="home-hero-section">
      <div className="home-hero-container">
        <div className="home-hero-header">
          <span className="home-hero-expedicao-roblox">{config?.hero?.home?.label || 'EXPEDIÇÃO ROBLOX'}</span>
        </div>
        <h1 className="home-hero-title">
          <span className="title-line-1">{config?.hero?.home?.title?.line1 || 'Criar é'}</span>
          <span className="title-line-2">{config?.hero?.home?.title?.line2 || 'o novo jogar'}</span>
        </h1>
        <div className="home-hero-description">
          <p className="home-hero-description-paragraph">
            {config?.hero?.home?.description?.[0] || "Ao longo de 2026, 10 mil jovens vão sair do 'só jogar' pra publicar seus próprios mundos no Roblox."}
          </p>
          <p className="home-hero-description-paragraph">
            {config?.hero?.home?.description?.[1] || 'Passo a passo, do primeiro clique no Studio até ver amigos jogando algo que você criou.'}
          </p>
        </div>
        <div className="home-hero-cta">
          <button 
            className="home-hero-roblox-button"
            onClick={handleCadastrarRoblox}
          >
            Crie sua conta no Roblox
          </button>
        </div>
      </div>
      <div className="home-hero-image-layer">
        <img 
          src={imageUrl}
          alt="Roblox Studio" 
          className="home-hero-image"
        />
      </div>
    </section>
  )
}

export default HomeHeroSection
