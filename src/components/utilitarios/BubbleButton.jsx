import React, { useRef } from 'react';
import AnimatorManager from '../../managers/AnimatorManager';
import './BubbleButton.css';

/**
 * Botão com efeito "Gooey/Bubble" (Bolhas) usando Web Animations API.
 * Substitui a necessidade de jQuery/GSAP do exemplo original.
 * 
 * Props:
 * - children: Conteúdo do botão
 * - onClick: Função de clique
 * - className: Classes adicionais
 * - style: Estilos inline (útil para --button-bg-color)
 * - color: Cor principal do botão e das bolhas (padrão: #222 ou var(--button-bg-color))
 */
const BubbleButton = ({ children, onClick, className = '', style = {}, color, ...props }) => {
  const buttonRef = useRef(null);
  const circlesTopLeftRef = useRef([]);
  const circlesBottomRightRef = useRef([]);
  const manager = AnimatorManager.getInstance();

  // Referências para os elementos de bolha
  const setCircleTopLeft = (el, index) => circlesTopLeftRef.current[index] = el;
  const setCircleBottomRight = (el, index) => circlesBottomRightRef.current[index] = el;

  const handleMouseEnter = () => {
    // Animação das bolhas Top-Left
    circlesTopLeftRef.current.forEach((circle, index) => {
      if (!circle) return;
      
      // Reset inicial
      circle.style.opacity = '1';
      circle.style.transform = 'translate(0, 0) scale(1)';

      // Sequência de animação (WAAPI)
      // Movimento de expansão e distorção
      manager.animate(`bubble-tl-${index}-${Date.now()}`, circle, [
        { transform: 'translate(0, 0) scale(1)', offset: 0 },
        { transform: 'translate(-25px, -25px) scaleY(2)', offset: 0.4 },
        { transform: `translate(${index === 0 ? 6 : index === 1 ? -10 : -15}px, ${index === 0 ? -2 : index === 1 ? -7 : 6}px) scale(${index === 1 ? '1, 0.8' : '0.2'})`, offset: 0.5 },
        { transform: `translate(${index === 0 ? -5 : index === 1 ? -10 : -15}px, ${index === 0 ? -15 : index === 1 ? -10 : 5}px) scale(0)`, opacity: 0, offset: 1 }
      ], {
        duration: 600, // Acelerado em relação ao original (1.2s / 2)
        easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)', // Simula SlowMo
        fill: 'forwards'
      });
    });

    // Animação das bolhas Bottom-Right
    circlesBottomRightRef.current.forEach((circle, index) => {
        if (!circle) return;
        
        circle.style.opacity = '1';
        circle.style.transform = 'translate(0, 0) scale(1)';
  
        manager.animate(`bubble-br-${index}-${Date.now()}`, circle, [
          { transform: 'translate(0, 0) scale(1)', offset: 0 },
          { transform: 'translate(30px, 30px) scale(1)', offset: 0.4 },
          { transform: `translate(${index === 0 ? -6 : index === 1 ? 7 : 15}px, ${index === 0 ? 3 : index === 1 ? 3 : -6}px) scale(${index === 1 ? '0.8' : '0.2'})`, offset: 0.5 },
          { transform: `translate(${index === 0 ? 5 : index === 1 ? 7 : 15}px, ${index === 0 ? 15 : index === 1 ? 7 : -5}px) scale(0)`, opacity: 0, offset: 1 }
        ], {
          duration: 600,
          easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)',
          fill: 'forwards'
        });
      });

      // Animação de "Elasticidade" do botão principal
      if (buttonRef.current) {
        manager.animate(`bubble-btn-elastic-${Date.now()}`, buttonRef.current, [
            { transform: 'scaleY(1)', offset: 0 },
            { transform: 'scaleY(1.1)', offset: 0.1 }, // Estica
            { transform: 'scaleY(1)', offset: 1 } // Volta (com efeito elástico definido no easing se possível, ou keyframes manuais)
        ], {
            duration: 800,
            easing: 'cubic-bezier(1.2, 0.4, 1.0, 1.0)', // Tentativa de Elastic.easeOut
            fill: 'forwards'
        });
      }
  };

  const dynamicStyle = color ? { ...style, '--button-bg-color': color } : style;

  return (
    <span className={`bubble-button-container ${className}`} style={dynamicStyle}>
      <button 
        ref={buttonRef}
        className="bubble-button"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {children}
      </button>
      
      <span className="bubble-effect-container">
        <span ref={(el) => setCircleTopLeft(el, 0)} className="circle top-left"></span>
        <span ref={(el) => setCircleTopLeft(el, 1)} className="circle top-left"></span>
        <span ref={(el) => setCircleTopLeft(el, 2)} className="circle top-left"></span>
        
        <span ref={(el) => setCircleBottomRight(el, 0)} className="circle bottom-right"></span>
        <span ref={(el) => setCircleBottomRight(el, 1)} className="circle bottom-right"></span>
        <span ref={(el) => setCircleBottomRight(el, 2)} className="circle bottom-right"></span>
      </span>
      
      {/* SVG Filter definition - Deve estar presente na página (ou globalmente) */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="goo-filter-def">
        <defs>
            <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo"/>
            </filter>
        </defs>
      </svg>
    </span>
  );
};

export default BubbleButton;












