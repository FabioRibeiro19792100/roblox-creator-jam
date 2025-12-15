import React, { useEffect, useMemo, useRef, useState } from 'react';

const GRID_SIZE = 120;
const SUBDIVISIONS = 4;
const HIGHLIGHT_CELL = { column: 0, row: 1 };

const getViewport = () => ({
  width: typeof window !== 'undefined' ? window.innerWidth : 0,
  height: typeof window !== 'undefined' ? window.innerHeight : 0
});

const getOffset = () => ({
  x: typeof window !== 'undefined' ? window.scrollX : 0,
  y: typeof window !== 'undefined' ? window.scrollY : 0
});

const ensureEven = (value: number) => {
  const rounded = Math.max(2, Math.round(value));
  return rounded % 2 === 0 ? rounded : rounded + 1;
};

const calculateGrid = (viewport: { width: number; height: number }) => {
  if (viewport.width === 0 || viewport.height === 0) {
    return {
      columns: 0,
      rows: 0,
      cellWidth: 0,
      cellHeight: 0,
      microColumns: 0,
      microRows: 0,
      microWidth: 0,
      microHeight: 0
    };
  }

  const targetColumns = ensureEven(viewport.width / GRID_SIZE);
  const searchRange = 20;
  let best:
    | {
        columns: number;
        rows: number;
        cellWidth: number;
        cellHeight: number;
        diff: number;
      }
    | null = null;

  const evaluateColumns = (columnsCandidate: number) => {
    if (columnsCandidate < 2) return;
    if (columnsCandidate % 2 !== 0) columnsCandidate += 1;
    const cellWidth = viewport.width / columnsCandidate;
    let rowsCandidate = ensureEven(viewport.height / cellWidth);
    const cellHeight = viewport.height / rowsCandidate;
    const diff = Math.abs(cellWidth - cellHeight);
    if (!best || diff < best.diff) {
      best = { columns: columnsCandidate, rows: rowsCandidate, cellWidth, cellHeight, diff };
    }
  };

  for (let delta = -searchRange; delta <= searchRange; delta += 2) {
    evaluateColumns(targetColumns + delta);
  }

  if (!best) {
    const fallbackColumns = ensureEven(2);
    const fallbackRows = ensureEven(2);
    const fallbackWidth = viewport.width / fallbackColumns;
    const fallbackHeight = viewport.height / fallbackRows;
    best = {
      columns: fallbackColumns,
      rows: fallbackRows,
      cellWidth: fallbackWidth,
      cellHeight: fallbackHeight,
      diff: Math.abs(fallbackWidth - fallbackHeight)
    };
  }

  return {
    columns: best.columns,
    rows: best.rows,
    cellWidth: best.cellWidth,
    cellHeight: best.cellHeight,
    microColumns: best.columns * SUBDIVISIONS,
    microRows: best.rows * SUBDIVISIONS,
    microWidth: best.cellWidth / SUBDIVISIONS,
    microHeight: best.cellHeight / SUBDIVISIONS
  };
};

