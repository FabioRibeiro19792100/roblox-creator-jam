import BubbleButton from './utilitarios/BubbleButton'
import './HeroSection.css'

function HeroSection() {
  const config = useSiteConfig()
  const { openContactModal } = useContext(ContactModalContext) || { openContactModal: () => {} }
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = document.querySelector('.header-nav')?.offsetHeight || 60
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

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

          <div className="hero-cta">
            <BubbleButton 
              onClick={openContactModal}
              color="#222" /* Fundo escuro padrão */
              style={{ '--button-action-color': '#0099ff' }} /* Azul vibrante no hover */
            >
              Inscreva-se
            </BubbleButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

