import { useState } from 'react'
import './ComoParticiparSection.css'
import './RegrasPareamentoSection.css'

const regrasChecagem = [
  {
    faixaEtaria: '13-15',
    chatPermitido: '13-15, 16-17',
    equipesPermitidas: '13-15, 16-17',
    trustedConnection: 'Necessária para equipe com 18'
  },
  {
    faixaEtaria: '16-17',
    chatPermitido: '13-15, 16-17, 18',
    equipesPermitidas: '13-15, 16-17, 18',
    trustedConnection: 'Nunca necessária'
  },
  {
    faixaEtaria: '18',
    chatPermitido: '16-17, 18',
    equipesPermitidas: '16-17, 18',
    trustedConnection: 'Necessária para equipe com 13-15'
  }
]

const steps = [
  {
    number: 1,
    title: 'Crie sua conta Roblox',
    description: 'Os participantes precisam ter entre 13 e 18 anos e possuir uma conta Roblox. A conta e o nome de usuário podem ser criados via mobile. Se for auxiliar na criação do jogo, é necessário um computador com Roblox Studio instalado.'
  },
  {
    number: 2,
    title: 'Faça sua inscrição',
    description: 'Os participantes devem preencher um formulário oficial informando seu nome de usuário Roblox, o tema que deseja trabalhar, se prefere participar individualmente ou em equipe, e o e-mail do responsável. A inscrição é individual.'
  },
  {
    number: 3,
    title: 'Aguarde a autorização familiar',
    description: 'O responsável recebe um e-mail com um código de confirmação. Após autorizar, a participação em equipe é habilitada. Sem autorização, a participação é no modo individual.'
  },
  {
    number: 4,
    title: 'Forme seu time de trabalho',
    description: 'O sistema forma automaticamente as equipes com base na faixa etária oficial do Roblox do participante, tema escolhido, preferência (solo ou equipe) e vínculos familiares existentes (Conexão Confiável). Cada pessoa é colocada em uma equipe apropriada para sua faixa etária.'
  },
  {
    number: 5,
    title: 'Entre no Discord da Jam',
    description: 'Os participantes recebem um link de acesso ao servidor oficial do Discord, que contém anúncios da Jam, tutoriais, canais de perguntas e respostas e um canal privado da equipe. A comunicação da Jam ocorre lá em um ambiente moderado e seguro.'
  },
  {
    number: 6,
    title: 'Crie sua experiência no Roblox Studio',
    description: 'Com sua equipe, os participantes desenvolvem uma experiência representando o tema escolhido. Cada grupo trabalha em seu próprio projeto e pode publicar a experiência quando estiver pronta.'
  }
]

function ComoParticiparSection() {
  const [openStep, setOpenStep] = useState(null)

  const toggleStep = (stepNumber) => {
    setOpenStep(openStep === stepNumber ? null : stepNumber)
  }

  return (
    <section id="como-participar" className="como-participar-section">
      <div className="como-participar-container">
        <h2 className="como-participar-title">
          Como<br />Participar
        </h2>
        <div className="como-participar-content">
          <div className="steps-accordion">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`step-item ${openStep === step.number ? 'step-open' : ''}`}
              >
                <button
                  className="step-header"
                  onClick={() => toggleStep(step.number)}
                  aria-expanded={openStep === step.number}
                >
                  <span className="step-number">{step.number}</span>
                  <span className="step-title">{step.title}</span>
                  <span className="step-arrow">{openStep === step.number ? '−' : '+'}</span>
                </button>
                {openStep === step.number && (
                  <div className="step-content">
                    <div className="step-description">
                      <p>{step.description}</p>
                    </div>
                    {step.number === 4 && (
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
