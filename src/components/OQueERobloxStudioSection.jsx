import { useState } from 'react'
import './OQueERobloxStudioSection.css'

function OQueERobloxStudioSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const openVideo = () => {
    setIsVideoOpen(true)
  }

  const closeVideo = () => {
    setIsVideoOpen(false)
  }

  return (
    <>
      <section id="o-que-e-roblox-studio" className="o-que-roblox-studio-section">
        <div className="o-que-roblox-studio-container">
          <h2 className="o-que-roblox-studio-title">
            O que é o Roblox Studios
          </h2>
          <div className="o-que-roblox-studio-content">
            <div className="o-que-roblox-studio-text">
              <p className="o-que-roblox-studio-paragraph">
                Roblox Studio é a ferramenta de criação que permite construir qualquer coisa que você possa imaginar.
              </p>
              <p className="o-que-roblox-studio-paragraph">
                Nossa missão é potencializar a imaginação de milhões de pessoas ao redor do mundo.
              </p>
            </div>
            <div className="o-que-roblox-studio-video">
              <div className="video-placeholder" onClick={openVideo}>
                <div className="play-button">
                  <span className="play-icon">▶</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeVideo}>×</button>
            <div className="video-player-container">
              {/* Substitua pela URL do seu vídeo (YouTube, Vimeo, etc) */}
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Roblox Studio Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-player"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OQueERobloxStudioSection

