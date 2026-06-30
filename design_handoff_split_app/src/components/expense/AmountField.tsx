import React from 'react';
import { color, radius, shadow } from '../../tokens';
import { DEFAULT_CURRENCY } from '../../config';

interface AmountFieldProps {
  value: string;
  onChange: (v: string) => void;
  currency?: string;
}

const QUICK = ['10', '20', '50', '100'];

/** The hero amount input with a focused brand ring, plus quick-amount chips. */
export function AmountField({ value, onChange, currency = DEFAULT_CURRENCY }: AmountFieldProps) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: color.surface,
          border: `1.5px solid ${color.brand}`,
          borderRadius: radius.xl,
          padding: '14px 18px',
          boxShadow: shadow.focus,
        }}
      >
        <span style={{ fontSize: 28, fontWeight: 700, color: color.faint, marginRight: 6 }}>{currency}</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputMode="decimal"
          placeholder="0.00"
          style={{
            border: 0,
            outline: 0,
            fontFamily: 'inherit',
            fontSize: 36,
            fontWeight: 800,
            color: color.fg,
            width: '100%',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.02em',
            background: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        {QUICK.map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            style={{ flex: 1, background: color.borderSoft, color: color.brandStrong, border: 0, fontFamily: 'inherit', fontWeight: 600, fontSize: 14, padding: '9px 0', borderRadius: 10, cursor: 'pointer' }}
          >
            {currency}{v}
          </button>
        ))}
      </div>
    </>
  );
}
