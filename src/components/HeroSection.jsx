import { useSiteConfig } from '../config/useSiteConfig'
import './HeroSection.css'

function HeroSection() {
  const config = useSiteConfig()
  const imageUrl = `/images/6.webp?t=${new Date().getTime()}`

  return (
    <section id="hero" className="hero-section" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-title">
            <h1 className="title-roblox">{config?.jam?.hero?.titleRoblox || 'Roblox'}</h1>
            <h2 className="title-creator-jam">{config?.jam?.hero?.titleCreatorJam || 'Creator Jam'}</h2>
          </div>

          <div className="hero-description">
            <p>
              {config?.jam?.hero?.description || 'A Creator Jam é um desafio de criação rápida, no qual os participantes têm um tempo curto para desenvolver uma ideia jogável a partir de um tema e seguindo regras definidas.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection