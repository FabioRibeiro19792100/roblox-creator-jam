import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import './OQueERobloxStudioSection.css'

function OQueERobloxStudioSection() {
  const config = useSiteConfig()
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
            {config?.robloxStudio?.title || 'O que é o Roblox Studios'}
          </h2>
          <div className="o-que-roblox-studio-content">
            <div className="o-que-roblox-studio-text">
              {config?.robloxStudio?.description?.map((text, index) => (
                <p key={index} className="o-que-roblox-studio-paragraph">
                  {text}
                </p>
              ))}
            </div>
            <div className="o-que-roblox-studio-video">
              <div
                className="video-placeholder hover-fill"
                onClick={openVideo}
                style={{
                  '--fill-color': 'rgba(255, 0, 80, 0.8)',
                  backgroundImage: 'url(https://img.youtube.com/vi/nORMxlw7cWc/maxresdefault.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
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
              <iframe
                src="https://www.youtube.com/embed/nORMxlw7cWc?autoplay=1"
                title="Roblox Studio Video"
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

