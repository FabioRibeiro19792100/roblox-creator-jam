import { useEffect, useRef } from 'react'
import './QuerCriarTitleSection.css'

function QuerCriarTitleSection() {
  const ctaButtonRef = useRef(null)
  const ctaTextRefs = useRef([])

  const setCtaTextRef = (index) => (el) => {
    ctaTextRefs.current[index] = el
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const updateWidth = () => {
      if (!ctaButtonRef.current) return
      const widths = ctaTextRefs.current.filter(Boolean).map((el) => el.scrollWidth)
      if (!widths.length) return
      const widest = Math.max(...widths)
      ctaButtonRef.current.style.minWidth = `${Math.ceil(widest) + 32}px`
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (
    <section id="quer-criar-title" className="quer-criar-title-section">
      <div className="quer-criar-title-container">
        <h2 className="quer-criar-title-title">
          <span className="quer-criar-title-line-1">Quer criar</span>
          <span className="quer-criar-title-line-2">com a gente?</span>
        </h2>
        <div className="quer-criar-title-subtitle header-cta-button btn-12" ref={ctaButtonRef}>
          <span className="quer-criar-title-label">Quer criar?</span>
          <a 
            href="#expedicao-roblox" 
            className="header-cta-link"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('expedicao-roblox')
            }}
          >
            <span ref={setCtaTextRef(0)}>Quer criar? Desce pro play.</span>
            <span ref={setCtaTextRef(1)}>Quer criar? Desce pro play.</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default QuerCriarTitleSection
