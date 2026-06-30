import React from 'react';
import { color, radius, shadow } from '../../tokens';

interface FabProps {
  label: string;
  onClick: () => void;
}

/** Extended floating action button, pinned bottom-right of a screen. */
export function Fab({ label, onClick }: FabProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        right: 18,
        bottom: 18,
        height: 52,
        padding: '0 22px',
        borderRadius: radius.xl,
        background: color.brand,
        color: '#fff',
        border: 0,
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 15,
        cursor: 'pointer',
        boxShadow: shadow.fab,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {label}
    </button>
  );
}
