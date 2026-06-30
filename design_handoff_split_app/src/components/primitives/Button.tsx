import React from 'react';
import { color, radius, shadow } from '../../tokens';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Fully rounded (chips / settle pills). */
  pill?: boolean;
  /** Full-width block button (bottom-of-screen CTA). */
  block?: boolean;
}

const variantStyle: Record<Variant, React.CSSProperties> = {
  primary: { background: color.brand, color: '#fff', boxShadow: shadow.fab },
  secondary: { background: color.brandSoft, color: color.brandStrong },
  ghost: { background: 'transparent', color: color.brand },
  danger: { background: color.negativeSoft, color: color.negative },
};

const sizeStyle: Record<Size, React.CSSProperties> = {
  sm: { padding: '8px 14px', fontSize: 13 },
  md: { padding: '12px 20px', fontSize: 15 },
  lg: { padding: 15, fontSize: 16 },
};

const disabledStyle: React.CSSProperties = {
  background: color.borderSoft,
  color: color.faint,
  boxShadow: 'none',
  cursor: 'not-allowed',
};

export function Button({
  variant = 'primary',
  size = 'md',
  pill = false,
  block = false,
  disabled = false,
  style,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      style={{
        fontFamily: 'inherit',
        fontWeight: 600,
        border: 0,
        cursor: 'pointer',
        borderRadius: pill ? radius.pill : block ? radius.lg : radius.md,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: block ? '100%' : undefined,
        ...sizeStyle[size],
        ...variantStyle[variant],
        ...(disabled ? disabledStyle : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
