import React from 'react';
import { useSplit } from '../../state/SplitContext';
import { color, radius, shadow } from '../../tokens';
import { OverallSummary } from './OverallSummary';
import { GroupRow } from './GroupRow';
import { Fab } from '../primitives/Fab';
import { EmptyState } from '../primitives/EmptyState';

/** Home screen: overall balance hero + the list of groups, FAB to create. */
export function GroupsScreen() {
  const { groups, openGroup, openCreate } = useSplit();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', background: color.background }}>
      <header style={{ padding: '18px 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Split</span>
        <div style={{ width: 36, height: 36, borderRadius: radius.pill, background: color.brand, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14 }}>
          Y
        </div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 18px 100px' }}>
        <OverallSummary />

        <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: color.muted, margin: '0 2px 10px' }}>
          Your groups
        </div>

        {groups.length > 0 ? (
          <div style={{ background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.xl, overflow: 'hidden', boxShadow: shadow.card }}>
            {groups.map((g) => (
              <GroupRow key={g.id} group={g} onClick={() => openGroup(g.id)} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="💸"
            title="No groups yet"
            body="Create a group to start splitting costs with friends, flatmates or your next trip."
            actionLabel="Create a group"
            onAction={openCreate}
          />
        )}
      </div>

      <Fab label="＋ New group" onClick={openCreate} />
    </div>
  );
}
