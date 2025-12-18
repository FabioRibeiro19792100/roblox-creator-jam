import { useEffect } from 'react';
import AnimatorManager from '../../managers/AnimatorManager';

const ScrollRevealController = () => {
  useEffect(() => {
    const manager = AnimatorManager.getInstance();
    
    // Função auxiliar para quebrar texto em palavras (spans)
    // Preserva a estrutura HTML existente (como links e negrito)
    const splitElementText = (element) => {
      const nodes = Array.from(element.childNodes);
      
      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          // Pula nós de texto vazios ou só com espaços
          if (!text.trim()) return;
          
          const words = text.split(/(\s+)/); // Mantém os espaços como separadores
          const fragment = document.createDocumentFragment();
          
          words.forEach(word => {
            if (word.trim().length > 0) {
              const span = document.createElement('span');
              span.textContent = word;
              span.style.display = 'inline-block';
              span.style.opacity = '0';
              span.style.transform = 'translateY(100%)'; // Começa deslocado para baixo
              span.style.willChange = 'transform, opacity';
              span.classList.add('scroll-reveal-word');
              fragment.appendChild(span);
            } else {
              // É um espaço/separador
              fragment.appendChild(document.createTextNode(word));
            }
          });
          
          node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Recursão para elementos aninhados (links, strong, em, etc.)
          // Mas não entra em elementos que já têm comportamento de bloco ou animação própria
          const tagName = node.tagName.toLowerCase();
          if (!['br', 'img', 'svg', 'video', 'button', 'input'].includes(tagName)) {
             splitElementText(node);
          }
        }
      });
    };

    // Configuração do Observer de Scroll
    const observerOptions = {
      root: null, // Viewport
      rootMargin: '0px 0px -10% 0px', // Dispara um pouco antes de entrar totalmente
      threshold: 0.1
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const parentId = element.getAttribute('data-scroll-id');
          
          if (parentId) {
             // Restaura visibilidade do container pai (pois os filhos estão invisíveis)
             element.style.opacity = '1';
             element.style.transform = 'none';

             // Encontra todas as palavras dentro deste elemento
             const words = element.querySelectorAll('.scroll-reveal-word');
             
             if (words.length > 0) {
               words.forEach((word, index) => {
                 // Gera ID único para cada palavra
                 const wordId = `${parentId}-word-${index}`;
                 manager.register(wordId, word);
                 
                 // Anima com delay escalonado (stagger)
                 // Delay base pequeno + incremento por palavra
                 const delay = index * 30; // 30ms entre cada palavra
                 
                 setTimeout(() => {
                    manager.animate(wordId, 
                      [
                        { opacity: 0, transform: 'translateY(100%)' }, 
                        { opacity: 1, transform: 'translateY(0)' }
                      ], 
                      { 
                        duration: 600, // Duração um pouco menor por palavra para ficar dinâmico
                        fill: 'forwards', 
                        easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' 
                      }
                    );
                 }, delay);
               });
             } else {
               // Fallback: se não achou palavras (caso raro ou falha no split), anima o elemento todo
               manager.animate(parentId, 
                  [
                    { opacity: 0, transform: 'translateY(40px)' }, 
                    { opacity: 1, transform: 'translateY(0)' }
                  ],
                  { duration: 800, fill: 'forwards', easing: 'ease-out' }
               );
             }

             // Para de observar após disparar
             observer.unobserve(element);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Função para encontrar e preparar novos elementos
    const scanAndObserve = () => {
      const candidates = document.querySelectorAll('p, h2, h3, h4, h5, h6, li, blockquote, .scroll-reveal-target');
      
      candidates.forEach((el, index) => {
        // Critérios de exclusão
        if (el.hasAttribute('data-animate-id')) return;
        if (el.hasAttribute('data-scroll-id')) return;
        if (el.closest('.debug-kit') || 
            el.closest('.coordinate-grid-overlay') || 
            el.closest('.bounding-box-kit') ||
            el.closest('.animator-demo') ||
            el.closest('.home-hero-description') || // IGNORAR HERO DESCRIPTION
            el.classList.contains('scroll-reveal-word')) return;
        
        if (window.getComputedStyle(el).display === 'none') return;

        // Gera ID único
        const id = `scroll-text-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
        el.setAttribute('data-scroll-id', id);
        
        // Prepara o texto (split em palavras)
        // Importante: Isso altera o DOM. Deve ser feito apenas uma vez por elemento.
        try {
            splitElementText(el);
        } catch (e) {
            console.warn('Erro ao processar texto para animação:', el, e);
        }

        // O container pai fica visível, mas os filhos (spans) começam invisíveis
        // No entanto, para evitar flash, podemos esconder o pai até o observer pegar
        // Mas como já setamos opacidade 0 nos spans, não precisa esconder o pai drasticamente
        // Apenas garantimos que ele não interfira no layout
        el.style.opacity = '1'; 
        
        // Registra e observa
        manager.register(id, el);
        observer.observe(el);
      });
    };

    const timeoutId = setTimeout(scanAndObserve, 200);

    const mutationObserver = new MutationObserver((mutations) => {
        let shouldScan = false;
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) shouldScan = true;
        });
        if (shouldScan) {
          setTimeout(scanAndObserve, 100);
        }
    });
    
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};

export default ScrollRevealController;
