import './QuerCriarTitleSection.css'

function QuerCriarTitleSection() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="quer-criar-title" className="quer-criar-title-section">
      <div className="quer-criar-title-container">
        <h2 className="quer-criar-title-title">
          <span className="quer-criar-title-line-1">Quer criar</span>
          <span className="quer-criar-title-line-2">com a gente?</span>
        </h2>
        <a 
          href="#expedicao-roblox" 
          className="quer-criar-title-subtitle"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('expedicao-roblox')
          }}
        >
          Desce pro play.
        </a>
      </div>
    </section>
  )
}

export default QuerCriarTitleSection

