import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HomeHeroSection from './HomeHeroSection'

// Mock useSiteConfig
vi.mock('../config/useSiteConfig', () => ({
  useSiteConfig: () => ({ hero: {} })
}))

// Mock de imagens
vi.mock('/images/hero.png', () => 'hero.png')
vi.mock('/images/logo.png', () => 'logo.png')

describe('HomeHeroSection Height Calculation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 })
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
    
    // Mock getBoundingClientRect padrão
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 108,
      bottom: 0, left: 0, right: 0, width: 1000, height: 0, x: 0, y: 108
    }))
  })

  it('sets minHeight correctly based on initial top position', async () => {
    render(<HomeHeroSection />)
    
    // Aguarda useEffect e timeout
    await act(async () => {
      await new Promise(r => setTimeout(r, 150))
    })
    
    const hero = screen.getByTestId('home-hero-section')
    // Esperado: 800 (window) - 108 (top) = 692px
    expect(hero.style.minHeight).toBe('692px')
  })

  it('updates minHeight on window resize', async () => {
    render(<HomeHeroSection />)
    
    await act(async () => {
      await new Promise(r => setTimeout(r, 150))
    })
    
    // Simula mudança de posição (ex: barra de eventos encolheu)
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 60,
      bottom: 0, left: 0, right: 0, width: 1000, height: 0, x: 0, y: 60
    }))
    
    // Dispara resize
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    
    const hero = screen.getByTestId('home-hero-section')
    // Esperado: 800 - 60 = 740px
    expect(hero.style.minHeight).toBe('740px')
  })
})
