import { render, screen } from '@testing-library/react'
import HomeHeroSection, { HERO_TOP_SPACING } from './HomeHeroSection'

describe('HomeHeroSection', () => {
  it('mantém o nível de stacking controlado pelo CSS custom property', () => {
    render(<HomeHeroSection />)
    const heroSection = screen.getByTestId('home-hero-section')

    // O hero deve vir atrás de elementos com z-index alto e ser posicionado pelo layout normal.
    expect(heroSection).toBeInTheDocument()
    expect(heroSection.style.zIndex).toBe('var(--layer-hero, 0)')
    expect(heroSection.style.paddingTop).toBe(HERO_TOP_SPACING)
    expect(heroSection.getAttribute('role')).toBe('region')
    expect(heroSection.getAttribute('aria-label')).toBe('Hero principal')
  })
})
