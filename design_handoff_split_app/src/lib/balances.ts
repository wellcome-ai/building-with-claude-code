import { avatarPalette } from '../tokens';
import type { Group, Debt } from './types';

/**
 * Net position per member for a group.
 * Positive = owed to them (creditor). Negative = they owe (debtor).
 * Even split: each person in `split` owes amount / split.length.
 * Settlement: debtor `from` pays creditor `to`, reducing both sides.
 */
export function computeBalances(group: Group): Record<string, number> {
  const net: Record<string, number> = {};
  group.members.forEach((m) => {
    net[m.name] = 0;
  });

  for (const it of group.items) {
    if (it.type === 'expense') {
      net[it.paidBy] = (net[it.paidBy] || 0) + it.amount;
      const share = it.amount / it.split.length;
      it.split.forEach((n) => {
        net[n] = (net[n] || 0) - share;
      });
    } else {
      net[it.from] = (net[it.from] || 0) + it.amount;
      net[it.to] = (net[it.to] || 0) - it.amount;
    }
  }

  // Round to cents to avoid float drift.
  Object.keys(net).forEach((k) => {
    net[k] = Math.round(net[k] * 100) / 100;
  });
  return net;
}

/**
 * Greedy minimal-transaction simplification: match the largest debtor to the
 * largest creditor until everyone is square. Returns directional debts.
 */
export function simplifyDebts(net: Record<string, number>): Debt[] {
  const cred: { n: string; v: number }[] = [];
  const deb: { n: string; v: number }[] = [];

  Object.entries(net).forEach(([n, v]) => {
    if (v > 0.005) cred.push({ n, v });
    else if (v < -0.005) deb.push({ n, v: -v });
  });

  cred.sort((a, b) => b.v - a.v);
  deb.sort((a, b) => b.v - a.v);

  const res: Debt[] = [];
  let i = 0;
  let j = 0;
  while (i < deb.length && j < cred.length) {
    const pay = Math.min(deb[i].v, cred[j].v);
    res.push({ from: deb[i].n, to: cred[j].n, amount: Math.round(pay * 100) / 100 });
    deb[i].v -= pay;
    cred[j].v -= pay;
    if (deb[i].v < 0.005) i++;
    if (cred[j].v < 0.005) j++;
  }
  return res;
}

/** Fixed avatar colours for known demo names; everyone else hashes into the palette. */
const FIXED_COLORS: Record<string, string> = {
  You: '#4F46E5',
  Priya: '#E5484D',
  Sam: '#15A86B',
  Maya: '#D97706',
  Kai: '#0891B2',
  Ana: '#7C3AED',
  Leo: '#DB2777',
};

export function colorForName(name: string): string {
  if (FIXED_COLORS[name]) return FIXED_COLORS[name];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return avatarPalette[h % avatarPalette.length];
}

/** Always renders two decimals; uses Math.abs so callers control the sign/colour. */
export function formatMoney(n: number, currency = '$'): string {
  return (
    currency +
    Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );
}

export function initial(name: string): string {
  return (name || ' ')[0].toUpperCase();
}
