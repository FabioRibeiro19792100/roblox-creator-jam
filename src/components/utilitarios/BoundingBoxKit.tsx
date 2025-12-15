import React, { useEffect, useState, useRef } from 'react';

export const BoundingBoxKit: React.FC = () => {
  const [active, setActive] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleToggle = () => {
    setActive((prev) => !prev);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setButtonPressed(true);
    timeoutRef.current = window.setTimeout(() => setButtonPressed(false), 220);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (active) {
      const style = document.createElement('style');
      style.id = 'bounding-box-kit-styles';
      style.innerHTML = `
        * {
          outline: 2px solid red !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      const existingStyle = document.getElementById('bounding-box-kit-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    }

    return () => {
      const existingStyle = document.getElementById('bounding-box-kit-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [active]);

  return (
    <button
      type="button"
      onClick={handleToggle}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '220px', // 100px offset from CoordinateGridKit (120px)
        zIndex: 99999,
        padding: '10px 15px',
        backgroundColor: active ? 'red' : '#222',
        color: 'white',
        border: '2px solid white',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: buttonPressed ? '0 6px 12px rgba(0,0,0,0.4)' : '0 4px 6px rgba(0,0,0,0.3)',
        fontSize: '12px',
        fontFamily: '"Libre Franklin", sans-serif',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: buttonPressed ? 'scale(0.92)' : 'scale(1)'
      }}
    >
      BOUNDS {active ? 'ON' : 'OFF'}
    </button>
  );
};

