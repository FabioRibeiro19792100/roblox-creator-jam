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
      </div>
    </section>
  )
}

export default DesafioJamSection

