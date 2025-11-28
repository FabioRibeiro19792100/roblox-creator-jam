import './ComoParticiparSection.css'

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
  return (
    <section id="como-participar" className="como-participar-section">
      <div className="como-participar-container">
        <h2 className="como-participar-title">
          Como<br />Participar
        </h2>
        <div className="como-participar-content">
          <div className="steps-table">
            <div className="table-header">
              <div className="header-cell header-number">Passo</div>
              <div className="header-cell header-title">Descrição</div>
            </div>
            {steps.map((step) => (
              <div key={step.number} className="table-row">
                <div className="table-cell cell-number">{step.number}</div>
                <div className="table-cell cell-content">
                  <div className="step-title">{step.title}</div>
                  <div className="step-description">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComoParticiparSection
