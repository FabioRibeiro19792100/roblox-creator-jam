import React, { useEffect } from 'react';
import { useAnimator } from '../../hooks/useAnimator';

const AnimatorDemo = () => {
  // Usamos o hook para registrar automaticamente os elementos
  const { ref: boxRef, animate: animateBox } = useAnimator('demo-box');
  const { ref: titleRef } = useAnimator('demo-title');
  const { manager } = useAnimator('demo-controller', false); // Apenas para pegar o manager

  const handlePulse = () => {
    animateBox([
      { transform: 'scale(1)' },
      { transform: 'scale(1.2)', offset: 0.5 },
      { transform: 'scale(1)' }
    ], {
      duration: 500,
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
    });
  };

  const handleSequence = () => {
    // Exemplo de uso avançado do Manager para orquestrar múltiplos elementos
    manager.playSequence([
      { 
        id: 'demo-title', 
        keyframes: [
          { transform: 'translateY(0)', opacity: 1 },
          { transform: 'translateY(-20px)', opacity: 0.5 },
          { transform: 'translateY(0)', opacity: 1 }
        ], 
        options: 600 
      },
      { 
        id: 'demo-box', 
        keyframes: [
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(360deg)' }
        ], 
        options: { duration: 1000, easing: 'ease-in-out' },
        delay: 100 // espera 100ms após o anterior terminar (neste caso, sequencial + delay)
      }
    ]);
  };

  // Observer example: Log events
  useEffect(() => {
    const unsubscribe = manager.subscribe((event, data) => {
      console.log(`[Animator Event] ${event}:`, data);
    });
    return unsubscribe;
  }, [manager]);

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #333', 
      margin: '20px',
      backgroundColor: '#111',
      color: '#fff',
      position: 'relative',
      zIndex: 10000 // Garante visibilidade
    }}>
      <h3 ref={titleRef} style={{ margin: '0 0 20px 0' }}>Animator Manager Demo</h3>
      
      <div 
        ref={boxRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#00b06f', // Roblox Green ish
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}
      >
        BOX
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handlePulse} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Pulsar Box (Local)
        </button>
        <button onClick={handleSequence} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Executar Sequência (Manager)
        </button>
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '0.8em', color: '#aaa' }}>
        Abra o console para ver os eventos do Observer.
      </div>
    </div>
  );
};

export default AnimatorDemo;












