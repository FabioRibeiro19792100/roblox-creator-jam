import { describe, it, expect, beforeEach, vi } from 'vitest';
import AnimatorManager from '../managers/AnimatorManager';

describe('AnimatorManager', () => {
  let manager;

  beforeEach(() => {
    // Reset singleton instance for isolation
    AnimatorManager.instance = null;
    manager = AnimatorManager.getInstance();
  });

  it('should be a singleton', () => {
    const manager2 = new AnimatorManager();
    expect(manager).toBe(manager2);
    expect(AnimatorManager.getInstance()).toBe(manager);
  });

  it('should register an element', () => {
    const element = document.createElement('div');
    const id = 'test-element';
    
    manager.register(id, element);
    
    expect(manager.getElement(id)).toBe(element);
  });

  it('should unregister an element', () => {
    const element = document.createElement('div');
    const id = 'test-element';
    
    manager.register(id, element);
    manager.unregister(id);
    
    expect(manager.getElement(id)).toBeUndefined();
  });

  it('should trigger animation on registered element', () => {
    const element = document.createElement('div');
    // Mock animate method
    element.animate = vi.fn().mockReturnValue({
      onfinish: null,
      oncancel: null,
      cancel: vi.fn()
    });

    manager.register('box', element);
    
    const keyframes = [{ opacity: 0 }, { opacity: 1 }];
    const options = { duration: 1000 };
    
    manager.animate('box', keyframes, options);
    
    expect(element.animate).toHaveBeenCalledWith(keyframes, expect.objectContaining({ duration: 1000 }));
  });
});


