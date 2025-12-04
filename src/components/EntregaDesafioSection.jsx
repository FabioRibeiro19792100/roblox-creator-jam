import './EntregaDesafioSection.css'

function EntregaDesafioSection() {
  const entregas = [
    {
      number: 1,
      text: 'o link da experiência publicada'
    },
    {
      number: 2,
      text: 'A descrição da ideia, com conceito da experiência, o tema escolhido e a ação central proposta ao jogador.'
    },
    {
      number: 3,
      text: (
        <>
          <strong>a divisão de responsabilidades,</strong> Indicando o papel de cada participante no desenvolvimento do projeto.
        </>
      )
    }
  ]

  return (
    <section id="entrega-desafio" className="entrega-desafio-section">
      <div className="entrega-desafio-container">
        <h2 className="entrega-desafio-title">
          Entrega do<br />desafio
        </h2>
        
        <div className="entrega-desafio-content">
          <div className="entrega-desafio-intro">
            <p>
              A entrega é realizada por meio do formulário oficial de submissão.<br />
              <strong>No formulário, a equipe insere:</strong>
            </p>
          </div>

          <div className="entregas-list">
            {entregas.map((item) => (
              <div key={item.number} className="entrega-item">
                <div className="entrega-number">{item.number}</div>
                <div className="entrega-text">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EntregaDesafioSection




