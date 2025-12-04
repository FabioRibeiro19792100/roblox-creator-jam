import './HomeHeroSection.css'

function HomeHeroSection() {
  // Force reload by using timestamp in URL
  const imageUrl = `/images/4.webp?t=${new Date().getTime()}`

  return (
    <section id="home-hero" className="home-hero-section">
      <div className="home-hero-container">
        <div className="home-hero-header">
          <span className="home-hero-expedicao-roblox">EXPEDIÇÃO ROBLOX</span>
        </div>
        <h1 className="home-hero-title">
          <span className="title-line-1" data-animate-id="home-hero-title-1">Criar é</span>
          <span className="title-line-2" data-animate-id="home-hero-title-2">o novo jogar</span>
        </h1>
        <div className="home-hero-description">
          <p className="home-hero-description-paragraph">
            Ao longo de 2026, 10 mil jovens vão sair do 'só jogar' pra publicar seus próprios mundos no Roblox.
          </p>
          <p className="home-hero-description-paragraph">
            Passo a passo, do primeiro clique no Studio até ver amigos jogando algo que você criou.
          </p>
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
