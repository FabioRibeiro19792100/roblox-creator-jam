import './BibliotecaHeroSection.css'

function BibliotecaHeroSection() {
  // Force reload by using timestamp in URL
  const imageUrl = `/images/2.webp?t=${new Date().getTime()}`

  return (
    <section id="biblioteca-hero" className="biblioteca-hero-section">
      <div className="biblioteca-hero-container">
        <div className="biblioteca-hero-header">
          <span className="biblioteca-hero-expedicao-roblox">EXPEDIÇÃO ROBLOX</span>
        </div>
        <h1 className="biblioteca-hero-title">
          <span className="biblioteca-title-line-1">Conteúdos da</span>
          <span className="biblioteca-title-line-2">expedição</span>
        </h1>
        <div className="biblioteca-hero-description">
          <p className="biblioteca-hero-description-paragraph">
            Explore nossa biblioteca completa de materiais educativos, tutoriais e recursos para aprender Roblox Studio do zero.
          </p>
          <p className="biblioteca-hero-description-paragraph">
            Acesse conteúdos organizados por trilhas e desenvolva suas habilidades passo a passo.
          </p>
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

