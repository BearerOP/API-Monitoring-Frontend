import { AuthProvider } from './Context/AuthContext';
import Navigator from './Navigation/Navigator';
import AnimatedCursor from 'react-animated-cursor';
import { useEffect, useState } from 'react';

const App = () => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseOver = () => setHovered(true);
    const handleMouseOut = () => setHovered(false);

    // Attach mouse events globally to all interactive elements
    document
      .querySelectorAll('a, button, input, .hover-target')
      .forEach((el) => {
        el.addEventListener('mouseover', handleMouseOver);
        el.addEventListener('mouseout', handleMouseOut);
      });

    return () => {
      document
        .querySelectorAll('a, button, input, .hover-target')
        .forEach((el) => {
          el.removeEventListener('mouseover', handleMouseOver);
          el.removeEventListener('mouseout', handleMouseOut);
        });
    };
  }, []);

  return (
    <AuthProvider>
      <Navigator />
      <AnimatedCursor
        color={hovered ? '255, 255, 255' : '139, 62, 246'} // Invert color on hover
        innerSize={10} // Base size
        outerSize={20} // Base size
        outerAlpha={0.2}
        innerScale={hovered ? 1.5 : 1} // Scale cursor on hover
        outerScale={hovered ? 1.5 : 1} // Scale outer circle on hover
        outerStyle={{
          backgroundColor: hovered ? '#8b3ef6' : 'white', // Invert background color on hover
          border: '1px solid #8b3ef6',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      />
    </AuthProvider>
  );
};

export default App;
