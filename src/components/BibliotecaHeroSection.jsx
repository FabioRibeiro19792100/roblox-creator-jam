import { useSiteConfig } from '../config/useSiteConfig'
import './BibliotecaHeroSection.css'

function BibliotecaHeroSection() {
  const config = useSiteConfig()
  // Force reload by using timestamp in URL
  const imageUrl = `/images/2.webp?t=${new Date().getTime()}`
  const logoUrl = `/images/hero-logo.png`

  return (
    <section id="biblioteca-hero" className="biblioteca-hero-section">
      <div className="biblioteca-hero-container">
        <div className="biblioteca-hero-header">
          <span className="biblioteca-hero-expedicao-roblox">{config?.hero?.biblioteca?.label || 'EXPEDIÇÃO ROBLOX'}</span>
          <img 
            src={logoUrl} 
            alt="Logo Expedição Roblox" 
            className="biblioteca-hero-logo"
          />
        </div>
        <h1 className="biblioteca-hero-title">
          <span className="biblioteca-title-line-1">{config?.hero?.biblioteca?.title?.line1 || 'Conteúdos da'}</span>
          <span className="biblioteca-title-line-2">{config?.hero?.biblioteca?.title?.line2 || 'expedição'}</span>
        </h1>
        <div className="biblioteca-hero-description">
          {config?.hero?.biblioteca?.description?.map((text, index) => (
            <p key={index} className="biblioteca-hero-description-paragraph">
              {text}
            </p>
          ))}
        </div>
      </div>
      <div className="biblioteca-hero-image-layer">
        <img 
          src={imageUrl}
          alt="Roblox Studio" 
          className="biblioteca-hero-image"
        />
      </div>
    </section>
  )
}

export default BibliotecaHeroSection

