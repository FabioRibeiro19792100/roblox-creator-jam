import './HeroSection.css'

function HeroSection() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero-section">
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

