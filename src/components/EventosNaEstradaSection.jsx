import { useRef, useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import InscricaoModal from './InscricaoModal'
import './EventosNaEstradaSection.css'

function EventosNaEstradaSection() {
  const config = useSiteConfig()
  const expedicaoNaEstrada = config?.expedicaoNaEstrada || {}
  const eventos = expedicaoNaEstrada?.eventos || []
  const gridRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [eventoSelecionado, setEventoSelecionado] = useState(null)

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const handleCtaClick = (evento) => {
    setEventoSelecionado(evento)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEventoSelecionado(null)
  }
  
  // Fallback com 6 eventos se não houver dados
  const eventosData = eventos.length > 0 ? eventos : [
    {
      id: 'rio-de-janeiro',
      cidade: 'Rio de Janeiro',
      data: '11 de abril de 2026',
      local: {
        nome: 'Local a definir',
        endereco: ''
      },
      sessoes: [
        {
          id: 'sessao-1',
          nome: 'Inscreva-se na sessão 1',
          horario: 'Das 09h às 13hs'
        },
        {
          id: 'sessao-2',
          nome: 'Inscreva-se na sessão 2',
          horario: 'Das 09h às 13hs'
        }
      ]
    },
    {
      id: 'sao-paulo',
      cidade: 'São Paulo',
      data: '05 de maio de 2026',
      local: {
        nome: 'Local a definir',
        endereco: ''
      },
      sessoes: [
        {
          id: 'sessao-1',
          nome: 'Inscreva-se na sessão 1',
          horario: 'Das 09h às 13hs'
        },
        {
          id: 'sessao-2',
          nome: 'Inscreva-se na sessão 2',
          horario: 'Das 09h às 13hs'
        }
      ]
    },
    {
      id: 'recife',
      cidade: 'Recife',
      data: '26 de setembro de 2026',
      local: {
        nome: 'Local a definir',
        endereco: ''
      },
      sessoes: [
        {
          id: 'sessao-1',
          nome: 'Inscreva-se na sessão 1',
          horario: 'Das 09h às 13hs'
        },
        {
          id: 'sessao-2',
          nome: 'Inscreva-se na sessão 2',
          horario: 'Das 09h às 13hs'
        }
      ]
    },
    {
      id: 'belo-horizonte',
      cidade: 'Manaus',
      data: '22 de agosto de 2026',
      local: {
        nome: 'Local a definir',
        endereco: ''
      },
      sessoes: [
        {
          id: 'sessao-1',
          nome: 'Inscreva-se na sessão 1',
          horario: 'Das 09h às 13hs'
        },
        {
          id: 'sessao-2',
          nome: 'Inscreva-se na sessão 2',
          horario: 'Das 09h às 13hs'
        }
      ]
    },
    {
      id: 'brasilia',
      cidade: 'Brasília',
      data: '30 de maio de 2026',
      local: {
        nome: 'Local a definir',
        endereco: ''
      },
      sessoes: [
        {
          id: 'sessao-1',
          nome: 'Inscreva-se na sessão 1',
          horario: 'Das 09h às 13hs'
        },
        {
          id: 'sessao-2',
          nome: 'Inscreva-se na sessão 2',
          horario: 'Das 09h às 13hs'
        }
      ]
    },
    {
      id: 'curitiba',
      cidade: 'Porto Alegre',
      data: '17 de outubro de 2026',
      local: {
        nome: 'Local a definir',
        endereco: ''
      },
      sessoes: [
        {
          id: 'sessao-1',
          nome: 'Inscreva-se na sessão 1',
          horario: 'Das 09h às 13hs'
        },
        {
          id: 'sessao-2',
          nome: 'Inscreva-se na sessão 2',
          horario: 'Das 09h às 13hs'
        }
      ]
    }
  ]

  return (
    <section id="eventos-na-estrada" className="eventos-na-estrada-section">
      <div className="eventos-na-estrada-container">
        <div className="eventos-na-estrada-section-header">
          <h2 className="eventos-na-estrada-title">Eventos na estrada</h2>
          <div className="eventos-na-estrada-controls">
            <button 
              className="eventos-na-estrada-scroll-btn eventos-na-estrada-scroll-left"
              onClick={scrollLeft}
              aria-label="Rolar para esquerda"
            >
              ‹
            </button>
            <button 
              className="eventos-na-estrada-scroll-btn eventos-na-estrada-scroll-right"
              onClick={scrollRight}
              aria-label="Rolar para direita"
            >
              ›
            </button>
          </div>
        </div>
        
        <div className="eventos-na-estrada-grid-wrapper" ref={gridRef}>
          <div className="eventos-na-estrada-grid">
            {eventosData.map((evento, index) => (
              <div key={evento.id} className={`eventos-na-estrada-card ${index === 0 ? 'eventos-na-estrada-card-first' : ''}`}>
                <div className="eventos-na-estrada-header">
                  <h3 className="eventos-na-estrada-cidade">{evento.cidade}</h3>
                  <p className="eventos-na-estrada-data">{evento.data}</p>
                </div>
                <button 
                  className="eventos-na-estrada-cta"
                  onClick={() => handleCtaClick(evento)}
                >
                  Deixar nome na lista
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <InscricaoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tipoInscricao="estrada"
        eventoSelecionado={eventoSelecionado}
        eventosDisponiveis={eventosData}
      />
    </section>
  )
}

export default EventosNaEstradaSection

