# Split — Requirements

**Date:** 2026-06-26
**Status:** Brainstorm complete, ready for planning
**Type:** Demo app (Splitwise-lite). Right-sized for a build-day demo, not production.

## Overview

Split is a group expense tracker for one person, no accounts, no login. You create a
**group** (e.g. "Trip to Byron"), add **members** (just names), log **expenses** (amount,
who paid, who it's split among), and the app tracks **who owes whom** and lets you
**settle up**. Multi-screen, mobile-first. All data persists to localStorage; no backend.

The two pieces of real logic — cent-rounding and debt simplification — are the point of the
app. They're easy to get subtly wrong, which is what makes the plan review and code review
find genuine bugs instead of theatre.

## Core concepts

- **Group** — a named container with a set of members and a list of expenses.
- **Member** — a name within a group. No account, no global identity; a member belongs to
  one group.
- **You** — the person using the app. You are automatically a member of every group you
  create (shown as "You" and not removable), so balances and amounts read in the first
  person ("Priya owes you $40").
- **Expense** — an amount, who paid (one member), and who it's split among (one or more
  members). For this demo, always an **equal** split among the selected participants.
- **Balance** — a member's net position in the group: total they paid minus total they
  owe. Positive = they're owed money; negative = they owe money. Balances always sum to
  zero across the group.
- **Settle-up** — a payment from a debtor to a creditor that clears (part of) the balance.

## Scope

### In scope — designed AND built (the core loop)
1. Groups list (empty + populated, with per-group balance summary).
2. Create group (name + add members inline).
3. Group detail — **Balances** tab (who owes whom) and **Activity** tab (expense feed).
4. Add expense (amount, who paid, split-among multi-select, equal split).
5. Correct cent-rounding and debt simplification (see Money rules).
6. Persistence to localStorage — data survives a page reload.

### In scope — designed, build deferred
- **Settle up** screen — confirm a payment between two people; balance clears. Designed in
  full; in the build it's a stub/disabled button. The next obvious step, not part of the
  core-loop build.

### Out of scope (not this product)
- Accounts, login, multiple users, sync across devices.
- Multiple currencies / FX. Single implicit currency, display only.
- Exact-amount, shares, or percentage splits. Equal-only for now (see Outstanding
  questions for the future extension).
- Editing or deleting expenses and members after creation (see Edge cases — these are
  acknowledged gaps, not built).
- Categories, receipts, photos, notifications, export.

## The three core journeys

1. **First use / create a group.** Land on an empty Groups list → create a group → name it
   and add members inline → land in the new, empty group ready for its first expense.
2. **Log an expense.** Open a group → add an expense (amount, who paid, who it's split
   among, equal split) → it appears in the Activity feed and the Balances tab updates.
3. **Settle up** (designed, deferred build). Open a group → view Balances
   ("Priya owes you $40") → tap settle → confirm → the balance clears.

## Money rules (the heart of the app)

### Rounding — shares must sum exactly to the total
When an equal split doesn't divide evenly, the per-person shares must still add up to the
exact total — no lost or invented cents.

- Work in integer **cents**, never floats.
- Base share = `floor(total_cents / n)` for each of the `n` participants.
- Remainder = `total_cents − (base_share × n)`. This is between `0` and `n−1` cents.
- Distribute the remainder one cent at a time to the first participants in a **deterministic
  order** (member order within the group). Each participant ends up off by at most 1 cent.

**Worked example:** $10.00 split 3 ways → 1000 cents. Base = 333 each (999), remainder = 1.
First participant gets 334, the other two get 333. Sum = 334 + 333 + 333 = 1000 = $10.00. ✓
The determinism matters: the same expense always assigns the extra cent to the same person,
so reloads and recalculations are stable.

### Debt simplification — reduce the number of transactions
Show fewer payments that settle the whole group, not every raw pairwise debt. (The
build uses a greedy approach: it reduces the transaction count and is deterministic,
but does not guarantee the theoretical minimum, which is a harder problem than this
demo needs.)

- Compute each member's **net balance** (total paid − total share owed) across all expenses.
- Members net-positive are creditors; net-negative are debtors. The two sides sum to zero.
- Greedily match the largest debtor against the largest creditor, settle the smaller of the
  two amounts, and repeat until all balances are zero.

**Worked example:** A owes B $10 and B owes C $10. Raw, that's two transactions through B.
Simplified, B nets to zero and the result is a single transaction: **A owes C $10.**

**Known tradeoff (note in the UI/plan):** full simplification minimises transactions but
loses provenance — the suggested payment ("A pays C") may be between two people who never
actually shared an expense. That's the accepted behaviour for this demo; the Activity feed
remains the source of truth for what actually happened.

## Edge cases to handle

- **Empty / tiny groups.** A group with 0 or 1 members can't have a meaningful split.
  Block adding an expense (or disable the action) until there are at least 2 members.
- **Split among nobody.** An expense must be split among at least one participant; the add
  form can't be submitted with an empty selection.
- **Invalid amount.** Reject zero, negative, and non-numeric amounts. Round/limit input to
  2 decimal places before converting to cents.
- **Payer not in the split.** Valid and common ("I paid, split it among the others"). The
  payer is owed their full outlay; their own share is zero unless they're also a
  participant.
- **All settled.** When every balance is zero, the Balances tab shows a clear "all settled
  up" empty state rather than a blank list.
- **Settle a non-existent / already-cleared debt.** The settle action only appears for debts
  that exist; settling is idempotent (a cleared balance stays cleared).
- **Rounding never leaks.** After any expense, the sum of per-person shares equals the
  expense total exactly; group balances always sum to zero.
- **Persistence.** Reloading the page restores all groups, members, and expenses from
  localStorage. Corrupt/absent storage falls back to an empty Groups list rather than
  crashing.

## Success criteria

- A user can complete journey 1 and journey 2 end to end, and balances are correct.
- For any equal split, per-person shares sum exactly to the total; the extra cent's owner is
  deterministic and visible.
- Balances are presented in simplified form (fewer, deterministic transactions) with a clear direction
  ("X owes Y $Z").
- Data survives a page reload.
- The edge cases above are handled without crashes or wrong numbers.

## Build vs design boundary

- **Design covers the full vision:** 5 screens + the 3 journeys, empty and populated states.
- **Build covers the core loop only:** Groups list → create group with members → add expense
  → Balances tab. Settle-up and polish are designed but left as the obvious next step.

This gap is intentional: design the whole product, build the slice that proves the logic.

## Outstanding questions / future extensions

- **Non-equal splits** (exact amounts, shares, percentages) — deliberately out of scope now.
  The design system already includes a split-method segmented control, so this is the
  natural first extension if the demo grows.
- **Edit / delete** expenses and members — not built. If added later, deleting a member with
  a non-zero balance needs a defined rule (block, or reassign); flagged here so it isn't a
  silent gap.
- **Partial settle-up** — current rule is full settle only. Partial payments (carry the
  remaining balance forward) would be the realistic upgrade.
