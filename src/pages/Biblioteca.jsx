import { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import BibliotecaHeroSection from '../components/BibliotecaHeroSection'
import FooterSimplificado from '../components/FooterSimplificado'
import EmailGatePopup from '../components/EmailGatePopup'
import './Biblioteca.css'

function Biblioteca() {
  const [isEmailGateOpen, setIsEmailGateOpen] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const mochilaoRef = useRef(null)
  const acampamentoRef = useRef(null)
  const sobrevivenciaRef = useRef(null)
  const tutorialRef = useRef(null)

  const handleEmailSubmitted = (email) => {
    setHasAccess(true)
    setIsEmailGateOpen(false)
  }

  // Dados de exemplo - serão substituídos pelos conteúdos reais
  const trilhas = {
    mochilao: {
      nome: 'Mochilão',
      conteudos: [
        { id: 1, titulo: 'Concepção do jogo', pdf: '/pdfs/concepcao.pdf', imagem: '/placeholder.jpg' },
        { id: 2, titulo: 'Construção do ambiente', pdf: '/pdfs/construcao.pdf', imagem: '/placeholder.jpg' },
        { id: 3, titulo: 'Criação de personagens', pdf: '/pdfs/personagens.pdf', imagem: '/placeholder.jpg' },
        // Adicione mais conteúdos aqui (mais de 10)
        { id: 4, titulo: 'Conteúdo 4', pdf: '/pdfs/conteudo4.pdf', imagem: '/placeholder.jpg' },
        { id: 5, titulo: 'Conteúdo 5', pdf: '/pdfs/conteudo5.pdf', imagem: '/placeholder.jpg' },
        { id: 6, titulo: 'Conteúdo 6', pdf: '/pdfs/conteudo6.pdf', imagem: '/placeholder.jpg' },
        { id: 7, titulo: 'Conteúdo 7', pdf: '/pdfs/conteudo7.pdf', imagem: '/placeholder.jpg' },
        { id: 8, titulo: 'Conteúdo 8', pdf: '/pdfs/conteudo8.pdf', imagem: '/placeholder.jpg' },
        { id: 9, titulo: 'Conteúdo 9', pdf: '/pdfs/conteudo9.pdf', imagem: '/placeholder.jpg' },
        { id: 10, titulo: 'Conteúdo 10', pdf: '/pdfs/conteudo10.pdf', imagem: '/placeholder.jpg' },
        { id: 11, titulo: 'Conteúdo 11', pdf: '/pdfs/conteudo11.pdf', imagem: '/placeholder.jpg' },
        { id: 12, titulo: 'Conteúdo 12', pdf: '/pdfs/conteudo12.pdf', imagem: '/placeholder.jpg' },
      ]
    },
    acampamento: {
      nome: 'Acampamento',
      conteudos: [
        { id: 1, titulo: 'Criação assistida por IA', pdf: '/pdfs/ia.pdf', imagem: '/placeholder.jpg' },
        { id: 2, titulo: 'Colaboração e co-criação', pdf: '/pdfs/colaboracao.pdf', imagem: '/placeholder.jpg' },
        { id: 3, titulo: 'Teste e depuração', pdf: '/pdfs/teste.pdf', imagem: '/placeholder.jpg' },
        // Adicione mais conteúdos aqui
        { id: 4, titulo: 'Conteúdo 4', pdf: '/pdfs/conteudo4.pdf', imagem: '/placeholder.jpg' },
        { id: 5, titulo: 'Conteúdo 5', pdf: '/pdfs/conteudo5.pdf', imagem: '/placeholder.jpg' },
      ]
    },
    sobrevivencia: {
      nome: 'Sobrevivência',
      conteudos: [
        { id: 1, titulo: 'Publicação e narrativa', pdf: '/pdfs/publicacao.pdf', imagem: '/placeholder.jpg' },
        { id: 2, titulo: 'Reflexão e compartilhamento', pdf: '/pdfs/reflexao.pdf', imagem: '/placeholder.jpg' },
        // Adicione mais conteúdos aqui
        { id: 3, titulo: 'Conteúdo 3', pdf: '/pdfs/conteudo3.pdf', imagem: '/placeholder.jpg' },
      ]
    },
    tutorial: {
      nome: 'Tutorial Roblox Studios',
      conteudos: [
        { id: 1, titulo: 'Tutorial 1', pdf: '/pdfs/tutorial1.pdf', imagem: '/placeholder.jpg' },
        { id: 2, titulo: 'Tutorial 2', pdf: '/pdfs/tutorial2.pdf', imagem: '/placeholder.jpg' },
        { id: 3, titulo: 'Tutorial 3', pdf: '/pdfs/tutorial3.pdf', imagem: '/placeholder.jpg' },
        // Adicione mais conteúdos aqui
        { id: 4, titulo: 'Tutorial 4', pdf: '/pdfs/tutorial4.pdf', imagem: '/placeholder.jpg' },
        { id: 5, titulo: 'Tutorial 5', pdf: '/pdfs/tutorial5.pdf', imagem: '/placeholder.jpg' },
      ]
    }
  }

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

  if (!hasAccess) {
    return (
      <>
        <EmailGatePopup 
          onEmailSubmitted={handleEmailSubmitted}
          onClose={() => {
            // Se fechar sem cadastrar, redireciona para home
            window.location.hash = ''
            window.location.reload()
          }}
        />
      </>
    )
  }

  return (
    <div className="app biblioteca-page">
      <Header />
      <BibliotecaHeroSection />
      
      <div className="biblioteca-container">
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
      
      <FooterSimplificado />
    </div>
  )
}

export default Biblioteca

