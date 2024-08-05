import React from 'react';
import { AuthProvider } from './Context/AuthContext';
import Navigator from './Navigation/Navigator';

const App = () => {
  const isDevelopment = import.meta.env.MODE === 'development';

if (isDevelopment) {
  console.log("Running in development mode");
}
  return (
    <AuthProvider>
        <Navigator />
    </AuthProvider>
  );
};

export default App;