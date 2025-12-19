import { useState, useContext, useEffect, useRef } from 'react'
import { NavigationContext } from '../App'
import './QuerCriarSection.css'

const CASCADE_DURATION_MS = 3000

const trilhasData = [
  {
    id: 'trilha-card-01',
    label: 'APRENDIZADO',
    title: 'Aprenda Roblox Studio do zero em nossas trilhas de conteúdos',
    description:
      'Baixe o plugin exclusivo da Mastertech para fazer suas primeiras criações e aprender de um jeito diferente. '
  },
  {
    id: 'trilha-card-02',
    label: 'PRÁTICA',
    title: 'Inscreva-se numa jam e crie experiências jogáveis de verdade',
    description:
      'Participe de Game Jams onde você desenvolve experiências completas em 72 horas, trabalhando em equipe e criando projetos reais para o Roblox.'
  },
  {
    id: 'trilha-card-03',
    label: 'VIVÊNCIA',
    title: 'Participe da imersão presencial em um evento na sua capital.',
    description: 'Consulte em breve o calendário do Expedição Roblox na Estrada para eventos presenciais na sua cidade.'
  }
]

function TrilhaCard({ card, action, index, totalCards, navigateTo }) {
  const ref = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasAnimated])

  const handleClick = (event) => {
    event.preventDefault()
    action(navigateTo)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action(navigateTo)
    }
  }

  const delay = totalCards ? (CASCADE_DURATION_MS / totalCards) * index : 0

  return (
    <div
      ref={ref}
      className={`trilha-card ${hasAnimated ? 'trilha-card--visible' : ''}`}
      style={hasAnimated ? { '--flip-delay': `${delay}ms` } : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${card.label} - ${card.title}`}
    >
      <div className="trilha-card-label-wrapper">
        <span className="trilha-card-label">{card.label}</span>
      </div>
      <div className="trilha-card-content">
        <h4 className="trilha-card-title">{card.title}</h4>
        <p className="trilha-card-description">{card.description}</p>
      </div>
    </div>
  )
}

function QuerCriarSection() {
  const { navigateTo } = useContext(NavigationContext) || { navigateTo: () => {} }

  const handleCardActions = [
    (navigate) => {
      navigate('biblioteca')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    (navigate) => {
      navigate('jam')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    (navigate) => {
      navigate('expedicao-na-estrada')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  ]

  return (
    <div style={{ overflow: 'visible', position: 'relative' }}>
      <section id="quer-criar" className="quer-criar-section">
        <div className="quer-criar-container">
          <h3 className="quer-criar-trilhas-title">Escolha uma das trilhas</h3>
          <div className="quer-criar-cards">
            {trilhasData.map((card, index) => (
              <TrilhaCard
                key={card.id}
                card={card}
                action={handleCardActions[index]}
                index={index}
                totalCards={trilhasData.length}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default QuerCriarSection

