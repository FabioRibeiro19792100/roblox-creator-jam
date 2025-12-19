import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import '../components/utilitarios/AnimationBase.css'
import './RegrasJamSection.css'

function RegrasJamSection() {
  const config = useSiteConfig()
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }
  
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
    <section 
      id="regras-jam" 
      className={`regras-jam-section sweep-fill ${isOpen ? 'regras-open sweep-fill-active' : ''}`}
      role="region"
      aria-labelledby="regras-title"
      onClick={toggleAccordion}
    >
      <div className="regras-jam-container">
        <div className={`regras-jam-accordion-item ${isOpen ? 'regras-open' : ''}`}>
          <h2 id="regras-title" className="regras-jam-heading">
            <button
              className="regras-jam-header plus-indicator-trigger"
              onClick={(e) => {
                e.stopPropagation()
                toggleAccordion()
              }}
              aria-expanded={isOpen}
              aria-controls="regras-content"
            >
              <span className="regras-jam-title-text">{config.jam?.regras?.title || 'Regras'}</span>
              <span className="regras-jam-badge">mais informações em breve</span>
              <span className={`regras-jam-arrow plus-indicator ${isOpen ? 'plus-indicator-open' : ''}`} aria-hidden="true" />
              <span className="sr-only">
                {isOpen ? 'Ocultar regras' : 'Mostrar regras'}
              </span>
            </button>
          </h2>
          {isOpen && (
            <div 
              className="regras-jam-content" 
              id="regras-content"
              onClick={(e) => e.stopPropagation()}
            >
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
          )}
        </div>
      </div>
    </section>
  )
}

export default RegrasJamSection

