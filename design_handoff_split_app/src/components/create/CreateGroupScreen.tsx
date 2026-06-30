import React from 'react';
import { useSplit } from '../../state/SplitContext';
import { color, radius } from '../../tokens';
import { MemberRow } from './MemberRow';
import { Button } from '../primitives/Button';
import { ScreenHeader } from '../primitives/ScreenHeader';

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: color.surface,
  border: `1.5px solid ${color.border}`,
  borderRadius: radius.md,
  padding: '13px 14px',
  fontFamily: 'inherit',
  fontSize: 16,
  color: color.fg,
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.06em',
  color: color.muted,
};

/** Create a group: name field + inline add-members. "You" is added automatically. */
export function CreateGroupScreen() {
  const {
    draftName, setDraftName,
    draftMembers, removeMember,
    newMemberName, setNewMemberName, addMember,
    canCreate, createGroup, goGroups,
  } = useSplit();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: color.background }}>
      <ScreenHeader title="New group" onCancel={goGroups} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px' }}>
        <div style={{ ...labelStyle, marginBottom: 8 }}>Group name</div>
        <input
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          placeholder="e.g. Trip to Byron"
          style={fieldStyle}
        />

        <div style={{ ...labelStyle, margin: '22px 0 10px' }}>Members</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {draftMembers.map((m, i) => (
            <MemberRow key={m.name} member={m} onRemove={m.name === 'You' ? undefined : () => removeMember(i)} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addMember()}
            placeholder="Add a member by name"
            style={{ ...fieldStyle, flex: 1, minWidth: 0, fontSize: 15, padding: '12px 14px' }}
          />
          <Button variant="secondary" onClick={addMember} style={{ flex: 'none' }}>
            Add
          </Button>
        </div>
        <div style={{ fontSize: 12, color: color.faint, marginTop: 10, lineHeight: 1.5 }}>
          You’re added automatically. Add at least one other person to split with.
        </div>
      </div>

      <div style={{ padding: '14px 18px 18px', borderTop: `1px solid ${color.borderSoft}` }}>
        <Button block disabled={!canCreate} onClick={createGroup}>
          Create group
        </Button>
      </div>
    </div>
  );
}
