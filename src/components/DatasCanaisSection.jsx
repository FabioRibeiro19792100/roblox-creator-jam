import { useSiteConfig } from '../config/useSiteConfig'
import './DatasCanaisSection.css'

function DatasCanaisSection() {
  const config = useSiteConfig()
  const etapas = config.jam?.datasCanais?.etapas || []

  return (
    <section id="datas-canais" className="datas-canais-section">
      <div className="datas-canais-container">
        <h2 className="datas-canais-title">
          {config.jam?.datasCanais?.title || 'Datas e canais'}
        </h2>

        <div className="datas-canais-content">
          <div className="datas-canais-table-wrapper">
            <table className="datas-canais-table">
              <thead>
                <tr>
                  <th>Etapa</th>
                  <th>Onde</th>
                  <th>Quando</th>
                  <th>O quê</th>
                </tr>
              </thead>
              <tbody>
                {etapas.map((item, index) => (
                  <tr key={index}>
                    <td className="etapa-cell" data-label="Etapa">{item.etapa}</td>
                    <td data-label="Onde">{item.plataforma}</td>
                    <td data-label="Quando">{item.quando}</td>
                    <td data-label="O quê">{item.oQue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DatasCanaisSection

