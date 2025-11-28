import './DatasCanaisSection.css'

function DatasCanaisSection() {
  const etapas = [
    {
      etapa: 'Inscrição',
      plataforma: 'Formulário',
      quando: '30 a 7 dias antes da Jam',
      oQue: 'Coleta username, tema e envio da autorização familiar'
    },
    {
      etapa: 'Orientações e Lives',
      plataforma: 'Discord',
      quando: 'Na última semana antes da Jam',
      oQue: 'Abertura, tutoriais e Q&A'
    },
    {
      etapa: 'Formação das equipes',
      plataforma: 'Sistema Mastertech',
      quando: '7 dias antes da Jam',
      oQue: 'Times criados automaticamente, seguindo idade e autorizações'
    },
    {
      etapa: 'Abertura oficial da Jam',
      plataforma: 'Discord',
      quando: 'Dia da Jam — horário oficial',
      oQue: 'Tema revelado e início das 72h de criação'
    },
    {
      etapa: 'Criação dos projetos',
      plataforma: 'Roblox Studio',
      quando: 'Durante as 72 horas da Jam',
      oQue: 'Cada equipe desenvolve sua experiência'
    },
    {
      etapa: 'Comunicação da equipe',
      plataforma: 'Discord',
      quando: 'Durante as 72 horas da Jam',
      oQue: 'Canais públicos + canal privado de cada time'
    },
    {
      etapa: 'Publicação do projeto',
      plataforma: 'Roblox Studio',
      quando: 'Até o final das 72 horas',
      oQue: 'Experiência publicada como Public ou Unlisted'
    },
    {
      etapa: 'Entrega oficial',
      plataforma: 'Formulário',
      quando: 'Até o final das 72 horas',
      oQue: 'Envio do link do projeto + descrição + responsabilidades'
    },
    {
      etapa: 'Avaliação',
      plataforma: 'Painel interno',
      quando: '3 dias após a Jam',
      oQue: 'Jurados Mastertech + Roblox avaliam os projetos'
    },
    {
      etapa: 'Anúncio dos vencedores',
      plataforma: 'Discord',
      quando: '7 dias após a Jam',
      oQue: 'Live com os resultados'
    }
  ]

  return (
    <section id="datas-canais" className="datas-canais-section">
      <div className="datas-canais-container">
        <h2 className="datas-canais-title">
          Datas e<br />canais
        </h2>

        <div className="datas-canais-content">
          <div className="datas-canais-table-wrapper">
            <table className="datas-canais-table">
              <thead>
                <tr>
                  <th>Etapa</th>
                  <th>Onde</th>
                  <th>Quando</th>
                  <th>O quê</th>
                </tr>
              </thead>
              <tbody>
                {etapas.map((item, index) => (
                  <tr key={index}>
                    <td className="etapa-cell" data-label="Etapa">{item.etapa}</td>
                    <td data-label="Onde">{item.plataforma}</td>
                    <td data-label="Quando">{item.quando}</td>
                    <td data-label="O quê">{item.oQue}</td>
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

export default DatasCanaisSection

