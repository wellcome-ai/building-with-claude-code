import React from 'react';
import type { Debt } from '../../lib/types';
import { color } from '../../tokens';
import { CURRENT_USER } from '../../config';
import { Avatar } from '../primitives/Avatar';
import { Money } from '../primitives/Money';
import { Button } from '../primitives/Button';

interface SettleRowProps {
  debt: Debt;
  onSettle: () => void;
}

/** A simplified directional debt: "X owes Y $Z" with a Settle action.
 *  Label colour orients to the current user (green = owed to you, red = you owe). */
export function SettleRow({ debt, onSettle }: SettleRowProps) {
  let label: string;
  let labelColor = color.fg;
  if (debt.to === CURRENT_USER) {
    label = `${debt.from} owes you`;
    labelColor = color.positive;
  } else if (debt.from === CURRENT_USER) {
    label = `You owe ${debt.to}`;
    labelColor = color.negative;
  } else {
    label = `${debt.from} owes ${debt.to}`;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14, borderBottom: `1px solid ${color.borderSoft}` }}>
      <Avatar name={debt.from} size={34} />
      <span style={{ color: '#C7CBD3', fontSize: 16 }}>→</span>
      <Avatar name={debt.to} size={34} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: labelColor }}>{label}</div>
        <Money value={debt.amount} size={17} weight={800} color={color.fg} />
      </div>
      <Button size="sm" pill onClick={onSettle} style={{ flex: 'none', boxShadow: 'none' }}>
        Settle
      </Button>
    </div>
  );
}
