import React, { useEffect, useState } from 'react';
import '../Css/Cursor.css'; // Import the CSS for the cursor

const Cursor = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const cursor = document.querySelector('.cursor');
            cursor.style.left = `${e.pageX}px`;
            cursor.style.top = `${e.pageY}px`;
        };

        const handleMouseDown = () => setIsActive(true);
        const handleMouseUp = () => setIsActive(false);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className={`cursor ${isActive ? 'active' : ''}`}></div>
    );
};

export default Cursor;