import { useSiteConfig } from '../config/useSiteConfig'
import './ExpedicaoNaEstradaContentSection.css'

function ExpedicaoNaEstradaHeroSection() {
  const config = useSiteConfig()
  const expedicaoNaEstrada = config?.expedicaoNaEstrada || {}
  const content = expedicaoNaEstrada?.content || {}
  const logoUrl = `/images/hero-logo.png`

  return (
    <section id="expedicao-na-estrada-content" className="expedicao-na-estrada-content-section expedicao-na-estrada-hero-only">
      <div className="expedicao-na-estrada-content-container">
        {/* Top Section: Title and Description */}
        <div className="expedicao-na-estrada-content-header">
          <div className="expedicao-na-estrada-content-title-section">
            <div className="expedicao-na-estrada-content-col-1">
              <div className="expedicao-na-estrada-hero-header">
                <span className="expedicao-na-estrada-hero-expedicao-roblox">
                  {config?.hero?.home?.label || 'EXPEDIÇÃO ROBLOX'}
                </span>
                <img 
                  src={logoUrl} 
                  alt="Logo Expedição Roblox" 
                  className="expedicao-na-estrada-hero-logo"
                />
              </div>
              <div className="expedicao-na-estrada-content-title-wrapper">
                <h1 className="expedicao-na-estrada-content-title-line-1">{content?.title?.line1 || expedicaoNaEstrada?.hero?.title?.line1 || 'Expedição'}</h1>
                <h1 className="expedicao-na-estrada-content-title-line-2">{content?.title?.line2 || expedicaoNaEstrada?.hero?.title?.line2 || 'Roblox'}</h1>
                <h2 className="expedicao-na-estrada-content-title-line-3">{content?.title?.line3 || expedicaoNaEstrada?.hero?.title?.line3 || 'na Estrada'}</h2>
              </div>
              <div className="expedicao-na-estrada-content-intro">
                <p className="expedicao-na-estrada-content-description">
                  {content?.description || 'Nas capitais, o projeto abre sua programação com encontros que combinam criação no Roblox, participação das famílias e introdução aos quatro formatos que compõem a experiência.'}
                </p>
              </div>
            </div>
            <div className="expedicao-na-estrada-content-image">
              <img src="/images/1.webp" alt="Expedição Roblox na Estrada" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpedicaoNaEstradaHeroSection