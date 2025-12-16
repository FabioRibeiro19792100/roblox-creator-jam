import { render, screen, fireEvent, waitFor, cleanup, within } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Header from './Header'
import { NavigationContext, ContactModalContext } from '../App'
import { scrollToElementById, updateHash, scrollWindowTo } from '../utils/scrollHelpers'

vi.mock('../utils/scrollHelpers', () => ({
  scrollToElementById: vi.fn(),
  updateHash: vi.fn(),
  scrollWindowTo: vi.fn()
}))

const MOBILE_QUERY = '(max-width: 767px)'

let mediaQueryMock

const setViewport = (isMobile = false) => {
  mediaQueryMock = {
    matches: isMobile,
    media: MOBILE_QUERY,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn()
  }

  window.matchMedia = vi.fn().mockImplementation((query) => {
    mediaQueryMock.media = query
    mediaQueryMock.matches = isMobile && query === MOBILE_QUERY
    return mediaQueryMock
  })
}

const renderHeader = (currentPage = 'home') => {
  const navigateTo = vi.fn()
  const openContactModal = vi.fn()

  return render(
    <NavigationContext.Provider value={{ navigateTo, currentPage }}>
      <ContactModalContext.Provider value={{ openContactModal }}>
        <Header />
      </ContactModalContext.Provider>
    </NavigationContext.Provider>
  )
}

beforeEach(() => {
  delete window.__headerHasAnimatedOnce__
  setViewport(false)
  scrollToElementById.mockReset()
  updateHash.mockReset()
  scrollWindowTo.mockReset()
})

afterEach(() => {
  cleanup()
  window.location.hash = ''
})

