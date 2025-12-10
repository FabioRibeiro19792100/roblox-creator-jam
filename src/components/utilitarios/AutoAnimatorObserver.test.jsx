import React from 'react';
import { render, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import AutoAnimatorObserver from './AutoAnimatorObserver';
import AnimatorManager from '../../managers/AnimatorManager';

describe('AutoAnimatorObserver', () => {
  let manager;

  beforeEach(() => {
    AnimatorManager.instance = null;
    manager = AnimatorManager.getInstance();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should register existing elements with data-animate-id on mount', () => {
    // Setup initial DOM
    const div = document.createElement('div');
    div.setAttribute('data-animate-id', 'initial-element');
    document.body.appendChild(div);

    render(<AutoAnimatorObserver />);

    expect(manager.getElement('initial-element')).toBe(div);
  });

  it('should register dynamically added elements', async () => {
    render(<AutoAnimatorObserver />);

    const div = document.createElement('div');
    div.setAttribute('data-animate-id', 'dynamic-element');
    
    await act(async () => {
      document.body.appendChild(div);
      // MutationObserver is async, wait a tick
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(manager.getElement('dynamic-element')).toBe(div);
  });

  it('should unregister removed elements', async () => {
    const div = document.createElement('div');
    div.setAttribute('data-animate-id', 'remove-test');
    document.body.appendChild(div);

    render(<AutoAnimatorObserver />);
    expect(manager.getElement('remove-test')).toBe(div);

    await act(async () => {
      document.body.removeChild(div);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(manager.getElement('remove-test')).toBeUndefined();
  });

  it('should handle nested elements', async () => {
    render(<AutoAnimatorObserver />);

    const container = document.createElement('div');
    const child = document.createElement('span');
    child.setAttribute('data-animate-id', 'nested-child');
    container.appendChild(child);

    await act(async () => {
      document.body.appendChild(container);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(manager.getElement('nested-child')).toBe(child);
  });
});








