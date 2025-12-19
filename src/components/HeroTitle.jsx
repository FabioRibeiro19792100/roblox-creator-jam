import React, { useEffect, useState } from 'react';
import './HeroTitle.css';

const HeroTitle = ({ line1, line2 }) => {
  const text1 = line1 || 'Criar é';
  const text2 = line2 || 'o novo jogar';
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Dispara a animação logo após a montagem
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const splitText = (text) => {
    return text.split('').map((char, index) => {
      // Gera valores aleatórios para a posição inicial e rotação
      // --dx: deslocamento X inicial (-100px a 100px)
      // --dy: deslocamento Y inicial (-100px a 100px)
      // --r: rotação inicial (-45deg a 45deg)
      // --d: delay para "chegada" variada
      const style = {
        '--dx': `${Math.random() * 200 - 100}px`,
        '--dy': `${Math.random() * 200 - 100}px`,
        '--r': `${Math.random() * 90 - 45}deg`,
        '--d': `${index * 0.1}s`, // Stagger sequencial (dobrado)
        '--jit-x': `${Math.random() * 10 - 5}px`, // Jitter aleatório para o efeito de empurrão
        '--jit-y': `${Math.random() * 10 - 5}px`
      };

      if (char === ' ') {
        return <span key={index} className="hero-title-space">&nbsp;</span>;
      }

      return (
        <span 
          key={index} 
          className={`hero-title-char ${isAnimated ? 'animate' : ''}`}
          style={style}
          aria-hidden="true"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <h1 
      className="hero-title-module" 
      data-align="content" 
      data-animate-id="hero-title"
      aria-label={`${text1} ${text2}`} // Garante acessibilidade lendo a frase completa
    >
      <span className="hero-title-line-1">
        {splitText(text1)}
      </span>
      <br className="mobile-only" />
      <span className="hero-title-line-2">
        {splitText(text2)}
      </span>
    </h1>
  );
};

export default HeroTitle;
