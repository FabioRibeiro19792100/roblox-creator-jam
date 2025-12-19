import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Web Animations API since jsdom doesn't support it fully
if (typeof Element !== 'undefined' && !Element.prototype.animate) {
  Element.prototype.animate = vi.fn().mockReturnValue({
    finished: Promise.resolve(),
    onfinish: null,
    oncancel: null,
    cancel: vi.fn(),
    play: vi.fn(),
    pause: vi.fn(),
    reverse: vi.fn(),
  })
}
















