import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'
import { NavigationContext, ContactModalContext } from '../App'

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

describe('Header CTA alignment', () => {
  it('renders the CTA outside the nav but inside the header container on the home page', () => {
    renderHeader('home')
    const nav = screen.getByRole('navigation')
    const headerContainer = document.querySelector('.header-container')
    const ctaText = screen.getAllByText(/Quer criar\? Desce pro play\./i)[0]
    const ctaButton = ctaText.closest('.header-cta-button')

    expect(ctaButton).not.toBeNull()
    expect(nav).not.toContainElement(ctaButton)
    expect(headerContainer).toContainElement(ctaButton)
  })

  it('does not render the CTA nav item on the jam page', () => {
    renderHeader('jam')
    expect(screen.queryByText(/Quer criar\? Desce pro play\./i)).toBeNull()
  })
})
