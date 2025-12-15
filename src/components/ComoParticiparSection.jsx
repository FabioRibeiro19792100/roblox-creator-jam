import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import './ComoParticiparSection.css'
import './RegrasPareamentoSection.css'
import './TrustedConnectionSection.css'

// Função para quebrar texto em parágrafos separados por pontos
const splitByPeriod = (text) => {
  if (!text) return null
  const sentences = text.split('.').filter(s => s.trim().length > 0)
  return sentences.map((sentence, index) => (
    <p key={index} className="step-description-paragraph">
      {sentence.trim()}.
    </p>
  ))
}

function ComoParticiparSection() {
  const config = useSiteConfig()
  const [openStep, setOpenStep] = useState(null)

  const toggleStep = (stepNumber) => {
    setOpenStep(openStep === stepNumber ? null : stepNumber)
  }

  const steps = config.jam?.comoParticipar?.steps || []
  const regrasChecagem = config.jam?.comoParticipar?.regrasChecagem || []
  const qaItems = config.jam?.comoParticipar?.qaItems || []
  const trustedConnectionIntro = config.jam?.comoParticipar?.trustedConnectionIntro || ''

  return (
    <section id="como-participar" className="como-participar-section">
      <div className="como-participar-container">
        <h2 className="como-participar-title">
          {config.jam?.comoParticipar?.title || 'Como Participar'}
        </h2>
        <div className="como-participar-content">
          <div className="steps-accordion">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`step-item ${openStep === step.number ? 'step-open' : ''}`}
              >
                <button
                  className="step-header hover-fill"
                  onClick={() => toggleStep(step.number)}
                  aria-expanded={openStep === step.number}
                  style={{ '--fill-color': '#b621fe' }} /* Roxo neon análogo ao tema de participação/regras */
                >
                  <span className="step-number">{step.number}</span>
                  <span className="step-title">{step.title}</span>
                  <span className="step-arrow">{openStep === step.number ? '−' : '+'}</span>
                </button>
                {openStep === step.number && (
                  <div className="step-content">
                    <div className="step-description">
                      {splitByPeriod(step.description)}
                    </div>
                    {step.number === 4 && (
                      <>
                        <div className="checagem-idade-wrapper">
                          <h3 className="checagem-idade-title">Checagem de Idade</h3>
                          <div className="regras-table-wrapper">
                            <table className="regras-table">
                              <thead>
                                <tr>
                                  <th>Faixa etária</th>
                                  <th>Chat permitido (Roblox)</th>
                                  <th>Equipes permitidas (Jam)</th>
                                  <th>Trusted Connection</th>
                                </tr>
                              </thead>
                              <tbody>
                                {regrasChecagem.map((regra, index) => (
                                  <tr key={index}>
                                    <td className="faixa-etaria" data-label="Faixa etária">{regra.faixaEtaria}</td>
                                    <td data-label="Chat permitido (Roblox)">{regra.chatPermitido}</td>
                                    <td data-label="Equipes permitidas (Jam)">{regra.equipesPermitidas}</td>
                                    <td data-label="Trusted Connection">{regra.trustedConnection}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="conexao-confiavel-wrapper">
                          <h3 className="conexao-confiavel-title">Conexão Confiável</h3>
                          <div className="trusted-connection-intro">
                            <p className="step-description-paragraph">
                              {trustedConnectionIntro}
                            </p>
                          </div>
                          <div className="qa-grid">
                            {qaItems.map((item, index) => (
                              <div key={index} className="qa-card">
                                <div className="qa-question">
                                  <h3>{item.question}</h3>
                                </div>
                                <div className="qa-answer">
                                  <p>{item.answer}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComoParticiparSection
