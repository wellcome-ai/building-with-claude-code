import React from 'react';
import type { ActivityItem } from '../../lib/types';
import { color, radius } from '../../tokens';
import { formatMoney } from '../../lib/balances';
import { CURRENT_USER, SHOW_YOU_CONTEXT, DEFAULT_CURRENCY } from '../../config';
import { Avatar } from '../primitives/Avatar';
import { Money } from '../primitives/Money';

interface ActivityRowProps {
  item: ActivityItem;
}

/** One entry in the chronological feed — an expense or a settlement. */
export function ActivityRow({ item }: ActivityRowProps) {
  let title: string;
  let sub: string;
  let avatar: React.ReactNode;
  let note: { text: string; color: string } | null = null;

  if (item.type === 'expense') {
    const share = item.amount / item.split.length;
    const youIn = item.split.includes(CURRENT_USER);
    const youPaid = item.paidBy === CURRENT_USER;

    title = item.desc;
    sub = `${item.paidBy} paid · split ${item.split.length} ${item.split.length === 1 ? 'way' : 'ways'}`;
    avatar = <Avatar name={item.paidBy} size={40} shape="rounded" />;

    if (SHOW_YOU_CONTEXT) {
      if (youPaid) {
        const lent = item.amount - (youIn ? share : 0);
        note = { text: `you lent ${formatMoney(lent, DEFAULT_CURRENCY)}`, color: color.positive };
      } else if (youIn) {
        note = { text: `you borrowed ${formatMoney(share, DEFAULT_CURRENCY)}`, color: color.negative };
      }
    }
  } else {
    title = `${item.from} paid ${item.to}`;
    sub = 'Payment';
    avatar = <Avatar background={color.positive} label="✓" size={40} shape="rounded" />;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.lg, padding: 14 }}>
      {avatar}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 13, color: color.muted }}>{sub}</div>
        {note && <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2, color: note.color }}>{note.text}</div>}
      </div>
      <div style={{ textAlign: 'right', flex: 'none' }}>
        <Money value={item.amount} size={16} weight={700} color={color.fg} />
        <div style={{ fontSize: 11, color: color.faint }}>{item.ts}</div>
      </div>
    </div>
  );
}
