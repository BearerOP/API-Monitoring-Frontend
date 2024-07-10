import React from 'react';
import { AuthProvider } from './Context/AuthContext';
import Navigator from './Navigation/Navigator';

const App = () => {
  return (
    <AuthProvider>
        <Navigator />
    </AuthProvider>
  );
};

export default App;