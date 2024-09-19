import { AuthProvider } from './Context/AuthContext';
import Navigator from './Navigation/Navigator';
import AnimatedCursor from 'react-animated-cursor';

const App = () => {
  const isDevelopment = import.meta.env.MODE === 'development';

  if (isDevelopment) {
    console.log('Running in development mode');
  }
  return (
    <AuthProvider>
      <Navigator />
      <AnimatedCursor
        color="139, 62, 246"
        innerSize={10}
        outerSize={28}
        outerAlpha={0.5}
        innerScale={0.7}
        outerScale={3}
      />
    </AuthProvider>
  );
};

export default App;
