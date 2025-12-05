import { describe, it, expect, vi, beforeEach } from 'vitest';
import AnimatorManager from '../../managers/AnimatorManager';

vi.useFakeTimers();

describe('Global FadeIn Animation', () => {
  let manager;

  beforeEach(() => {
    AnimatorManager.instance = null;
    manager = AnimatorManager.getInstance();
    document.body.innerHTML = '';
  });

  it('should animate fade-in elements with opacity', async () => {
    const fadeElements = ['header-nav', 'hero-expedicao', 'hero-description', 'hero-image'];
    const elements = fadeElements.map(id => {
      const el = document.createElement('div');
      el.id = id;
      el.animate = vi.fn().mockReturnValue({
        finished: Promise.resolve(),
        onfinish: null,
        cancel: vi.fn()
      });
      manager.register(id, el);
      return el;
    });

    // Lógica isolada do controller (simulação)
    const animateFadeIn = () => {
      fadeElements.forEach((id) => {
        manager.animate(
          id,
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 1000, fill: 'forwards' }
        );
      });
    };

    animateFadeIn();

    await vi.runAllTimersAsync();

    elements.forEach((el) => {
      expect(el.animate).toHaveBeenCalledWith(
        [{ opacity: 0 }, { opacity: 1 }],
        expect.objectContaining({ duration: 1000, fill: 'forwards' })
      );
    });
  });
});

