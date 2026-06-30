import React from 'react';
import { color } from '../../tokens';

interface TabsProps<T extends string> {
  tabs: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
}

/** Underline tabs — used on Group detail (Balances / Activity). */
export function Tabs<T extends string>({ tabs, active, onChange }: TabsProps<T>) {
  return (
    <div style={{ display: 'flex', gap: 26, padding: '0 18px', borderBottom: `1.5px solid ${color.border}` }}>
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <div
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              padding: '11px 0',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              color: on ? color.fg : color.faint,
              borderBottom: `3px solid ${on ? color.brand : 'transparent'}`,
            }}
          >
            {t.label}
          </div>
        );
      })}
    </div>
  );
}
