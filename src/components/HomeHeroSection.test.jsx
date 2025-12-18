import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import HomeHeroSection from './HomeHeroSection'
import { useSiteConfig } from '../config/useSiteConfig'

// Mock do hook de config
vi.mock('../config/useSiteConfig', () => ({
  useSiteConfig: vi.fn()
}))

// Mock de dimensões do viewport e elementos
const mockViewport = (width, height) => {
  global.window.innerWidth = width
  global.window.innerHeight = height
  global.window.scrollY = 0
}

describe('HomeHeroSection Bounding Box', () => {
  beforeEach(() => {
    useSiteConfig.mockReturnValue({
      hero: { home: { title: { line1: 'Teste', line2: 'Hero' } } }
    })

    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight, width: window.innerWidth, height: window.innerHeight
    }))

    // Corrigindo o mock do getComputedStyle para retornar um objeto com getPropertyValue
    global.window.getComputedStyle = vi.fn(() => ({
      paddingLeft: '0px',
      getPropertyValue: (prop) => {
        if (prop === 'overflow') return 'hidden'
        return ''
      }
    }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should have overflow hidden to prevent bounding box leak', () => {
    mockViewport(1920, 1080)
    render(<HomeHeroSection />)
    
    const heroSection = screen.getByTestId('home-hero-section')
    // No JSDOM/Vitest com mock manual de getComputedStyle, toHaveStyle pode falhar se o mock não for perfeito.
    // Vamos verificar o style inline aplicado pelo componente.
    expect(heroSection.style.overflow).toBe('hidden')
  })
})
