import { useSiteConfig } from '../config/useSiteConfig'
import './PremiacaoSection.css'

function PremiacaoSection() {
  const config = useSiteConfig()
  const premiacoes = config.jam?.premiacao?.premiacoes || []

  return (
    <section id="premiacao" className="premiacao-section">
      <div className="premiacao-container">
        <h2 className="premiacao-title">
          {config.jam?.premiacao?.title || 'Premiação'}
        </h2>

        <div className="premiacao-content">
          <div className="premiacoes-list">
            {premiacoes.map((item, index) => (
              <div key={index} className="premiacao-item">
                <div className="premiacao-left">
                  <div className="premiacao-lugar" style={{ color: item.lugarColor }}>
                    {item.lugar}
                  </div>
                  <div className="premiacao-titulo-box">
                    <h3 className="premiacao-titulo">{item.titulo}</h3>
                    <img src="/images/trophy.png" alt="" className="premiacao-trophy-icon" />
                  </div>
                </div>
                <p className="premiacao-descricao">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PremiacaoSection

