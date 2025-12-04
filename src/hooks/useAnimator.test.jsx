import React from 'react';
import { render, unmountComponentAtNode } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAnimator } from '../hooks/useAnimator';
import AnimatorManager from '../managers/AnimatorManager';

// Componente auxiliar para testar o hook
const TestComponent = ({ id }) => {
  const { ref } = useAnimator(id);
  return <div ref={ref}>Test Content</div>;
};

describe('useAnimator Integration', () => {
  let manager;

  beforeEach(() => {
    AnimatorManager.instance = null;
    manager = AnimatorManager.getInstance();
  });

  it('should register element in manager when component mounts', () => {
    const id = 'auto-register-test';
    
    const { unmount } = render(<TestComponent id={id} />);
    
    const element = manager.getElement(id);
    expect(element).not.toBeUndefined();
    expect(element.tagName).toBe('DIV');
    expect(element.textContent).toBe('Test Content');
    
    unmount();
    expect(manager.getElement(id)).toBeUndefined();
  });
});

