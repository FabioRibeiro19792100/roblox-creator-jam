import { useSiteConfig } from '../config/useSiteConfig'
import './DesafioJamSection.css'

function DesafioJamSection() {
  const config = useSiteConfig()

  return (
    <section id="desafio-jam" className="desafio-jam-section">
      <div className="desafio-jam-container">
        <div className="desafio-jam-header">
          <h2 className="desafio-jam-title">
            {config.jam?.desafio?.title || 'O desafio\n da JAM'}
          </h2>
          
          <div className="desafio-jam-intro">
            <p>
              {config.jam?.desafio?.description || ''}
            </p>
          </div>
        </div>

        <div className="desafio-jam-content">
          <h3 className="prototipos-subtitle">{config.jam?.desafio?.subtitle || 'Exemplos de protótipos'}</h3>
          
          <div className="prototipos-grid">
            <div className="prototipo-card">
              {/* Substitua por: <img src="/images/prototipo-1.jpg" alt="Protótipo 1" /> */}
              <div className="prototipo-placeholder"></div>
            </div>
            <div className="prototipo-card">
              {/* Substitua por: <img src="/images/prototipo-2.jpg" alt="Protótipo 2" /> */}
              <div className="prototipo-placeholder"></div>
            </div>
            <div className="prototipo-card">
              {/* Substitua por: <img src="/images/prototipo-3.jpg" alt="Protótipo 3" /> */}
              <div className="prototipo-placeholder"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DesafioJamSection

