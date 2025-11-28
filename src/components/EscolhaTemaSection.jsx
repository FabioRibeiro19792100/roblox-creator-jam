import './EscolhaTemaSection.css'

function EscolhaTemaSection() {
  const temas = [
    {
      tema: 'Empatia',
      descricao: 'Criar situações que mostram outro ponto de vista.'
    },
    {
      tema: 'Convivência e diferenças',
      descricao: 'Como pessoas diferentes dividem o mesmo espaço.'
    },
    {
      tema: 'Uso responsável de IA',
      descricao: 'Limites e escolhas no uso de IA.'
    },
    {
      tema: 'Segurança digital',
      descricao: 'Riscos, decisões e proteção online.'
    },
    {
      tema: 'Sustentabilidade',
      descricao: 'Impacto, recursos e uso consciente.'
    },
    {
      tema: 'Mudanças climáticas',
      descricao: 'Adaptações, desafios e consequências práticas.'
    },
    {
      tema: 'Acesso e inclusão',
      descricao: 'Experiências que qualquer pessoa consegue usar.'
    },
    {
      tema: 'Mobilidade urbana',
      descricao: 'Rotas, movimento e organização da cidade.'
    },
    {
      tema: 'Cidades inteligentes',
      descricao: 'Tecnologia aplicada à vida urbana.'
    },
    {
      tema: 'Saúde emocional',
      descricao: 'Pressão, equilíbrio e bem-estar.'
    }
  ]

  return (
    <section id="escolha-tema" className="escolha-tema-section">
      <div className="escolha-tema-container">
        <h2 className="escolha-tema-title">
          Escolha<br />do tema
        </h2>
        
        <div className="escolha-tema-content">
          <div className="escolha-tema-intro">
            <p>Cada participante escolhe um tema no momento da inscrição.</p>
            <p>O tema escolhido não pode ser alterado depois da formação da equipe.</p>
          </div>

          <div className="temas-grid">
            {temas.map((item, index) => (
              <div key={index} className="tema-card">
                <h3 className="tema-nome">{item.tema}</h3>
                <p className="tema-descricao">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EscolhaTemaSection

