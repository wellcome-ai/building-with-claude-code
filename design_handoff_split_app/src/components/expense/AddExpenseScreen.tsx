import React from 'react';
import { useSplit } from '../../state/SplitContext';
import { color } from '../../tokens';
import { formatMoney } from '../../lib/balances';
import { DEFAULT_CURRENCY } from '../../config';
import { ScreenHeader } from '../primitives/ScreenHeader';
import { Button } from '../primitives/Button';
import { AmountField } from './AmountField';
import { PayerPicker } from './PayerPicker';
import { SplitSelector } from './SplitSelector';

const labelStyle: React.CSSProperties = {
  fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: color.muted,
};

/**
 * Fast expense entry: big amount + quick chips, description, payer picker
 * (defaults to you), and an even-split multi-select (everyone pre-ticked).
 */
export function AddExpenseScreen() {
  const {
    activeGroup,
    exAmount, setExAmount, exDesc, setExDesc,
    exPaidBy, setPayer, exSplit, toggleSplit,
    canSaveExpense, saveExpense, backToDetail,
  } = useSplit();
  if (!activeGroup) return null;

  const amount = parseFloat(exAmount) || 0;
  const perPerson = exSplit.length ? amount / exSplit.length : 0;
  const perStr =
    amount > 0 && exSplit.length
      ? `${formatMoney(perPerson, DEFAULT_CURRENCY)} each · ${exSplit.length} people`
      : 'Split evenly';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: color.background }}>
      <ScreenHeader title="Add expense" onCancel={backToDetail} />

      <div style={{ flex: 1, overflowY: 'auto', padding: 18 }}>
        <AmountField value={exAmount} onChange={setExAmount} />

        <div style={{ ...labelStyle, margin: '22px 0 8px' }}>Description</div>
        <input
          value={exDesc}
          onChange={(e) => setExDesc(e.target.value)}
          placeholder="What was it for?"
          style={{ width: '100%', background: color.surface, border: `1.5px solid ${color.border}`, borderRadius: 12, padding: '13px 14px', fontFamily: 'inherit', fontSize: 16, outline: 'none' }}
        />

        <div style={{ ...labelStyle, margin: '22px 0 10px' }}>Paid by</div>
        <PayerPicker members={activeGroup.members} value={exPaidBy} onChange={setPayer} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '22px 0 10px' }}>
          <div style={labelStyle}>Split between</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: color.brandStrong }}>{perStr}</div>
        </div>
        <SplitSelector members={activeGroup.members} selected={exSplit} perPerson={perPerson} amount={amount} onToggle={toggleSplit} />
      </div>

      <div style={{ padding: '14px 18px 18px', borderTop: `1px solid ${color.borderSoft}` }}>
        <Button block disabled={!canSaveExpense} onClick={saveExpense}>
          Save expense
        </Button>
      </div>
    </div>
  );
}
