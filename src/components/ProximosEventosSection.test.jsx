import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import ProximosEventosSection from './ProximosEventosSection'

vi.mock('../config/useSiteConfig', () => ({
  useSiteConfig: vi.fn()
}))

const { useSiteConfig } = await import('../config/useSiteConfig')

describe('ProximosEventosSection', () => {
  beforeEach(() => {
    useSiteConfig.mockReturnValue({
      proximosEventos: {
        title: 'Próximos eventos',
        calendarTitle: 'Calendário de Eventos',
        eventos: [{ data: '01/01/2026', titulo: 'Evento', local: 'Online' }]
      }
    })
  })

  it('expõe um botão acessível para abrir e fechar o calendário', () => {
    render(<ProximosEventosSection />)
    const toggle = screen.getByRole('button', { name: /próximos eventos/i })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    const controlsId = toggle.getAttribute('aria-controls')
    expect(controlsId).toBeTruthy()
    fireEvent.click(toggle)
    const describedElement = document.getElementById(controlsId)
    expect(describedElement).not.toBeNull()

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('heading', { name: /calendário de eventos/i })).toBeInTheDocument()
  })

  it('expõe um heading semântico para a seção antes do hero', () => {
    render(<ProximosEventosSection />)
    const heading = screen.getByRole('heading', { level: 2, name: /próximos eventos/i })
    const section = document.querySelector('.proximos-eventos-section')
    expect(section).toHaveAttribute('aria-labelledby', heading.id)
  })

  it('abre o calendário como um diálogo modal acessível e movimenta o foco', () => {
    render(<ProximosEventosSection />)
    const toggle = screen.getByRole('button', { name: /próximos eventos/i })
    fireEvent.click(toggle)

    const dialog = screen.getByRole('dialog', { name: /calendário de eventos/i })
    expect(dialog).toHaveAttribute('aria-modal', 'true')

    const labelledBy = dialog.getAttribute('aria-labelledby')
    expect(labelledBy).toBeTruthy()
    const heading = within(dialog).getByRole('heading', { name: /calendário de eventos/i })
    expect(heading.id).toBe(labelledBy)

    const closeButton = within(dialog).getByRole('button', { name: /fechar/i })
    expect(closeButton).toHaveFocus()
  })

  it('renderiza a lista de eventos com semântica de lista/tempo', () => {
    render(<ProximosEventosSection />)
    const toggle = screen.getByRole('button', { name: /próximos eventos/i })
    fireEvent.click(toggle)

    const list = screen.getByRole('list', { name: /lista de próximos eventos/i })
    const items = within(list).getAllByRole('listitem')
    expect(items.length).toBeGreaterThan(0)

    const primeiroItem = items[0]
    const time = within(primeiroItem).getByRole('time')
    expect(time).toHaveAttribute('datetime')
  })

  it('mantém a seção de eventos no fluxo com comportamento sticky', () => {
    render(<ProximosEventosSection />)
    const section = document.querySelector('.proximos-eventos-section')
    expect(section).not.toBeNull()
    expect(section.style.position).toBe('sticky')
    expect(section.style.top).toBe('var(--header-height, 60px)')
    expect(section.style.height).toBe('var(--events-height, 48px)')
  })

  it('centraliza o disparador e o ícone dentro da barra de eventos', () => {
    render(<ProximosEventosSection />)
    const container = document.querySelector('.proximos-eventos-container')
    const button = container.querySelector('.proximos-eventos-header')
    expect(container.style.minHeight).toBe('var(--events-height, 48px)')
    expect(container.style.alignItems).toBe('center')
    expect(button.style.minHeight).toBe('var(--events-height, 48px)')
    expect(button.style.alignItems).toBe('center')
  })

  it('bloqueia o scroll do body ao abrir e restaura ao fechar, mantendo o foco', () => {
    render(<ProximosEventosSection />)
    const toggle = screen.getByRole('button', { name: /próximos eventos/i })

    fireEvent.click(toggle)
    expect(document.body.style.overflow).toBe('hidden')

    const closeButton = screen.getByRole('button', { name: /fechar/i })
    fireEvent.click(closeButton)

    expect(document.body.style.overflow).toBe('')
    expect(toggle).toHaveFocus()
  })
})
