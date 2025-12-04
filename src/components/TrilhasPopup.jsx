import './TrilhasPopup.css'

function TrilhasPopup({ isOpen, onClose, onSelectTrilha }) {
  if (!isOpen) return null

  const trilhas = [
    {
      id: 'trilha-01',
      numero: 'TRILHA 01',
      titulo: 'Aprenda Roblox Studio do zero em nossas trilhas de conteúdos',
      descricao: 'As trilhas misturam curso online, desafios mensais e eventos ao vivo pra transformar tempo de tela em portfólio, segurança digital e histórias que você assina com seu nome.'
    },
    {
      id: 'trilha-02',
      numero: 'TRILHA 02',
      titulo: 'Inscreva-se numa jam e crie experiências jogáveis de verdade;',
      descricao: 'Participe de Game Jams onde você desenvolve experiências completas em 72 horas, trabalhando em equipe e criando projetos reais para o Roblox.'
    },
    {
      id: 'trilha-03',
      numero: 'TRILHA 03',
      titulo: 'Participe da imersão presencial em um evento na sua capital.',
      descricao: 'Consulte em breve o calendário do Expedição Roblox na Estrada para eventos presenciais na sua cidade.'
    }
  ]

  const handleCardClick = (trilhaId) => {
    if (onSelectTrilha) {
      onSelectTrilha(trilhaId)
    }
    onClose()
  }

  return (
    <div 
      className="trilhas-popup-overlay"
      onClick={onClose}
    >
      <div 
        className="trilhas-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="trilhas-popup-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <h3 className="trilhas-popup-title">Escolha uma das trilhas</h3>
        <ul className="trilhas-popup-list">
          {trilhas.map((trilha) => (
            <li key={trilha.id}>
              <a 
                href="#"
                className="trilhas-popup-link"
                onClick={(e) => {
                  e.preventDefault()
                  handleCardClick(trilha.id)
                }}
              >
                <span className="trilhas-popup-arrow">→</span>
                <span className="trilhas-popup-link-text">{trilha.titulo}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TrilhasPopup

