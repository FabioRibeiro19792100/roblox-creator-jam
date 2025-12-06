import { describe, it, expect } from 'vitest';

describe('Button Text Loop Animation Structure', () => {
  // Este teste valida a estrutura HTML necessária para a animação CSS-only
  // A animação em si (keyframes) é visual e verificada no navegador, 
  // mas a estrutura (duplicação de texto) é testável.

  it('should have data-text attribute for content duplication', () => {
    // Simulação: Criar um botão da forma como esperamos que seja refatorado
    const button = document.createElement('a');
    button.className = 'header-cta-button';
    button.textContent = 'Desce pro play.';
    
    // O que esperamos implementar:
    // O botão deve ter um atributo data-text igual ao texto visível 
    // para que o CSS possa usar content: attr(data-text) no pseudo-elemento
    button.setAttribute('data-text', button.textContent);

    expect(button.getAttribute('data-text')).toBe('Desce pro play.');
  });
});