describe('Header CTA alignment', () => {
  it('renders the CTA outside the nav but inside the header container on the home page', () => {
    renderHeader('home')
    const nav = screen.getByLabelText(/menu principal/i)
    const headerContainer = document.querySelector('.header-container')
    const ctaButton = screen.getByRole('button', { name: /Quer criar\? Desce pro play\./i })

    expect(ctaButton).not.toBeNull()
    expect(nav).not.toContainElement(ctaButton)
    expect(headerContainer).toContainElement(ctaButton)
  })

  it('does not render the CTA nav item on the jam page', () => {
    renderHeader('jam')
    expect(screen.queryByText(/Quer criar\? Desce pro play\./i)).toBeNull()
  })

  it('exibe o menu sanduíche quando o botão é acionado', () => {
    setViewport(true)
    renderHeader('home')
    const toggle = screen.getByRole('button', { name: /menu/i })
    const nav = screen.getByRole('navigation', { hidden: true })

    expect(nav).not.toHaveClass('nav-open')
    expect(nav).toHaveAttribute('aria-hidden', 'true')
    expect(nav).toHaveAttribute('aria-label', 'Menu principal')
    fireEvent.click(toggle)
    expect(nav).toHaveClass('nav-open')
    expect(nav).toHaveAttribute('aria-hidden', 'false')
    expect(screen.getAllByText('Início').length).toBeGreaterThan(0)
  })

  it('mantém o ícone do menu sanduíche branco', () => {
    renderHeader('home')
    const toggle = screen.getByRole('button', { name: /menu/i })
    expect(toggle.style.getPropertyValue('--hamburger-line-color')).toBe('#fff')
  })

  it('mantém o header visível após navegar para outra página', async () => {
    const { unmount } = renderHeader('home')
    await waitFor(() => {
      expect(window.__headerHasAnimatedOnce__).toBe(true)
    })
    unmount()
    renderHeader('biblioteca')
    const headerContainer = document.querySelector('[data-animate-id="header-nav"]')
    expect(headerContainer).not.toBeNull()
    await waitFor(() => {
      expect(headerContainer.style.opacity).toBe('1')
    })
  })

  it('renderiza o CTA como botão sem duplicar texto ou usar estilos inline de largura', () => {
    renderHeader('home')
    const ctaButton = screen.getByRole('button', { name: /Quer criar\? Desce pro play\./i })
    expect(ctaButton.tagName).toBe('BUTTON')
    expect(ctaButton.textContent.trim()).toBe('Quer criar? Desce pro play.')
    expect(ctaButton.style.width).toBe('')
    expect(ctaButton.style.minWidth).toBe('')
    expect(ctaButton.style.maxWidth).toBe('')
  })

  it('envolve o texto do CTA em um contêiner dedicado para garantir respiro', () => {
    renderHeader('home')
    const ctaButton = screen.getByRole('button', { name: /Quer criar\? Desce pro play\./i })
    const innerWrapper = ctaButton.querySelector('.header-cta-inner')
    const label = ctaButton.querySelector('.header-cta-label')

    expect(innerWrapper).not.toBeNull()
    expect(label).not.toBeNull()
    expect(innerWrapper).toContainElement(label)
  })

  it('mantém uma margem horizontal fixa entre o texto do CTA e o bounds do wrapper', () => {
    renderHeader('home')
    const wrapper = document.querySelector('.header-cta-wrapper')
    const ctaButton = screen.getByRole('button', { name: /Quer criar\? Desce pro play\./i })

    expect(wrapper).not.toBeNull()
    expect(wrapper).toContainElement(ctaButton)
    expect(wrapper.style.paddingLeft).toBe('1rem')
    expect(wrapper.style.paddingRight).toBe('1rem')
  })

  it('usa o helper de scroll ao clicar no CTA para ir à expedição', () => {
    renderHeader('home')
    scrollToElementById.mockClear()
    const ctaButton = screen.getByRole('button', { name: /Quer criar\? Desce pro play\./i })
    fireEvent.click(ctaButton)
    expect(scrollToElementById).toHaveBeenCalledWith(
      'expedicao-roblox',
      expect.objectContaining({ offset: expect.any(Number), behavior: 'smooth' })
    )
  })

  it('usa o helper de scroll ao abrir a seção da expedição', () => {
    renderHeader('home')
    scrollToElementById.mockClear()
    const expLink = screen.getByRole('link', { name: 'A Expedição' })
    fireEvent.click(expLink)
    expect(scrollToElementById).toHaveBeenCalledWith(
      'expedicao-roblox',
      expect.objectContaining({
        offset: expect.any(Number),
        behavior: 'smooth'
      })
    )
  })

  it('usa o helper de hash na navegação da biblioteca', () => {
    renderHeader('biblioteca')
    const tutorialLink = screen.getAllByRole('link', { name: /Tutorial Roblox Studios/i })[0]
    fireEvent.click(tutorialLink)
    expect(updateHash).toHaveBeenCalledWith(
      '#biblioteca-tutorial',
      expect.objectContaining({ replace: true })
    )
  })

  it('usa o helper de scroll ao topo quando clica em início', () => {
    renderHeader('home')
    const homeLink = screen.getAllByText('Início')[0]
    fireEvent.click(homeLink)
    expect(scrollWindowTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('não recarrega a página se o NavigationContext não estiver presente', () => {
    const originalLocation = window.location
    const reloadMock = vi.fn()
    delete window.location
    window.location = {
      ...originalLocation,
      hash: '#jam',
      reload: reloadMock
    }
    render(<Header />)
    const homeLink = screen.getByRole('link', { name: 'Início' })
    fireEvent.click(homeLink)
    expect(reloadMock).not.toHaveBeenCalled()
    window.location = originalLocation
  })

  it('remove o listener de matchMedia ao desmontar', () => {
    const { unmount } = renderHeader('home')
    expect(window.matchMedia).toHaveBeenCalled()
    const mediaInstance = window.matchMedia.mock.results[0]?.value
    const [[eventName, handler]] = mediaInstance.addEventListener.mock.calls
    expect(eventName).toBe('change')
    unmount()
    expect(mediaInstance.removeEventListener).toHaveBeenCalledWith(eventName, handler)
  })

  it('renderiza apenas um elemento nav independentemente do viewport', () => {
    const { unmount } = renderHeader('home')
    expect(screen.getAllByRole('navigation', { hidden: true }).length).toBe(1)
    unmount()
    setViewport(true)
    renderHeader('home')
    expect(screen.getAllByRole('navigation', { hidden: true }).length).toBe(1)
  })

  it('exibe apenas o nav desktop em viewport ampla', () => {
    renderHeader('home')
    const nav = screen.getByRole('navigation', { name: /menu principal/i })
    expect(nav).toHaveClass('nav-desktop')
    expect(nav).not.toHaveClass('nav-mobile')
    expect(nav).toHaveAttribute('aria-hidden', 'false')
  })

  it('exibe apenas o nav mobile em viewport móvel', () => {
    setViewport(true)
    renderHeader('home')
    const nav = screen.getByRole('navigation', { hidden: true })
    expect(nav).toHaveClass('nav-mobile')
    expect(nav).not.toHaveClass('nav-desktop')
    expect(nav).not.toHaveClass('nav-open')
    expect(nav).toHaveAttribute('aria-hidden', 'true')
    expect(nav).toHaveAttribute('aria-label', 'Menu principal')
  })

  it('ancora os itens do menu da Biblioteca para suas seções no mobile', () => {
    setViewport(true)
    window.location.hash = '#biblioteca'
    const section = document.createElement('section')
    section.id = 'biblioteca-tutorial'
    document.body.appendChild(section)

    try {
      renderHeader('biblioteca')
      const toggle = screen.getByRole('button', { name: /menu/i })
      fireEvent.click(toggle)
    const nav = screen.getByRole('navigation', { hidden: true })
    const tutorialLink = within(nav).getByText(/Tutorial Roblox Studios/i)
    fireEvent.click(tutorialLink)

      expect(updateHash).toHaveBeenCalledWith(
        '#biblioteca-tutorial',
        expect.objectContaining({ replace: true })
      )
    } finally {
      section.remove()
    }
  })
})
