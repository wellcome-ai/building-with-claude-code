import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Group, ActivityItem, Screen, DetailTab, Member } from '../lib/types';
import { colorForName } from '../lib/balances';
import { groupGradients } from '../tokens';
import { CURRENT_USER, EVEN_SPLIT_PRESELECT } from '../config';
import { seedGroups } from './seed';

/**
 * Single source of truth for the whole app. Screens read state and call
 * intent methods (openGroup, saveExpense, confirmSettle, …) — no business
 * logic lives in components.
 *
 * Navigation is modelled as in-app state (screen / activeGroupId / detailTab)
 * so the store is router-agnostic. To use React Router / Next.js instead, map
 * each `screen` to a route and replace the navigation methods with router
 * pushes — the data methods stay identical.
 *
 * Swap-in note: this is a deliberately small Context + useState store so the
 * port reads cleanly. In a real codebase, Zustand / Redux Toolkit / TanStack
 * Query (for a server) are all drop-in replacements — keep the method surface.
 */

const STORAGE_KEY = 'split_state_v1';

interface SplitState {
  groups: Group[];
  screen: Screen;
  activeGroupId: string | null;
  detailTab: DetailTab;
  // Create-group draft
  draftName: string;
  draftMembers: Member[];
  newMemberName: string;
  // Add-expense draft
  exAmount: string;
  exDesc: string;
  exPaidBy: string;
  exSplit: string[];
  // Settle draft
  settle: { from: string; to: string; amount: number };
}

interface SplitContextValue extends SplitState {
  activeGroup: Group | undefined;

  // Navigation
  openGroup: (id: string) => void;
  goGroups: () => void;
  backToDetail: () => void;
  setTab: (t: DetailTab) => void;

  // Create group
  openCreate: () => void;
  setDraftName: (v: string) => void;
  setNewMemberName: (v: string) => void;
  addMember: () => void;
  removeMember: (index: number) => void;
  canCreate: boolean;
  createGroup: () => void;

  // Add expense
  openAdd: (groupId: string) => void;
  setExAmount: (v: string) => void;
  setExDesc: (v: string) => void;
  setPayer: (name: string) => void;
  toggleSplit: (name: string) => void;
  canSaveExpense: boolean;
  saveExpense: () => void;

  // Settle up
  openSettle: (from: string, to: string, amount: number, groupId: string) => void;
  confirmSettle: () => void;

  // Demo helpers (not part of a production app)
  resetEmpty: () => void;
  reseed: () => void;
}

const SplitContext = createContext<SplitContextValue | null>(null);

function loadGroups(): Group[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.groups)) return parsed.groups as Group[];
    }
  } catch {
    /* ignore */
  }
  return seedGroups();
}

const member = (name: string): Member => ({ name, color: colorForName(name) });

