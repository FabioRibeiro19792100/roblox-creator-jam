import './HeroSection.css'

function HeroSection() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Debug: verificar se vídeo carregou
  const handleVideoLoad = () => {
    console.log('Vídeo carregado com sucesso!')
  }

  const handleVideoError = (e) => {
    console.error('Erro ao carregar vídeo:', e)
    console.log('Tentando carregar de:', '/videos/1.mp4')
  }

  return (
    <section id="hero" className="hero-section">
      {/* Vídeo de background */}
      <div className="hero-video-wrapper">
        <video 
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src="/videos/1.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
        {/* Overlay escuro para contraste */}
        <div className="hero-video-overlay"></div>
      </div>

      {/* Conteúdo na frente */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-title">
            <h1 className="title-roblox">Roblox</h1>
            <h2 className="title-creator-jam">Creator Jam</h2>
          </div>

          <div className="hero-description">
            <p>
              A Creator Jam é um desafio de criação rápida, no qual os participantes<br />têm um tempo curto para desenvolver uma ideia jogável a partir<br />de um tema e seguindo regras definidas.
            </p>
          </div>

          <div className="hero-cta">
            <button 
              className="cta-button"
              onClick={() => scrollToSection('como-participar')}
            >
              Inscreva-se
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

