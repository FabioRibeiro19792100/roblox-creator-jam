import React, { useState, useEffect } from 'react'
import './BubbleButton.css' // Reutilizando estilos de botão se houver, ou definimos inline

export function ScreenSizeKit() {
  const [isVisible, setIsVisible] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Inicializa dimensões
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <button
        onClick={toggleVisibility}
        style={{
          position: 'fixed',
          bottom: '160px', // Acima dos outros debugs
          right: '20px',
          zIndex: 9999,
          padding: '8px 12px',
          background: isVisible ? '#4CAF50' : '#333',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer',
          fontFamily: 'monospace',
          opacity: 0.8
        }}
      >
        {isVisible ? 'Hide Screen Size' : 'Show Screen Size'}
      </button>

      {isVisible && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10000,
            background: 'rgba(0, 0, 0, 0.85)',
            color: '#0f0',
            padding: '10px 20px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '24px',
            fontWeight: 'bold',
            border: '2px solid #0f0',
            pointerEvents: 'none', // Não bloqueia cliques
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          {dimensions.width}px x {dimensions.height}px
        </div>
      )}
    </>
  )
}

