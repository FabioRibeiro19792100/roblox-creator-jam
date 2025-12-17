import { useState } from 'react'
import { useSiteConfig } from '../config/useSiteConfig'
import './OQueERobloxStudioSection.css'

function OQueERobloxStudioSection() {
  const config = useSiteConfig()
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleStop = (e) => {
    e.stopPropagation()
    setIsPlaying(false)
  }

  return (
    <section id="o-que-e-roblox-studio" className="o-que-roblox-studio-section">
      {/* Background Layer */}
      <div 
        className="o-que-roblox-studio-background" 
        style={{
          backgroundImage: 'url(https://img.youtube.com/vi/nORMxlw7cWc/maxresdefault.jpg)'
        }}
      >
        <div className="o-que-roblox-studio-gradient"></div>
      </div>

      {/* Video Layer - Active when playing */}
      {isPlaying && (
        <div className="o-que-roblox-studio-video-wrapper">
          <div className="video-iframe-container">
            <iframe
              src="https://www.youtube.com/embed/nORMxlw7cWc?autoplay=1&controls=0&rel=0&showinfo=0&loop=1&playlist=nORMxlw7cWc"
              title="Roblox Studio Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="o-que-roblox-studio-iframe"
            ></iframe>
          </div>
          <button className="o-que-roblox-studio-close-btn" onClick={handleStop}>
            <span className="close-icon">×</span>
            <span>Fechar vídeo</span>
          </button>
        </div>
      )}

      {/* Content Container - Fades out when playing */}
      <div className={`o-que-roblox-studio-container ${isPlaying ? 'content-hidden' : ''}`}>
        <div className="o-que-roblox-studio-content">
          <h2 className="o-que-roblox-studio-title">
            {config?.robloxStudio?.title || 'O que é o Roblox Studios'}
          </h2>
          
          <div className="o-que-roblox-studio-text">
            {config?.robloxStudio?.description?.map((text, index) => (
              <p key={index} className="o-que-roblox-studio-paragraph">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Centered Play Button - Fades out when playing */}
      <div 
        className={`o-que-roblox-studio-play-centered ${isPlaying ? 'content-hidden' : ''}`} 
        onClick={handlePlay}
      >
        <div className="play-button">
          <span className="play-icon">▶</span>
        </div>
      </div>
    </section>
  )
}

export default OQueERobloxStudioSection
