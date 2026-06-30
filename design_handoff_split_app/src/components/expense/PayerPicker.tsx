import React from 'react';
import type { Member } from '../../lib/types';
import { color } from '../../tokens';
import { Avatar } from '../primitives/Avatar';

interface PayerPickerProps {
  members: Member[];
  value: string;
  onChange: (name: string) => void;
}

/** Horizontal avatar row; the selected payer gets a brand ring. */
export function PayerPicker({ members, value, onChange }: PayerPickerProps) {
  return (
    <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 2 }}>
      {members.map((m) => {
        const selected = m.name === value;
        return (
          <div
            key={m.name}
            onClick={() => onChange(m.name)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', flex: 'none' }}
          >
            <Avatar name={m.name} size={50} ring={selected} />
            <div style={{ fontSize: 12, fontWeight: 600, color: selected ? color.fg : color.faint }}>{m.name}</div>
          </div>
        );
      })}
    </div>
  );
}
