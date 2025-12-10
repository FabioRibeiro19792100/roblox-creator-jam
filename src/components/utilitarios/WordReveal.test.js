import { describe, it, expect, vi, beforeEach } from 'vitest';
import AnimatorManager from '../../managers/AnimatorManager';

// Vamos mockar o timer para controlar o tempo nos testes
vi.useFakeTimers();

describe('Word Reveal Animation', () => {
  let manager;

  beforeEach(() => {
    AnimatorManager.instance = null;
    manager = AnimatorManager.getInstance();
    document.body.innerHTML = '';
  });

  it('should animate words sequentially from bottom up', async () => {
    // Setup: Criar elementos simulando as palavras
    const words = ['word-1', 'word-2', 'word-3', 'word-4', 'word-5'];
    const elements = words.map(id => {
      const el = document.createElement('span');
      el.id = id; // Usando ID direto para simplificar o teste unitário
      
      // Mock da função animate
      el.animate = vi.fn().mockReturnValue({
        finished: Promise.resolve(),
        onfinish: null,
        cancel: vi.fn()
      });
      
      manager.register(id, el);
      return el;
    });

    // Ação: Simular a lógica que o Controller faria
    // Vamos criar uma função isolada para testar a lógica de animação antes de colocar no componente
    const animateWords = (wordIds) => {
      const sequence = wordIds.map((id, index) => {
        // Calculando delay para caber tudo em 1.5s (1500ms)
        // Se temos 5 palavras, o intervalo total é 1500ms.
        // O delay entre cada uma deve ser distribuído.
        // Vamos assumir um stagger (atraso) linear.
        const totalDuration = 1500;
        const stagger = totalDuration / wordIds.length; 
        
        return {
          id,
          keyframes: [
            { opacity: 0, transform: 'translateY(100%)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          options: { 
            duration: 500, // Duração de cada palavra subindo
            fill: 'forwards',
            easing: 'ease-out'
          },
          delay: index * 200 // Delay acumulativo fixo ou calculado
        };
      });

      manager.playSequence(sequence);
    };

    animateWords(words);

    // Verificação
    // O primeiro elemento deve ser chamado imediatamente (ou com delay 0)
    // O último elemento deve ser chamado com um delay maior
    
    // Nota: playSequence no manager é síncrono na iteração mas assíncrono na execução se tiver delays reais.
    // Como estamos mockando o animate e usando fakeTimers, vamos verificar se o animate foi chamado com os keyframes certos.
    
    // Aguarda promessas pendentes
    await vi.runAllTimersAsync();

    elements.forEach((el, index) => {
      expect(el.animate).toHaveBeenCalledWith(
        [
          { opacity: 0, transform: 'translateY(100%)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        expect.objectContaining({
          fill: 'forwards',
          easing: 'ease-out'
        })
      );
    });
  });
});








