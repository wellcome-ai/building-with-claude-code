import type { Group } from '../lib/types';
import { colorForName } from '../lib/balances';
import { groupGradients } from '../tokens';

const m = (name: string) => ({ name, color: colorForName(name) });

/** Demo data: a trip with friends, plus a "you owe" group and a settled group. */
export function seedGroups(): Group[] {
  return [
    {
      id: 'g1',
      name: 'Trip to Byron',
      icon: groupGradients[0],
      members: [m('You'), m('Priya'), m('Sam')],
      items: [
        { id: 'e1', type: 'expense', desc: 'Beach house Airbnb', amount: 300, paidBy: 'You', split: ['You', 'Priya', 'Sam'], ts: '4 days ago' },
        { id: 'e2', type: 'expense', desc: 'Petrol', amount: 60, paidBy: 'Sam', split: ['You', 'Priya', 'Sam'], ts: '3 days ago' },
        { id: 'e3', type: 'expense', desc: 'Dinner at Stokehouse', amount: 120, paidBy: 'You', split: ['You', 'Priya', 'Sam'], ts: '2 days ago' },
      ],
    },
    {
      id: 'g2',
      name: 'Ski weekend',
      icon: groupGradients[2],
      members: [m('You'), m('Priya'), m('Maya')],
      items: [
        { id: 'e4', type: 'expense', desc: 'Lift passes', amount: 180, paidBy: 'Priya', split: ['You', 'Priya', 'Maya'], ts: '1 week ago' },
        { id: 'e5', type: 'expense', desc: 'Groceries', amount: 45, paidBy: 'You', split: ['You', 'Priya', 'Maya'], ts: '6 days ago' },
      ],
    },
    {
      id: 'g3',
      name: 'Coffee crew',
      icon: [groupGradients[1][0], groupGradients[1][1]],
      members: [m('You'), m('Sam'), m('Priya')],
      items: [
        { id: 'e6', type: 'expense', desc: 'Coffees', amount: 30, paidBy: 'You', split: ['You', 'Sam', 'Priya'], ts: '2 weeks ago' },
        { id: 'e7', type: 'settle', from: 'Sam', to: 'You', amount: 10, ts: '12 days ago' },
        { id: 'e8', type: 'settle', from: 'Priya', to: 'You', amount: 10, ts: '10 days ago' },
      ],
    },
  ];
}