export function SplitProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<SplitState>(() => ({
    groups: loadGroups(),
    screen: 'groups',
    activeGroupId: null,
    detailTab: 'balances',
    draftName: '',
    draftMembers: [],
    newMemberName: '',
    exAmount: '',
    exDesc: '',
    exPaidBy: CURRENT_USER,
    exSplit: [],
    settle: { from: '', to: '', amount: 0 },
  }));

  // Persist groups (only) across reloads.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ groups: s.groups }));
    } catch {
      /* ignore */
    }
  }, [s.groups]);

  const patch = useCallback((p: Partial<SplitState>) => setS((prev) => ({ ...prev, ...p })), []);

  const activeGroup = s.groups.find((g) => g.id === s.activeGroupId);

  // ---- Navigation ----
  const openGroup = useCallback((id: string) => patch({ screen: 'detail', activeGroupId: id, detailTab: 'balances' }), [patch]);
  const goGroups = useCallback(() => patch({ screen: 'groups' }), [patch]);
  const backToDetail = useCallback(() => patch({ screen: 'detail' }), [patch]);
  const setTab = useCallback((t: DetailTab) => patch({ detailTab: t }), [patch]);

  // ---- Create group ----
  const openCreate = useCallback(
    () => patch({ screen: 'create', draftName: '', draftMembers: [member(CURRENT_USER)], newMemberName: '' }),
    [patch],
  );
  const setDraftName = useCallback((v: string) => patch({ draftName: v }), [patch]);
  const setNewMemberName = useCallback((v: string) => patch({ newMemberName: v }), [patch]);
  const addMember = useCallback(() => {
    setS((prev) => {
      const name = prev.newMemberName.trim();
      if (!name) return prev;
      if (prev.draftMembers.some((m) => m.name.toLowerCase() === name.toLowerCase())) return prev;
      return { ...prev, draftMembers: [...prev.draftMembers, member(name)], newMemberName: '' };
    });
  }, []);
  const removeMember = useCallback(
    (index: number) => setS((prev) => ({ ...prev, draftMembers: prev.draftMembers.filter((_, i) => i !== index) })),
    [],
  );
  const canCreate = !!s.draftName.trim() && s.draftMembers.length >= 2;
  const createGroup = useCallback(() => {
    setS((prev) => {
      const name = prev.draftName.trim();
      if (!name || prev.draftMembers.length < 2) return prev;
      const icon = groupGradients[prev.groups.length % groupGradients.length];
      const id = 'g' + Date.now();
      const group: Group = {
        id,
        name,
        icon,
        members: prev.draftMembers.map((m) => ({ name: m.name, color: m.color })),
        items: [],
      };
      return { ...prev, groups: [...prev.groups, group], screen: 'detail', activeGroupId: id, detailTab: 'activity' };
    });
  }, []);

  // ---- Add expense ----
  const openAdd = useCallback((groupId: string) => {
    setS((prev) => {
      const g = prev.groups.find((x) => x.id === groupId);
      const preselect = EVEN_SPLIT_PRESELECT && g ? g.members.map((m) => m.name) : [];
      return { ...prev, screen: 'add', activeGroupId: groupId, exAmount: '', exDesc: '', exPaidBy: CURRENT_USER, exSplit: preselect };
    });
  }, []);
  const setExAmount = useCallback((v: string) => patch({ exAmount: v.replace(/[^0-9.]/g, '') }), [patch]);
  const setExDesc = useCallback((v: string) => patch({ exDesc: v }), [patch]);
  const setPayer = useCallback((name: string) => patch({ exPaidBy: name }), [patch]);
  const toggleSplit = useCallback((name: string) => {
    setS((prev) => ({
      ...prev,
      exSplit: prev.exSplit.includes(name) ? prev.exSplit.filter((x) => x !== name) : [...prev.exSplit, name],
    }));
  }, []);
  const canSaveExpense = (parseFloat(s.exAmount) || 0) > 0 && s.exSplit.length > 0;
  const saveExpense = useCallback(() => {
    setS((prev) => {
      const amt = parseFloat(prev.exAmount);
      if (!amt || amt <= 0 || prev.exSplit.length === 0 || !prev.activeGroupId) return prev;
      const item: ActivityItem = {
        id: 'e' + Date.now(),
        type: 'expense',
        desc: prev.exDesc.trim() || 'Expense',
        amount: Math.round(amt * 100) / 100,
        paidBy: prev.exPaidBy,
        split: [...prev.exSplit],
        ts: 'just now',
      };
      return {
        ...prev,
        groups: prev.groups.map((g) => (g.id === prev.activeGroupId ? { ...g, items: [...g.items, item] } : g)),
        screen: 'detail',
        detailTab: 'activity',
      };
    });
  }, []);

  // ---- Settle up ----
  const openSettle = useCallback(
    (from: string, to: string, amount: number, groupId: string) =>
      patch({ screen: 'settle', activeGroupId: groupId, settle: { from, to, amount } }),
    [patch],
  );
  const confirmSettle = useCallback(() => {
    setS((prev) => {
      if (!prev.activeGroupId) return prev;
      const item: ActivityItem = {
        id: 's' + Date.now(),
        type: 'settle',
        from: prev.settle.from,
        to: prev.settle.to,
        amount: prev.settle.amount,
        ts: 'just now',
      };
      return {
        ...prev,
        groups: prev.groups.map((g) => (g.id === prev.activeGroupId ? { ...g, items: [...g.items, item] } : g)),
        screen: 'detail',
        detailTab: 'balances',
      };
    });
  }, []);

  // ---- Demo helpers ----
  const resetEmpty = useCallback(() => patch({ groups: [], screen: 'groups' }), [patch]);
  const reseed = useCallback(() => patch({ groups: seedGroups(), screen: 'groups' }), [patch]);

  const value: SplitContextValue = {
    ...s,
    activeGroup,
    openGroup, goGroups, backToDetail, setTab,
    openCreate, setDraftName, setNewMemberName, addMember, removeMember, canCreate, createGroup,
    openAdd, setExAmount, setExDesc, setPayer, toggleSplit, canSaveExpense, saveExpense,
    openSettle, confirmSettle,
    resetEmpty, reseed,
  };

  return <SplitContext.Provider value={value}>{children}</SplitContext.Provider>;
}

export function useSplit(): SplitContextValue {
  const ctx = useContext(SplitContext);
  if (!ctx) throw new Error('useSplit must be used within <SplitProvider>');
  return ctx;
}
