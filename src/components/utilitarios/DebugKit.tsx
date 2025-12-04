import React, { useEffect, useState, useRef } from 'react';

interface DebugKitProps {
  /** 
   * Opcional: Estado controlado externo.
   * Se não fornecido, o componente gerencia seu próprio estado (ideal para drop-in em outros projetos).
   */
  isActive?: boolean;
  /** Callback opcional para quando o estado muda */
  onToggle?: (newState: boolean) => void;
}

export const DebugKit: React.FC<DebugKitProps> = ({ isActive: controlledActive, onToggle }) => {
  // Lógica para suportar uso Standalone (sem props) ou Controlado (com props)
  const [internalActive, setInternalActive] = useState(false);
  const isControlled = controlledActive !== undefined;
  const active = isControlled ? controlledActive : internalActive;

  // Estado para animação de "pressionado" do botão
  const [buttonPressed, setButtonPressed] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleToggle = () => {
    const newState = !active;
    
    // Se não for controlado externamente, atualiza estado local
    if (!isControlled) {
      setInternalActive(newState);
    }
    
    // Notifica pai se houver callback
    if (onToggle) {
      onToggle(newState);
    }

    // Animação do clique
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setButtonPressed(true);
    timeoutRef.current = window.setTimeout(() => setButtonPressed(false), 220);
  };

  // Cleanup do timer de animação
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  // Efeito: Injeção de Estilos Globais de Debug
  useEffect(() => {
    if (active) {
      const style = document.createElement('style');
      style.id = 'debug-overlay-styles';
      style.innerHTML = `
        /* Debug Overlay Styles */
        * {
          position: relative;
        }
        
        /* Tooltip com informações do elemento */
        *[data-testid]:hover::after,
        *[id]:hover::after,
        *[class]:not([class=""]):hover::after {
          content: attr(data-testid) " | #" attr(id) " | ." attr(class);
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(255, 0, 0, 0.85);
          color: white;
          font-size: 10px;
          padding: 2px 4px;
          z-index: 99999; /* Z-index altíssimo para sobrepor tudo */
          pointer-events: none;
          white-space: nowrap;
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          border: 1px solid white;
        }

        /* Highlight visual */
        *[data-testid]:hover,
        *[id]:hover,
        *[class]:not([class=""]):hover {
          outline: 2px solid red !important;
          outline-offset: -2px;
          background-color: rgba(255, 0, 0, 0.05) !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      const existingStyle = document.getElementById('debug-overlay-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    }
    
    return () => {
      const existingStyle = document.getElementById('debug-overlay-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [active]);

  return (
    <button
      onClick={handleToggle}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
        padding: '10px 15px',
        backgroundColor: active ? 'red' : '#333',
        color: 'white',
        border: '2px solid white',
        borderRadius: '50px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: buttonPressed ? '0 6px 12px rgba(0,0,0,0.4)' : '0 4px 6px rgba(0,0,0,0.3)',
        fontSize: '12px',
        fontFamily: '"Libre Franklin", sans-serif',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: buttonPressed ? 'scale(0.92)' : 'scale(1)'
      }}
    >
      DEBUG {active ? 'ON' : 'OFF'}
    </button>
  );
};


