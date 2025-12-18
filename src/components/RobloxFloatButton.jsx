import React from 'react'
import './RobloxFloatButton.css'

function RobloxFloatButton() {
  const handleClick = () => {
    window.open('https://www.roblox.com', '_blank')
  }

  return (
    <button className="roblox-float-button" onClick={handleClick} aria-label="Ir para Roblox">
      <img src="/images/hero-logo.png" alt="Roblox" className="roblox-float-icon" />
    </button>
  )
}

export default RobloxFloatButton

