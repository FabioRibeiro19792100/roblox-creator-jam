import { useState, useContext } from 'react'
import { ContactModalContext } from '../App'
import './PlaceholderSection.css'

function PlaceholderSection() {
  const [isOpen, setIsOpen] = useState(false)
  const { openContactModal } = useContext(ContactModalContext) || { openContactModal: () => {} }

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section id="placeholder" className={`placeholder-section ${isOpen ? 'manifesto-open' : ''}`}>
      <div className="placeholder-container">
        <div className={`placeholder-accordion-item ${isOpen ? 'placeholder-open' : ''}`}>
          <button
            className="placeholder-header"
            onClick={toggleAccordion}
            aria-expanded={isOpen}
          >
            <span className="placeholder-title-text">E o jogo agora é seu.</span>
            <span className="placeholder-arrow">{isOpen ? '−' : '+'}</span>
          </button>
          {isOpen && (
            <div className="placeholder-content">
              <div className="placeholder-manifesto">
                <div className="placeholder-manifesto-column">
                  <p>Nós somos a Mastertech, uma escola de inovação e de ensino de tecnologias, e estamos lançando um novo projeto.</p>
                  
                  <p>Ao longo de 2026 vamos liderar experiências no Roblox Studio que estimulam imaginação, criação e descoberta, fortalecendo habilidades criativas em um ambiente divertido e seguro.</p>
                  
                  <p>O projeto reúne trilhas formativas para jovens e educadores explorarem conceitos educacionais por meio da criação, além de imersões que revelam as possibilidades dos jogos digitais como laboratório de aprendizado sobre novas tecnologias.</p>
                  
                  <p>A Expedição, realizada em parceria com a Roblox, é uma iniciativa nacional aberta a todos e sem pré-requisitos, com atividades quase totalmente online.</p>
                  
                  <p>Sim, quase. Porque teremos também eventos presenciais em seis capitais brasileiras.</p>
                </div>
                <div className="placeholder-manifesto-column">
                  <p>Nesses encontros vamos reunir pais, responsáveis e jovens criativos para construir ambientes que ampliem a noção de segurança digital e que sejam divertidos e significativos como experiência de aprendizado.</p>
                  
                  <p>Quer criar com a gente?</p>
                  
                  <p>Desce pro play.</p>
                  
                  <p>Afinal, você pode aprender tudo o que quiser em uma escola que flui.</p>
                  
                  <div className="placeholder-manifesto-cta">
                    <button className="placeholder-manifesto-button" onClick={openContactModal}>
                      Quero saber mais
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PlaceholderSection

