import React from 'react';
import { color } from '../../tokens';

interface ScreenHeaderProps {
  title: string;
  /** Renders a "Cancel" text button on the left when provided. */
  onCancel?: () => void;
}

/** Modal-style top bar used by Create / Add expense / Settle up. */
export function ScreenHeader({ title, onCancel }: ScreenHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 18px',
        borderBottom: `1px solid ${color.borderSoft}`,
        flex: 'none',
      }}
    >
      {onCancel ? (
        <button
          onClick={onCancel}
          style={{ background: 'none', border: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: color.brand, cursor: 'pointer', padding: 0 }}
        >
          Cancel
        </button>
      ) : (
        <span style={{ width: 48 }} />
      )}
      <div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
      <span style={{ width: 48 }} />
    </div>
  );
}
