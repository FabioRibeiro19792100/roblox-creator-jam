import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import './GlossarioSection.css'

function GlossarioSection() {
  const config = useSiteConfig()
  const [isOpen, setIsOpen] = useState(false)

  const termos = config?.glossario?.termos || []
    {
      termo: 'Assets',
      descricao: 'Recursos utilizados na criação, como modelos 3D, imagens, sons e outros elementos que compõem uma experiência.'
    },
    {
      termo: 'Co-criação',
      descricao: 'Processo de criação colaborativa em equipe, onde múltiplos desenvolvedores trabalham juntos no mesmo projeto.'
    },
    {
      termo: 'Copyright',
      descricao: 'Direitos autorais sobre conteúdo criativo. É importante respeitar os direitos de uso de materiais de terceiros.'
    },
    {
      termo: 'Criação assistida por IA',
      descricao: 'Uso de inteligência artificial para auxiliar no processo de criação, gerando imagens, sons ou textos.'
    },
    {
      termo: 'Depuração',
      descricao: 'Processo de encontrar e corrigir erros (bugs) no código ou na experiência criada.'
    },
    {
      termo: 'DM (Direct Message)',
      descricao: 'Mensagem direta privada entre usuários. Durante a Jam, DMs são desativadas para maior segurança.'
    },
    {
      termo: 'Expedição Roblox',
      descricao: 'Projeto educacional que conecta trilhas de aprendizado, Game Jams e encontros presenciais para ensinar criação no Roblox.'
    },
    {
      termo: 'Expedição Roblox na Estrada',
      descricao: 'Eventos presenciais realizados em diferentes capitais brasileiras como parte da Expedição Roblox.'
    },
    {
      termo: 'Experiência',
      descricao: 'Termo usado no Roblox para se referir a jogos ou mundos criados na plataforma (não se usa "jogo").'
    },
    {
      termo: 'Faixa etária',
      descricao: 'Categoria de idade do usuário no Roblox (13-15, 16-17, 18+), que determina com quem pode interagir.'
    },
    {
      termo: 'Free to Use',
      descricao: 'Recursos que podem ser usados gratuitamente, geralmente encontrados no Roblox Toolbox com licença apropriada.'
    },
    {
      termo: 'Game Jam',
      descricao: 'Evento de criação intensiva de jogos em tempo limitado, onde equipes desenvolvem experiências completas em 72 horas.'
    },
    {
      termo: 'Imersão presencial',
      descricao: 'Evento físico presencial onde participantes se encontram pessoalmente para atividades práticas.'
    },
    {
      termo: 'Jam',
      descricao: 'Abreviação de Game Jam, evento de criação de experiências em tempo limitado.'
    },
    {
      termo: 'Logs',
      descricao: 'Registros de conversas e atividades mantidos para garantir segurança e transparência nos canais oficiais.'
    },
    {
      termo: 'Moderado',
      descricao: 'Ambiente supervisionado por moderadores que garantem que as regras sejam seguidas e o ambiente seja seguro.'
    },
    {
      termo: 'Narrativa',
      descricao: 'História contada pela experiência, incluindo personagens, enredo e elementos que envolvem o jogador.'
    },
    {
      termo: 'Padrões da Comunidade',
      descricao: 'Normas de comportamento estabelecidas pela plataforma Roblox que todos os usuários devem seguir.'
    },
    {
      termo: 'Plugins',
      descricao: 'Extensões do Roblox Studio que adicionam funcionalidades extras para facilitar a criação.'
    },
    {
      termo: 'Portfólio',
      descricao: 'Conjunto de projetos criados que demonstram as habilidades e o trabalho desenvolvido pelo criador.'
    },
    {
      termo: 'Protótipo',
      descricao: 'Versão inicial funcional de uma experiência que demonstra a ideia principal e permite interação básica.'
    },
    {
      termo: 'Public',
      descricao: 'Experiência publicada no Roblox que é visível publicamente e pode ser encontrada por qualquer usuário.'
    },
    {
      termo: 'Redistribuição',
      descricao: 'Compartilhamento de assets criados por outros. É importante verificar se o material permite redistribuição.'
    },
    {
      termo: 'Roblox',
      descricao: 'Plataforma online de jogos e criação onde usuários podem criar, compartilhar e jogar experiências desenvolvidas por outros usuários.'
    },
    {
      termo: 'Roblox Studio',
      descricao: 'Ferramenta de criação oficial do Roblox que permite construir qualquer tipo de experiência, desde jogos simples até mundos complexos.'
    },
    {
      termo: 'Scripts',
      descricao: 'Código de programação que controla comportamentos, interações e funcionalidades dentro de uma experiência no Roblox.'
    },
    {
      termo: 'Segurança digital',
      descricao: 'Práticas e conhecimentos para manter-se seguro no ambiente online, protegendo informações pessoais e evitando riscos.'
    },
    {
      termo: 'Submissão',
      descricao: 'Entrega oficial do projeto criado através do formulário da Jam, incluindo link, descrição e responsabilidades da equipe.'
    },
    {
      termo: 'Termos de Uso do Roblox',
      descricao: 'Regras e diretrizes estabelecidas pela plataforma Roblox que todos os usuários devem seguir ao usar a plataforma.'
    },
    {
      termo: 'Tempo de tela',
      descricao: 'Tempo gasto em frente a telas e dispositivos. A Expedição transforma esse tempo em aprendizado produtivo.'
    },
    {
      termo: 'Toolbox',
      descricao: 'Biblioteca de recursos do Roblox Studio que contém modelos, sons e scripts prontos que podem ser usados gratuitamente.'
    },
    {
      termo: 'Trilha',
      descricao: 'Caminho de aprendizado organizado por níveis de dificuldade, incluindo Mochilão (iniciante), Acampamento (intermediário) e Sobrevivência (avançado).'
    },
    {
      termo: 'Trusted Connection',
      descricao: 'Vínculo seguro entre duas contas Roblox que informa à plataforma que essas pessoas se conhecem na vida real, permitindo interação mesmo entre faixas etárias diferentes.'
    },
    {
      termo: 'Unlisted',
      descricao: 'Experiência publicada no Roblox que não aparece nas buscas públicas, sendo acessível apenas através de link direto.'
    },
    {
      termo: 'Username',
      descricao: 'Nome de usuário único na plataforma Roblox, usado para identificação e login na conta.'
    },
  return (
    <section className="glossario-section">
      <div className="glossario-container">
        <div className={`glossario-accordion-item ${isOpen ? 'glossario-accordion-open' : ''}`}>
          <button
            className="glossario-accordion-header"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="glossario-title-wrapper">
              <span className="glossario-accordion-title">{config?.glossario?.title || 'Glossário'}</span>
              <span className="glossario-accordion-subtitle">{config?.glossario?.subtitle || 'Dicionário das expressões da Expedição Roblox'}</span>
            </div>
            <span className="glossario-accordion-arrow">{isOpen ? '−' : '+'}</span>
          </button>
          {isOpen && (
            <div className="glossario-accordion-content">
              <div className="glossario-list">
                {termos.map((item, index) => (
                  <div key={index} className="glossario-item">
                    <dt className="glossario-termo">{item.termo}</dt>
                    <dd className="glossario-descricao">{item.descricao}</dd>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default GlossarioSection

