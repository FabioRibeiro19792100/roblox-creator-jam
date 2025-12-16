import { useSiteConfig } from '../config/useSiteConfig'
import './EscolhaTemaSection.css'

function EscolhaTemaSection() {
  const config = useSiteConfig()
  const temas = config.jam?.escolhaTema?.temas || []
  const intro = config.jam?.escolhaTema?.intro || []

  return (
    <section id="escolha-tema" className="escolha-tema-section">
      <div className="escolha-tema-container">
        <h2 className="escolha-tema-title">
          {config.jam?.escolhaTema?.title || 'Qual vai ser\no tema da Jam?'}
        </h2>
        
        <div className="escolha-tema-content">
          <div className="escolha-tema-intro">
            {intro.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>

          <div className="temas-grid">
            {temas.map((item, index) => (
              <div key={index} className="tema-card">
                <h3 className="tema-nome">{item.tema}</h3>
                <p className="tema-descricao">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EscolhaTemaSection

