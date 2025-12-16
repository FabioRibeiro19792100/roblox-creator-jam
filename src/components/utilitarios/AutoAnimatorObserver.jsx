import React, { useEffect } from 'react';
import AnimatorManager from '../../managers/AnimatorManager';

/**
 * AutoAnimatorObserver
 * 
 * Componente wrapper que observa mudanças no DOM para registrar automaticamente 
 * elementos que possuam o atributo 'data-animate-id'.
 * 
 * Isso permite registrar elementos sem usar o hook useAnimator explicitamente em cada componente,
 * ideal para conteúdo dinâmico ou estruturado via HTML/CMS.
 */
const AutoAnimatorObserver = ({ children }) => {
  useEffect(() => {
    const manager = AnimatorManager.getInstance();

    // Função para processar nós adicionados
    const processNodes = (nodes) => {
      nodes.forEach(node => {
        if (node.nodeType === 1) { // Element node
          // Verifica o próprio nó
          if (node.hasAttribute('data-animate-id')) {
            const id = node.getAttribute('data-animate-id');
            manager.register(id, node);
          }
          
          // Verifica filhos do nó (caso um bloco grande seja inserido)
          const children = node.querySelectorAll('[data-animate-id]');
          children.forEach(child => {
            const id = child.getAttribute('data-animate-id');
            manager.register(id, child);
          });
        }
      });
    };

    // Função para processar nós removidos
    const processRemovedNodes = (nodes) => {
      nodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.hasAttribute('data-animate-id')) {
            const id = node.getAttribute('data-animate-id');
            manager.unregister(id);
          }
          
          const children = node.querySelectorAll('[data-animate-id]');
          children.forEach(child => {
            const id = child.getAttribute('data-animate-id');
            manager.unregister(id);
          });
        }
      });
    };

    // Configuração do MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes.length > 0) {
            processNodes(mutation.addedNodes);
          }
          if (mutation.removedNodes.length > 0) {
            processRemovedNodes(mutation.removedNodes);
          }
        } else if (mutation.type === 'attributes' && mutation.attributeName === 'data-animate-id') {
          // Tratamento para mudança dinâmica do atributo ID
          const node = mutation.target;
          const newId = node.getAttribute('data-animate-id');
          const oldId = mutation.oldValue;
          
          if (oldId) manager.unregister(oldId);
          if (newId) manager.register(newId, node);
        }
      });
    });

    // Varredura inicial
    const initialElements = document.querySelectorAll('[data-animate-id]');
    initialElements.forEach(el => {
      manager.register(el.getAttribute('data-animate-id'), el);
    });

    // Inicia observação
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-animate-id'],
      attributeOldValue: true
    });

    return () => {
      observer.disconnect();
      // Opcional: Limpar registros ao desmontar o observer raiz? 
      // Geralmente não, pois o Manager é Singleton global.
    };
  }, []);

  return <>{children}</>;
};

export default AutoAnimatorObserver;

