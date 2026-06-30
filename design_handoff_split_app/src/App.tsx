import React from 'react';
import { useSplit } from './state/SplitContext';
import { AppShell } from './components/AppShell';
import { GroupsScreen } from './components/groups/GroupsScreen';
import { CreateGroupScreen } from './components/create/CreateGroupScreen';
import { GroupDetailScreen } from './components/detail/GroupDetailScreen';
import { AddExpenseScreen } from './components/expense/AddExpenseScreen';
import { SettleUpScreen } from './components/settle/SettleUpScreen';

/**
 * Screen switch driven by store state. Navigation lives in the store
 * (router-agnostic). To adopt React Router, map each `screen` to a route
 * and render via <Routes> instead of this switch.
 */
export default function App() {
  const { screen } = useSplit();

  return (
    <AppShell>
      {screen === 'groups' && <GroupsScreen />}
      {screen === 'create' && <CreateGroupScreen />}
      {screen === 'detail' && <GroupDetailScreen />}
      {screen === 'add' && <AddExpenseScreen />}
      {screen === 'settle' && <SettleUpScreen />}
    </AppShell>
  );
}
