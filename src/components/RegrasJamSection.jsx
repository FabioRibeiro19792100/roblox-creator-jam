import { useSiteConfig } from '../config/useSiteConfig'
import './RegrasJamSection.css'

function RegrasJamSection() {
  const config = useSiteConfig()
  
  // Função para quebrar texto em parágrafos separados por pontos
  const splitByPeriod = (text) => {
    if (!text) return null
    const sentences = text.split('.').filter(s => s.trim().length > 0)
    return sentences.map((sentence, index) => (
      <p key={index} className="regra-descricao">
        {sentence.trim()}.
      </p>
    ))
  }
  
  const regras = config.jam?.regras?.regras || []

  return (
    <section id="regras-jam" className="regras-jam-section">
      <div className="regras-jam-container">
        <h2 className="regras-jam-title">
          {config.jam?.regras?.title || 'Regras'}
        </h2>
        
        <div className="regras-jam-content">
          {regras.map((regra) => (
            <div key={regra.numero} className="regra-item">
              <div className="regra-header">
                <span className="regra-numero">{regra.numero}</span>
                <h3 className="regra-titulo">{regra.titulo}</h3>
              </div>
              <div className="regra-conteudo">
                {splitByPeriod(regra.descricao)}
                
                {regra.topicos && (
                  <ul className="lista-itens">
                    {regra.topicos.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
                
                {regra.descricaoFinal && (
                  <div className="regra-descricao-final">
                    {splitByPeriod(regra.descricaoFinal)}
                  </div>
                )}
                
                {regra.permitido && (
                  <>
                    <div className="regra-listas">
                      <div className="regra-permitido">
                        <h4 className="lista-titulo">Permitido:</h4>
                        <ul className="lista-itens">
                          {regra.permitido.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {regra.naoPermitido && (
                        <div className="regra-nao-permitido">
                          <h4 className="lista-titulo">Não permitido:</h4>
                          <ul className="lista-itens">
                            {regra.naoPermitido.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {regra.observacao && (
                      <div className="regra-observacao-wrapper">
                        {splitByPeriod(regra.observacao)}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RegrasJamSection

