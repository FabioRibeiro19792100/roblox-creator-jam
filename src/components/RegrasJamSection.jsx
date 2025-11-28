import './RegrasJamSection.css'

function RegrasJamSection() {
  // Função para quebrar texto em parágrafos separados por pontos
  const splitByPeriod = (text) => {
    if (!text) return null
    const sentences = text.split('.').filter(s => s.trim().length > 0)
    return sentences.map((sentence, index) => (
      <p key={index} className="regra-descricao">
        {sentence.trim()}.
      </p>
    ))
  }
  const regras = [
    {
      numero: 1,
      titulo: 'Criação durante as 72 horas',
      descricao: 'O projeto deve ser feito dentro do período oficial da Jam e seguir o tema escolhido. Experiências criadas totalmente antes ou depois desse período não entram na avaliação.'
    },
    {
      numero: 2,
      titulo: 'Uso de recursos, modelos e materiais prontos',
      descricao: 'Você pode usar materiais que já existem, desde que tenha direito de usar e informe isso na sua entrega.',
      permitido: [
        'modelos do Roblox Toolbox com licença Free to Use',
        'recursos criados por você em outros projetos',
        'assets feitos por alguém do seu time antes da Jam',
        'assets gratuitos de sites que permitem uso em jogos',
        'IA para gerar imagens, sons ou textos (desde que você tenha direito de uso)',
        'plugins gratuitos do Roblox Studio',
        'scripts básicos de uso público'
      ],
      naoPermitido: [
        'usar conteúdos pagos sem ter comprado',
        'usar materiais protegidos por copyright sem permissão',
        'copiar jogos prontos e publicar como se fossem seus',
        'usar assets de terceiros que não permitem redistribuição'
      ],
      observacao: 'O que você precisa informar na submissão: nome do recurso, de onde você pegou, link da fonte (se houver). Regra simples: Use o que for permitido, mas seja transparente.'
    },
    {
      numero: 3,
      titulo: 'Equipes de 1 a 5 pessoas',
      descricao: 'Cada equipe pode ter entre 1 e 5 participantes. Participar sozinho também vale. A formação final das equipes segue as regras da Jam (faixa etária, autorização e preferências).'
    },
    {
      numero: 4,
      titulo: 'Publicação do projeto',
      descricao: 'A experiência deve estar publicada no Roblox — como Public ou Unlisted (link-only) — e o link precisa abrir normalmente.'
    },
    {
      numero: 5,
      titulo: 'Convivência e comportamento',
      descricao: 'Durante toda a Jam, os participantes seguem:',
      topicos: [
        'Termos de Uso do Roblox',
        'Padrões da Comunidade',
        'regras de participação da Jam'
      ],
      descricaoFinal: 'Os canais oficiais da Jam são moderados, com DMs desativadas.'
    },
    {
      numero: 6,
      titulo: 'Ambiente seguro',
      descricao: 'Toda a comunicação oficial ocorre no Discord da Jam, no canal da sua equipe e nos canais públicos. Logs ficam ativos para manter tudo seguro.'
    }
  ]

  return (
    <section id="regras-jam" className="regras-jam-section">
      <div className="regras-jam-container">
        <h2 className="regras-jam-title">
          Regras
        </h2>
        
        <div className="regras-jam-content">
          {regras.map((regra) => (
            <div key={regra.numero} className="regra-item">
              <div className="regra-header">
                <span className="regra-numero">{regra.numero}</span>
                <h3 className="regra-titulo">{regra.titulo}</h3>
              </div>
              <div className="regra-conteudo">
                {splitByPeriod(regra.descricao)}
                
                {regra.topicos && (
                  <ul className="lista-itens">
                    {regra.topicos.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
                
                {regra.descricaoFinal && (
                  <div className="regra-descricao-final">
                    {splitByPeriod(regra.descricaoFinal)}
                  </div>
                )}
                
                {regra.permitido && (
                  <>
                    <div className="regra-listas">
                      <div className="regra-permitido">
                        <h4 className="lista-titulo">Permitido:</h4>
                        <ul className="lista-itens">
                          {regra.permitido.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {regra.naoPermitido && (
                        <div className="regra-nao-permitido">
                          <h4 className="lista-titulo">Não permitido:</h4>
                          <ul className="lista-itens">
                            {regra.naoPermitido.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {regra.observacao && (
                      <div className="regra-observacao-wrapper">
                        {splitByPeriod(regra.observacao)}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RegrasJamSection

