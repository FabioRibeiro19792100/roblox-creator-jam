import { useState, useRef } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import InscricaoModal from './InscricaoModal'
import './EventosNaEstradaSection.css'

function EventosNaEstradaSection() {
  const config = useSiteConfig()
  const expedicaoNaEstrada = config?.expedicaoNaEstrada || {}
  const eventos = expedicaoNaEstrada?.eventos || []
  const [isInscricaoModalOpen, setIsInscricaoModalOpen] = useState(false)
  const [eventoSelecionado, setEventoSelecionado] = useState(null)
  const gridRef = useRef(null)
  
  const handleInscricaoClick = (evento, sessao, e) => {
    e.preventDefault()
    e.stopPropagation()
    setEventoSelecionado({
      id: `${evento.id}-${sessao.id}`,
      cidade: evento.cidade,
      data: evento.data,
      local: evento.local,
      sessaoNome: sessao.nome,
      sessaoHorario: sessao.horario
    })
    setIsInscricaoModalOpen(true)
  }

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
  
  // Fallback com 6 eventos se não houver dados
  const eventosData = eventos.length > 0 ? eventos : [
    {
      id: 'rio-de-janeiro',
      cidade: 'Rio de Janeiro',
      data: '11 de abril de 2026',
      local: {
        nome: 'Senac Candelária',
        endereco: 'Avenida Presidente Vargas, 1500, 2º andar, Centro'
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
        nome: 'Centro de Convenções Anhembi',
        endereco: 'Av. Olavo Fontoura, 1209, Santana, São Paulo - SP, 02012-021'
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
        nome: 'Centro de Convenções de Pernambuco',
        endereco: 'Complexo de Salgadinho, Av. Prof. Andrade Bezerra, s/n, Salgadinho, Olinda - PE'
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
        nome: 'Centro de Convenções Manaus',
        endereco: 'Av. Amazonas, 6200, Gameleira, Manaus - AM'
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
        nome: 'Centro de Convenções Ulysses Guimarães',
        endereco: 'SDC - Eixo Monumental, Lote 05, Asa Norte, Brasília - DF, 70070-350'
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
        nome: 'Fabrica Fundação',
        endereco: 'R. Prof. Pedro Viriato Parigot de Souza, 5300, Campo Comprido, Porto Alegre - RS'
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
            {eventosData.map((evento) => (
              <div key={evento.id} className="eventos-na-estrada-card">
                <div className="eventos-na-estrada-header">
                  <h3 className="eventos-na-estrada-cidade">{evento.cidade}</h3>
                  <p className="eventos-na-estrada-data">{evento.data}</p>
                </div>
                
                <div className="eventos-na-estrada-separator"></div>
                
              <div className="eventos-na-estrada-local">
                <p className="eventos-na-estrada-local-label">Onde:</p>
                <p className="eventos-na-estrada-local-nome">{evento.local?.nome || ''}</p>
                <p className="eventos-na-estrada-local-endereco">{evento.local?.endereco || ''}</p>
              </div>
              
              <div className="eventos-na-estrada-sessoes">
                  {evento.sessoes?.map((sessao) => (
                    <button 
                      key={sessao.id} 
                      className="eventos-na-estrada-sessao-box"
                      onClick={(e) => handleInscricaoClick(evento, sessao, e)}
                    >
                      <p className="eventos-na-estrada-sessao-nome">{sessao.nome}</p>
                      <p className="eventos-na-estrada-sessao-horario">{sessao.horario}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <InscricaoModal 
        isOpen={isInscricaoModalOpen} 
        onClose={() => {
          setIsInscricaoModalOpen(false)
          setEventoSelecionado(null)
        }}
        tipoInscricao="estrada"
        eventoSelecionado={eventoSelecionado}
        eventosDisponiveis={eventosData}
      />
    </section>
  )
}

export default EventosNaEstradaSection

