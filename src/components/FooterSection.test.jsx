import { render, screen } from '@testing-library/react'
import FooterSection from './FooterSection'

beforeAll(() => {
  class MockIntersectionObserver {
    constructor() {}
    observe() {}
    disconnect() {}
  }

  // @ts-ignore
  global.IntersectionObserver = MockIntersectionObserver
})

describe('FooterSection layout', () => {
  it('mantém o texto confinando dentro do card (conteúdo em wrapper block)', () => {
    render(<FooterSection />)

    const cards = screen.getAllByRole('button', { name: /TRILHA/ })
    expect(cards).toHaveLength(3)

    const firstCard = cards[0]
    const content = firstCard.querySelector('.footer-card-content')
    const label = firstCard.querySelector('.footer-card-label')

    expect(content).toBeInTheDocument()
    expect(label?.textContent).toBe('TRILHA 01')
    expect(screen.getByText('Aprenda Roblox Studio do zero em nossas trilhas de conteúdos')).toBeTruthy()

  })
})
