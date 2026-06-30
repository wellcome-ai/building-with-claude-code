import React from 'react';
import { useSplit } from '../../state/SplitContext';
import { color, radius } from '../../tokens';
import { formatMoney } from '../../lib/balances';
import { CURRENT_USER, DEFAULT_CURRENCY } from '../../config';
import { ScreenHeader } from '../primitives/ScreenHeader';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';

/** Confirm a payment between two people, showing the before/after balance. */
export function SettleUpScreen() {
  const { settle, confirmSettle, backToDetail } = useSplit();
  const { from, to, amount } = settle;

  let headline = from ? `${from} pays ${to}` : '';
  let tone = color.fg;
  if (to === CURRENT_USER) {
    headline = `${from} pays you`;
    tone = color.positive;
  } else if (from === CURRENT_USER) {
    headline = `You pay ${to}`;
    tone = color.negative;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: color.background }}>
      <ScreenHeader title="Settle up" onCancel={backToDetail} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '30px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 14 }}>
          <Avatar name={from} size={64} />
          <span style={{ color: '#C7CBD3', fontSize: 26 }}>→</span>
          <Avatar name={to} size={64} />
        </div>

        <div style={{ fontSize: 16, fontWeight: 600, color: color.muted, marginTop: 24 }}>{headline}</div>
        <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', marginTop: 4, color: tone }}>
          {formatMoney(amount, DEFAULT_CURRENCY)}
        </div>

        <div style={{ width: '100%', background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.xl, overflow: 'hidden', marginTop: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 16px', borderBottom: `1px solid ${color.borderSoft}` }}>
            <div style={{ fontSize: 14, color: color.muted }}>Before this payment</div>
            <div style={{ fontSize: 16, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: tone }}>
              {formatMoney(amount, DEFAULT_CURRENCY)}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 16px' }}>
            <div style={{ fontSize: 14, color: color.muted }}>After</div>
            <div style={{ fontSize: 16, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: color.positive }}>
              {formatMoney(0, DEFAULT_CURRENCY)} · square
            </div>
          </div>
        </div>

        <div style={{ fontSize: 13, color: color.faint, marginTop: 16, textAlign: 'center', lineHeight: 1.5 }}>
          Records the payment and clears this balance for both of you.
        </div>
      </div>

      <div style={{ padding: '14px 18px 18px', borderTop: `1px solid ${color.borderSoft}` }}>
        <Button block onClick={confirmSettle}>
          Mark as settled
        </Button>
      </div>
    </div>
  );
}
