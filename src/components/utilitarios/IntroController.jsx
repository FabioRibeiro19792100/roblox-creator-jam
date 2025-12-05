import { useEffect } from 'react';
import AnimatorManager from '../../managers/AnimatorManager';

const IntroController = () => {
  useEffect(() => {
    const manager = AnimatorManager.getInstance();

    const timeoutId = setTimeout(() => {
      // --- 1. Animação do Título (Slide Up Sequencial) ---
      const words = ['word-criar', 'word-e', 'word-o', 'word-novo', 'word-jogar'];
      const staggerDelay = 200; 
      
      words.forEach((id, index) => {
        setTimeout(() => {
          manager.animate(id, 
            [
              { opacity: 0, transform: 'translateY(100%)' },
              { opacity: 1, transform: 'translateY(0)' }
            ], 
            { 
              duration: 800, 
              fill: 'forwards',
              easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' 
            }
          );
        }, index * staggerDelay);
      });

      // --- 2. Animação de Fade In (Elementos Secundários) ---
      // Começa junto com o título ou logo após? "Ao carregar o site" sugere junto.
      // Vamos colocar um leve delay para não competir atenção com o título, ou rodar em paralelo.
      // Optei por paralelo com duração suave.
      const fadeElements = ['header-nav', 'hero-expedicao', 'hero-description', 'hero-image'];
      
      fadeElements.forEach(id => {
        // Verifica se o elemento existe antes de animar (segurança extra)
        if (manager.getElement(id)) {
          // Definindo opacity inicial via JS para garantir (caso CSS não tenha)
          const el = manager.getElement(id);
          el.style.opacity = '0'; 

          manager.animate(id,
            [
              { opacity: 0 },
              { opacity: 1 }
            ],
            {
              duration: 1200, // Um pouco mais lento que o título para ser sutil
              fill: 'forwards',
              easing: 'ease-out',
              delay: 200 // Pequeno delay para o layout assentar
            }
          );
        }
      });

    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
};

export default IntroController;
