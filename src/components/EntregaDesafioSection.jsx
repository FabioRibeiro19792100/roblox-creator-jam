import { useSiteConfig } from '../config/useSiteConfig'
import './EntregaDesafioSection.css'

function EntregaDesafioSection() {
  const config = useSiteConfig()
  const entregas = config.jam?.entrega?.entregas || []
  const intro = config.jam?.entrega?.intro || []

  return (
    <section id="entrega-desafio" className="entrega-desafio-section">
      <div className="entrega-desafio-container">
        <h2 className="entrega-desafio-title">
          {config.jam?.entrega?.title || 'Entrega do\ndesafio'}
        </h2>
        
        <div className="entrega-desafio-content">
          <div className="entrega-desafio-intro">
            {intro.map((text, index) => {
              if (text.includes('<strong>')) {
                const parts = text.split(/(<strong>.*?<\/strong>)/g)
                return (
                  <p key={index}>
                    {parts.map((part, partIndex) => {
                      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
                        const content = part.replace(/<\/?strong>/g, '')
                        return <strong key={partIndex}>{content}</strong>
                      }
                      return <span key={partIndex}>{part}</span>
                    })}
                  </p>
                )
              }
              return <p key={index}>{text}</p>
            })}
          </div>

          <div className="entregas-list">
            {entregas.map((item, index) => (
              <div key={item.number || index} className="entrega-item">
                <div className="entrega-number">{item.number}</div>
                <div className="entrega-text">{typeof item.text === 'string' ? item.text : item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EntregaDesafioSection









