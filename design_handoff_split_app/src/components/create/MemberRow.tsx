import React from 'react';
import type { Member } from '../../lib/types';
import { color, radius } from '../../tokens';
import { Avatar } from '../primitives/Avatar';

interface MemberRowProps {
  member: Member;
  /** Omit to mark the row as the (non-removable) current user. */
  onRemove?: () => void;
}

/** A member chip in the Create-group members list. */
export function MemberRow({ member, onRemove }: MemberRowProps) {
  const isYou = member.name === 'You';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: color.surface,
        border: `1px solid ${color.border}`,
        borderRadius: radius.md,
        padding: '10px 12px',
      }}
    >
      <Avatar name={member.name} size={36} />
      <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{member.name}</div>
      {isYou && <div style={{ fontSize: 12, color: color.faint, fontWeight: 500 }}>you</div>}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label={`Remove ${member.name}`}
          style={{ background: 'none', border: 0, color: color.faint, fontSize: 22, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}
        >
          ×
        </button>
      )}
    </div>
  );
}
