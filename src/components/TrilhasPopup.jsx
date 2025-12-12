import { useSiteConfig } from '../config/useSiteConfig'
import './TrilhasPopup.css'

function TrilhasPopup({ isOpen, onClose, onSelectTrilha }) {
  const config = useSiteConfig()
  
  if (!isOpen) return null

  const trilhas = config?.expedicaoRoblox?.trilhas?.map(trilha => ({
    id: trilha.id,
    numero: trilha.label || `TRILHA ${trilha.id?.split('-')[1] || ''}`,
    titulo: trilha.title || '',
    descricao: trilha.description || ''
  })) || []

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
        <h3 className="trilhas-popup-title">{config?.footer?.centralExpedicao?.callsTitle || 'Escolha uma das trilhas'}</h3>
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

