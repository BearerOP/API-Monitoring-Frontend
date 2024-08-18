import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframes for rotation animation
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Define the styled loader component
const MinimalLoader = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  animation: ${rotate} 0.8s linear infinite reverse;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bar = styled.div`
  width: 3px;
  height: 7px;
  background: ${(props) => props.barColor || 'rgb(129, 62, 224)'};
  position: absolute;
  opacity: 1;
  border-radius: 50vh;
  transform: rotate(${(props) => props.rotation}deg) translateY(-8px);
`;

// Use styled-components to create the React component
const MinimalLoaderComponent = ({ barColor }) => {
    const bars = Array.from({ length: 8 }, (_, index) => 45 * index);
  
    return (
        <div className='h-full w-full flex justify-center items-center'>
          <div className='flex justify-center items-center w-8 h-8'>
            <MinimalLoader>
                {bars.map((rotation, index) => (
                    <Bar key={index} rotation={rotation} barColor={barColor} />
                ))}
            </MinimalLoader>
        </div>
        </div>
    );
}

export default MinimalLoaderComponent;