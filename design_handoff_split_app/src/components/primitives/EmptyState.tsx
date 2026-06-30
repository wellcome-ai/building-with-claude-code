import React from 'react';
import { color, radius } from '../../tokens';
import { Button } from './Button';

interface EmptyStateProps {
  icon: string;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Dashed card (groups/activity empty) vs. plain centered (settled). */
  dashed?: boolean;
}

export function EmptyState({ icon, title, body, actionLabel, onAction, dashed = true }: EmptyStateProps) {
  return (
    <div
      style={{
        background: color.surface,
        border: dashed ? '1px dashed #D3D7DE' : `1px solid ${color.border}`,
        borderRadius: radius.xxl,
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: radius.xxl,
          background: color.brandSoft,
          display: 'grid',
          placeItems: 'center',
          margin: '0 auto 16px',
          fontSize: 30,
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14, color: color.muted, lineHeight: 1.5, marginBottom: actionLabel ? 18 : 0 }}>
        {body}
      </div>
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
