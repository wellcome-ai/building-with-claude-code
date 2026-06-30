import React from 'react';
import { useSplit } from '../../state/SplitContext';
import { color, radius, shadow } from '../../tokens';
import { computeBalances } from '../../lib/balances';
import { CURRENT_USER } from '../../config';
import { Money } from '../primitives/Money';

/** Net of the current user across every group → the home hero number. */
export function OverallSummary() {
  const { groups } = useSplit();
  const overall = groups.reduce((acc, g) => acc + (computeBalances(g)[CURRENT_USER] || 0), 0);

  let caption = 'Overall, you’re all square';
  let amountColor = color.fg;
  if (overall > 0.005) {
    caption = 'Overall, you’re owed';
    amountColor = color.positive;
  } else if (overall < -0.005) {
    caption = 'Overall, you owe';
    amountColor = color.negative;
  }

  return (
    <div
      style={{
        background: color.surface,
        border: `1px solid ${color.border}`,
        borderRadius: radius.xxl,
        padding: '18px 20px',
        boxShadow: shadow.card,
        marginBottom: 18,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: color.muted }}>
        {caption}
      </div>
      <Money value={overall} size={40} weight={800} color={amountColor} style={{ display: 'block', marginTop: 4 }} />
      <div style={{ fontSize: 13, color: color.faint, marginTop: 2 }}>across all your groups</div>
    </div>
  );
}
