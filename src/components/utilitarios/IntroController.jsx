import { useEffect } from 'react';
import AnimatorManager from '../../managers/AnimatorManager';

const IntroController = () => {
  useEffect(() => {
    const manager = AnimatorManager.getInstance();

    // Aguarda um pouco para garantir que o DOM foi montado e registrado
    const timeoutId = setTimeout(() => {
      manager.playSequence([
        {
          id: 'home-hero-title-1',
          keyframes: [
            { color: '#000000' },
            { color: '#ff0000' }
          ],
          options: { duration: 1000, fill: 'forwards' }
        },
        {
          id: 'home-hero-title-2',
          keyframes: [
            { color: '#000000' },
            { color: '#ff0000' }
          ],
          options: { duration: 1000, fill: 'forwards' },
          delay: 500 // Espera a primeira começar
        }
      ]);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return null; // Este componente não renderiza nada visual, apenas controla lógica
};

export default IntroController;

