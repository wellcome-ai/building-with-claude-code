/** Split — domain types. There is one local user; members are just names. */

export interface Member {
  name: string;
  /** Avatar colour. Derived from the name via colorForName(). */
  color: string;
}

/** An expense or a settlement payment, in chronological order within a group. */
export type ActivityItem =
  | {
      id: string;
      type: 'expense';
      desc: string;
      amount: number;
      /** Member name who paid. */
      paidBy: string;
      /** Member names the cost is split evenly among. */
      split: string[];
      /** Human-readable timestamp, e.g. "2 days ago" / "just now". */
      ts: string;
    }
  | {
      id: string;
      type: 'settle';
      /** Member who paid the money (the debtor). */
      from: string;
      /** Member who received it (the creditor). */
      to: string;
      amount: number;
      ts: string;
    };

export interface Group {
  id: string;
  name: string;
  /** [from, to] gradient stops for the group tile. */
  icon: [string, string];
  members: Member[];
  items: ActivityItem[];
}

/** A directional debt produced by debt simplification: `from` owes `to` `amount`. */
export interface Debt {
  from: string;
  to: string;
  amount: number;
}

export type Screen = 'groups' | 'create' | 'detail' | 'add' | 'settle';
export type DetailTab = 'balances' | 'activity';
