import { useState } from 'react'
import TrilhasPopup from './TrilhasPopup'
import './QuerCriarTitleSection.css'

function QuerCriarTitleSection() {
  const [isTrilhasPopupOpen, setIsTrilhasPopupOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = document.querySelector('.header-nav')?.offsetHeight || 60
      const proximosEventosSection = document.querySelector('.proximos-eventos-section')
      const proximosEventosHeight = proximosEventosSection && !proximosEventosSection.classList.contains('hidden') 
        ? proximosEventosSection.offsetHeight 
        : 0
      const extraOffset = -20 // Espaço de um dedo abaixo do início da layer
      const totalOffset = headerHeight + proximosEventosHeight + extraOffset
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - totalOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleDesceProPlayClick = (e) => {
    e.preventDefault()
    setIsTrilhasPopupOpen(true)
  }

  const handleSelectTrilha = (trilhaId) => {
    // Aqui você pode adicionar lógica para redirecionar ou abrir formulário baseado na trilha escolhida
    console.log('Trilha selecionada:', trilhaId)
    // Por exemplo, redirecionar para a seção correspondente ou abrir um formulário
    if (trilhaId === 'trilha-01') {
      scrollToSection('expedicao-roblox')
    } else if (trilhaId === 'trilha-02') {
      // Redirecionar para página da jam ou seção correspondente
      window.location.hash = '#jam'
      window.location.reload()
    } else if (trilhaId === 'trilha-03') {
      // Redirecionar para seção de eventos ou calendário
      scrollToSection('expedicao-roblox')
    }
  }

  return (
    <>
      <section id="quer-criar-title" className="quer-criar-title-section">
        <div className="quer-criar-title-container">
          <h2 className="quer-criar-title-title">
            <span className="quer-criar-title-line-1">Quer criar</span>
            <span className="quer-criar-title-line-2">com a gente?</span>
          </h2>
          <a 
            href="#expedicao-roblox" 
            className="quer-criar-title-subtitle"
            onClick={handleDesceProPlayClick}
          >
            Desce pro play.
          </a>
        </div>
      </section>
      <TrilhasPopup 
        isOpen={isTrilhasPopupOpen}
        onClose={() => setIsTrilhasPopupOpen(false)}
        onSelectTrilha={handleSelectTrilha}
      />
    </>
  )
}

export default QuerCriarTitleSection

