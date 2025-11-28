import './TrustedConnectionSection.css'

function TrustedConnectionSection() {
  const qaItems = [
    {
      question: 'Quem cria?',
      answer: 'O próprio usuário (jovem) com permissão da família, dentro da plataforma Roblox.'
    },
    {
      question: 'Onde é criada?',
      answer: 'No próprio Roblox, dentro da conta do usuário, após o age-check.'
    },
    {
      question: 'Quando é criada?',
      answer: 'Antes da Jam. Nunca durante. A Jam não cria nem gerencia isso.'
    },
    {
      question: 'Quando importa na Jam?',
      answer: 'Exatamente em UM caso: permitir equipe entre 13-15 e 18.'
    }
  ]

  return (
    <section id="trusted-connection" className="trusted-connection-section">
      <div className="trusted-connection-container">
        <h2 className="trusted-connection-title">
          O que é<br />Trusted Connection?
        </h2>
        
        <div className="trusted-connection-content">
          <div className="trusted-connection-intro">
            <p>
              Um vínculo seguro entre duas contas que informa ao Roblox que essas pessoas se conhecem na vida real e podem conversar e interagir mesmo estando em faixas etárias que normalmente não conversam.
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
      </div>
    </section>
  )
}

export default TrustedConnectionSection

