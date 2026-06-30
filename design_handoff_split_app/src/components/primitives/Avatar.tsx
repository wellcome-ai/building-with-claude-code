import React from 'react';
import { radius } from '../../tokens';
import { colorForName, initial } from '../../lib/balances';

interface AvatarProps {
  /** Member name — drives both colour and initial when not overridden. */
  name?: string;
  /** Override background (e.g. a gradient string for group tiles). */
  background?: string;
  /** Override the glyph (e.g. "✓" for a settlement, "+2" for an overflow). */
  label?: string;
  size?: number;
  shape?: 'circle' | 'rounded';
  weight?: number;
  /** Brand selection ring (used by the payer picker). */
  ring?: boolean;
  /** White border, for overlapping stacks. */
  stacked?: boolean;
  style?: React.CSSProperties;
}

/** Initial-in-a-circle avatar. Colour is deterministic per name. */
export function Avatar({
  name = '',
  background,
  label,
  size = 40,
  shape = 'circle',
  weight = 700,
  ring = false,
  stacked = false,
  style,
}: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: shape === 'circle' ? radius.pill : Math.round(size * 0.28),
        background: background ?? colorForName(name),
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        fontWeight: weight,
        fontSize: Math.round(size * 0.38),
        flex: 'none',
        boxShadow: ring ? '0 0 0 3px rgba(79,70,229,.9)' : undefined,
        border: stacked ? '2px solid #fff' : undefined,
        marginLeft: stacked ? -8 : undefined,
        ...style,
      }}
    >
      {label ?? initial(name)}
    </div>
  );
}
