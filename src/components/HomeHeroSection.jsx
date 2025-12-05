import './HomeHeroSection.css'

function HomeHeroSection() {
  // Force reload by using timestamp in URL
  const imageUrl = `/images/4.webp?t=${new Date().getTime()}`

  return (
    <section id="home-hero" className="home-hero-section">
      <div className="home-hero-container">
        <div className="home-hero-header">
          <span className="home-hero-expedicao-roblox" data-animate-id="hero-expedicao">EXPEDIÇÃO ROBLOX</span>
        </div>
        <h1 className="home-hero-title">
          <div className="title-line-wrapper">
            <span className="title-word" data-animate-id="word-criar">Criar</span>
            <span className="title-word" data-animate-id="word-e">&nbsp;é</span>
          </div>
          <div className="title-line-wrapper">
            <span className="title-word" data-animate-id="word-o">o</span>
            <span className="title-word" data-animate-id="word-novo">&nbsp;novo</span>
            <span className="title-word" data-animate-id="word-jogar">&nbsp;jogar</span>
          </div>
        </h1>
        <div className="home-hero-description" data-animate-id="hero-description">
          <p className="home-hero-description-paragraph">
            Ao longo de 2026, 10 mil jovens vão sair do 'só jogar' pra publicar seus próprios mundos no Roblox.
          </p>
          <p className="home-hero-description-paragraph">
            Passo a passo, do primeiro clique no Studio até ver amigos jogando algo que você criou.
          </p>
        </div>
      </div>
      <div className="home-hero-image-layer" data-animate-id="hero-image">
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
