import { useState } from 'react'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="header-nav">
      <div className="header-container">
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li>
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero') }}>
                Início
              </a>
            </li>
            <li>
              <a href="#como-participar" onClick={(e) => { e.preventDefault(); scrollToSection('como-participar') }}>
                Como Participar
              </a>
            </li>
            <li>
              <a href="#regras-pareamento" onClick={(e) => { e.preventDefault(); scrollToSection('regras-pareamento') }}>
                Regras
              </a>
            </li>
            <li>
              <a href="#escolha-tema" onClick={(e) => { e.preventDefault(); scrollToSection('escolha-tema') }}>
                Temas
              </a>
            </li>
            <li>
              <a href="#trusted-connection" onClick={(e) => { e.preventDefault(); scrollToSection('trusted-connection') }}>
                Trusted Connection
              </a>
            </li>
            <li>
              <a href="#desafio-jam" onClick={(e) => { e.preventDefault(); scrollToSection('desafio-jam') }}>
                Desafio
              </a>
            </li>
            <li>
              <a href="#regras-jam" onClick={(e) => { e.preventDefault(); scrollToSection('regras-jam') }}>
                Regras
              </a>
            </li>
            <li>
              <a href="#entrega-desafio" onClick={(e) => { e.preventDefault(); scrollToSection('entrega-desafio') }}>
                Entrega
              </a>
            </li>
            <li>
              <a href="#premiacao" onClick={(e) => { e.preventDefault(); scrollToSection('premiacao') }}>
                Premiação
              </a>
            </li>
            <li>
              <a href="#datas-canais" onClick={(e) => { e.preventDefault(); scrollToSection('datas-canais') }}>
                Datas e Canais
              </a>
            </li>
          </ul>
        </nav>

        <button 
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  )
}

export default Header

