import { useSiteConfig } from '../config/useSiteConfig'
import './QuerCriarTitleSection.css'

function QuerCriarTitleSection() {
  const config = useSiteConfig()

  return (
    <section id="quer-criar-title" className="quer-criar-title-section">
      <div className="quer-criar-title-container">
        <h2 className="quer-criar-title-title">
          <span className="quer-criar-title-line-1">{config?.querCriar?.title?.line1 || 'Quer criar'}</span>
          <span className="quer-criar-title-line-2">{config?.querCriar?.title?.line2 || 'com a gente?'}</span>
        </h2>
      </div>
    </section>
  )
}

export default QuerCriarTitleSection

