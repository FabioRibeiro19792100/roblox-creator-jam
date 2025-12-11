import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import './ExpedicaoNaEstradaContentSection.css'

function ExpedicaoNaEstradaContentSection() {
  const config = useSiteConfig()
  const expedicaoNaEstrada = config?.expedicaoNaEstrada || {}
  const content = expedicaoNaEstrada?.content || {}
  const [openIndex, setOpenIndex] = useState(null)
  
  const atividades = content?.atividades || [
    {
      id: 'mundos-em-familia',
      title: 'Mundos em Família',
      description: 'Jovens e responsáveis imaginam juntos "mundos melhores" e desenham as primeiras ideias de experiências no Roblox.',
      image: '/images/2.webp'
    },
    {
      id: 'construtores-do-futuro',
      title: 'Construtores do Futuro',
      description: 'Oficinas práticas de criação no Roblox, com foco em cooperação, sustentabilidade e desafios reais do dia a dia.',
      image: '/images/3.webp'
    },
    {
      id: 'cidadania-digital',
      title: 'Cidadania Digital',
      description: 'Conversa guiada sobre segurança online, cidadania digital e equilíbrio saudável com as telas — com espaço aberto para dúvidas e relatos.',
      image: '/images/4.webp'
    },
    {
      id: 'showcase-de-mundos',
      title: 'Showcase de Mundos',
      description: 'Apresentação dos mundos criados pelas crianças para familiares e especialistas, com reconhecimento simbólico e convite para seguir criando no Roblox.',
      image: '/images/5.webp'
    }
  ]

  return (
    <section id="expedicao-na-estrada-content" className="expedicao-na-estrada-content-section">
      <div className="expedicao-na-estrada-content-container">
        {/* Top Section: Title and Description */}
        <div className="expedicao-na-estrada-content-header">
          <div className="expedicao-na-estrada-content-title-section">
            <div className="expedicao-na-estrada-content-col-1">
              <div className="expedicao-na-estrada-content-title-wrapper">
                <h1 className="expedicao-na-estrada-content-title-line-1">{content?.title?.line1 || expedicaoNaEstrada?.hero?.title?.line1 || 'Expedição'}</h1>
                <h1 className="expedicao-na-estrada-content-title-line-2">{content?.title?.line2 || expedicaoNaEstrada?.hero?.title?.line2 || 'Roblox'}</h1>
                <h2 className="expedicao-na-estrada-content-title-line-3">{content?.title?.line3 || expedicaoNaEstrada?.hero?.title?.line3 || 'na Estrada'}</h2>
              </div>
              <div className="expedicao-na-estrada-content-intro">
                <p className="expedicao-na-estrada-content-description">
                  {content?.description || 'Nas capitais, o projeto abre sua programação com encontros que combinam criação no Roblox, participação das famílias e introdução aos quatro formatos que compõem a experiência.'}
                </p>
              </div>
            </div>
            <div className="expedicao-na-estrada-content-image">
              <img src="/images/1.webp" alt="Expedição Roblox na Estrada" />
            </div>
          </div>
        </div>
        
        {/* Bottom Section: Accordion Activities */}
        <div className="expedicao-na-estrada-features">
          {atividades.map((atividade, index) => (
            <div 
              key={atividade.id} 
              className={`expedicao-na-estrada-accordion-item ${openIndex === index ? 'expedicao-na-estrada-accordion-open' : ''}`}
            >
              <button
                className="expedicao-na-estrada-feature-box"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="expedicao-na-estrada-feature-content">
                  <span className="expedicao-na-estrada-feature-label">{atividade.title.split(' ')[0] === 'Mundos' ? 'ATIVIDADE 01' : atividade.title.split(' ')[0] === 'Construtores' ? 'ATIVIDADE 02' : atividade.title.split(' ')[0] === 'Cidadania' ? 'ATIVIDADE 03' : 'ATIVIDADE 04'}</span>
                  <p className="expedicao-na-estrada-feature-text">{atividade.title}</p>
                </div>
                <span className="expedicao-na-estrada-arrow">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="expedicao-na-estrada-accordion-content">
                  <div className="expedicao-na-estrada-accordion-layout">
                    <div className="expedicao-na-estrada-accordion-text-wrapper">
                      <h3 className="expedicao-na-estrada-accordion-title-large">
                        {atividade.title}
                      </h3>
                      <p className="expedicao-na-estrada-accordion-text">
                        {atividade.description}
                      </p>
                    </div>
                    {atividade.image && (
                      <div className="expedicao-na-estrada-accordion-image-wrapper">
                        <div className="expedicao-na-estrada-accordion-image-backdrop"></div>
                        <img 
                          src={atividade.image} 
                          alt={atividade.title} 
                          className="expedicao-na-estrada-accordion-image"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExpedicaoNaEstradaContentSection

