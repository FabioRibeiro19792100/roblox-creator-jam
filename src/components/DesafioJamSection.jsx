import './DesafioJamSection.css'

function DesafioJamSection() {
  return (
    <section id="desafio-jam" className="desafio-jam-section">
      <div className="desafio-jam-container">
        <div className="desafio-jam-header">
          <h2 className="desafio-jam-title">
            O desafio<br />da JAM
          </h2>
          
          <div className="desafio-jam-intro">
            <p>
              A entrega da Jam é o protótipo funcional publicado no Roblox Studio, uma experiência que apresenta a ideia da equipe em funcionamento e oferece ao jogador uma forma concreta de interagir com o tema escolhido.
            </p>
          </div>
        </div>

        <div className="desafio-jam-content">
          <h3 className="prototipos-subtitle">Exemplos de protótipos</h3>
          
          <div className="prototipos-grid">
            <div className="prototipo-card">
              <div className="prototipo-placeholder"></div>
            </div>
            <div className="prototipo-card">
              <div className="prototipo-placeholder"></div>
            </div>
            <div className="prototipo-card">
              <div className="prototipo-placeholder"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DesafioJamSection

