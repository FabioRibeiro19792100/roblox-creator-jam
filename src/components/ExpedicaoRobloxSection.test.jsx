import { fireEvent, render, screen } from '@testing-library/react'
import ExpedicaoRobloxSection, { PANEL_IDS } from './ExpedicaoRobloxSection'

describe('ExpedicaoRobloxSection accordion accessibility', () => {
  it('exposes aria-expanded and aria-controls plus panel id', () => {
    render(<ExpedicaoRobloxSection />)

    const trilhaButton = screen.getByRole('button', { name: /trilha 01/i })
    const trilhaPanel = screen.getByTestId(PANEL_IDS.trilhas)

    expect(trilhaButton).toHaveAttribute('aria-expanded', 'false')
    expect(trilhaButton).toHaveAttribute('aria-controls', PANEL_IDS.trilhas)
    expect(trilhaPanel).toHaveAttribute('aria-hidden', 'true')

    fireEvent.click(trilhaButton)

    expect(trilhaPanel).toHaveAttribute('aria-hidden', 'false')
    expect(trilhaButton).toHaveAttribute('aria-expanded', 'true')
  })
})
