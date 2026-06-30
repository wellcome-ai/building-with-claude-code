import React from 'react';
import { color, radius, shadow } from '../../tokens';
import { CURRENT_USER } from '../../config';
import { Money } from '../primitives/Money';

interface BalanceHeroProps {
  net: Record<string, number>;
  groupName: string;
}

/** Big hero number for the current user within a group. */
export function BalanceHero({ net, groupName }: BalanceHeroProps) {
  const you = net[CURRENT_USER] || 0;

  let caption = 'All settled up';
  let tone = color.fg;
  if (you > 0.005) {
    caption = 'You’re owed';
    tone = color.positive;
  } else if (you < -0.005) {
    caption = 'You owe';
    tone = color.negative;
  }

  return (
    <div
      style={{
        background: color.surface,
        border: `1px solid ${color.border}`,
        borderRadius: radius.xxl,
        padding: 20,
        boxShadow: shadow.card,
        marginBottom: 18,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: color.muted }}>
        {caption}
      </div>
      <Money value={you} size={44} weight={800} color={tone} style={{ display: 'block', marginTop: 4 }} />
      <div style={{ fontSize: 13, color: color.faint, marginTop: 2 }}>in {groupName}</div>
    </div>
  );
}
