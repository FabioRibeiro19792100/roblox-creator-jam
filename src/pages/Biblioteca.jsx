import { useState, useRef, useEffect } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import Header from '../components/Header'
import BibliotecaHeroSection from '../components/BibliotecaHeroSection'
import FooterSection from '../components/FooterSection'
import EmailGatePopup from '../components/EmailGatePopup'
import './Biblioteca.css'

function Biblioteca() {
  const config = useSiteConfig()
  const [selectedPublico, setSelectedPublico] = useState(null) // null, 'criadores', 'educadores', 'pais'
  const [isEmailGateOpen, setIsEmailGateOpen] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const mochilaoRef = useRef(null)
  const acampamentoRef = useRef(null)
  const sobrevivenciaRef = useRef(null)
  const tutorialRef = useRef(null)

  const handlePublicoSelect = (publico) => {
    setSelectedPublico(publico)
    // Após selecionar persona, abrir email gate
    setIsEmailGateOpen(true)
  }

  const handleEmailSubmitted = (email) => {
    setHasAccess(true)
    setIsEmailGateOpen(false)
  }

  // Usar trilhas do público selecionado do siteConfig
  const trilhas = selectedPublico ? config?.biblioteca?.publicos?.[selectedPublico]?.trilhas : null
  const publicos = config?.biblioteca?.publicos || {}

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const handleDownload = (pdf, e) => {
    e.preventDefault()
    e.stopPropagation()
    const link = document.createElement('a')
    link.href = pdf
    link.download = pdf.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = (platform, conteudo, e) => {
    e.preventDefault()
    e.stopPropagation()
    const url = window.location.href
    const text = `Confira este conteúdo: ${conteudo.titulo}`
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
        break
      case 'instagram':
        // Instagram não permite compartilhamento direto via URL, então copia o link
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            alert('Link copiado! Cole no Instagram.')
          })
        } else {
          // Fallback para navegadores antigos
          const textArea = document.createElement('textarea')
          textArea.value = url
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          alert('Link copiado! Cole no Instagram.')
        }
        break
      case 'tiktok':
        // TikTok também não permite compartilhamento direto, copia o link
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            alert('Link copiado! Cole no TikTok.')
          })
        } else {
          const textArea = document.createElement('textarea')
          textArea.value = url
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          alert('Link copiado! Cole no TikTok.')
        }
        break
      case 'copy':
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            alert('Link copiado!')
          })
        } else {
          const textArea = document.createElement('textarea')
          textArea.value = url
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          alert('Link copiado!')
        }
        break
      default:
        break
    }
  }

  return (
    <div className="app biblioteca-page">
      <Header />
      <BibliotecaHeroSection />
      
      {!selectedPublico ? (
        // Tela de seleção de persona (primeiro passo)
        <div className="biblioteca-selecao-container">
          <div className="biblioteca-selecao-cards">
            {Object.entries(publicos).map(([key, publico]) => (
              <div
                key={key}
                className="biblioteca-selecao-card"
                onClick={() => handlePublicoSelect(key)}
              >
                <span className="biblioteca-badge-em-breve">EM BREVE</span>
                <div className="biblioteca-selecao-card-content">
                  <h3 className="biblioteca-selecao-card-title">{publico.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !hasAccess ? (
        // Email gate (segundo passo - após selecionar persona)
        <>
          <EmailGatePopup 
            onEmailSubmitted={handleEmailSubmitted}
            onClose={() => {
              // Se fechar sem cadastrar, volta para seleção de persona
              setSelectedPublico(null)
              setIsEmailGateOpen(false)
            }}
          />
        </>
      ) : (
        // Área logada com trilhas (terceiro passo)
        <div className="biblioteca-container">
          <div className="biblioteca-voltar-wrapper">
            <button 
              className="biblioteca-voltar-btn"
              onClick={() => {
                setSelectedPublico(null)
                setHasAccess(false)
              }}
            >
              ← Voltar para seleção
            </button>
          </div>
        {/* Trilha Tutorial Roblox Studios */}
        <section id="biblioteca-tutorial" className="biblioteca-section biblioteca-section-tutorial">
          <div className="biblioteca-section-header">
            <span className="biblioteca-section-label">CONTEÚDOS</span>
            <h2 className="biblioteca-section-title">{trilhas.tutorial.nome}</h2>
            <div className="biblioteca-section-controls">
              <button 
                className="biblioteca-scroll-btn biblioteca-scroll-left"
                onClick={() => scrollLeft(tutorialRef)}
                aria-label="Rolar para esquerda"
              >
                ‹
              </button>
              <button 
                className="biblioteca-scroll-btn biblioteca-scroll-right"
                onClick={() => scrollRight(tutorialRef)}
                aria-label="Rolar para direita"
              >
                ›
              </button>
            </div>
          </div>
          <div className="biblioteca-row" ref={tutorialRef}>
            {trilhas.tutorial.conteudos.map((conteudo) => (
              <div 
                key={conteudo.id} 
                className="biblioteca-card"
              >
                <div className="biblioteca-card-image">
                  <img src={conteudo.imagem} alt={conteudo.titulo} />
                  <div className="biblioteca-card-overlay">
                    <div className="biblioteca-card-actions">
                      <button 
                        className="biblioteca-action-btn biblioteca-download-btn"
                        onClick={(e) => handleDownload(conteudo.pdf, e)}
                        title="Baixar PDF"
                        type="button"
                      >
                      </button>
                      <div className="biblioteca-share-buttons">
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('whatsapp', conteudo, e)}
                          title="Compartilhar no WhatsApp"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('instagram', conteudo, e)}
                          title="Compartilhar no Instagram"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('tiktok', conteudo, e)}
                          title="Compartilhar no TikTok"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('copy', conteudo, e)}
                          title="Copiar link"
                          type="button"
                        >
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="biblioteca-card-content">
                  <h3 className="biblioteca-card-title">{conteudo.titulo}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trilha Mochilão */}
        <section id="biblioteca-mochilao" className="biblioteca-section biblioteca-section-mochilao">
          <div className="biblioteca-section-header">
            <span className="biblioteca-section-label">CONTEÚDOS</span>
            <h2 className="biblioteca-section-title">{trilhas.mochilao.nome}</h2>
            <div className="biblioteca-section-controls">
              <button 
                className="biblioteca-scroll-btn biblioteca-scroll-left"
                onClick={() => scrollLeft(mochilaoRef)}
                aria-label="Rolar para esquerda"
              >
                ‹
              </button>
              <button 
                className="biblioteca-scroll-btn biblioteca-scroll-right"
                onClick={() => scrollRight(mochilaoRef)}
                aria-label="Rolar para direita"
              >
                ›
              </button>
            </div>
          </div>
          <div className="biblioteca-row" ref={mochilaoRef}>
            {trilhas.mochilao.conteudos.map((conteudo) => (
              <div 
                key={conteudo.id} 
                className="biblioteca-card"
              >
                <div className="biblioteca-card-image">
                  <img src={conteudo.imagem} alt={conteudo.titulo} />
                  <div className="biblioteca-card-overlay">
                    <div className="biblioteca-card-actions">
                      <button 
                        className="biblioteca-action-btn biblioteca-download-btn"
                        onClick={(e) => handleDownload(conteudo.pdf, e)}
                        title="Baixar PDF"
                        type="button"
                      >
                      </button>
                      <div className="biblioteca-share-buttons">
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('whatsapp', conteudo, e)}
                          title="Compartilhar no WhatsApp"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('instagram', conteudo, e)}
                          title="Compartilhar no Instagram"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('tiktok', conteudo, e)}
                          title="Compartilhar no TikTok"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('copy', conteudo, e)}
                          title="Copiar link"
                          type="button"
                        >
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="biblioteca-card-content">
                  <h3 className="biblioteca-card-title">{conteudo.titulo}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trilha Acampamento */}
        <section id="biblioteca-acampamento" className="biblioteca-section biblioteca-section-acampamento">
          <div className="biblioteca-section-header">
            <span className="biblioteca-section-label">CONTEÚDOS</span>
            <h2 className="biblioteca-section-title">{trilhas.acampamento.nome}</h2>
            <div className="biblioteca-section-controls">
              <button 
                className="biblioteca-scroll-btn biblioteca-scroll-left"
                onClick={() => scrollLeft(acampamentoRef)}
                aria-label="Rolar para esquerda"
              >
                ‹
              </button>
              <button 
                className="biblioteca-scroll-btn biblioteca-scroll-right"
                onClick={() => scrollRight(acampamentoRef)}
                aria-label="Rolar para direita"
              >
                ›
              </button>
            </div>
          </div>
          <div className="biblioteca-row" ref={acampamentoRef}>
            {trilhas.acampamento.conteudos.map((conteudo) => (
              <div 
                key={conteudo.id} 
                className="biblioteca-card"
              >
                <div className="biblioteca-card-image">
                  <img src={conteudo.imagem} alt={conteudo.titulo} />
                  <div className="biblioteca-card-overlay">
                    <div className="biblioteca-card-actions">
                      <button 
                        className="biblioteca-action-btn biblioteca-download-btn"
                        onClick={(e) => handleDownload(conteudo.pdf, e)}
                        title="Baixar PDF"
                        type="button"
                      >
                      </button>
                      <div className="biblioteca-share-buttons">
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('whatsapp', conteudo, e)}
                          title="Compartilhar no WhatsApp"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('instagram', conteudo, e)}
                          title="Compartilhar no Instagram"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('tiktok', conteudo, e)}
                          title="Compartilhar no TikTok"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('copy', conteudo, e)}
                          title="Copiar link"
                          type="button"
                        >
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="biblioteca-card-content">
                  <h3 className="biblioteca-card-title">{conteudo.titulo}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trilha Sobrevivência */}
        <section id="biblioteca-sobrevivencia" className="biblioteca-section biblioteca-section-sobrevivencia">
          <div className="biblioteca-section-header">
            <span className="biblioteca-section-label">CONTEÚDOS</span>
            <h2 className="biblioteca-section-title">{trilhas.sobrevivencia.nome}</h2>
            <div className="biblioteca-section-controls">
              <button 
                className="biblioteca-scroll-btn biblioteca-scroll-left"
                onClick={() => scrollLeft(sobrevivenciaRef)}
                aria-label="Rolar para esquerda"
              >
                ‹
              </button>
              <button 
                className="biblioteca-scroll-btn biblioteca-scroll-right"
                onClick={() => scrollRight(sobrevivenciaRef)}
                aria-label="Rolar para direita"
              >
                ›
              </button>
            </div>
          </div>
          <div className="biblioteca-row" ref={sobrevivenciaRef}>
            {trilhas.sobrevivencia.conteudos.map((conteudo) => (
              <div 
                key={conteudo.id} 
                className="biblioteca-card"
              >
                <div className="biblioteca-card-image">
                  <img src={conteudo.imagem} alt={conteudo.titulo} />
                  <div className="biblioteca-card-overlay">
                    <div className="biblioteca-card-actions">
                      <button 
                        className="biblioteca-action-btn biblioteca-download-btn"
                        onClick={(e) => handleDownload(conteudo.pdf, e)}
                        title="Baixar PDF"
                        type="button"
                      >
                      </button>
                      <div className="biblioteca-share-buttons">
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('whatsapp', conteudo, e)}
                          title="Compartilhar no WhatsApp"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('instagram', conteudo, e)}
                          title="Compartilhar no Instagram"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('tiktok', conteudo, e)}
                          title="Compartilhar no TikTok"
                          type="button"
                        >
                        </button>
                        <button 
                          className="biblioteca-action-btn biblioteca-share-btn"
                          onClick={(e) => handleShare('copy', conteudo, e)}
                          title="Copiar link"
                          type="button"
                        >
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="biblioteca-card-content">
                  <h3 className="biblioteca-card-title">{conteudo.titulo}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
        </div>
      )}
      
      <FooterSection />
    </div>
  )
}

export default Biblioteca

