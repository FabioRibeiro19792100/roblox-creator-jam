import React from 'react'
import './RobloxFloatButton.css'

function RobloxFloatButton() {
  const handleClick = () => {
    // Scroll para o início
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button className="roblox-float-button" onClick={handleClick} aria-label="Ir para o início">
      <img src="/images/hero-logo.png" alt="Roblox" className="roblox-float-icon" />
    </button>
  )
}

export default RobloxFloatButton

