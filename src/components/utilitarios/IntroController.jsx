import { useEffect } from 'react';
import AnimatorManager from '../../managers/AnimatorManager';

const IntroController = () => {
  useEffect(() => {
    const manager = AnimatorManager.getInstance();

    const timeoutId = setTimeout(() => {
      // --- 1. Animação da Logo ---
      if (manager.getElement('hero-logo')) {
        const logo = manager.getElement('hero-logo');
        logo.style.opacity = '0';
        manager.animate('hero-logo', 
          [
            { opacity: 0, transform: 'translateY(20px) scale(0.95)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' }
          ], 
          { 
            duration: 800, 
            fill: 'forwards',
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)' 
          }
        );
      }

      // --- 2. Animação do Título ---
      if (manager.getElement('hero-title')) {
        const title = manager.getElement('hero-title');
        title.style.opacity = '0';
        // Pequeno delay em relação a logo
        setTimeout(() => {
          manager.animate('hero-title', 
            [
              { opacity: 0, transform: 'translateY(30px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ], 
            { 
              duration: 800, 
              fill: 'forwards',
              easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' 
            }
          );
        }, 150);
      }

      // --- 3. Animação de Elementos Secundários ---
      const fadeElements = ['header-nav', 'hero-expedicao', 'hero-description', 'hero-cta']; // Adicionei hero-cta se tiver ID
      
      fadeElements.forEach((id, index) => {
        if (manager.getElement(id)) {
          const el = manager.getElement(id);
          el.style.opacity = '0'; 

          manager.animate(id,
            [
              { opacity: 0 },
              { opacity: 1 }
            ],
            {
              duration: 1000,
              fill: 'forwards',
              easing: 'ease-out',
              delay: 300 + (index * 100) // Efeito cascata suave
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
