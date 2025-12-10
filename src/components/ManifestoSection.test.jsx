import { render, screen } from '@testing-library/react'
import ManifestoSection from './ManifestoSection'

describe('ManifestoSection', () => {
  it('expõe um heading e vincula o section via aria-labelledby', () => {
    render(<ManifestoSection />)

    const section = screen.getByRole('region', { name: /E o jogo agora é seu\./i })
    const heading = screen.getByRole('heading', { name: /E o jogo agora é seu\./i })

    expect(section).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-labelledby', heading.id)
  })
})
