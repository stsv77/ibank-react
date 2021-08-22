import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import {presetGpnDefault, Theme} from '@consta/uikit/Theme';

const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <Dashboard/>
    </Theme>
);
};

export default App;