export const useGridSystem = () => {
  const [viewport, setViewport] = useState(getViewport);
  const grid = useMemo(() => calculateGrid(viewport), [viewport]);

  useEffect(() => {
    const updateViewport = () => setViewport(getViewport());
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  /**
   * Converte uma lista de índices de subcélulas (base 1) em estilo CSS de posicionamento absoluto.
   * Ex: [1, 2, 3] -> Área abrangendo as células 1, 2 e 3.
   */
  const getGridAreaStyle = (subCells: number[]) => {
    if (!subCells.length || !grid.microColumns || !grid.microRows) return {};

    let minC = Infinity;
    let maxC = -Infinity;
    let minR = Infinity;
    let maxR = -Infinity;

    subCells.forEach(idx => {
      // Ajuste para Base 0 (1 -> 0)
      const i = idx - 1; 
      const r = Math.floor(i / grid.microColumns);
      const c = i % grid.microColumns;
      
      if (c < minC) minC = c;
      if (c > maxC) maxC = c;
      if (r < minR) minR = r;
      if (r > maxR) maxR = r;
    });

    return {
      position: 'absolute' as const,
      left: `${minC * grid.microWidth}px`,
      top: `${minR * grid.microHeight}px`,
      width: `${(maxC - minC + 1) * grid.microWidth}px`,
      height: `${(maxR - minR + 1) * grid.microHeight}px`
    };
  };

  return { getGridAreaStyle, cellSize: grid.microWidth, columns: grid.microColumns, grid, viewport };
};

export const CoordinateGridKit: React.FC = () => {
  const [active, setActive] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [viewport, setViewport] = useState(getViewport);
  const [offset, setOffset] = useState(getOffset);
  const timeoutRef = useRef<number | null>(null);
  const grid = useMemo(() => calculateGrid(viewport), [viewport]);

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
    if (!active) {
      return;
    }

    const updateViewport = () => setViewport(getViewport());
    const updateOffset = () => setOffset(getOffset());

    updateViewport();
    updateOffset();

    window.addEventListener('resize', updateViewport);
    window.addEventListener('scroll', updateOffset, { passive: true });

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('scroll', updateOffset);
    };
  }, [active]);

  const points = useMemo(() => {
    if (!grid.columns || !grid.rows) return [];
    const result: Array<{ x: number; y: number; label: string }> = [];
    for (let row = 0; row <= grid.rows; row += 1) {
      const y = row * grid.cellHeight;
      for (let col = 0; col <= grid.columns; col += 1) {
        const x = col * grid.cellWidth;
        result.push({
          x,
          y,
          label: `${Math.round(offset.x + x)}px, ${Math.round(offset.y + y)}px`
        });
      }
    }
    return result;
  }, [grid.columns, grid.rows, grid.cellHeight, grid.cellWidth, offset.x, offset.y]);

  const microCells = useMemo(() => {
    if (!grid.microColumns || !grid.microRows) return [];
    const total = grid.microRows * grid.microColumns;

    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / grid.microColumns);
      const col = index % grid.microColumns;
      return {
        id: `micro-${row}-${col}`,
        x: col * grid.microWidth,
        y: row * grid.microHeight,
        label: index + 1
      };
    });
  }, [grid.microColumns, grid.microRows, grid.microWidth, grid.microHeight]);

  const overlay = active ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${viewport.width}px`,
        height: `${viewport.height}px`,
        pointerEvents: 'none',
        zIndex: 99998,
        backgroundImage: `
          linear-gradient(to right, rgba(18, 88, 26, 0.35) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(18, 88, 26, 0.35) 1px, transparent 1px)
        `,
        backgroundSize: `
          ${grid.cellWidth}px ${grid.cellHeight}px,
          ${grid.cellWidth}px ${grid.cellHeight}px
        `,
        backgroundColor: 'rgba(255, 255, 255, 0.01)'
      }}
    >
      <div
        style={{
          position: 'relative',
          width: `${viewport.width}px`,
          height: `${viewport.height}px`,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '10px',
        color: 'rgba(18, 88, 26, 0.75)'
      }}
      >
        {/* Micro-cells and labels removed for simplification */}
        {grid.columns > HIGHLIGHT_CELL.column && grid.rows > HIGHLIGHT_CELL.row && (
          <div
            style={{
              position: 'absolute',
              top: HIGHLIGHT_CELL.row * grid.cellHeight,
              left: HIGHLIGHT_CELL.column * grid.cellWidth,
              width: `${grid.cellWidth}px`,
              height: `${grid.cellHeight}px`,
              backgroundColor: 'rgba(255, 230, 140, 0.2)',
              border: '2px solid rgba(255, 196, 0, 0.6)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
        )}
        {points.filter((_, i) => i % 2 === 0).map((point, idx) => (
          <span
            key={`coord-${idx}-${point.label}`}
            style={{
              position: 'absolute',
              top: point.y,
              left: point.x,
              transform: 'translate(4px, 2px)',
              padding: '1px 3px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(18, 88, 26, 0.15)',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
              fontSize: '9px',
              opacity: 0.8
            }}
          >
            {point.label}
          </span>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <>
      {overlay}
      <button
        type="button"
        onClick={handleToggle}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '120px',
          zIndex: 99999,
          padding: '10px 15px',
          backgroundColor: active ? '#12581a' : '#222',
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
        GRID {active ? 'ON' : 'OFF'}
      </button>
    </>
  );
};
