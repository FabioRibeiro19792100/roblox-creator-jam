import { useState, useContext, useEffect, useRef } from 'react'
import { MaterialModalContext, NavigationContext } from '../App'
import { useSiteConfig } from '../config/useSiteConfig'
import ConvideSeusAmigosSection from './ConvideSeusAmigosSection'
import ContactPopup from './ContactPopup'
import FAQPopup from './FAQPopup'
import GlossarioSection from './GlossarioSection'
import './FooterSection.css'

const CASCADE_DURATION_MS = 3000

const footerCardsData = [
  {
    id: 'footer-card-trilha-01',
    label: 'TRILHA 01',
    title: 'Aprenda Roblox Studio do zero em nossas trilhas de conteúdos',
    description:
      'As trilhas misturam curso online, desafios mensais e eventos ao vivo pra transformar tempo de tela em portfólio, segurança digital e histórias que você assina com seu nome.'
  },
  {
    id: 'footer-card-trilha-02',
    label: 'TRILHA 02',
    title: 'Inscreva-se numa jam e crie experiências jogáveis de verdade;',
    description:
      'Participe de Game Jams onde você desenvolve experiências completas em 72 horas, trabalhando em equipe e criando projetos reais para o Roblox.'
  },
  {
    id: 'footer-card-trilha-03',
    label: 'TRILHA 03',
    title: 'Participe da imersão presencial em um evento na sua capital.',
    description: 'Consulte em breve o calendário do Expedição Roblox na Estrada para eventos presenciais na sua cidade.'
  }
]

function FooterCard({ card, action, index, totalCards, setContactOpen, navigateTo }) {
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
    action(setContactOpen, navigateTo)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action(setContactOpen, navigateTo)
    }
  }

  const delay = totalCards ? (CASCADE_DURATION_MS / totalCards) * index : 0

  return (
    <div
      ref={ref}
      className={`footer-card ${hasAnimated ? 'footer-card--visible' : ''}`}
      style={hasAnimated ? { '--flip-delay': `${delay}ms` } : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${card.label} - ${card.title}`}
    >
      <div className="footer-card-label-wrapper">
        <span className="footer-card-label">{card.label}</span>
      </div>
      <div className="footer-card-content">
        <h4 className="footer-card-title">{card.title}</h4>
        <p className="footer-card-description">{card.description}</p>
      </div>
    </div>
  )
}

function FooterSection() {
  const config = useSiteConfig()
  const { openMaterialModal } = useContext(MaterialModalContext) || { openMaterialModal: () => {} }
  const { navigateTo } = useContext(NavigationContext) || { navigateTo: () => {} }
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [isFAQPopupOpen, setIsFAQPopupOpen] = useState(false)

  const handleCardActions = [
    (setContactOpen) => setContactOpen(true),
    (_setContactOpen, navigate) => {
      navigate('jam')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    (_setContactOpen, navigate) => {
      navigate('expedicao-na-estrada')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  ]

  const links = [
    {
      text: 'Converse com a Mastertech',
      href: '#',
      onClick: (event) => {
        event.preventDefault()
        setIsContactPopupOpen(true)
      }
    },
    {
      text: 'Perguntas frequentes',
      href: '#',
      onClick: (event) => {
        event.preventDefault()
        setIsFAQPopupOpen(true)
      }
    }
  })) || []
  
  const trilhas = config?.footer?.centralExpedicao?.trilhas || []

  return (
    <section id="footer" className="footer-section">
      <div className="footer-cta">
        <div className="footer-cta-container">
          <div className="footer-title">
            <h1 className="footer-title-roblox">{config?.footer?.cta?.title || 'É pai, tutor ou responsável?'}</h1>
          </div>
          <div className="footer-cta-content">
            <p className="footer-cta-text">
              Temos um material pra você. <br />
              Clique para{' '}
              <button className="footer-link-button" onClick={() => openMaterialModal('download')}>
                baixar
              </button>{' '}
              ou{' '}
              <button className="footer-link-button" onClick={() => openMaterialModal('video')}>
                assista o vídeo
              </button>
            </p>
          </div>
        </div>
      </div>
      <ConvideSeusAmigosSection />
      <div id="footer-container-wrapper" className="footer-container-wrapper">
        <div className="footer-container">
          <h2 className="footer-links-title">{config?.footer?.centralExpedicao?.title || 'Central da Expedição'}</h2>
          <ul className="footer-links">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="footer-link" onClick={link.onClick || (() => {})}>
                  <span className="footer-arrow">→</span>
                  <span className="footer-link-text">{link.text}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="footer-separator" />

          <h3 className="footer-calls-title">Escolha uma das trilhas</h3>

          <div className="footer-cards">
            {footerCardsData.map((card, index) => (
              <FooterCard
                key={card.id}
                card={card}
                action={handleCardActions[index]}
                index={index}
                totalCards={footerCardsData.length}
                setContactOpen={setIsContactPopupOpen}
                navigateTo={navigateTo}
              />
            ))}
          </div>

          <div className="footer-separator" />

          <GlossarioSection />
        </div>
      </div>
      <div className="footer-final">
        <div className="footer-final-container">
          <p className="footer-final-text">Expedição Roblox é um projeto da Mastertech junto com o Roblox</p>
          <div className="footer-final-social">
            <a href="#" className="footer-social-link" aria-label="Instagram">
              Instagram
            </a>
            <a href="#" className="footer-social-link" aria-label="WhatsApp">
              WhatsApp
            </a>
            <a href="#" className="footer-social-link" aria-label="TikTok">
              TikTok
            </a>
          </div>
        </div>
      </div>
      <ContactPopup isOpen={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />
      <FAQPopup isOpen={isFAQPopupOpen} onClose={() => setIsFAQPopupOpen(false)} />
    </section>
  )
}

export default FooterSection
