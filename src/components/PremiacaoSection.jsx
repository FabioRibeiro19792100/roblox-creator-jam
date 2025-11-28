import './PremiacaoSection.css'

function PremiacaoSection() {
  const premiacoes = [
    {
      lugar: 'Primeiro lugar',
      lugarColor: '#000',
      titulo: 'Melhor Protótipo da Jam',
      descricao: 'Reconhece a experiência que apresenta a melhor combinação de conceito, jogabilidade e execução.'
    },
    {
      lugar: 'Segundo lugar',
      lugarColor: '#666',
      titulo: 'Prêmio Criatividade',
      descricao: 'Destaca a abordagem mais original dentro dos temas propostos.'
    },
    {
      lugar: 'Terceiro lugar',
      lugarColor: '#999',
      titulo: 'Prêmio da Comunidade',
      descricao: 'Votação entre participantes da faixa etária da Jam (13-18), em canal moderado.'
    }
  ]

  return (
    <section id="premiacao" className="premiacao-section">
      <div className="premiacao-container">
        <h2 className="premiacao-title">
          Premiação
        </h2>

        <div className="premiacao-content">
          <div className="premiacoes-list">
            {premiacoes.map((item, index) => (
              <div key={index} className="premiacao-item">
                <div className="premiacao-left">
                  <div className="premiacao-lugar" style={{ color: item.lugarColor }}>
                    {item.lugar}
                  </div>
                  <div className="premiacao-titulo-box">
                    <h3 className="premiacao-titulo">{item.titulo}</h3>
                  </div>
                </div>
                <p className="premiacao-descricao">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PremiacaoSection

