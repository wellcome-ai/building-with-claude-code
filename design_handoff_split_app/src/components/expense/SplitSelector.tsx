import React from 'react';
import type { Member } from '../../lib/types';
import { color, radius } from '../../tokens';
import { formatMoney } from '../../lib/balances';
import { DEFAULT_CURRENCY } from '../../config';
import { Avatar } from '../primitives/Avatar';

interface SplitSelectorProps {
  members: Member[];
  selected: string[];
  perPerson: number;
  amount: number;
  onToggle: (name: string) => void;
}

/** Multi-select of who shares the cost; shows each person's even share. */
export function SplitSelector({ members, selected, perPerson, amount, onToggle }: SplitSelectorProps) {
  return (
    <div style={{ background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.lg, overflow: 'hidden' }}>
      {members.map((m) => {
        const on = selected.includes(m.name);
        return (
          <div
            key={m.name}
            onClick={() => onToggle(m.name)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: `1px solid ${color.borderSoft}`, cursor: 'pointer' }}
          >
            <Avatar name={m.name} size={36} />
            <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{m.name}</div>
            <div style={{ fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: color.muted, marginRight: 4 }}>
              {on && amount > 0 ? formatMoney(perPerson, DEFAULT_CURRENCY) : '—'}
            </div>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: radius.pill,
                display: 'grid',
                placeItems: 'center',
                fontSize: 14,
                color: '#fff',
                background: on ? color.brand : 'transparent',
                border: on ? 0 : `2px solid ${color.border}`,
              }}
            >
              {on ? '✓' : ''}
            </div>
          </div>
        );
      })}
    </div>
  );
}
