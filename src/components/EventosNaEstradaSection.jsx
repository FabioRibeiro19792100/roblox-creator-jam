import { useState, useContext } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import { InscricaoModalContext } from '../App'
import { enviarConviteAmigo } from '../services/emailService'
import InscricaoModal from './InscricaoModal'
import './EventosNaEstradaSection.css'

function EventosNaEstradaSection() {
  const config = useSiteConfig()
  const { openInscricaoModal } = useContext(InscricaoModalContext) || { openInscricaoModal: () => {} }
  const expedicaoNaEstrada = config?.expedicaoNaEstrada || {}
  const eventos = expedicaoNaEstrada?.eventos || []
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [eventoSelecionado, setEventoSelecionado] = useState(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYouModal, setShowThankYouModal] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEventoSelecionado(null)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleInviteSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setError('Campo obrigatório')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email inválido')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const result = await enviarConviteAmigo(email)

      if (result.success) {
        setEmail('')
        setShowThankYouModal(true)
      } else {
        setError('Erro ao enviar convite. Tente novamente.')
      }
    } catch (err) {
      console.error('Erro ao enviar convite:', err)
      setError('Erro ao enviar convite. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
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
        <h2 className="eventos-na-estrada-title">Eventos na estrada</h2>
        <div className="eventos-na-estrada-grid">
          {eventosData.map((evento, index) => (
            <div key={evento.id} className="eventos-na-estrada-card">
              <div className="eventos-na-estrada-header">
                <h3 className="eventos-na-estrada-cidade">{evento.cidade}</h3>
                <p className="eventos-na-estrada-data">{evento.data}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="eventos-na-estrada-convite">
          <h3 className="eventos-na-estrada-convite-title">Quero saber mais</h3>
          <p className="eventos-na-estrada-convite-description">
            Fique por dentro da programação do Expedição Roblox na Estrada
          </p>
          <form className="eventos-na-estrada-convite-form" onSubmit={handleInviteSubmit}>
            <div className="eventos-na-estrada-convite-form-row">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`eventos-na-estrada-convite-input ${error ? 'error' : ''}`}
                placeholder="Email"
              />
              <button
                type="submit"
                className="eventos-na-estrada-convite-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Confirmar interesse'}
              </button>
            </div>
            {error && <span className="eventos-na-estrada-convite-error">{error}</span>}
          </form>
        </div>
      </div>
      
      {showThankYouModal && (
        <div 
          className="eventos-na-estrada-thank-you-overlay"
          onClick={() => setShowThankYouModal(false)}
        >
          <div 
            className="eventos-na-estrada-thank-you-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="eventos-na-estrada-thank-you-close"
              onClick={() => setShowThankYouModal(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h3 className="eventos-na-estrada-thank-you-title">Obrigado!</h3>
            <p className="eventos-na-estrada-thank-you-message">
              Seu interesse foi registado, em breve faremos contato. Enquanto isso, já vai baixando o Roblox Studios.
            </p>
          </div>
        </div>
      )}
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

