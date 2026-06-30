import React from 'react';
import { font } from '../../tokens';
import { formatMoney } from '../../lib/balances';
import { DEFAULT_CURRENCY } from '../../config';

interface MoneyProps {
  value: number;
  currency?: string;
  size?: number;
  weight?: number;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * A money figure. ALWAYS tabular-nums so amounts align in columns.
 * Sign is conveyed by `color` (green owed-to-you / red you-owe), not a minus.
 */
export function Money({
  value,
  currency = DEFAULT_CURRENCY,
  size = 16,
  weight = 700,
  color,
  style,
}: MoneyProps) {
  return (
    <span
      style={{
        fontVariantNumeric: font.money.fontVariantNumeric,
        letterSpacing: font.money.letterSpacing,
        fontWeight: weight,
        fontSize: size,
        color,
        ...style,
      }}
    >
      {formatMoney(value, currency)}
    </span>
  );
}
