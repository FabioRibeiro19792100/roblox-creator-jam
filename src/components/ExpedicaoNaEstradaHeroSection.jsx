import { useContext } from 'react'
import { ContactModalContext } from '../App'
import { useSiteConfig } from '../config/useSiteConfig'
import './ExpedicaoNaEstradaHeroSection.css'

function ExpedicaoNaEstradaHeroSection() {
  const config = useSiteConfig()
  const { openContactModal } = useContext(ContactModalContext) || { openContactModal: () => {} }
  
  const expedicaoNaEstrada = config?.expedicaoNaEstrada || {}
  const hero = expedicaoNaEstrada?.hero || {}
  
  const imageUrl = hero?.image || `/images/5.webp`

  return (
    <section id="expedicao-na-estrada-hero" className="expedicao-na-estrada-hero-section" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="expedicao-na-estrada-hero-container">
        <div className="expedicao-na-estrada-hero-content">
          <div className="expedicao-na-estrada-hero-title">
            <h1 className="expedicao-na-estrada-title-line-1">{hero?.title?.line1 || 'Expedição'}</h1>
            <h1 className="expedicao-na-estrada-title-line-2">{hero?.title?.line2 || 'Roblox'}</h1>
            <h2 className="expedicao-na-estrada-title-line-3">{hero?.title?.line3 || 'na Estrada'}</h2>
          </div>

          <div className="expedicao-na-estrada-hero-description">
            <p>
              {hero?.description || 'Nesses encontros vamos reunir pais, responsáveis e jovens criativos para construir ambientes que ampliem a noção de segurança digital e que sejam divertidos e significativos como experiência de aprendizado.'}
            </p>
          </div>

          <div className="expedicao-na-estrada-hero-cta">
            <button 
              className="expedicao-na-estrada-cta-button"
              onClick={openContactModal}
            >
              {hero?.ctaText || 'Quero saber mais'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpedicaoNaEstradaHeroSection

