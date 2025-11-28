import './RegrasPareamentoSection.css'

function RegrasPareamentoSection() {
  const regras = [
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

  return (
    <section id="regras-pareamento" className="regras-pareamento-section">
      <div className="regras-pareamento-container">
        <h2 className="regras-pareamento-title">
          Regras de<br />pareamento
        </h2>
        
        <div className="regras-pareamento-content">
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
                {regras.map((regra, index) => (
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
      </div>
    </section>
  )
}

export default RegrasPareamentoSection

