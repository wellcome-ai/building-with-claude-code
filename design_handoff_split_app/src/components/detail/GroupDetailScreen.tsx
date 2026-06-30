import React from 'react';
import { useSplit } from '../../state/SplitContext';
import { color } from '../../tokens';
import { computeBalances, simplifyDebts } from '../../lib/balances';
import { Tabs } from '../primitives/Tabs';
import { Avatar } from '../primitives/Avatar';
import { Fab } from '../primitives/Fab';
import { EmptyState } from '../primitives/EmptyState';
import { BalanceHero } from './BalanceHero';
import { SettleRow } from './SettleRow';
import { ActivityRow } from './ActivityRow';
import type { DetailTab } from '../../lib/types';

const sectionLabel: React.CSSProperties = {
  fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: color.muted, margin: '0 2px 10px',
};

/** Group detail: header + Balances/Activity tabs + FAB to add an expense. */
export function GroupDetailScreen() {
  const { activeGroup, detailTab, setTab, goGroups, openAdd, openSettle } = useSplit();
  if (!activeGroup) return null;

  const g = activeGroup;
  const net = computeBalances(g);
  const debts = simplifyDebts(net);
  const expenseCount = g.items.filter((i) => i.type === 'expense').length;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', background: color.background }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px 12px' }}>
        <button onClick={goGroups} style={{ background: 'none', border: 0, color: color.brand, fontSize: 24, cursor: 'pointer', padding: 0, lineHeight: 1, fontWeight: 600 }}>
          ‹
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {g.name}
          </div>
          <div style={{ fontSize: 12, color: color.faint }}>
            {g.members.length} people · {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          {g.members.map((m) => (
            <Avatar key={m.name} name={m.name} size={30} stacked />
          ))}
        </div>
      </div>

      <Tabs<DetailTab>
        tabs={[{ id: 'balances', label: 'Balances' }, { id: 'activity', label: 'Activity' }]}
        active={detailTab}
        onChange={setTab}
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 100px' }}>
        {detailTab === 'balances' && (
          <>
            <BalanceHero net={net} groupName={g.name} />
            {debts.length > 0 ? (
              <>
                <div style={sectionLabel}>Who owes whom</div>
                <div style={{ background: color.surface, border: `1px solid ${color.border}`, borderRadius: 16, overflow: 'hidden' }}>
                  {debts.map((d, i) => (
                    <SettleRow key={i} debt={d} onSettle={() => openSettle(d.from, d.to, d.amount, g.id)} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState icon="🎉" title="All settled up" body="Everyone in this group is square." dashed />
            )}
          </>
        )}

        {detailTab === 'activity' &&
          (g.items.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[...g.items].reverse().map((item) => (
                <ActivityRow key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🧾"
              title="No expenses yet"
              body="Add your first expense and we’ll keep a running tally for everyone."
            />
          ))}
      </div>

      <Fab label="＋ Add expense" onClick={() => openAdd(g.id)} />
    </div>
  );
}
