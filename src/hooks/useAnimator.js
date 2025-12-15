import { useEffect, useRef } from 'react';
import AnimatorManager from '../managers/AnimatorManager';

/**
 * Hook para facilitar o uso do AnimatorManager em componentes React.
 * 
 * @param {string} id - Identificador único para o elemento neste contexto
 * @param {boolean} autoRegister - Se deve registrar automaticamente no mount (default: true)
 * @returns {Object} { ref, animate, manager }
 */
export const useAnimator = (id, autoRegister = true) => {
  const ref = useRef(null);
  const manager = AnimatorManager.getInstance();

  useEffect(() => {
    if (autoRegister && ref.current && id) {
      manager.register(id, ref.current);
    }

    return () => {
      if (autoRegister && id) {
        manager.unregister(id);
      }
    };
  }, [id, autoRegister, manager]);

  /**
   * Wrapper para animar o elemento atual sem precisar passar o ID novamente
   */
  const animate = (keyframes, options) => {
    if (id) {
      return manager.animate(id, keyframes, options);
    }
    // Fallback caso não tenha ID mas tenha ref, tenta animar direto (bypass manager registry for quick animations)
    if (ref.current) {
        return ref.current.animate(keyframes, options);
    }
    return null;
  };

  return {
    ref,
    animate,
    manager // Acesso direto ao manager se precisar de métodos complexos (sequence, etc)
  };
};

export default useAnimator;












