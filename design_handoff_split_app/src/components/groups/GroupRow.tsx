import React from 'react';
import type { Group } from '../../lib/types';
import { color, radius } from '../../tokens';
import { computeBalances, initial } from '../../lib/balances';
import { CURRENT_USER } from '../../config';
import { Avatar } from '../primitives/Avatar';
import { Money } from '../primitives/Money';

interface GroupRowProps {
  group: Group;
  onClick: () => void;
}

/** One row in the Groups list: tile, name + meta, and the user's one-line balance. */
export function GroupRow({ group, onClick }: GroupRowProps) {
  const you = computeBalances(group)[CURRENT_USER] || 0;
  const expenseCount = group.items.filter((i) => i.type === 'expense').length;

  let sub = 'settled up';
  let tone = color.settled;
  if (you > 0.005) {
    sub = 'owed to you';
    tone = color.positive;
  } else if (you < -0.005) {
    sub = 'you owe';
    tone = color.negative;
  }

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        padding: '15px 16px',
        borderBottom: `1px solid ${color.borderSoft}`,
        cursor: 'pointer',
      }}
    >
      <Avatar
        background={`linear-gradient(135deg, ${group.icon[0]}, ${group.icon[1]})`}
        label={initial(group.name)}
        shape="rounded"
        size={44}
        weight={800}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>{group.name}</div>
        <div style={{ fontSize: 13, color: color.muted }}>
          {group.members.length} people · {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'}
        </div>
      </div>
      <div style={{ textAlign: 'right', flex: 'none' }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', color: tone }}>
          {sub}
        </div>
        <Money value={you} size={17} weight={700} color={tone} />
      </div>
    </div>
  );
}
