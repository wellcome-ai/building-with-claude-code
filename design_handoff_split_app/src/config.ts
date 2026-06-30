/** App-level configuration / feature flags.
 *  These map to the three "tweaks" exposed on the HTML prototype. */

/** The single local user. Members are just names; this one is "you". */
export const CURRENT_USER = 'You';

/** Currency symbol used by formatMoney throughout the app. */
export const DEFAULT_CURRENCY = '$';

/** Pre-tick everyone when opening Add Expense (the even-split default). */
export const EVEN_SPLIT_PRESELECT = true;

/** Show the personal "you lent / you borrowed $X" helper line in the activity feed. */
export const SHOW_YOU_CONTEXT = true;
